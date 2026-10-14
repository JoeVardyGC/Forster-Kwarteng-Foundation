import React, { useState, useMemo } from 'react';
import type { PageId } from '../types';
import {
  OUR_PROGRAMS,
  PROGRAM_ARTICLES,
  PROGRAM_PILLARS,
  UPCOMING_PROJECTS,
} from '../data/foundationData';
import {
  Calendar,
  MapPin,
  Users,
  Search,
  ChevronRight,
  ArrowRight,
  Heart,
  Target,
  GraduationCap,
  Compass,
  Wrench,
  HeartHandshake,
  FolderOpen,
  CheckCircle2,
  Sparkles,
  Layers,
  X,
  Clock,
} from 'lucide-react';

interface ProgramsPageProps {
  onNavigate: (page: PageId) => void;
  onSelectProgram?: (programId: string) => void;
  onOpenDonateModal: () => void;
}

type ProjectFilter = 'all' | 'active' | 'upcoming';

export const ProgramsPage: React.FC<ProgramsPageProps> = ({
  onNavigate,
  onSelectProgram,
  onOpenDonateModal,
}) => {
  const [filter, setFilter] = useState<ProjectFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const pillarIcons: Record<string, React.ReactNode> = {
    education: <GraduationCap className="w-5 h-5 text-[#000080]" />,
    mentorship: <Compass className="w-5 h-5 text-[#000080]" />,
    skills: <Wrench className="w-5 h-5 text-[#000080]" />,
    community: <HeartHandshake className="w-5 h-5 text-[#000080]" />,
  };

  // 1. Prepare Active Programs
  const activeItems = useMemo(() => {
    return OUR_PROGRAMS.map((prog) => {
      const article = PROGRAM_ARTICLES[prog.id];
      return {
        kind: 'active' as const,
        id: prog.id,
        title: prog.title,
        category: article?.category || 'Community Project',
        description: prog.description,
        image: prog.image,
        location: article?.location || 'Greater Accra & Eastern Regions',
        metric: article?.impactStats?.[0]
          ? `${article.impactStats[0].value} ${article.impactStats[0].label}`
          : 'Verified Grassroots Impact',
        readTime: article?.readTime || '4 min read',
      };
    });
  }, []);

  // 2. Prepare Upcoming Missions
  const upcomingItems = useMemo(() => {
    return UPCOMING_PROJECTS.map((up) => ({
      kind: 'upcoming' as const,
      id: up.id,
      title: up.title,
      category: up.category,
      description: up.summary,
      image: up.image,
      location: up.location,
      metric: `${up.highlightMetric.value} (${up.highlightMetric.label})`,
      formattedDate: up.formattedDate,
      time: up.time,
      status: up.status,
      tags: up.tags,
    }));
  }, []);

  // 3. Filtered List based on tab and search
  const displayedItems = useMemo(() => {
    let list: Array<(typeof activeItems)[0] | (typeof upcomingItems)[0]> = [];
    if (filter === 'all') {
      list = [...activeItems, ...upcomingItems];
    } else if (filter === 'active') {
      list = activeItems;
    } else {
      list = upcomingItems;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q)
      );
    }

    return list;
  }, [filter, searchQuery, activeItems, upcomingItems]);

  const activeCount = activeItems.length;
  const upcomingCount = upcomingItems.length;
  const totalCount = activeCount + upcomingCount;

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-[#000080] via-[#090979] to-[#000052] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 font-semibold text-xs border border-white/20 mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Field Programs & Community Initiatives
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight">
            Our Projects & Initiatives
          </h1>
          <p className="text-base sm:text-lg text-blue-100 mt-4 leading-relaxed max-w-2xl mx-auto">
            Explore our active grassroots programs, community outreaches, and youth empowerment projects creating measurable, lasting change across Ghana.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-2xl font-black font-['Outfit'] text-amber-300">
                {activeCount}
              </div>
              <div className="text-[11px] font-semibold text-blue-200 mt-0.5">
                Active Programs
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-2xl font-black font-['Outfit'] text-amber-300">
                {upcomingCount}
              </div>
              <div className="text-[11px] font-semibold text-blue-200 mt-0.5">
                Upcoming Missions
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-2xl font-black font-['Outfit'] text-amber-300">
                10,000+
              </div>
              <div className="text-[11px] font-semibold text-blue-200 mt-0.5">
                Lives Reached
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-2xl font-black font-['Outfit'] text-amber-300">
                100%
              </div>
              <div className="text-[11px] font-semibold text-blue-200 mt-0.5">
                Grassroots Driven
              </div>
            </div>
          </div>
        </div>

        {/* Stepped Accent Stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 fkf-step-bar" />
      </section>

      {/* 2. FILTER & SEARCH CONTROL BAR */}
      <section className="bg-white border-b border-slate-200 sticky top-[73px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  filter === 'all'
                    ? 'bg-[#000080] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
                }`}
              >
                <span>All Projects</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    filter === 'all'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {totalCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  filter === 'active'
                    ? 'bg-[#000080] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Active Programs</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    filter === 'active'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {activeCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setFilter('upcoming')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  filter === 'upcoming'
                    ? 'bg-[#000080] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>Upcoming Missions</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    filter === 'upcoming'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {upcomingCount}
                </span>
              </button>
            </div>

            {/* Quick Keyword Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search projects by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs rounded-full bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#000080]/20 focus:border-[#000080] transition-all text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROJECTS CATALOG GRID (FRONT & CENTER) */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {displayedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedItems.map((item) => {
                const isActive = item.kind === 'active';

                return (
                  <div
                    key={`${item.kind}-${item.id}`}
                    className="bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,128,0.12)] hover:border-[#000080]/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
                  >
                    {/* Cover Banner */}
                    <div
                      onClick={() => {
                        if (isActive && onSelectProgram) {
                          onSelectProgram(item.id);
                        }
                      }}
                      className={`relative h-52 overflow-hidden bg-slate-100 ${
                        isActive ? 'cursor-pointer' : ''
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                      {/* Status Badge */}
                      <div className="absolute top-3.5 left-3.5">
                        {isActive ? (
                          <div className="px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20 shadow-sm flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Active Program</span>
                          </div>
                        ) : (
                          <div className="px-3 py-1 rounded-full bg-[#000080]/85 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20 shadow-sm flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-amber-300" />
                            <span>Upcoming Mission</span>
                          </div>
                        )}
                      </div>

                      {/* Read time or date badge */}
                      <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-medium border border-white/10 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-300" />
                        <span>{'readTime' in item ? item.readTime : ('formattedDate' in item ? item.formattedDate.split(',')[0] : 'Upcoming')}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                      <div className="space-y-3">
                        {/* Category & Location Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#000080] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                            {item.category}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span className="truncate max-w-[140px]">{item.location}</span>
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          onClick={() => {
                            if (isActive && onSelectProgram) {
                              onSelectProgram(item.id);
                            }
                          }}
                          className={`text-lg sm:text-xl font-bold font-['Outfit'] text-slate-900 group-hover:text-[#000080] transition-colors leading-snug ${
                            isActive ? 'cursor-pointer' : ''
                          }`}
                        >
                          {item.title}
                        </h3>

                        {/* Description (1-minute concise reading) */}
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                          {item.description}
                        </p>

                        {/* Impact Tag / Highlight */}
                        <div className="pt-1">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50/80 border border-amber-200/80 text-[11px] font-bold text-amber-900">
                            <Target className="w-3 h-3 text-amber-600 shrink-0" />
                            <span>{item.metric}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Action Footer */}
                      <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between gap-2">
                        {isActive ? (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                if (onSelectProgram) {
                                  onSelectProgram(item.id);
                                } else {
                                  onNavigate('programs');
                                }
                              }}
                              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#000080] group-hover:gap-2.5 transition-all cursor-pointer"
                            >
                              <span>Read Full Story & Gallery</span>
                              <ChevronRight className="w-4 h-4 text-[#000080]" />
                            </button>

                            <button
                              type="button"
                              onClick={onOpenDonateModal}
                              title="Support this project"
                              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            >
                              <Heart className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => onNavigate('contact')}
                              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#000080] group-hover:gap-2 transition-all cursor-pointer"
                            >
                              <span>Volunteer / Partner</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#000080]" />
                            </button>

                            <button
                              type="button"
                              onClick={onOpenDonateModal}
                              className="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-full border border-amber-200 transition-colors cursor-pointer"
                            >
                              Sponsor
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="max-w-xl mx-auto text-center py-16 px-6 sm:px-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#000080] flex items-center justify-center mx-auto shadow-2xs border border-blue-100">
                <FolderOpen className="w-8 h-8 text-[#000080]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-slate-900">
                  No Matching Projects Found
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                  {searchQuery
                    ? `No projects found matching "${searchQuery}". Try a different keyword or reset your filters.`
                    : 'We are currently preparing our next round of community development programs. Check back soon for announcements on new deployments.'}
                </p>
              </div>
              <div className="pt-2 flex items-center justify-center gap-3">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setFilter('all');
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#000080] text-white text-xs font-bold shadow-sm hover:bg-[#0a0a85] transition-all cursor-pointer"
                  >
                    Clear Filters
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="px-6 py-2.5 rounded-full bg-[#000080] text-white text-xs font-bold shadow-sm hover:bg-[#0a0a85] transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>Propose a Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. COMPACT BOTTOM SECTION: OUR 4 STRATEGIC PILLARS */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-[#000080] border border-blue-200/80 tracking-wider shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-[#000080]" />
              Strategic Foundation
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Outfit'] text-slate-900 mt-2.5">
              Our 4 Core Focus Areas
            </h2>
            <div className="h-1 w-12 bg-[#000080] rounded-full mx-auto my-3" />
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every grassroots project we undertake aligns with one of our four strategic pillars to ensure long-term, sustainable progress across Ghanaian communities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROGRAM_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#000080]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                    {pillarIcons[pillar.id] || (
                      <Sparkles className="w-5 h-5 text-[#000080]" />
                    )}
                  </div>
                  <h3 className="text-base font-bold font-['Outfit'] text-[#000080] mb-1.5">
                    {pillar.title}
                  </h3>
                  <span className="inline-block text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80 mb-3">
                    {pillar.impactMetric}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Key Initiatives
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700 font-medium">
                    {pillar.keyInitiatives.slice(0, 2).map((init, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{init}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION SECTION */}
      <section className="py-16 bg-gradient-to-r from-[#000080] via-[#00006a] to-[#000052] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 font-semibold text-xs border border-white/20">
            <Heart className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            Partner for Change
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Outfit'] tracking-tight">
            Have a Community in Need or Want to Sponsor a Project?
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Whether you wish to sponsor educational packages for a rural school, support vocational toolkits for young artisans, or volunteer in the field, your partnership makes it happen.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onOpenDonateModal}
              className="px-6 py-3 rounded-full bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-[#000080]" />
              <span>Donate to Support Projects</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/25 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Propose a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
