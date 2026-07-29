/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { QRLocation, Feedback } from '../src/types';

const DB_FILE = path.join(process.cwd(), 'pn_feedback_db.json');
const TMP_DB_FILE = path.join('/tmp', 'pn_feedback_db.json');

let cachedDb: DatabaseSchema | null = null;

interface DatabaseSchema {
  locations: QRLocation[];
  feedbacks: Feedback[];
}

const DEFAULT_LOCATIONS: QRLocation[] = [
  {
    id: 'loc_phq',
    office_name: 'Provincial Headquarters (PHQ)',
    office_code: 'phq',
    qr_token: 'tkn_phq_101',
    status: 'active',
    created_at: '2026-05-01T08:00:00Z',
  },
  {
    id: 'loc_teu',
    office_name: 'Traffic Enforcement Unit (TEU)',
    office_code: 'teu',
    qr_token: 'tkn_teu_202',
    status: 'active',
    created_at: '2026-05-01T08:00:00Z',
  },
  {
    id: 'loc_idmu',
    office_name: 'Investigation Unit (IDMU)',
    office_code: 'idmu',
    qr_token: 'tkn_idmu_303',
    status: 'active',
    created_at: '2026-05-01T08:00:00Z',
  },
  {
    id: 'loc_wcpc',
    office_name: 'Women & Children Protection Desk (WCPC)',
    office_code: 'wcpc',
    qr_token: 'tkn_wcpc_404',
    status: 'active',
    created_at: '2026-05-02T09:00:00Z',
  },
  {
    id: 'loc_pcrd',
    office_name: 'Public Complaints & Referral Desk (PCRD)',
    office_code: 'pcrd',
    qr_token: 'tkn_pcrd_505',
    status: 'active',
    created_at: '2026-05-02T10:00:00Z',
  },
  {
    id: 'loc_pdeu',
    office_name: 'Provincial Drug Enforcement Unit (PDEU)',
    office_code: 'pdeu',
    qr_token: 'tkn_pdeu_606',
    status: 'inactive', // E.g., a disabled/compromised code example
    created_at: '2026-05-03T11:00:00Z',
  }
];

const CATEGORIES = ['complaint', 'suggestion', 'compliment', 'inquiry'] as const;

// Helper to seed feedback history over the past 25 days up to May 26, 2026
function generateSeedFeedbacks(): Feedback[] {
  const feedbacks: Feedback[] = [];
  const baseTime = new Date('2026-05-01T08:00:00Z').getTime();
  const endTime = new Date('2026-05-26T08:00:00Z').getTime();
  const timespan = endTime - baseTime;

  const devices = [
    'iPhone (iOS 17.4) - Safari',
    'Samsung Galaxy S23 (Android 14) - Chrome',
    'Xiaomi Redmi Note 12 - Chrome Mobile',
    'OPPO A78 - Opera',
    'Huawei P60 - Chrome',
    'iPad - Mobile Safari'
  ];

  const ips = [
    '112.204.15.93',
    '112.204.12.105',
    '49.145.88.23',
    '120.28.140.71',
    '222.127.18.99',
    '180.191.121.144'
  ];

  const commentTemplates = {
    compliment: [
      'Very professional officers. Fast service here. Keep it up!',
      'Officer was very accommodating and helpful in explaining the police clearance process.',
      'Smooth interaction today. Fast action and polite personnel.',
      'Thank you for assisting my grandmother with her police report today. Great job, PHQ!',
      'Clean office, organized queues, and very respectful desk officers.'
    ],
    complaint: [
      'Line was a bit long at the clearance counter. Need more servers.',
      'Very hot waiting area. Needs proper ventilation or a fan.',
      'The traffic report release took almost two hours. Hopefully this can be streamlined.',
      'Slightly disorganized queue. Waiting row system is confusing.'
    ],
    suggestion: [
      'Please open an online booking option for clearance so we do not have to crowd in waiting area.',
      'Install an air conditioning unit or more electric fans in the desk room.',
      'Maybe add a priority lane for pregnant women and senior citizens specifically.',
      'Provide visual brochures detailing step-by-step reporting instructions.'
    ],
    inquiry: [
      'Inquired about firearms licensing requirement. Desk officer provided pamphlet.',
      'Checked hours of operation for public complaints. Standard hours verified.',
      'Asked about community patrol schedules in Brgy. Estaka.'
    ]
  };

  const personnel = [
    'PEMS Juan Dela Cruz',
    'PCpl Maria Santos',
    'SSg Ricardo Gomez',
    'Pat Al-Shid Razon',
    'MSg Evelyn Ramos'
  ];

  // Let's seed 40 records
  for (let i = 0; i < 48; i++) {
    // Pick an office
    const officeIndex = i % DEFAULT_LOCATIONS.length;
    const office = DEFAULT_LOCATIONS[officeIndex];

    // Pick a category based on index
    let category: 'complaint' | 'suggestion' | 'compliment' | 'inquiry';
    if (i % 6 === 0) category = 'complaint';
    else if (i % 5 === 0) category = 'suggestion';
    else if (i % 4 === 0) category = 'inquiry';
    else category = 'compliment';

    // Ratings depend on category: compliments have high ratings, complaints have lower
    let promptness = 4;
    let courtesy = 4;
    let efficiency = 4;
    let cleanliness = 4;

    if (category === 'compliment') {
      promptness = Math.floor(Math.random() * 2) + 4; // 4-5
      courtesy = Math.floor(Math.random() * 1) + 5; // 5
      efficiency = Math.floor(Math.random() * 2) + 4; // 4-5
      cleanliness = Math.floor(Math.random() * 2) + 4; // 4-5
    } else if (category === 'complaint') {
      promptness = Math.floor(Math.random() * 2) + 1; // 1-2
      courtesy = Math.floor(Math.random() * 3) + 2; // 2-4
      efficiency = Math.floor(Math.random() * 2) + 1; // 1-2
      cleanliness = Math.floor(Math.random() * 2) + 3; // 3-4
    } else {
      promptness = Math.floor(Math.random() * 3) + 3; // 3-5
      courtesy = Math.floor(Math.random() * 2) + 4; // 4-5
      efficiency = Math.floor(Math.random() * 3) + 3; // 3-5
      cleanliness = Math.floor(Math.random() * 2) + 3; // 3-4
    }

    const rating = parseFloat(((promptness + courtesy + efficiency + cleanliness) / 4).toFixed(2));
    
    // Choose comment
    const templates = commentTemplates[category];
    const comments = templates[Math.floor(Math.random() * templates.length)];

    // Target a timestamp
    const itemTime = new Date(baseTime + (timespan * (i / 48)) + (Math.random() * 3600 * 1000 * 4));
    
    // Some are printed QR scans, some are organic
    const isQRScan = i % 3 !== 0;

    feedbacks.push({
      id: `fb_seed_${i}`,
      rating,
      category,
      comments,
      citizen_name: i % 4 === 0 ? undefined : `Citizen ${i + 101}`,
      citizen_contact: i % 4 === 0 ? undefined : `0917-555-${(1000 + i).toString()}`,
      created_at: itemTime.toISOString(),
      qr_location_id: isQRScan ? office.id : undefined,
      office_source: office.office_name,
      officer_name: i % 5 === 0 ? personnel[i % personnel.length] : undefined,
      device_info: devices[i % devices.length],
      ip_address: ips[i % ips.length],
      client_type: i % 5 === 0 ? 'Negosyo' : i % 7 === 0 ? 'Gobyerno' : 'Mamamayan',
      gender: i % 2 === 0 ? 'Lalaki' : 'Babae',
      age: (20 + (i % 45)).toString(),
      region: 'Region IX (Zamboanga Peninsula)',
      service_type: i % 3 === 0 ? 'Police Clearance' : i % 3 === 1 ? 'Blotter Report' : 'General Inquiry',
      cc1: '1. Alam ko ang CC at Nakita ko ito sa napuntahang opisina',
      cc2: '1. Madaling Makita',
      cc3: '1. Sobrang nakatulong',
      sqd_ratings: {
        sqd0: cleanliness,
        sqd1: promptness,
        sqd2: 5,
        sqd3: efficiency,
        sqd4: 5,
        sqd5: 5,
        sqd6: 5,
        sqd7: courtesy,
        sqd8: 5
      },
      suggestions: category === 'suggestion' ? comments : undefined,
      email: i % 3 === 0 ? `citizen${i}@example.com` : undefined,
      ratings: {
        promptness,
        courtesy,
        efficiency,
        cleanliness,
      }
    });
  }

  return feedbacks.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
}

export function getDb(): DatabaseSchema {
  if (cachedDb) {
    return cachedDb;
  }

  // 1. Try reading /tmp if modified during serverless session
  try {
    if (fs.existsSync(TMP_DB_FILE)) {
      const data = fs.readFileSync(TMP_DB_FILE, 'utf-8');
      cachedDb = JSON.parse(data);
      return cachedDb!;
    }
  } catch (err) {
    // Ignore tmp error
  }

  // 2. Try reading project root DB_FILE
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      cachedDb = JSON.parse(data);
      return cachedDb!;
    }
  } catch (err) {
    console.error('Error reading pn_feedback_db.json, falling back to seeds:', err);
  }

  // Seed default data
  const dbData: DatabaseSchema = {
    locations: DEFAULT_LOCATIONS,
    feedbacks: generateSeedFeedbacks(),
  };
  cachedDb = dbData;
  saveDb(dbData);
  return dbData;
}

export function saveDb(db: DatabaseSchema): void {
  cachedDb = db;
  // Try saving to project root first
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    return;
  } catch (err) {
    // If root is read-only (e.g., Vercel serverless), save to /tmp
    try {
      fs.writeFileSync(TMP_DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    } catch (tmpErr) {
      console.error('Error saving to /tmp DB file on Vercel:', tmpErr);
    }
  }
}
