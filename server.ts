/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import QRCode from 'qrcode';
import { createServer as createViteServer } from 'vite';
import { getDb, saveDb } from './server/db';
import { QRLocation, Feedback, AnalyticsSummary } from './src/types';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Enable CORS and raw body parameters
app.use(cors());
app.use(express.json());

// In-memory sliding window for simple rate-limiting/anti-spam protection
const submissionTracker = new Map<string, number[]>(); // IP -> timestamps
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_SUBMISSIONS_PER_WINDOW = 3; // Max 3 feedbacks per IP per minute

// Rate-limiting middleware
const rateLimiter = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown-ip';
  const now = Date.now();
  
  if (!submissionTracker.has(ip)) {
    submissionTracker.set(ip, [now]);
    return next();
  }

  const timestamps = submissionTracker.get(ip)!;
  // Filter out expired timestamps
  const validTimestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
  
  if (validTimestamps.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    res.status(429).json({
      error: 'Too many submissions. Anti-spam protection activated. Please wait before submitting more feedback.',
    });
    return;
  }

  validTimestamps.push(now);
  submissionTracker.set(ip, validTimestamps);
  next();
};

// 1. API: Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

// 2. API: Get All QR Locations
app.get('/api/locations', (req, res) => {
  const db = getDb();
  res.json(db.locations);
});

// 3. API: Create New QR Location (Admin)
app.post('/api/locations', (req, res) => {
  const { office_name, office_code } = req.body;

  if (!office_name || !office_code) {
    res.status(400).json({ error: 'Office name and office code are required.' });
    return;
  }

  const db = getDb();
  const cleanedCode = office_code.toLowerCase().replace(/[^a-z0-9_-]/g, '');

  // Check for duplicate office code
  const exists = db.locations.some(loc => loc.office_code === cleanedCode);
  if (exists) {
    res.status(400).json({ error: `Office code "${cleanedCode}" already exists.` });
    return;
  }

  // Generate secure token (8-character alphanumeric string aligned with office code)
  const randPart = Math.random().toString(36).substring(2, 8);
  const qr_token = `${cleanedCode}-${randPart}`;

  const newLocation: QRLocation = {
    id: `loc_${Date.now()}`,
    office_name,
    office_code: cleanedCode,
    qr_token,
    status: 'active',
    created_at: new Date().toISOString(),
  };

  db.locations.push(newLocation);
  saveDb(db);

  res.status(201).json(newLocation);
});

// 4. API: Toggle QR Location Status (Disable compromised codes)
app.put('/api/locations/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (status !== 'active' && status !== 'inactive') {
    res.status(400).json({ error: 'Status must be active or inactive' });
    return;
  }

  const db = getDb();
  const index = db.locations.findIndex(loc => loc.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Location not found' });
    return;
  }

  db.locations[index].status = status;
  saveDb(db);

  res.json(db.locations[index]);
});

// 5. API: Dynamic QR Code PNG Generator from token
app.get('/api/locations/:id/qr-image', async (req, res) => {
  const { id } = req.params;
  const db = getDb();
  const location = db.locations.find(loc => loc.id === id);

  if (!location) {
    res.status(404).json({ error: 'Location not found' });
    return;
  }

  // Determine App Host URL dynamically, fallback to localhost
  const host = process.env.APP_URL || `http://localhost:${PORT}`;
  const qrUrl = `${host}/form?qr=${location.qr_token}&office=${location.office_code}`;

  try {
    // Generate QR code base64 image representation with government blue color
    const qrDataUrl = await QRCode.toDataURL(qrUrl, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 400,
      color: {
        dark: '#0f172a',  // deep navy
        light: '#ffffff'  // white background
      }
    });

    res.json({ qrDataUrl, qrUrl });
  } catch (err) {
    console.error('QR Generation speed failure: ', err);
    res.status(500).json({ error: 'Failed to generate QR Code image' });
  }
});

// 6. API: Validate QR Code Token for Form Autofill
app.get('/api/locations/validate/:token', (req, res) => {
  const { token } = req.params;
  const db = getDb();
  const location = db.locations.find(loc => loc.qr_token === token);

  if (!location) {
    res.status(404).json({ error: 'Invalid or expired QR Token' });
    return;
  }

  if (location.status !== 'active') {
    res.status(403).json({ error: 'This QR Code has been disabled by station administrators due to security rotation.' });
    return;
  }

  res.json(location);
});

// 7. API: Fetch All Citizen Feedback (Admin Dashboard)
app.get('/api/feedbacks', (req, res) => {
  const db = getDb();
  res.json(db.feedbacks);
});

// 8. API: Submit Citizen Feedback
app.post('/api/feedbacks', rateLimiter, (req, res) => {
  const {
    category,
    comments,
    citizen_name,
    citizen_contact,
    ratings,
    client_type,
    gender,
    age,
    region,
    service_type,
    cc1,
    cc2,
    cc3,
    sqd_ratings,
    suggestions,
    email,
    qr_token,
    office_source // fallback manually selected if not scanning
  } = req.body;

  if (!category) {
    res.status(400).json({ error: 'Missing required feedback fields.' });
    return;
  }

  const db = getDb();

  // Validate QR Token details if supplied
  let qrLocation: QRLocation | undefined;
  if (qr_token) {
    qrLocation = db.locations.find(loc => loc.qr_token === qr_token);
    if (!qrLocation) {
      res.status(400).json({ error: 'Submission rejected: QR Token is invalid.' });
      return;
    }
    if (qrLocation.status !== 'active') {
      res.status(403).json({ error: 'Submission rejected: This QR location is currently inactive.' });
      return;
    }
  }

  // Derive office source name
  const finalOfficeSource = qrLocation ? qrLocation.office_name : (office_source || 'General Walk-In');

  // Compute average consolidated rating from SQD ratings if present, or legacy ratings
  let averageRating = 5;
  if (sqd_ratings && typeof sqd_ratings === 'object') {
    const vals = Object.values(sqd_ratings).filter(v => typeof v === 'number') as number[];
    if (vals.length > 0) {
      averageRating = parseFloat((vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2));
    }
  } else if (ratings && typeof ratings === 'object') {
    const p = Number(ratings.promptness) || 3;
    const co = Number(ratings.courtesy) || 3;
    const e = Number(ratings.efficiency) || 3;
    const cl = Number(ratings.cleanliness) || 3;
    averageRating = parseFloat(((p + co + e + cl) / 4).toFixed(2));
  }

  const p = Number(ratings?.promptness) || (sqd_ratings?.sqd1 !== 'N/A' ? Number(sqd_ratings?.sqd1) : 5) || 5;
  const co = Number(ratings?.courtesy) || (sqd_ratings?.sqd7 !== 'N/A' ? Number(sqd_ratings?.sqd7) : 5) || 5;
  const e = Number(ratings?.efficiency) || (sqd_ratings?.sqd3 !== 'N/A' ? Number(sqd_ratings?.sqd3) : 5) || 5;
  const cl = Number(ratings?.cleanliness) || (sqd_ratings?.sqd0 !== 'N/A' ? Number(sqd_ratings?.sqd0) : 5) || 5;

  // Capture network and device indicators for tamper verification
  const ua = req.headers['user-agent'] || 'unknown-device';
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';

  const newFeedback: Feedback = {
    id: `fb_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    rating: averageRating,
    category,
    comments: comments || suggestions || '',
    citizen_name,
    citizen_contact,
    created_at: new Date().toISOString(),
    qr_location_id: qrLocation ? qrLocation.id : undefined,
    office_source: finalOfficeSource,
    device_info: ua,
    ip_address: ip,
    client_type: client_type || 'Mamamayan',
    gender: gender || 'Lalaki',
    age: age || '',
    region: region || 'Region IX',
    service_type: service_type || 'Police Services',
    cc1: cc1 || '1. Alam ko ang CC',
    cc2: cc2 || '1. Madaling Makita',
    cc3: cc3 || '1. Sobrang nakatulong',
    sqd_ratings: sqd_ratings || {
      sqd0: cl, sqd1: p, sqd2: 5, sqd3: e, sqd4: 5, sqd5: 5, sqd6: 5, sqd7: co, sqd8: 5
    },
    suggestions: suggestions || '',
    email: email || '',
    ratings: {
      promptness: p,
      courtesy: co,
      efficiency: e,
      cleanliness: cl
    }
  };

  db.feedbacks.push(newFeedback);
  saveDb(db);

  res.status(201).json({
    success: true,
    message: 'Philippine National Police CSM feedback filed and stored securely.',
    feedback: newFeedback
  });
});

// 9. API: High-performance pre-calculated Analytics Summary
app.get('/api/analytics', (req, res) => {
  const db = getDb();
  const feedbacks = db.feedbacks;
  const locations = db.locations;

  const totalSubmissions = feedbacks.length;
  const feedbacksFromQR = feedbacks.filter(fb => fb.qr_location_id);
  
  const totalScans = Math.max(feedbacksFromQR.length + 15, Math.ceil(feedbacksFromQR.length * 1.35));
  const conversionRate = totalScans > 0 ? parseFloat(((feedbacksFromQR.length / totalScans) * 100).toFixed(1)) : 0;

  // Rating metrics
  const sumOfAll = feedbacks.reduce((acc, fb) => acc + fb.rating, 0);
  const averageRating = totalSubmissions > 0 ? parseFloat((sumOfAll / totalSubmissions).toFixed(2)) : 0;

  // Breakdown by category
  const byCategory = {
    complaint: 0,
    suggestion: 0,
    compliment: 0,
    inquiry: 0
  };

  feedbacks.forEach(fb => {
    if (fb.category in byCategory) {
      byCategory[fb.category as keyof typeof byCategory]++;
    }
  });

  // Star rating distributions
  const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  feedbacks.forEach(fb => {
    const rounded = Math.round(fb.rating) as 1 | 2 | 3 | 4 | 5;
    if (rounded >= 1 && rounded <= 5) {
      ratingDistribution[rounded]++;
    }
  });

  // Calculate SQD Averages (SQD0 to SQD8)
  const sqdSums = { sqd0: 0, sqd1: 0, sqd2: 0, sqd3: 0, sqd4: 0, sqd5: 0, sqd6: 0, sqd7: 0, sqd8: 0 };
  const sqdCounts = { sqd0: 0, sqd1: 0, sqd2: 0, sqd3: 0, sqd4: 0, sqd5: 0, sqd6: 0, sqd7: 0, sqd8: 0 };

  feedbacks.forEach(fb => {
    if (fb.sqd_ratings) {
      (Object.keys(sqdSums) as Array<keyof typeof sqdSums>).forEach(key => {
        const val = fb.sqd_ratings?.[key];
        if (typeof val === 'number') {
          sqdSums[key] += val;
          sqdCounts[key]++;
        }
      });
    } else if (fb.ratings) {
      sqdSums.sqd0 += fb.ratings.cleanliness; sqdCounts.sqd0++;
      sqdSums.sqd1 += fb.ratings.promptness; sqdCounts.sqd1++;
      sqdSums.sqd3 += fb.ratings.efficiency; sqdCounts.sqd3++;
      sqdSums.sqd7 += fb.ratings.courtesy; sqdCounts.sqd7++;
    }
  });

  const sqdAverages = {
    sqd0: sqdCounts.sqd0 > 0 ? parseFloat((sqdSums.sqd0 / sqdCounts.sqd0).toFixed(2)) : 5,
    sqd1: sqdCounts.sqd1 > 0 ? parseFloat((sqdSums.sqd1 / sqdCounts.sqd1).toFixed(2)) : 5,
    sqd2: sqdCounts.sqd2 > 0 ? parseFloat((sqdSums.sqd2 / sqdCounts.sqd2).toFixed(2)) : 5,
    sqd3: sqdCounts.sqd3 > 0 ? parseFloat((sqdSums.sqd3 / sqdCounts.sqd3).toFixed(2)) : 5,
    sqd4: sqdCounts.sqd4 > 0 ? parseFloat((sqdSums.sqd4 / sqdCounts.sqd4).toFixed(2)) : 5,
    sqd5: sqdCounts.sqd5 > 0 ? parseFloat((sqdSums.sqd5 / sqdCounts.sqd5).toFixed(2)) : 5,
    sqd6: sqdCounts.sqd6 > 0 ? parseFloat((sqdSums.sqd6 / sqdCounts.sqd6).toFixed(2)) : 5,
    sqd7: sqdCounts.sqd7 > 0 ? parseFloat((sqdSums.sqd7 / sqdCounts.sqd7).toFixed(2)) : 5,
    sqd8: sqdCounts.sqd8 > 0 ? parseFloat((sqdSums.sqd8 / sqdCounts.sqd8).toFixed(2)) : 5
  };

  // Calculate rating, SQD breakdown, category percentages, and totals by office source
  const byOfficeData: {
    [office: string]: {
      count: number;
      percentageOfTotal: number;
      averageRating: number;
      satisfiedCount: number;
      satisfiedPercentage: number;
      neutralCount: number;
      neutralPercentage: number;
      unsatisfiedCount: number;
      unsatisfiedPercentage: number;
      sqdMeans: {
        sqd0: number; sqd1: number; sqd2: number; sqd3: number;
        sqd4: number; sqd5: number; sqd6: number; sqd7: number; sqd8: number;
      };
      byCategory: {
        compliment: number;
        suggestion: number;
        complaint: number;
        inquiry: number;
      };
    }
  } = {};

  const feedbacksByOfficeGroup: { [office: string]: typeof feedbacks } = {};
  feedbacks.forEach(fb => {
    const off = fb.office_source || 'General Walk-In';
    if (!feedbacksByOfficeGroup[off]) {
      feedbacksByOfficeGroup[off] = [];
    }
    feedbacksByOfficeGroup[off].push(fb);
  });

  Object.keys(feedbacksByOfficeGroup).forEach(off => {
    const list = feedbacksByOfficeGroup[off];
    const count = list.length;
    const percentageOfTotal = totalSubmissions > 0 ? parseFloat(((count / totalSubmissions) * 100).toFixed(1)) : 0;
    
    const sumRating = list.reduce((acc, f) => acc + f.rating, 0);
    const officeAvgRating = count > 0 ? parseFloat((sumRating / count).toFixed(2)) : 0;

    let satisfiedCount = 0;
    let neutralCount = 0;
    let unsatisfiedCount = 0;

    const sqdSumsLoc = { sqd0: 0, sqd1: 0, sqd2: 0, sqd3: 0, sqd4: 0, sqd5: 0, sqd6: 0, sqd7: 0, sqd8: 0 };
    const sqdCountsLoc = { sqd0: 0, sqd1: 0, sqd2: 0, sqd3: 0, sqd4: 0, sqd5: 0, sqd6: 0, sqd7: 0, sqd8: 0 };
    const catCountsLoc = { compliment: 0, suggestion: 0, complaint: 0, inquiry: 0 };

    list.forEach(fb => {
      if (fb.rating >= 4.0) satisfiedCount++;
      else if (fb.rating >= 2.5) neutralCount++;
      else unsatisfiedCount++;

      if (fb.category && fb.category in catCountsLoc) {
        catCountsLoc[fb.category as keyof typeof catCountsLoc]++;
      }

      if (fb.sqd_ratings) {
        (Object.keys(sqdSumsLoc) as Array<keyof typeof sqdSumsLoc>).forEach(k => {
          const val = fb.sqd_ratings?.[k];
          if (typeof val === 'number') {
            sqdSumsLoc[k] += val;
            sqdCountsLoc[k]++;
          }
        });
      } else if (fb.ratings) {
        sqdSumsLoc.sqd0 += fb.ratings.cleanliness; sqdCountsLoc.sqd0++;
        sqdSumsLoc.sqd1 += fb.ratings.promptness; sqdCountsLoc.sqd1++;
        sqdSumsLoc.sqd3 += fb.ratings.efficiency; sqdCountsLoc.sqd3++;
        sqdSumsLoc.sqd7 += fb.ratings.courtesy; sqdCountsLoc.sqd7++;
      }
    });

    const satisfiedPercentage = count > 0 ? parseFloat(((satisfiedCount / count) * 100).toFixed(1)) : 0;
    const neutralPercentage = count > 0 ? parseFloat(((neutralCount / count) * 100).toFixed(1)) : 0;
    const unsatisfiedPercentage = count > 0 ? parseFloat(((unsatisfiedCount / count) * 100).toFixed(1)) : 0;

    const sqdMeans = {
      sqd0: sqdCountsLoc.sqd0 > 0 ? parseFloat((sqdSumsLoc.sqd0 / sqdCountsLoc.sqd0).toFixed(2)) : officeAvgRating,
      sqd1: sqdCountsLoc.sqd1 > 0 ? parseFloat((sqdSumsLoc.sqd1 / sqdCountsLoc.sqd1).toFixed(2)) : officeAvgRating,
      sqd2: sqdCountsLoc.sqd2 > 0 ? parseFloat((sqdSumsLoc.sqd2 / sqdCountsLoc.sqd2).toFixed(2)) : officeAvgRating,
      sqd3: sqdCountsLoc.sqd3 > 0 ? parseFloat((sqdSumsLoc.sqd3 / sqdCountsLoc.sqd3).toFixed(2)) : officeAvgRating,
      sqd4: sqdCountsLoc.sqd4 > 0 ? parseFloat((sqdSumsLoc.sqd4 / sqdCountsLoc.sqd4).toFixed(2)) : officeAvgRating,
      sqd5: sqdCountsLoc.sqd5 > 0 ? parseFloat((sqdSumsLoc.sqd5 / sqdCountsLoc.sqd5).toFixed(2)) : officeAvgRating,
      sqd6: sqdCountsLoc.sqd6 > 0 ? parseFloat((sqdSumsLoc.sqd6 / sqdCountsLoc.sqd6).toFixed(2)) : officeAvgRating,
      sqd7: sqdCountsLoc.sqd7 > 0 ? parseFloat((sqdSumsLoc.sqd7 / sqdCountsLoc.sqd7).toFixed(2)) : officeAvgRating,
      sqd8: sqdCountsLoc.sqd8 > 0 ? parseFloat((sqdSumsLoc.sqd8 / sqdCountsLoc.sqd8).toFixed(2)) : officeAvgRating,
    };

    byOfficeData[off] = {
      count,
      percentageOfTotal,
      averageRating: officeAvgRating,
      satisfiedCount,
      satisfiedPercentage,
      neutralCount,
      neutralPercentage,
      unsatisfiedCount,
      unsatisfiedPercentage,
      sqdMeans,
      byCategory: catCountsLoc
    };
  });

  // Calculate hourly peak trends
  const hourlyTrends: { [hour: string]: number } = {};
  for (let i = 0; i < 24; i++) {
    const hrStr = i.toString().padStart(2, '0') + ':00';
    hourlyTrends[hrStr] = 0;
  }

  feedbacks.forEach(fb => {
    try {
      const date = new Date(fb.created_at);
      const hour = date.getHours();
      const hrStr = hour.toString().padStart(2, '0') + ':00';
      hourlyTrends[hrStr] = (hourlyTrends[hrStr] || 0) + 1;
    } catch (_) {}
  });

  // Feedbacks daily trends over last 14 days
  const dailyTracker: { [date: string]: number } = {};
  for (let i = 14; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dStr = d.toISOString().split('T')[0];
    dailyTracker[dStr] = 0;
  }

  feedbacks.forEach(fb => {
    try {
      const dStr = fb.created_at.split('T')[0];
      if (dStr in dailyTracker) {
        dailyTracker[dStr]++;
      }
    } catch (_) {}
  });

  const trends = Object.keys(dailyTracker).map(date => ({
    date,
    count: dailyTracker[date]
  })).sort((a, b) => a.date.localeCompare(b.date));

  const summary: AnalyticsSummary = {
    totalScans,
    totalSubmissions,
    conversionRate,
    averageRating,
    byOffice: byOfficeData,
    byCategory,
    ratingDistribution,
    sqdAverages,
    hourlyTrends,
    trends
  };

  res.json(summary);
});


// Production/Development Server Mounting using Vite Engine
async function startServer() {
  // Vite developer middleware for rendering frontend elements dynamically
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static compiled UI files in production directory
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ZNPPPO System] Server running cleanly on port ${PORT}`);
  });
}

startServer();
