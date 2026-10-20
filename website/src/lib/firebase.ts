import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCMF61DigBl9ZhagJkBrTkjR-MPKsCRp9A',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'forster-kwarteng-fdn.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'forster-kwarteng-fdn',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'forster-kwarteng-fdn.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '214765348910',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:214765348910:web:77823ccc5153c4e4b697bf',
};

// Initialize or reuse Firebase App instance
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with ignoreUndefinedProperties enabled so undefined fields never crash setDoc
function initDb() {
  try {
    return initializeFirestore(app, {
      ignoreUndefinedProperties: true,
    });
  } catch {
    return getFirestore(app);
  }
}

export const db = initDb();
export const storage = getStorage(app);
export const auth = getAuth(app);

export const isFirebaseReady = (): boolean => {
  return !!firebaseConfig.apiKey && !!firebaseConfig.projectId;
};

/**
 * Recursively strips undefined values from an object/array so Firestore writes never throw.
 */
export function cleanFirestoreData<T>(obj: T): T {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => cleanFirestoreData(item)) as unknown as T;
  }
  const cleaned: Record<string, any> = {};
  for (const [key, val] of Object.entries(obj as Record<string, any>)) {
    if (val !== undefined) {
      cleaned[key] = cleanFirestoreData(val);
    }
  }
  return cleaned as T;
}

/**
 * Compresses and optimizes an image file on the client into a compact, high-clarity
 * Data URL (< 250KB) that stores directly in Cloud Firestore and syncs across all devices
 * without requiring a paid Firebase Storage bucket.
 */
export async function uploadImageToStorage(file: File, _folder = 'general'): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = () => {
      const rawDataUrl = reader.result as string;
      const img = new Image();
      img.onerror = () => {
        // Fallback to raw data URL if image element cannot decode
        resolve(rawDataUrl);
      };
      img.onload = () => {
        try {
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 900;
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH || height > MAX_HEIGHT) {
            const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(rawDataUrl);
            return;
          }

          // Fill white background for transparent PNGs converted to JPEG
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          // Start at 0.78 quality and step down if still > 280,000 chars (~210KB)
          let quality = 0.78;
          let compressedUrl = canvas.toDataURL('image/jpeg', quality);
          while (compressedUrl.length > 280000 && quality > 0.4) {
            quality -= 0.12;
            compressedUrl = canvas.toDataURL('image/jpeg', quality);
          }

          resolve(compressedUrl);
        } catch {
          resolve(rawDataUrl);
        }
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  });
}
