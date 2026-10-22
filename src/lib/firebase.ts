import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, type Auth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, type Firestore } from 'firebase/firestore';
import { getStorage, connectStorageEmulator, type FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCSzMPX59qjRT3I-vvXoSlpW9icgZQlhpI',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'greptech-media-academy.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'greptech-media-academy',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'greptech-media-academy.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '837273969466',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:837273969466:web:ba4b4edc8eef953afc2603',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Check if valid production credentials are provided
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey.startsWith('AIza') &&
  firebaseConfig.projectId === 'greptech-media-academy'
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (isFirebaseConfigured) {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);

  // Optional: Connect to local emulators if specified
  if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true' && import.meta.env.DEV) {
    try {
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      connectFirestoreEmulator(db, 'localhost', 8080);
      connectStorageEmulator(storage, 'localhost', 9199);
      console.log('[Firebase] Connected to local emulator suite');
    } catch (e) {
      console.warn('[Firebase] Emulator connection warning:', e);
    }
  }
} else {
  console.info(
    '[Firebase] Running in preview mode. Configure VITE_FIREBASE_API_KEY in .env.local to connect live cloud services.'
  );
}

export { app, auth, db, storage };

