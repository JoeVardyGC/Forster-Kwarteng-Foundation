import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { DashboardView } from './views/DashboardView';
import { CarouselView } from './views/CarouselView';
import { ProjectsView } from './views/ProjectsView';
import { EventsView } from './views/EventsView';
import { StoriesView } from './views/StoriesView';
import { InboxView } from './views/InboxView';
import { SettingsView } from './views/SettingsView';
import {
  LayoutDashboard,
  Image as ImageIcon,
  FolderKanban,
  Calendar,
  Quote,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface AdminLayoutProps {
  onNavigateHome: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onNavigateHome }) => {
  const { adminUser, logout } = useAuth();
  const { contactMessages, volunteerSubmissions } = useData();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'carousel' | 'projects' | 'events' | 'stories' | 'inbox' | 'settings'
  >('dashboard');

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unreadMessagesCount =
    contactMessages.filter((m) => m.status === 'new').length +
    volunteerSubmissions.filter((v) => v.status === 'new').length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'carousel',
      label: 'Hero Carousel',
      icon: ImageIcon,
      badge: null,
    },
    {
      id: 'projects',
      label: 'Projects & Media',
      icon: FolderKanban,
      badge: null,
    },
    {
      id: 'events',
      label: 'Field Events',
      icon: Calendar,
      badge: null,
    },
    {
      id: 'stories',
      label: 'Beneficiary Stories',
      icon: Quote,
      badge: null,
    },
    {
      id: 'inbox',
      label: 'Submissions Inbox',
      icon: Mail,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : null,
    },
    {
      id: 'settings',
      label: 'Foundation Settings',
      icon: Settings,
      badge: null,
    },
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId as any);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 1. SIDEBAR (Desktop) */}
      <aside className="hidden lg:flex w-72 bg-[#000080] text-white flex-col justify-between shrink-0 shadow-xl border-r border-[#00006a] sticky top-0 h-screen z-30">
        <div>
          {/* Logo & Brand Header */}
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center p-1.5 shadow-xs shrink-0">
              <img
                src="/assets/fkf-emblem-white-gold.png"
                alt="FKF Emblem"
                className="w-full h-full object-contain drop-shadow-xs"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-black tracking-tight text-white font-['Outfit'] leading-tight truncate">
                FORSTER KWARTENG
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5BD02] animate-pulse" />
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                  Admin Console
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#000080] shadow-md'
                      : 'text-blue-100/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-[#000080]' : 'text-amber-300'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== null && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        isActive ? 'bg-[#000080] text-white' : 'bg-[#F5BD02] text-[#000080]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile & Live Link */}
        <div className="p-4 border-t border-white/10 space-y-2">
          {/* Back to Live Site button */}
          <button
            onClick={onNavigateHome}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#F5BD02]" />
              <span>View Live Website</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-blue-200" />
          </button>

          {/* Admin User Card & Logout */}
          <div className="p-3 rounded-xl bg-black/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#F5BD02] text-[#000080] font-black text-xs flex items-center justify-center shrink-0">
                {adminUser?.name ? adminUser.name[0].toUpperCase() : 'A'}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">
                  {adminUser?.name || 'Administrator'}
                </div>
                <div className="text-[10px] text-blue-200 truncate">
                  {adminUser?.role || 'Admin'}
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MOBILE TOPBAR */}
      <header className="lg:hidden bg-[#000080] text-white p-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center p-1">
            <img
              src="/assets/fkf-emblem-white-gold.png"
              alt="FKF"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-xs font-black font-['Outfit'] block leading-none">
              FKF Console
            </span>
            <span className="text-[9px] font-bold text-amber-300 uppercase tracking-wider">
              {navItems.find((n) => n.id === activeTab)?.label}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateHome}
            className="px-2.5 py-1.5 rounded-lg bg-white/10 text-white text-[11px] font-bold flex items-center gap-1"
          >
            <ExternalLink className="w-3 h-3 text-[#F5BD02]" />
            <span>Site</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-white/10 text-white cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* 3. MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-[#000080] rounded-t-3xl p-6 text-white max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/fkf-emblem-white-gold.png"
                  alt="FKF"
                  className="w-5 h-5 object-contain"
                />
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Admin Navigation
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between ${
                      isActive ? 'bg-white text-[#000080]' : 'text-blue-100 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== null && (
                      <span className="px-2 py-0.5 rounded-full bg-[#F5BD02] text-[#000080] text-[10px] font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs text-blue-200">
                Signed in as <strong className="text-white">{adminUser?.name}</strong>
              </div>
              <button
                onClick={logout}
                className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-200 text-xs font-bold flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar for Desktop */}
        <header className="hidden lg:flex bg-white border-b border-slate-200/80 px-8 py-4 items-center justify-between sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400">Admin Portal</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-xs font-bold text-slate-800">
              {navItems.find((n) => n.id === activeTab)?.label}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#000080]" />
              <span>Live Website</span>
            </button>

            <div className="h-4 w-px bg-slate-200" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#000080] text-amber-300 font-bold text-xs flex items-center justify-center">
                {adminUser?.name ? adminUser.name[0].toUpperCase() : 'A'}
              </div>
              <span className="text-xs font-bold text-slate-700">
                {adminUser?.name || 'Administrator'}
              </span>
            </div>
          </div>
        </header>

        {/* View Component Container */}
        <div className="p-4 sm:p-8 flex-1">
          {activeTab === 'dashboard' && <DashboardView onSelectTab={handleSelectTab} />}
          {activeTab === 'carousel' && <CarouselView />}
          {activeTab === 'projects' && <ProjectsView />}
          {activeTab === 'events' && <EventsView />}
          {activeTab === 'stories' && <StoriesView />}
          {activeTab === 'inbox' && <InboxView />}
          {activeTab === 'settings' && <SettingsView />}
        </div>
      </main>
    </div>
  );
};
