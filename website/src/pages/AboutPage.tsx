import React from 'react';
import type { PageId } from '../types';
import { FOUNDATION_INFO, CORE_VALUES } from '../data/foundationData';
import {
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Award,
  FileText,
  Users,
  Leaf,
  CheckCircle2,
  ArrowRight,
  Heart,
  Target,
  Compass,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenDonateModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenDonateModal }) => {
  const valueIcons: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#000080]" />,
    HeartHandshake: <HeartHandshake className="w-6 h-6 text-[#000080]" />,
    Sparkles: <Sparkles className="w-6 h-6 text-[#000080]" />,
    Award: <Award className="w-6 h-6 text-[#000080]" />,
    FileText: <FileText className="w-6 h-6 text-[#000080]" />,
    Users: <Users className="w-6 h-6 text-[#000080]" />,
    Leaf: <Leaf className="w-6 h-6 text-[#000080]" />,
  };

  return (
    <div className="space-y-0">
      {/* 1. ABOUT HERO BANNER */}
      <section className="bg-gradient-to-b from-[#000080] to-[#0a0a85] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 font-semibold text-xs border border-white/20 mb-4">
            About Forster Kwarteng Foundation
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight">
            Rooted in Purpose. Driven by Impact.
          </h1>
          <p className="text-base sm:text-lg text-blue-100 mt-4 leading-relaxed">
            We are dedicated to building self-reliant communities across Ghana where every child and youth has the education, mentorship, and skills to thrive.
          </p>
        </div>

        {/* Stepped Accent Stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 fkf-step-bar"></div>
      </section>

      {/* 2. OFFICIAL BRAND STATEMENT MANIFESTO */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-50 via-slate-50 to-amber-50/40 rounded-3xl p-8 sm:p-12 border-2 border-blue-100 shadow-sm relative">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-2">
              Official Brand Statement
            </span>
            <blockquote className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#000080] leading-snug">
              "{FOUNDATION_INFO.brandStatement}"
            </blockquote>

            <div className="mt-6 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Registered Non-Profit in Accra, Ghana
              </span>
              <span className="text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full">
                Motto: {FOUNDATION_INFO.motto}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISION & MISSION DEEP-DIVE */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#000080] flex items-center justify-center">
                <Target className="w-6 h-6 text-[#000080]" />
              </div>
              <span className="text-xs font-bold text-[#000080] uppercase tracking-wider block">
                Our Vision
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-slate-900 leading-snug">
                "{FOUNDATION_INFO.vision}"
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                We envision a nation where geography or poverty never caps a young person's potential. By planting roots of opportunity early, we foster long-term self-sufficiency.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Compass className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                Our Mission
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-slate-900 leading-snug">
                "{FOUNDATION_INFO.mission}"
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                Through direct scholarships, visionary youth mentorship, vocational equipment, and health outreaches, we turn empathy into systemic, verifiable action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 7 CORE VALUES SHOWCASE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#000080] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Ethical Pillars
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-[#000080] mt-3">
              Our 7 Guiding Core Values
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              These seven non-negotiable principles inform every dollar spent, every volunteer mobilized, and every community served.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((val) => (
              <div
                key={val.id}
                className="bg-slate-50 hover:bg-white rounded-2xl p-7 border border-slate-200 hover:border-[#000080] hover:shadow-lg transition-all duration-200 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {valueIcons[val.iconName]}
                    </div>
                    <span className="text-2xl font-black text-slate-300 font-['Outfit'] group-hover:text-amber-500 transition-colors">
                      0{val.id}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-['Outfit'] text-[#000080]">
                      {val.name}
                    </h3>
                    <p className="text-xs font-semibold text-amber-600 mb-2">
                      {val.tagline}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Institutional Standard</span>
                </div>
              </div>
            ))}
          </div>

          {/* Institutional Transparency & Governance Callout Banner */}
          <div className="mt-12 bg-gradient-to-r from-blue-900 via-[#000080] to-blue-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                Fiduciary Accountability & Governance
              </span>
              <h3 className="text-2xl font-bold font-['Outfit']">
                84% of Every Cedi Directly Reaches Frontline Programs
              </h3>
              <p className="text-sm text-blue-200/80 max-w-2xl">
                We believe trust is earned through radical clarity. Review our visual fund allocations, downloadable audited reports, and Donor Bill of Rights.
              </p>
            </div>
            <button
              onClick={() => onNavigate('transparency')}
              className="px-6 py-3.5 bg-white text-[#000080] hover:bg-amber-400 hover:text-blue-950 font-bold text-sm rounded-full shadow-md transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>View Financial Transparency</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. OUR 4-STEP OPERATIONAL FRAMEWORK */}
      <section className="py-16 bg-[#000080] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
              How We Deliver Impact
            </span>
            <h2 className="text-3xl font-extrabold font-['Outfit']">
              The FKF 4-Step Social Framework
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Community Needs Assessment',
                desc: 'Collaborating directly with village chiefs, headteachers, and families to identify critical educational or social gaps.',
              },
              {
                step: '02',
                title: 'Targeted Resource Mobilization',
                desc: 'Allocating scholarships, learning supplies, and health equipment with strict fiduciary transparency.',
              },
              {
                step: '03',
                title: 'Direct Field Execution',
                desc: 'Hands-on delivery by vetted staff and local mentors ensuring every item reaches verified beneficiaries.',
              },
              {
                step: '04',
                title: 'Impact Monitoring & Sustainability',
                desc: 'Tracking school attendance, exam performance, and micro-business revenue over 12 to 24 months.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/10 rounded-2xl p-6 border border-white/15 backdrop-blur-sm space-y-3"
              >
                <div className="text-3xl font-black font-['Outfit'] text-amber-400">
                  {item.step}
                </div>
                <h3 className="font-bold text-base font-['Outfit'] text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-extrabold font-['Outfit'] text-[#000080]">
            Partner with Our Vision in Ghana
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Join the Forster Kwarteng Foundation as a donor, volunteer, or institutional partner. Your commitment shapes generations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenDonateModal}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-bold text-sm rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-[#000080]" />
              <span>Make a Donation</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-full transition-all cursor-pointer"
            >
              Contact Leadership
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
