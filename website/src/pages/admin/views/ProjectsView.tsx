import React, { useState, useRef } from 'react';
import { useData } from '../../../context/DataContext';
import { uploadImageToStorage } from '../../../lib/firebase';
import type {
  FoundationProgram,
  ProgramArticle,
  ProgramGalleryItem,
  ProgramVideoInfo,
} from '../../../types';
import {
  FolderKanban,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Search,
  Upload,
  Image as ImageIcon,
  Video,
  AlertCircle,
  Check,
  X,
  Sparkles,
  Layers,
  Quote,
  Eye,
  Film,
} from 'lucide-react';

const PRESET_COVERS = [
  { label: 'Education Sponsorship', url: '/assets/project_capacity_building_new.jpg' },
  { label: 'Community Outreach', url: '/assets/project_community_outreach_new.jpg' },
  { label: 'Mental Health & Wellbeing', url: '/assets/project_mental_health_new.jpg' },
  { label: 'Skills Training & Vocational', url: '/assets/project_skills_training_new.jpg' },
  { label: 'STEM & TVET Innovation', url: '/assets/project_stem_tvet_new.jpg' },
  { label: 'Classroom Boy', url: '/assets/hero_boy_right.jpg' },
];

export const ProjectsView: React.FC = () => {
  const { programs, programArticles, addProject, updateProject, deleteProject } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingProgram, setEditingProgram] = useState<FoundationProgram | null>(null);
  const [editingArticle, setEditingArticle] = useState<ProgramArticle | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<FoundationProgram | null>(null);

  // Active sub-tab inside the editor modal
  const [modalTab, setModalTab] = useState<'basics' | 'media' | 'content'>('basics');

  // Video toggle in editor
  const [hasVideo, setHasVideo] = useState(false);

  // File upload refs
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // Filtered programs
  const filteredPrograms = programs.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open modal for Creating a new project
  const handleOpenCreate = () => {
    const newId = `project-${Date.now()}`;
    const newProg: FoundationProgram = {
      id: newId,
      title: 'New Community Initiative',
      description: 'Comprehensive intervention delivering educational supplies, mentorship, and community empowerment.',
      image: '/assets/project_community_outreach_new.jpg',
      linkText: 'Explore Project Story',
    };

    const newArt: ProgramArticle = {
      id: newId,
      title: 'New Community Initiative',
      category: 'Education & Community',
      readTime: '4 min read',
      publishedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      location: 'Accra & Central Region, Ghana',
      summary: 'Supporting vulnerable families with direct relief, educational scholarships, and sustainable skills.',
      coverImage: '/assets/project_community_outreach_new.jpg',
      coverImageCaption: 'Volunteers and community leaders during the project launch.',
      impactStats: [
        { value: '500+', label: 'Beneficiaries Reached', description: 'Students and households supported' },
        { value: '100%', label: 'Grassroots Delivery', description: 'Direct community deployment' },
      ],
      challenge: {
        headline: 'Bridging the resource gap for underserved youth',
        body: [
          'In many rural and semi-urban communities, lack of educational materials prevents promising children from staying in school.',
          'Through collaborative community efforts, this initiative ensures no child is left behind due to economic barriers.',
        ],
      },
      intervention: {
        title: 'Strategic Delivery Model',
        description: 'Our two-tier execution combines immediate supplies with long-term mentorship.',
        phases: [
          { phase: 'Phase 01', title: 'Community Assessment', description: 'Identifying high-need households and schools' },
          { phase: 'Phase 02', title: 'Direct Distribution', description: 'Deploying educational kits and supplies' },
        ],
      },
      beneficiaryQuote: {
        quote: 'This program brought light back into our household when we felt forgotten.',
        author: 'Esi Mensah',
        role: 'Parent & Community Member',
        location: 'Central Region, Ghana',
        image: '/assets/about_story_photo.png',
        outcome: 'Child enrolled with full textbook support',
      },
      gallery: [],
      sdgBadges: [
        { number: '04', title: 'Quality Education', color: '#c5192d' },
        { number: '01', title: 'No Poverty', color: '#e5243b' },
      ],
      donationTiers: [
        { amountGHS: 250, amountUSD: 25, label: 'Student Kit', impact: 'Provides one semester of supplies' },
        { amountGHS: 1000, amountUSD: 90, label: 'Classroom Sponsor', impact: 'Equips 5 students with uniforms & books' },
      ],
      relatedProgramIds: [],
    };

    setEditingProgram(newProg);
    setEditingArticle(newArt);
    setHasVideo(false);
    setIsNewProject(true);
    setModalTab('basics');
    setIsModalOpen(true);
  };

  // Open modal for Editing existing project
  const handleOpenEdit = (program: FoundationProgram) => {
    setEditingProgram({ ...program });
    const existingArticle = programArticles[program.id] || {
      id: program.id,
      title: program.title,
      category: 'Community & Education',
      readTime: '4 min read',
      publishedDate: 'Recent',
      location: 'Ghana',
      summary: program.description,
      coverImage: program.image,
      coverImageCaption: program.title,
      impactStats: [{ value: '500+', label: 'Supported', description: 'Direct beneficiaries' }],
      challenge: {
        headline: 'Community Need',
        body: [program.description],
      },
      intervention: {
        title: 'Intervention Plan',
        description: 'Providing sustainable resources.',
        phases: [],
      },
      beneficiaryQuote: {
        quote: 'A life-changing opportunity.',
        author: 'Beneficiary',
        role: 'Community Member',
        image: program.image,
        outcome: 'Positive impact',
      },
      gallery: [],
      sdgBadges: [{ number: '04', title: 'Quality Education', color: '#c5192d' }],
      donationTiers: [],
      relatedProgramIds: [],
    };

    setEditingArticle({ ...existingArticle });
    setHasVideo(!!existingArticle.video);
    setIsNewProject(false);
    setModalTab('basics');
    setIsModalOpen(true);
  };

  // Save changes
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProgram || !editingArticle) return;

    // Prepare article with video inclusion or removal
    const finalArticle: ProgramArticle = {
      ...editingArticle,
      title: editingProgram.title,
      coverImage: editingProgram.image,
      summary: editingProgram.description,
    };
    if (hasVideo && editingArticle.video?.title) {
      finalArticle.video = editingArticle.video;
    } else {
      delete finalArticle.video;
    }

    if (isNewProject) {
      addProject(editingProgram, finalArticle);
    } else {
      updateProject(editingProgram, finalArticle);
    }

    setIsModalOpen(false);
  };

  // Cover image file upload handler
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadImageToStorage(file, 'projects')
      .then((url) => {
        setEditingProgram((prev) => (prev ? { ...prev, image: url } : prev));
        setEditingArticle((prev) => (prev ? { ...prev, coverImage: url } : prev));
      })
      .catch(() => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          setEditingProgram((prev) => (prev ? { ...prev, image: dataUrl } : prev));
          setEditingArticle((prev) => (prev ? { ...prev, coverImage: dataUrl } : prev));
        };
        reader.readAsDataURL(file);
      });
  };

  // Add gallery image
  const handleAddGalleryImage = (url: string, caption = '') => {
    if (!editingArticle) return;
    const newGallery = [...(editingArticle.gallery || []), { url, caption: caption || 'Project activity' }];
    setEditingArticle({ ...editingArticle, gallery: newGallery });
  };

  // Upload gallery image from file
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadImageToStorage(file, 'project-gallery')
      .then((url) => {
        handleAddGalleryImage(url, file.name.replace(/\.[^/.]+$/, ''));
      })
      .catch(() => {
        const reader = new FileReader();
        reader.onload = () => {
          handleAddGalleryImage(reader.result as string, file.name.replace(/\.[^/.]+$/, ''));
        };
        reader.readAsDataURL(file);
      });
  };

  // Remove gallery image
  const handleRemoveGalleryImage = (index: number) => {
    if (!editingArticle || !editingArticle.gallery) return;
    const newGallery = editingArticle.gallery.filter((_, i) => i !== index);
    setEditingArticle({ ...editingArticle, gallery: newGallery });
  };

  return (
    <div className="space-y-8">
      {/* 1. Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#000080]">
            <FolderKanban className="w-4 h-4 text-[#F5BD02]" />
            Program Portfolio Management
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-['Outfit']">
            Projects & Pillars ({programs.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Create, update, attach media galleries and video reels, or safely delete projects from the live website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 rounded-xl bg-[#000080] hover:bg-[#00006a] text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-[#F5BD02]" />
            <span>Create New Project</span>
          </button>
        </div>
      </div>

      {/* 2. Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by title or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
          />
        </div>

        <div className="text-xs text-slate-500">
          Showing <span className="font-bold text-slate-800">{filteredPrograms.length}</span> of {programs.length} projects
        </div>
      </div>

      {/* 3. Empty State if 0 projects */}
      {programs.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#F5BD02] flex items-center justify-center mx-auto">
            <FolderKanban className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-base font-bold text-slate-900 font-['Outfit']">No Projects Currently Active</h3>
            <p className="text-xs text-slate-500">
              All projects have been removed. The public website is currently displaying the graceful empty state.
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="px-5 py-2.5 rounded-xl bg-[#000080] text-white font-bold text-xs shadow-md hover:bg-[#00006a] cursor-pointer inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-[#F5BD02]" />
            <span>Create Your First Project</span>
          </button>
        </div>
      ) : (
        /* 4. Projects Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => {
            const article = programArticles[program.id];
            const galleryCount = article?.gallery?.length || 0;
            const hasVideoAttached = !!article?.video;

            return (
              <div
                key={program.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col group"
              >
                {/* Cover Photo */}
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* ID Badge */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono font-bold">
                    {program.id}
                  </span>

                  {/* Media tags */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 flex-wrap">
                    {galleryCount > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-white text-[10px] font-medium border border-white/20">
                        <ImageIcon className="w-3 h-3 text-[#F5BD02]" />
                        {galleryCount} Gallery {galleryCount === 1 ? 'Photo' : 'Photos'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/40 text-slate-300 text-[10px]">
                        No gallery photos
                      </span>
                    )}

                    {hasVideoAttached ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/80 backdrop-blur-xs text-white text-[10px] font-bold">
                        <Film className="w-3 h-3" />
                        Video Attached
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/40 text-slate-300 text-[10px]">
                        No video
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    {article?.category && (
                      <span className="text-[10px] font-bold text-[#000080] uppercase tracking-wider">
                        {article.category}
                      </span>
                    )}
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#000080] transition-colors font-['Outfit']">
                      {program.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {program.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenEdit(program)}
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#000080] border border-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit & Media</span>
                    </button>

                    <button
                      onClick={() => setProjectToDelete(program)}
                      title="Delete Project"
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. MODAL: EDIT / CREATE PROJECT */}
      {isModalOpen && editingProgram && editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#000080]">
                  {isNewProject ? 'New Entry' : 'Editing Project'}
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                  {editingProgram.title || 'Untitled Project'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Stepped Sub-Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-100 py-3 overflow-x-auto">
              <button
                type="button"
                onClick={() => setModalTab('basics')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  modalTab === 'basics'
                    ? 'bg-[#000080] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>1. Overview & Cover</span>
              </button>
              <button
                type="button"
                onClick={() => setModalTab('media')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  modalTab === 'media'
                    ? 'bg-[#000080] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>2. Media Gallery & Video</span>
              </button>
              <button
                type="button"
                onClick={() => setModalTab('content')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  modalTab === 'content'
                    ? 'bg-[#000080] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Quote className="w-3.5 h-3.5" />
                <span>3. Story & Impact</span>
              </button>
            </div>

            {/* Form Body (Scrollable) */}
            <form onSubmit={handleSaveProject} className="flex-1 overflow-y-auto py-4 space-y-6 pr-1">
              {/* TAB 1: BASICS & COVER */}
              {modalTab === 'basics' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProgram.title}
                        onChange={(e) => {
                          setEditingProgram({ ...editingProgram, title: e.target.value });
                          setEditingArticle({ ...editingArticle, title: e.target.value });
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Category / Theme
                      </label>
                      <input
                        type="text"
                        value={editingArticle.category}
                        onChange={(e) =>
                          setEditingArticle({ ...editingArticle, category: e.target.value })
                        }
                        placeholder="Education, TVET, Mental Health..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Deployment Location
                      </label>
                      <input
                        type="text"
                        value={editingArticle.location}
                        onChange={(e) =>
                          setEditingArticle({ ...editingArticle, location: e.target.value })
                        }
                        placeholder="Accra, Kumasi, Central Region..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Reading Time
                      </label>
                      <input
                        type="text"
                        value={editingArticle.readTime}
                        onChange={(e) =>
                          setEditingArticle({ ...editingArticle, readTime: e.target.value })
                        }
                        placeholder="4 min read"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Summary / Short Description *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={editingProgram.description}
                      onChange={(e) => {
                        setEditingProgram({ ...editingProgram, description: e.target.value });
                        setEditingArticle({ ...editingArticle, summary: e.target.value });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none leading-relaxed"
                    />
                  </div>

                  {/* Cover Photo */}
                  <div className="space-y-3 pt-2">
                    <label className="block text-xs font-bold text-slate-700">
                      Cover Photo
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="w-36 h-24 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shrink-0">
                        <img
                          src={editingProgram.image}
                          alt="Cover"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 space-y-2 w-full">
                        <input
                          ref={coverFileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleCoverUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => coverFileInputRef.current?.click()}
                          className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5 text-[#000080]" />
                          <span>Upload From Device</span>
                        </button>

                        <input
                          type="text"
                          value={editingProgram.image}
                          onChange={(e) => {
                            setEditingProgram({ ...editingProgram, image: e.target.value });
                            setEditingArticle({ ...editingArticle, coverImage: e.target.value });
                          }}
                          placeholder="or paste image URL"
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono"
                        />
                      </div>
                    </div>

                    {/* Presets */}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
                      {PRESET_COVERS.map((preset) => (
                        <button
                          key={preset.url}
                          type="button"
                          onClick={() => {
                            setEditingProgram({ ...editingProgram, image: preset.url });
                            setEditingArticle({ ...editingArticle, coverImage: preset.url });
                          }}
                          className={`p-1 rounded-lg border text-left cursor-pointer transition-all ${
                            editingProgram.image === preset.url
                              ? 'border-[#000080] ring-1 ring-[#000080]'
                              : 'border-slate-200'
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.label}
                            className="w-full h-10 object-cover rounded-md"
                          />
                          <span className="block text-[9px] font-medium text-slate-600 truncate mt-1">
                            {preset.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MEDIA GALLERY & VIDEO (Completely Optional) */}
              {modalTab === 'media' && (
                <div className="space-y-6">
                  {/* Photo Gallery Section */}
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4 text-[#000080]" />
                          Dynamic Photo Gallery (Optional)
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Add multiple field photos to the article page. If left empty, no gallery will be shown.
                        </p>
                      </div>

                      <div>
                        <input
                          ref={galleryFileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleGalleryUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => galleryFileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5 text-[#000080]" />
                          <span>Add Photo</span>
                        </button>
                      </div>
                    </div>

                    {(!editingArticle.gallery || editingArticle.gallery.length === 0) ? (
                      <div className="p-6 text-center text-slate-400 text-xs border border-dashed border-slate-300 rounded-xl bg-white">
                        No gallery photos attached yet. Click &apos;Add Photo&apos; to upload field pictures.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {editingArticle.gallery.map((photo, pIdx) => (
                          <div
                            key={pIdx}
                            className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3 relative group"
                          >
                            <img
                              src={photo.url}
                              alt={photo.caption}
                              className="w-16 h-14 object-cover rounded-lg shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <input
                                type="text"
                                value={photo.caption}
                                onChange={(e) => {
                                  const newGal = [...(editingArticle.gallery || [])];
                                  newGal[pIdx].caption = e.target.value;
                                  setEditingArticle({ ...editingArticle, gallery: newGal });
                                }}
                                placeholder="Photo caption..."
                                className="w-full text-xs border-b border-slate-200 focus:border-[#000080] outline-none py-1"
                              />
                              <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                                Photo #{pIdx + 1}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveGalleryImage(pIdx)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Video Feature Section */}
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Video className="w-4 h-4 text-[#000080]" />
                          Video Feature (Optional)
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Attach a video documentary or interview to this project page.
                        </p>
                      </div>

                      {/* Video Toggle */}
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasVideo}
                          onChange={(e) => {
                            setHasVideo(e.target.checked);
                            if (e.target.checked && !editingArticle.video) {
                              setEditingArticle({
                                ...editingArticle,
                                video: {
                                  title: `${editingProgram.title} Field Documentary`,
                                  duration: '3:45 min',
                                  thumbnail: editingProgram.image,
                                  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                                  description: 'Watch the full transformation story on the ground.',
                                },
                              });
                            }
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#000080]"></div>
                      </label>
                    </div>

                    {hasVideo && editingArticle.video && (
                      <div className="space-y-3 pt-2 bg-white p-4 rounded-xl border border-slate-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Video Title
                            </label>
                            <input
                              type="text"
                              value={editingArticle.video.title}
                              onChange={(e) =>
                                setEditingArticle({
                                  ...editingArticle,
                                  video: { ...editingArticle.video!, title: e.target.value },
                                })
                              }
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Duration
                            </label>
                            <input
                              type="text"
                              value={editingArticle.video.duration}
                              onChange={(e) =>
                                setEditingArticle({
                                  ...editingArticle,
                                  video: { ...editingArticle.video!, duration: e.target.value },
                                })
                              }
                              placeholder="e.g. 3:45 min"
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Video URL (YouTube or direct link)
                          </label>
                          <input
                            type="text"
                            value={editingArticle.video.videoUrl || ''}
                            onChange={(e) =>
                              setEditingArticle({
                                ...editingArticle,
                                video: { ...editingArticle.video!, videoUrl: e.target.value },
                              })
                            }
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Video Description
                          </label>
                          <input
                            type="text"
                            value={editingArticle.video.description}
                            onChange={(e) =>
                              setEditingArticle({
                                ...editingArticle,
                                video: { ...editingArticle.video!, description: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: CONTENT, IMPACT & QUOTE */}
              {modalTab === 'content' && (
                <div className="space-y-4">
                  {/* Challenge Headline */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Problem / Challenge Headline
                    </label>
                    <input
                      type="text"
                      value={editingArticle.challenge.headline}
                      onChange={(e) =>
                        setEditingArticle({
                          ...editingArticle,
                          challenge: { ...editingArticle.challenge, headline: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                    />
                  </div>

                  {/* Impact Stats */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <label className="block text-xs font-bold text-slate-800">
                      Key Impact Metrics
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {editingArticle.impactStats.map((stat, sIdx) => (
                        <div key={sIdx} className="bg-white p-3 rounded-xl border border-slate-200 space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={stat.value}
                              onChange={(e) => {
                                const newStats = [...editingArticle.impactStats];
                                newStats[sIdx].value = e.target.value;
                                setEditingArticle({ ...editingArticle, impactStats: newStats });
                              }}
                              placeholder="e.g. 500+"
                              className="px-2 py-1 text-xs font-bold border border-slate-200 rounded-lg"
                            />
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => {
                                const newStats = [...editingArticle.impactStats];
                                newStats[sIdx].label = e.target.value;
                                setEditingArticle({ ...editingArticle, impactStats: newStats });
                              }}
                              placeholder="e.g. Students"
                              className="px-2 py-1 text-xs border border-slate-200 rounded-lg"
                            />
                          </div>
                          <input
                            type="text"
                            value={stat.description}
                            onChange={(e) => {
                              const newStats = [...editingArticle.impactStats];
                              newStats[sIdx].description = e.target.value;
                              setEditingArticle({ ...editingArticle, impactStats: newStats });
                            }}
                            placeholder="Supporting note..."
                            className="w-full px-2 py-1 text-[11px] border border-slate-200 rounded-lg text-slate-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Beneficiary Quote */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <label className="block text-xs font-bold text-slate-800">
                      Featured Beneficiary Story Quote
                    </label>
                    <div className="space-y-3 bg-white p-3 rounded-xl border border-slate-200">
                      <textarea
                        rows={2}
                        value={editingArticle.beneficiaryQuote.quote}
                        onChange={(e) =>
                          setEditingArticle({
                            ...editingArticle,
                            beneficiaryQuote: { ...editingArticle.beneficiaryQuote, quote: e.target.value },
                          })
                        }
                        placeholder="Quote text..."
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={editingArticle.beneficiaryQuote.author}
                          onChange={(e) =>
                            setEditingArticle({
                              ...editingArticle,
                              beneficiaryQuote: { ...editingArticle.beneficiaryQuote, author: e.target.value },
                            })
                          }
                          placeholder="Author Name"
                          className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg"
                        />
                        <input
                          type="text"
                          value={editingArticle.beneficiaryQuote.role}
                          onChange={(e) =>
                            setEditingArticle({
                              ...editingArticle,
                              beneficiaryQuote: { ...editingArticle.beneficiaryQuote, role: e.target.value },
                            })
                          }
                          placeholder="Role (e.g. Student)"
                          className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-2">
                  {modalTab !== 'content' ? (
                    <button
                      type="button"
                      onClick={() =>
                        setModalTab(modalTab === 'basics' ? 'media' : 'content')
                      }
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer"
                    >
                      Next Step →
                    </button>
                  ) : null}

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#000080] hover:bg-[#00006a] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 text-[#F5BD02]" />
                    <span>{isNewProject ? 'Publish Project' : 'Save Changes'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. MODAL: DELETE CONFIRMATION (CRUCIAL USER REQUIREMENT) */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Delete Project from Website?
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-800">&apos;{projectToDelete.title}&apos;</strong>? 
              This will immediately remove it from the Programs page, homepage links, and the detailed article view.
            </p>

            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3 text-left">
              <img
                src={projectToDelete.image}
                alt={projectToDelete.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-800 truncate">
                  {projectToDelete.title}
                </div>
                <div className="text-[10px] text-slate-400 font-mono truncate">
                  ID: {projectToDelete.id}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteProject(projectToDelete.id);
                  setProjectToDelete(null);
                }}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 cursor-pointer shadow-md"
              >
                Yes, Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
