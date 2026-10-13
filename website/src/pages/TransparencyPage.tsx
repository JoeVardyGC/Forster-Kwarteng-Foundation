import React from 'react';
import type { PageId } from '../types';
import { FINANCIAL_METRICS, FOUNDATION_INFO } from '../data/foundationData';
import {
  ShieldCheck,
  FileText,
  Download,
  CheckCircle2,
  PieChart,
  Scale,
  Lock,
  ArrowRight,
} from 'lucide-react';

interface TransparencyPageProps {
  onNavigate: (page: PageId) => void;
  onOpenDonateModal: () => void;
}

export const TransparencyPage: React.FC<TransparencyPageProps> = ({
  onNavigate,
  onOpenDonateModal,
}) => {
  return (
    <div className="space-y-0">
      {/* 1. HERO */}
      <section className="bg-gradient-to-b from-[#000080] to-[#0a0a85] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 font-semibold text-xs border border-white/20 mb-4">
            Core Values: Integrity & Accountability
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight">
            Financial Stewardship & Radical Transparency
          </h1>
          <p className="text-base sm:text-lg text-blue-100 mt-4 leading-relaxed">
            Every cedi and dollar entrusted to the Forster Kwarteng Foundation is accounted for with uncompromising fidelity and audited oversight.
          </p>
        </div>

        {/* Stepped Accent Stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 fkf-step-bar"></div>
      </section>

      {/* 2. WHERE EVERY CEDI GOES (ALLOCATION BREAKDOWN) */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              84% Directly to Programs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-[#000080] mt-3">
              How Your Donations Are Allocated
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              We maximize frontline social impact by keeping administrative and governance expenses strictly controlled under 5%.
            </p>
          </div>

          {/* Allocation Visual Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="h-6 rounded-full overflow-hidden flex shadow-inner bg-slate-100 p-0.5 border border-slate-200">
              <div
                style={{ width: '84%' }}
                className="bg-[#000080] h-full flex items-center justify-center text-[10px] text-white font-bold"
                title="84% Frontline Programs"
              >
                84% Programs
              </div>
              <div
                style={{ width: '11%' }}
                className="bg-[#F5BD02] h-full flex items-center justify-center text-[10px] text-slate-900 font-bold"
                title="11% Logistics & Outreach"
              >
                11%
              </div>
              <div
                style={{ width: '5%' }}
                className="bg-[#9696CB] h-full flex items-center justify-center text-[10px] text-white font-bold"
                title="5% Admin"
              >
                5%
              </div>
            </div>
          </div>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {FINANCIAL_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: metric.color }}
                  ></span>
                  <span className="text-3xl font-black font-['Outfit'] text-[#000080]">
                    {metric.percentage}%
                  </span>
                </div>

                <h4 className="font-bold text-base text-slate-900 font-['Outfit']">
                  {metric.category}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DOWNLOADABLE ANNUAL REPORTS & AUDITS */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#000080]">
              Audited Reports & Legal Filings
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Download our public statements, registrar certificates, and annual impact filings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: '2025 Annual Impact & Financial Report',
                date: 'January 2026',
                size: '2.4 MB PDF',
              },
              {
                title: 'Independent Auditor’s Report & Balance Sheet',
                date: 'December 2025',
                size: '1.8 MB PDF',
              },
              {
                title: 'Official Non-Profit Registration Certificate (Accra)',
                date: 'Updated 2025',
                size: '850 KB PDF',
              },
            ].map((report, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#000080] flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-[#000080] font-['Outfit']">
                    {report.title}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Published: {report.date} • {report.size}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => alert(`Downloading: ${report.title}`)}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-[#000080] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DONOR BILL OF RIGHTS */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full">
              Our Pledge to You
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#000080] mt-3">
              The FKF Donor Bill of Rights
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
            {[
              'To be informed of the foundation’s mission and the capacity of the organization to use donations effectively.',
              'To be assured that your gifts will be used for the purposes for which they were given.',
              'To receive appropriate acknowledgment and official receipts for all contributions.',
              'To be assured that information about your donation is handled with absolute confidentiality.',
              'To expect that all relationships with individuals representing the foundation will be professional and ethical.',
              'To have access to the foundation’s most recent audited financial statements upon request.',
            ].map((right, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{right}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
