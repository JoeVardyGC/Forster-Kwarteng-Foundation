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

      {/* 2. LIVE IMPACT METRICS STRIP */}
      <section className="bg-slate-50 py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {IMPACT_STATS.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow hover:border-blue-200"
              >
                <div className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-[#000080] mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OUR PROGRAMS SECTION (Based on Reference Design) */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header matching reference image */}
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

          {/* Cards Grid: 3 columns on desktop, matching reference layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {OUR_PROGRAMS.map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col justify-between flex-1">
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

                  {/* Read More Action */}
                  <button
                    onClick={() => onSelectProgram ? onSelectProgram(prog.id) : onNavigate('programs')}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 group-hover:text-[#000080] group-hover:gap-2.5 transition-all cursor-pointer self-start"
                  >
                    <span>Read More</span>
                    <ChevronRight className="w-4 h-4 text-blue-600 group-hover:text-[#000080] transition-colors" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VISION & MISSION SPOTLIGHT */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Our Organizational Compass
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-[#000080] mt-3">
              Why the Forster Kwarteng Foundation Exists
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Grounded in the belief that lasting social change begins with education, mentorship, and sustainable grassroots empowerment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Vision Card */}
            <div className="bg-gradient-to-br from-blue-50/70 to-white p-8 sm:p-10 rounded-3xl border-2 border-blue-100 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:border-[#000080] transition-colors">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#000080] text-amber-400 flex items-center justify-center shadow-md">
                  <Sparkles className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold text-[#000080] uppercase tracking-wider block">
                  Our Vision
                </span>
                <blockquote className="text-xl sm:text-2xl font-bold font-['Outfit'] text-[#000080] leading-snug">
                  "{FOUNDATION_INFO.vision}"
                </blockquote>
              </div>
              <div className="pt-6 mt-6 border-t border-blue-100 text-xs text-slate-600 flex items-center justify-between">
                <span>Building sustainable agency across Ghana</span>
                <ArrowRight className="w-4 h-4 text-[#000080]" />
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-gradient-to-br from-amber-50/60 to-white p-8 sm:p-10 rounded-3xl border-2 border-amber-200 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:border-amber-400 transition-colors">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#F5BD02] text-[#000080] flex items-center justify-center shadow-md">
                  <Heart className="w-7 h-7 fill-[#000080]" />
                </div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                  Our Mission
                </span>
                <blockquote className="text-xl sm:text-2xl font-bold font-['Outfit'] text-slate-900 leading-snug">
                  "{FOUNDATION_INFO.mission}"
                </blockquote>
              </div>
              <div className="pt-6 mt-6 border-t border-amber-100 text-xs text-slate-600 flex items-center justify-between">
                <span>Education • Mentorship • Skills • Interventions</span>
                <ArrowRight className="w-4 h-4 text-amber-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE 4 PILLARS OF SOCIAL IMPACT */}
      <section className="py-16 lg:py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#000080] uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full">
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
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
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
                  <div className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md mb-3">
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

      {/* 5. INTERACTIVE GIVING CALCULATOR BANNER */}
      <section className="py-16 bg-[#000080] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-100 max-w-4xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 mb-2">
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
                  className="p-4 rounded-2xl border-2 border-slate-200 hover:border-[#000080] hover:bg-blue-50/50 transition-all cursor-pointer text-center group"
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
                className="px-8 py-3.5 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-bold text-sm rounded-full shadow-md transition-all duration-200 hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-[#000080]" />
                <span>Open Instant Giving Portal (MoMo & Card)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BENEFICIARY STORY SPOTLIGHT */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-12 lg:p-14 overflow-hidden relative">
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

      {/* 7. THE 7 CORE VALUES BANNER */}
      <section className="py-14 bg-gradient-to-r from-[#000080] to-[#0a0a85] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
                className="bg-white/10 hover:bg-white/20 p-3 rounded-xl border border-white/15 backdrop-blur-sm transition-all cursor-pointer text-center group"
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

      {/* 8. COMMUNITY ACTION CALLOUT */}
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
              className="w-full sm:w-auto px-8 py-3.5 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-bold text-sm rounded-full shadow-md transition-all cursor-pointer"
            >
              Donate Today
            </button>
            <button
              onClick={() => onNavigate('get-involved')}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-50 hover:bg-blue-100 text-[#000080] font-bold text-sm rounded-full border border-blue-200 transition-all cursor-pointer"
            >
              Apply as a Volunteer / Partner
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
