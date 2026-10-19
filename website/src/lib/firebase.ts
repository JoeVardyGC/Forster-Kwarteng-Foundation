import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export const isFirebaseReady = (): boolean => {
  return !!firebaseConfig.apiKey && !!firebaseConfig.projectId;
};

/**
 * Uploads a local image file directly to Firebase Cloud Storage and returns its public CDN URL.
 */
export async function uploadImageToStorage(file: File, folder = 'general'): Promise<string> {
  const fileExt = file.name.split('.').pop() || 'jpg';
  const cleanName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const storageRef = ref(storage, `${folder}/${cleanName}`);

  const snapshot = await uploadBytes(storageRef, file, {
    contentType: file.type || 'image/jpeg',
  });

  const downloadUrl = await getDownloadURL(snapshot.ref);
  return downloadUrl;
}
