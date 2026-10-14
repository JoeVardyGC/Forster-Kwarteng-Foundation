import React, { useState } from 'react';
import type { Currency } from '../types';
import { DONATION_TIERS, FOUNDATION_INFO } from '../data/foundationData';
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  CreditCard,
  Building2,
  Download,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DonatePageProps {
  currency: Currency;
  onToggleCurrency: () => void;
}

export const DonatePage: React.FC<DonatePageProps> = ({ currency, onToggleCurrency }) => {
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [selectedTierId, setSelectedTierId] = useState<string>(DONATION_TIERS[1].id);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'card' | 'bank'>('momo');
  const [momoProvider, setMomoProvider] = useState<'mtn' | 'telecel' | 'at'>('mtn');
  const [momoNumber, setMomoNumber] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [receiptRef, setReceiptRef] = useState('');

  const selectedTier = DONATION_TIERS.find((t) => t.id === selectedTierId);
  const activeAmount = customAmount
    ? parseFloat(customAmount) || 0
    : currency === 'GHS'
    ? selectedTier?.amountGHS || 0
    : selectedTier?.amountUSD || 0;

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const ref = 'FKF-' + Math.floor(100000 + Math.random() * 900000);
      setReceiptRef(ref);
      setIsCompleted(true);

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#000080', '#F5BD02', '#39399D', '#10B981'],
        });
      } catch (err) {
        console.error(err);
      }
    }, 1500);
  };

  return (
    <div className="space-y-0">
      {/* 1. DONATE HERO */}
      <section className="bg-gradient-to-b from-[#000080] to-[#0a0a85] text-white py-14 lg:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 font-semibold text-xs border border-white/20 mb-3">
            Direct Impact Giving
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight">
            Invest in a Child's Future Today
          </h1>
          <p className="text-base sm:text-lg text-blue-100 mt-3 leading-relaxed">
            100% of your gift empowers vulnerable children and youth in Ghana through school scholarships, uniforms, mentorship, and vocational starter kits.
          </p>
        </div>

        {/* Stepped Accent Stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 fkf-step-bar"></div>
      </section>

      {/* 2. MAIN DONATION ENGINE */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="h-2 w-full fkf-step-bar"></div>

            {isCompleted ? (
              <div className="p-8 sm:p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="text-3xl font-extrabold font-['Outfit'] text-[#000080]">
                    Medaase! Thank You, {donorName || 'Generous Supporter'}!
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 max-w-lg mx-auto">
                    Your contribution of{' '}
                    <span className="font-bold text-slate-900">
                      {currency === 'GHS' ? `₵${activeAmount}` : `$${activeAmount}`}
                    </span>{' '}
                    has been recorded. An official receipt has been issued to{' '}
                    <span className="font-semibold text-slate-900">
                      {donorEmail || 'your email'}
                    </span>.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left text-xs space-y-2.5 max-w-md mx-auto">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">Official Receipt #</span>
                    <span className="font-mono font-bold text-slate-900">{receiptRef}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">Beneficiary Foundation</span>
                    <span className="font-medium text-slate-900">Forster Kwarteng Foundation</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">Giving Plan</span>
                    <span className="capitalize font-medium text-slate-900">
                      {frequency === 'once' ? 'One-time Donation' : 'Monthly Recurring Partner'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Payment Gateway</span>
                    <span className="font-medium text-slate-900">
                      {paymentMethod === 'momo'
                        ? `Ghana Mobile Money (${momoProvider.toUpperCase()})`
                        : paymentMethod === 'card'
                        ? 'Credit / Debit Card'
                        : 'Accra Bank Transfer'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => alert(`Official Receipt ${receiptRef} generated!`)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-slate-500" />
                    <span>Download PDF Certificate</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsCompleted(false);
                      setIsProcessing(false);
                    }}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#000080] hover:bg-[#0a0a85] text-white font-bold text-xs shadow cursor-pointer"
                  >
                    Make Another Donation
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDonateSubmit} className="p-6 sm:p-10 space-y-8">
                {/* 1. Frequency & Currency Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setFrequency('once')}
                      className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        frequency === 'once'
                          ? 'bg-white text-[#000080] shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Give One-Time
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        frequency === 'monthly'
                          ? 'bg-white text-[#000080] shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Monthly Sustainer
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500 font-medium">Currency:</span>
                    <button
                      type="button"
                      onClick={onToggleCurrency}
                      className="px-3.5 py-1.5 rounded-lg border border-slate-200 font-bold text-[#000080] bg-blue-50/60 hover:bg-blue-100/60 transition-colors cursor-pointer"
                    >
                      {currency === 'GHS' ? '₵ GHS (Ghana Cedis)' : '$ USD (US Dollars)'}
                    </button>
                  </div>
                </div>

                {/* 2. Amount Tiers */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Contribution Tier
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {DONATION_TIERS.map((tier) => {
                      const isSelected = selectedTierId === tier.id && !customAmount;
                      const displayAmount =
                        currency === 'GHS' ? `₵${tier.amountGHS}` : `$${tier.amountUSD}`;

                      return (
                        <div
                          key={tier.id}
                          onClick={() => {
                            setSelectedTierId(tier.id);
                            setCustomAmount('');
                          }}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                            isSelected
                              ? 'border-[#000080] bg-blue-50/80 shadow-xs ring-2 ring-[#000080]/15'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          {tier.popular && (
                            <span className="absolute -top-2.5 right-3 bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                              Most Popular
                            </span>
                          )}
                          <div className="text-2xl font-black font-['Outfit'] text-[#000080]">
                            {displayAmount}
                          </div>
                          <div className="text-xs font-bold text-slate-800 mt-0.5">
                            {tier.label}
                          </div>
                          <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-tight">
                            {tier.impactDescription}
                          </p>
                        </div>
                      );
                    })}

                    {/* Custom Amount Field */}
                    <div
                      className={`p-4 rounded-2xl border-2 flex flex-col justify-center transition-all ${
                        customAmount
                          ? 'border-[#000080] bg-blue-50/80 ring-2 ring-[#000080]/15'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <label className="text-[11px] font-semibold text-slate-600 mb-1">
                        Custom Amount
                      </label>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-slate-700">
                          {currency === 'GHS' ? '₵' : '$'}
                        </span>
                        <input
                          type="number"
                          min="1"
                          placeholder="Enter amount"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="w-full text-base font-bold text-[#000080] bg-transparent focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Impact Explainer */}
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                    <Heart className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 fill-amber-600" />
                    <span>
                      <strong className="font-bold">What this achieves: </strong>
                      {selectedTier?.impactDescription}
                    </span>
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Payment Method
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('momo')}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-1 text-center transition-all cursor-pointer ${
                        paymentMethod === 'momo'
                          ? 'border-[#000080] bg-blue-50 text-[#000080] font-bold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Smartphone className="w-6 h-6 text-amber-500" />
                      <span className="text-xs font-bold">Ghana Mobile Money</span>
                      <span className="text-[10px] text-slate-400">MTN • Telecel • AT</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-1 text-center transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-[#000080] bg-blue-50 text-[#000080] font-bold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <CreditCard className="w-6 h-6 text-blue-600" />
                      <span className="text-xs font-bold">Debit / Credit Card</span>
                      <span className="text-[10px] text-slate-400">Visa • Mastercard</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-1 text-center transition-all cursor-pointer ${
                        paymentMethod === 'bank'
                          ? 'border-[#000080] bg-blue-50 text-[#000080] font-bold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Building2 className="w-6 h-6 text-emerald-600" />
                      <span className="text-xs font-bold">Official Bank Transfer</span>
                      <span className="text-[10px] text-slate-400">Accra Ghana Account</span>
                    </button>
                  </div>

                  {paymentMethod === 'momo' && (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-slate-700">MoMo Provider:</span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setMomoProvider('mtn')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold ${
                              momoProvider === 'mtn'
                                ? 'bg-amber-400 text-slate-900 shadow-sm'
                                : 'bg-white border text-slate-600'
                            }`}
                          >
                            MTN MoMo
                          </button>
                          <button
                            type="button"
                            onClick={() => setMomoProvider('telecel')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold ${
                              momoProvider === 'telecel'
                                ? 'bg-red-500 text-white shadow-sm'
                                : 'bg-white border text-slate-600'
                            }`}
                          >
                            Telecel Cash
                          </button>
                          <button
                            type="button"
                            onClick={() => setMomoProvider('at')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold ${
                              momoProvider === 'at'
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-white border text-slate-600'
                            }`}
                          >
                            AT Money
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Mobile Money Account Number
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="054 673 2812"
                          value={momoNumber}
                          onChange={(e) => setMomoNumber(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#000080]"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'bank' && (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-1.5 text-slate-700">
                      <p className="font-bold text-[#000080]">
                        Forster Kwarteng Foundation Corporate Account:
                      </p>
                      <p>Bank: GCB Bank PLC / Ecobank Ghana</p>
                      <p>Account Number: 1041009823420</p>
                      <p>Branch: High Street, Accra, Ghana</p>
                      <p>Swift: GCBLGHAC</p>
                    </div>
                  )}
                </div>

                {/* 4. Donor Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name / Company
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ama Osei"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#000080]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address for Tax Receipt
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ama@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#000080]"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isProcessing || activeAmount <= 0}
                  className="w-full py-4 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-extrabold text-base rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#000080] border-t-transparent rounded-full animate-spin"></div>
                      <span>Authorizing Secure Donation...</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 fill-[#000080]" />
                      <span>
                        Confirm Contribution of{' '}
                        {currency === 'GHS' ? `₵${activeAmount}` : `$${activeAmount}`}
                      </span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. DONOR FAQ ACCORDION */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-extrabold font-['Outfit'] text-[#000080]">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Have questions about your donation? We are here to help.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How does Mobile Money donation work in Ghana?',
                a: 'When you submit with MTN MoMo, Telecel Cash, or AT Money, you will receive an instant prompt on your phone to approve the transaction with your standard PIN. No extra charges are added.',
              },
              {
                q: 'Can I donate from outside Ghana using an international card?',
                a: 'Yes. Our card gateway accepts all international Visa, Mastercard, and American Express cards from anywhere in the diaspora with automatic currency conversion.',
              },
              {
                q: 'Will I receive an official tax and accounting receipt?',
                a: 'Yes. An official electronic tax acknowledgment and transaction receipt with reference number is generated instantly upon confirmation.',
              },
              {
                q: 'Can I designate my donation to a specific program?',
                a: 'Yes. In the checkout notes or by contacting info@forsterkwartengfoundation.org, you can earmark your gift specifically for Scholarships, Youth Mentorship, or Community Health.',
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
              >
                <div className="flex items-center gap-2 font-bold text-sm text-[#000080] font-['Outfit']">
                  <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{faq.q}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
