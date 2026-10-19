import React, { useState, useRef } from 'react';
import type { PageId } from '../types';
import { useData } from '../context/DataContext';
import { uploadImageToStorage } from '../lib/firebase';
import type { BeneficiaryStory } from '../types';
import confetti from 'canvas-confetti';
import {
  Quote,
  MapPin,
  CheckCircle2,
  Heart,
  Plus,
  Send,
  Sparkles,
  Camera,
  Filter,
  ArrowRight,
  ShieldCheck,
  Users,
  GraduationCap,
  Wrench,
  BookOpen,
  Award,
  X,
} from 'lucide-react';

interface StoriesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenDonateModal: () => void;
}

export const StoriesPage: React.FC<StoriesPageProps> = ({
  onNavigate,
  onOpenDonateModal,
}) => {
  const { beneficiaryStories, addStory } = useData();

  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [program, setProgram] = useState('Quality Education & Scholarships');
  const [quote, setQuote] = useState('');
  const [story, setStory] = useState('');
  const [outcome, setOutcome] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [consent, setConsent] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const programOptions = [
    'Quality Education & Scholarships',
    'Skills Acquisition & Vocational Training',
    'Mentorship & Youth Leadership',
    'Girl-Child Literacy & Mentorship',
    'Community Health & Medical Outreach',
    'Community Care & Emergency Relief',
  ];

  const filterOptions = [
    'All',
    'Education & Scholarships',
    'Vocational Training & TVET',
    'Youth Mentorship',
    'Girl-Child Literacy',
  ];

  const filteredStories = beneficiaryStories.filter((s) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Education & Scholarships') {
      return s.program.toLowerCase().includes('education') || s.program.toLowerCase().includes('scholarship');
    }
    if (selectedFilter === 'Vocational Training & TVET') {
      return s.program.toLowerCase().includes('vocational') || s.program.toLowerCase().includes('skills') || s.program.toLowerCase().includes('tvet');
    }
    if (selectedFilter === 'Youth Mentorship') {
      return s.program.toLowerCase().includes('mentorship') || s.program.toLowerCase().includes('leadership');
    }
    if (selectedFilter === 'Girl-Child Literacy') {
      return s.program.toLowerCase().includes('literacy') || s.program.toLowerCase().includes('girl');
    }
    return true;
  });

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const url = await uploadImageToStorage(file, 'beneficiary_submissions');
      setImage(url);
    } catch {
      // Fallback to data URL
      setImage(imagePreview || '/assets/about_story_photo.png');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !story.trim()) return;

    setIsSubmitting(true);

    const newStory: BeneficiaryStory = {
      id: `story-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || 'Community Beneficiary',
      location: location.trim() || 'Ghana',
      program,
      quote: quote.trim() || `"${story.trim().substring(0, 110)}..."`,
      story: story.trim(),
      outcome: outcome.trim() || 'Actively supported by the Forster Kwarteng Foundation',
      image: image || imagePreview || '/assets/orphan_community_outreach.jpg',
    };

    addStory(newStory);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore if confetti not supported
    }

    setIsSubmitting(false);
    setSubmitSuccess(true);

    setTimeout(() => {
      // Reset form
      setName('');
      setRole('');
      setLocation('');
      setQuote('');
      setStory('');
      setOutcome('');
      setImage('');
      setImagePreview(null);
      setSubmitSuccess(false);
      setIsSubmitModalOpen(false);
    }, 2400);
  };

  return (
    <div className="space-y-0 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 1. HERO HEADER */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#000080] via-[#090979] to-[#000052] text-white overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-amber-400/20 text-amber-300 border border-amber-300/30 mb-6 backdrop-blur-md">
            <Heart className="w-3.5 h-3.5 fill-[#F5BD02] text-[#F5BD02]" />
            Grassroots Voices &amp; Real Outcomes
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-['Outfit'] tracking-tight max-w-4xl mx-auto leading-tight">
            Beneficiary Stories &amp; Testimonials
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed font-normal">
            Every scholarship granted, vocational toolkit equipped, and community health camp delivered has a face, a voice, and a transformed family. Read real experiences from our beneficiaries across Ghana.
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-7 py-3.5 rounded-full bg-[#F5BD02] hover:bg-[#e0ac00] text-[#000080] font-black text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Share Your Testimonial / Story</span>
            </button>

            <button
              onClick={onOpenDonateModal}
              className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/25 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-amber-300" />
              <span>Sponsor a Beneficiary</span>
            </button>
          </div>

          {/* Impact Stats Strip */}
          <div className="mt-14 pt-10 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div>
              <div className="text-2xl sm:text-3xl font-black font-['Outfit'] text-white">5,000+</div>
              <div className="text-xs text-blue-200 mt-1">Pupils &amp; Youth Reached</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-['Outfit'] text-amber-300">100%</div>
              <div className="text-xs text-blue-200 mt-1">Direct Grassroots Support</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-['Outfit'] text-white">12+</div>
              <div className="text-xs text-blue-200 mt-1">Communities Supported</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-['Outfit'] text-amber-300">350+</div>
              <div className="text-xs text-blue-200 mt-1">Apprenticeship Toolkits</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STORIES FEED & FILTER SECTION */}
      <section className="py-16 sm:py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls Bar: Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-10 border-b border-slate-200/80">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-slate-900">
                Community Experiences ({filteredStories.length})
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Verified accounts from students, apprentices, parents, and community members.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {filterOptions.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFilter(f)}
                  className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    selectedFilter === f
                      ? 'bg-[#000080] text-white shadow-sm'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mt-10">
            {filteredStories.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#000080]/30 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Container with Location & Program Badges */}
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img
                      src={item.image || '/assets/orphan_boy_classroom.jpg'}
                      alt={`${item.name} — Forster Kwarteng Foundation Beneficiary`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/about_story_photo.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 text-[#000080] backdrop-blur-md shadow-xs">
                        <MapPin className="w-3 h-3 text-amber-500" />
                        <span>{item.location}</span>
                      </span>

                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-[#000080]/90 text-amber-300 backdrop-blur-md shadow-xs">
                        {item.program}
                      </span>
                    </div>

                    {/* Bottom Author Identifier */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-lg sm:text-xl font-extrabold font-['Outfit'] leading-tight">
                        {item.name}
                      </div>
                      <div className="text-xs text-amber-300 font-medium mt-0.5">
                        {item.role}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-8 space-y-4">
                    {/* Pull Quote */}
                    <div className="relative pl-5 border-l-3 border-[#F5BD02]">
                      <Quote className="w-5 h-5 text-amber-400/50 absolute -top-1 -left-2.5 bg-white" />
                      <p className="text-sm sm:text-base font-bold text-slate-800 italic leading-snug">
                        {item.quote}
                      </p>
                    </div>

                    {/* Full Narrative Story */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.story}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Verified Outcome */}
                <div className="px-6 sm:px-8 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="line-clamp-1">{item.outcome}</span>
                  </div>

                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-blue-900 bg-blue-100/60 px-2 py-0.5 rounded-full shrink-0">
                    Verified
                  </span>
                </div>
              </article>
            ))}
          </div>

          {filteredStories.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-700">No stories found in this category</h3>
              <p className="text-xs text-slate-500 mt-1">Be the first to share a testimonial for this pillar!</p>
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#000080] text-white font-bold text-xs hover:bg-[#0a0a85]"
              >
                Share Your Story
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. INVITING TESTIMONIAL BANNER */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-blue-50 via-slate-50 to-amber-50/50 border border-blue-100 p-8 sm:p-12 text-center relative overflow-hidden shadow-sm">
            <div className="max-w-2xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                Your Voice Matters
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold font-['Outfit'] text-[#000080] tracking-tight">
                Has the Forster Kwarteng Foundation Impacted You?
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Whether you received an academic scholarship, learned a vocational craft, attended a health screening, or served as a volunteer — your testimonial inspires global donors and validates our frontline work.
              </p>

              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="px-8 py-3.5 rounded-full bg-[#000080] hover:bg-[#0a0a85] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Submit Your Testimonial</span>
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm border border-slate-200 transition-all cursor-pointer"
                >
                  Contact Foundation Office
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SUBMIT TESTIMONIAL MODAL */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {submitSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black font-['Outfit'] text-slate-900">
                  Thank You for Sharing Your Story!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your testimony has been published and added to our community wall. Thank you for being a living testament to our shared mission!
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#000080] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    Share Your Experience
                  </span>
                  <h3 className="text-2xl font-black font-['Outfit'] text-slate-900 mt-2">
                    Submit Your Testimonial
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Tell us how the Forster Kwarteng Foundation touched your education, career, or community.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Name & Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Kwame Appiah"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080]/20 focus:border-[#000080] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">
                        Your Role / Relationship
                      </label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="e.g. Scholar, TVET Apprentice, Parent"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080]/20 focus:border-[#000080] outline-none"
                      />
                    </div>
                  </div>

                  {/* Location & Program */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">
                        Community / Town in Ghana <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Chorkor, Accra"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080]/20 focus:border-[#000080] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">
                        Program Benefited From
                      </label>
                      <select
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080]/20 focus:border-[#000080] outline-none bg-white text-slate-800"
                      >
                        {programOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Quote / Headline */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Key Quote or Words of Gratitude
                    </label>
                    <input
                      type="text"
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      placeholder='e.g. "FKF restored my education and gave my mother peace of mind."'
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080]/20 focus:border-[#000080] outline-none"
                    />
                  </div>

                  {/* Detailed Story */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Your Story &amp; Experience <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={story}
                      onChange={(e) => setStory(e.target.value)}
                      placeholder="Share what your situation was before, how the Forster Kwarteng Foundation stepped in, and where you are today..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080]/20 focus:border-[#000080] outline-none"
                    />
                  </div>

                  {/* Tangible Outcome */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Concrete Outcome / Achievement
                    </label>
                    <input
                      type="text"
                      value={outcome}
                      onChange={(e) => setOutcome(e.target.value)}
                      placeholder="e.g. Now graduating at the top of my class; started my boutique"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080]/20 focus:border-[#000080] outline-none"
                    />
                  </div>

                  {/* Photo Upload */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Your Photo (Optional)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border border-slate-200"
                      >
                        <Camera className="w-4 h-4 text-[#000080]" />
                        <span>Select Photo</span>
                      </button>

                      {imagePreview && (
                        <div className="flex items-center gap-2">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-9 h-9 rounded-lg object-cover border border-slate-200"
                          />
                          <span className="text-[11px] text-emerald-700 font-medium">Photo attached</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Consent checkbox */}
                  <div className="pt-1 flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      required
                      className="mt-0.5 rounded text-[#000080] focus:ring-[#000080]"
                    />
                    <label htmlFor="consent" className="text-[11px] text-slate-500 leading-tight">
                      I authorize the Forster Kwarteng Foundation to publish my testimonial on their public website to inspire donors and promote social impact.
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsSubmitModalOpen(false)}
                      className="px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !consent}
                      className="px-6 py-2.5 rounded-xl bg-[#000080] hover:bg-[#0a0a85] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Publishing...' : 'Publish Testimonial'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
