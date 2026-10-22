import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  CheckSquare,
  Clock,
  BookOpen,
  Calendar,
  MessageSquare,
  Award,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const InstructorDashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-brand-light min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="bg-brand-black text-white rounded-2xl p-6 sm:p-10 border border-brand-border shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-card text-[11px] font-bold text-brand-orange border border-brand-border uppercase tracking-wider">
              <span>INSTRUCTOR FACULTY PORTAL</span>
              <span>•</span>
              <span>ACADEMIC TERM 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Instructor Desk — {user?.displayName || 'Faculty Member'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300">
              Department: Visual Arts & Cinematography • Lead Studio Mentor
            </p>
          </div>

          <div className="flex flex-wrap gap-3 relative z-10">
            <Link
              to="/admin/admissions"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-card hover:bg-brand-border border border-brand-border transition-colors"
            >
              <span>Admissions Review</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <span className="text-[10px] uppercase font-bold text-gray-400">Assigned Cohorts</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-brand-black">2</span>
              <span className="text-xs text-brand-orange font-bold">Active</span>
            </div>
            <span className="text-[11px] text-gray-400 block">CINE-2026A & PHOTO-2026B</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <span className="text-[10px] uppercase font-bold text-gray-400">Enrolled Students</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-brand-black">28</span>
              <span className="text-xs text-green-600 font-bold">100% Active</span>
            </div>
            <span className="text-[11px] text-gray-400 block">Studio capacity: 30</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <span className="text-[10px] uppercase font-bold text-gray-400">Grading Queue</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-brand-orange">4</span>
              <span className="text-xs text-orange-600 font-bold">Pending Review</span>
            </div>
            <span className="text-[11px] text-gray-400 block">Lighting Project Monologues</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <span className="text-[10px] uppercase font-bold text-gray-400">Next Masterclass</span>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-black text-brand-black">Tomorrow 10am</span>
            </div>
            <span className="text-[11px] text-gray-400 block">Production Studio A</span>
          </div>
        </div>

        {/* Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Submissions to Grade */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-brand-orange" />
                <h2 className="text-lg font-bold text-brand-black">Pending Assignment Reviews</h2>
              </div>
              <span className="text-xs text-brand-orange font-bold">4 Submissions</span>
            </div>

            <div className="space-y-3">
              {[
                {
                  student: 'Samuel Adeleke',
                  project: 'Dramatic 2-Point Lighting Portrait Monologue',
                  submitted: '2 hours ago',
                  file: 'Monologue_Cut_v2.mp4',
                },
                {
                  student: 'Blessing Okafor',
                  project: 'Golden Hour Camera Blocking & Gimbal Movement',
                  submitted: 'Yesterday',
                  file: 'Gimbal_Test_Final.mov',
                },
                {
                  student: 'Tariq Al-Hassan',
                  project: 'Foley Pit Surface Textures (Gravel & Concrete)',
                  submitted: 'Yesterday',
                  file: 'Foley_Cues_01.wav',
                },
              ].map((sub, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-brand-black">{sub.student}</h4>
                      <span className="text-[10px] text-gray-400">• {sub.submitted}</span>
                    </div>
                    <p className="text-xs text-gray-600">{sub.project}</p>
                    <span className="text-[11px] font-mono text-brand-orange block">
                      Attachment: {sub.file}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert('Grading and feedback modal will be linked in Stage 6 (LMS).')}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors shadow-sm shrink-0"
                  >
                    Grade & Feedback
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Attendance Logger & Broadcast */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Attendance */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-bold text-brand-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Calendar className="w-4 h-4 text-brand-orange" />
                <span>Quick Studio Attendance</span>
              </h3>
              <p className="text-xs text-gray-500">
                Log attendance for today's physical studio session with one click.
              </p>
              <button
                type="button"
                onClick={() => alert('Attendance logged for today session.')}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-brand-black hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Launch Attendance Register</span>
                <ArrowRight className="w-4 h-4 text-brand-orange" />
              </button>
            </div>

            {/* Broadcast Announcement */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-bold text-brand-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <MessageSquare className="w-4 h-4 text-brand-orange" />
                <span>Cohort Announcement</span>
              </h3>
              <textarea
                rows={3}
                placeholder="Message all students in Cinematography Cohort 2026A..."
                className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-orange"
              />
              <button
                type="button"
                onClick={() => alert('Announcement sent to student learning portals.')}
                className="w-full py-2 rounded-xl text-xs font-bold text-brand-orange bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-colors"
              >
                Broadcast to Students
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
