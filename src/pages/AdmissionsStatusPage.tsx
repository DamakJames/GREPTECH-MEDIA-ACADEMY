import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  ArrowRight,
  User,
  BookOpen,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { AdmissionsService, ApplicationRecord } from '../services/admissions.service';

export const AdmissionsStatusPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialRef = searchParams.get('ref') || 'GMA-2026-7842';

  const [referenceId, setReferenceId] = useState(initialRef);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    found: boolean;
    application?: ApplicationRecord;
    message?: string;
  } | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceId.trim()) return;

    setLoading(true);
    try {
      const res = await AdmissionsService.checkStatus(referenceId, email);
      setResult(res);
    } catch (e) {
      console.error(e);
      setResult({ found: false, message: 'Unable to check status at this time.' });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: ApplicationRecord['status']) => {
    switch (status) {
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3.5 h-3.5" />
            Application Received
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-brand-orange border border-orange-200">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            Under Faculty Review
          </span>
        );
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Admission Offer Issued
          </span>
        );
      case 'enrolled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            Officially Enrolled Student
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
            <AlertCircle className="w-3.5 h-3.5" />
            Additional Information Required
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-brand-light min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
            <span className="w-5 h-[2px] bg-brand-orange"></span>
            APPLICANT PORTAL
            <span className="w-5 h-[2px] bg-brand-orange"></span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-black tracking-tight">
            Track Admission Application Status
          </h1>
          <p className="text-sm text-gray-600 max-w-lg mx-auto">
            Check the real-time review progress of your Greptech Media Academy admission application.
          </p>
        </div>

        {/* Lookup Box */}
        <form
          onSubmit={handleLookup}
          className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                Application Reference ID *
              </label>
              <input
                type="text"
                required
                value={referenceId}
                onChange={(e) => setReferenceId(e.target.value)}
                placeholder="e.g. GMA-2026-7842"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-semibold text-brand-black focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-brand-orange uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                Registered Email (Optional verification)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-brand-black focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-brand-orange"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-gray-500">
              Demo sample references: <code className="text-brand-orange font-bold">GMA-2026-7842</code> or <code className="text-brand-orange font-bold">GMA-2026-4190</code>
            </span>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors shadow-md disabled:opacity-70"
            >
              <Search className="w-4 h-4" />
              <span>{loading ? 'Checking Records...' : 'Check Status'}</span>
            </button>
          </div>
        </form>

        {/* Results Card */}
        {result && (
          <div className="animate-in fade-in duration-300">
            {result.found && result.application ? (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-10 space-y-8">
                {/* Status Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                  <div className="space-y-1">
                    <span className="text-xs uppercase font-bold text-gray-400 block">
                      Application Reference
                    </span>
                    <h2 className="text-2xl font-black text-brand-black tracking-tight">
                      {result.application.referenceId}
                    </h2>
                  </div>
                  <div>{getStatusBadge(result.application.status)}</div>
                </div>

                {/* Progress Visual Tracker */}
                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold text-gray-400 block">
                    Review Progression
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-lg bg-orange-100/70 text-brand-orange font-bold border border-brand-orange/30">
                      1. Submitted
                    </div>
                    <div
                      className={`p-2.5 rounded-lg font-bold border ${
                        ['under_review', 'accepted', 'enrolled'].includes(result.application.status)
                          ? 'bg-orange-100/70 text-brand-orange border-brand-orange/30'
                          : 'bg-gray-50 text-gray-400 border-gray-200'
                      }`}
                    >
                      2. Under Review
                    </div>
                    <div
                      className={`p-2.5 rounded-lg font-bold border ${
                        ['accepted', 'enrolled'].includes(result.application.status)
                          ? 'bg-green-100/70 text-green-800 border-green-300'
                          : 'bg-gray-50 text-gray-400 border-gray-200'
                      }`}
                    >
                      3. Offer Issued
                    </div>
                    <div
                      className={`p-2.5 rounded-lg font-bold border ${
                        result.application.status === 'enrolled'
                          ? 'bg-purple-100/70 text-purple-800 border-purple-300'
                          : 'bg-gray-50 text-gray-400 border-gray-200'
                      }`}
                    >
                      4. Enrolled
                    </div>
                  </div>
                </div>

                {/* Applicant Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                    <span className="text-gray-400 font-bold uppercase text-[10px]">
                      Applicant Name
                    </span>
                    <p className="text-sm font-bold text-brand-black">
                      {result.application.fullName}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                    <span className="text-gray-400 font-bold uppercase text-[10px]">
                      Selected Course
                    </span>
                    <p className="text-sm font-bold text-brand-black capitalize">
                      {result.application.selectedCourse.replace(/-/g, ' ')}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                    <span className="text-gray-400 font-bold uppercase text-[10px]">
                      Date Submitted
                    </span>
                    <p className="text-sm font-semibold text-gray-700">
                      {new Date(result.application.submittedAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                    <span className="text-gray-400 font-bold uppercase text-[10px]">
                      Admissions Officer Note
                    </span>
                    <p className="text-sm font-semibold text-brand-orange">
                      {result.application.adminNotes || 'Under faculty assessment.'}
                    </p>
                  </div>
                </div>

                {/* Next Steps Card */}
                {result.application.status === 'accepted' && (
                  <div className="p-6 rounded-xl bg-green-50 border border-green-200 space-y-3">
                    <h3 className="text-base font-bold text-green-900 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      Congratulations! You Have Been Accepted
                    </h3>
                    <p className="text-xs text-green-800 leading-relaxed">
                      Your creative background has been approved for the upcoming cohort. Please check your email for the official admission letter and tuition payment schedule, or contact admissions on WhatsApp.
                    </p>
                    <a
                      href="https://wa.me/2348077566926"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-green-700 hover:text-green-900 underline"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Confirm Enrolment with Admissions Desk on WhatsApp</span>
                    </a>
                  </div>
                )}

                {/* Need Help footer */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>Questions about your application?</span>
                  <a
                    href="https://wa.me/2348077566926"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-brand-orange hover:underline flex items-center gap-1"
                  >
                    <span>Contact Support</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border-2 border-red-200 p-8 text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
                <h3 className="text-lg font-bold text-brand-black">Application Not Found</h3>
                <p className="text-xs text-gray-600 max-w-md mx-auto">
                  {result.message || 'Please verify that your reference number is formatted like GMA-2026-XXXX.'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

