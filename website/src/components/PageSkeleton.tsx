import React from 'react';

interface PageSkeletonProps {
  page?: string;
}

export const PageSkeleton: React.FC<PageSkeletonProps> = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800 animate-pulse select-none" aria-busy="true" aria-label="Loading page content...">
      {/* 1. TOP INDETERMINATE PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-100 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#000080] via-[#F5BD02] to-[#000080] w-full animate-[shimmer_1.5s_infinite] bg-[length:200%_100%]" />
      </div>

      {/* 2. NAVBAR SKELETON */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/70 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Placeholder */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-200" />
            <div className="space-y-1.5 hidden sm:block">
              <div className="w-36 h-3.5 bg-slate-200 rounded" />
              <div className="w-24 h-2 bg-slate-100 rounded" />
            </div>
          </div>

          {/* Nav Links Placeholders (Desktop) */}
          <div className="hidden md:flex items-center gap-7">
            <div className="w-12 h-3.5 bg-slate-200 rounded-full" />
            <div className="w-16 h-3.5 bg-slate-200 rounded-full" />
            <div className="w-16 h-3.5 bg-slate-200 rounded-full" />
            <div className="w-20 h-3.5 bg-slate-200 rounded-full" />
            <div className="w-14 h-3.5 bg-slate-200 rounded-full" />
          </div>

          {/* Right Action Button Placeholder */}
          <div className="flex items-center gap-3">
            <div className="w-28 h-10 rounded-full bg-amber-200/70" />
            <div className="w-9 h-9 rounded-lg bg-slate-200 md:hidden" />
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION SKELETON */}
      <section className="relative min-h-[560px] sm:min-h-[620px] bg-gradient-to-r from-[#00003d] via-[#000066] to-[#00004a] text-white flex items-center overflow-hidden">
        {/* Subtle ambient light */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-14 sm:pb-18 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Pillar Badge */}
              <div className="w-48 h-7 rounded-full bg-white/15" />

              {/* Bold Headline Skeleton */}
              <div className="space-y-3">
                <div className="w-5/6 h-10 sm:h-12 bg-white/25 rounded-xl" />
                <div className="w-3/5 h-10 sm:h-12 bg-amber-300/30 rounded-xl" />
              </div>

              {/* Description Skeleton */}
              <div className="space-y-2 pt-2 max-w-xl">
                <div className="w-full h-4 bg-white/20 rounded" />
                <div className="w-4/5 h-4 bg-white/20 rounded" />
                <div className="w-2/3 h-4 bg-white/15 rounded" />
              </div>

              {/* Action Buttons Skeleton */}
              <div className="pt-4 flex flex-wrap gap-4">
                <div className="w-44 h-13 rounded-full bg-[#F5BD02]/40" />
                <div className="w-44 h-13 rounded-full bg-white/20" />
              </div>
            </div>

            {/* Right Image Placeholder (Desktop) */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="w-full aspect-[4/3] rounded-3xl bg-white/10 border border-white/15 shadow-2xl relative overflow-hidden flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CARDS GRID SKELETON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
          <div className="w-28 h-5 rounded-full bg-slate-200 mx-auto" />
          <div className="w-3/4 h-8 rounded-xl bg-slate-200 mx-auto" />
          <div className="w-1/2 h-4 rounded bg-slate-100 mx-auto" />
        </div>

        {/* 4-Column Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-200" />
              <div className="w-3/4 h-5 rounded bg-slate-200" />
              <div className="space-y-2 pt-1">
                <div className="w-full h-3 rounded bg-slate-100" />
                <div className="w-5/6 h-3 rounded bg-slate-100" />
                <div className="w-2/3 h-3 rounded bg-slate-100" />
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="w-20 h-3 rounded bg-slate-200" />
                <div className="w-4 h-4 rounded-full bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
