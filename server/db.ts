/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { Feedback, QRLocation } from '../src/types';
import { getFirestoreDb, isFirebaseConfigured } from './firebase';

const DB_FILE = path.join(process.cwd(), 'pn_feedback_db.json');
const COLLECTIONS = {
  feedbacks: 'feedbacks',
  locations: 'locations',
} as const;

let cachedDb: DatabaseSchema | null = null;
let seedPromise: Promise<void> | null = null;

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

function useJsonFallback(): boolean {
  return !isFirebaseConfigured() && !process.env.VERCEL;
}

function cloneDb(db: DatabaseSchema): DatabaseSchema {
  return JSON.parse(JSON.stringify(db)) as DatabaseSchema;
}

function stripUndefined<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => stripUndefined(item)).filter((item) => item !== undefined) as T;
  }

  if (value && typeof value === 'object') {
    const cleanedEntries = Object.entries(value as Record<string, unknown>)
      .filter(([, entryValue]) => entryValue !== undefined)
      .map(([entryKey, entryValue]) => [entryKey, stripUndefined(entryValue)]);

    return Object.fromEntries(cleanedEntries) as T;
  }

  return value;
}

function buildSeedData(): DatabaseSchema {
  return {
    locations: DEFAULT_LOCATIONS,
    feedbacks: generateSeedFeedbacks(),
  };
}

function loadSeedData(): DatabaseSchema {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw) as Partial<DatabaseSchema>;

      if (Array.isArray(parsed.locations) && Array.isArray(parsed.feedbacks)) {
        return {
          locations: parsed.locations as QRLocation[],
          feedbacks: parsed.feedbacks as Feedback[],
        };
      }
    }
  } catch (error) {
    console.error('Error reading pn_feedback_db.json for Firestore seed:', error);
  }

  return buildSeedData();
}

function readJsonFallback(): DatabaseSchema {
  if (!cachedDb) {
    cachedDb = loadSeedData();
  }

  return cloneDb(cachedDb);
}

function writeJsonFallback(db: DatabaseSchema): void {
  cachedDb = cloneDb(db);
  fs.writeFileSync(DB_FILE, JSON.stringify(cachedDb, null, 2), 'utf-8');
}

type FirestoreDoc = {
  id: string;
  data(): Record<string, unknown> | undefined;
};

function mapLocationDoc(doc: FirestoreDoc): QRLocation | null {
  const data = doc.data();
  if (!data) {
    return null;
  }

  return {
    id: doc.id,
    office_name: typeof data.office_name === 'string' ? data.office_name : '',
    office_code: typeof data.office_code === 'string' ? data.office_code : '',
    qr_token: typeof data.qr_token === 'string' ? data.qr_token : '',
    status: data.status === 'inactive' ? 'inactive' : 'active',
    created_at:
      typeof data.created_at === 'string' ? data.created_at : new Date().toISOString(),
  };
}

function mapFeedbackDoc(doc: FirestoreDoc): Feedback | null {
  const data = doc.data();
  if (!data) {
    return null;
  }

  const ratings = (data.ratings ?? {}) as Record<string, unknown>;

  return {
    ...(data as Omit<Feedback, 'id' | 'ratings'>),
    id: doc.id,
    rating: typeof data.rating === 'number' ? data.rating : Number(data.rating ?? 0),
    category: (data.category as Feedback['category']) ?? 'inquiry',
    comments: typeof data.comments === 'string' ? data.comments : '',
    created_at:
      typeof data.created_at === 'string' ? data.created_at : new Date().toISOString(),
    office_source: typeof data.office_source === 'string' ? data.office_source : 'General Walk-In',
    device_info: typeof data.device_info === 'string' ? data.device_info : 'unknown-device',
    ip_address: typeof data.ip_address === 'string' ? data.ip_address : '127.0.0.1',
    ratings: {
      promptness: Number(ratings.promptness ?? 5),
      courtesy: Number(ratings.courtesy ?? 5),
      efficiency: Number(ratings.efficiency ?? 5),
      cleanliness: Number(ratings.cleanliness ?? 5),
    },
  };
}

async function ensureFirestoreSeeded(): Promise<void> {
  if (useJsonFallback()) {
    return;
  }

  if (seedPromise) {
    return seedPromise;
  }

  seedPromise = (async () => {
    const firestore = getFirestoreDb();
    const [locationsSnapshot, feedbacksSnapshot] = await Promise.all([
      firestore.collection(COLLECTIONS.locations).limit(1).get(),
      firestore.collection(COLLECTIONS.feedbacks).limit(1).get(),
    ]);

    if (!locationsSnapshot.empty || !feedbacksSnapshot.empty) {
      return;
    }

    const seedData = loadSeedData();
    const batch = firestore.batch();

    for (const location of seedData.locations) {
      const locationRef = firestore.collection(COLLECTIONS.locations).doc(location.id);
      batch.set(locationRef, stripUndefined({ ...location, id: undefined }));
    }

    for (const feedback of seedData.feedbacks) {
      const feedbackRef = firestore.collection(COLLECTIONS.feedbacks).doc(feedback.id);
      batch.set(feedbackRef, stripUndefined({ ...feedback, id: undefined }));
    }

    await batch.commit();
  })().finally(() => {
    seedPromise = null;
  });

  await seedPromise;
}

export async function getLocations(): Promise<QRLocation[]> {
  if (useJsonFallback()) {
    return readJsonFallback().locations;
  }

  await ensureFirestoreSeeded();

  const snapshot = await getFirestoreDb()
    .collection(COLLECTIONS.locations)
    .orderBy('created_at', 'asc')
    .get();

  return snapshot.docs
    .map((doc) => mapLocationDoc(doc))
    .filter((location): location is QRLocation => location !== null);
}

export async function getLocationById(id: string): Promise<QRLocation | null> {
  if (useJsonFallback()) {
    return readJsonFallback().locations.find((location) => location.id === id) ?? null;
  }

  await ensureFirestoreSeeded();

  const snapshot = await getFirestoreDb().collection(COLLECTIONS.locations).doc(id).get();
  return mapLocationDoc(snapshot);
}

export async function getLocationByToken(token: string): Promise<QRLocation | null> {
  if (useJsonFallback()) {
    return readJsonFallback().locations.find((location) => location.qr_token === token) ?? null;
  }

  await ensureFirestoreSeeded();

  const snapshot = await getFirestoreDb()
    .collection(COLLECTIONS.locations)
    .where('qr_token', '==', token)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return null;
  }

  return mapLocationDoc(snapshot.docs[0]);
}

export async function createLocation(location: QRLocation): Promise<void> {
  if (useJsonFallback()) {
    const db = readJsonFallback();
    db.locations.push(location);
    writeJsonFallback(db);
    return;
  }

  await ensureFirestoreSeeded();

  await getFirestoreDb()
    .collection(COLLECTIONS.locations)
    .doc(location.id)
    .set(stripUndefined({ ...location, id: undefined }));
}

export async function setLocationStatus(
  id: string,
  status: QRLocation['status'],
): Promise<QRLocation | null> {
  if (useJsonFallback()) {
    const db = readJsonFallback();
    const index = db.locations.findIndex((location) => location.id === id);

    if (index === -1) {
      return null;
    }

    db.locations[index].status = status;
    writeJsonFallback(db);
    return db.locations[index];
  }

  await ensureFirestoreSeeded();

  const locationRef = getFirestoreDb().collection(COLLECTIONS.locations).doc(id);
  const currentSnapshot = await locationRef.get();

  if (!currentSnapshot.exists) {
    return null;
  }

  await locationRef.update({ status });
  const updatedSnapshot = await locationRef.get();
  return mapLocationDoc(updatedSnapshot);
}

export async function getFeedbacks(): Promise<Feedback[]> {
  if (useJsonFallback()) {
    return readJsonFallback().feedbacks;
  }

  await ensureFirestoreSeeded();

  const snapshot = await getFirestoreDb()
    .collection(COLLECTIONS.feedbacks)
    .orderBy('created_at', 'asc')
    .get();

  return snapshot.docs
    .map((doc) => mapFeedbackDoc(doc))
    .filter((feedback): feedback is Feedback => feedback !== null);
}

export async function createFeedback(feedback: Feedback): Promise<void> {
  if (useJsonFallback()) {
    const db = readJsonFallback();
    db.feedbacks.push(feedback);
    writeJsonFallback(db);
    return;
  }

  await ensureFirestoreSeeded();

  await getFirestoreDb()
    .collection(COLLECTIONS.feedbacks)
    .doc(feedback.id)
    .set(stripUndefined({ ...feedback, id: undefined }));
}

export async function getDb(): Promise<DatabaseSchema> {
  const [locations, feedbacks] = await Promise.all([getLocations(), getFeedbacks()]);
  return { locations, feedbacks };
}
