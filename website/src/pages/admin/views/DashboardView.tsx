import React from 'react';
import { useData } from '../../../context/DataContext';
import {
  FolderKanban,
  Calendar,
  Image as ImageIcon,
  Mail,
  Users,
  ArrowRight,
  Plus,
  CheckCircle2,
  ExternalLink,
  Phone,
  ShieldCheck,
} from 'lucide-react';

interface DashboardViewProps {
  onSelectTab: (tab: string) => void;
  onOpenCreateProject?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onSelectTab }) => {
  const {
    programs,
    upcomingEvents,
    heroSlides,
    contactMessages,
    volunteerSubmissions,
    foundationInfo,
  } = useData();

  const newMessagesCount = contactMessages.filter((m) => m.status === 'new').length;
  const newVolunteersCount = volunteerSubmissions.filter((v) => v.status === 'new').length;
  const featuredEvent = upcomingEvents.find((e) => e.status === 'Featured') || upcomingEvents[0];

  return (
    <div className="space-y-8">
      {/* 1. WELCOME BANNER (Blue background showcasing White-Gold logo) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#000080] via-[#00006a] to-[#000052] p-8 sm:p-10 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] tracking-tight">
              Welcome to the Foundation Admin Console
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Manage your homepage scrolling images, publish field projects, attach or remove media galleries and videos, and track upcoming community outreaches.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectTab('carousel')}
                className="px-5 py-2.5 rounded-full bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Change Carousel Images</span>
              </button>
              <button
                onClick={() => onSelectTab('projects')}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/25 transition-all cursor-pointer flex items-center gap-2"
              >
                <FolderKanban className="w-4 h-4" />
                <span>Manage Projects</span>
              </button>
            </div>
          </div>

          {/* Official White & Gold Logo on Blue Background */}
          <div className="hidden lg:flex flex-col items-center justify-center shrink-0 p-5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-xs max-w-xs text-center shadow-inner">
            <img
              src="/assets/fkf-logo-white-gold.png"
              alt="Forster Kwarteng Foundation"
              className="h-14 w-auto object-contain drop-shadow-md"
            />
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest mt-2.5">
              Official Foundation Console
            </span>
          </div>
        </div>

        {/* Ambient glow in corner */}
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          onClick={() => onSelectTab('carousel')}
          className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#000080]/30 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#000080] flex items-center justify-center group-hover:scale-105 transition-transform">
              <ImageIcon className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
              Homepage
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold font-['Outfit'] text-slate-900">
              {heroSlides.length}
            </div>
            <div className="text-xs font-bold text-slate-600 mt-1">
              Hero Carousel Slides
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Controls main scrolling images & headlines
            </p>
          </div>
        </div>

        <div
          onClick={() => onSelectTab('projects')}
          className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#000080]/30 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FolderKanban className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Published
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold font-['Outfit'] text-slate-900">
              {programs.length}
            </div>
            <div className="text-xs font-bold text-slate-600 mt-1">
              Active Community Projects
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Click to edit stories, galleries & delete
            </p>
          </div>
        </div>

        <div
          onClick={() => onSelectTab('events')}
          className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#000080]/30 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
              Schedule
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold font-['Outfit'] text-slate-900">
              {upcomingEvents.length}
            </div>
            <div className="text-xs font-bold text-slate-600 mt-1">
              Upcoming Field Events
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Powers calendar & countdown timer
            </p>
          </div>
        </div>

        <div
          onClick={() => onSelectTab('inbox')}
          className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#000080]/30 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
              {newMessagesCount + newVolunteersCount} New
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold font-['Outfit'] text-slate-900">
              {contactMessages.length + volunteerSubmissions.length}
            </div>
            <div className="text-xs font-bold text-slate-600 mt-1">
              Inquiries & Volunteers
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {newMessagesCount} contact messages, {newVolunteersCount} volunteers
            </p>
          </div>
        </div>
      </div>

      {/* 3. RECENT FIELD INITIATIVES & LIVE COUNTDOWN SPOTLIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Projects Overview */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold font-['Outfit'] text-slate-900">
                Active Projects on Website
              </h3>
              <p className="text-xs text-slate-500">
                These articles are currently live in the "Our Projects" catalog.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('projects')}
              className="text-xs font-bold text-[#000080] hover:text-amber-600 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {programs.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {p.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate">
                      {p.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectTab('projects')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#000080] hover:bg-blue-50 transition-colors shrink-0 cursor-pointer"
                >
                  Edit / Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Featured Countdown Spotlight & Official Lines */}
        <div className="lg:col-span-5 space-y-6">
          {/* Featured Countdown */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#000080] block font-mono">
              FEATURED COUNTDOWN
            </span>
            {featuredEvent ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-500">
                    Active Countdown Target:
                  </span>
                </div>
                <h4 className="text-base font-bold font-['Outfit'] text-slate-900">
                  {featuredEvent.title}
                </h4>
                <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{featuredEvent.formattedDate}</span>
                  </div>
                  <div>Location: <strong>{featuredEvent.location}</strong></div>
                  <div>Target: <strong>{featuredEvent.highlightMetric?.value || 'Community Outreaches'}</strong></div>
                </div>
                <button
                  onClick={() => onSelectTab('events')}
                  className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#000080] font-bold text-xs transition-colors cursor-pointer"
                >
                  Change Featured Event
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-500">No events currently scheduled.</p>
            )}
          </div>

          {/* Quick Settings Snapshot */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Official MoMo Numbers</span>
              <button
                onClick={() => onSelectTab('settings')}
                className="text-xs font-bold text-[#000080] hover:underline cursor-pointer"
              >
                Edit
              </button>
            </div>
            <div className="space-y-2 text-xs font-medium text-slate-600">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span>MTN MoMo:</span>
                <strong className="text-slate-900 font-mono">054 673 2812</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span>Telecel Cash:</span>
                <strong className="text-slate-900 font-mono">055 672 7083</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
