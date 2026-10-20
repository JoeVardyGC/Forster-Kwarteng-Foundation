import React from 'react';
import type { PageId } from '../types';
import { useData } from '../context/DataContext';
import { FOUNDATION_INFO, CORE_VALUES } from '../data/foundationData';
import {
  Users,
  CheckCircle2,
  Heart,
  ShieldCheck,
  Zap,
  Award,
  ArrowRight,
  HeartHandshake,
  FileText,
  Leaf,
  Target,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenDonateModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenDonateModal }) => {
  const { foundationInfo } = useData();
  const valueIcons: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#000080]" />,
    HeartHandshake: <HeartHandshake className="w-5 h-5 text-rose-500" />,
    Zap: <Zap className="w-5 h-5 text-amber-500" />,
    Award: <Award className="w-5 h-5 text-[#000080]" />,
    FileText: <FileText className="w-5 h-5 text-blue-600" />,
    Users: <Users className="w-5 h-5 text-indigo-600" />,
    Leaf: <Leaf className="w-5 h-5 text-emerald-600" />,
  };

  const founderInfo = {
    name: 'Mr. Forster Kwarteng',
    role: 'Founder & Chief Executive Officer',
    image: '/assets/founder.png',
    bio: [
      'Mr. Forster Kwarteng established the Forster Kwarteng Foundation (FKF, also widely known as Foster Kwarteng Foundation) with a singular, resolute conviction: that no child or young adult in Ghana should have their destiny restricted by socioeconomic hardship or lack of educational opportunity.',
      'Under his strategic leadership, the Foundation has grown into a beacon of empowerment—spearheading full basic education sponsorships, structured youth mentorship, vocational TVET skill certifications, and grassroots social interventions that foster generational self-reliance and dignity.',
    ],
    quote:
      '“Empowering lives and building futures is not merely our motto—it is our daily promise to every community and young person we serve.”',
  };

  const strategicGoals = [
    {
      number: '01',
      title: 'Quality Basic Education',
      description:
        'Equipping orphaned and economically vulnerable pupils across Ghana with textbooks, uniforms, and full scholarships.',
    },
    {
      number: '02',
      title: 'Youth Mentorship & Literacy',
      description:
        'Nurturing confident, principled young leaders through structured mentorship and girl-child literacy reading clubs.',
    },
    {
      number: '03',
      title: 'Skills Development & TVET',
      description:
        'Empowering youth with vocational certifications, electrical and fashion training, and enterprise starter toolkits.',
    },
    {
      number: '04',
      title: 'Sustainable Social Interventions',
      description:
        'Delivering grassroots community care, mobile medical screenings, and sustainable relief to underserved households.',
    },
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-800 pb-20">
      {/* ========================================================= */}
      {/* 1. HERO BANNER: BRAND STATEMENT & MOTTO                   */}
      {/* ========================================================= */}
      <section className="relative">
        <div className="relative min-h-[380px] sm:min-h-[440px] w-full bg-[#000080] overflow-hidden flex items-center justify-center text-center">
          <img
            src="/assets/about_hero_banner.png"
            alt="Forster Kwarteng Foundation"
            className="absolute inset-0 w-full h-full object-cover object-center mix-blend-overlay opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000080]/95 via-[#000080]/90 to-[#000052]/98" />

          {/* Ambient Blurred Orbs */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 px-4 max-w-4xl mx-auto space-y-4 py-16">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300 shadow-sm">
              <span>{foundationInfo.motto || FOUNDATION_INFO.motto}</span>
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-['Outfit'] text-white tracking-tight leading-tight">
              {foundationInfo.name || FOUNDATION_INFO.name}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-blue-100 max-w-3xl mx-auto font-normal leading-relaxed">
              {foundationInfo.brandStatement || FOUNDATION_INFO.brandStatement}
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. DUAL CARDS: OUR MISSION & OUR VISION                   */}
        {/* ========================================================= */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Our Mission Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90 flex flex-col justify-between overflow-hidden">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-slate-900 mb-3">
                  Our Mission
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
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
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90 flex flex-col justify-between overflow-hidden">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-slate-900 mb-3">
                  Our Vision
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
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
      {/* 3. WHERE IT ALL BEGAN / OUR STORY                        */}
      {/* ========================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 bg-white">
          {/* Header Bar */}
          <div className="bg-[#000080] text-white px-6 sm:px-10 py-5 sm:py-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit']">
              Our Story
            </h2>
          </div>

          {/* Two-Column Split Content */}
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Narrative */}
              <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                <p>
                  <strong className="text-slate-900 font-semibold">FORSTER KWARTENG FOUNDATION</strong> was established with a singular conviction: that every individual, regardless of their background, deserves the opportunity, skills, and support to achieve their fullest potential.
                </p>
                <p>
                  What started as targeted community visits in Greater Accra has grown into a structured non-profit foundation delivering educational sponsorships, youth mentorship, vocational toolkits, and vital social relief to hundreds of children and families.
                </p>
                <p>
                  From our earliest outreach efforts, we understood that lasting empowerment cannot be achieved through short-term handouts. Real change requires listening to communities, understanding the root barriers to school attendance, and providing youth with practical technical skills that translate into sustainable livelihoods.
                </p>
                <p>
                  Today, under the leadership of Mr. Forster Kwarteng and our dedicated team, we continue to expand our footprint—partnering with local schools, certified artisan trainers, clinics, and donors who share our passion for building self-reliant futures.
                </p>

                {/* Callout Quote */}
                <div className="pt-3 border-l-4 border-[#000080] pl-4 italic font-semibold text-[#000080] text-sm sm:text-base">
                  "Empowering lives and building futures is not merely our motto—it is our daily commitment on the ground."
                </div>
              </div>

              {/* Right Column: Story Photo */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200/80 max-w-sm w-full aspect-[4/5] bg-slate-100">
                  <img
                    src="/assets/fkf_mockup_1.png"
                    alt="FORSTER KWARTENG FOUNDATION children and youth"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. OUR 7 CORE VALUES                                      */}
      {/* ========================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-left mb-10">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#000080] block mb-1 font-mono">
            GUIDING ETHOS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Outfit'] text-slate-900">
            Our 7 Core Values
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
            The foundational principles that guide every decision, outreach, partnership, and resource entrusted to the Forster Kwarteng Foundation.
          </p>
        </div>

        {/* Values Grid: 7 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {CORE_VALUES.map((val) => (
            <div
              key={val.id}
              className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Number Pill + Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold text-[#000080] bg-blue-50 border border-blue-200/60">
                    0{val.id}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center group-hover:bg-blue-50 group-hover:scale-105 transition-all">
                    {valueIcons[val.iconName] || <Award className="w-5 h-5 text-[#000080]" />}
                  </div>
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600 mb-1 font-sans">
                  {val.tagline}
                </div>

                <h3 className="text-lg font-bold font-['Outfit'] text-slate-900 group-hover:text-[#000080] transition-colors mb-2">
                  {val.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. STRATEGIC GOALS ROADMAP                                */}
      {/* ========================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="bg-gradient-to-r from-[#000080] via-[#090979] to-[#000052] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-300 block mb-1 font-mono">
            STRATEGIC IMPACT
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] mb-2">
            Strategic Focus & Goals
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm max-w-2xl leading-relaxed mb-8">
            Translating our mission and core values into measurable change across communities in Ghana.
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
                <p className="text-xs text-blue-100/80 leading-relaxed font-normal">
                  {goal.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. OUR FOUNDER & EXECUTIVE LEADERSHIP                     */}
      {/* ========================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-left mb-8">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#000080] block mb-1 font-mono">
            STEWARDSHIP & LEADERSHIP
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-slate-900">
            Our Founder
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-2xl">
            Visionary leadership dedicated to grassroots empowerment, education, and sustainable community impact across Ghana.
          </p>
        </div>

        {/* Featured Founder Showcase Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Portrait */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-4 border-slate-100 bg-slate-100 w-full max-w-sm aspect-[4/5] group">
                <img
                  src={founderInfo.image}
                  alt={`${founderInfo.name} — ${founderInfo.role}`}
                  className="w-full h-full object-cover object-[center_12%] group-hover:scale-103 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Photo Badge overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/20 text-white shadow-lg">
                  <div className="text-sm font-extrabold font-['Outfit'] tracking-wide text-white">
                    {founderInfo.name}
                  </div>
                  <div className="text-xs font-medium text-amber-300 mt-0.5">
                    {founderInfo.role}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Bio & Impact */}
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 border border-blue-200/60 text-[#000080]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#000080]" />
                <span>Executive Leadership</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-slate-900">
                  {founderInfo.name}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#000080] mt-0.5">
                  {founderInfo.role}
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {founderInfo.bio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Founder Quote */}
              <div className="border-l-4 border-[#000080] pl-4 py-2 italic font-medium text-[#000080] text-xs sm:text-sm bg-blue-50/50 rounded-r-xl">
                {founderInfo.quote}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. ACCREDITATION & REGISTRATION                           */}
      {/* ========================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="bg-white rounded-2xl p-6 sm:p-9 shadow-xs border border-slate-200/90 border-t-4 border-t-[#000080]">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#000080] block mb-1 font-mono">
            TRUST & TRANSPARENCY
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-slate-900 mb-4">
            Official Accreditation & Registration
          </h3>

          {/* Checklist Container */}
          <div className="bg-slate-50/70 rounded-xl p-5 border border-slate-100 space-y-3 mb-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#000080] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-900 font-semibold">{foundationInfo.name || FOUNDATION_INFO.name}</strong> is a registered non-profit organization in Ghana under Registration No:{' '}
                <span className="font-mono font-bold text-[#000080]">{foundationInfo.registrationNo || FOUNDATION_INFO.registrationNo}</span>.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#000080] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                We maintain full legal and statutory compliance under Ghanaian regulations for non-profit and charitable social welfare operations.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#000080] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                We practice transparent stewardship with documented recordkeeping, open accountability, and strict fidelity to our beneficiaries and partners.
              </p>
            </div>
          </div>

          {/* Status Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 font-semibold pt-1">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-[#000080] px-3.5 py-1.5 rounded-full border border-blue-200/60 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Official Registration: {foundationInfo.registrationNo || FOUNDATION_INFO.registrationNo}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-[#000080] px-3.5 py-1.5 rounded-full border border-blue-200/60 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#000080]" />
              Non-Profit & Charitable Status
            </span>
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-[#000080] px-3.5 py-1.5 rounded-full border border-blue-200/60 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#000080]" />
              Accountable & Audited
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. JOIN OUR MISSION CALL TO ACTION                        */}
      {/* ========================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="bg-gradient-to-br from-[#000080] via-[#090979] to-[#0a0a85] rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto border border-white/20 shadow-sm">
            <Users className="w-6 h-6 text-amber-300" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit']">
            Join Our Mission
          </h3>

          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed font-normal">
            Your involvement brings hope, education, and lasting dignity to vulnerable children and youths across Ghana. Whether through financial contribution, mentoring, or partnership, you become an essential force for lasting change.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="px-7 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/25 transition-all cursor-pointer"
            >
              Get in Touch
            </button>
            <button
              onClick={onOpenDonateModal}
              className="px-7 py-3 rounded-full bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-black text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-[#000080]" />
              <span>Support Our Work</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
