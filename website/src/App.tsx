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

  const getInitialState = () => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('program/') || hash.startsWith('project/')) {
      const progId = hash.replace('program/', '').replace('project/', '');
      return { page: 'program-article' as PageId, programId: progId || 'mental-health' };
    }
    if (hash === 'projects') {
      return { page: 'programs' as PageId, programId: 'mental-health' };
    }
    if (hash === 'admin' || hash === 'admin-login') {
      return { page: hash as PageId, programId: 'mental-health' };
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
      page: validPages.includes(hash as PageId) ? (hash as PageId) : ('home' as PageId),
      programId: 'mental-health',
    };
  };

  const initialState = getInitialState();
  const [currentPage, setCurrentPage] = useState<PageId>(initialState.page);
  const [selectedProgramId, setSelectedProgramId] = useState<string>(initialState.programId);
  const [currency, setCurrency] = useState<Currency>('GHS');
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial load skeleton simulation for seamless page boot
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 650);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('program/') || hash.startsWith('project/')) {
        const progId = hash.replace('program/', '').replace('project/', '');
        setSelectedProgramId(progId || 'mental-health');
        setCurrentPage('program-article');
      } else if (hash === 'projects') {
        setCurrentPage('programs');
      } else {
        const validPages: PageId[] = [
          'home',
          'about',
          'programs',
          'transparency',
          'donate',
          'get-involved',
          'contact',
          'admin',
          'admin-login',
        ];
        if (validPages.includes(hash as PageId)) {
          setCurrentPage(hash as PageId);
        } else if (!hash) {
          setCurrentPage('home');
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'GHS' ? 'USD' : 'GHS'));
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
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
