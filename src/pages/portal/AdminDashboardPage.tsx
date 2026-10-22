import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  BookOpen,
  Award,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  Layers,
  Calendar,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-brand-light min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-brand-black text-white rounded-2xl p-6 sm:p-10 border border-brand-border shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-card text-[11px] font-bold text-brand-orange border border-brand-border uppercase tracking-wider">
              <span>ADMINISTRATIVE GOVERNANCE SUITE</span>
              <span>•</span>
              <span>MASTER DESK</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Executive Console — {user?.displayName || 'Administrator'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300">
              Greptech Media Academy Institutional Management & Operations
            </p>
          </div>

          <div className="flex flex-wrap gap-3 relative z-10">
            <Link
              to="/admin/admissions"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors shadow-brand-glow"
            >
              <Users className="w-4 h-4" />
              <span>Admissions Review Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Executive Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-gray-400">Total Applications</span>
              <div className="w-8 h-8 rounded-lg bg-orange-100/70 text-brand-orange flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <span className="text-3xl font-black text-brand-black block">142</span>
            <Link
              to="/admin/admissions"
              className="text-xs font-bold text-brand-orange hover:underline inline-flex items-center gap-1"
            >
              <span>Review Incoming (Stage 3)</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-gray-400">Active Students</span>
              <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <span className="text-3xl font-black text-brand-black block">64</span>
            <span className="text-xs text-gray-500 font-medium block">Across 7 Disciplines</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-gray-400">Active Programs</span>
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <span className="text-3xl font-black text-brand-black block">7</span>
            <span className="text-xs text-gray-500 font-medium block">In-Studio & Weekend Tracks</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-gray-400">Verified Credentials</span>
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <span className="text-3xl font-black text-brand-black block">38</span>
            <Link
              to="/certificate/verify/GMA-SAMPLE-2026"
              className="text-xs font-bold text-brand-orange hover:underline inline-flex items-center gap-1"
            >
              <span>Public Verification</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Administration Control Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-brand-black flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-orange" />
              <span>Admissions Management</span>
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Review applicant portfolios, issue official admission letters, and confirm enrolled cohorts.
            </p>
            <Link
              to="/admin/admissions"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-black hover:bg-gray-800 transition-colors w-full justify-center"
            >
              <span>Open Admissions Desk</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-orange" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-brand-black flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-orange" />
              <span>Cohorts & Schedules</span>
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Manage cohort start dates, studio lab room assignments, and weekend executive tracks.
            </p>
            <button
              type="button"
              onClick={() => alert('Cohort schedule manager will be enabled in Stage 7 (Admin Dashboard).')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-brand-black bg-gray-100 hover:bg-gray-200 transition-colors w-full justify-center"
            >
              <span>Manage Cohorts</span>
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-brand-black flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-orange" />
              <span>Security & Certificates</span>
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Issue tamper-proof graduation certificates backed by unique cryptographic hashes and QR codes.
            </p>
            <Link
              to="/certificate/verify"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-brand-black bg-gray-100 hover:bg-gray-200 transition-colors w-full justify-center"
            >
              <span>Certificate Registry</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
