import React, { useState } from 'react';
import type { Currency } from '../types';
import { useData } from '../context/DataContext';
import { FOUNDATION_INFO } from '../data/foundationData';
import {
  X,
  Heart,
  Smartphone,
  Building2,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';
import { WhatsAppLogo } from './WhatsAppLogo';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency?: Currency;
  onToggleCurrency?: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'momo' | 'bank'>('momo');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

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

  const { foundationInfo, momoAccounts, bankAccounts } = useData();
  const primaryBank = bankAccounts.find((b) => b.isPrimary) || bankAccounts[0];

  const whatsappMessage = encodeURIComponent(
    'Hello Forster Kwarteng Foundation, I have just made a donation to support your foundation programs! Please find my transaction confirmation here.'
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/90 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Gold Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#000080] via-[#F5BD02] to-[#000080]" />

        {/* Modal Header */}
        <div className="bg-[#000080] text-white px-6 sm:px-8 pt-6 pb-7 relative overflow-hidden">
          {/* Subtle Ambient Orbs */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white p-1.5 shadow-md flex items-center justify-center shrink-0">
                <img
                  src="/assets/foster logo main white gold.png"
                  alt="Forster Kwarteng Foundation"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block font-mono">
                  DIRECT COMMUNITY GIVING
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-white">
                  Donate to FKF
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-blue-100/90 mt-3 leading-relaxed relative z-10 font-normal">
            100% of your gift directly equips vulnerable school children with uniforms and books, trains youth in TVET skills, and delivers sustainable community care.
          </p>

          {/* Clean Segmented Tab Switcher */}
          <div className="mt-5 grid grid-cols-2 gap-2 p-1.5 bg-blue-950/60 rounded-2xl border border-white/15 relative z-10">
            <button
              type="button"
              onClick={() => setActiveTab('momo')}
              className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'momo'
                  ? 'bg-[#F5BD02] text-[#000080] shadow-md scale-[1.02]'
                  : 'text-blue-100 hover:text-white hover:bg-white/5'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile Money</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-900/40 text-amber-900 hidden sm:inline">
                Instant
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('bank')}
              className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'bank'
                  ? 'bg-[#F5BD02] text-[#000080] shadow-md scale-[1.02]'
                  : 'text-blue-100 hover:text-white hover:bg-white/5'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Bank Transfer</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 bg-slate-50/60 space-y-6">
          {/* ========================================================= */}
          {/* TAB 1: MOBILE MONEY                                       */}
          {/* ========================================================= */}
          {activeTab === 'momo' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] font-mono">
                  Official Mobile Money Numbers
                </span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Zero Platform Fees
                </span>
              </div>

              {/* MoMo Accounts Cards */}
              <div className="space-y-3">
                {momoAccounts.map((acc, index) => {
                  const isCopied = copiedField === `momo-${index}`;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:border-[#000080]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
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
                        <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-slate-900">
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
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 ${
                          isCopied
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-100 hover:bg-[#000080] text-slate-700 hover:text-white border border-slate-200 hover:border-[#000080]'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Copied!</span>
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

              {/* How to Donate Instructions */}
              <div className="bg-blue-50/70 border border-blue-200/70 rounded-2xl p-4 text-xs text-slate-700 space-y-1.5">
                <div className="font-bold text-[#000080] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#000080]" />
                  <span>Quick Giving Steps:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1 leading-relaxed">
                  <li>Dial <strong className="text-slate-900 font-mono">*170#</strong> or open your MoMo App.</li>
                  <li>Transfer to any of the official numbers above.</li>
                  <li>Confirm the recipient name displays: <strong className="text-[#000080]">FORSTER KWARTENG FOUNDATION</strong>.</li>
                  <li>Use reference: <strong className="text-slate-900 font-mono">FKF DONATION</strong> or your name.</li>
                </ol>
              </div>

              {/* Action Buttons: WhatsApp Confirmation */}
              <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={`https://wa.me/233546732812?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <WhatsAppLogo className="w-4.5 h-4.5" />
                  <span>Confirm on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <a
                  href="tel:+233546732812"
                  className="py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-[#000080]" />
                  <span>Call Foundation</span>
                </a>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: BANK TRANSFER                                      */}
          {/* ========================================================= */}
          {activeTab === 'bank' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] font-mono">
                  Official Corporate Bank Account
                </span>
                <span className="text-[#000080] font-semibold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 text-[11px]">
                  Ghana & International Wires
                </span>
              </div>

              {/* Bank Account Details Cards */}
              <div className="space-y-3">
                {bankAccounts.map((bank, bIdx) => (
                  <div
                    key={bank.id || bIdx}
                    className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#000080]" />
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">{bank.bankName}</span>
                      </div>
                      {bank.isPrimary && (
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                          Primary
                        </span>
                      )}
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-start justify-between border-b border-slate-100 pb-2">
                        <span className="text-slate-500 font-medium">Account Name</span>
                        <span className="font-bold text-[#000080] text-right">
                          {bank.accountName}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-slate-500 font-medium">Account Number</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-sm sm:text-base text-slate-900">
                            {bank.accountNumber}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              copyToClipboard(bank.accountNumber, `bank-acc-${bIdx}`)
                            }
                            className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              copiedField === `bank-acc-${bIdx}`
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                            title="Copy Account Number"
                          >
                            {copiedField === `bank-acc-${bIdx}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-start justify-between border-b border-slate-100 pb-2">
                        <span className="text-slate-500 font-medium">Branch</span>
                        <span className="font-medium text-slate-800 text-right">
                          {bank.branch}
                        </span>
                      </div>

                      <div className="flex items-start justify-between">
                        <span className="text-slate-500 font-medium">Swift Code</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900">
                            {bank.swiftCode}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              copyToClipboard(bank.swiftCode, `bank-swift-${bIdx}`)
                            }
                            className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              copiedField === `bank-swift-${bIdx}`
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                            title="Copy Swift Code"
                          >
                            {copiedField === `bank-swift-${bIdx}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Copy All Bank Info Button */}
                    <button
                      type="button"
                      onClick={() => {
                        const slip = `Bank: ${bank.bankName}\nAccount Name: ${bank.accountName}\nAccount Number: ${bank.accountNumber}\nBranch: ${bank.branch}\nSwift: ${bank.swiftCode}`;
                        copyToClipboard(slip, `bank-all-${bIdx}`);
                      }}
                      className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        copiedField === `bank-all-${bIdx}`
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-100 hover:bg-[#000080] text-slate-700 hover:text-white border border-slate-200'
                      }`}
                    >
                      {copiedField === `bank-all-${bIdx}` ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>All Bank Details Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Full Bank Slip</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Bank Notice */}
              <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-4 text-xs text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Transfer Notice:</span>
                </p>
                <p className="text-amber-800/90 leading-relaxed">
                  For wire transfers and corporate donations, please send proof of payment or receipt to{' '}
                  <strong className="text-amber-950 underline">{foundationInfo.email || FOUNDATION_INFO.email}</strong> or on WhatsApp to receive an official Foundation tax receipt and recognition letter.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={`mailto:${foundationInfo.email || FOUNDATION_INFO.email}?subject=Donation%20Confirmation%20-%20Forster%20Kwarteng%20Foundation`}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#000080] hover:bg-[#0a0a85] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>Email Payment Receipt</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <a
                  href={`https://wa.me/233546732812?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <WhatsAppLogo className="w-4.5 h-4.5" />
                  <span>Confirm via WhatsApp</span>
                </a>
              </div>
            </div>
          )}

          {/* Trust & Official Registration Badge */}
          <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5 font-medium text-slate-600">
              <ShieldCheck className="w-4 h-4 text-[#000080]" />
              Official Registration: <strong className="text-slate-800 font-mono">{foundationInfo.registrationNo || FOUNDATION_INFO.registrationNo}</strong>
            </span>
            <span className="font-semibold text-emerald-700 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              Empowering Lives Across Ghana
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
