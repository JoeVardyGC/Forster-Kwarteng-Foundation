import React, { useState, useEffect } from 'react';
import type { PageId, Currency } from '../types';
import {
  FOUNDATION_INFO,
  PROGRAM_PILLARS,
  IMPACT_STATS,
  CORE_VALUES,
  BENEFICIARY_STORIES,
  DONATION_TIERS,
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
  Sparkles,
  Quote,
  ShieldCheck,
  Users,
  ChevronLeft,
  ChevronRight,
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
    education: <GraduationCap className="w-6 h-6 text-[#000080]" />,
    mentorship: <Compass className="w-6 h-6 text-[#000080]" />,
    skills: <Wrench className="w-6 h-6 text-[#000080]" />,
    community: <HeartHandshake className="w-6 h-6 text-[#000080]" />,
  };

  return (
    <div className="space-y-0">
      {/* 1. FULL-BLEED HERO SECTION (Based on Reference Structure) */}
      <section
        className="relative min-h-[560px] sm:min-h-[620px] lg:min-h-[660px] flex items-center text-white overflow-hidden"
      >
        {/* Full-Bleed Background Carousel Images */}
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
                className="w-full h-full object-cover object-right sm:object-[85%_center] lg:object-[85%_center] scale-100 transition-transform duration-7000 ease-out"
              />
            </div>
          ))}

          {/* Directional Cinematic Gradient & Vignette (Protects left-side text while keeping right-side characters 100% visible) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00003d]/95 via-[#000066]/70 via-45% to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20 z-10"></div>

          {/* Warm Golden Sun Flare (Top-Center like in reference image) */}
          <div className="absolute -top-28 left-1/4 w-[500px] h-[350px] bg-amber-400/25 rounded-full blur-[110px] pointer-events-none z-15"></div>
        </div>

        {/* Content Container - Left Aligned exactly like Reference */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 sm:pt-8 sm:pb-18 lg:pt-8 lg:pb-20 relative z-20 w-full">
          <div className="max-w-xl lg:max-w-2xl space-y-6">
            {/* Dynamic Storytelling Text with Smooth Cross-Fade & Zero Layout Shift */}
            <div className="relative min-h-[220px] sm:min-h-[235px] lg:min-h-[250px]">
              {HERO_SLIDES.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`space-y-4 sm:space-y-5 transition-all duration-700 ease-out ${
                    idx === currentSlide
                      ? 'opacity-100 translate-y-0 relative z-10'
                      : 'opacity-0 translate-y-2 pointer-events-none absolute inset-0 z-0'
                  }`}
                >
                  {/* Non-Profit & Pillar Badge */}
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300 shadow-sm">
                    <span>{slide.pillar}</span>
                  </div>

                  {/* Bold Headline */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-['Outfit'] tracking-tight text-white leading-[1.14]">
                    {slide.headlinePrefix}{' '}
                    <span className="text-[#F5BD02] inline-block drop-shadow-md">
                      {slide.headlineHighlight}
                    </span>
                  </h1>

                  {/* Description Text */}
                  <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed font-normal max-w-xl">
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons: Pill-shaped like reference */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenDonateModal}
                className="px-8 py-4 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-black text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <Heart className="w-5 h-5 fill-[#000080] group-hover:scale-110 transition-transform" />
                <span>Make a Donation</span>
              </button>

              <button
                onClick={() => onNavigate('programs')}
                className="px-8 py-4 bg-white/15 hover:bg-white/25 text-white font-bold text-base rounded-full border border-white/30 backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Our 4 Pillars</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Floating Minimal Carousel Controller (Bottom Right) */}
        <div className="absolute bottom-6 right-4 sm:right-8 z-20 flex items-center gap-2 bg-slate-950/60 hover:bg-slate-950/80 backdrop-blur-md border border-white/20 p-1.5 rounded-full shadow-xl transition-all">
          <button
            onClick={handlePrevSlide}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Slide Dots */}
          <div className="flex items-center gap-1.5 px-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentSlide ? 'w-6 bg-[#F5BD02]' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNextSlide}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 2. LIVE IMPACT METRICS STRIP (Glassy style inspired by Save The Coin) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#000080] via-[#090979] to-[#000052] py-20 lg:py-24 text-white">
        {/* Ambient Blurred Orbs for Glowing Depth */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 tracking-wider shadow-xs">
              Making A Difference
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-white mt-3 tracking-tight">
              Our Impact
            </h2>
            <div className="h-1 w-16 bg-[#F5BD02] rounded-full mx-auto my-3" />
            <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
              Together, we're making a difference in communities across the region.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {IMPACT_STATS.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/20 transition-all duration-500 hover:bg-white/20 hover:border-white/40 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl text-center group flex flex-col justify-between"
              >
                <div>
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Outfit'] text-white tracking-tight drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="h-1.5 w-14 bg-amber-400/90 rounded-full mx-auto my-3.5 group-hover:w-20 transition-all duration-300" />
                  <div className="text-sm sm:text-base font-bold text-amber-300 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-blue-100/85 mt-3 leading-relaxed max-w-xs mx-auto">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OUR PROGRAMS SECTION (Glassy elevation inspired by Save The Coin) */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden border-b border-slate-100">
        {/* Soft Ambient Glow Orbs */}
        <div className="absolute top-12 left-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 right-10 w-96 h-96 bg-amber-100/35 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header matching reference image with subtle glass accent */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2 font-semibold">
              WHAT WE DO
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-slate-900 tracking-tight">
              Our Programs
            </h2>
            <div className="w-12 h-1 bg-[#000080] mx-auto rounded-full mt-3 mb-4"></div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We offer comprehensive programs designed to address the diverse needs of our communities.
            </p>
          </div>

          {/* Cards Grid: 3 columns on desktop with glassy elevation */}
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

                    <button
                      onClick={onOpenDonateModal}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100/80 hover:bg-amber-200/90 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-amber-300/60 transition-all cursor-pointer shadow-2xs hover:scale-105"
                      title="Support this initiative"
                    >
                      <Heart className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>Donate</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VISION & MISSION SPOTLIGHT (Glassmorphic Cards) */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-blue-50/20 to-slate-50 border-b border-slate-200 overflow-hidden">
        {/* Subtle Ambient Orbs */}
        <div className="absolute top-10 right-10 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-100/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-amber-200 shadow-2xs">
              Our Organizational Compass
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-[#000080] mt-3 tracking-tight">
              Why the Forster Kwarteng Foundation Exists
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Grounded in the belief that lasting social change begins with education, mentorship, and sustainable grassroots empowerment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Vision Card */}
            <div className="bg-gradient-to-br from-blue-900/5 via-white/85 to-blue-50/70 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-blue-200/80 shadow-sm hover:shadow-xl hover:border-[#000080]/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#000080] text-amber-400 flex items-center justify-center shadow-md border border-white/20">
                  <Sparkles className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold text-[#000080] uppercase tracking-wider block">
                  Our Vision
                </span>
                <blockquote className="text-xl sm:text-2xl font-bold font-['Outfit'] text-[#000080] leading-snug">
                  "{FOUNDATION_INFO.vision}"
                </blockquote>
              </div>
              <div className="pt-6 mt-6 border-t border-blue-100/80 text-xs text-slate-600 flex items-center justify-between">
                <span>Building sustainable agency across Ghana</span>
                <ArrowRight className="w-4 h-4 text-[#000080] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-gradient-to-br from-amber-500/5 via-white/85 to-amber-50/70 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-amber-200/80 shadow-sm hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#F5BD02] text-[#000080] flex items-center justify-center shadow-md border border-amber-300/40">
                  <Heart className="w-7 h-7 fill-[#000080]" />
                </div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                  Our Mission
                </span>
                <blockquote className="text-xl sm:text-2xl font-bold font-['Outfit'] text-slate-900 leading-snug">
                  "{FOUNDATION_INFO.mission}"
                </blockquote>
              </div>
              <div className="pt-6 mt-6 border-t border-amber-100/80 text-xs text-slate-600 flex items-center justify-between">
                <span>Education • Mentorship • Skills • Interventions</span>
                <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE 4 PILLARS OF SOCIAL IMPACT (Glassy Card Panels) */}
      <section className="py-16 lg:py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#000080] uppercase tracking-widest bg-blue-100/80 px-3.5 py-1.5 rounded-full border border-blue-200/60 shadow-2xs">
                Core Operations
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-[#000080] mt-3">
                Our 4 Pillars of Social Impact
              </h2>
              <p className="text-slate-600 text-sm max-w-xl mt-2">
                Strategic focus areas designed to break cycles of poverty and build self-reliant futures.
              </p>
            </div>
            <button
              onClick={() => onNavigate('programs')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#000080] hover:text-[#0a0a85] transition-colors cursor-pointer"
            >
              <span>View All Program Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROGRAM_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#000080]/30 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200/60 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                    {pillarIcons[pillar.id]}
                  </div>

                  <h3 className="font-bold text-lg font-['Outfit'] text-[#000080] group-hover:text-amber-600 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-amber-800 bg-amber-100/80 backdrop-blur-xs px-3 py-1 rounded-full border border-amber-200/60 inline-block mb-3">
                    {pillar.impactMetric}
                  </div>
                  <button
                    onClick={() => onNavigate('programs')}
                    className="text-xs font-bold text-[#000080] flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer"
                  >
                    <span>Read Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE GIVING CALCULATOR BANNER (Glassmorphic Container with Ambient Glow) */}
      <section className="relative py-20 bg-gradient-to-br from-[#000080] via-[#090979] to-[#000052] text-white overflow-hidden">
        {/* Ambient Blur Orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/95 backdrop-blur-xl text-slate-900 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-white/50 max-w-4xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 mb-2 border border-amber-200">
                <Heart className="w-3.5 h-3.5 fill-amber-500" />
                Tangible Giving • Direct Impact
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#000080]">
                See How Your Support Changes a Life in Ghana
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Every cedi or dollar directly funds uniforms, books, medical screenings, and vocational apprenticeships.
              </p>
            </div>

            {/* Tier Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {DONATION_TIERS.slice(0, 3).map((tier) => (
                <div
                  key={tier.id}
                  onClick={onOpenDonateModal}
                  className="p-4 sm:p-5 rounded-2xl border-2 border-slate-200/90 bg-white/70 backdrop-blur-xs hover:border-[#000080] hover:bg-blue-50/50 hover:shadow-md transition-all cursor-pointer text-center group"
                >
                  <div className="text-2xl font-black font-['Outfit'] text-[#000080] group-hover:scale-105 transition-transform">
                    {currency === 'GHS' ? `₵${tier.amountGHS}` : `$${tier.amountUSD}`}
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-1">
                    {tier.label}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {tier.impactDescription}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={onOpenDonateModal}
                className="px-8 py-3.5 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-black text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-[#000080]" />
                <span>Open Instant Giving Portal (MoMo & Card)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BENEFICIARY STORY SPOTLIGHT (Frosted Glass Card) */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white/95 via-slate-50/90 to-blue-50/40 backdrop-blur-md rounded-3xl border border-slate-200/80 p-8 sm:p-12 lg:p-14 overflow-hidden relative shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 relative">
                <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white aspect-4/3">
                  <img
                    src={BENEFICIARY_STORIES[0].image}
                    alt={BENEFICIARY_STORIES[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-[#000080]">
                  <Quote className="w-3.5 h-3.5 text-[#000080]" />
                  <span>Story of Transformation</span>
                </div>

                <blockquote className="text-xl sm:text-2xl font-bold font-['Outfit'] text-[#000080] leading-snug">
                  {BENEFICIARY_STORIES[0].quote}
                </blockquote>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {BENEFICIARY_STORIES[0].story}
                </p>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      {BENEFICIARY_STORIES[0].name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {BENEFICIARY_STORIES[0].role} • {BENEFICIARY_STORIES[0].location}
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('impact')}
                    className="text-xs font-bold text-[#000080] hover:text-amber-600 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read More Stories</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
