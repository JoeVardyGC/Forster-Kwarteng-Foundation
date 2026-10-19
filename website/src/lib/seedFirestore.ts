import {
  collection,
  getDocs,
  getDoc,
  doc,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';
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
 * Seeds default foundation data into Firestore if individual collections are empty.
 * Runs safely and idempotently per collection.
 */
export async function seedFirestoreIfEmpty(): Promise<boolean> {
  try {
    const batch = writeBatch(db);
    let hasWrites = false;

    // 1. Seed Hero Slides if empty
    const slidesSnap = await getDocs(collection(db, 'hero_slides'));
    if (slidesSnap.empty) {
      console.log('[Firestore] Seeding initial Hero Slides...');
      DEFAULT_HERO_SLIDES.forEach((slide, idx) => {
        const slideRef = doc(db, 'hero_slides', String(slide.id));
        batch.set(slideRef, { ...slide, order: idx + 1 });
      });
      hasWrites = true;
    }

    // 2. Seed Projects & Program Articles if empty
    const projectsSnap = await getDocs(collection(db, 'projects'));
    if (projectsSnap.empty) {
      console.log('[Firestore] Seeding initial Projects & Program Articles...');
      OUR_PROGRAMS.forEach((prog) => {
        const progRef = doc(db, 'projects', prog.id);
        batch.set(progRef, prog);
      });
      Object.entries(PROGRAM_ARTICLES).forEach(([id, article]) => {
        const artRef = doc(db, 'program_articles', id);
        batch.set(artRef, article);
      });
      hasWrites = true;
    }

    // 3. Seed Events if empty
    const eventsSnap = await getDocs(collection(db, 'events'));
    if (eventsSnap.empty) {
      console.log('[Firestore] Seeding initial Events...');
      UPCOMING_PROJECTS.forEach((ev) => {
        const evRef = doc(db, 'events', ev.id);
        batch.set(evRef, ev);
      });
      hasWrites = true;
    }

    // 4. Seed Stories if empty
    const storiesSnap = await getDocs(collection(db, 'stories'));
    if (storiesSnap.empty) {
      console.log('[Firestore] Seeding initial Beneficiary Stories...');
      BENEFICIARY_STORIES.forEach((st) => {
        const stRef = doc(db, 'stories', st.id);
        batch.set(stRef, st);
      });
      hasWrites = true;
    }

    // 5. Seed Foundation General Settings if not exists
    const settingsSnap = await getDoc(doc(db, 'settings', 'general'));
    if (!settingsSnap.exists()) {
      console.log('[Firestore] Seeding initial Foundation General Settings...');
      const settingsRef = doc(db, 'settings', 'general');
      batch.set(settingsRef, FOUNDATION_INFO);
      hasWrites = true;
    }

    // 6. Seed Financials (MoMo & Bank) if not exists
    const financialsSnap = await getDoc(doc(db, 'settings', 'financials'));
    if (!financialsSnap.exists()) {
      console.log('[Firestore] Seeding initial Financial Channels...');
      const financialsRef = doc(db, 'settings', 'financials');
      batch.set(financialsRef, {
        momoAccounts: DEFAULT_MOMO_ACCOUNTS,
        bankAccounts: DEFAULT_BANK_ACCOUNTS,
        updatedAt: new Date().toISOString(),
      });
      hasWrites = true;
    }

    if (hasWrites) {
      await batch.commit();
      console.log('[Firestore] Cloud database initialized and synchronized successfully!');
      return true;
    }

    console.log('[Firestore] All collections already populated in Cloud Firestore.');
    return false;
  } catch (err) {
    console.warn('[Firestore] Auto-seed error:', err);
    return false;
  }
}
