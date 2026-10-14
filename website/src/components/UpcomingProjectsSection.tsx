import React, { useState, useEffect } from 'react';
import type { PageId } from '../types';
import { UPCOMING_PROJECTS } from '../data/foundationData';
import {
  Calendar,
  CalendarOff,
  Clock,
  MapPin,
  Heart,
  ArrowRight,
  Users,
  Timer,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

interface UpcomingProjectsSectionProps {
  onNavigate: (page: PageId) => void;
  onOpenDonateModal: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function calculateTimeRemaining(targetDateStr: string): TimeRemaining {
  const target = new Date(targetDateStr).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (isNaN(target) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isPast: false };
}

export const UpcomingProjectsSection: React.FC<UpcomingProjectsSectionProps> = ({
  onNavigate,
  onOpenDonateModal,
}) => {
  const [times, setTimes] = useState<Record<string, TimeRemaining>>(() => {
    const initial: Record<string, TimeRemaining> = {};
    UPCOMING_PROJECTS.forEach((item) => {
      initial[item.id] = calculateTimeRemaining(item.targetDate);
    });
    return initial;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const updated: Record<string, TimeRemaining> = {};
      UPCOMING_PROJECTS.forEach((item) => {
        updated[item.id] = calculateTimeRemaining(item.targetDate);
      });
      setTimes(updated);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const featuredProject = UPCOMING_PROJECTS.find((p) => p.status === 'Featured') || UPCOMING_PROJECTS[0];
  const otherProjects = UPCOMING_PROJECTS.filter((p) => p.id !== featuredProject?.id);

  const featuredTime = featuredProject ? times[featuredProject.id] : null;

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden border-b border-slate-200">
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-100/35 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-blue-50/90 backdrop-blur-md border border-blue-200/70 text-[#000080] tracking-wider shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-[#000080]" />
            Our Projects & Field Calendar
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-slate-900 mt-3 tracking-tight">
            Our Projects & Community Initiatives
          </h2>
          <div className="h-1 w-16 bg-[#000080] rounded-full mx-auto my-3" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Follow our upcoming field missions, community outreaches, and youth empowerment summits across Ghana. Mark your calendar and partner with us.
          </p>
        </div>

        {/* EMPTY STATE OR PROJECT CARDS */}
        {UPCOMING_PROJECTS.length === 0 ? (
          <div className="max-w-xl mx-auto text-center py-14 px-6 sm:px-8 rounded-3xl bg-white border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,128,0.05)] space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#000080] flex items-center justify-center mx-auto shadow-2xs border border-blue-100">
              <CalendarOff className="w-8 h-8 text-[#000080]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-slate-900">
                No Scheduled Events on Our Calendar
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                There are currently no upcoming field dates or events scheduled on our outreach calendar right now. Please check back soon or reach out to partner with us on an initiative in your community.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 rounded-full bg-[#000080] hover:bg-[#0a0a85] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Partner on an Upcoming Event</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* FEATURED UPCOMING PROJECT (Showcase Hero Card) */}
            {featuredProject && (
              <div className="mb-12 bg-white rounded-3xl lg:rounded-[36px] border border-slate-200/90 shadow-[0_12px_44px_rgba(0,0,128,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,128,0.12)] transition-all duration-500 overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Photo Box */}
              <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[340px] lg:min-h-[460px] overflow-hidden bg-slate-100">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                    {featuredProject.category}
                  </span>
                </div>

                {/* Bottom Photo Pill: Target Metric */}
                {featuredProject.highlightMetric && (
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-slate-950/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-amber-300 font-bold">
                        {featuredProject.highlightMetric.label}
                      </div>
                      <div className="text-base font-extrabold font-['Outfit'] text-white">
                        {featuredProject.highlightMetric.value}
                      </div>
                    </div>
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  </div>
                )}
              </div>

              {/* Content & Live Countdown Column */}
              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  {/* Date & Location Quick Bar */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500 mb-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-1.5 text-[#000080] font-bold">
                      <Calendar className="w-4 h-4 text-amber-600" />
                      <span>{featuredProject.formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{featuredProject.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <MapPin className="w-4 h-4 text-rose-500" />
                      <span>{featuredProject.location}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-slate-900 leading-tight mb-3 group-hover:text-[#000080] transition-colors">
                    {featuredProject.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {featuredProject.summary}
                  </p>

                  {/* LIVE COUNTDOWN DISPLAY */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 via-slate-50 to-amber-50/50 border border-blue-100/80 mb-8">
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-2">
                        <Timer className="w-4 h-4 text-[#000080] animate-spin-slow" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#000080]">
                          Event Countdown
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/90 px-2.5 py-0.5 rounded-full">
                        {featuredTime?.isPast ? 'Project Active' : `${featuredTime?.days || 0} Days Remaining`}
                      </span>
                    </div>

                    {/* 4-Box Countdown */}
                    <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                      <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/90 shadow-2xs">
                        <div className="text-xl sm:text-3xl font-black font-['Outfit'] text-[#000080]">
                          {featuredTime?.days ?? 0}
                        </div>
                        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                          Days
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/90 shadow-2xs">
                        <div className="text-xl sm:text-3xl font-black font-['Outfit'] text-[#000080]">
                          {String(featuredTime?.hours ?? 0).padStart(2, '0')}
                        </div>
                        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                          Hours
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/90 shadow-2xs">
                        <div className="text-xl sm:text-3xl font-black font-['Outfit'] text-[#000080]">
                          {String(featuredTime?.minutes ?? 0).padStart(2, '0')}
                        </div>
                        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                          Mins
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/90 shadow-2xs">
                        <div className="text-xl sm:text-3xl font-black font-['Outfit'] text-[#F5BD02]">
                          {String(featuredTime?.seconds ?? 0).padStart(2, '0')}
                        </div>
                        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                          Secs
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4 border-t border-slate-100">
                  <button
                    onClick={onOpenDonateModal}
                    className="px-6 py-3.5 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-black text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-[#000080]" />
                    <span>Support This Project</span>
                  </button>

                  <button
                    onClick={() => onNavigate('contact')}
                    className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200/90 text-[#000080] font-bold text-sm rounded-full transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Volunteer or Inquire</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ADDITIONAL UPCOMING PROJECTS GRID */}
        {otherProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherProjects.map((project) => {
              const projectTime = times[project.id];
              return (
                <div
                  key={project.id}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_44px_rgba(0,0,128,0.1)] hover:border-[#000080]/30 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Image Banner */}
                    <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                          {project.category}
                        </span>
                      </div>

                      {/* Floating Countdown Pill on Image */}
                      <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-amber-400 text-[#000080] text-[11px] font-black shadow-md flex items-center gap-1.5">
                        <Timer className="w-3.5 h-3.5" />
                        <span>
                          {projectTime?.isPast ? 'In Progress' : `${projectTime?.days || 0} Days Left`}
                        </span>
                      </div>

                      {/* Bottom Banner Info */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
                        <div className="flex items-center gap-1.5 font-bold">
                          <Calendar className="w-4 h-4 text-amber-300" />
                          <span>{project.formattedDate}</span>
                        </div>
                        {project.highlightMetric && (
                          <span className="text-[11px] font-semibold text-amber-200">
                            {project.highlightMetric.value}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 sm:p-7">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </div>

                      <h4 className="text-xl font-bold font-['Outfit'] text-slate-900 group-hover:text-[#000080] transition-colors leading-snug mb-3">
                        {project.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5">
                        {project.summary}
                      </p>

                      {/* Mini Countdown Ticker Bar */}
                      <div className="py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs text-slate-700">
                        <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#000080]" />
                          <span>Starts in:</span>
                        </span>
                        <div className="font-mono font-bold text-[#000080]">
                          <span className="text-[#000080]">{projectTime?.days || 0}d</span>{' '}
                          <span className="text-slate-400">:</span>{' '}
                          <span className="text-[#000080]">{String(projectTime?.hours || 0).padStart(2, '0')}h</span>{' '}
                          <span className="text-slate-400">:</span>{' '}
                          <span className="text-[#000080]">{String(projectTime?.minutes || 0).padStart(2, '0')}m</span>{' '}
                          <span className="text-slate-400">:</span>{' '}
                          <span className="text-amber-600">{String(projectTime?.seconds || 0).padStart(2, '0')}s</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-6 sm:p-7 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                    <button
                      onClick={onOpenDonateModal}
                      className="text-xs font-bold text-[#000080] hover:text-[#0a0a85] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-[#000080]" />
                      <span>Support Outreach</span>
                    </button>

                    <button
                      onClick={() => onNavigate('contact')}
                      className="text-xs font-bold text-slate-600 hover:text-[#000080] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Inquire</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    )}

        {/* Bottom Partnership Callout Bar */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-[#000080] to-blue-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-1 text-center sm:text-left relative z-10">
            <h4 className="text-lg sm:text-xl font-bold font-['Outfit'] text-white">
              Have a Project Idea or Want to Partner for an Outreach?
            </h4>
            <p className="text-xs sm:text-sm text-blue-100/90 font-normal">
              We collaborate with schools, clinics, corporate donors, and community leaders across Ghana.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3.5 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-black text-xs sm:text-sm rounded-full shrink-0 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2 cursor-pointer relative z-10"
          >
            <span>Propose a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
