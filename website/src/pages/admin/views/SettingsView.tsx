import React, { useState, useEffect } from 'react';
import { useData } from '../../../context/DataContext';
import { useAuth } from '../../../context/AuthContext';
import type { MomoAccount, BankAccount } from '../../../types';
import {
  Settings,
  Phone,
  Mail,
  MapPin,
  Clock,
  RotateCcw,
  Check,
  AlertTriangle,
  Building,
  CreditCard,
  Smartphone,
  Shield,
  Save,
  Image as ImageIcon,
  Download,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  Copy,
  CheckCircle2,
  Lock,
  Key,
  Eye,
  EyeOff,
  AlertCircle,
  X,
  Globe,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    foundationInfo,
    updateFoundationInfo,
    resetToDefaults,
    momoAccounts,
    bankAccounts,
    addMomoAccount,
    updateMomoAccount,
    deleteMomoAccount,
    addBankAccount,
    updateBankAccount,
    deleteBankAccount,
  } = useData();

  const { adminUser, changePassword, resetPasswordToDefault } = useAuth();

  // Foundation Info Form State
  const [formData, setFormData] = useState({
    name: foundationInfo.name,
    motto: foundationInfo.motto,
    address: foundationInfo.address,
    hqLocation: foundationInfo.hqLocation,
    phone1: foundationInfo.phones[0] || '',
    phone2: foundationInfo.phones[1] || '',
    email: foundationInfo.email,
    secondaryEmail: foundationInfo.secondaryEmail || '',
    operatingHours: foundationInfo.operatingHours,
    registrationNo: foundationInfo.registrationNo || '',
  });

  useEffect(() => {
    setFormData({
      name: foundationInfo.name,
      motto: foundationInfo.motto,
      address: foundationInfo.address,
      hqLocation: foundationInfo.hqLocation,
      phone1: foundationInfo.phones[0] || '',
      phone2: foundationInfo.phones[1] || '',
      email: foundationInfo.email,
      secondaryEmail: foundationInfo.secondaryEmail || '',
      operatingHours: foundationInfo.operatingHours,
      registrationNo: foundationInfo.registrationNo || '',
    });
  }, [foundationInfo]);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Copy Feedback State
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Mobile Money Modal / Form State
  const [isMomoModalOpen, setIsMomoModalOpen] = useState(false);
  const [editingMomoId, setEditingMomoId] = useState<string | null>(null);
  const [momoForm, setMomoForm] = useState({
    network: 'MTN Mobile Money',
    badge: 'MTN MoMo',
    number: '',
    formatted: '',
    accountName: 'Forster Kwarteng Foundation',
    reference: 'FKF Donation',
    isPrimary: false,
  });

  // Bank Modal / Form State
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [editingBankId, setEditingBankId] = useState<string | null>(null);
  const [bankForm, setBankForm] = useState({
    bankName: '',
    accountName: 'Forster Kwarteng Foundation',
    accountNumber: '',
    branch: 'High Street Branch, Accra',
    swiftCode: '',
    routingCode: '',
    currency: 'GHS / Multi-Currency',
    country: 'Ghana',
    isPrimary: false,
  });

  // Delete Confirmation State
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'momo' | 'bank';
    id: string;
    label: string;
  } | null>(null);

  // Password Management State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showDefaultPasswordConfirm, setShowDefaultPasswordConfirm] = useState(false);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleFoundationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFoundationInfo({
      name: formData.name,
      motto: formData.motto,
      address: formData.address,
      hqLocation: formData.hqLocation,
      phones: [formData.phone1, formData.phone2].filter(Boolean),
      email: formData.email,
      secondaryEmail: formData.secondaryEmail,
      operatingHours: formData.operatingHours,
      registrationNo: formData.registrationNo,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetData = () => {
    resetToDefaults();
    setShowResetConfirm(false);
    window.location.reload();
  };

  // --- Mobile Money Handlers ---
  const openAddMomoModal = () => {
    setEditingMomoId(null);
    setMomoForm({
      network: 'MTN Mobile Money',
      badge: 'MTN MoMo',
      number: '',
      formatted: '',
      accountName: 'Forster Kwarteng Foundation',
      reference: 'FKF Donation',
      isPrimary: momoAccounts.length === 0,
    });
    setIsMomoModalOpen(true);
  };

  const openEditMomoModal = (acc: MomoAccount) => {
    setEditingMomoId(acc.id);
    setMomoForm({
      network: acc.network,
      badge: acc.badge,
      number: acc.number,
      formatted: acc.formatted,
      accountName: acc.accountName,
      reference: acc.reference || 'FKF Donation',
      isPrimary: acc.isPrimary,
    });
    setIsMomoModalOpen(true);
  };

  const handleMomoNetworkSelect = (network: string) => {
    let badge = 'MoMo';
    if (network === 'MTN Mobile Money') badge = 'MTN MoMo';
    else if (network === 'Telecel Cash') badge = 'Telecel Cash';
    else if (network === 'AT Money' || network === 'AirtelTigo') badge = 'AT Money';
    else badge = network;

    setMomoForm((prev) => ({
      ...prev,
      network,
      badge,
    }));
  };

  const handleSaveMomo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!momoForm.number.trim()) return;

    const rawNum = momoForm.number.replace(/\s+/g, '');
    const formattedNum =
      momoForm.formatted.trim() ||
      (rawNum.length === 10
        ? `${rawNum.slice(0, 3)} ${rawNum.slice(3, 6)} ${rawNum.slice(6)}`
        : rawNum);

    let badgeColor = 'bg-slate-800 text-white';
    if (momoForm.network.toLowerCase().includes('mtn')) {
      badgeColor = 'bg-[#FFCB05] text-slate-950 border border-amber-400';
    } else if (momoForm.network.toLowerCase().includes('telecel') || momoForm.network.toLowerCase().includes('vodafone')) {
      badgeColor = 'bg-red-500 text-white';
    } else if (momoForm.network.toLowerCase().includes('at') || momoForm.network.toLowerCase().includes('airteltigo')) {
      badgeColor = 'bg-blue-600 text-white';
    }

    if (editingMomoId) {
      updateMomoAccount(editingMomoId, {
        network: momoForm.network,
        badge: momoForm.badge,
        badgeColor,
        number: rawNum,
        formatted: formattedNum,
        accountName: momoForm.accountName,
        reference: momoForm.reference,
        isPrimary: momoForm.isPrimary,
      });
    } else {
      addMomoAccount({
        network: momoForm.network,
        badge: momoForm.badge,
        badgeColor,
        logo: momoForm.network.toLowerCase().includes('mtn') ? '/assets/mtn_momo_logo.svg' : null,
        number: rawNum,
        formatted: formattedNum,
        accountName: momoForm.accountName,
        reference: momoForm.reference,
        isPrimary: momoForm.isPrimary,
      });
    }

    setIsMomoModalOpen(false);
  };

  // --- Bank Handlers ---
  const openAddBankModal = () => {
    setEditingBankId(null);
    setBankForm({
      bankName: '',
      accountName: 'Forster Kwarteng Foundation',
      accountNumber: '',
      branch: 'High Street Branch, Accra',
      swiftCode: '',
      routingCode: '',
      currency: 'GHS / Multi-Currency',
      country: 'Ghana',
      isPrimary: bankAccounts.length === 0,
    });
    setIsBankModalOpen(true);
  };

  const openEditBankModal = (acc: BankAccount) => {
    setEditingBankId(acc.id);
    setBankForm({
      bankName: acc.bankName,
      accountName: acc.accountName,
      accountNumber: acc.accountNumber,
      branch: acc.branch,
      swiftCode: acc.swiftCode,
      routingCode: acc.routingCode || '',
      currency: acc.currency || 'GHS',
      country: acc.country || 'Ghana',
      isPrimary: acc.isPrimary,
    });
    setIsBankModalOpen(true);
  };

  const handleSaveBank = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankForm.bankName.trim() || !bankForm.accountNumber.trim()) return;

    if (editingBankId) {
      updateBankAccount(editingBankId, {
        bankName: bankForm.bankName,
        accountName: bankForm.accountName,
        accountNumber: bankForm.accountNumber.trim(),
        branch: bankForm.branch,
        swiftCode: bankForm.swiftCode.trim().toUpperCase(),
        routingCode: bankForm.routingCode.trim(),
        currency: bankForm.currency,
        country: bankForm.country,
        isPrimary: bankForm.isPrimary,
      });
    } else {
      addBankAccount({
        bankName: bankForm.bankName,
        accountName: bankForm.accountName,
        accountNumber: bankForm.accountNumber.trim(),
        branch: bankForm.branch,
        swiftCode: bankForm.swiftCode.trim().toUpperCase(),
        routingCode: bankForm.routingCode.trim(),
        currency: bankForm.currency,
        country: bankForm.country,
        isPrimary: bankForm.isPrimary,
      });
    }

    setIsBankModalOpen(false);
  };

  const confirmDeleteTarget = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'momo') {
      deleteMomoAccount(deleteTarget.id);
    } else {
      deleteBankAccount(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  // --- Password Handlers ---
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation password do not match.');
      return;
    }

    const res = changePassword(currentPassword, newPassword);
    if (res.success) {
      setPasswordSuccess('Admin password changed successfully! Your session is updated.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordSuccess(null), 5000);
    } else {
      setPasswordError(res.error || 'Failed to update password.');
    }
  };

  const handleResetToDefaultPassword = () => {
    const res = resetPasswordToDefault();
    setShowDefaultPasswordConfirm(false);
    if (res.success) {
      setPasswordSuccess('Admin password has been reset to default (fkf2026).');
      setPasswordError(null);
      setTimeout(() => setPasswordSuccess(null), 5000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#000080]">
            <Settings className="w-4 h-4 text-[#F5BD02]" />
            Organization & System Settings
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-['Outfit']">
            Foundation Configuration
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Update foundation phone numbers, official donation accounts (MoMo & Bank), reset admin passwords, and brand specifications.
          </p>
        </div>
      </div>

      {/* 2. Settings Form: General Info */}
      <form onSubmit={handleFoundationSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 sm:p-8 space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Building className="w-4 h-4 text-[#000080]" />
          General Foundation Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Organization Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Motto / Tagline
            </label>
            <input
              type="text"
              value={formData.motto}
              onChange={(e) => setFormData({ ...formData, motto: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
            />
          </div>
        </div>

        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3 pt-2">
          <Phone className="w-4 h-4 text-[#000080]" />
          Communication & Helpline Numbers
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Primary Phone / WhatsApp Line
            </label>
            <input
              type="text"
              required
              value={formData.phone1}
              onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
              placeholder="+233 546732812"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Secondary Helpline
            </label>
            <input
              type="text"
              value={formData.phone2}
              onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
              placeholder="+233 556727083"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Primary Official Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Secondary Contact Email
            </label>
            <input
              type="email"
              value={formData.secondaryEmail}
              onChange={(e) => setFormData({ ...formData, secondaryEmail: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Physical Location / Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Operating Hours
            </label>
            <input
              type="text"
              value={formData.operatingHours}
              onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
              <span>Official Registration Number</span>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Statutory Non-Profit ID
              </span>
            </label>
            <input
              type="text"
              required
              value={formData.registrationNo}
              onChange={(e) => setFormData({ ...formData, registrationNo: e.target.value })}
              placeholder="e.g. CG012342026 or 000000000000000000000"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-[#000080] outline-none"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Statutory non-profit registration number. Displayed on public About Accreditation, Donation Modals, and tax certificates.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Headquarters / Operating Base
            </label>
            <input
              type="text"
              value={formData.hqLocation}
              onChange={(e) => setFormData({ ...formData, hqLocation: e.target.value })}
              placeholder="Accra, Ghana"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Foundation operating base shown across official letterheads and footer.
            </p>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-slate-100">
          {savedSuccess ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
              <Check className="w-4 h-4 text-emerald-600" />
              Settings updated successfully!
            </span>
          ) : (
            <span className="text-xs text-slate-400">
              Changes reflect immediately on public footer and contact sections.
            </span>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#000080] hover:bg-[#00006a] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-[#F5BD02]" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>

      {/* 3. DYNAMIC DONATION CHANNELS & FINANCIAL ACCOUNTS (MoMo + Bank) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 sm:p-8 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#000080]">
            <CreditCard className="w-4 h-4 text-[#F5BD02]" />
            Official Donation Channels
          </div>
          <h3 className="text-lg font-black text-slate-900 mt-1 font-['Outfit']">
            Mobile Money & Bank Account Setup
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Configure all public financial payment channels. Add or update MTN MoMo, Telecel Cash, AT/AirtelTigo, or corporate Bank Accounts. Updates reflect live on the public Donate page and Donation Modals.
          </p>
        </div>

        {/* 3A. Mobile Money Channels */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Mobile Money Numbers ({momoAccounts.length})
                </h4>
                <p className="text-[11px] text-slate-500">
                  Direct merchant lines for donor transfers (MTN MoMo, Telecel Cash, AT Money).
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={openAddMomoModal}
              className="px-3.5 py-1.5 rounded-xl bg-[#000080] hover:bg-[#00006a] text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-[#F5BD02]" />
              <span>Add MoMo Line</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {momoAccounts.map((momo) => {
              const isCopied = copiedId === momo.id;
              const isMtn = momo.network.toLowerCase().includes('mtn');
              const isTelecel = momo.network.toLowerCase().includes('telecel') || momo.network.toLowerCase().includes('vodafone');
              const isAT = momo.network.toLowerCase().includes('at') || momo.network.toLowerCase().includes('airteltigo');

              return (
                <div
                  key={momo.id}
                  className={`p-4 rounded-2xl border transition-all relative ${
                    momo.isPrimary
                      ? 'bg-amber-50/50 border-amber-200/90 shadow-2xs ring-1 ring-amber-300/40'
                      : 'bg-slate-50/80 border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          momo.badgeColor || (isMtn ? 'bg-[#FFCB05] text-slate-950 border border-amber-400' : isTelecel ? 'bg-red-500 text-white' : isAT ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white')
                        }`}
                      >
                        {momo.badge || momo.network}
                      </span>
                      {momo.isPrimary && (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Primary
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => openEditMomoModal(momo)}
                        title="Edit Account"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#000080] hover:bg-white transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteTarget({
                            type: 'momo',
                            id: momo.id,
                            label: `${momo.network} (${momo.formatted || momo.number})`,
                          })
                        }
                        title="Delete Account"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <div className="text-base sm:text-lg font-black text-slate-900 font-mono tracking-tight">
                        {momo.formatted || momo.number}
                      </div>
                      <div className="text-xs font-semibold text-slate-700 mt-0.5">
                        {momo.accountName}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(momo.id, momo.number)}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs shrink-0"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-500" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="mt-2.5 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Reference: <strong className="text-slate-800">{momo.reference || 'FKF Donation'}</strong></span>
                    <span className="text-[10px] text-slate-400 font-mono">{momo.network}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3B. Corporate Bank Accounts */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#000080] flex items-center justify-center">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Corporate Bank Accounts ({bankAccounts.length})
                </h4>
                <p className="text-[11px] text-slate-500">
                  Institutional bank transfer channels for domestic and international wires.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={openAddBankModal}
              className="px-3.5 py-1.5 rounded-xl bg-[#000080] hover:bg-[#00006a] text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-[#F5BD02]" />
              <span>Add Bank Account</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bankAccounts.map((bank) => {
              const isCopied = copiedId === bank.id;
              return (
                <div
                  key={bank.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    bank.isPrimary
                      ? 'bg-blue-50/50 border-blue-200/90 shadow-2xs ring-1 ring-blue-300/40'
                      : 'bg-slate-50/80 border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#000080] text-white">
                        {bank.bankName}
                      </span>
                      {bank.isPrimary && (
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Primary Bank
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => openEditBankModal(bank)}
                        title="Edit Account"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#000080] hover:bg-white transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteTarget({
                            type: 'bank',
                            id: bank.id,
                            label: `${bank.bankName} (${bank.accountNumber})`,
                          })
                        }
                        title="Delete Account"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Account Number</div>
                      <div className="text-base sm:text-lg font-black text-slate-900 font-mono tracking-tight">
                        {bank.accountNumber}
                      </div>
                      <div className="text-xs font-semibold text-slate-700 mt-0.5">
                        {bank.accountName}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(bank.id, bank.accountNumber)}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs shrink-0"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-500" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-200/60 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Branch:</span>
                      <span className="font-medium text-slate-800">{bank.branch || 'Accra Central'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">SWIFT / BIC:</span>
                      <span className="font-mono font-bold text-slate-800">{bank.swiftCode || 'GCBLGHAC'}</span>
                    </div>
                    {bank.currency && (
                      <div>
                        <span className="text-slate-400 block text-[10px]">Currency:</span>
                        <span className="font-medium text-slate-800">{bank.currency}</span>
                      </div>
                    )}
                    {bank.country && (
                      <div>
                        <span className="text-slate-400 block text-[10px]">Country:</span>
                        <span className="font-medium text-slate-800">{bank.country}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. ADMIN ACCOUNT SECURITY & PASSWORD MANAGEMENT */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#000080]">
            <Shield className="w-4 h-4 text-[#F5BD02]" />
            Authentication & Security
          </div>
          <h3 className="text-lg font-black text-slate-900 mt-1 font-['Outfit']">
            Admin Account & Password Management
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Update your admin login password or restore the initial default password (<strong>fkf2026</strong>) whenever required.
          </p>
        </div>

        {/* Current Admin Account Badge */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#000080] text-[#F5BD02] flex items-center justify-center font-black text-sm font-['Outfit'] shadow-2xs">
              FK
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                {adminUser?.name || 'Founder & Super Admin'}
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                {adminUser?.email || 'founder@forsterkwartengfoundation.org'}
              </div>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black uppercase tracking-wider self-start sm:self-auto">
            Super Admin Active
          </span>
        </div>

        {/* Password Alerts */}
        {passwordSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{passwordSuccess}</span>
          </div>
        )}

        {passwordError && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{passwordError}</span>
          </div>
        )}

        {/* Change Password Form */}
        <form onSubmit={handlePasswordChange} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                New Password (min 6 chars)
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#000080] hover:bg-[#00006a] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-2 transition-all"
            >
              <Key className="w-4 h-4 text-[#F5BD02]" />
              <span>Update Admin Password</span>
            </button>

            <button
              type="button"
              onClick={() => setShowDefaultPasswordConfirm(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Restore Default Password (fkf2026)</span>
            </button>
          </div>
        </form>
      </div>

      {/* 4. Official Brand Identity & Logo Guidelines */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#000080]">
            <ImageIcon className="w-4 h-4 text-[#F5BD02]" />
            Brand Assets & Logo Specifications
          </div>
          <h3 className="text-lg font-black text-slate-900 mt-1 font-['Outfit']">
            Official Foundation Logos
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            When the background is blue (#000080), use the white-and-gold version (white left wing &amp; yellow right wing). When the background is white, use the blue-and-gold version.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Blue Background Variant */}
          <div className="rounded-2xl p-5 bg-[#000080] text-white flex flex-col justify-between space-y-4 shadow-md border border-[#00006a]">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider border border-white/15">
                  For Blue / Dark Backgrounds
                </span>
                <span className="text-[11px] text-blue-200 font-mono">#000080</span>
              </div>
              <p className="text-[11px] text-blue-100/90 mt-2 leading-relaxed">
                Left side of emblem is <strong className="text-white">White</strong>, right side is <strong className="text-amber-300">Yellow</strong>, text is <strong className="text-white">White</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center min-h-[90px]">
              <img
                src="/assets/fkf-logo-white-gold.png"
                alt="FKF Logo for Blue Backgrounds"
                className="h-12 w-auto object-contain drop-shadow"
              />
            </div>

            <div className="pt-2 flex items-center gap-2 border-t border-white/10">
              <a
                href="/assets/fkf-logo-white-gold.png"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                <span>Full Logo (PNG)</span>
              </a>
              <a
                href="/assets/fkf-emblem-white-gold.png"
                target="_blank"
                rel="noreferrer"
                className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                <span>Emblem (PNG)</span>
              </a>
            </div>
          </div>

          {/* White Background Variant */}
          <div className="rounded-2xl p-5 bg-slate-50 text-slate-800 flex flex-col justify-between space-y-4 border border-slate-200">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#000080] text-[10px] font-extrabold uppercase tracking-wider border border-blue-200">
                  For White / Light Backgrounds
                </span>
                <span className="text-[11px] text-slate-400 font-mono">#FFFFFF</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                Left side of emblem is <strong className="text-[#000080]">Blue</strong>, right side is <strong className="text-amber-600">Yellow</strong>, text is <strong className="text-[#000080]">Blue</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-center min-h-[90px] shadow-2xs">
              <img
                src="/assets/fkf-logo-horizontal.png"
                alt="FKF Logo for White Backgrounds"
                className="h-12 w-auto object-contain"
              />
            </div>

            <div className="pt-2 flex items-center gap-2 border-t border-slate-200">
              <a
                href="/assets/fkf-logo-horizontal.png"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#000080]" />
                <span>Full Logo (PNG)</span>
              </a>
              <a
                href="/assets/fkf-emblem-mark.png"
                target="_blank"
                rel="noreferrer"
                className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#000080]" />
                <span>Emblem (PNG)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Danger Zone: Factory Reset */}
      <div className="bg-red-50/60 rounded-2xl border border-red-200/80 p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-red-950">Factory Reset Site Data</h3>
            <p className="text-xs text-red-800/80 leading-relaxed">
              Reset all carousel images, projects, articles, upcoming calendar events, and foundation details back to the default original dataset.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Data to Factory Defaults</span>
          </button>
        </div>
      </div>

      {/* RESET CONFIRMATION MODAL */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <RotateCcw className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Restore Factory Defaults?
            </h3>

            <p className="text-xs text-slate-500 leading-relaxed">
              This will erase any custom carousel slides, created projects, and scheduled events in local storage, reloading the official foundation initial data.
            </p>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetData}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 cursor-pointer shadow-md"
              >
                Yes, Restore Defaults
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. ADD / EDIT MOBILE MONEY MODAL */}
      {isMomoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                    {editingMomoId ? 'Edit Mobile Money Channel' : 'Add Mobile Money Channel'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Direct merchant phone line for donor mobile money transfers.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMomoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveMomo} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Network Provider
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: 'MTN Mobile Money', label: 'MTN MoMo' },
                    { name: 'Telecel Cash', label: 'Telecel Cash' },
                    { name: 'AT Money', label: 'AT / AirtelTigo' },
                  ].map((net) => (
                    <button
                      key={net.name}
                      type="button"
                      onClick={() => handleMomoNetworkSelect(net.name)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                        momoForm.network === net.name
                          ? 'bg-[#000080] text-white border-[#000080] shadow-2xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {net.label}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={momoForm.network}
                  onChange={(e) => setMomoForm({ ...momoForm, network: e.target.value })}
                  placeholder="Or enter custom provider name (e.g. Wave, M-Pesa)"
                  className="mt-2 w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number (Raw Digits)
                  </label>
                  <input
                    type="tel"
                    required
                    value={momoForm.number}
                    onChange={(e) => setMomoForm({ ...momoForm, number: e.target.value })}
                    placeholder="e.g. 0546732812"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-[#000080] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Display Formatting
                  </label>
                  <input
                    type="text"
                    value={momoForm.formatted}
                    onChange={(e) => setMomoForm({ ...momoForm, formatted: e.target.value })}
                    placeholder="e.g. 054 673 2812"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-[#000080] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Recipient Merchant / Account Name
                </label>
                <input
                  type="text"
                  required
                  value={momoForm.accountName}
                  onChange={(e) => setMomoForm({ ...momoForm, accountName: e.target.value })}
                  placeholder="FORSTER KWARTENG FOUNDATION"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Default Reference Note
                  </label>
                  <input
                    type="text"
                    value={momoForm.reference}
                    onChange={(e) => setMomoForm({ ...momoForm, reference: e.target.value })}
                    placeholder="FKF Donation"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Network Badge Label
                  </label>
                  <input
                    type="text"
                    value={momoForm.badge}
                    onChange={(e) => setMomoForm({ ...momoForm, badge: e.target.value })}
                    placeholder="MTN MoMo"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="momoIsPrimary"
                  checked={momoForm.isPrimary}
                  onChange={(e) => setMomoForm({ ...momoForm, isPrimary: e.target.checked })}
                  className="w-4 h-4 rounded text-[#000080] focus:ring-[#000080] border-slate-300"
                />
                <label htmlFor="momoIsPrimary" className="text-xs font-medium text-slate-700 cursor-pointer">
                  Set as primary default Mobile Money channel
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsMomoModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#000080] hover:bg-[#00006a] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#F5BD02]" />
                  <span>{editingMomoId ? 'Update Channel' : 'Save Channel'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. ADD / EDIT BANK ACCOUNT MODAL */}
      {isBankModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#000080] flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                    {editingBankId ? 'Edit Corporate Bank Account' : 'Add Corporate Bank Account'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Official foundation bank account for domestic and foreign wires.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsBankModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveBank} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  required
                  value={bankForm.bankName}
                  onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                  placeholder="e.g. GCB Bank PLC, Ecobank Ghana, Stanbic Bank"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    required
                    value={bankForm.accountNumber}
                    onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                    placeholder="e.g. 1041009823420"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold focus:ring-2 focus:ring-[#000080] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Account Name / Title
                  </label>
                  <input
                    type="text"
                    required
                    value={bankForm.accountName}
                    onChange={(e) => setBankForm({ ...bankForm, accountName: e.target.value })}
                    placeholder="Forster Kwarteng Foundation"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Branch Location
                  </label>
                  <input
                    type="text"
                    value={bankForm.branch}
                    onChange={(e) => setBankForm({ ...bankForm, branch: e.target.value })}
                    placeholder="High Street Branch, Accra"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    SWIFT / BIC Code
                  </label>
                  <input
                    type="text"
                    value={bankForm.swiftCode}
                    onChange={(e) => setBankForm({ ...bankForm, swiftCode: e.target.value })}
                    placeholder="e.g. GCBLGHAC"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono uppercase focus:ring-2 focus:ring-[#000080] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Supported Currency
                  </label>
                  <input
                    type="text"
                    value={bankForm.currency}
                    onChange={(e) => setBankForm({ ...bankForm, currency: e.target.value })}
                    placeholder="GHS / USD / Multi-Currency"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={bankForm.country}
                    onChange={(e) => setBankForm({ ...bankForm, country: e.target.value })}
                    placeholder="Ghana"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="bankIsPrimary"
                  checked={bankForm.isPrimary}
                  onChange={(e) => setBankForm({ ...bankForm, isPrimary: e.target.checked })}
                  className="w-4 h-4 rounded text-[#000080] focus:ring-[#000080] border-slate-300"
                />
                <label htmlFor="bankIsPrimary" className="text-xs font-medium text-slate-700 cursor-pointer">
                  Set as primary default Corporate Bank Account
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBankModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#000080] hover:bg-[#00006a] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#F5BD02]" />
                  <span>{editingBankId ? 'Update Bank Account' : 'Save Bank Account'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. DELETE ACCOUNT CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Delete Donation Channel?
            </h3>

            <p className="text-xs text-slate-500 leading-relaxed">
              Are you sure you want to remove <strong className="text-slate-800">{deleteTarget.label}</strong> from your official donation channels? This will immediately remove it from the public Donate page.
            </p>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteTarget}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 cursor-pointer shadow-md"
              >
                Yes, Delete Channel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. RESTORE DEFAULT PASSWORD CONFIRMATION MODAL */}
      {showDefaultPasswordConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <RotateCcw className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Restore Default Admin Password?
            </h3>

            <p className="text-xs text-slate-500 leading-relaxed">
              This will reset the administrator login password back to the default original credentials: <strong className="text-[#000080] font-mono text-sm">fkf2026</strong>.
            </p>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowDefaultPasswordConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetToDefaultPassword}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#000080] text-white text-xs font-bold hover:bg-[#00006a] cursor-pointer shadow-md"
              >
                Yes, Restore Default (fkf2026)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
