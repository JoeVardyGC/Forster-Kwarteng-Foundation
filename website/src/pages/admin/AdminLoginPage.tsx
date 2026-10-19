import React, { useState } from 'react';
import type { PageId } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';

interface AdminLoginPageProps {
  onNavigate: (page: PageId) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('founder@forsterkwartengfoundation.org');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const res = login(password, email);
    if (res.success) {
      onNavigate('admin');
    } else {
      setError(res.error || 'Authentication failed. Please verify credentials.');
      setIsSubmitting(false);
    }
  };

  const handleQuickDemo = () => {
    setEmail('founder@forsterkwartengfoundation.org');
    setPassword('fkf2026');
    const res = login('fkf2026', 'founder@forsterkwartengfoundation.org');
    if (res.success) {
      onNavigate('admin');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000080] via-[#090979] to-[#000045] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

      {/* Return to Public Site Link */}
      <button
        onClick={() => onNavigate('home')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-blue-200 hover:text-white bg-white/10 hover:bg-white/15 px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-md border border-white/20 transition-all cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Website</span>
      </button>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-50 border border-blue-100 shadow-xs mb-1">
              <img
                src="/assets/fkf-logo-horizontal.png"
                alt="Forster Kwarteng Foundation"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest bg-amber-100 text-amber-900 border border-amber-200/80">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                Staff Administration
              </span>
              <h1 className="text-2xl font-extrabold font-['Outfit'] text-slate-900 mt-2">
                Foundation Console
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Manage hero carousel slides, projects, field calendar, and volunteer inquiries.
              </p>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@fkf.org"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#000080]/20 focus:border-[#000080] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#000080]/20 focus:border-[#000080] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-[#000080] hover:bg-[#0a0a85] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Console'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="pt-2 border-t border-slate-100 text-center space-y-2">
            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#000080] border border-amber-200/80 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Instant Demo Login (Single Click)</span>
            </button>
            <p className="text-[11px] text-slate-400">
              Authorized password: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600 font-mono">fkf2026</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
