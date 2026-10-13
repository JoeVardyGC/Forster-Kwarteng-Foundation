import React, { useState } from 'react';
import type { PageId } from '../types';
import {
  Users,
  Briefcase,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Camera,
  Stethoscope,
  Heart,
} from 'lucide-react';

interface GetInvolvedPageProps {
  onNavigate: (page: PageId) => void;
  onOpenDonateModal: () => void;
}

export const GetInvolvedPage: React.FC<GetInvolvedPageProps> = ({
  onNavigate,
  onOpenDonateModal,
}) => {
  const [formType, setFormType] = useState<'volunteer' | 'partner'>('volunteer');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [skills, setSkills] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-0">
      {/* 1. HERO */}
      <section className="bg-gradient-to-b from-[#000080] to-[#0a0a85] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 font-semibold text-xs border border-white/20 mb-4">
            Collaboration & Community
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight">
            Join Hands to Empower Lives Across Ghana
          </h1>
          <p className="text-base sm:text-lg text-blue-100 mt-4 leading-relaxed">
            Your skills, time, and institutional resources can amplify our reach to thousands of underserved children and youth.
          </p>
        </div>

        {/* Stepped Accent Stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 fkf-step-bar"></div>
      </section>

      {/* 2. THREE PATHWAYS TO INVOLVEMENT */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#000080] flex items-center justify-center">
                <Users className="w-6 h-6 text-[#000080]" />
              </div>
              <h3 className="font-bold text-xl font-['Outfit'] text-[#000080]">
                Become a Volunteer
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Join our weekend school outreaches, tutor students in basic STEM and literacy, or help organize community health camps in Accra.
              </p>
              <button
                onClick={() => setFormType('volunteer')}
                className="text-xs font-bold text-[#000080] hover:text-amber-600 flex items-center gap-1 cursor-pointer pt-2"
              >
                <span>Fill Volunteer Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-xl font-['Outfit'] text-[#000080]">
                Corporate / CSR Partner
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Align your company’s corporate social responsibility initiatives with measurable education and youth vocational programs in Ghana.
              </p>
              <button
                onClick={() => setFormType('partner')}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer pt-2"
              >
                <span>Inquire for Partnership</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-xl font-['Outfit'] text-[#000080]">
                Community Ambassador
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Champion our cause in your diaspora church, university, or professional network to fundraise for specific rural school projects.
              </p>
              <button
                onClick={onOpenDonateModal}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer pt-2"
              >
                <span>Start a Campaign</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. APPLICATION FORM */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-10">
            <div className="text-center mb-8">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full">
                Get Involved
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#000080] mt-3">
                {formType === 'volunteer'
                  ? 'Volunteer Application Form'
                  : 'Corporate Partnership Proposal'}
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Tell us about yourself or your organization and we will connect within 48 hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-['Outfit'] text-[#000080]">
                  Application Received!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you, <span className="font-bold">{fullName}</span>. Our volunteer coordinator in Accra has received your profile and will contact you via {phone || email}.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#000080] text-white text-xs font-bold cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-6">
                  <button
                    type="button"
                    onClick={() => setFormType('volunteer')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer ${
                      formType === 'volunteer'
                        ? 'bg-white text-[#000080] shadow-sm'
                        : 'text-slate-600'
                    }`}
                  >
                    Volunteer Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormType('partner')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer ${
                      formType === 'partner'
                        ? 'bg-white text-[#000080] shadow-sm'
                        : 'text-slate-600'
                    }`}
                  >
                    Institutional / Corporate
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {formType === 'volunteer' ? 'Full Name' : 'Contact Person / Title'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Yaw Antwi"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#000080]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="yaw@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#000080]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number (Ghana / International)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+233 54 673 2812"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#000080]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {formType === 'volunteer'
                      ? 'Areas of Interest & Skills (Teaching, Mentorship, Health, Media)'
                      : 'Organization Details & Scope of Proposed Partnership'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={
                      formType === 'volunteer'
                        ? 'e.g. I am an experienced high school math teacher available for Saturday student tutoring in Accra.'
                        : 'e.g. We are an Accra-based logistics firm interested in sponsoring school book supplies across 5 schools.'
                    }
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#000080]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
