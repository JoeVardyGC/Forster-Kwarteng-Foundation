import React, { useState, useEffect } from 'react';
import type { PageId, Currency } from '../types';
import { UpcomingProjectsSection } from '../components/UpcomingProjectsSection';
import {
  FOUNDATION_INFO,
  PROGRAM_PILLARS,
  IMPACT_STATS,
  CORE_VALUES,
  OUR_PROGRAMS,
} from '../data/foundationData';
import {
  Heart,
  ArrowRight,
  GraduationCap,
  Compass,
  Wrench,
  HeartHandshake,
  CheckCircle2,
  Quote,
  ShieldCheck,
  Users,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
} from 'lucide-react';

export const HERO_SLIDES = [
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
      'Partnering with local communities in Accra to build self-reliance, youth mentorship, and lasting opportunities.',
    tag: 'Sustainable Futures',
    title: 'Empowering the Next Generation',
  },
];

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectProgram?: (programId: string) => void;
  currency: Currency;
  onOpenDonateModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProgram,
  currency,
  onOpenDonateModal,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const pillarIcons: Record<string, React.ReactNode> = {
    education: <GraduationCap className="w-6 h-6" />,
    mentorship: <Compass className="w-6 h-6" />,
    skills: <Wrench className="w-6 h-6" />,
    community: <HeartHandshake className="w-6 h-6" />,
  };

  const handleScrollToPrograms = () => {
    const el = document.getElementById('programs-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      onNavigate('programs');
    }
  };

  return (
    <div className="space-y-0">
      {/* 1. FULL-BLEED HERO SECTION (Arranged like Reference Screenshot) */}
      <section
        className="relative min-h-[520px] sm:min-h-[600px] lg:min-h-[660px] flex items-center text-white overflow-hidden pb-12 sm:pb-16"
      >
        {/* Full-Bleed Background Carousel Images - Shifted right for character prominence */}
        <div className="absolute inset-0 z-0">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-[82%_center] sm:object-[86%_center] lg:object-[85%_center] scale-100 transition-transform duration-7000 ease-out"
              />
            </div>
          ))}

          {/* Directional Cinematic Gradient & Vignette - Reduced opacity so images are vivid & visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#000030]/85 via-[#000045]/50 via-50% to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-black/20 z-10"></div>

          {/* Smooth Bottom Fade to seamlessly merge with the next section */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#000080] to-transparent z-10 pointer-events-none"></div>

          {/* Warm Golden Sun Flare (Top-Center like in reference image) */}
          <div className="absolute -top-28 left-1/4 w-[500px] h-[350px] bg-amber-400/20 rounded-full blur-[110px] pointer-events-none z-15"></div>
        </div>

        {/* Side Chevrons (< and > on left & right edges like in reference) */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-950/40 hover:bg-slate-950/70 border border-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer active:scale-90"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={handleNextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-950/40 hover:bg-slate-950/70 border border-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer active:scale-90"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Content Container - Compact width with reference layout & clearance from side chevrons */}
        <div className="max-w-7xl mx-auto px-10 sm:px-14 lg:px-16 pt-8 pb-4 sm:pt-14 sm:pb-8 lg:pt-16 lg:pb-10 relative z-20 w-full">
          <div className="max-w-md sm:max-w-lg lg:max-w-xl space-y-3.5 sm:space-y-4">
            {/* Dynamic Storytelling Text */}
            <div className="relative min-h-[170px] sm:min-h-[210px] lg:min-h-[235px]">
              {HERO_SLIDES.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`space-y-2.5 sm:space-y-3 transition-all duration-700 ease-out ${
                    idx === currentSlide
                      ? 'opacity-100 translate-y-0 relative z-10'
                      : 'opacity-0 translate-y-2 pointer-events-none absolute inset-0 z-0'
                  }`}
                >
                  {/* Non-Profit & Pillar Badge */}
                  <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-semibold text-amber-300 shadow-sm">
                    <span>{slide.pillar}</span>
                  </div>

                  {/* Bold Headline - Broken into clean, punchy lines */}
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-['Outfit'] tracking-tight text-white leading-[1.14] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
                    {slide.headlinePrefix}{' '}
                    <span className="block sm:inline-block text-[#F5BD02] drop-shadow-md">
                      {slide.headlineHighlight}
                    </span>
                  </h1>

                  {/* Description Text - Focused max-width for clean reading */}
                  <p className="text-xs sm:text-base text-blue-100/95 leading-relaxed font-normal max-w-sm sm:max-w-md drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons: Side-by-Side Pill Buttons (Just like in Reference Image) */}
            <div className="pt-1 flex flex-row items-center gap-2.5 sm:gap-3.5">
              <button
                onClick={onOpenDonateModal}
                className="px-5 py-2.5 sm:px-7 sm:py-3.5 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-black text-xs sm:text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer group shrink-0"
              >
                <Heart className="w-4 h-4 fill-[#000080] group-hover:scale-110 transition-transform" />
                <span>Make a Donation</span>
              </button>

              <button
                onClick={handleScrollToPrograms}
                className="px-5 py-2.5 sm:px-7 sm:py-3.5 bg-white hover:bg-slate-100 text-[#000080] font-bold text-xs sm:text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Slide Indicators: Centered Dots & Elongated Active Pill */}
            <div className="pt-2 flex items-center gap-1.5">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-400 cursor-pointer ${
                    idx === currentSlide
                      ? 'w-7 bg-[#F5BD02] shadow-[0_0_10px_rgba(245,189,2,0.9)]'
                      : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.tag}`}
                  title={slide.tag}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE IMPACT METRICS STRIP WITH ELEVATED FLOATING TRANSITION CARD */}
      <section className="relative bg-gradient-to-br from-[#000080] via-[#090979] to-[#000052] pt-0 pb-16 sm:pb-20 text-white overflow-visible">
        {/* Ambient Blurred Orbs for Glowing Depth */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* The Elevated Floating Transition Card covering the Hero-to-Next Section boundary */}
        <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-8 sm:-translate-y-12">
          <div className="bg-white text-slate-900 rounded-3xl border border-slate-200/90 shadow-[0_24px_50px_rgba(0,0,80,0.22)] p-5 sm:p-7 backdrop-blur-xl">
            {/* 3 Metric Rows (Stacked on Mobile, 3 Columns on Desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {/* Stat 1: Education */}
              <div className="py-3 md:py-2 md:px-5 flex items-center gap-4 first:pt-0 md:first:pl-0">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-[#F5BD02] text-[#000080] flex items-center justify-center shadow-md shadow-amber-500/25 shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-2xl sm:text-3xl font-black font-['Outfit'] text-[#000080] tracking-tight">
                    5,000+
                  </div>
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wide truncate">
                    Lives Directly Empowered
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    Across Greater Accra, Eastern & Ashanti
                  </div>
                </div>
              </div>

              {/* Stat 2: Communities */}
              <div className="py-3.5 md:py-2 md:px-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#000080] to-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-700/25 shrink-0">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-2xl sm:text-3xl font-black font-['Outfit'] text-[#000080] tracking-tight">
                    9
                  </div>
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wide truncate">
                    Schools & Communities
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    Direct educational & welfare outreaches
                  </div>
                </div>
              </div>

              {/* Stat 3: Transparency */}
              <div className="py-3 md:py-2 md:px-5 flex items-center gap-4 last:pb-0 md:last:pr-0">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/25 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-2xl sm:text-3xl font-black font-['Outfit'] text-[#000080] tracking-tight">
                    100%
                  </div>
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wide truncate">
                    Direct Program Delivery
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    Audited grassroots allocation & reports
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Context beneath the floating transition card */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-2 sm:pt-4">
          <p className="text-blue-100/90 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Every contribution directly powers scholarships, uniforms, classroom repairs, and community welfare programs across Ghana.
          </p>
        </div>
      </section>

      {/* 3. OUR PROGRAMS SECTION (Glassy elevation inspired by Save The Coin) */}
      <section id="programs-section" className="relative py-20 lg:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden border-b border-slate-100">
        {/* Soft Ambient Glow Orbs */}
        <div className="absolute top-12 left-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 right-10 w-96 h-96 bg-amber-100/35 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header styled with frosted glass pill and clean arrangement like stats header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-blue-50/80 backdrop-blur-md border border-blue-200/60 text-[#000080] tracking-wider shadow-2xs">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-slate-900 mt-3 tracking-tight">
              Our Projects
            </h2>
            <div className="h-1 w-16 bg-[#000080] rounded-full mx-auto my-3" />
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We offer comprehensive projects designed to address the diverse needs of our communities.
            </p>
          </div>

          {/* Cards Grid or Empty State */}
          {OUR_PROGRAMS.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {OUR_PROGRAMS.map((prog) => (
                <div
                  key={prog.id}
                  className="bg-white/85 backdrop-blur-md rounded-3xl overflow-hidden border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_48px_rgba(0,0,128,0.12)] hover:border-[#000080]/30 hover:-translate-y-2 transition-all duration-500 flex flex-col group"
                >
                  {/* Image Banner */}
                  <div
                    onClick={() => onSelectProgram ? onSelectProgram(prog.id) : onNavigate('programs')}
                    className="relative h-48 sm:h-52 overflow-hidden bg-slate-100 cursor-pointer"
                  >
                    <img
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Frosted Glass Badge overlay */}
                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-950/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20 shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>Active Initiative</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                    <div>
                      <h3
                        onClick={() => onSelectProgram ? onSelectProgram(prog.id) : onNavigate('programs')}
                        className="text-lg sm:text-xl font-bold font-['Outfit'] text-slate-900 group-hover:text-[#000080] transition-colors mb-2.5 cursor-pointer"
                      >
                        {prog.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                        {prog.description}
                      </p>
                    </div>

                    {/* Action Bar embedded in card */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button
                        onClick={() => onSelectProgram ? onSelectProgram(prog.id) : onNavigate('programs')}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 group-hover:text-[#000080] group-hover:gap-2.5 transition-all cursor-pointer"
                      >
                        <span>Read More</span>
                        <ChevronRight className="w-4 h-4 text-blue-600 group-hover:text-[#000080] transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-xl mx-auto text-center py-12 px-6 sm:px-8 rounded-3xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,128,0.04)] space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#000080] flex items-center justify-center mx-auto shadow-2xs border border-blue-100">
                <FolderOpen className="w-8 h-8 text-[#000080]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-slate-900">
                  No Active Projects Right Now
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                  We are currently concluding ongoing field programs and preparing our next grassroots initiatives. Please check back soon or reach out to partner with us on new community projects.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3 rounded-full bg-[#000080] hover:bg-[#0a0a85] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Propose or Inquire About a Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. VISION & MISSION SPOTLIGHT (Unified Dual Showcase Based on UI Inspo) */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200 overflow-hidden">
        {/* Soft Ambient Glow Orbs */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-100/35 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-blue-50/80 backdrop-blur-md border border-blue-200/60 text-[#000080] tracking-wider shadow-2xs">
              Organizational Compass
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-slate-900 mt-3 tracking-tight">
              Why the Forster Kwarteng Foundation Exists
            </h2>
            <div className="h-1 w-16 bg-[#000080] rounded-full mx-auto my-3" />
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Grounded in the belief that lasting social change begins with education, mentorship, and sustainable grassroots empowerment.
            </p>
          </div>

          {/* Dual Showcase Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-stretch">
            {/* LEFT CARD: OUR VISION */}
            <div className="bg-[#000080] text-white rounded-3xl lg:rounded-[36px] border border-blue-950/80 shadow-[0_16px_48px_rgba(0,0,128,0.18)] p-8 sm:p-10 lg:p-12 flex flex-col justify-between group relative overflow-hidden">
              {/* Subtle ambient blur glow in card corner */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                {/* Triangular Brand Accent (From Inspo) */}
                <div className="w-5 h-5 bg-[#F5BD02] [clip-path:polygon(0_0,100%_0,0_100%)] mb-5" />

                <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-white tracking-tight mb-4">
                  Our Vision
                </h3>

                <blockquote className="text-base sm:text-lg font-medium text-blue-50 leading-relaxed mb-4">
                  "{FOUNDATION_INFO.vision}"
                </blockquote>

                <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed font-normal mb-8">
                  We envision a resilient Ghana where poverty and lack of resources never limit human potential, and where young people possess the skills and agency to lead.
                </p>
              </div>

              {/* Bottom Indicator */}
              <div className="relative z-10 pt-6 border-t border-white/15 mt-auto flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-blue-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Building sustainable community agency across Ghana
                </span>
              </div>
            </div>

            {/* RIGHT CARD: OUR MISSION */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl lg:rounded-[36px] border border-slate-200/90 shadow-[0_12px_44px_rgba(0,0,128,0.06)] p-8 sm:p-10 lg:p-12 flex flex-col justify-between group relative overflow-hidden">
              <div>
                {/* Triangular Brand Accent (From Inspo) */}
                <div className="w-5 h-5 bg-[#F5BD02] [clip-path:polygon(0_0,100%_0,0_100%)] mb-5" />

                <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-slate-900 tracking-tight mb-4">
                  Our Mission
                </h3>

                <blockquote className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed mb-4">
                  "{FOUNDATION_INFO.mission}"
                </blockquote>

                {/* The 4 Tactical Action Chips */}
                <div className="grid grid-cols-2 gap-2.5 my-6">
                  <div className="p-2.5 rounded-xl bg-slate-50/90 border border-slate-200/70 text-xs font-semibold text-slate-800 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#000080] shrink-0" />
                    <span>Education Sponsorship</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50/90 border border-slate-200/70 text-xs font-semibold text-slate-800 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Youth Mentorship</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50/90 border border-slate-200/70 text-xs font-semibold text-slate-800 flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-[#000080] shrink-0" />
                    <span>Vocational Training</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50/90 border border-slate-200/70 text-xs font-semibold text-slate-800 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500 shrink-0 fill-rose-500" />
                    <span>Social Interventions</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Link */}
              <div className="pt-6 border-t border-slate-100 mt-auto flex items-center justify-between text-xs">
                <button
                  onClick={() => onNavigate('programs')}
                  className="text-xs font-bold text-[#000080] hover:text-[#0a0a85] flex items-center gap-1.5 group-hover:gap-2.5 transition-all cursor-pointer"
                >
                  <span>Explore Our Projects in Detail</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. UPCOMING PROJECTS & FIELD CALENDAR SECTION (With Live Countdown) */}
      <UpcomingProjectsSection
        onNavigate={onNavigate}
        onOpenDonateModal={onOpenDonateModal}
      />

      {/* 5. THE 4 PILLARS OF SOCIAL IMPACT (Architectural Glass Pillar Showcase) */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-t border-slate-200 overflow-hidden">
        {/* Soft Ambient Blurred Glow Orbs */}
        <div className="absolute top-12 left-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 right-10 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Centered Header Styled Uniformly with Stats & Programs Pattern */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-blue-50/80 backdrop-blur-md border border-blue-200/60 text-[#000080] tracking-wider shadow-2xs">
              Core Operations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-slate-900 mt-3 tracking-tight">
              Our 4 Pillars of Social Impact
            </h2>
            <div className="h-1 w-16 bg-[#000080] rounded-full mx-auto my-3" />
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Strategic focus areas designed to break cycles of poverty and build self-reliant futures.
            </p>
          </div>

          {/* 4 Architectural Glass Pillar Cards (Clean, Glassy Elevation, No Cluttery Buttons) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {PROGRAM_PILLARS.map((pillar, idx) => (
              <div
                key={pillar.id}
                onClick={() => onNavigate('programs')}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,128,0.03)] hover:shadow-[0_24px_48px_rgba(0,0,128,0.12)] hover:border-[#000080]/30 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
              >
                {/* Ambient Card Corner Light */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-200/25 rounded-full blur-2xl group-hover:bg-blue-300/30 transition-all pointer-events-none" />

                <div className="relative z-10">
                  {/* Top Row: Pillar Number Badge + Frosted Icon Capsule */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold text-[#000080] bg-blue-50/90 border border-blue-200/60 shadow-2xs">
                      Pillar 0{idx + 1}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-300/40 flex items-center justify-center text-[#000080] group-hover:scale-110 group-hover:bg-[#000080] group-hover:text-[#F5BD02] transition-all duration-300 shadow-2xs">
                      {pillarIcons[pillar.id]}
                    </div>
                  </div>

                  {/* Subtitle / Tagline */}
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600 mb-1.5 font-sans">
                    {pillar.subtitle}
                  </div>

                  {/* Pillar Title */}
                  <h3 className="text-xl font-extrabold font-['Outfit'] text-slate-900 group-hover:text-[#000080] transition-colors leading-snug mb-3">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Centered Explore All Action */}
          <div className="text-center mt-12 sm:mt-14">
            <button
              onClick={() => onNavigate('programs')}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/90 hover:bg-white text-[#000080] font-bold text-sm rounded-full border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-[#000080]/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
            >
              <span>Explore All Projects in Detail</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. DIGNIFIED GIVING & DONATE CARD (Clean & Focused Call to Action) */}
      <section className="relative py-20 bg-gradient-to-br from-[#000080] via-[#090979] to-[#000052] text-white overflow-hidden">
        {/* Ambient Blur Orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/95 backdrop-blur-xl text-slate-900 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl border border-white/50 max-w-4xl mx-auto text-center">
            {/* Pill Tag */}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-[#000080] mb-4 border border-amber-200/80">
              <Heart className="w-3.5 h-3.5 fill-[#000080] text-[#000080]" />
              <span>Direct Community Impact • 100% Transparent</span>
            </span>

            {/* Headline */}
            <h3 className="text-2xl sm:text-4xl font-extrabold font-['Outfit'] text-[#000080] tracking-tight max-w-2xl mx-auto leading-tight">
              Support Our Mission & Transform a Life in Ghana
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl mx-auto leading-relaxed font-normal">
              Every contribution directly equips orphaned pupils with syllabus textbooks, funds youth TVET apprenticeship toolkits, and delivers vital free medical screenings to underserved families.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 my-8">
              <div className="px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Instant MoMo & Card Giving</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Registered Non-Profit (DSW/1042)</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Transparent Stewardship</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <button
                onClick={onOpenDonateModal}
                className="w-full sm:w-auto px-8 py-4 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-black text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 inline-flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-[#000080]" />
                <span>Make a Donation</span>
              </button>

              <button
                onClick={() => onNavigate('donate')}
                className="w-full sm:w-auto px-7 py-4 bg-slate-100 hover:bg-slate-200/90 text-[#000080] font-bold text-sm rounded-full transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Bank & MoMo Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MESSAGE FROM OUR FOUNDER & CEO (Executive Showcase Card) */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white via-slate-50/90 to-blue-50/30 backdrop-blur-xl rounded-3xl lg:rounded-[36px] border border-slate-200/90 p-8 sm:p-12 lg:p-14 overflow-hidden relative shadow-[0_16px_48px_rgba(0,0,128,0.06)]">
            {/* Ambient Corner Light */}
            <div className="absolute -top-16 -right-16 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Left Column: Founder Photo Box */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[3/4] sm:aspect-[4/5] max-w-sm sm:max-w-md mx-auto lg:max-w-none w-full">
                  <img
                    src="/assets/founder.png"
                    alt="Mr. Forster Kwarteng — Founder & CEO of Forster Kwarteng Foundation"
                    className="w-full h-full object-cover object-[center_10%] hover:scale-102 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                  {/* Subtle Founder Identification Pill at Bottom of Photo */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-slate-950/75 backdrop-blur-md border border-white/20 text-white shadow-lg">
                    <div>
                      <div className="text-xs sm:text-sm font-extrabold font-['Outfit'] tracking-wide text-white">
                        Mr. Forster Kwarteng
                      </div>
                      <div className="text-[11px] font-medium text-amber-300">
                        Founder & Chief Executive Officer
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Founder Message */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 border border-amber-200/80 text-amber-900 shadow-2xs">
                  <span>A Message from Our CEO</span>
                </div>

                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-['Outfit'] text-[#000080] leading-snug tracking-tight">
                  “Lasting transformation begins when we empower our youth with dignity, skills, and unwavering community support.”
                </blockquote>

                <div className="space-y-3.5 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  <p>
                    When we established the Forster Kwarteng Foundation, it was anchored in a single, deeply personal conviction: no young person in Ghana should ever have their destiny defined by poverty or lack of educational resources.
                  </p>
                  <p>
                    Every school desk filled, every scholarship awarded, every vocational starter kit provided, and every mentor assigned is more than an act of charity — it is an investment in the generational future of our homeland. Together with our partners, we are proving that grassroots agency creates self-reliant communities.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h4 className="font-extrabold text-base sm:text-lg font-['Outfit'] text-slate-900">
                      Mr. Forster Kwarteng
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      Founder & Chief Executive Officer • Forster Kwarteng Foundation
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('about')}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#000080] hover:text-[#0a0a85] bg-blue-50/80 hover:bg-blue-100/90 px-4 py-2.5 rounded-full border border-blue-200/60 transition-all cursor-pointer group"
                  >
                    <span>Read Our Full Story</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. THE 7 CORE VALUES BANNER (Glass Cards with Ambient Orbs) */}
      <section className="relative py-16 bg-gradient-to-r from-[#000080] via-[#0a0a85] to-[#000052] text-white overflow-hidden">
        {/* Ambient Blur Orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
            The Principles That Define Us
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] mb-8">
            Our 7 Guiding Core Values
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {CORE_VALUES.map((val) => (
              <div
                key={val.id}
                onClick={() => onNavigate('about')}
                className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer text-center group"
              >
                <div className="text-amber-400 font-black text-sm font-['Outfit'] mb-1">
                  0{val.id}
                </div>
                <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                  {val.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. COMMUNITY ACTION CALLOUT */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-[#000080]">
            Ready to Build Futures With Us?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Whether through personal financial support, corporate partnership, or volunteering in our Accra field projects, your involvement creates generational change.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenDonateModal}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-black text-sm rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
            >
              Donate Today
            </button>
            <button
              onClick={() => onNavigate('get-involved')}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-50/80 hover:bg-blue-100 text-[#000080] font-bold text-sm rounded-full border border-blue-200 transition-all cursor-pointer backdrop-blur-xs"
            >
              Apply as a Volunteer / Partner
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
