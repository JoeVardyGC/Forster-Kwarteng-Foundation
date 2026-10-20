import {
  collection,
  getDocs,
  getDoc,
  doc,
  writeBatch,
} from 'firebase/firestore';
import { db, cleanFirestoreData } from './firebase';
import { DEFAULT_HERO_SLIDES } from '../context/DataContext';
import {
  OUR_PROGRAMS,
  PROGRAM_ARTICLES,
  UPCOMING_PROJECTS,
  BENEFICIARY_STORIES,
  FOUNDATION_INFO,
  DEFAULT_MOMO_ACCOUNTS,
  DEFAULT_BANK_ACCOUNTS,
} from '../data/foundationData';

/**
 * Seeds default foundation data into Firestore ONLY ONCE when the database is brand new.
 * Once `settings/seed_status` exists in Firestore, it never re-seeds deleted items.
 */
export async function seedFirestoreIfEmpty(): Promise<boolean> {
  try {
    // Check master seed flag first — if already initialized, NEVER overwrite or re-seed deleted items
    const seedFlagRef = doc(db, 'settings', 'seed_status');
    const seedFlagSnap = await getDoc(seedFlagRef);
    if (seedFlagSnap.exists() && seedFlagSnap.data()?.initialized) {
      return false;
    }

    const batch = writeBatch(db);
    let hasWrites = false;

    // 1. Seed Hero Slides if empty
    const slidesSnap = await getDocs(collection(db, 'hero_slides'));
    if (slidesSnap.empty) {
      DEFAULT_HERO_SLIDES.forEach((slide, idx) => {
        const slideId = String(slide.id);
        const slideRef = doc(db, 'hero_slides', slideId);
        batch.set(slideRef, cleanFirestoreData({ ...slide, id: slideId, order: idx + 1 }));
      });
      hasWrites = true;
    }

    // 2. Seed Projects & Program Articles if empty
    const projectsSnap = await getDocs(collection(db, 'projects'));
    if (projectsSnap.empty) {
      OUR_PROGRAMS.forEach((prog) => {
        const progRef = doc(db, 'projects', prog.id);
        batch.set(progRef, cleanFirestoreData(prog));
      });
      Object.entries(PROGRAM_ARTICLES).forEach(([id, article]) => {
        const artRef = doc(db, 'program_articles', id);
        batch.set(artRef, cleanFirestoreData(article));
      });
      hasWrites = true;
    }

    // 3. Seed Events if empty
    const eventsSnap = await getDocs(collection(db, 'events'));
    if (eventsSnap.empty) {
      UPCOMING_PROJECTS.forEach((ev) => {
        const evRef = doc(db, 'events', ev.id);
        batch.set(evRef, cleanFirestoreData(ev));
      });
      hasWrites = true;
    }

    // 4. Seed Stories if empty
    const storiesSnap = await getDocs(collection(db, 'stories'));
    if (storiesSnap.empty) {
      BENEFICIARY_STORIES.forEach((st) => {
        const stRef = doc(db, 'stories', st.id);
        batch.set(stRef, cleanFirestoreData(st));
      });
      hasWrites = true;
    }

    // 5. Seed Foundation General Settings if not exists
    const settingsSnap = await getDoc(doc(db, 'settings', 'general'));
    if (!settingsSnap.exists()) {
      const settingsRef = doc(db, 'settings', 'general');
      batch.set(settingsRef, cleanFirestoreData(FOUNDATION_INFO));
      hasWrites = true;
    }

    // 6. Seed Financials (MoMo & Bank) if not exists
    const financialsSnap = await getDoc(doc(db, 'settings', 'financials'));
    if (!financialsSnap.exists()) {
      const financialsRef = doc(db, 'settings', 'financials');
      batch.set(financialsRef, cleanFirestoreData({
        momoAccounts: DEFAULT_MOMO_ACCOUNTS,
        bankAccounts: DEFAULT_BANK_ACCOUNTS,
        updatedAt: new Date().toISOString(),
      }));
      hasWrites = true;
    }

    // Mark database as permanently initialized so deleted demo items never come back
    batch.set(seedFlagRef, {
      initialized: true,
      seededAt: new Date().toISOString(),
    });

    await batch.commit();
    return hasWrites;
  } catch (err) {
    console.warn('[Firestore] Auto-seed check skipped:', err);
    return false;
  }
}
