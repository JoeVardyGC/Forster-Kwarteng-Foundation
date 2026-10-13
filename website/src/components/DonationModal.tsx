import React, { useState } from 'react';
import type { Currency } from '../types';
import { DONATION_TIERS, FOUNDATION_INFO } from '../data/foundationData';
import { X, Heart, ShieldCheck, Check, Smartphone, CreditCard, Building2, Sparkles, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  onToggleCurrency: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  currency,
  onToggleCurrency,
}) => {
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [selectedTierId, setSelectedTierId] = useState<string>(DONATION_TIERS[1].id);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'card' | 'bank'>('momo');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [momoNumber, setMomoNumber] = useState('');
  const [momoProvider, setMomoProvider] = useState<'mtn' | 'telecel' | 'at'>('mtn');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [receiptRef, setReceiptRef] = useState('');

  if (!isOpen) return null;

  const selectedTier = DONATION_TIERS.find((t) => t.id === selectedTierId);
  const activeAmount = customAmount
    ? parseFloat(customAmount) || 0
    : currency === 'GHS'
    ? selectedTier?.amountGHS || 0
    : selectedTier?.amountUSD || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate Paystack / Ghana MoMo API Handshake
    setTimeout(() => {
      setIsProcessing(false);
      const ref = 'FKF-' + Math.floor(100000 + Math.random() * 900000);
      setReceiptRef(ref);
      setIsCompleted(true);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#000080', '#F5BD02', '#39399D', '#10B981'],
        });
      } catch (err) {
        console.error(err);
      }
    }, 1500);
  };

  const resetAndClose = () => {
    setIsCompleted(false);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Stepped Accent Stripe */}
        <div className="h-2 w-full fkf-step-bar"></div>

        {/* Modal Header */}
        <div className="bg-[#000080] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F5BD02] flex items-center justify-center text-[#000080]">
              <Heart className="w-5 h-5 fill-[#000080]" />
            </div>
            <div>
              <h3 className="font-bold text-lg font-['Outfit'] text-white">
                {isCompleted ? 'Donation Confirmed!' : 'Support Forster Kwarteng Foundation'}
              </h3>
              <p className="text-xs text-blue-200">
                {isCompleted
                  ? 'Your generosity is empowering lives today in Ghana'
                  : 'Empowering Lives, Building Futures'}
              </p>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="p-2 text-blue-200 hover:text-white hover:bg-blue-900/60 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isCompleted ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-2xl font-bold font-['Outfit'] text-[#000080]">
                Medaase! Thank You, {donorName || 'Kind Supporter'}!
              </h4>
              <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                Your contribution of{' '}
                <span className="font-bold text-slate-900">
                  {currency === 'GHS' ? `₵${activeAmount}` : `$${activeAmount}`}
                </span>{' '}
                has been received. A verification receipt has been sent to{' '}
                <span className="font-semibold text-slate-900">{donorEmail || 'your email'}</span>.
              </p>
            </div>

            {/* Simulated Receipt Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Transaction Reference</span>
                <span className="font-mono font-bold text-slate-900">{receiptRef}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Beneficiary Organization</span>
                <span className="font-medium text-slate-900">Forster Kwarteng Foundation</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Giving Frequency</span>
                <span className="capitalize font-medium text-slate-900">
                  {frequency === 'once' ? 'One-time Gift' : 'Monthly Supporter'}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500">Payment Channel</span>
                <span className="font-medium text-slate-900">
                  {paymentMethod === 'momo'
                    ? `Mobile Money (${momoProvider.toUpperCase()})`
                    : paymentMethod === 'card'
                    ? 'Credit / Debit Card'
                    : 'Bank Transfer'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => alert(`Official Receipt ${receiptRef} downloaded!`)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>Download PDF Receipt</span>
              </button>
              <button
                onClick={resetAndClose}
                className="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-[#000080] hover:bg-[#0a0a85] text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Return to Website
              </button>
            </div>
          </div>
        ) : (
          /* Donation Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Step 1: Frequency & Currency */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Frequency Selector */}
              <div className="w-full sm:w-auto flex items-center bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setFrequency('once')}
                  className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    frequency === 'once'
                      ? 'bg-white text-[#000080] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Give Once
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('monthly')}
                  className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    frequency === 'monthly'
                      ? 'bg-white text-[#000080] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Give Monthly
                </button>
              </div>

              {/* Currency Toggle */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500">Currency:</span>
                <button
                  type="button"
                  onClick={onToggleCurrency}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 font-bold text-[#000080] bg-blue-50/60 hover:bg-blue-100/60 cursor-pointer"
                >
                  {currency === 'GHS' ? '₵ GHS (Ghana)' : '$ USD (International)'}
                </button>
              </div>
            </div>

            {/* Step 2: Select Impact Tier */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                Choose Donation Amount
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {DONATION_TIERS.map((tier) => {
                  const isSelected = selectedTierId === tier.id && !customAmount;
                  const displayAmount =
                    currency === 'GHS' ? `₵${tier.amountGHS}` : `$${tier.amountUSD}`;

                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => {
                        setSelectedTierId(tier.id);
                        setCustomAmount('');
                      }}
                      className={`p-3 rounded-xl border text-left transition-all relative cursor-pointer ${
                        isSelected
                          ? 'border-[#000080] bg-blue-50/70 ring-2 ring-[#000080]/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {tier.popular && (
                        <span className="absolute -top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                          Popular
                        </span>
                      )}
                      <div className="font-extrabold text-base text-[#000080]">
                        {displayAmount}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-700 line-clamp-1">
                        {tier.label}
                      </div>
                    </button>
                  );
                })}

                {/* Custom Amount Box */}
                <div
                  className={`p-2.5 rounded-xl border flex flex-col justify-center transition-all ${
                    customAmount
                      ? 'border-[#000080] bg-blue-50/70 ring-2 ring-[#000080]/20'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <label className="text-[10px] text-slate-500 font-semibold mb-0.5">
                    Other Amount
                  </label>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-600">
                      {currency === 'GHS' ? '₵' : '$'}
                    </span>
                    <input
                      type="number"
                      min="1"
                      placeholder="0.00"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                      }}
                      className="w-full text-xs font-bold text-[#000080] bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Impact Statement */}
              <div className="mt-3 p-3 rounded-xl bg-amber-50/80 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <span className="font-bold">Real-World Impact: </span>
                  {selectedTier?.impactDescription}
                </p>
              </div>
            </div>

            {/* Step 3: Payment Method Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                Payment Channel (Ghana & Global)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('momo')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all cursor-pointer ${
                    paymentMethod === 'momo'
                      ? 'border-[#000080] bg-blue-50 text-[#000080] font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-amber-500" />
                  <span className="text-xs">Mobile Money</span>
                  <span className="text-[10px] text-slate-400">MTN / Telecel</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#000080] bg-blue-50 text-[#000080] font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span className="text-xs">Debit / Credit</span>
                  <span className="text-[10px] text-slate-400">Visa / Mastercard</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all cursor-pointer ${
                    paymentMethod === 'bank'
                      ? 'border-[#000080] bg-blue-50 text-[#000080] font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs">Bank Transfer</span>
                  <span className="text-[10px] text-slate-400">Accra Official</span>
                </button>
              </div>

              {/* MoMo Provider Sub-Selection */}
              {paymentMethod === 'momo' && (
                <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-semibold text-slate-700">Network:</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setMomoProvider('mtn')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                          momoProvider === 'mtn'
                            ? 'bg-amber-400 text-slate-950 shadow-sm'
                            : 'bg-white border text-slate-600'
                        }`}
                      >
                        MTN MoMo
                      </button>
                      <button
                        type="button"
                        onClick={() => setMomoProvider('telecel')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
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
                        className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
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
                      Mobile Money Number (Ghana)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 054 673 2812"
                      value={momoNumber}
                      onChange={(e) => setMomoNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#000080]"
                    />
                  </div>
                </div>
              )}

              {/* Bank Details Note */}
              {paymentMethod === 'bank' && (
                <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1 text-slate-700">
                  <p className="font-bold text-[#000080]">Direct Foundation Bank Account (Ghana):</p>
                  <p>Bank: GCB Bank PLC / Ecobank Ghana</p>
                  <p>Account Name: Forster Kwarteng Foundation</p>
                  <p>Branch: High Street, Accra</p>
                  <p className="text-[11px] text-slate-500 pt-1">
                    Please use your name as the transfer reference and send proof of payment to{' '}
                    <span className="font-semibold text-slate-800">{FOUNDATION_INFO.email}</span>.
                  </p>
                </div>
              )}
            </div>

            {/* Step 4: Donor Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name / Organization
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kwesi Boateng"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#000080]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email for Official Receipt
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#000080]"
                />
              </div>
            </div>

            {/* Security Guarantee Strip */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-3">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                256-bit Bank-Grade Encryption
              </span>
              <span>Audited by Registered Board</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing || activeAmount <= 0}
              className="w-full py-3.5 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#000080] border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing Secure Donation...</span>
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 fill-[#000080]" />
                  <span>
                    Complete Donation of{' '}
                    {currency === 'GHS' ? `₵${activeAmount}` : `$${activeAmount}`}
                  </span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
