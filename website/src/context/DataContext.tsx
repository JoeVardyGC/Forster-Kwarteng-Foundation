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
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { db, isFirebaseReady, cleanFirestoreData } from '../lib/firebase';
import { seedFirestoreIfEmpty } from '../lib/seedFirestore';

// Initial default hero slides (IDs match Firestore document IDs)
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

const DATA_STORAGE_KEY = 'fkf_site_data_v3';

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
  // Load cached state for instant initial render before Firestore snapshot arrives
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

  // Sync lightweight cache to localStorage
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
      // If localStorage quota is exceeded due to multiple high-res photos, Cloud Firestore still holds full state
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

  // --- Cloud Firestore Realtime Synchronization ---
  useEffect(() => {
    if (!isFirebaseReady()) return;

    let cancelled = false;
    const unsubs: Array<() => void> = [];

    seedFirestoreIfEmpty()
      .catch(() => {})
      .finally(() => {
        if (cancelled) return;

        // 1. Subscribe to hero_slides
        unsubs.push(
          onSnapshot(
            collection(db, 'hero_slides'),
            (snapshot) => {
              if (!snapshot.empty) {
                const cloudSlides = snapshot.docs.map((d) => ({
                  ...(d.data() as HeroSlide),
                  id: d.id,
                }));
                cloudSlides.sort(
                  (a, b) =>
                    (Number(a.order) || 99) - (Number(b.order) || 99)
                );
                setHeroSlides(cloudSlides);
              }
            },
            (err) => console.warn('[Firestore] hero_slides listener error:', err)
          )
        );

        // 2. Subscribe to projects
        unsubs.push(
          onSnapshot(
            collection(db, 'projects'),
            (snapshot) => {
              const cloudProgs = snapshot.docs.map((d) => ({
                ...(d.data() as FoundationProgram),
                id: d.id,
              }));
              setPrograms(cloudProgs);
            },
            (err) => console.warn('[Firestore] projects listener error:', err)
          )
        );

        // 3. Subscribe to program_articles
        unsubs.push(
          onSnapshot(
            collection(db, 'program_articles'),
            (snapshot) => {
              const cloudArticles: Record<string, ProgramArticle> = {};
              snapshot.docs.forEach((d) => {
                cloudArticles[d.id] = {
                  ...(d.data() as ProgramArticle),
                  id: d.id,
                };
              });
              setProgramArticles(cloudArticles);
            },
            (err) => console.warn('[Firestore] program_articles listener error:', err)
          )
        );

        // 4. Subscribe to events
        unsubs.push(
          onSnapshot(
            collection(db, 'events'),
            (snapshot) => {
              const cloudEvents = snapshot.docs.map((d) => ({
                ...(d.data() as UpcomingProjectEvent),
                id: d.id,
              }));
              setUpcomingEvents(cloudEvents);
            },
            (err) => console.warn('[Firestore] events listener error:', err)
          )
        );

        // 5. Subscribe to stories
        unsubs.push(
          onSnapshot(
            collection(db, 'stories'),
            (snapshot) => {
              const cloudStories = snapshot.docs.map((d) => ({
                ...(d.data() as BeneficiaryStory),
                id: d.id,
              }));
              setBeneficiaryStories(cloudStories);
            },
            (err) => console.warn('[Firestore] stories listener error:', err)
          )
        );

        // 6. Subscribe to settings/general
        unsubs.push(
          onSnapshot(
            doc(db, 'settings', 'general'),
            (snapshot) => {
              if (snapshot.exists()) {
                const cloud = snapshot.data() as Partial<typeof FOUNDATION_INFO>;
                setFoundationInfo((prev) => ({
                  ...prev,
                  ...cloud,
                }));
              }
            },
            (err) => console.warn('[Firestore] settings/general listener error:', err)
          )
        );

        // 7. Subscribe to contact_messages
        unsubs.push(
          onSnapshot(
            collection(db, 'contact_messages'),
            (snapshot) => {
              const msgs = snapshot.docs
                .map((d) => ({ ...(d.data() as ContactSubmission), id: d.id }))
                .filter((m) => m && m.id !== 'msg-demo-1' && !String(m.id).startsWith('demo-'));
              msgs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
              setContactMessages(msgs);
            },
            (err) => console.warn('[Firestore] contact_messages listener error:', err)
          )
        );

        // 8. Subscribe to volunteer_submissions
        unsubs.push(
          onSnapshot(
            collection(db, 'volunteer_submissions'),
            (snapshot) => {
              const vols = snapshot.docs
                .map((d) => ({ ...(d.data() as VolunteerSubmission), id: d.id }))
                .filter((v) => v && v.id !== 'vol-demo-1' && !String(v.id).startsWith('demo-'));
              vols.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
              setVolunteerSubmissions(vols);
            },
            (err) => console.warn('[Firestore] volunteer_submissions listener error:', err)
          )
        );

        // 9. Subscribe to settings/financials (Mobile Money & Bank Accounts)
        unsubs.push(
          onSnapshot(
            doc(db, 'settings', 'financials'),
            (snapshot) => {
              if (snapshot.exists()) {
                const data = snapshot.data();
                if (data.momoAccounts && Array.isArray(data.momoAccounts)) {
                  setMomoAccounts(data.momoAccounts);
                }
                if (data.bankAccounts && Array.isArray(data.bankAccounts)) {
                  setBankAccounts(data.bankAccounts);
                }
              }
            },
            (err) => console.warn('[Firestore] settings/financials listener error:', err)
          )
        );
      });

    return () => {
      cancelled = true;
      unsubs.forEach((u) => u());
    };
  }, []);

  // --- Hero Carousel Actions ---
  const addHeroSlide = (slide: Omit<HeroSlide, 'id'>) => {
    const newId = `slide-${Date.now()}`;
    const newSlide: HeroSlide = cleanFirestoreData({
      ...slide,
      id: newId,
      order: heroSlides.length + 1,
    });
    setHeroSlides((prev) => [...prev, newSlide]);
    setDoc(doc(db, 'hero_slides', newId), newSlide).catch((err) =>
      console.error('[Firestore] Failed to add hero slide:', err)
    );
  };

  const updateHeroSlide = (id: string | number, updated: Partial<HeroSlide>) => {
    const docId = String(id);
    setHeroSlides((prev) => {
      const next = prev.map((s) => {
        if (String(s.id) === docId) {
          const merged = cleanFirestoreData({ ...s, ...updated, id: docId });
          setDoc(doc(db, 'hero_slides', docId), merged, { merge: true }).catch((err) =>
            console.error('[Firestore] Failed to update hero slide:', err)
          );
          return merged;
        }
        return s;
      });
      return next;
    });
  };

  const deleteHeroSlide = (id: string | number) => {
    const docId = String(id);
    setHeroSlides((prev) => prev.filter((s) => String(s.id) !== docId));
    deleteDoc(doc(db, 'hero_slides', docId)).catch((err) =>
      console.error('[Firestore] Failed to delete hero slide:', err)
    );
  };

  const reorderHeroSlides = (newSlides: HeroSlide[]) => {
    const ordered = newSlides.map((slide, idx) =>
      cleanFirestoreData({ ...slide, id: String(slide.id), order: idx + 1 })
    );
    setHeroSlides(ordered);
    ordered.forEach((slide) => {
      setDoc(doc(db, 'hero_slides', String(slide.id)), slide, { merge: true }).catch((err) =>
        console.error('[Firestore] Failed to reorder slide:', err)
      );
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
    setDoc(doc(db, 'projects', cleanProg.id), cleanProg).catch((err) =>
      console.error('[Firestore] Failed to add project:', err)
    );
    setDoc(doc(db, 'program_articles', cleanProg.id), cleanArt).catch((err) =>
      console.error('[Firestore] Failed to add program article:', err)
    );
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
    setDoc(doc(db, 'projects', cleanProg.id), cleanProg).catch((err) =>
      console.error('[Firestore] Failed to update project:', err)
    );
    setDoc(doc(db, 'program_articles', cleanProg.id), cleanArt).catch((err) =>
      console.error('[Firestore] Failed to update program article:', err)
    );
  };

  const deleteProject = (id: string) => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
    setProgramArticles((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    deleteDoc(doc(db, 'projects', id)).catch((err) =>
      console.error('[Firestore] Failed to delete project:', err)
    );
    deleteDoc(doc(db, 'program_articles', id)).catch((err) =>
      console.error('[Firestore] Failed to delete program article:', err)
    );
  };

  // --- Upcoming Events Actions ---
  const addEvent = (event: UpcomingProjectEvent) => {
    const cleanEv = cleanFirestoreData(event);
    setUpcomingEvents((prev) => [cleanEv, ...prev]);
    setDoc(doc(db, 'events', cleanEv.id), cleanEv).catch((err) =>
      console.error('[Firestore] Failed to add event:', err)
    );
  };

  const updateEvent = (event: UpcomingProjectEvent) => {
    const cleanEv = cleanFirestoreData(event);
    setUpcomingEvents((prev) =>
      prev.map((e) => (e.id === cleanEv.id ? cleanEv : e))
    );
    setDoc(doc(db, 'events', cleanEv.id), cleanEv).catch((err) =>
      console.error('[Firestore] Failed to update event:', err)
    );
  };

  const deleteEvent = (id: string) => {
    setUpcomingEvents((prev) => prev.filter((e) => e.id !== id));
    deleteDoc(doc(db, 'events', id)).catch((err) =>
      console.error('[Firestore] Failed to delete event:', err)
    );
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
        setDoc(doc(db, 'events', e.id), updated).catch((err) =>
          console.error('[Firestore] Failed to set featured event:', err)
        );
        return updated;
      })
    );
  };

  // --- Story Actions ---
  const addStory = (story: BeneficiaryStory) => {
    const cleanSt = cleanFirestoreData(story);
    setBeneficiaryStories((prev) => [cleanSt, ...prev]);
    setDoc(doc(db, 'stories', cleanSt.id), cleanSt).catch((err) =>
      console.error('[Firestore] Failed to add story:', err)
    );
  };

  const updateStory = (story: BeneficiaryStory) => {
    const cleanSt = cleanFirestoreData(story);
    setBeneficiaryStories((prev) =>
      prev.map((s) => (s.id === cleanSt.id ? cleanSt : s))
    );
    setDoc(doc(db, 'stories', cleanSt.id), cleanSt).catch((err) =>
      console.error('[Firestore] Failed to update story:', err)
    );
  };

  const deleteStory = (id: string) => {
    setBeneficiaryStories((prev) => prev.filter((s) => s.id !== id));
    deleteDoc(doc(db, 'stories', id)).catch((err) =>
      console.error('[Firestore] Failed to delete story:', err)
    );
  };

  // --- Settings Actions ---
  const updateFoundationInfo = (info: Partial<typeof FOUNDATION_INFO>) => {
    const updated = cleanFirestoreData({ ...foundationInfo, ...info });
    setFoundationInfo(updated);
    setDoc(doc(db, 'settings', 'general'), updated, { merge: true }).catch((err) => {
      console.error('[Firestore] settings/general update failed:', err);
    });
  };

  // --- Donation Channel Actions ---
  const saveFinancialsToFirestore = (updatedMomo: MomoAccount[], updatedBank: BankAccount[]) => {
    setDoc(
      doc(db, 'settings', 'financials'),
      cleanFirestoreData({
        momoAccounts: updatedMomo,
        bankAccounts: updatedBank,
        updatedAt: new Date().toISOString(),
      }),
      { merge: true }
    ).catch((err) => console.error('[Firestore] settings/financials update failed:', err));
  };

  const updateMomoAccounts = (accounts: MomoAccount[]) => {
    setMomoAccounts(accounts);
    saveFinancialsToFirestore(accounts, bankAccounts);
  };

  const addMomoAccount = (account: Omit<MomoAccount, 'id'>) => {
    const newAcc: MomoAccount = {
      ...account,
      id: `momo-${Date.now()}`,
    };
    const updated = [...momoAccounts, newAcc];
    setMomoAccounts(updated);
    saveFinancialsToFirestore(updated, bankAccounts);
  };

  const updateMomoAccount = (id: string, updated: Partial<MomoAccount>) => {
    const newAccounts = momoAccounts.map((acc) =>
      acc.id === id ? { ...acc, ...updated } : acc
    );
    setMomoAccounts(newAccounts);
    saveFinancialsToFirestore(newAccounts, bankAccounts);
  };

  const deleteMomoAccount = (id: string) => {
    const newAccounts = momoAccounts.filter((acc) => acc.id !== id);
    setMomoAccounts(newAccounts);
    saveFinancialsToFirestore(newAccounts, bankAccounts);
  };

  const updateBankAccounts = (accounts: BankAccount[]) => {
    setBankAccounts(accounts);
    saveFinancialsToFirestore(momoAccounts, accounts);
  };

  const addBankAccount = (account: Omit<BankAccount, 'id'>) => {
    const newAcc: BankAccount = {
      ...account,
      id: `bank-${Date.now()}`,
    };
    const updated = [...bankAccounts, newAcc];
    setBankAccounts(updated);
    saveFinancialsToFirestore(momoAccounts, updated);
  };

  const updateBankAccount = (id: string, updated: Partial<BankAccount>) => {
    const newAccounts = bankAccounts.map((acc) =>
      acc.id === id ? { ...acc, ...updated } : acc
    );
    setBankAccounts(newAccounts);
    saveFinancialsToFirestore(momoAccounts, newAccounts);
  };

  const deleteBankAccount = (id: string) => {
    const newAccounts = bankAccounts.filter((acc) => acc.id !== id);
    setBankAccounts(newAccounts);
    saveFinancialsToFirestore(momoAccounts, newAccounts);
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
    setDoc(doc(db, 'contact_messages', newMsg.id), newMsg).catch((err) =>
      console.error('[Firestore] Failed to submit contact form:', err)
    );
  };

  const deleteContactMessage = (id: string) => {
    setContactMessages((prev) => prev.filter((m) => m.id !== id));
    deleteDoc(doc(db, 'contact_messages', id)).catch((err) =>
      console.error('[Firestore] Failed to delete contact message:', err)
    );
  };

  const updateContactStatus = (id: string, status: 'new' | 'read' | 'replied') => {
    setContactMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
    updateDoc(doc(db, 'contact_messages', id), { status }).catch((err) =>
      console.error('[Firestore] Failed to update contact status:', err)
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
    setDoc(doc(db, 'volunteer_submissions', newVol.id), newVol).catch((err) =>
      console.error('[Firestore] Failed to submit volunteer form:', err)
    );
  };

  const deleteVolunteerSubmission = (id: string) => {
    setVolunteerSubmissions((prev) => prev.filter((v) => v.id !== id));
    deleteDoc(doc(db, 'volunteer_submissions', id)).catch((err) =>
      console.error('[Firestore] Failed to delete volunteer submission:', err)
    );
  };

  const updateVolunteerStatus = (id: string, status: 'new' | 'reviewed' | 'contacted') => {
    setVolunteerSubmissions((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status } : v))
    );
    updateDoc(doc(db, 'volunteer_submissions', id), { status }).catch((err) =>
      console.error('[Firestore] Failed to update volunteer status:', err)
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
