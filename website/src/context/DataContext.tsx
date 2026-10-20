import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  HeroSlide,
  FoundationProgram,
  ProgramArticle,
  UpcomingProjectEvent,
  BeneficiaryStory,
  ContactSubmission,
  VolunteerSubmission,
  MomoAccount,
  BankAccount,
} from '../types';
import {
  OUR_PROGRAMS,
  PROGRAM_ARTICLES,
  UPCOMING_PROJECTS,
  BENEFICIARY_STORIES,
  FOUNDATION_INFO,
  DEFAULT_MOMO_ACCOUNTS,
  DEFAULT_BANK_ACCOUNTS,
} from '../data/foundationData';
import { cleanFirestoreData } from '../lib/firebase';
import {
  supabase,
  fetchSupabaseCollection,
  fetchSupabaseDoc,
  upsertSupabaseDoc,
  deleteSupabaseDoc,
} from '../lib/supabase';
import { seedSupabaseIfEmpty } from '../lib/seedSupabase';

// Initial default hero slides
export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    order: 1,
    image: '/assets/hero_boy_right.jpg',
    pillar: 'Pillar 01 • Education Sponsorship',
    headlinePrefix: '‘Every Child Deserves',
    headlineHighlight: 'A Desk & A Dream’',
    description:
      'Equipping orphaned and vulnerable school children across Ghana with textbooks, uniforms, and scholarships.',
    tag: 'Educational Sponsorship',
    title: 'Dignity & Hope in the Classroom',
  },
  {
    id: 'slide-2',
    order: 2,
    image: '/assets/hero_girls_right.jpg',
    pillar: 'Pillar 02 • Mentorship & Literacy',
    headlinePrefix: '‘Unlocking Hope Through',
    headlineHighlight: 'Girl-Child Literacy’',
    description:
      'Creating safe reading clubs and structured mentorship circles so every young girl thrives in school and beyond.',
    tag: 'Girl-Child Literacy',
    title: 'Foundations of Lifelong Learning',
  },
  {
    id: 'slide-3',
    order: 3,
    image: '/assets/hero_outreach_right.jpg',
    pillar: 'Pillar 03 • Community Care & Relief',
    headlinePrefix: '‘Grassroots Aid Where',
    headlineHighlight: 'It Matters Most’',
    description:
      'Delivering essential back-to-school kits, nutritional supplies, and urgent relief directly to underserved families.',
    tag: 'Community Care & Relief',
    title: 'Direct Aid & Emergency Safety Nets',
  },
  {
    id: 'slide-4',
    order: 4,
    image: '/assets/hero_group_right.jpg',
    pillar: 'Pillar 04 • Sustainable Futures',
    headlinePrefix: '‘Empowering Lives,',
    headlineHighlight: 'Building Futures’',
    description:
      'Fostering self-reliance, vocational mastery, and dignity for marginalized Ghanaian youth and families.',
    tag: 'Youth Mastery',
    title: 'Generational Community Progress',
  },
];

const DATA_STORAGE_KEY = 'fkf_supabase_cache_v1';

interface DataContextType {
  // State
  heroSlides: HeroSlide[];
  programs: FoundationProgram[];
  programArticles: Record<string, ProgramArticle>;
  upcomingEvents: UpcomingProjectEvent[];
  beneficiaryStories: BeneficiaryStory[];
  foundationInfo: typeof FOUNDATION_INFO;
  momoAccounts: MomoAccount[];
  bankAccounts: BankAccount[];
  contactMessages: ContactSubmission[];
  volunteerSubmissions: VolunteerSubmission[];

  // Hero Carousel Actions
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  updateHeroSlide: (id: string | number, updated: Partial<HeroSlide>) => void;
  deleteHeroSlide: (id: string | number) => void;
  reorderHeroSlides: (slides: HeroSlide[]) => void;

  // Project Actions
  addProject: (program: FoundationProgram, article: ProgramArticle) => void;
  updateProject: (program: FoundationProgram, article: ProgramArticle) => void;
  deleteProject: (id: string) => void;

  // Upcoming Event Actions
  addEvent: (event: UpcomingProjectEvent) => void;
  updateEvent: (event: UpcomingProjectEvent) => void;
  deleteEvent: (id: string) => void;
  setFeaturedEvent: (id: string) => void;

  // Story Actions
  addStory: (story: BeneficiaryStory) => void;
  updateStory: (story: BeneficiaryStory) => void;
  deleteStory: (id: string) => void;

  // Settings Actions
  updateFoundationInfo: (info: Partial<typeof FOUNDATION_INFO>) => void;

  // Donation Channels Actions
  updateMomoAccounts: (accounts: MomoAccount[]) => void;
  addMomoAccount: (account: Omit<MomoAccount, 'id'>) => void;
  updateMomoAccount: (id: string, updated: Partial<MomoAccount>) => void;
  deleteMomoAccount: (id: string) => void;

  updateBankAccounts: (accounts: BankAccount[]) => void;
  addBankAccount: (account: Omit<BankAccount, 'id'>) => void;
  updateBankAccount: (id: string, updated: Partial<BankAccount>) => void;
  deleteBankAccount: (id: string) => void;

  // Submission Inbox Actions
  submitContactForm: (data: Omit<ContactSubmission, 'id' | 'date' | 'status'>) => void;
  deleteContactMessage: (id: string) => void;
  updateContactStatus: (id: string, status: 'new' | 'read' | 'replied') => void;

  submitVolunteerForm: (data: Omit<VolunteerSubmission, 'id' | 'date' | 'status'>) => void;
  deleteVolunteerSubmission: (id: string) => void;
  updateVolunteerStatus: (id: string, status: 'new' | 'reviewed' | 'contacted') => void;

  // Factory Reset
  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitial = () => {
    try {
      const stored = localStorage.getItem(DATA_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.contactMessages && Array.isArray(parsed.contactMessages)) {
          parsed.contactMessages = parsed.contactMessages.filter(
            (m: any) => m && m.id !== 'msg-demo-1' && !String(m.id).startsWith('demo-')
          );
        }
        if (parsed.volunteerSubmissions && Array.isArray(parsed.volunteerSubmissions)) {
          parsed.volunteerSubmissions = parsed.volunteerSubmissions.filter(
            (v: any) => v && v.id !== 'vol-demo-1' && !String(v.id).startsWith('demo-')
          );
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse cached site data, loading defaults.', e);
    }
    return {
      heroSlides: DEFAULT_HERO_SLIDES,
      programs: OUR_PROGRAMS,
      programArticles: PROGRAM_ARTICLES,
      upcomingEvents: UPCOMING_PROJECTS,
      beneficiaryStories: BENEFICIARY_STORIES,
      foundationInfo: FOUNDATION_INFO,
      momoAccounts: DEFAULT_MOMO_ACCOUNTS,
      bankAccounts: DEFAULT_BANK_ACCOUNTS,
      contactMessages: [],
      volunteerSubmissions: [],
    };
  };

  const initial = getInitial();

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(initial.heroSlides || DEFAULT_HERO_SLIDES);
  const [programs, setPrograms] = useState<FoundationProgram[]>(initial.programs || OUR_PROGRAMS);
  const [programArticles, setProgramArticles] = useState<Record<string, ProgramArticle>>(
    initial.programArticles || PROGRAM_ARTICLES
  );
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingProjectEvent[]>(
    initial.upcomingEvents || UPCOMING_PROJECTS
  );
  const [beneficiaryStories, setBeneficiaryStories] = useState<BeneficiaryStory[]>(
    initial.beneficiaryStories || BENEFICIARY_STORIES
  );
  const [foundationInfo, setFoundationInfo] = useState<typeof FOUNDATION_INFO>(
    initial.foundationInfo || FOUNDATION_INFO
  );
  const [momoAccounts, setMomoAccounts] = useState<MomoAccount[]>(
    initial.momoAccounts || DEFAULT_MOMO_ACCOUNTS
  );
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(
    initial.bankAccounts || DEFAULT_BANK_ACCOUNTS
  );
  const [contactMessages, setContactMessages] = useState<ContactSubmission[]>(
    initial.contactMessages || []
  );
  const [volunteerSubmissions, setVolunteerSubmissions] = useState<VolunteerSubmission[]>(
    initial.volunteerSubmissions || []
  );

  // Sync lightweight cache to localStorage for instant initial page render
  useEffect(() => {
    try {
      const payload = {
        heroSlides,
        programs,
        programArticles,
        upcomingEvents,
        beneficiaryStories,
        foundationInfo,
        momoAccounts,
        bankAccounts,
        contactMessages,
        volunteerSubmissions,
      };
      localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Supabase PostgreSQL holds the authoritative state
    }
  }, [
    heroSlides,
    programs,
    programArticles,
    upcomingEvents,
    beneficiaryStories,
    foundationInfo,
    momoAccounts,
    bankAccounts,
    contactMessages,
    volunteerSubmissions,
  ]);

  // --- Supabase PostgreSQL & Realtime Synchronization ---
  useEffect(() => {
    let cancelled = false;

    const refreshAllFromSupabase = async () => {
      if (cancelled) return;

      const [
        slidesData,
        progsData,
        artsData,
        eventsData,
        storiesData,
        generalSettings,
        financialSettings,
        contactsData,
        volsData,
      ] = await Promise.all([
        fetchSupabaseCollection<HeroSlide>('hero_slides'),
        fetchSupabaseCollection<FoundationProgram>('projects'),
        fetchSupabaseCollection<ProgramArticle>('program_articles'),
        fetchSupabaseCollection<UpcomingProjectEvent>('events'),
        fetchSupabaseCollection<BeneficiaryStory>('stories'),
        fetchSupabaseDoc<Partial<typeof FOUNDATION_INFO>>('settings', 'general'),
        fetchSupabaseDoc<{ momoAccounts?: MomoAccount[]; bankAccounts?: BankAccount[] }>('settings', 'financials'),
        fetchSupabaseCollection<ContactSubmission>('contact_messages'),
        fetchSupabaseCollection<VolunteerSubmission>('volunteer_submissions'),
      ]);

      if (cancelled) return;

      if (slidesData && slidesData.length > 0) {
        slidesData.sort((a, b) => (Number(a.order) || 99) - (Number(b.order) || 99));
        setHeroSlides(slidesData);
      }
      if (progsData) {
        setPrograms(progsData);
      }
      if (artsData) {
        const map: Record<string, ProgramArticle> = {};
        artsData.forEach((a) => {
          map[a.id] = a;
        });
        setProgramArticles(map);
      }
      if (eventsData) {
        setUpcomingEvents(eventsData);
      }
      if (storiesData) {
        setBeneficiaryStories(storiesData);
      }
      if (generalSettings) {
        setFoundationInfo((prev) => ({ ...prev, ...generalSettings }));
      }
      if (financialSettings) {
        if (Array.isArray(financialSettings.momoAccounts)) {
          setMomoAccounts(financialSettings.momoAccounts);
        }
        if (Array.isArray(financialSettings.bankAccounts)) {
          setBankAccounts(financialSettings.bankAccounts);
        }
      }
      if (contactsData) {
        const cleanMsgs = contactsData.filter(
          (m) => m && m.id !== 'msg-demo-1' && !String(m.id).startsWith('demo-')
        );
        cleanMsgs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setContactMessages(cleanMsgs);
      }
      if (volsData) {
        const cleanVols = volsData.filter(
          (v) => v && v.id !== 'vol-demo-1' && !String(v.id).startsWith('demo-')
        );
        cleanVols.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setVolunteerSubmissions(cleanVols);
      }
    };

    let channel: ReturnType<typeof supabase.channel> | null = null;

    seedSupabaseIfEmpty()
      .catch(() => {})
      .finally(() => {
        if (cancelled) return;
        refreshAllFromSupabase();

        channel = supabase
          .channel('fkf-realtime-db-changes')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public' },
            () => {
              refreshAllFromSupabase();
            }
          )
          .subscribe();
      });

    return () => {
      cancelled = true;
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  // --- Supabase Write Helpers ---
  const syncDocToCloud = (tableName: string, docId: string, payload: any) => {
    const clean = cleanFirestoreData(payload);
    upsertSupabaseDoc(tableName, docId, clean).catch((err) =>
      console.error(`[Supabase] Write failed on ${tableName}/${docId}:`, err)
    );
  };

  const removeDocFromCloud = (tableName: string, docId: string) => {
    deleteSupabaseDoc(tableName, docId).catch((err) =>
      console.error(`[Supabase] Delete failed on ${tableName}/${docId}:`, err)
    );
  };

  // --- Hero Carousel Actions ---
  const addHeroSlide = (slide: Omit<HeroSlide, 'id'>) => {
    const newId = `slide-${Date.now()}`;
    const newSlide: HeroSlide = cleanFirestoreData({
      ...slide,
      id: newId,
      order: heroSlides.length + 1,
    });
    setHeroSlides((prev) => [...prev, newSlide]);
    syncDocToCloud('hero_slides', newId, newSlide);
  };

  const updateHeroSlide = (id: string | number, updated: Partial<HeroSlide>) => {
    const docId = String(id);
    setHeroSlides((prev) =>
      prev.map((s) => {
        if (String(s.id) === docId) {
          const merged = cleanFirestoreData({ ...s, ...updated, id: docId });
          syncDocToCloud('hero_slides', docId, merged);
          return merged;
        }
        return s;
      })
    );
  };

  const deleteHeroSlide = (id: string | number) => {
    const docId = String(id);
    setHeroSlides((prev) => prev.filter((s) => String(s.id) !== docId));
    removeDocFromCloud('hero_slides', docId);
  };

  const reorderHeroSlides = (newSlides: HeroSlide[]) => {
    const ordered = newSlides.map((slide, idx) =>
      cleanFirestoreData({ ...slide, id: String(slide.id), order: idx + 1 })
    );
    setHeroSlides(ordered);
    ordered.forEach((slide) => {
      syncDocToCloud('hero_slides', String(slide.id), slide);
    });
  };

  // --- Project Actions ---
  const addProject = (program: FoundationProgram, article: ProgramArticle) => {
    const cleanProg = cleanFirestoreData(program);
    const cleanArt = cleanFirestoreData(article);
    setPrograms((prev) => [cleanProg, ...prev]);
    setProgramArticles((prev) => ({
      ...prev,
      [cleanProg.id]: cleanArt,
    }));
    syncDocToCloud('projects', cleanProg.id, cleanProg);
    syncDocToCloud('program_articles', cleanProg.id, cleanArt);
  };

  const updateProject = (program: FoundationProgram, article: ProgramArticle) => {
    const cleanProg = cleanFirestoreData(program);
    const cleanArt = cleanFirestoreData(article);
    setPrograms((prev) =>
      prev.map((p) => (p.id === cleanProg.id ? cleanProg : p))
    );
    setProgramArticles((prev) => ({
      ...prev,
      [cleanProg.id]: cleanArt,
    }));
    syncDocToCloud('projects', cleanProg.id, cleanProg);
    syncDocToCloud('program_articles', cleanProg.id, cleanArt);
  };

  const deleteProject = (id: string) => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
    setProgramArticles((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    removeDocFromCloud('projects', id);
    removeDocFromCloud('program_articles', id);
  };

  // --- Upcoming Events Actions ---
  const addEvent = (event: UpcomingProjectEvent) => {
    const cleanEv = cleanFirestoreData(event);
    setUpcomingEvents((prev) => [cleanEv, ...prev]);
    syncDocToCloud('events', cleanEv.id, cleanEv);
  };

  const updateEvent = (event: UpcomingProjectEvent) => {
    const cleanEv = cleanFirestoreData(event);
    setUpcomingEvents((prev) =>
      prev.map((e) => (e.id === cleanEv.id ? cleanEv : e))
    );
    syncDocToCloud('events', cleanEv.id, cleanEv);
  };

  const deleteEvent = (id: string) => {
    setUpcomingEvents((prev) => prev.filter((e) => e.id !== id));
    removeDocFromCloud('events', id);
  };

  const setFeaturedEvent = (id: string) => {
    setUpcomingEvents((prev) =>
      prev.map((e) => {
        const isTarget = e.id === id;
        const updated = cleanFirestoreData({
          ...e,
          status: isTarget ? ('Featured' as const) : e.status === 'Featured' ? ('Upcoming' as const) : e.status,
          isLiveCountdown: isTarget,
        });
        syncDocToCloud('events', e.id, updated);
        return updated;
      })
    );
  };

  // --- Story Actions ---
  const addStory = (story: BeneficiaryStory) => {
    const cleanSt = cleanFirestoreData(story);
    setBeneficiaryStories((prev) => [cleanSt, ...prev]);
    syncDocToCloud('stories', cleanSt.id, cleanSt);
  };

  const updateStory = (story: BeneficiaryStory) => {
    const cleanSt = cleanFirestoreData(story);
    setBeneficiaryStories((prev) =>
      prev.map((s) => (s.id === cleanSt.id ? cleanSt : s))
    );
    syncDocToCloud('stories', cleanSt.id, cleanSt);
  };

  const deleteStory = (id: string) => {
    setBeneficiaryStories((prev) => prev.filter((s) => s.id !== id));
    removeDocFromCloud('stories', id);
  };

  // --- Settings Actions ---
  const updateFoundationInfo = (info: Partial<typeof FOUNDATION_INFO>) => {
    const updated = cleanFirestoreData({ ...foundationInfo, ...info });
    setFoundationInfo(updated);
    syncDocToCloud('settings', 'general', updated);
  };

  // --- Donation Channel Actions ---
  const saveFinancialsToCloud = (updatedMomo: MomoAccount[], updatedBank: BankAccount[]) => {
    syncDocToCloud('settings', 'financials', {
      momoAccounts: updatedMomo,
      bankAccounts: updatedBank,
      updatedAt: new Date().toISOString(),
    });
  };

  const updateMomoAccounts = (accounts: MomoAccount[]) => {
    setMomoAccounts(accounts);
    saveFinancialsToCloud(accounts, bankAccounts);
  };

  const addMomoAccount = (account: Omit<MomoAccount, 'id'>) => {
    const newAcc: MomoAccount = {
      ...account,
      id: `momo-${Date.now()}`,
    };
    const updated = [...momoAccounts, newAcc];
    setMomoAccounts(updated);
    saveFinancialsToCloud(updated, bankAccounts);
  };

  const updateMomoAccount = (id: string, updated: Partial<MomoAccount>) => {
    const newAccounts = momoAccounts.map((acc) =>
      acc.id === id ? { ...acc, ...updated } : acc
    );
    setMomoAccounts(newAccounts);
    saveFinancialsToCloud(newAccounts, bankAccounts);
  };

  const deleteMomoAccount = (id: string) => {
    const newAccounts = momoAccounts.filter((acc) => acc.id !== id);
    setMomoAccounts(newAccounts);
    saveFinancialsToCloud(newAccounts, bankAccounts);
  };

  const updateBankAccounts = (accounts: BankAccount[]) => {
    setBankAccounts(accounts);
    saveFinancialsToCloud(momoAccounts, accounts);
  };

  const addBankAccount = (account: Omit<BankAccount, 'id'>) => {
    const newAcc: BankAccount = {
      ...account,
      id: `bank-${Date.now()}`,
    };
    const updated = [...bankAccounts, newAcc];
    setBankAccounts(updated);
    saveFinancialsToCloud(momoAccounts, updated);
  };

  const updateBankAccount = (id: string, updated: Partial<BankAccount>) => {
    const newAccounts = bankAccounts.map((acc) =>
      acc.id === id ? { ...acc, ...updated } : acc
    );
    setBankAccounts(newAccounts);
    saveFinancialsToCloud(momoAccounts, newAccounts);
  };

  const deleteBankAccount = (id: string) => {
    const newAccounts = bankAccounts.filter((acc) => acc.id !== id);
    setBankAccounts(newAccounts);
    saveFinancialsToCloud(momoAccounts, newAccounts);
  };

  // --- Inbox Submissions ---
  const submitContactForm = (data: Omit<ContactSubmission, 'id' | 'date' | 'status'>) => {
    const newMsg: ContactSubmission = cleanFirestoreData({
      ...data,
      id: `msg-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'new',
    });
    setContactMessages((prev) => [newMsg, ...prev]);
    syncDocToCloud('contact_messages', newMsg.id, newMsg);
  };

  const deleteContactMessage = (id: string) => {
    setContactMessages((prev) => prev.filter((m) => m.id !== id));
    removeDocFromCloud('contact_messages', id);
  };

  const updateContactStatus = (id: string, status: 'new' | 'read' | 'replied') => {
    setContactMessages((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const updated = { ...m, status };
          syncDocToCloud('contact_messages', id, updated);
          return updated;
        }
        return m;
      })
    );
  };

  const submitVolunteerForm = (data: Omit<VolunteerSubmission, 'id' | 'date' | 'status'>) => {
    const newVol: VolunteerSubmission = cleanFirestoreData({
      ...data,
      id: `vol-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'new',
    });
    setVolunteerSubmissions((prev) => [newVol, ...prev]);
    syncDocToCloud('volunteer_submissions', newVol.id, newVol);
  };

  const deleteVolunteerSubmission = (id: string) => {
    setVolunteerSubmissions((prev) => prev.filter((v) => v.id !== id));
    removeDocFromCloud('volunteer_submissions', id);
  };

  const updateVolunteerStatus = (id: string, status: 'new' | 'reviewed' | 'contacted') => {
    setVolunteerSubmissions((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          const updated = { ...v, status };
          syncDocToCloud('volunteer_submissions', id, updated);
          return updated;
        }
        return v;
      })
    );
  };

  // --- Factory Reset ---
  const resetToDefaults = () => {
    setHeroSlides(DEFAULT_HERO_SLIDES);
    setPrograms(OUR_PROGRAMS);
    setProgramArticles(PROGRAM_ARTICLES);
    setUpcomingEvents(UPCOMING_PROJECTS);
    setBeneficiaryStories(BENEFICIARY_STORIES);
    setFoundationInfo(FOUNDATION_INFO);
    setMomoAccounts(DEFAULT_MOMO_ACCOUNTS);
    setBankAccounts(DEFAULT_BANK_ACCOUNTS);
    setContactMessages([]);
    setVolunteerSubmissions([]);
    try {
      localStorage.removeItem(DATA_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <DataContext.Provider
      value={{
        heroSlides,
        programs,
        programArticles,
        upcomingEvents,
        beneficiaryStories,
        foundationInfo,
        momoAccounts,
        bankAccounts,
        contactMessages,
        volunteerSubmissions,

        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide,
        reorderHeroSlides,

        addProject,
        updateProject,
        deleteProject,

        addEvent,
        updateEvent,
        deleteEvent,
        setFeaturedEvent,

        addStory,
        updateStory,
        deleteStory,

        updateFoundationInfo,

        updateMomoAccounts,
        addMomoAccount,
        updateMomoAccount,
        deleteMomoAccount,

        updateBankAccounts,
        addBankAccount,
        updateBankAccount,
        deleteBankAccount,

        submitContactForm,
        deleteContactMessage,
        updateContactStatus,

        submitVolunteerForm,
        deleteVolunteerSubmission,
        updateVolunteerStatus,

        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
