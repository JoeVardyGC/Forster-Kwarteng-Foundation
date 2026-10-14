import React, { useState, useEffect } from 'react';
import type { PageId, Currency, ProgramArticle } from '../types';
import { PROGRAM_ARTICLES, OUR_PROGRAMS } from '../data/foundationData';
import {
  ArrowLeft,
  Clock,
  Check,
  Heart,
  Play,
  ChevronRight,
  ChevronLeft,
  X,
  Share2,
  Send,
  Bookmark,
} from 'lucide-react';

interface ProgramArticlePageProps {
  programId: string;
  onNavigate: (page: PageId) => void;
  onSelectProgram: (programId: string) => void;
  currency: Currency;
  onToggleCurrency: () => void;
  onOpenDonateModal: () => void;
}

export const ProgramArticlePage: React.FC<ProgramArticlePageProps> = ({
  programId,
  onNavigate,
  onSelectProgram,
  onOpenDonateModal,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Retrieve program article data or fallback to first
  const article: ProgramArticle =
    PROGRAM_ARTICLES[programId] || PROGRAM_ARTICLES['mental-health'];

  // Scroll tracking progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) {
        setScrollProgress(0);
        return;
      }
      const currentScroll = window.scrollY;
      setScrollProgress(Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [programId]);

  // Reset scroll to top when article changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [programId]);

  // Copy share link handler
  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleSaveToggle = () => {
    setIsSaved((prev) => !prev);
  };

  // Lightbox key controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex !== null) {
        if (e.key === 'Escape') setActiveLightboxIndex(null);
        if (e.key === 'ArrowRight') {
          setActiveLightboxIndex((prev) =>
            prev !== null ? (prev + 1) % article.gallery.length : null
          );
        }
        if (e.key === 'ArrowLeft') {
          setActiveLightboxIndex((prev) =>
            prev !== null
              ? (prev - 1 + article.gallery.length) % article.gallery.length
              : null
          );
        }
      }
      if (isVideoModalOpen && e.key === 'Escape') {
        setIsVideoModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, isVideoModalOpen, article.gallery.length]);

  // Related programs lookup (all other programs)
  const otherPrograms = OUR_PROGRAMS.filter((p) => p.id !== article.id);

  const getProgramCategoryTag = (id: string) => {
    switch (id) {
      case 'skills-training':
        return 'Vocational Skills';
      case 'capacity-building':
        return 'Capacity Building';
      case 'stem-tvet':
        return 'STEM & TVET';
      case 'community-outreach':
        return 'Community Relief';
      case 'mental-health':
        return 'Mental Health';
      default:
        return 'Active Initiative';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 pb-20 lg:pb-12">
      {/* 1. TOP STICKY READING PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-100 z-50">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-[#F5BD02] to-[#000080] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. NAVIGATION BAR */}
      {/* DESKTOP BREADCRUMBS (lg and above) */}
      <nav aria-label="Breadcrumb" className="hidden lg:block bg-white border-b border-slate-200 py-3.5 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#000080] font-medium transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => onNavigate('programs')}
              className="hover:text-[#000080] font-medium transition-colors cursor-pointer"
            >
              Our Projects
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-xs">
              {article.title}
            </span>
          </div>

          <button
            onClick={() => onNavigate('programs')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#000080] hover:text-blue-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full transition-all shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Our Projects</span>
          </button>
        </div>
      </nav>

      {/* MOBILE TOP FLOATING BAR (Directly matching mobile inspo image) */}
      <div className="lg:hidden px-4 py-3 flex items-center justify-between">
        {/* Circular Back Button from inspo */}
        <button
          onClick={() => onNavigate('programs')}
          className="w-10 h-10 rounded-full bg-white shadow-md border border-slate-200/80 flex items-center justify-center text-slate-700 hover:text-[#000080] active:scale-95 transition-all cursor-pointer"
          aria-label="Back to projects"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Center Category Badge */}
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#000080] bg-blue-50/90 px-3 py-1 rounded-full border border-blue-200/60 shadow-2xs">
          Our Projects
        </span>

        {/* Circular Share Button from inspo */}
        <button
          onClick={handleCopyLink}
          className="w-10 h-10 rounded-full bg-white shadow-md border border-slate-200/80 flex items-center justify-center text-slate-700 hover:text-[#000080] active:scale-95 transition-all cursor-pointer"
          aria-label="Share story"
        >
          {copiedLink ? (
            <Check className="w-4 h-4 text-emerald-600" />
          ) : (
            <Share2 className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* 3. MAIN EDITORIAL CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-6 lg:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: PRIMARY ARTICLE DETAILS (lg:col-span-8)      */}
          {/* ========================================================= */}
          <div className="lg:col-span-8 space-y-4">
            {/* Top Heading outside card matching Desktop Inspo */}
            <div className="hidden lg:flex items-center justify-between pb-1">
              <h2 className="text-2xl font-extrabold font-['Outfit'] text-slate-900 tracking-tight">
                Our Projects
              </h2>
            </div>

            <main className="bg-white rounded-3xl p-4 sm:p-7 lg:p-9 border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
              {/* Featured Hero Cover Image (With Rounded Corners directly from Inspo) */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] bg-slate-900 shadow-sm group mb-5">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Caption Overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium flex items-center justify-between gap-3">
                  <span className="drop-shadow-md bg-black/55 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/10 truncate text-[11px] sm:text-xs">
                    📸 {article.coverImageCaption}
                  </span>
                  <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider text-amber-300 font-bold bg-[#000080]/90 px-2 py-0.5 rounded">
                    Field Photo
                  </span>
                </div>
              </div>

              {/* Meta Row: Category Pill (Blue) */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 pb-3">
                <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-extrabold uppercase tracking-wider bg-blue-50 text-[#000080] border border-blue-200/80 shadow-2xs">
                  {article.category}
                </span>
              </div>

              {/* Main Headline & Action Buttons Row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mt-2 mb-4">
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-['Outfit'] text-slate-900 tracking-tight leading-snug sm:leading-tight flex-1">
                  {article.title}
                </h1>

                {/* Desktop Action Buttons: Save & Share stacked pills next to title */}
                <div className="hidden sm:flex flex-col items-end gap-2 shrink-0 pt-1">
                  <button
                    onClick={handleSaveToggle}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-300 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-all shadow-2xs cursor-pointer whitespace-nowrap"
                    title="Save / Bookmark article"
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        isSaved ? 'text-amber-500 fill-amber-500' : 'text-slate-600'
                      }`}
                    />
                    <span>{isSaved ? 'Saved to pocket' : 'Save to pocket'}</span>
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-xs font-bold text-[#000080] hover:bg-blue-100 transition-all shadow-2xs cursor-pointer whitespace-nowrap"
                    title="Share program story"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-[#000080]" />
                        <span>Share on media</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Post Meta Row: Date, Location, Reading Time */}
              <div className="flex items-center justify-between py-3 my-4 border-y border-slate-100 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">{article.publishedDate}</span>
                  {article.location && (
                    <>
                      <span>•</span>
                      <span>{article.location}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              {/* Editorial Summary / Lead Paragraph */}
              <div className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal mb-8 pb-6 border-b border-slate-100">
                {article.summary}
              </div>

              {/* Main Narrative Content Sections */}
              <div className="space-y-10 sm:space-y-12">
                {/* 1. The Grassroots Challenge */}
                <section id="challenge" className="space-y-3 sm:space-y-4">
                  <h2 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-slate-900 leading-tight">
                    {article.challenge.headline}
                  </h2>
                  <div className="space-y-3 text-xs sm:text-base text-slate-600 leading-relaxed">
                    {article.challenge.body.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Stat Highlight Card */}
                  {article.challenge.statHighlight && (
                    <div className="bg-amber-50/70 border-l-4 border-amber-500 p-3.5 sm:p-4 rounded-r-xl flex items-start gap-3 mt-4">
                      <div className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-amber-800 whitespace-nowrap">
                        {article.challenge.statHighlight.number}
                      </div>
                      <div className="text-xs text-amber-900/90 leading-relaxed pt-0.5">
                        {article.challenge.statHighlight.text}
                      </div>
                    </div>
                  )}
                </section>

                {/* 2. Field Video Showcase */}
                <section id="video" className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 sm:w-6 h-1 bg-[#000080] rounded-full" />
                    <span className="text-[11px] sm:text-xs font-bold text-[#000080] uppercase tracking-widest">
                      Field Video Showcase
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-slate-900 leading-tight">
                    {article.video.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {article.video.description}
                  </p>

                  {/* Video Player Card */}
                  <div
                    onClick={() => setIsVideoModalOpen(true)}
                    className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-[16/9] group cursor-pointer bg-slate-900"
                  >
                    <img
                      src={article.video.thumbnail}
                      alt={article.video.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#F5BD02] text-[#000080] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5 sm:ml-1" />
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3. Field Images Gallery */}
                {article.gallery && article.gallery.length > 0 && (
                  <section id="gallery" className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-5 sm:w-6 h-1 bg-[#000080] rounded-full" />
                      <span className="text-[11px] sm:text-xs font-bold text-[#000080] uppercase tracking-widest">
                        Field Images
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-slate-900 leading-tight">
                      Outreach Photo Documentation
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Visual records from our community workshops, mentorship summits, and direct distributions.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {article.gallery.map((img, idx) => (
                        <figure
                          key={idx}
                          onClick={() => setActiveLightboxIndex(idx)}
                          className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-slate-900 group cursor-pointer hover:shadow-md transition-all flex flex-col justify-between"
                        >
                          <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                            <img
                              src={img.url}
                              alt={img.caption}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-full font-medium">
                                View Full Size ↗
                              </span>
                            </div>
                          </div>
                          <figcaption className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                            📸 {img.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </section>
                )}

                {/* 4. Direct Frontline Giving Callout (In article) */}
                <div className="pt-6 border-t border-slate-100 text-center">
                  <button
                    onClick={onOpenDonateModal}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-black text-sm rounded-full shadow-lg hover:shadow-xl hover:scale-102 transition-all cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-[#000080]" />
                    <span>Support {article.title}</span>
                  </button>
                </div>
              </div>
            </main>

            {/* MOBILE ONLY: RELATED PROJECTS STACK (Appears under article on mobile) */}
            <div className="lg:hidden mt-8 space-y-4">
              <div className="flex items-center justify-between pb-1 px-1">
                <h3 className="text-xl font-extrabold font-['Outfit'] text-slate-900 tracking-tight">
                  Related Projects
                </h3>
                <button
                  onClick={() => onNavigate('programs')}
                  className="text-xs font-semibold text-slate-500 hover:text-[#000080] transition-colors cursor-pointer"
                >
                  See all →
                </button>
              </div>

              <div className="space-y-3.5">
                {otherPrograms.map((prog) => (
                  <div
                    key={prog.id}
                    onClick={() => onSelectProgram(prog.id)}
                    className="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-xs hover:shadow-md transition-all active:scale-98 group cursor-pointer flex gap-3.5 items-center"
                  >
                    {/* Compact Thumbnail on mobile */}
                    <div className="relative w-24 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={prog.image}
                        alt={prog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Metadata & Title */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="font-extrabold uppercase tracking-wider text-[#000080] bg-blue-50/90 px-2 py-0.5 rounded-full border border-blue-200/70">
                          {getProgramCategoryTag(prog.id)}
                        </span>
                        <span className="text-slate-400 font-medium flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5 text-slate-400" />
                          <span>4 min</span>
                        </span>
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm font-['Outfit'] text-slate-900 group-hover:text-[#000080] transition-colors line-clamp-2 leading-snug">
                        {prog.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: RELATED PROGRAMS SIDEBAR (lg:col-span-4)    */}
          {/* ========================================================= */}
          <aside className="hidden lg:block lg:col-span-4 space-y-4 lg:sticky lg:top-24">
            {/* Header: Related Projects + See All Link (Directly from Desktop Inspo) */}
            <div className="flex items-center justify-between pb-1">
              <h3 className="text-2xl font-extrabold font-['Outfit'] text-slate-900 tracking-tight">
                Related Projects
              </h3>
              <button
                onClick={() => onNavigate('programs')}
                className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-[#000080] transition-colors cursor-pointer"
              >
                See all →
              </button>
            </div>

            {/* Vertical Stack of Program Cards (Directly matching Desktop Inspo) */}
            <div className="space-y-4">
              {otherPrograms.map((prog) => (
                <div
                  key={prog.id}
                  onClick={() => onSelectProgram(prog.id)}
                  className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-xs hover:shadow-lg hover:border-[#000080]/30 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col"
                >
                  {/* Thumbnail Image Banner */}
                  <div className="relative h-44 sm:h-48 rounded-xl overflow-hidden bg-slate-100 mb-3.5">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Meta Tag & Metric */}
                  <div className="px-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-2">
                        <span className="font-extrabold uppercase tracking-wider text-[#000080] bg-blue-50/90 px-2.5 py-0.5 rounded-full border border-blue-200/70">
                          {getProgramCategoryTag(prog.id)}
                        </span>
                        <span className="text-slate-400 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>4 min</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="font-bold text-sm sm:text-base font-['Outfit'] text-slate-900 group-hover:text-[#000080] transition-colors line-clamp-2 leading-snug mb-1.5">
                        {prog.title}
                      </h4>

                      {/* Brief description */}
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {prog.description}
                      </p>
                    </div>

                    {/* Bottom quick arrow */}
                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#000080] group-hover:text-[#0a0a85]">
                      <span>Read Full Report</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Sticky Support Card */}
            <div className="bg-gradient-to-br from-[#000080] to-[#0a0a85] text-white p-6 rounded-2xl shadow-md space-y-3">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                Direct Grassroots Action
              </span>
              <h4 className="text-base font-bold font-['Outfit']">
                Help Us Expand These Projects Across Ghana
              </h4>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                Your monthly gift funds school kits, vocational toolkits, and community health screenings.
              </p>
              <button
                onClick={onOpenDonateModal}
                className="w-full py-2.5 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-bold text-xs rounded-full shadow transition-all cursor-pointer"
              >
                Donate to FKF Today
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* 4. MOBILE FLOATING ACTION CAPSULE (Directly inspired by bottom pill in mobile inspo) */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 max-w-md mx-auto">
        <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.12)] p-1.5 pl-4 flex items-center justify-between gap-3">
          <div
            onClick={onOpenDonateModal}
            className="flex-1 text-xs text-slate-500 font-medium truncate cursor-pointer hover:text-slate-700"
          >
            Support this initiative or leave a gift...
          </div>

          <button
            onClick={onOpenDonateModal}
            className="w-9 h-9 rounded-full bg-[#000080] hover:bg-[#0a0a85] text-[#F5BD02] flex items-center justify-center shadow-md active:scale-95 transition-all shrink-0 cursor-pointer"
            title="Support project"
            aria-label="Support project"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5. LIGHTBOX MODAL */}
      {activeLightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6"
        >
          {/* Top Bar */}
          <div className="w-full max-w-5xl flex items-center justify-between text-white text-xs sm:text-sm">
            <span>
              Photo {activeLightboxIndex + 1} of {article.gallery.length}
            </span>
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Image Stage */}
          <div className="relative max-w-4xl max-h-[75vh] flex items-center justify-center my-auto">
            <img
              src={article.gallery[activeLightboxIndex].url}
              alt={article.gallery[activeLightboxIndex].caption}
              className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl"
            />

            {/* Left Button */}
            <button
              onClick={() =>
                setActiveLightboxIndex(
                  (activeLightboxIndex - 1 + article.gallery.length) %
                    article.gallery.length
                )
              }
              className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
              title="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Button */}
            <button
              onClick={() =>
                setActiveLightboxIndex(
                  (activeLightboxIndex + 1) % article.gallery.length
                )
              }
              className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
              title="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Caption */}
          <div className="w-full max-w-3xl text-center text-white/90 text-xs sm:text-sm bg-black/50 px-4 py-2 rounded-lg">
            {article.gallery[activeLightboxIndex].caption}
          </div>
        </div>
      )}

      {/* 6. VIDEO PREVIEW MODAL */}
      {isVideoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Video preview modal"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div className="relative w-full max-w-3xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <div className="p-4 bg-slate-950 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-xs sm:text-sm font-bold truncate max-w-md">
                  {article.video.title}
                </span>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mock Player Screen */}
            <div className="relative aspect-[16/9] bg-black flex flex-col items-center justify-center p-6 text-center text-white">
              <img
                src={article.video.thumbnail}
                alt={article.video.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div className="relative z-10 space-y-4 max-w-md">
                <div className="w-16 h-16 rounded-full bg-amber-400 text-[#000080] flex items-center justify-center mx-auto shadow-xl">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <h4 className="text-lg font-bold font-['Outfit']">
                  {article.video.title}
                </h4>
                <p className="text-xs text-slate-300">
                  {article.video.description}
                </p>
                <div className="inline-block bg-white/10 backdrop-blur-xs text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
                  Documentary Length: {article.video.duration}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
              <span>Forster Kwarteng Foundation Outreach Archives</span>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
              >
                Close Player
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
