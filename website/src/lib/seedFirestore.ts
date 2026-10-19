import {
  collection,
  getDocs,
  doc,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';
import {
  DEFAULT_HERO_SLIDES,
} from '../context/DataContext';
import {
  OUR_PROGRAMS,
  PROGRAM_ARTICLES,
  UPCOMING_PROJECTS,
  BENEFICIARY_STORIES,
  FOUNDATION_INFO,
} from '../data/foundationData';

/**
 * Seeds default data into Firestore if collections are currently empty.
 * Runs safely and idempotently.
 */
export async function seedFirestoreIfEmpty(): Promise<boolean> {
  try {
    const slidesSnap = await getDocs(collection(db, 'hero_slides'));
    if (!slidesSnap.empty) {
      console.log('[Firestore] Data already exists in Cloud Firestore. Skipping seed.');
      return false;
    }

    console.log('[Firestore] Empty database detected. Seeding initial Foundation data...');
    const batch = writeBatch(db);

    // 1. Seed Hero Slides
    DEFAULT_HERO_SLIDES.forEach((slide) => {
      const slideRef = doc(db, 'hero_slides', String(slide.id));
      batch.set(slideRef, slide);
    });

    // 2. Seed Projects
    OUR_PROGRAMS.forEach((prog) => {
      const progRef = doc(db, 'projects', prog.id);
      batch.set(progRef, prog);
    });

    // 3. Seed Program Articles
    Object.entries(PROGRAM_ARTICLES).forEach(([id, article]) => {
      const artRef = doc(db, 'program_articles', id);
      batch.set(artRef, article);
    });

    // 4. Seed Events
    UPCOMING_PROJECTS.forEach((ev) => {
      const evRef = doc(db, 'events', ev.id);
      batch.set(evRef, ev);
    });

    // 5. Seed Stories
    BENEFICIARY_STORIES.forEach((st) => {
      const stRef = doc(db, 'stories', st.id);
      batch.set(stRef, st);
    });

    // 6. Seed Foundation Settings
    const settingsRef = doc(db, 'settings', 'general');
    batch.set(settingsRef, FOUNDATION_INFO);

    await batch.commit();
    console.log('[Firestore] Initial foundation data seeded successfully!');
    return true;
  } catch (err) {
    console.warn('[Firestore] Auto-seed deferred (Firestore may still be provisioning):', err);
    return false;
  }
}
