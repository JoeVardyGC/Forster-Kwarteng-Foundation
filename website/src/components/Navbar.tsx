import React, { useState, useEffect } from 'react';
import type { PageId } from '../types';
import { Heart, Menu, X, ChevronRight } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenDonateModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenDonateModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'programs', label: 'Programs' },
    { id: 'impact', label: 'Impact' },
    { id: 'get-involved', label: 'Get Involved' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (page: PageId) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Main Sticky Navbar (Frosted Glass UI inspired by Save The Coin) */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,128,0.06)] border-b border-slate-200/80 py-2.5'
            : 'bg-white/80 backdrop-blur-lg border-b border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo - Sleek, Balanced & Sharp */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center text-left focus:outline-none group cursor-pointer py-0.5"
            aria-label="Forster Kwarteng Foundation Home"
          >
            <img
              src="/assets/fkf-logo-horizontal.png"
              alt="Forster Kwarteng Foundation — Empowering Lives, Building Futures"
              className="h-10 sm:h-11 md:h-12 w-auto max-w-[200px] sm:max-w-[240px] md:max-w-[260px] object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </button>

          {/* Desktop Navigation Links (Frosted Glass Capsule Track) */}
          <nav className="hidden lg:flex items-center p-1 rounded-full bg-slate-100/75 backdrop-blur-md border border-slate-200/70 shadow-2xs">
            {navLinks.map((link) => {
              const isActive =
                currentPage === link.id ||
                (link.id === 'programs' && currentPage === 'program-article');
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#000080] shadow-sm border border-slate-200/80 font-black scale-[1.02]'
                      : 'text-slate-600 hover:text-[#000080] hover:bg-white/50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Actions (Glassy Pill Button) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenDonateModal}
              className="flex items-center gap-2 bg-gradient-to-r from-[#F5BD02] to-[#e5ae00] hover:from-[#e5ae00] hover:to-[#d49e00] text-[#000080] font-black text-sm px-6 py-2.5 rounded-full shadow-md shadow-amber-500/25 border border-amber-300/70 hover:shadow-xl hover:shadow-amber-500/35 transition-all duration-300 hover:scale-105 active:scale-100 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-[#000080]" />
              <span>Donate Now</span>
            </button>
          </div>

          {/* Mobile Action & Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenDonateModal}
              className="flex items-center gap-1.5 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] text-xs font-black px-4 py-2 rounded-full shadow-sm cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-[#000080]" />
              <span>Donate</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#000080] hover:bg-slate-100 rounded-xl focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <img
                src="/assets/fkf-logo-horizontal.png"
                alt="Forster Kwarteng Foundation"
                className="h-12 w-auto max-w-[200px] object-contain"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav list */}
            <div className="flex-1 py-4 space-y-1">
              {navLinks.map((link) => {
                const isActive =
                  currentPage === link.id ||
                  (link.id === 'programs' && currentPage === 'program-article');
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 text-[#000080] font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                );
              })}
            </div>

            {/* Mobile Drawer Bottom Info */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenDonateModal();
                }}
                className="w-full py-3 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-bold text-center rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-[#000080]" />
                <span>Make a Donation</span>
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-500">Accra, Ghana</p>
                <p className="text-xs font-semibold text-slate-700 mt-1">
                  +233 546732812 / +233 556727083
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
