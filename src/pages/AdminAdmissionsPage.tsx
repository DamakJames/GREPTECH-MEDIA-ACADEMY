import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  BookOpen,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { AdmissionsService, ApplicationRecord } from '../services/admissions.service';

export const AdminAdmissionsPage: React.FC = () => {
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [selectedApp, setSelectedApp] = useState<ApplicationRecord | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [adminNoteInput, setAdminNoteInput] = useState<string>('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    const list = await AdmissionsService.getAllApplications();
    setApplications(list);
    if (list.length > 0 && !selectedApp) {
      setSelectedApp(list[0]);
      setAdminNoteInput(list[0].adminNotes || '');
    }
  };

  const handleSelectApp = (app: ApplicationRecord) => {
    setSelectedApp(app);
    setAdminNoteInput(app.adminNotes || '');
  };

  const handleUpdateStatus = async (newStatus: ApplicationRecord['status']) => {
    if (!selectedApp) return;
    setSaving(true);
    try {
      await AdmissionsService.updateStatus(selectedApp.referenceId, newStatus, adminNoteInput);
      const updated = { ...selectedApp, status: newStatus, adminNotes: adminNoteInput };
      setSelectedApp(updated);
      setApplications((prev) =>
        prev.map((a) => (a.referenceId === selectedApp.referenceId ? updated : a))
      );
    } catch (e) {
      console.error('Update status failed:', e);
    } finally {
      setSaving(false);
    }
  };

  const filteredApps = applications.filter((app) => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !term ||
      app.fullName.toLowerCase().includes(term) ||
      app.referenceId.toLowerCase().includes(term) ||
      app.email.toLowerCase().includes(term);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-brand-light min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
              <Users className="w-4 h-4" />
              <span>FACULTY DASHBOARD</span>
            </div>
            <h1 className="text-3xl font-black text-brand-black tracking-tight">
              Admissions Review Desk
            </h1>
            <p className="text-xs text-gray-500">
              Review applicant portfolios, issue official admission offers, and manage cohort enrollments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admissions/status"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-gray-700 bg-white border border-gray-200 hover:text-brand-orange hover:border-brand-orange transition-colors"
            >
              <span>Public Status Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, reference or email..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-orange"
            />
          </div>

          {/* Status Filter Chips */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {[
              { label: 'All', value: 'all' },
              { label: 'Submitted', value: 'submitted' },
              { label: 'Under Review', value: 'under_review' },
              { label: 'Accepted', value: 'accepted' },
              { label: 'Enrolled', value: 'enrolled' },
              { label: 'Needs Info', value: 'rejected' },
            ].map((st) => (
              <button
                key={st.value}
                onClick={() => setFilterStatus(st.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterStatus === st.value
                    ? 'bg-brand-black text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Applications List */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100 max-h-[750px] overflow-y-auto">
            {filteredApps.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-500">
                No applications match your filter.
              </div>
            ) : (
              filteredApps.map((app) => {
                const isSelected = selectedApp?.referenceId === app.referenceId;
                return (
                  <button
                    key={app.referenceId}
                    onClick={() => handleSelectApp(app)}
                    className={`w-full p-4 text-left transition-colors flex items-start justify-between gap-3 ${
                      isSelected ? 'bg-orange-50/80 border-l-4 border-brand-orange' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                          {app.referenceId}
                        </span>
                        <h4 className="text-sm font-bold text-brand-black">{app.fullName}</h4>
                      </div>
                      <p className="text-xs text-gray-500 capitalize">
                        {app.selectedCourse.replace(/-/g, ' ')}
                      </p>
                      <span className="text-[10px] text-gray-400 block">
                        Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          app.status === 'accepted'
                            ? 'bg-green-100 text-green-800'
                            : app.status === 'under_review'
                            ? 'bg-orange-100 text-brand-orange'
                            : app.status === 'enrolled'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {app.status.replace('_', ' ')}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Right: Detailed Applicant Review Dossier */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
            {selectedApp ? (
              <>
                {/* Dossier Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    {selectedApp.passportPhotoUrl ? (
                      <img
                        src={selectedApp.passportPhotoUrl}
                        alt={selectedApp.fullName}
                        className="w-16 h-16 rounded-xl object-cover ring-2 ring-brand-orange/30 shadow-sm"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                        <User className="w-8 h-8" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-brand-black">{selectedApp.fullName}</h3>
                      <p className="text-xs text-gray-500">{selectedApp.email}</p>
                      <span className="font-mono text-xs text-brand-orange font-bold">
                        {selectedApp.referenceId}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">
                      Current Status
                    </span>
                    <span className="inline-block mt-1 font-bold text-xs uppercase px-3 py-1 rounded-full bg-brand-light text-brand-black border border-gray-200">
                      {selectedApp.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Information Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                    <span className="text-gray-400 font-bold uppercase text-[10px]">Phone Number</span>
                    <p className="font-semibold text-brand-black">{selectedApp.phone}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                    <span className="text-gray-400 font-bold uppercase text-[10px]">Course & Schedule</span>
                    <p className="font-semibold text-brand-black capitalize">
                      {selectedApp.selectedCourse.replace(/-/g, ' ')}
                    </p>
                    <span className="inline-block text-[10px] font-bold text-brand-orange bg-orange-50 px-2 py-0.5 rounded">
                      Track: {selectedApp.selectedDuration || '3 Months (Standard)'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                    <span className="text-gray-400 font-bold uppercase text-[10px]">Experience Level</span>
                    <p className="font-semibold text-brand-black uppercase">
                      {selectedApp.previousExperience}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                    <span className="text-gray-400 font-bold uppercase text-[10px]">Education</span>
                    <p className="font-semibold text-brand-black">
                      {selectedApp.educationalBackground}
                    </p>
                  </div>

                  <div className="sm:col-span-2 p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                    <span className="text-gray-400 font-bold uppercase text-[10px]">Residential Address</span>
                    <p className="font-semibold text-brand-black">{selectedApp.residentialAddress}</p>
                  </div>

                  <div className="sm:col-span-2 p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                    <span className="text-gray-400 font-bold uppercase text-[10px]">Emergency Contact</span>
                    <p className="font-semibold text-brand-black">
                      {selectedApp.emergencyContact.name} ({selectedApp.emergencyContact.relationship}) —{' '}
                      {selectedApp.emergencyContact.phone}
                    </p>
                  </div>
                </div>

                {/* Faculty Decision & Notes */}
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                    Admissions Faculty Evaluation Notes
                  </label>
                  <textarea
                    rows={3}
                    value={adminNoteInput}
                    onChange={(e) => setAdminNoteInput(e.target.value)}
                    placeholder="Enter review notes, portfolio feedback, or interview schedule..."
                    className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-orange"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">
                    Change Application Status
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => handleUpdateStatus('under_review')}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-brand-orange bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-colors"
                    >
                      Set Under Review
                    </button>

                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => handleUpdateStatus('accepted')}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm"
                    >
                      Issue Admission Offer (Accept)
                    </button>

                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => handleUpdateStatus('enrolled')}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-sm"
                    >
                      Mark as Enrolled Student
                    </button>

                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => handleUpdateStatus('rejected')}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
                    >
                      Request Info / Decline
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-20 text-center text-xs text-gray-400">
                Select an applicant from the left column to view their dossier.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

