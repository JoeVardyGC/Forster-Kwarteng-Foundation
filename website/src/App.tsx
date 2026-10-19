import { useState, useEffect } from 'react';
import type { PageId, Currency } from './types';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DonationModal } from './components/DonationModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { ProgramArticlePage } from './pages/ProgramArticlePage';
import { TransparencyPage } from './pages/TransparencyPage';
import { DonatePage } from './pages/DonatePage';
import { GetInvolvedPage } from './pages/GetInvolvedPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { PageSkeleton } from './components/PageSkeleton';

export function App() {
  const { isAuthenticated } = useAuth();

  const resolveRoute = () => {
    // Check hash first (e.g. #admin, #programs, #program/mental-health)
    const hash = window.location.hash.replace(/^#\/?/, '');
    // Check pathname second (e.g. /admin, /programs, /admin-login)
    const path = window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, '');

    const route = hash || path;

    if (route.startsWith('program/') || route.startsWith('project/')) {
      const progId = route.replace('program/', '').replace('project/', '');
      return { page: 'program-article' as PageId, programId: progId || 'mental-health' };
    }
    if (route === 'projects') {
      return { page: 'programs' as PageId, programId: 'mental-health' };
    }
    if (route === 'admin' || route === 'admin-login') {
      return { page: route as PageId, programId: 'mental-health' };
    }
    const validPages: PageId[] = [
      'home',
      'about',
      'programs',
      'program-article',
      'transparency',
      'donate',
      'get-involved',
      'contact',
      'admin',
      'admin-login',
    ];
    return {
      page: validPages.includes(route as PageId) ? (route as PageId) : ('home' as PageId),
      programId: 'mental-health',
    };
  };

  const initialState = resolveRoute();
  const [currentPage, setCurrentPage] = useState<PageId>(initialState.page);
  const [selectedProgramId, setSelectedProgramId] = useState<string>(initialState.programId);
  const [currency, setCurrency] = useState<Currency>('GHS');
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial load skeleton simulation for seamless page boot
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      const { page, programId } = resolveRoute();
      setCurrentPage(page);
      if (page === 'program-article') {
        setSelectedProgramId(programId);
      }
    };

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'GHS' ? 'USD' : 'GHS'));
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    if (page === 'home') {
      if (window.location.hash) {
        window.history.pushState(null, '', '/');
      } else if (window.location.pathname !== '/') {
        window.history.pushState(null, '', '/');
      }
    } else {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProgram = (progId: string) => {
    setSelectedProgramId(progId);
    setCurrentPage('program-article');
    window.location.hash = `program/${progId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDonate = () => {
    handleNavigate('donate');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProgram={handleSelectProgram}
            currency={currency}
            onOpenDonateModal={handleOpenDonate}
          />
        );
      case 'about':
        return (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenDonateModal={handleOpenDonate}
          />
        );
      case 'programs':
        return (
          <ProgramsPage
            onNavigate={handleNavigate}
            onSelectProgram={handleSelectProgram}
            onOpenDonateModal={handleOpenDonate}
          />
        );
      case 'program-article':
        return (
          <ProgramArticlePage
            programId={selectedProgramId}
            onNavigate={handleNavigate}
            onSelectProgram={handleSelectProgram}
            currency={currency}
            onToggleCurrency={toggleCurrency}
            onOpenDonateModal={handleOpenDonate}
          />
        );
      case 'transparency':
        return (
          <TransparencyPage
            onNavigate={handleNavigate}
            onOpenDonateModal={handleOpenDonate}
          />
        );
      case 'donate':
        return (
          <DonatePage
            currency={currency}
            onToggleCurrency={toggleCurrency}
            onNavigate={handleNavigate}
          />
        );
      case 'get-involved':
        return (
          <GetInvolvedPage
            onNavigate={handleNavigate}
            onOpenDonateModal={handleOpenDonate}
          />
        );
      case 'contact':
        return <ContactPage />;
      case 'admin-login':
        return <AdminLoginPage onNavigate={handleNavigate} />;
      case 'admin':
        if (!isAuthenticated) {
          return <AdminLoginPage onNavigate={handleNavigate} />;
        }
        return <AdminLayout onNavigateHome={() => handleNavigate('home')} />;
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProgram={handleSelectProgram}
            currency={currency}
            onOpenDonateModal={handleOpenDonate}
          />
        );
    }
  };

  if (isLoading) {
    return <PageSkeleton page={currentPage} />;
  }

  // Admin routes render as a dedicated full-screen console without public navbar/footer
  if (currentPage === 'admin' || currentPage === 'admin-login') {
    return (
      <div className="min-h-screen bg-slate-100 font-['Plus_Jakarta_Sans']">
        {renderCurrentPage()}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-amber-300 selection:text-blue-950 font-['Plus_Jakarta_Sans']">
      {/* Global Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenDonateModal={handleOpenDonate}
      />

      {/* Main Page Content Body */}
      <main className="flex-1">{renderCurrentPage()}</main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenDonateModal={handleOpenDonate}
      />

      {/* Global Giving Modal (Accessible Everywhere) */}
      <DonationModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
        currency={currency}
        onToggleCurrency={toggleCurrency}
      />
    </div>
  );
}

export default App;
