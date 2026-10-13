import React from 'react';
import type { PageId } from '../types';
import { FOUNDATION_INFO, CORE_VALUES } from '../data/foundationData';
import { Phone, Mail, MapPin, Heart, ArrowUp, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenDonateModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDonateModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-[#00003b] via-[#000033] to-[#000026] text-white pt-16 pb-8 border-t border-blue-900/60 relative overflow-hidden">
      {/* Decorative Brand Ambient Glowing Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Frosted Glass Newsletter & Trust Capsule */}
        <div className="relative bg-white/[0.06] backdrop-blur-xl rounded-3xl p-8 sm:p-10 mb-16 border border-white/15 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Internal Ambient Light Highlights */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl text-center lg:text-left relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-400/15 text-amber-300 border border-amber-400/30 mb-3 backdrop-blur-md shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              100% Transparent Non-Profit Governance
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-white tracking-tight">
              Stay Connected with Our Field Outreaches
            </h3>
            <p className="text-sm text-blue-100/80 mt-2 leading-relaxed">
              Receive quarterly impact bulletins, scholarship updates, and field reports directly from Accra, Ghana.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing to the Forster Kwarteng Foundation newsletter!');
            }}
            className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 max-w-md relative z-10"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="px-5 py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-blue-200/60 text-sm focus:outline-none focus:border-amber-400 focus:bg-white/15 transition-all shadow-inner flex-1 min-w-[240px]"
            />
            <button
              type="submit"
              className="px-7 py-3.5 rounded-full bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-extrabold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* 2. Main Footer Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          {/* Column 1: Brand Identity & Mission (4 Columns) */}
          <div className="lg:col-span-4 space-y-5">
            <div>
              <img
                src="/assets/foster logo main white gold.png"
                alt="Forster Kwarteng Foundation — Empowering Lives, Building Futures"
                className="h-14 sm:h-16 w-auto object-contain -ml-1"
              />
            </div>

            <p className="text-sm text-blue-100/80 leading-relaxed max-w-sm">
              {FOUNDATION_INFO.brandStatement}
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-blue-200/90 backdrop-blur-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Reg: {FOUNDATION_INFO.registrationNo}</span>
              </div>
              <button
                onClick={onOpenDonateModal}
                className="inline-flex items-center gap-2 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-bold text-xs px-4 py-2 rounded-full transition-all shadow-md cursor-pointer hover:scale-105"
              >
                <Heart className="w-3.5 h-3.5 fill-[#000080]" />
                <span>Support Programs</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 Columns) */}
          <div className="lg:col-span-2">
            <h5 className="text-xs font-bold font-['Outfit'] text-amber-400 uppercase tracking-widest mb-4">
              Explore
            </h5>
            <ul className="space-y-2.5 text-sm text-blue-100/80">
              {[
                { label: 'Home', page: 'home' },
                { label: 'About Us & Vision', page: 'about' },
                { label: 'Our 4 Core Pillars', page: 'programs' },
                { label: 'Impact & Real Stories', page: 'impact' },
                { label: 'Financial Transparency', page: 'transparency' },
                { label: 'Volunteer & Partner', page: 'get-involved' },
                { label: 'Contact & Hotlines', page: 'contact' },
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNav(link.page as PageId)}
                    className="hover:text-amber-300 hover:translate-x-1 transition-all text-left block cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: 7 Guiding Values (3 Columns) */}
          <div className="lg:col-span-3">
            <h5 className="text-xs font-bold font-['Outfit'] text-amber-400 uppercase tracking-widest mb-4">
              Our 7 Core Values
            </h5>
            <div className="space-y-2.5">
              {CORE_VALUES.map((val) => (
                <div key={val.id} className="flex items-center gap-2 text-xs text-blue-100/85">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span className="font-bold text-white">{val.name}</span>
                  <span className="text-blue-300/70 text-[11px]">— {val.tagline}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Physical Headquarters & Reach (3 Columns) */}
          <div className="lg:col-span-3">
            <h5 className="text-xs font-bold font-['Outfit'] text-amber-400 uppercase tracking-widest mb-4">
              Headquarters
            </h5>
            <div className="space-y-4 text-xs text-blue-100/90">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 text-amber-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold text-white mb-0.5">Physical Secretariat</span>
                  <span className="text-blue-200/80 leading-relaxed block">{FOUNDATION_INFO.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 text-amber-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold text-white mb-0.5">Direct Hotlines</span>
                  <div className="space-y-0.5">
                    <a
                      href="tel:+233546732812"
                      className="block text-blue-200/80 hover:text-amber-300 transition-colors"
                    >
                      +233 546732812
                    </a>
                    <a
                      href="tel:+233556727083"
                      className="block text-blue-200/80 hover:text-amber-300 transition-colors"
                    >
                      +233 556727083
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 text-amber-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block font-bold text-white mb-0.5">Official Correspondence</span>
                  <a
                    href={`mailto:${FOUNDATION_INFO.email}`}
                    className="text-blue-200/80 hover:text-amber-300 transition-colors block truncate"
                    title={FOUNDATION_INFO.email}
                  >
                    {FOUNDATION_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Sub-Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200/70">
          <p>
            © {new Date().getFullYear()} {FOUNDATION_INFO.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-amber-300/80 font-medium hidden sm:inline-block">
              Accra, Ghana
            </span>
            <span className="hidden sm:inline-block">•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer group font-semibold"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Signature Stepped Letterhead Bar across bottom */}
      <div className="h-2 w-full fkf-step-bar mt-8"></div>
    </footer>
  );
};
