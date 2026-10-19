import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { useAuth } from '../../../context/AuthContext';
import {
  FolderKanban,
  Calendar,
  Image as ImageIcon,
  Mail,
  Users,
  ArrowRight,
  Plus,
  CheckCircle2,
  ExternalLink,
  Phone,
  ShieldCheck,
  Shield,
  Key,
  Lock,
  RotateCcw,
  Smartphone,
  Building,
  CreditCard,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  X,
} from 'lucide-react';

interface DashboardViewProps {
  onSelectTab: (tab: string) => void;
  onOpenCreateProject?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onSelectTab }) => {
  const {
    programs,
    upcomingEvents,
    heroSlides,
    contactMessages,
    volunteerSubmissions,
    foundationInfo,
    momoAccounts,
    bankAccounts,
  } = useData();

  const { adminUser, changePassword, resetPasswordToDefault } = useAuth();

  // In-Dashboard Password Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showResetDefaultModal, setShowResetDefaultModal] = useState(false);

  const newMessagesCount = contactMessages.filter((m) => m.status === 'new').length;
  const newVolunteersCount = volunteerSubmissions.filter((v) => v.status === 'new').length;
  const featuredEvent = upcomingEvents.find((e) => e.status === 'Featured') || upcomingEvents[0];

  const handlePasswordSubmit = (e: React.FormEvent) => {
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
      setTimeout(() => {
        setPasswordSuccess(null);
        setIsPasswordModalOpen(false);
      }, 2000);
    } else {
      setPasswordError(res.error || 'Failed to update password.');
    }
  };

  const handleResetToDefault = () => {
    const res = resetPasswordToDefault();
    setShowResetDefaultModal(false);
    if (res.success) {
      setPasswordSuccess('Admin password has been reset to default (fkf2026).');
      setTimeout(() => setPasswordSuccess(null), 4000);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. WELCOME BANNER (Blue background showcasing White-Gold logo) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#000080] via-[#00006a] to-[#000052] p-8 sm:p-10 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] tracking-tight">
              Welcome to the Foundation Admin Console
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Manage your homepage scrolling images, publish field projects, attach or remove media galleries and videos, and track upcoming community outreaches.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectTab('carousel')}
                className="px-5 py-2.5 rounded-full bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Change Carousel Images</span>
              </button>
              <button
                onClick={() => onSelectTab('projects')}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/25 transition-all cursor-pointer flex items-center gap-2"
              >
                <FolderKanban className="w-4 h-4" />
                <span>Manage Projects</span>
              </button>
            </div>
          </div>

          {/* Official White & Gold Logo on Blue Background */}
          <div className="hidden lg:flex flex-col items-center justify-center shrink-0 p-5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-xs max-w-xs text-center shadow-inner">
            <img
              src="/assets/fkf-logo-white-gold.png"
              alt="Forster Kwarteng Foundation"
              className="h-14 w-auto object-contain drop-shadow-md"
            />
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest mt-2.5">
              Official Foundation Console
            </span>
          </div>
        </div>

        {/* Ambient glow in corner */}
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Global Dashboard Password Feedback Banner */}
      {passwordSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between shadow-2xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{passwordSuccess}</span>
          </div>
          <button
            onClick={() => setPasswordSuccess(null)}
            className="text-emerald-700 hover:text-emerald-900 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          onClick={() => onSelectTab('carousel')}
          className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#000080]/30 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#000080] flex items-center justify-center group-hover:scale-105 transition-transform">
              <ImageIcon className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
              Homepage
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold font-['Outfit'] text-slate-900">
              {heroSlides.length}
            </div>
            <div className="text-xs font-bold text-slate-600 mt-1">
              Hero Carousel Slides
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Controls main scrolling images & headlines
            </p>
          </div>
        </div>

        <div
          onClick={() => onSelectTab('projects')}
          className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#000080]/30 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FolderKanban className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Published
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold font-['Outfit'] text-slate-900">
              {programs.length}
            </div>
            <div className="text-xs font-bold text-slate-600 mt-1">
              Active Community Projects
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Click to edit stories, galleries & delete
            </p>
          </div>
        </div>

        <div
          onClick={() => onSelectTab('events')}
          className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#000080]/30 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
              Schedule
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold font-['Outfit'] text-slate-900">
              {upcomingEvents.length}
            </div>
            <div className="text-xs font-bold text-slate-600 mt-1">
              Upcoming Field Events
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Powers calendar & countdown timer
            </p>
          </div>
        </div>

        <div
          onClick={() => onSelectTab('inbox')}
          className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#000080]/30 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
              {newMessagesCount + newVolunteersCount} New
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold font-['Outfit'] text-slate-900">
              {contactMessages.length + volunteerSubmissions.length}
            </div>
            <div className="text-xs font-bold text-slate-600 mt-1">
              Inquiries & Volunteers
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {newMessagesCount} contact messages, {newVolunteersCount} volunteers
            </p>
          </div>
        </div>
      </div>

      {/* 3. RECENT FIELD INITIATIVES & LIVE COUNTDOWN SPOTLIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Projects Overview */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold font-['Outfit'] text-slate-900">
                Active Projects on Website
              </h3>
              <p className="text-xs text-slate-500">
                These articles are currently live in the "Our Projects" catalog.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('projects')}
              className="text-xs font-bold text-[#000080] hover:text-amber-600 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {programs.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {p.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate">
                      {p.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectTab('projects')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#000080] hover:bg-blue-50 transition-colors shrink-0 cursor-pointer"
                >
                  Edit / Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Featured Countdown, Donation Accounts & Admin Security */}
        <div className="lg:col-span-5 space-y-6">
          {/* Featured Countdown */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#000080] block font-mono">
              FEATURED COUNTDOWN
            </span>
            {featuredEvent ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-500">
                    Active Countdown Target:
                  </span>
                </div>
                <h4 className="text-base font-bold font-['Outfit'] text-slate-900">
                  {featuredEvent.title}
                </h4>
                <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{featuredEvent.formattedDate}</span>
                  </div>
                  <div>Location: <strong>{featuredEvent.location}</strong></div>
                  <div>Target: <strong>{featuredEvent.highlightMetric?.value || 'Community Outreaches'}</strong></div>
                </div>
                <button
                  onClick={() => onSelectTab('events')}
                  className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#000080] font-bold text-xs transition-colors cursor-pointer"
                >
                  Change Featured Event
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-500">No events currently scheduled.</p>
            )}
          </div>

          {/* DYNAMIC DONATION CHANNELS SNAPSHOT */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#000080]" />
                <span className="text-xs font-bold text-slate-800">
                  Official Donation Channels ({momoAccounts.length + bankAccounts.length})
                </span>
              </div>
              <button
                onClick={() => onSelectTab('settings')}
                className="text-xs font-bold text-[#000080] hover:text-amber-600 cursor-pointer flex items-center gap-1"
              >
                <span>Edit All</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {momoAccounts.map((momo) => (
                <div
                  key={momo.id}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-extrabold text-[10px] uppercase">
                      {momo.badge || momo.network}
                    </span>
                    <span className="text-slate-600 truncate text-[11px]">{momo.accountName}</span>
                  </div>
                  <strong className="text-slate-900 font-mono shrink-0">
                    {momo.formatted || momo.number}
                  </strong>
                </div>
              ))}

              {bankAccounts.slice(0, 1).map((bank) => (
                <div
                  key={bank.id}
                  className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-200/70 flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="px-2 py-0.5 rounded-md bg-[#000080] text-white font-extrabold text-[10px] uppercase">
                      Bank
                    </span>
                    <span className="text-slate-700 font-medium truncate text-[11px]">{bank.bankName}</span>
                  </div>
                  <strong className="text-slate-900 font-mono shrink-0">
                    {bank.accountNumber}
                  </strong>
                </div>
              ))}
            </div>

            <button
              onClick={() => onSelectTab('settings')}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-[#000080]" />
              <span>Configure Channels &amp; Banks</span>
            </button>
          </div>

          {/* ADMIN SECURITY & PASSWORD MANAGEMENT SECTION ON DASHBOARD */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#000080]">
                <ShieldCheck className="w-4 h-4 text-[#F5BD02]" />
                Admin Security &amp; Access
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black uppercase">
                Active
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#000080] text-[#F5BD02] flex items-center justify-center font-black text-xs font-['Outfit']">
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

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>Registration No:</span>
                <span className="font-mono font-bold text-slate-800">{foundationInfo.registrationNo || '000000000000000000000'}</span>
              </div>

              <div className="pt-1.5 flex items-center justify-between text-[11px] text-slate-500">
                <span>Default Password:</span>
                <span className="font-mono font-bold text-slate-800">fkf2026</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setPasswordError(null);
                  setPasswordSuccess(null);
                  setIsPasswordModalOpen(true);
                }}
                className="py-2.5 px-3 rounded-xl bg-[#000080] hover:bg-[#00006a] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Key className="w-3.5 h-3.5 text-[#F5BD02]" />
                <span>Change Password</span>
              </button>

              <button
                type="button"
                onClick={() => setShowResetDefaultModal(true)}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset to Default</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DASHBOARD IN-APP PASSWORD CHANGE MODAL */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#000080] flex items-center justify-center">
                  <Key className="w-5 h-5 text-[#000080]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                    Change Admin Password
                  </h3>
                  <p className="text-xs text-slate-500">
                    Update credentials for founder/admin access.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {passwordError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
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

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#000080] hover:bg-[#00006a] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Key className="w-4 h-4 text-[#F5BD02]" />
                  <span>Update Password</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DASHBOARD RESET TO DEFAULT MODAL */}
      {showResetDefaultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <RotateCcw className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Restore Default Admin Password?
            </h3>

            <p className="text-xs text-slate-500 leading-relaxed">
              This will reset your login password back to the default original credentials: <strong className="text-[#000080] font-mono text-sm">fkf2026</strong>.
            </p>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowResetDefaultModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetToDefault}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#000080] text-white text-xs font-bold hover:bg-[#00006a] cursor-pointer shadow-md"
              >
                Yes, Restore (fkf2026)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

