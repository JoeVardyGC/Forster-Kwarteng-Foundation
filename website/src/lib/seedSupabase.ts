import {
  supabase,
  isSupabaseReady,
  fetchSupabaseDoc,
  upsertSupabaseDoc,
} from './supabase';
import { cleanFirestoreData } from './firebase';
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
 * Seeds default foundation data into Supabase ONLY ONCE when the database is brand new.
 * Once `settings/seed_status` exists with `initialized: true`, it never re-seeds deleted items.
 */
export async function seedSupabaseIfEmpty(): Promise<boolean> {
  if (!isSupabaseReady() || !supabase) return false;

  try {
    const seedStatus = await fetchSupabaseDoc<{ initialized?: boolean }>('settings', 'seed_status');
    if (seedStatus?.initialized) {
      return false;
    }

    // 1. Seed Hero Slides if empty
    const { data: slidesRows } = await supabase.from('hero_slides').select('id').limit(1);
    if (!slidesRows || slidesRows.length === 0) {
      for (let i = 0; i < DEFAULT_HERO_SLIDES.length; i++) {
        const slide = DEFAULT_HERO_SLIDES[i];
        const slideId = String(slide.id);
        await upsertSupabaseDoc(
          'hero_slides',
          slideId,
          cleanFirestoreData({ ...slide, id: slideId, order: i + 1 })
        );
      }
    }

    // 2. Seed Projects & Articles if empty
    const { data: projRows } = await supabase.from('projects').select('id').limit(1);
    if (!projRows || projRows.length === 0) {
      for (const prog of OUR_PROGRAMS) {
        await upsertSupabaseDoc('projects', prog.id, cleanFirestoreData(prog));
      }
      for (const [id, article] of Object.entries(PROGRAM_ARTICLES)) {
        await upsertSupabaseDoc('program_articles', id, cleanFirestoreData(article));
      }
    }

    // 3. Seed Events if empty
    const { data: evRows } = await supabase.from('events').select('id').limit(1);
    if (!evRows || evRows.length === 0) {
      for (const ev of UPCOMING_PROJECTS) {
        await upsertSupabaseDoc('events', ev.id, cleanFirestoreData(ev));
      }
    }

    // 4. Seed Stories if empty
    const { data: stRows } = await supabase.from('stories').select('id').limit(1);
    if (!stRows || stRows.length === 0) {
      for (const st of BENEFICIARY_STORIES) {
        await upsertSupabaseDoc('stories', st.id, cleanFirestoreData(st));
      }
    }

    // 5. Seed General Settings if not exists
    const generalDoc = await fetchSupabaseDoc('settings', 'general');
    if (!generalDoc) {
      await upsertSupabaseDoc('settings', 'general', cleanFirestoreData(FOUNDATION_INFO));
    }

    // 6. Seed Financial Settings if not exists
    const finDoc = await fetchSupabaseDoc('settings', 'financials');
    if (!finDoc) {
      await upsertSupabaseDoc(
        'settings',
        'financials',
        cleanFirestoreData({
          momoAccounts: DEFAULT_MOMO_ACCOUNTS,
          bankAccounts: DEFAULT_BANK_ACCOUNTS,
          updatedAt: new Date().toISOString(),
        })
      );
    }

    // Permanently mark Supabase database as initialized
    await upsertSupabaseDoc('settings', 'seed_status', {
      initialized: true,
      seededAt: new Date().toISOString(),
    });

    return true;
  } catch (err) {
    console.warn('[Supabase] Auto-seed check skipped:', err);
    return false;
  }
}
