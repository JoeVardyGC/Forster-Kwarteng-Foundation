import React, { useState } from 'react';
import { FOUNDATION_INFO } from '../data/foundationData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  FileDown,
  Globe,
  MessageSquare,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="space-y-0">
      {/* 1. HERO */}
      <section className="bg-gradient-to-b from-[#000080] to-[#0a0a85] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 font-semibold text-xs border border-white/20 mb-4">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight">
            Connect With Our Leadership & Field Team
          </h1>
          <p className="text-base sm:text-lg text-blue-100 mt-4 leading-relaxed">
            Our offices are based in Accra, Ghana. We are eager to answer questions, explore collaborations, and assist communities.
          </p>
        </div>

        {/* Stepped Accent Stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 fkf-step-bar"></div>
      </section>

      {/* 2. CONTACT DETAILS & FORM */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Information Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full">
                  Accra Office
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#000080] mt-3">
                  Reach Out Directly
                </h2>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Call our official hotlines or send a direct email. We respond to inquiries within 24 to 48 business hours.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#000080]">
                      Official Phone Lines
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">Calls & WhatsApp:</p>
                    <div className="mt-1 space-y-0.5 text-xs font-bold text-slate-800">
                      <a href="tel:+233546732812" className="block hover:text-[#000080]">
                        +233 546732812
                      </a>
                      <a href="tel:+233556727083" className="block hover:text-[#000080]">
                        +233 556727083
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#000080] flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-[#000080]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#000080]">
                      Official Email Inquiries
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">General & Institutional:</p>
                    <a
                      href={`mailto:${FOUNDATION_INFO.email}`}
                      className="text-xs font-bold text-slate-800 hover:text-[#000080] block mt-1 break-all"
                    >
                      {FOUNDATION_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#000080]">
                      Headquarters Location
                    </h4>
                    <p className="text-xs text-slate-700 mt-1">
                      {FOUNDATION_INFO.address}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Accra, Greater Accra Region, Ghana
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#000080]">
                      Operating Office Hours
                    </h4>
                    <p className="text-xs text-slate-700 mt-1">
                      {FOUNDATION_INFO.operatingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Press Kit Download Box */}
              <div className="p-5 rounded-2xl bg-[#000080] text-white flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-amber-300">
                    Official Media Kit
                  </h4>
                  <p className="text-xs text-blue-200">
                    Logos, Brand Guidelines & Executive Summary
                  </p>
                </div>
                <button
                  onClick={() => alert('Official FKF Brand Asset Pack downloaded!')}
                  className="px-4 py-2 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Right: Message Form */}
            <div className="lg:col-span-7">
              <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm">
                <h3 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-[#000080] mb-6 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-500" />
                  <span>Send a Direct Message</span>
                </h3>

                {isSent ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-bold font-['Outfit'] text-[#000080]">
                      Message Dispatched!
                    </h4>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto">
                      Medaase, <span className="font-bold">{name}</span>. Your inquiry regarding "{subject}" has been received by our administrative team in Accra.
                    </p>
                    <button
                      onClick={() => setIsSent(false)}
                      className="px-6 py-2.5 rounded-xl bg-[#000080] text-white text-xs font-bold cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Your Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Samuel Kwarteng"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#000080]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="samuel@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#000080]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone Number (Ghana / Int'l)
                        </label>
                        <input
                          type="tel"
                          placeholder="+233 54 673 2812"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#000080]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Department / Topic
                        </label>
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#000080]"
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Donation & Sponsorship">Donation & Sponsorship</option>
                          <option value="Corporate Partnership">Corporate Partnership</option>
                          <option value="Volunteer Opportunities">Volunteer Opportunities</option>
                          <option value="Beneficiary School Nomination">
                            Beneficiary School Nomination
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Message
                      </label>
                      <textarea
                        rows={5}
                        required
                        placeholder="Write your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#000080]"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Dispatch Message to Accra Office</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
