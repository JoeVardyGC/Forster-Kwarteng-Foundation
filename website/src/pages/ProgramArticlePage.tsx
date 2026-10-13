import React, { useState, useEffect } from 'react';
import type { PageId, Currency, ProgramArticle } from '../types';
import { PROGRAM_ARTICLES, OUR_PROGRAMS } from '../data/foundationData';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Calendar,
  Check,
  Copy,
  Printer,
  Heart,
  Play,
  ChevronRight,
  ChevronLeft,
  X,
  Target,
  Quote,
  Users,
  ShieldCheck,
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
  currency,
  onToggleCurrency,
  onOpenDonateModal,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(1);

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

  // Related programs lookup
  const relatedPrograms = article.relatedProgramIds
    .map((id) => OUR_PROGRAMS.find((p) => p.id === id))
    .filter(Boolean);

  const selectedTier = article.donationTiers[selectedTierIndex] || article.donationTiers[0];

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* 1. TOP STICKY READING PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-100 z-50">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-[#F5BD02] to-[#000080] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. BREADCRUMBS & TOP BAR */}
      <nav aria-label="Breadcrumb" className="bg-slate-50 border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8">
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
              Programs
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {article.title}
            </span>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#000080] hover:text-blue-700 bg-white border border-slate-200 hover:border-blue-300 px-3 py-1.5 rounded-full transition-all shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Programs</span>
          </button>
        </div>
      </nav>

      {/* 3. EDITORIAL ARTICLE HEADER */}
      <header className="pt-8 pb-8 sm:pt-12 sm:pb-10 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Badge & Meta */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-50 text-[#000080] border border-blue-200">
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              {article.readTime}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {article.publishedDate}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              {article.location}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-slate-900 tracking-tight leading-tight sm:leading-tight mb-5">
            {article.title}
          </h1>

          {/* Lead / Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-normal mb-8">
            {article.summary}
          </p>

          {/* Utility Share / Print Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200/80">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
                Share story:
              </span>
              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `Read about ${article.title} at Forster Kwarteng Foundation: ` + window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 flex items-center justify-center transition-colors text-xs font-bold"
                title="Share on WhatsApp"
              >
                WA
              </a>
              {/* Twitter / X */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `Discover how @FKF_Ghana is making an impact through ${article.title}: ` + window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-sky-50 text-slate-600 hover:text-sky-600 flex items-center justify-center transition-colors text-xs font-bold"
                title="Share on X"
              >
                𝕏
              </a>
              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 flex items-center justify-center transition-colors text-xs font-bold"
                title="Share on LinkedIn"
              >
                in
              </a>
              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
                title="Copy link to clipboard"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              title="Print article"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* 4. HERO COVER IMAGE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 group">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-[320px] sm:h-[440px] lg:h-[500px] object-cover object-center group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

          {/* Quick Caption Overlay */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white text-xs sm:text-sm font-medium flex items-center justify-between gap-4">
            <span className="drop-shadow-md bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10">
              📸 {article.coverImageCaption}
            </span>
            <span className="hidden sm:inline-block text-[11px] uppercase tracking-wider text-amber-300 font-bold bg-[#000080]/80 px-2.5 py-1 rounded">
              Verified Field Photo
            </span>
          </div>
        </div>
      </section>

      {/* 5. IMPACT METRICS STRIP */}
      <section className="bg-slate-50 py-10 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Verified Frontline Data
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-['Outfit'] text-[#000080]">
              Key Impact Metrics at a Glance
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {article.impactStats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Outfit'] text-[#000080] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                    {stat.label}
                  </div>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mt-2 border-t border-slate-100 pt-2">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MAIN CONTENT & SIDEBAR */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* ARTICLE BODY (LEFT 8 COLUMNS) */}
          <article className="lg:col-span-8 space-y-12">
            {/* A. The Grassroots Challenge */}
            <section id="challenge" className="space-y-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-amber-500 rounded-full" />
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                  The Grassroots Reality
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-slate-900">
                {article.challenge.headline}
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                {article.challenge.body.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Stat Highlight Card */}
              {article.challenge.statHighlight && (
                <div className="bg-amber-50/70 border-l-4 border-amber-500 p-5 rounded-r-xl flex items-start gap-4 mt-6">
                  <div className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-amber-800 whitespace-nowrap">
                    {article.challenge.statHighlight.number}
                  </div>
                  <div className="text-xs sm:text-sm text-amber-900/90 leading-relaxed pt-1">
                    {article.challenge.statHighlight.text}
                  </div>
                </div>
              )}
            </section>

            {/* B. FKF's 3-Phase Intervention */}
            <section id="intervention" className="space-y-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-[#000080] rounded-full" />
                <span className="text-xs font-bold text-[#000080] uppercase tracking-widest">
                  Our Intervention Strategy
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-slate-900">
                {article.intervention.title}
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                {article.intervention.description}
              </p>

              {/* 3 Step Cards */}
              <div className="space-y-4 mt-6">
                {article.intervention.phases.map((phase) => (
                  <div
                    key={phase.phase}
                    className="p-5 sm:p-6 rounded-xl border border-slate-200 bg-white shadow-xs hover:border-blue-300 transition-all flex flex-col sm:flex-row items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#000080] text-amber-400 font-extrabold font-['Outfit'] text-lg flex items-center justify-center shrink-0 shadow-xs">
                      {phase.phase}
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold font-['Outfit'] text-slate-900 mb-1.5">
                        {phase.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* C. Beneficiary Spotlight Quote */}
            <section id="story" className="pt-4">
              <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#000080] to-[#0a0a85] text-white overflow-hidden shadow-lg">
                <Quote className="absolute top-4 right-4 w-20 h-20 text-white/10 pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
                    Beneficiary Voice & Turnaround
                  </span>

                  <blockquote className="text-base sm:text-xl font-medium leading-relaxed italic text-blue-50">
                    "{article.beneficiaryQuote.quote}"
                  </blockquote>

                  <div className="flex items-center gap-4 pt-4 border-t border-white/15">
                    <img
                      src={article.beneficiaryQuote.image}
                      alt={article.beneficiaryQuote.author}
                      className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shrink-0"
                    />
                    <div>
                      <div className="text-base font-bold text-white">
                        {article.beneficiaryQuote.author}
                      </div>
                      <div className="text-xs text-blue-200">
                        {article.beneficiaryQuote.role} • {article.beneficiaryQuote.location}
                      </div>
                      <div className="text-[11px] text-amber-300 font-semibold mt-1">
                        ✓ {article.beneficiaryQuote.outcome}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* D. Outreach Video Showcase */}
            <section id="video" className="space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-red-500 rounded-full" />
                <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
                  Field Video Showcase
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-slate-900">
                {article.video.title}
              </h2>
              <p className="text-sm text-slate-600">
                {article.video.description}
              </p>

              {/* Video Player Card */}
              <div
                onClick={() => setIsVideoModalOpen(true)}
                className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/9] group cursor-pointer bg-slate-900"
              >
                <img
                  src={article.video.thumbnail}
                  alt={article.video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-400 text-[#000080] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-xs text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <span>Watch Field Video</span>
                  <span className="text-amber-300">({article.video.duration})</span>
                </div>
              </div>
            </section>

            {/* E. Photo Gallery with Interactive Lightbox */}
            <section id="gallery" className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-1 bg-emerald-500 rounded-full" />
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                      Visual Evidence
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-slate-900 mt-1">
                    Field Photo Gallery
                  </h2>
                </div>
                <span className="text-xs text-slate-500">
                  Click any photo to enlarge
                </span>
              </div>

              {/* 4 Photo Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {article.gallery.map((item, gIdx) => (
                  <div
                    key={gIdx}
                    onClick={() => setActiveLightboxIndex(gIdx)}
                    className="group relative rounded-xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100 cursor-pointer shadow-xs hover:shadow-md transition-all"
                  >
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                      <p className="text-white text-xs font-medium line-clamp-2">
                        {item.caption}
                      </p>
                      <span className="text-[10px] text-amber-300 font-bold mt-1">
                        Click to view in high-resolution ↗
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* F. UN SDG Alignment */}
            <section className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#000080]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Global SDG Alignment
                </h3>
              </div>
              <p className="text-xs text-slate-600">
                This initiative directly advances the United Nations Sustainable Development Goals:
              </p>
              <div className="flex flex-wrap gap-2.5">
                {article.sdgBadges.map((sdg, sIdx) => (
                  <div
                    key={sIdx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-xs"
                    style={{ backgroundColor: sdg.color }}
                  >
                    <span>{sdg.number}:</span>
                    <span>{sdg.title}</span>
                  </div>
                ))}
              </div>
            </section>
          </article>

          {/* STICKY CONVERSION SIDEBAR (RIGHT 4 COLUMNS) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
            {/* SPONSOR THIS PROGRAM CARD */}
            <div className="bg-white rounded-2xl border-2 border-[#000080]/15 shadow-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-bl-full pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold text-[#000080] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  Support This Initiative
                </span>

                {/* Currency Switcher */}
                <button
                  onClick={onToggleCurrency}
                  className="px-2.5 py-1 rounded-md text-xs font-extrabold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-300"
                  title="Switch between Ghana Cedis and US Dollars"
                >
                  {currency === 'GHS' ? '₵ GHS' : '$ USD'} ⇄
                </button>
              </div>

              <h3 className="text-xl font-extrabold font-['Outfit'] text-slate-900 mb-1">
                Sponsor this Program
              </h3>
              <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                Directly power frontline outreaches, materials, and youth empowerment under {article.title}.
              </p>

              {/* Tiers List */}
              <div className="space-y-2.5 mb-5">
                {article.donationTiers.map((tier, tIdx) => {
                  const isSelected = selectedTierIndex === tIdx;
                  const amount = currency === 'GHS' ? `GH₵ ${tier.amountGHS}` : `$ ${tier.amountUSD}`;
                  return (
                    <button
                      key={tIdx}
                      onClick={() => setSelectedTierIndex(tIdx)}
                      className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 ${
                        isSelected
                          ? 'border-[#000080] bg-blue-50/70 shadow-xs ring-1 ring-[#000080]'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">
                          {tier.label}
                        </span>
                        <span className="text-xs font-extrabold text-[#000080] bg-white px-2 py-0.5 rounded border border-slate-200">
                          {amount}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        {tier.impact}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Selected Tier Summary & Action Button */}
              <button
                onClick={onOpenDonateModal}
                className="w-full py-3.5 px-4 rounded-xl bg-[#000080] hover:bg-blue-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Heart className="w-4 h-4 text-amber-400 fill-amber-400 group-hover:scale-110 transition-transform" />
                <span>
                  Donate {currency === 'GHS' ? `GH₵ ${selectedTier.amountGHS}` : `$ ${selectedTier.amountUSD}`} to This Program
                </span>
              </button>

              <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-slate-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Secure & Tax-Deductible in Ghana</span>
              </div>
            </div>

            {/* VOLUNTEER & PARTNER CARD */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Users className="w-4 h-4 text-amber-600" />
                <span>Join as a Mentor or Partner</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Are you an educator, mental health professional, artisan, or corporate organization? Volunteer your expertise.
              </p>
              <button
                onClick={() => onNavigate('get-involved')}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Apply to Volunteer / Partner</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            {/* TABLE OF CONTENTS QUICK NAV */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 hidden lg:block">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                On This Page
              </span>
              <ul className="space-y-1.5 text-xs font-medium text-slate-600">
                <li>
                  <a href="#challenge" className="hover:text-[#000080] transition-colors block py-0.5">
                    → The Grassroots Reality
                  </a>
                </li>
                <li>
                  <a href="#intervention" className="hover:text-[#000080] transition-colors block py-0.5">
                    → Our 3-Phase Strategy
                  </a>
                </li>
                <li>
                  <a href="#story" className="hover:text-[#000080] transition-colors block py-0.5">
                    → Beneficiary Voice
                  </a>
                </li>
                <li>
                  <a href="#video" className="hover:text-[#000080] transition-colors block py-0.5">
                    → Field Video Showcase
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-[#000080] transition-colors block py-0.5">
                    → Photo Gallery
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      {/* 7. RELATED PROGRAMS SECTION (CONTINUOUS EXPLORATION) */}
      <section className="bg-slate-50 py-16 lg:py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
                Explore More Initiatives
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-slate-900">
                Related FKF Programs
              </h2>
            </div>
            <button
              onClick={() => onNavigate('programs')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#000080] hover:text-blue-700 cursor-pointer"
            >
              <span>View all programs</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPrograms.map((prog) => {
              if (!prog) return null;
              return (
                <div
                  key={prog.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
                >
                  {/* Image Banner */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-lg font-bold font-['Outfit'] text-slate-900 group-hover:text-[#000080] transition-colors mb-2">
                        {prog.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 line-clamp-2">
                        {prog.description}
                      </p>
                    </div>

                    {/* Read More Action Button */}
                    <button
                      onClick={() => onSelectProgram(prog.id)}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 group-hover:text-[#000080] group-hover:gap-2.5 transition-all cursor-pointer self-start"
                    >
                      <span>Read More</span>
                      <ChevronRight className="w-4 h-4 text-blue-600 group-hover:text-[#000080] transition-colors" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
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

      {/* VIDEO PREVIEW MODAL */}
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
