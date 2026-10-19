import React, { useState, useRef } from 'react';
import { useData } from '../../../context/DataContext';
import type { UpcomingProjectEvent } from '../../../types';
import {
  Calendar,
  Plus,
  Trash2,
  Edit,
  Clock,
  MapPin,
  Star,
  Check,
  AlertCircle,
  Upload,
  Search,
  Sparkles,
  Users,
} from 'lucide-react';

const PRESET_EVENT_IMAGES = [
  { label: 'Health Camp', url: '/assets/event_health_camp_new.jpg' },
  { label: 'TVET Summit', url: '/assets/event_tvet_summit_new.jpg' },
  { label: 'Community Care', url: '/assets/hero_outreach_right.jpg' },
  { label: 'Classroom Outreach', url: '/assets/hero_boy_right.jpg' },
];

export const EventsView: React.FC = () => {
  const { upcomingEvents, addEvent, updateEvent, deleteEvent, setFeaturedEvent } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingEvent, setEditingEvent] = useState<UpcomingProjectEvent | null>(null);
  const [isNewEvent, setIsNewEvent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<UpcomingProjectEvent | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredEvents = upcomingEvents.filter(
    (e) =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open Create Event Modal
  const handleOpenCreate = () => {
    const newId = `event-${Date.now()}`;
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 14); // 2 weeks out

    const newEv: UpcomingProjectEvent = {
      id: newId,
      title: 'Community Health & Vision Screening',
      category: 'Healthcare & Wellness',
      targetDate: defaultDate.toISOString(),
      formattedDate: defaultDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      time: '09:00 AM - 04:00 PM GMT',
      location: 'Accra Community Center, Greater Accra',
      summary: 'Providing free eye exams, essential medications, and general checkups for underserved children and families.',
      image: '/assets/event_health_camp_new.jpg',
      status: 'Upcoming',
      highlightMetric: {
        value: '300+',
        label: 'Patients Target',
      },
      tags: ['Health', 'Free Care', 'Volunteers Needed'],
    };

    setEditingEvent(newEv);
    setIsNewEvent(true);
    setIsModalOpen(true);
  };

  // Open Edit Event Modal
  const handleOpenEdit = (event: UpcomingProjectEvent) => {
    setEditingEvent({ ...event });
    setIsNewEvent(false);
    setIsModalOpen(true);
  };

  // Save Event
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    if (isNewEvent) {
      addEvent(editingEvent);
    } else {
      updateEvent(editingEvent);
    }
    setIsModalOpen(false);
  };

  // File upload for event image
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (editingEvent) {
        setEditingEvent({ ...editingEvent, image: reader.result as string });
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
            <Calendar className="w-4 h-4 text-[#F5BD02]" />
            Field Calendar & Outreaches
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-['Outfit']">
            Upcoming Events ({upcomingEvents.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Schedule field projects, update countdown dates, and choose which event powers the live homepage countdown clock.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 rounded-xl bg-[#000080] hover:bg-[#00006a] text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-[#F5BD02]" />
            <span>Schedule New Event</span>
          </button>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events by title, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
          />
        </div>

        <div className="text-xs text-slate-500">
          Showing <span className="font-bold text-slate-800">{filteredEvents.length}</span> events
        </div>
      </div>

      {/* 3. Empty State */}
      {upcomingEvents.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#F5BD02] flex items-center justify-center mx-auto">
            <Calendar className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-base font-bold text-slate-900 font-['Outfit']">No Upcoming Events Scheduled</h3>
            <p className="text-xs text-slate-500">
              There are currently no events on the calendar. Schedule an outreach to activate the homepage countdown.
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="px-5 py-2.5 rounded-xl bg-[#000080] text-white font-bold text-xs shadow-md hover:bg-[#00006a] cursor-pointer inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-[#F5BD02]" />
            <span>Schedule First Event</span>
          </button>
        </div>
      ) : (
        /* 4. Events Cards List */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const isFeatured = event.status === 'Featured';

            return (
              <div
                key={event.id}
                className={`bg-white rounded-2xl border transition-all overflow-hidden flex flex-col group ${
                  isFeatured
                    ? 'border-[#000080] ring-2 ring-[#000080]/20 shadow-md'
                    : 'border-slate-200/90 shadow-2xs hover:shadow-md'
                }`}
              >
                {/* Image */}
                <div className="relative h-44 bg-slate-900 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Featured Badge */}
                  {isFeatured && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#F5BD02] text-[#000080] text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                      <Star className="w-3 h-3 fill-[#000080]" />
                      Live Countdown Target
                    </div>
                  )}

                  {/* Date badge */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold text-[#F5BD02] uppercase tracking-wider block">
                      {event.category}
                    </span>
                    <p className="text-xs font-semibold flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-white/80" />
                      {event.formattedDate}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#000080] transition-colors font-['Outfit']">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {event.summary}
                    </p>

                    <div className="pt-1 flex items-center gap-1.5 text-xs text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>

                    {event.highlightMetric && (
                      <div className="pt-2">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-blue-50 text-[#000080] text-[11px] font-bold border border-blue-100">
                          {event.highlightMetric.value} {event.highlightMetric.label}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    {!isFeatured && (
                      <button
                        onClick={() => setFeaturedEvent(event.id)}
                        className="w-full py-1.5 px-3 rounded-lg border border-amber-300 bg-amber-50/50 hover:bg-amber-100/60 text-amber-900 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Star className="w-3.5 h-3.5 text-amber-600" />
                        <span>Set as Homepage Countdown</span>
                      </button>
                    )}

                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleOpenEdit(event)}
                        className="flex-1 px-3 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#000080] border border-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit Details</span>
                      </button>

                      <button
                        onClick={() => setEventToDelete(event)}
                        title="Delete Event"
                        className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. MODAL: CREATE / EDIT EVENT */}
      {isModalOpen && editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#000080]">
                  {isNewEvent ? 'New Outreach' : 'Update Event'}
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                  {editingEvent.title}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingEvent.category}
                    onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingEvent.location}
                    onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Formatted Date String
                  </label>
                  <input
                    type="text"
                    value={editingEvent.formattedDate}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, formattedDate: e.target.value })
                    }
                    placeholder="e.g. Saturday, April 18, 2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Date / Time (for Countdown)
                  </label>
                  <input
                    type="text"
                    value={editingEvent.targetDate}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, targetDate: e.target.value })
                    }
                    placeholder="e.g. 2026-04-18T09:00:00"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Event Summary / Goals
                </label>
                <textarea
                  rows={3}
                  value={editingEvent.summary}
                  onChange={(e) => setEditingEvent({ ...editingEvent, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none"
                />
              </div>

              {/* Cover Image */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Event Cover Photo
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-900 border border-slate-200 shrink-0">
                    <img
                      src={editingEvent.image}
                      alt="Event thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>

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
                      <span>Upload file</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-1">
                  {PRESET_EVENT_IMAGES.map((p) => (
                    <button
                      key={p.url}
                      type="button"
                      onClick={() => setEditingEvent({ ...editingEvent, image: p.url })}
                      className={`p-1 rounded-lg border text-center text-[10px] truncate cursor-pointer ${
                        editingEvent.image === p.url
                          ? 'border-[#000080] bg-blue-50 font-bold text-[#000080]'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status / Featured */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingEvent.status === 'Featured'}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        status: e.target.checked ? 'Featured' : 'Upcoming',
                      })
                    }
                    className="w-4 h-4 rounded text-[#000080] focus:ring-[#000080]"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    Set as Featured Event (drives the homepage live countdown timer)
                  </span>
                </label>
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
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. MODAL: DELETE CONFIRMATION */}
      {eventToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Delete Event from Calendar?
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-800">&apos;{eventToDelete.title}&apos;</strong>? 
              This will remove it from the field projects calendar.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setEventToDelete(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteEvent(eventToDelete.id);
                  setEventToDelete(null);
                }}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 cursor-pointer shadow-md"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
