import React, { useState } from 'react';
import type { PageId, Currency } from '../types';
import { FOUNDATION_INFO } from '../data/foundationData';
import {
  Heart,
  ShieldCheck,
  Smartphone,
  Building2,
  Copy,
  Check,
  MessageCircle,
  ExternalLink,
  PhoneCall,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Users,
} from 'lucide-react';

interface DonatePageProps {
  currency: Currency;
  onToggleCurrency: () => void;
  onNavigate?: (page: PageId) => void;
}

export const DonatePage: React.FC<DonatePageProps> = ({
  currency,
  onToggleCurrency,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'momo' | 'bank'>('momo');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {
        fallbackCopyTextToClipboard(text);
      });
    } else {
      fallbackCopyTextToClipboard(text);
    }
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback copy error:', err);
    }
    document.body.removeChild(textArea);
  };

  const momoAccounts = [
    {
      network: 'MTN Mobile Money',
      badge: 'MTN MoMo',
      badgeColor: 'bg-[#FFCB05] text-slate-950 border border-amber-400',
      logo: '/assets/mtn_momo_logo.svg',
      number: '0546732812',
      formatted: '054 673 2812',
      accountName: 'Forster Kwarteng Foundation',
      isPrimary: true,
    },
    {
      network: 'MTN & Telecel Cash',
      badge: 'Telecel / MTN',
      badgeColor: 'bg-red-500 text-white',
      logo: null,
      number: '0556727083',
      formatted: '055 672 7083',
      accountName: 'Forster Kwarteng Foundation',
      isPrimary: false,
    },
  ];

  const bankDetails = {
    bankName: 'GCB Bank PLC / Ecobank Ghana',
    accountName: 'Forster Kwarteng Foundation',
    accountNumber: '1041009823420',
    branch: 'High Street Branch, Accra',
    swiftCode: 'GCBLGHAC',
    country: 'Ghana',
  };

  const whatsappMessage = encodeURIComponent(
    'Hello Forster Kwarteng Foundation, I have just made a donation to support your foundation programs! Please find my transaction confirmation here.'
  );

  return (
    <div className="space-y-0 bg-slate-50 min-h-screen">
      {/* 1. DONATE HERO SECTION */}
      <section className="bg-gradient-to-br from-[#000080] via-[#090979] to-[#0a0a85] text-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        {/* Soft Ambient Glow Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-300 shadow-sm">
            <Heart className="w-3.5 h-3.5 fill-amber-300" />
            <span>Direct Community Giving</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-['Outfit'] tracking-tight text-white leading-[1.12]">
            Invest in a Child’s Future Today
          </h1>

          <p className="text-sm sm:text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed font-normal">
            100% of your donation directly provides school uniforms, textbooks, educational scholarships, youth mentorship, and vocational starter kits across underserved communities in Ghana.
          </p>

          {/* Quick Trust Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-blue-200">
            <span className="inline-flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Official Registration: {FOUNDATION_INFO.registrationNo}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              100% Direct Impact
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Verified Ghanaian Non-Profit
            </span>
          </div>
        </div>

        {/* Stepped Accent Stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 fkf-step-bar" />
      </section>

      {/* 2. MAIN GIVING CHANNELS */}
      <section className="py-12 sm:py-16 -mt-8 relative z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden">
            {/* Card Header with Tab Switcher */}
            <div className="bg-[#000080] text-white p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300 block font-mono">
                    CHOOSE YOUR GIVING METHOD
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-white mt-1">
                    Direct Foundation Channels
                  </h2>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs text-blue-100 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 self-start sm:self-auto">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Immediate Mobile Confirmation</span>
                </div>
              </div>

              {/* Tab Selector */}
              <div className="mt-6 grid grid-cols-2 gap-2 p-1.5 bg-blue-950/60 rounded-2xl border border-white/15">
                <button
                  type="button"
                  onClick={() => setActiveTab('momo')}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'momo'
                      ? 'bg-[#F5BD02] text-[#000080] shadow-md scale-[1.01]'
                      : 'text-blue-100 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Mobile Money (MoMo)</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-900/40 text-amber-900 hidden sm:inline">
                    Easiest
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('bank')}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'bank'
                      ? 'bg-[#F5BD02] text-[#000080] shadow-md scale-[1.01]'
                      : 'text-blue-100 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Bank Transfer</span>
                </button>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 sm:p-10 space-y-8 bg-slate-50/50">
              {/* TAB 1: MOBILE MONEY */}
              {activeTab === 'momo' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] font-mono">
                      Official Mobile Money Accounts
                    </span>
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 text-xs flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Zero Platform Surcharges
                    </span>
                  </div>

                  {/* MoMo Account Cards */}
                  <div className="grid grid-cols-1 gap-4">
                    {momoAccounts.map((acc, index) => {
                      const isCopied = copiedField === `momo-${index}`;
                      return (
                        <div
                          key={index}
                          className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:border-[#000080]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${acc.badgeColor}`}
                              >
                                {acc.logo && (
                                  <img
                                    src={acc.logo}
                                    alt="MTN"
                                    className="h-3.5 w-auto rounded-xs object-contain"
                                  />
                                )}
                                <span>{acc.badge}</span>
                              </span>
                              <span className="text-xs text-slate-500 font-medium">
                                {acc.network}
                              </span>
                              {acc.isPrimary && (
                                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                  Primary
                                </span>
                              )}
                            </div>

                            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                              {acc.formatted}
                            </div>

                            <div className="text-xs text-slate-600 font-medium">
                              Account Name:{' '}
                              <span className="text-[#000080] font-bold">
                                {acc.accountName}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => copyToClipboard(acc.number, `momo-${index}`)}
                            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 ${
                              isCopied
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'bg-slate-100 hover:bg-[#000080] text-slate-800 hover:text-white border border-slate-200 hover:border-[#000080]'
                            }`}
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-4 h-4" />
                                <span>Copied Number!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                <span>Copy Number</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Step-by-Step Dialing Guide */}
                  <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-5 text-xs text-slate-700 space-y-2">
                    <div className="font-bold text-[#000080] flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#000080]" />
                      <span>Easy Steps to Complete Your Donation:</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-1.5 text-slate-600 pl-1 leading-relaxed">
                      <li>
                        Dial <strong className="text-slate-900 font-mono">*170#</strong> on your phone (or open your MTN/Telecel MoMo app).
                      </li>
                      <li>Select <strong>Transfer Money</strong> &gt; <strong>MoMo User</strong>.</li>
                      <li>Enter either official number: <strong className="text-slate-900 font-mono">054 673 2812</strong> or <strong className="text-slate-900 font-mono">055 672 7083</strong>.</li>
                      <li>Confirm the recipient name shows: <strong className="text-[#000080]">FORSTER KWARTENG FOUNDATION</strong>.</li>
                      <li>Enter Reference: <strong className="text-slate-900 font-mono">FKF DONATION</strong> or your name.</li>
                    </ol>
                  </div>

                  {/* Action Buttons: WhatsApp Confirmation */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/233546732812?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer hover:-translate-y-0.5"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Confirm on WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </a>

                    <a
                      href="tel:+233546732812"
                      className="py-3.5 px-6 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <PhoneCall className="w-4 h-4 text-[#000080]" />
                      <span>Call Foundation Secretariat</span>
                    </a>
                  </div>
                </div>
              )}

              {/* TAB 2: BANK TRANSFER */}
              {activeTab === 'bank' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] font-mono">
                      Official Corporate Bank Account
                    </span>
                    <span className="text-[#000080] font-semibold bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 text-xs">
                      Local & International Wire Deposits
                    </span>
                  </div>

                  {/* Bank Details Table */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                    <div className="space-y-3.5 text-xs sm:text-sm">
                      <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                        <span className="text-slate-500 font-medium">Bank Name</span>
                        <span className="font-bold text-slate-900 text-right">
                          {bankDetails.bankName}
                        </span>
                      </div>

                      <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                        <span className="text-slate-500 font-medium">Account Name</span>
                        <span className="font-bold text-[#000080] text-right">
                          {bankDetails.accountName}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <span className="text-slate-500 font-medium">Account Number</span>
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono font-black text-lg text-slate-900">
                            {bankDetails.accountNumber}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              copyToClipboard(bankDetails.accountNumber, 'bank-acc')
                            }
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                              copiedField === 'bank-acc'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                            title="Copy Account Number"
                          >
                            {copiedField === 'bank-acc' ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                        <span className="text-slate-500 font-medium">Branch</span>
                        <span className="font-medium text-slate-800 text-right">
                          {bankDetails.branch}
                        </span>
                      </div>

                      <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                        <span className="text-slate-500 font-medium">SWIFT / BIC Code</span>
                        <span className="font-mono font-bold text-slate-900 text-right">
                          {bankDetails.swiftCode}
                        </span>
                      </div>

                      <div className="flex items-start justify-between pt-1">
                        <span className="text-slate-500 font-medium">Country</span>
                        <span className="font-medium text-slate-800 text-right">
                          {bankDetails.country}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Wire Advice */}
                  <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-5 text-xs text-amber-900 space-y-1.5">
                    <p className="font-bold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>International & Corporate Wire Note:</span>
                    </p>
                    <p className="text-amber-800 leading-relaxed">
                      For corporate partnerships, grants, or wire transfers from abroad, please reference <strong>FKF CHARITY</strong>. Send a copy of your deposit slip to <strong className="text-slate-950 font-mono">info@forsterkwartengfoundation.org</strong> for immediate tax receipt issuance.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3. DONOR FAQ ACCORDION */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <h3 className="text-2xl font-extrabold font-['Outfit'] text-slate-900">
                Frequently Asked Giving Questions
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Transparent answers regarding your support and fund governance.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {[
                {
                  q: 'How does Mobile Money giving work in Ghana?',
                  a: 'You can transfer directly from your MTN MoMo or Telecel Cash wallet to our official lines (054 673 2812 / 055 672 7083). The recipient name will confirm FORSTER KWARTENG FOUNDATION before you approve with your PIN. No extra platform deductions are charged.',
                },
                {
                  q: 'Can international supporters donate via bank wire?',
                  a: 'Yes. Our GCB Bank / Ecobank corporate accounts accept SWIFT wire transfers from all international banks with full foreign exchange clearing under our official registration.',
                },
                {
                  q: 'How will I receive confirmation of my gift?',
                  a: 'After completing your transfer, simply click "Confirm on WhatsApp" or send your transaction SMS screenshot to info@forsterkwartengfoundation.org. An official acknowledgment and receipt will be issued to you promptly.',
                },
                {
                  q: 'Can I designate my donation to a specific initiative?',
                  a: 'Yes. You can indicate your target project (e.g. Basic Education, TVET Toolkits, Youth Mentorship, or Emergency Relief) in your payment reference or via WhatsApp message.',
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-2.5 font-bold text-sm text-[#000080] font-['Outfit']">
                    <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{faq.q}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6.5">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. EXPLORE PROGRAMS CTA */}
          {onNavigate && (
            <div className="bg-gradient-to-r from-[#000080] to-[#090979] text-white rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto border border-white/20">
                <Users className="w-6 h-6 text-amber-300" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-['Outfit']">
                Want to See Where Your Support Goes?
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
                Discover our 4 core pillars and read real beneficiary stories from students and young artisans empowered by our projects.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('programs')}
                className="px-6 py-3 rounded-full bg-white text-[#000080] hover:bg-amber-300 hover:text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                Explore All Projects
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
