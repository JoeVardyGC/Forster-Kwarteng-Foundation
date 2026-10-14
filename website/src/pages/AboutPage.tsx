import React from 'react';
import type { PageId } from '../types';
import { FOUNDATION_INFO } from '../data/foundationData';
import {
  Users,
  CheckCircle2,
  Heart,
  Mail,
  ShieldCheck,
  Target,
  Sparkles,
  Award,
  ChevronRight,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenDonateModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenDonateModal }) => {
  const coreValues = [
    {
      letter: 'P',
      name: 'Partnership',
      description: 'Guiding our mission with partnership in every action we take.',
    },
    {
      letter: 'I',
      name: 'Integrity',
      description: 'Guiding our mission with integrity in every action we take.',
    },
    {
      letter: 'I',
      name: 'Innovation',
      description: 'Guiding our mission with innovation in every action we take.',
    },
    {
      letter: 'C',
      name: 'Compassion',
      description: 'Guiding our mission with compassion in every action we take.',
    },
    {
      letter: 'E',
      name: 'Empowerment',
      description: 'Guiding our mission with empowerment in every action we take.',
    },
    {
      letter: 'E',
      name: 'Excellence',
      description: 'Guiding our mission with excellence in every action we take.',
    },
    {
      letter: 'A',
      name: 'Accountability',
      description: 'Guiding our mission with accountability in every action we take.',
    },
    {
      letter: 'S',
      name: 'Sustainability',
      description: 'Guiding our mission with sustainability in every action we take.',
    },
  ];

  const leadershipTeam = [
    {
      name: 'Mr. Forster Kwarteng',
      role: 'Founder & Chief Executive Officer',
      image: '/assets/founder.png',
      description: 'Visionary social entrepreneur championing grassroots empowerment, youth agency, and educational equity across Ghana.',
    },
    {
      name: 'Ahmed Akusie Osei',
      role: 'Executive Director',
      image: '/assets/leader_ahmed.png',
      description: 'Leading strategic partnerships, institutional operations, and organizational governance.',
    },
    {
      name: 'Paul Terku Lawer',
      role: 'Head of Programs & Outreach',
      image: '/assets/leader_paul.png',
      description: 'Overseeing frontline student sponsorships, TVET vocational hubs, and field logistics.',
    },
  ];

  const strategicGoals = [
    {
      number: '01',
      title: 'Educational Sponsorships',
      description: 'Equipping 10,000+ vulnerable pupils with uniforms, textbooks, and full term scholarships.',
    },
    {
      number: '02',
      title: 'TVET & Vocational Toolkits',
      description: 'Empowering 1,200+ youth graduates with industrial starter machines and enterprise grants.',
    },
    {
      number: '03',
      title: 'Community Health Hubs',
      description: 'Delivering preventative health screenings, water tanks, and mental wellness safe spaces.',
    },
    {
      number: '04',
      title: 'Radical Transparency',
      description: 'Maintaining 100% audited allocations with open public reporting on every resource invested.',
    },
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-800 pb-20">
      {/* ========================================================= */}
      {/* 1. HERO BANNER & MISSION / VISION CARDS (Inspired by Inspo 1) */}
      {/* ========================================================= */}
      <section className="relative">
        {/* Full-width photographic hero with blue tint */}
        <div className="relative h-72 sm:h-96 w-full bg-[#000080] overflow-hidden flex items-center justify-center text-center">
          <img
            src="/assets/orphan_community_outreach.jpg"
            alt="Forster Kwarteng Foundation Community"
            className="absolute inset-0 w-full h-full object-cover object-center mix-blend-overlay opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000080]/90 via-[#000080]/85 to-[#000052]/95" />

          <div className="relative z-10 px-4 max-w-4xl mx-auto space-y-3">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-white tracking-tight leading-tight">
              Forster Kwarteng Foundation LBG
            </h1>
            <p className="text-sm sm:text-lg text-blue-100 font-medium tracking-wide">
              {FOUNDATION_INFO.brandStatement || 'Empowering Lives, Building Futures'}
            </p>
          </div>
        </div>

        {/* Dual Cards: Our Mission & Our Vision (Parallel Split from Inspo 1) */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Our Mission Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200/80 border-t-4 border-t-[#000080] flex flex-col justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-slate-900 mb-3">
                  Our Mission
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Forster Kwarteng Foundation is committed to promoting quality basic education,
                  youth mentorship, building individual and community capacities, and advancing
                  Technical and Vocational Education and Training (TVET) as a sustainable pathway to
                  empowerment. The Foundation further supports vulnerable groups through social
                  interventions, donations, and empowerment programs aimed at fostering inclusion and
                  dignity for all.
                </p>
              </div>
            </div>

            {/* Our Vision Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200/80 border-t-4 border-t-[#000080] flex flex-col justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-slate-900 mb-3">
                  Our Vision
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To create a society in which individuals are mentally sound, skillfully empowered,
                  and economically independent, thereby contributing meaningfully to national
                  development and social well-being across Ghana and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. WHERE IT ALL BEGAN / OUR STORY (Inspired by Inspo 2)    */}
      {/* ========================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 bg-white">
          {/* Header Bar */}
          <div className="bg-[#000080] text-white px-6 sm:px-10 py-5 sm:py-6">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-300 block mb-0.5">
              WHERE IT ALL BEGAN
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit']">
              Our Story
            </h2>
          </div>

          {/* Two-Column Split Content */}
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Narrative */}
              <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  Forster Kwarteng Foundation was established with a simple belief: that every
                  individual deserves the opportunity to thrive.
                </p>
                <p>
                  We have grown from a grassroots initiative to an organization serving hundreds of
                  individuals across vulnerable and underserved communities.
                </p>
                <p>
                  From our earliest outreach efforts, we realized that real change begins with
                  listening. Many of our programs were shaped directly from the voices of the
                  families, youths, and communities who trusted us with their stories.
                </p>
                <p>
                  As we expanded, we strengthened partnerships, built new initiatives, and created
                  platforms for individuals to develop life skills, pursue careers, and nurture
                  emotional well-being.
                </p>
                <p>
                  Our story continues to grow with every person we encounter, every challenge we
                  address, and every life touched through our work.
                </p>

                {/* Callout Quote */}
                <div className="pt-3 border-l-4 border-[#000080] pl-4 italic font-semibold text-[#000080] text-sm sm:text-base">
                  "Real change begins with listening."
                </div>
              </div>

              {/* Right Column: Story Photo */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200/80 max-w-sm w-full aspect-[4/5] bg-slate-100">
                  <img
                    src="/assets/about_story_photo.png"
                    alt="FKF team and volunteers in field action"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. OUR CORE VALUES (Inspired by Inspo 3)                  */}
      {/* ========================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-left mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-slate-900">
            Our Core Values
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            The principles that guide everything we do
          </p>
        </div>

        {/* Values Grid with Letter Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {coreValues.map((val, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 border-t-4 border-t-[#000080] hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Letter Pill Badge */}
                <div className="w-10 h-10 rounded-xl bg-[#000080] text-white font-extrabold font-['Outfit'] text-base flex items-center justify-center mb-4 shadow-xs">
                  {val.letter}
                </div>
                <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-slate-900 mb-1.5">
                  {val.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. OUR LEADERSHIP TEAM (Inspired by Inspo 4)               */}
      {/* ========================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-left mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-slate-900">
            Our Leadership Team
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Our dedicated team works tirelessly to advance our mission and create lasting impact.
          </p>
        </div>

        {/* Leadership Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {leadershipTeam.map((leader, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all text-center flex flex-col items-center"
            >
              <div className="w-36 h-36 rounded-2xl overflow-hidden bg-slate-100 mb-4 shadow-xs">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-slate-900 mb-0.5">
                {leader.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium mb-2">
                {leader.role}
              </p>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {leader.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. STRATEGIC GOALS ROADMAP (Inspired by Inspo 4)           */}
      {/* ========================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-gradient-to-r from-[#000080] via-[#090979] to-[#000052] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-300 block mb-1">
            OUR ROADMAP
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] mb-2">
            Strategic Goals
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm max-w-2xl leading-relaxed mb-8">
            Building a sustainable future through focused action and measurable impact.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {strategicGoals.map((goal, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-xs rounded-2xl p-5 border border-white/15 space-y-2 hover:bg-white/15 transition-all"
              >
                <div className="text-2xl font-black font-['Outfit'] text-amber-300">
                  {goal.number}
                </div>
                <h4 className="text-sm font-bold font-['Outfit'] text-white">
                  {goal.title}
                </h4>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  {goal.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. ACCREDITATION & REGISTRATION (Inspired by Inspo 5)      */}
      {/* ========================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="bg-white rounded-2xl p-6 sm:p-9 shadow-xs border border-slate-200/90 border-t-4 border-t-[#000080]">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#000080] block mb-1">
            TRUST & TRANSPARENCY
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-slate-900 mb-4">
            Accreditation & Registration
          </h3>

          {/* Checklist Container */}
          <div className="bg-slate-50/70 rounded-xl p-5 border border-slate-100 space-y-3 mb-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#000080] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                Forster Kwarteng Foundation is a registered non-profit organization (Registration No:
                CG098232024 / DSW/1042) committed to transparency.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#000080] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                We take compliance seriously and ensure that all our activities follow national
                guidelines for non-profit governance.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#000080] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                We remain open to periodic audits, external reviews, and community feedback to
                strengthen our governance practices.
              </p>
            </div>
          </div>

          {/* Status Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 font-semibold pt-1">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-[#000080] px-3 py-1 rounded-full border border-blue-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#000080]" />
              Registered Non-Profit
            </span>
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-[#000080] px-3 py-1 rounded-full border border-blue-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#000080]" />
              Fully Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-[#000080] px-3 py-1 rounded-full border border-blue-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#000080]" />
              Transparent Reporting
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. JOIN OUR MISSION (Inspired by Inspo 5)                 */}
      {/* ========================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12">
        <div className="bg-gradient-to-br from-[#000080] via-[#090979] to-[#0a0a85] rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl space-y-5">
          {/* Centered Icon Pill */}
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto border border-white/20 shadow-sm">
            <Users className="w-6 h-6 text-amber-300" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit']">
            Join Our Mission
          </h3>

          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            Your involvement can bring hope, opportunity, and transformation to countless individuals.
            Whether you contribute your time, skills, resources, or partnership, you become an essential
            part of the positive change we strive to create.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-2.5 rounded-lg bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
            >
              Get in Touch
            </button>
            <button
              onClick={onOpenDonateModal}
              className="px-6 py-2.5 rounded-lg bg-white text-[#000080] hover:bg-amber-400 hover:text-[#000080] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              Support Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
