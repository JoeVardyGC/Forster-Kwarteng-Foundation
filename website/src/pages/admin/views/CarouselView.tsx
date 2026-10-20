import React, { useState, useRef } from 'react';
import { useData } from '../../../context/DataContext';
import type { HeroSlide } from '../../../types';
import { uploadImageToStorage } from '../../../lib/firebase';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Edit3,
  Eye,
  Upload,
  Check,
  AlertCircle,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';

const PRESET_IMAGES = [
  { label: 'Boy in Classroom', url: '/assets/hero_boy_right.jpg' },
  { label: 'Girls Reading Club', url: '/assets/hero_girls_right.jpg' },
  { label: 'Community Outreach', url: '/assets/hero_outreach_right.jpg' },
  { label: 'Youth Group Empowerment', url: '/assets/hero_group_right.jpg' },
  { label: 'Education Sponsorship', url: '/assets/hero_education_new.jpg' },
  { label: 'Literacy Mentorship', url: '/assets/hero_literacy_new.jpg' },
  { label: 'TVET Practical Training', url: '/assets/hero_tvet_new.jpg' },
  { label: 'Community Care Relief', url: '/assets/hero_community_new.jpg' },
];

export const CarouselView: React.FC = () => {
  const { heroSlides, addHeroSlide, updateHeroSlide, deleteHeroSlide, reorderHeroSlides } = useData();

  // Selected slide for editing
  const [selectedSlideId, setSelectedSlideId] = useState<string | number>(
    heroSlides.length > 0 ? heroSlides[0].id : ''
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState<HeroSlide | null>(null);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  const currentSlide = heroSlides.find((s) => String(s.id) === String(selectedSlideId)) || heroSlides[0];

  // State for Add New Slide modal
  const [newSlide, setNewSlide] = useState<Omit<HeroSlide, 'id'>>({
    image: '/assets/hero_education_new.jpg',
    pillar: `Pillar 0${(heroSlides.length + 1).toString().padStart(2, '0')} • New Initiative`,
    headlinePrefix: '‘Empowering Communities,',
    headlineHighlight: 'Transforming Lives’',
    description: 'Providing education, livelihood mastery, and community safety nets across Ghana.',
    tag: 'Community Empowerment',
    title: 'Transforming Ghanaian Lives',
  });

  // Handle local image file upload for current editing slide
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isModal = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }

    uploadImageToStorage(file, 'hero-carousel')
      .then((url) => {
        if (isModal) {
          setNewSlide((prev) => ({ ...prev, image: url }));
        } else if (currentSlide) {
          updateHeroSlide(currentSlide.id, { image: url });
        }
      })
      .catch(() => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          if (isModal) {
            setNewSlide((prev) => ({ ...prev, image: result }));
          } else if (currentSlide) {
            updateHeroSlide(currentSlide.id, { image: result });
          }
        };
        reader.readAsDataURL(file);
      });
  };

  // Move slide up
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...heroSlides];
    const temp = newOrder[index - 1];
    newOrder[index - 1] = newOrder[index];
    newOrder[index] = temp;
    reorderHeroSlides(newOrder);
  };

  // Move slide down
  const handleMoveDown = (index: number) => {
    if (index === heroSlides.length - 1) return;
    const newOrder = [...heroSlides];
    const temp = newOrder[index + 1];
    newOrder[index + 1] = newOrder[index];
    newOrder[index] = temp;
    reorderHeroSlides(newOrder);
  };

  // Handle add submit
  const handleCreateSlide = (e: React.FormEvent) => {
    e.preventDefault();
    addHeroSlide(newSlide);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8">
      {/* 1. Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#000080]">
            <Layers className="w-4 h-4 text-[#F5BD02]" />
            Homepage Presentation
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-['Outfit']">
            Scrolling Hero Carousel
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Update the high-impact photos, headline titles, and descriptions that welcome visitors on the homepage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-[#000080] hover:bg-[#00006a] text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-[#F5BD02]" />
            <span>Add New Slide</span>
          </button>
        </div>
      </div>

      {/* 2. Main Workspace: Slides List + Active Editor/Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Slide Cards Order list */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Carousel Slides ({heroSlides.length})
            </h3>
            <span className="text-xs text-slate-500">Auto-cycles on homepage</span>
          </div>

          <div className="space-y-3">
            {heroSlides.map((slide, idx) => {
              const isSelected = currentSlide && currentSlide.id === slide.id;
              return (
                <div
                  key={slide.id}
                  onClick={() => setSelectedSlideId(slide.id)}
                  className={`group relative p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                    isSelected
                      ? 'bg-blue-50/70 border-[#000080] shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                    <img
                      src={slide.image}
                      alt={slide.title || 'Hero Slide'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold">
                      #{idx + 1}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-[#000080] truncate uppercase tracking-wider">
                      {slide.pillar || slide.tag || `Slide 0${idx + 1}`}
                    </p>
                    <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">
                      {slide.headlinePrefix} {slide.headlineHighlight}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {slide.description}
                    </p>
                  </div>

                  {/* Reorder and Delete Controls */}
                  <div className="flex flex-col items-center gap-1 shrink-0 ml-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleMoveUp(idx)}
                      disabled={idx === 0}
                      title="Move Up"
                      className="p-1 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-600 transition-colors"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveDown(idx)}
                      disabled={idx === heroSlides.length - 1}
                      title="Move Down"
                      className="p-1 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-600 transition-colors"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Delete trigger */}
                  <div className="shrink-0 pl-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setSlideToDelete(slide)}
                      disabled={heroSlides.length <= 1}
                      title={heroSlides.length <= 1 ? "Cannot delete the only slide" : "Delete Slide"}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Slide Editor & Live Visual Preview */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          {/* Sub tabs: Editor vs Live Preview */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/60">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">
                Editing Slide #{heroSlides.findIndex((s) => s.id === currentSlide?.id) + 1}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#000080]/10 text-[#000080] font-bold">
                Live Synchronized
              </span>
            </div>

            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'editor'
                    ? 'bg-[#000080] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Form Editor</span>
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'preview'
                    ? 'bg-[#000080] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live Preview</span>
              </button>
            </div>
          </div>

          {currentSlide ? (
            <div className="p-6">
              {activeTab === 'editor' ? (
                <div className="space-y-6">
                  {/* Image Replacement Section */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                      Background Image
                    </label>

                    {/* Current preview and upload triggers */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <div className="relative w-full sm:w-48 h-32 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shrink-0 shadow-xs">
                        <img
                          src={currentSlide.image}
                          alt="Hero Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                          <span className="text-[10px] text-white/90 font-medium truncate">
                            Active Image
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-2.5 w-full">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, false)}
                          className="hidden"
                        />

                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 hover:border-[#000080] bg-white text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs hover:bg-slate-50 cursor-pointer"
                        >
                          <Upload className="w-4 h-4 text-[#000080]" />
                          <span>Upload Image from Device</span>
                        </button>

                        <div className="text-[11px] text-slate-400 text-center">or paste image URL below:</div>

                        <input
                          type="text"
                          value={currentSlide.image}
                          onChange={(e) =>
                            updateHeroSlide(currentSlide.id, { image: e.target.value })
                          }
                          placeholder="e.g. /assets/hero_boy_right.jpg or https://..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] focus:border-transparent outline-none font-mono"
                        />
                      </div>
                    </div>

                    {/* Quick Preset Selector */}
                    <div>
                      <div className="text-[11px] font-semibold text-slate-500 mb-2">
                        Quick Select from Foundation Asset Library:
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {PRESET_IMAGES.map((preset) => {
                          const isActive = currentSlide.image === preset.url;
                          return (
                            <button
                              key={preset.url}
                              type="button"
                              onClick={() =>
                                updateHeroSlide(currentSlide.id, { image: preset.url })
                              }
                              className={`p-1.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                                isActive
                                  ? 'border-[#000080] bg-blue-50/60 ring-1 ring-[#000080]'
                                  : 'border-slate-200 hover:border-slate-300 bg-white'
                              }`}
                            >
                              <img
                                src={preset.url}
                                alt={preset.label}
                                className="w-8 h-8 rounded-lg object-cover shrink-0"
                              />
                              <span className="text-[10px] font-medium text-slate-700 truncate">
                                {preset.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Slide Content Fields */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Pillar / Category Label
                        </label>
                        <input
                          type="text"
                          value={currentSlide.pillar || ''}
                          onChange={(e) =>
                            updateHeroSlide(currentSlide.id, { pillar: e.target.value })
                          }
                          placeholder="Pillar 01 • Education Sponsorship"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Tag Badge Text
                        </label>
                        <input
                          type="text"
                          value={currentSlide.tag || ''}
                          onChange={(e) =>
                            updateHeroSlide(currentSlide.id, { tag: e.target.value })
                          }
                          placeholder="Educational Sponsorship"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Headline Prefix (White Text)
                        </label>
                        <input
                          type="text"
                          value={currentSlide.headlinePrefix}
                          onChange={(e) =>
                            updateHeroSlide(currentSlide.id, { headlinePrefix: e.target.value })
                          }
                          placeholder="‘Every Child Deserves"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Headline Highlight (Gold Text)
                        </label>
                        <input
                          type="text"
                          value={currentSlide.headlineHighlight}
                          onChange={(e) =>
                            updateHeroSlide(currentSlide.id, { headlineHighlight: e.target.value })
                          }
                          placeholder="A Desk & A Dream’"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none font-bold text-amber-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Slide Description / Sub-copy
                      </label>
                      <textarea
                        rows={3}
                        value={currentSlide.description}
                        onChange={(e) =>
                          updateHeroSlide(currentSlide.id, { description: e.target.value })
                        }
                        placeholder="Equipping orphaned and vulnerable school children across Ghana with textbooks, uniforms, and scholarships."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Supporting Title
                      </label>
                      <input
                        type="text"
                        value={currentSlide.title || ''}
                        onChange={(e) =>
                          updateHeroSlide(currentSlide.id, { title: e.target.value })
                        }
                        placeholder="Dignity & Hope in the Classroom"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Changes save automatically
                    </span>

                    <button
                      type="button"
                      onClick={() => setActiveTab('preview')}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview Rendering</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Live Preview Mode */
                <div className="space-y-4">
                  <div className="relative w-full aspect-16/9 rounded-2xl overflow-hidden bg-slate-950 shadow-inner flex flex-col justify-end p-6 sm:p-8">
                    {/* Background photo */}
                    <img
                      src={currentSlide.image}
                      alt="Hero background"
                      className="absolute inset-0 w-full h-full object-cover object-right"
                    />

                    {/* Gradient scrim matching homepage hero */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

                    {/* Content overlay */}
                    <div className="relative z-10 max-w-lg space-y-3">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#F5BD02]/20 text-[#F5BD02] font-extrabold text-[10px] tracking-wider uppercase border border-[#F5BD02]/30">
                        {currentSlide.pillar || currentSlide.tag || 'Hero Slide'}
                      </span>

                      <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] tracking-tight leading-tight">
                        {currentSlide.headlinePrefix}{' '}
                        <span className="text-[#F5BD02] block">{currentSlide.headlineHighlight}</span>
                      </h2>

                      <p className="text-xs text-slate-200 line-clamp-3 leading-relaxed">
                        {currentSlide.description}
                      </p>

                      <div className="pt-2 flex items-center gap-3">
                        <span className="px-4 py-2 rounded-full bg-[#F5BD02] text-[#000080] font-bold text-xs flex items-center gap-1.5 shadow-md">
                          <span>Support Our Mission</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                        <span className="px-4 py-2 rounded-full bg-white/20 text-white font-bold text-xs border border-white/20">
                          Explore Programs
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 text-center">
                    This preview approximates the desktop display of the homepage carousel.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400">No slide selected.</div>
          )}
        </div>
      </div>

      {/* 3. MODAL: ADD NEW SLIDE */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                  Add New Carousel Slide
                </h3>
                <p className="text-xs text-slate-500">
                  Configure headline typography and select an imagery asset.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSlide} className="mt-6 space-y-4">
              {/* Image Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Background Image
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-900 border border-slate-200 shrink-0">
                    <img
                      src={newSlide.image}
                      alt="New Slide preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <input
                      ref={modalFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, true)}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => modalFileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Choose file</span>
                    </button>
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-4 gap-2">
                  {PRESET_IMAGES.slice(0, 4).map((p) => (
                    <button
                      key={p.url}
                      type="button"
                      onClick={() => setNewSlide((prev) => ({ ...prev, image: p.url }))}
                      className={`p-1 rounded-lg border text-center text-[10px] font-medium truncate cursor-pointer ${
                        newSlide.image === p.url
                          ? 'border-[#000080] bg-blue-50 text-[#000080]'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pillar Label
                  </label>
                  <input
                    type="text"
                    required
                    value={newSlide.pillar}
                    onChange={(e) => setNewSlide({ ...newSlide, pillar: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tag
                  </label>
                  <input
                    type="text"
                    required
                    value={newSlide.tag}
                    onChange={(e) => setNewSlide({ ...newSlide, tag: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Headline Prefix
                  </label>
                  <input
                    type="text"
                    required
                    value={newSlide.headlinePrefix}
                    onChange={(e) =>
                      setNewSlide({ ...newSlide, headlinePrefix: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Headline Highlight
                  </label>
                  <input
                    type="text"
                    required
                    value={newSlide.headlineHighlight}
                    onChange={(e) =>
                      setNewSlide({ ...newSlide, headlineHighlight: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none font-bold text-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  required
                  value={newSlide.description}
                  onChange={(e) =>
                    setNewSlide({ ...newSlide, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newSlide.title}
                  onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#000080] text-white text-xs font-bold hover:bg-[#00006a] cursor-pointer shadow-md"
                >
                  Publish Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. MODAL: DELETE CONFIRMATION */}
      {slideToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Delete Carousel Slide?
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Are you sure you want to remove this slide? It will immediately stop appearing on the homepage.
            </p>

            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3 text-left">
              <img
                src={slideToDelete.image}
                alt="Slide to delete"
                className="w-12 h-10 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-800 truncate">
                  {slideToDelete.headlinePrefix} {slideToDelete.headlineHighlight}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {slideToDelete.pillar || slideToDelete.tag}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setSlideToDelete(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Keep Slide
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteHeroSlide(slideToDelete.id);
                  setSlideToDelete(null);
                }}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 cursor-pointer shadow-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
