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
    <footer className="bg-[#00003b] text-white pt-16 pb-8 border-t border-blue-900/60 relative overflow-hidden">
      {/* Decorative Brand Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Newsletter / Trust Strip */}
        <div className="bg-gradient-to-r from-[#000080] to-[#0a0a85] rounded-2xl p-6 sm:p-8 mb-14 shadow-xl border border-blue-700/40 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              100% Transparent Non-Profit Governance
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-white">
              Stay Connected with Our Field Outreaches
            </h3>
            <p className="text-sm text-blue-100 mt-1">
              Receive quarterly impact bulletins, scholarship updates, and field reports directly from Accra, Ghana.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing to the Forster Kwarteng Foundation newsletter!');
            }}
            className="w-full lg:w-auto flex flex-col sm:flex-row gap-2 max-w-md"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="px-4 py-3 rounded-xl bg-blue-950/80 border border-blue-600/60 text-white placeholder-blue-300 text-sm focus:outline-none focus:border-amber-400 flex-1 min-w-[240px]"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-bold text-sm transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-blue-900/60">
          {/* Column 1 & 2: Brand Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/foster logo main transparent.png"
                alt="Forster Kwarteng Foundation"
                className="h-14 w-auto object-contain bg-white/10 p-1.5 rounded-xl backdrop-blur-sm"
              />
              <div>
                <h4 className="font-bold text-base font-['Outfit'] tracking-tight text-white uppercase">
                  Forster Kwarteng Foundation
                </h4>
                <p className="text-xs text-amber-400 font-semibold tracking-wide">
                  Empowering Lives, Building Futures
                </p>
              </div>
            </div>

            <p className="text-sm text-blue-200 leading-relaxed max-w-md">
              {FOUNDATION_INFO.brandStatement}
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenDonateModal}
                className="inline-flex items-center gap-2 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-bold text-xs px-4 py-2 rounded-full transition-all shadow cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-[#000080]" />
                <span>Support Our Programs</span>
              </button>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h5 className="text-sm font-bold font-['Outfit'] text-amber-400 uppercase tracking-wider mb-4">
              Explore
            </h5>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  About Us & Vision
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('programs')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Our 4 Core Pillars
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('impact')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Impact & Real Stories
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('transparency')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Financial Transparency
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('get-involved')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Volunteer & Partner
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Contact & Hotlines
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: 7 Core Values */}
          <div>
            <h5 className="text-sm font-bold font-['Outfit'] text-amber-400 uppercase tracking-wider mb-4">
              Our 7 Values
            </h5>
            <ul className="space-y-1.5 text-xs text-blue-200">
              {CORE_VALUES.map((val) => (
                <li key={val.id} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{val.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Official Contact & Headquarters */}
          <div>
            <h5 className="text-sm font-bold font-['Outfit'] text-amber-400 uppercase tracking-wider mb-4">
              Headquarters
            </h5>
            <div className="space-y-3 text-xs text-blue-200">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{FOUNDATION_INFO.hqLocation}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <a
                    href="tel:+233546732812"
                    className="block hover:text-amber-300 transition-colors"
                  >
                    +233 546732812
                  </a>
                  <a
                    href="tel:+233556727083"
                    className="block hover:text-amber-300 transition-colors"
                  >
                    +233 556727083
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <a
                  href={`mailto:${FOUNDATION_INFO.email}`}
                  className="hover:text-amber-300 transition-colors break-all"
                >
                  {FOUNDATION_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Stepped Colors */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-300">
          <p>
            © {new Date().getFullYear()} {FOUNDATION_INFO.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span>Accra, Ghana</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Signature Stepped Letterhead Bar across bottom */}
      <div className="h-2 w-full fkf-step-bar mt-8"></div>
    </footer>
  );
};
