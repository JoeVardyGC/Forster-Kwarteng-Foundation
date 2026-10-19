import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import type { ContactSubmission, VolunteerSubmission } from '../../../types';
import {
  Mail,
  Users,
  Search,
  Trash2,
  CheckCircle,
  Clock,
  Phone,
  MessageSquare,
  ExternalLink,
  Download,
  AlertCircle,
  Eye,
} from 'lucide-react';

export const InboxView: React.FC = () => {
  const {
    contactMessages,
    volunteerSubmissions,
    updateContactStatus,
    deleteContactMessage,
    updateVolunteerStatus,
    deleteVolunteerSubmission,
  } = useData();

  const [activeTab, setActiveTab] = useState<'contact' | 'volunteer'>('contact');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerSubmission | null>(null);

  const unreadContactCount = contactMessages.filter((m) => m.status === 'new').length;
  const unreadVolunteerCount = volunteerSubmissions.filter((v) => v.status === 'new').length;

  // Filter contact messages
  const filteredMessages = contactMessages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter volunteer applications
  const filteredVolunteers = volunteerSubmissions.filter(
    (v) =>
      v.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.skills.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // CSV Export helper
  const exportToCSV = () => {
    if (activeTab === 'contact') {
      const headers = ['Date', 'Name', 'Email', 'Phone', 'Subject', 'Status', 'Message'];
      const rows = contactMessages.map((m) => [
        `"${m.date}"`,
        `"${m.name.replace(/"/g, '""')}"`,
        `"${m.email}"`,
        `"${m.phone}"`,
        `"${m.subject.replace(/"/g, '""')}"`,
        `"${m.status}"`,
        `"${m.message.replace(/"/g, '""')}"`,
      ]);
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `fkf_contact_messages_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const headers = ['Date', 'Full Name', 'Type', 'Email', 'Phone', 'Skills / Interests', 'Status'];
      const rows = volunteerSubmissions.map((v) => [
        `"${v.date}"`,
        `"${v.fullName.replace(/"/g, '""')}"`,
        `"${v.formType}"`,
        `"${v.email}"`,
        `"${v.phone}"`,
        `"${v.skills.replace(/"/g, '""')}"`,
        `"${v.status}"`,
      ]);
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `fkf_volunteer_submissions_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#000080]">
            <Mail className="w-4 h-4 text-[#F5BD02]" />
            Community Communications
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-['Outfit']">
            Submissions Inbox
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Review general contact inquiries and volunteer/partner signups from website visitors.
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs transition-all cursor-pointer flex items-center gap-2"
        >
          <Download className="w-4 h-4 text-[#000080]" />
          <span>Export {activeTab === 'contact' ? 'Messages' : 'Applicants'} (CSV)</span>
        </button>
      </div>

      {/* 2. Sub Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs w-full sm:w-auto">
          <button
            onClick={() => {
              setActiveTab('contact');
              setSelectedMessage(null);
            }}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'contact'
                ? 'bg-[#000080] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Messages</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'contact' ? 'bg-[#F5BD02] text-[#000080]' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {unreadContactCount > 0 ? `${unreadContactCount} new` : contactMessages.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('volunteer');
              setSelectedVolunteer(null);
            }}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'volunteer'
                ? 'bg-[#000080] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Volunteers & Partners</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'volunteer' ? 'bg-[#F5BD02] text-[#000080]' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {unreadVolunteerCount > 0 ? `${unreadVolunteerCount} new` : volunteerSubmissions.length}
            </span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#000080] outline-none bg-white shadow-2xs"
          />
        </div>
      </div>

      {/* 3. Content Table / List */}
      {activeTab === 'contact' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          {filteredMessages.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No messages found.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (msg.status === 'new') {
                      updateContactStatus(msg.id, 'read');
                    }
                  }}
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                    msg.status === 'new' ? 'bg-blue-50/40 font-semibold' : ''
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div
                      className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                        msg.status === 'new' ? 'bg-[#000080]' : msg.status === 'replied' ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {msg.name}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {msg.date}
                        </span>
                      </div>
                      <div className="text-xs text-slate-800 font-medium truncate mt-0.5">
                        {msg.subject}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {msg.message}
                      </div>
                    </div>
                  </div>

                  {/* Status & Quick Actions */}
                  <div className="flex items-center gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={msg.status}
                      onChange={(e) =>
                        updateContactStatus(msg.id, e.target.value as 'new' | 'read' | 'replied')
                      }
                      className="text-[11px] px-2.5 py-1 rounded-lg border border-slate-200 bg-white font-medium cursor-pointer"
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                    </select>

                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                      className="p-2 rounded-lg text-slate-500 hover:text-[#000080] hover:bg-blue-50 transition-colors"
                      title="Send Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => {
                        deleteContactMessage(msg.id);
                        if (selectedMessage?.id === msg.id) {
                          setSelectedMessage(null);
                        }
                      }}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete Message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Volunteer Submissions */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          {filteredVolunteers.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No volunteer or partner applications found.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredVolunteers.map((vol) => (
                <div
                  key={vol.id}
                  onClick={() => {
                    setSelectedVolunteer(vol);
                    if (vol.status === 'new') {
                      updateVolunteerStatus(vol.id, 'reviewed');
                    }
                  }}
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                    vol.status === 'new' ? 'bg-blue-50/40 font-semibold' : ''
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div
                      className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                        vol.status === 'new' ? 'bg-[#000080]' : vol.status === 'contacted' ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {vol.fullName}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold uppercase">
                          {vol.formType}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {vol.date}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                        <strong className="text-slate-800">Skills / Focus:</strong> {vol.skills}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {vol.email} • {vol.phone}
                      </div>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={vol.status}
                      onChange={(e) =>
                        updateVolunteerStatus(vol.id, e.target.value as 'new' | 'reviewed' | 'contacted')
                      }
                      className="text-[11px] px-2.5 py-1 rounded-lg border border-slate-200 bg-white font-medium cursor-pointer"
                    >
                      <option value="new">New</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="contacted">Contacted</option>
                    </select>

                    <a
                      href={`mailto:${vol.email}?subject=Welcome to Forster Kwarteng Foundation Outreach`}
                      className="p-2 rounded-lg text-slate-500 hover:text-[#000080] hover:bg-blue-50 transition-colors"
                      title="Send Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => {
                        deleteVolunteerSubmission(vol.id);
                        if (selectedVolunteer?.id === vol.id) {
                          setSelectedVolunteer(null);
                        }
                      }}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete Application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. DETAILS DRAWER / MODAL FOR CONTACT MESSAGE */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#000080]">
                  Contact Message
                </span>
                <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                  {selectedMessage.subject}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px]">From:</span>
                  <strong className="text-slate-800">{selectedMessage.name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Date:</span>
                  <span className="text-slate-700">{selectedMessage.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Email:</span>
                  <a href={`mailto:${selectedMessage.email}`} className="text-blue-600 hover:underline">
                    {selectedMessage.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Phone:</span>
                  <a href={`tel:${selectedMessage.phone}`} className="text-slate-700">
                    {selectedMessage.phone}
                  </a>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">
                  Message Body
                </label>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  deleteContactMessage(selectedMessage.id);
                  setSelectedMessage(null);
                }}
                className="px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Message</span>
              </button>
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                className="px-4 py-2 rounded-xl bg-[#000080] text-white text-xs font-bold hover:bg-[#00006a] flex items-center gap-1.5 shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Reply by Email</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 5. DETAILS MODAL FOR VOLUNTEER APPLICANT */}
      {selectedVolunteer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#000080]">
                  Application Details
                </span>
                <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                  {selectedVolunteer.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px]">Type:</span>
                  <span className="font-bold text-slate-800 uppercase">{selectedVolunteer.formType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Submission Date:</span>
                  <span className="text-slate-700">{selectedVolunteer.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Email:</span>
                  <a href={`mailto:${selectedVolunteer.email}`} className="text-blue-600 hover:underline">
                    {selectedVolunteer.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Phone:</span>
                  <a href={`tel:${selectedVolunteer.phone}`} className="text-slate-700">
                    {selectedVolunteer.phone}
                  </a>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">
                  Skills, Areas of Interest & Background
                </label>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {selectedVolunteer.skills}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  deleteVolunteerSubmission(selectedVolunteer.id);
                  setSelectedVolunteer(null);
                }}
                className="px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Application</span>
              </button>
              <a
                href={`mailto:${selectedVolunteer.email}?subject=Welcome to the Forster Kwarteng Foundation Team`}
                className="px-4 py-2 rounded-xl bg-[#000080] text-white text-xs font-bold hover:bg-[#00006a] flex items-center gap-1.5 shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Applicant</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
