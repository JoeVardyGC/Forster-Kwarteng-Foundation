import { useState, useEffect } from 'react';
import type { PageId, Currency } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DonationModal } from './components/DonationModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { ImpactPage } from './pages/ImpactPage';
import { TransparencyPage } from './pages/TransparencyPage';
import { DonatePage } from './pages/DonatePage';
import { GetInvolvedPage } from './pages/GetInvolvedPage';
import { ContactPage } from './pages/ContactPage';

export function App() {
  const getInitialPage = (): PageId => {
    const hash = window.location.hash.replace('#', '') as PageId;
    const validPages: PageId[] = [
      'home',
      'about',
      'programs',
      'impact',
      'transparency',
      'donate',
      'get-involved',
      'contact',
    ];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [currency, setCurrency] = useState<Currency>('GHS');
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'about',
        'programs',
        'impact',
        'transparency',
        'donate',
        'get-involved',
        'contact',
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      } else if (!hash) {
        setCurrentPage('home');
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

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            currency={currency}
            onOpenDonateModal={() => setIsDonateModalOpen(true)}
          />
        );
      case 'about':
        return (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenDonateModal={() => setIsDonateModalOpen(true)}
          />
        );
      case 'programs':
        return (
          <ProgramsPage
            onNavigate={handleNavigate}
            onOpenDonateModal={() => setIsDonateModalOpen(true)}
          />
        );
      case 'impact':
        return (
          <ImpactPage
            onNavigate={handleNavigate}
            onOpenDonateModal={() => setIsDonateModalOpen(true)}
          />
        );
      case 'transparency':
        return (
          <TransparencyPage
            onNavigate={handleNavigate}
            onOpenDonateModal={() => setIsDonateModalOpen(true)}
          />
        );
      case 'donate':
        return (
          <DonatePage
            currency={currency}
            onToggleCurrency={toggleCurrency}
          />
        );
      case 'get-involved':
        return (
          <GetInvolvedPage
            onNavigate={handleNavigate}
            onOpenDonateModal={() => setIsDonateModalOpen(true)}
          />
        );
      case 'contact':
        return <ContactPage />;
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            currency={currency}
            onOpenDonateModal={() => setIsDonateModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-amber-300 selection:text-blue-950 font-['Plus_Jakarta_Sans']">
      {/* Global Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenDonateModal={() => setIsDonateModalOpen(true)}
      />

      {/* Main Page Content Body */}
      <main className="flex-1">{renderCurrentPage()}</main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenDonateModal={() => setIsDonateModalOpen(true)}
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
