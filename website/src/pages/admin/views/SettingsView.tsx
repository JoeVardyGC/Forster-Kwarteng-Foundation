import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
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
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { foundationInfo, updateFoundationInfo, resetToDefaults } = useData();

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

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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
            Update foundation phone numbers, official email addresses, headquarters, and manage data backups.
          </p>
        </div>
      </div>

      {/* 2. Settings Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 sm:p-8 space-y-6">
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

      {/* 3. Mobile Money & Financial Channels Reference */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Smartphone className="w-4 h-4 text-[#000080]" />
          Donation Channels (MTN MoMo & Telecel Cash)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 space-y-1">
            <span className="text-[10px] font-bold uppercase text-amber-800">Primary Mobile Money</span>
            <div className="text-sm font-black text-amber-950 font-mono">054 673 2812</div>
            <div className="text-xs text-amber-900 font-medium">Merchant: FORSTER KWARTENG FOUNDATION</div>
            <div className="text-[11px] text-amber-700">MTN Mobile Money</div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/60 space-y-1">
            <span className="text-[10px] font-bold uppercase text-blue-800">Alternative Line</span>
            <div className="text-sm font-black text-blue-950 font-mono">055 672 7083</div>
            <div className="text-xs text-blue-900 font-medium">Merchant: FORSTER KWARTENG FOUNDATION</div>
            <div className="text-[11px] text-blue-700">Telecel Cash / MTN</div>
          </div>
        </div>
      </div>

      {/* 4. Danger Zone: Factory Reset */}
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
    </div>
  );
};
