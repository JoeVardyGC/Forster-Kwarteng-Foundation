import React, { useState } from 'react';
import type { PageId } from '../types';
import { PROGRAM_PILLARS, OUR_PROGRAMS } from '../data/foundationData';
import {
  GraduationCap,
  Compass,
  Wrench,
  HeartHandshake,
  CheckCircle2,
  Heart,
  Target,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

interface ProgramsPageProps {
  onNavigate: (page: PageId) => void;
  onSelectProgram?: (programId: string) => void;
  onOpenDonateModal: () => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({
  onNavigate,
  onSelectProgram,
  onOpenDonateModal,
}) => {
  const [activeTab, setActiveTab] = useState<string>(PROGRAM_PILLARS[0].id);

  const pillarIcons: Record<string, React.ReactNode> = {
    education: <GraduationCap className="w-6 h-6 text-[#000080]" />,
    mentorship: <Compass className="w-6 h-6 text-[#000080]" />,
    skills: <Wrench className="w-6 h-6 text-[#000080]" />,
    community: <HeartHandshake className="w-6 h-6 text-[#000080]" />,
  };

  const selectedPillar = PROGRAM_PILLARS.find((p) => p.id === activeTab) || PROGRAM_PILLARS[0];

  return (
    <div className="space-y-0">
      {/* 1. PROGRAMS HERO */}
      <section className="bg-gradient-to-b from-[#000080] to-[#0a0a85] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 font-semibold text-xs border border-white/20 mb-4">
            Our 4 Operational Pillars
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight">
            Targeted Interventions. Sustainable Futures.
          </h1>
          <p className="text-base sm:text-lg text-blue-100 mt-4 leading-relaxed">
            From basic classroom supplies to digital literacy, youth mentorship, and community healthcare, our programs address the root causes of vulnerability in Ghana.
          </p>
        </div>

        {/* Stepped Accent Stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 fkf-step-bar"></div>
      </section>

      {/* 2. PROGRAM SELECTOR TABS */}
      <section className="bg-slate-50 py-6 border-b border-slate-200 sticky top-[73px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {PROGRAM_PILLARS.map((p) => {
              const isActive = activeTab === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(p.id)}
                  className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#000080] text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span className={isActive ? 'text-amber-400' : 'text-slate-500'}>
                    {pillarIcons[p.id]}
                  </span>
                  <span>{p.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. SELECTED PROGRAM FEATURE DEEP-DIVE */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                <Target className="w-3.5 h-3.5 text-amber-600" />
                <span>Impact Metric: {selectedPillar.impactMetric}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-[#000080]">
                {selectedPillar.title}
              </h2>

              <p className="text-base text-slate-700 leading-relaxed font-medium">
                {selectedPillar.subtitle} — {selectedPillar.description}
              </p>

              {/* Key Initiatives List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Key Operational Initiatives
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedPillar.keyInitiatives.map((init, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-start gap-2.5 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{init}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Goals */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Strategic Goals
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {selectedPillar.goals.map((g, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#000080]"></span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Program Action */}
              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={onOpenDonateModal}
                  className="px-6 py-3 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-bold text-xs rounded-full shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-[#000080]" />
                  <span>Sponsor This Program</span>
                </button>
                <button
                  onClick={() => onNavigate('get-involved')}
                  className="px-6 py-3 bg-blue-50 hover:bg-blue-100 text-[#000080] font-bold text-xs rounded-full border border-blue-200 transition-colors cursor-pointer"
                >
                  Volunteer for This Pillar
                </button>
              </div>
            </div>

            {/* Right Media */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 bg-slate-900 group">
                <img
                  src={selectedPillar.image}
                  alt={selectedPillar.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ALL 4 PILLARS IN DETAIL GRID */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#000080]">
              Full Spectrum of Intervention Programs
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              How our integrated model creates self-sustaining progress in Ghanaian communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROGRAM_PILLARS.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center">
                      {pillarIcons[p.id]}
                    </div>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                      {p.impactMetric.split(' ')[0]} {p.impactMetric.split(' ')[1]}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold font-['Outfit'] text-[#000080]">
                    {p.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Core Activities
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {p.keyInitiatives.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveTab(p.id)}
                    className="text-xs font-bold text-[#000080] hover:text-amber-600 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Pillar Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={onOpenDonateModal}
                    className="text-xs font-bold text-amber-700 hover:text-amber-800 cursor-pointer"
                  >
                    Donate to This Pillar →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR CORE PROGRAMS & FIELD ARTICLES */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2 font-semibold">
              FIELD INTERVENTIONS & IMPACT STORIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-slate-900 tracking-tight">
              Our Core Programs in Detail
            </h2>
            <div className="w-12 h-1 bg-[#000080] mx-auto rounded-full mt-3 mb-4"></div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore in-depth field case studies, verified impact statistics, and frontline documentaries from our active community programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {OUR_PROGRAMS.map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
              >
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
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-full border border-amber-200 transition-colors cursor-pointer"
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
    </div>
  );
};

