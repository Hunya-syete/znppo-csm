import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const REQUIRED_FIREBASE_ENV_VARS = [
  'FIREBASE_PROJECT_ID',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_PRIVATE_KEY',
] as const;

type RequiredFirebaseEnvVar = (typeof REQUIRED_FIREBASE_ENV_VARS)[number];

let firestoreInstance: ReturnType<typeof getFirestore> | null = null;

function getMissingEnvVars(): RequiredFirebaseEnvVar[] {
  return REQUIRED_FIREBASE_ENV_VARS.filter((key) => !process.env[key]?.trim());
}

export function isFirebaseConfigured(): boolean {
  return getMissingEnvVars().length === 0;
}

export function getFirestoreDb() {
  if (firestoreInstance) {
    return firestoreInstance;
  }

  const missingEnvVars = getMissingEnvVars();
  if (missingEnvVars.length > 0) {
    throw new Error(
      `Firebase Admin is not configured. Missing: ${missingEnvVars.join(', ')}.`,
    );
  }

  const privateKey = process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n');

  const app =
    getApps()[0] ??
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
    });

  firestoreInstance = getFirestore(app);
  return firestoreInstance;
}
