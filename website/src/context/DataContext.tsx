import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  HeroSlide,
  FoundationProgram,
  ProgramArticle,
  UpcomingProjectEvent,
  BeneficiaryStory,
  ContactSubmission,
  VolunteerSubmission,
} from '../types';
import {
  OUR_PROGRAMS,
  PROGRAM_ARTICLES,
  UPCOMING_PROJECTS,
  BENEFICIARY_STORIES,
  FOUNDATION_INFO,
} from '../data/foundationData';

// Initial default hero slides
export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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

const DATA_STORAGE_KEY = 'fkf_site_data_v2';

interface DataContextType {
  // State
  heroSlides: HeroSlide[];
  programs: FoundationProgram[];
  programArticles: Record<string, ProgramArticle>;
  upcomingEvents: UpcomingProjectEvent[];
  beneficiaryStories: BeneficiaryStory[];
  foundationInfo: typeof FOUNDATION_INFO;
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
  // Load persisted state or defaults
  const getInitial = () => {
    try {
      const stored = localStorage.getItem(DATA_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse persisted site data, loading defaults.', e);
    }
    return {
      heroSlides: DEFAULT_HERO_SLIDES,
      programs: OUR_PROGRAMS,
      programArticles: PROGRAM_ARTICLES,
      upcomingEvents: UPCOMING_PROJECTS,
      beneficiaryStories: BENEFICIARY_STORIES,
      foundationInfo: FOUNDATION_INFO,
      contactMessages: [
        {
          id: 'msg-demo-1',
          name: 'Rev. Emmanuel Darko',
          email: 'emmanuel.darko@gracefellowship.org',
          phone: '+233 24 456 7890',
          subject: 'Partnership with Church Youth Ministry',
          message:
            'Warm greetings from Grace Fellowship Church. We would love to collaborate on your next rural school distribution in Prampram by providing 20 volunteer teachers.',
          date: '2026-10-18T10:30:00Z',
          status: 'new' as const,
        },
      ],
      volunteerSubmissions: [
        {
          id: 'vol-demo-1',
          fullName: 'Priscilla Asantewaa',
          email: 'priscilla.asantewaa@gmail.com',
          phone: '+233 50 123 4567',
          formType: 'volunteer' as const,
          skills: 'Certified clinical psychologist & youth counselor with 4 years experience.',
          date: '2026-10-17T14:15:00Z',
          status: 'new' as const,
        },
      ],
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
  const [contactMessages, setContactMessages] = useState<ContactSubmission[]>(
    initial.contactMessages || []
  );
  const [volunteerSubmissions, setVolunteerSubmissions] = useState<VolunteerSubmission[]>(
    initial.volunteerSubmissions || []
  );

  // Auto-sync to localStorage
  useEffect(() => {
    try {
      const payload = {
        heroSlides,
        programs,
        programArticles,
        upcomingEvents,
        beneficiaryStories,
        foundationInfo,
        contactMessages,
        volunteerSubmissions,
      };
      localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Error persisting site data', e);
    }
  }, [
    heroSlides,
    programs,
    programArticles,
    upcomingEvents,
    beneficiaryStories,
    foundationInfo,
    contactMessages,
    volunteerSubmissions,
  ]);

  // --- Hero Carousel Actions ---
  const addHeroSlide = (slide: Omit<HeroSlide, 'id'>) => {
    const newSlide: HeroSlide = {
      ...slide,
      id: `slide-${Date.now()}`,
    };
    setHeroSlides((prev) => [...prev, newSlide]);
  };

  const updateHeroSlide = (id: string | number, updated: Partial<HeroSlide>) => {
    setHeroSlides((prev) =>
      prev.map((s) => (String(s.id) === String(id) ? { ...s, ...updated } : s))
    );
  };

  const deleteHeroSlide = (id: string | number) => {
    setHeroSlides((prev) => prev.filter((s) => String(s.id) !== String(id)));
  };

  const reorderHeroSlides = (newSlides: HeroSlide[]) => {
    setHeroSlides(newSlides);
  };

  // --- Project Actions ---
  const addProject = (program: FoundationProgram, article: ProgramArticle) => {
    setPrograms((prev) => [program, ...prev]);
    setProgramArticles((prev) => ({
      ...prev,
      [program.id]: article,
    }));
  };

  const updateProject = (program: FoundationProgram, article: ProgramArticle) => {
    setPrograms((prev) =>
      prev.map((p) => (p.id === program.id ? program : p))
    );
    setProgramArticles((prev) => ({
      ...prev,
      [program.id]: article,
    }));
  };

  const deleteProject = (id: string) => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
    setProgramArticles((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  // --- Upcoming Events Actions ---
  const addEvent = (event: UpcomingProjectEvent) => {
    setUpcomingEvents((prev) => [event, ...prev]);
  };

  const updateEvent = (event: UpcomingProjectEvent) => {
    setUpcomingEvents((prev) =>
      prev.map((e) => (e.id === event.id ? event : e))
    );
  };

  const deleteEvent = (id: string) => {
    setUpcomingEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const setFeaturedEvent = (id: string) => {
    setUpcomingEvents((prev) =>
      prev.map((e) => ({
        ...e,
        status: e.id === id ? 'Featured' : e.status === 'Featured' ? 'Upcoming' : e.status,
      }))
    );
  };

  // --- Story Actions ---
  const addStory = (story: BeneficiaryStory) => {
    setBeneficiaryStories((prev) => [story, ...prev]);
  };

  const updateStory = (story: BeneficiaryStory) => {
    setBeneficiaryStories((prev) =>
      prev.map((s) => (s.id === story.id ? story : s))
    );
  };

  const deleteStory = (id: string) => {
    setBeneficiaryStories((prev) => prev.filter((s) => s.id !== id));
  };

  // --- Settings Actions ---
  const updateFoundationInfo = (info: Partial<typeof FOUNDATION_INFO>) => {
    setFoundationInfo((prev) => ({ ...prev, ...info }));
  };

  // --- Inbox Submissions ---
  const submitContactForm = (data: Omit<ContactSubmission, 'id' | 'date' | 'status'>) => {
    const newMsg: ContactSubmission = {
      ...data,
      id: `msg-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'new',
    };
    setContactMessages((prev) => [newMsg, ...prev]);
  };

  const deleteContactMessage = (id: string) => {
    setContactMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const updateContactStatus = (id: string, status: 'new' | 'read' | 'replied') => {
    setContactMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
  };

  const submitVolunteerForm = (data: Omit<VolunteerSubmission, 'id' | 'date' | 'status'>) => {
    const newVol: VolunteerSubmission = {
      ...data,
      id: `vol-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'new',
    };
    setVolunteerSubmissions((prev) => [newVol, ...prev]);
  };

  const deleteVolunteerSubmission = (id: string) => {
    setVolunteerSubmissions((prev) => prev.filter((v) => v.id !== id));
  };

  const updateVolunteerStatus = (id: string, status: 'new' | 'reviewed' | 'contacted') => {
    setVolunteerSubmissions((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status } : v))
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
