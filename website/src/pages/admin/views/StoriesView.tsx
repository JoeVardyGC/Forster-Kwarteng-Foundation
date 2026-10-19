import React, { useState, useRef } from 'react';
import { useData } from '../../../context/DataContext';
import type { BeneficiaryStory } from '../../../types';
import {
  Quote,
  Plus,
  Trash2,
  Edit,
  Search,
  Upload,
  MapPin,
  Sparkles,
  AlertCircle,
  Heart,
} from 'lucide-react';

export const StoriesView: React.FC = () => {
  const { beneficiaryStories, addStory, updateStory, deleteStory } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingStory, setEditingStory] = useState<BeneficiaryStory | null>(null);
  const [isNewStory, setIsNewStory] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState<BeneficiaryStory | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredStories = beneficiaryStories.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.story.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenCreate = () => {
    const newId = `story-${Date.now()}`;
    const newSt: BeneficiaryStory = {
      id: newId,
      name: 'Kofi Mensah',
      role: 'Vocational Scholar & Apprentice',
      location: 'Kumasi, Ashanti Region',
      program: 'TVET & Youth Livelihoods',
      story: 'Through the TVET initiative, Kofi gained hands-on technical training and electrical wiring certifications, enabling him to launch his own enterprise.',
      quote: 'The scholarship didn’t just pay for tools; it showed me that my dreams are valid and achievable.',
      image: '/assets/about_story_photo.png',
      outcome: 'Employed & Mentoring 3 new apprentices',
    };

    setEditingStory(newSt);
    setIsNewStory(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (story: BeneficiaryStory) => {
    setEditingStory({ ...story });
    setIsNewStory(false);
    setIsModalOpen(true);
  };

  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStory) return;

    if (isNewStory) {
      addStory(editingStory);
    } else {
      updateStory(editingStory);
    }
    setIsModalOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (editingStory) {
        setEditingStory({ ...editingStory, image: reader.result as string });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      {/* 1. Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#000080]">
            <Quote className="w-4 h-4 text-[#F5BD02]" />
            Human Impact & Voices
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-['Outfit']">
            Beneficiary Stories ({beneficiaryStories.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Spotlight real student journeys, parent testimonials, and grassroots transformations across Ghana.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-[#000080] hover:bg-[#00006a] text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-[#F5BD02]" />
          <span>Add New Story</span>
        </button>
      </div>

      {/* 2. Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search stories by beneficiary name, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
          />
        </div>
      </div>

      {/* 3. Stories Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => (
          <div
            key={story.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col group"
          >
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-amber-300 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-[#000080] uppercase tracking-wider block truncate">
                      {story.program}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 truncate font-['Outfit']">
                      {story.name}
                    </h3>
                    <p className="text-xs text-slate-500 truncate">{story.role}</p>
                  </div>
                </div>

                <div className="relative bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs text-slate-700 italic leading-relaxed">
                  &ldquo;{story.quote}&rdquo;
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {story.story}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span className="truncate">{story.location}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleOpenEdit(story)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#000080] border border-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Story</span>
                </button>

                <button
                  onClick={() => setStoryToDelete(story)}
                  title="Delete Story"
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. MODAL: EDIT / CREATE */}
      {isModalOpen && editingStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                {isNewStory ? 'Add Beneficiary Story' : 'Edit Story'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveStory} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Beneficiary Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingStory.name}
                    onChange={(e) => setEditingStory({ ...editingStory, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Role / Subtitle
                  </label>
                  <input
                    type="text"
                    value={editingStory.role}
                    onChange={(e) => setEditingStory({ ...editingStory, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Program Pillar
                  </label>
                  <input
                    type="text"
                    value={editingStory.program}
                    onChange={(e) => setEditingStory({ ...editingStory, program: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingStory.location}
                    onChange={(e) => setEditingStory({ ...editingStory, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Featured Quote *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingStory.quote}
                  onChange={(e) => setEditingStory({ ...editingStory, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Story Description
                </label>
                <textarea
                  rows={3}
                  value={editingStory.story}
                  onChange={(e) => setEditingStory({ ...editingStory, story: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                />
              </div>

              {/* Photo */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Beneficiary Photo
                </label>
                <div className="flex items-center gap-3">
                  <img
                    src={editingStory.image}
                    alt={editingStory.name}
                    className="w-14 h-14 rounded-full object-cover border border-slate-200"
                  />
                  <div className="flex-1 space-y-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#000080]" />
                      <span>Upload Photo</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#000080] text-white text-xs font-bold hover:bg-[#00006a] cursor-pointer shadow-md"
                >
                  Save Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. MODAL: DELETE */}
      {storyToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Delete Beneficiary Story?
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Are you sure you want to remove <strong className="text-slate-800">&apos;{storyToDelete.name}&apos;</strong>?
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setStoryToDelete(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteStory(storyToDelete.id);
                  setStoryToDelete(null);
                }}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 cursor-pointer shadow-md"
              >
                Delete Story
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
