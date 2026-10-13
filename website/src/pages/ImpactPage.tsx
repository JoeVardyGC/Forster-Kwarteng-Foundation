import React, { useState } from 'react';
import type { PageId } from '../types';
import { BENEFICIARY_STORIES, IMPACT_STATS } from '../data/foundationData';
import {
  Quote,
  MapPin,
  Sparkles,
  Heart,
  CheckCircle2,
  Users,
  Award,
  BookOpen,
} from 'lucide-react';

interface ImpactPageProps {
  onNavigate: (page: PageId) => void;
  onOpenDonateModal: () => void;
}

export const ImpactPage: React.FC<ImpactPageProps> = ({ onNavigate, onOpenDonateModal }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'education' | 'skills' | 'mentorship'>('all');

  const filteredStories = BENEFICIARY_STORIES.filter((story) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'education') return story.program.includes('Education');
    if (selectedFilter === 'skills') return story.program.includes('Skills');
    if (selectedFilter === 'mentorship') return story.program.includes('Mentorship');
    return true;
  });

  return (
    <div className="space-y-0">
      {/* 1. IMPACT HERO */}
      <section className="bg-gradient-to-b from-[#000080] to-[#0a0a85] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 font-semibold text-xs border border-white/20 mb-4">
            Evidence & Accountability
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight">
            Real Stories. Measurable Lives Changed.
          </h1>
          <p className="text-base sm:text-lg text-blue-100 mt-4 leading-relaxed">
            Behind every number is a child who stays in the classroom, a mother who feeds her family, and a youth who starts a business in Ghana.
          </p>
        </div>

        {/* Stepped Accent Stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 fkf-step-bar"></div>
      </section>

      {/* 2. STATS BANNER */}
      <section className="bg-slate-50 py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {IMPACT_STATS.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-xs"
              >
                <div className="text-3xl sm:text-4xl font-black font-['Outfit'] text-[#000080]">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BENEFICIARY STORIES SHOWCASE */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full">
                Voices of Hope
              </span>
              <h2 className="text-3xl font-extrabold font-['Outfit'] text-[#000080] mt-2">
                Beneficiary Case Studies
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              {(['all', 'education', 'skills', 'mentorship'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                    selectedFilter === filter
                      ? 'bg-white text-[#000080] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all duration-200"
              >
                <div>
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#000080] text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {story.program}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        {story.location}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg font-['Outfit'] text-[#000080]">
                      {story.name}
                    </h3>
                    <p className="text-xs font-semibold text-amber-600">
                      {story.role}
                    </p>

                    <blockquote className="text-xs italic text-slate-700 bg-white p-3 rounded-xl border border-slate-100">
                      {story.quote}
                    </blockquote>

                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {story.story}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Outcome: {story.outcome}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FIELD OUTREACH GALLERY */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#000080]">
              Snapshots From the Field in Ghana
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Authentic moments from our school visits, scholarship distributions, and vocational graduation ceremonies.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                src: '/assets/bd FKF.png',
                caption: 'Children rejoicing during classroom supply distribution',
              },
              {
                src: '/assets/FKF mockup 1.png',
                caption: 'Smiling students with brand-new FKF books & uniforms',
              },
              {
                src: '/assets/FKF Color G.png',
                caption: 'Official brand identity & youth empowerment launch',
              },
              {
                src: '/assets/foster logo main VERTICAL.png',
                caption: 'Community mentorship meeting in Accra',
              },
            ].map((photo, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden shadow-sm group aspect-square bg-slate-900"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-xs font-medium">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-16 bg-[#000080] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-extrabold font-['Outfit'] text-white">
            Write the Next Story of Hope
          </h2>
          <p className="text-blue-100 text-sm max-w-xl mx-auto leading-relaxed">
            Your single or monthly donation gives a Ghanaian student the chance to stay in school and achieve their fullest potential.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenDonateModal}
              className="px-8 py-3.5 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-bold text-sm rounded-full shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-[#000080]" />
              <span>Make an Impact Today</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
