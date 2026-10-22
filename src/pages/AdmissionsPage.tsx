import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, Calendar, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { FAQAccordion } from '../components/common/FAQAccordion';

export const AdmissionsPage: React.FC = () => {
  return (
    <div className="bg-brand-light min-h-screen">
      {/* Banner */}
      <section className="bg-brand-black text-white py-20 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
            <span className="w-5 h-[2px] bg-brand-orange"></span>
            ADMISSIONS GUIDE
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            How to Join Greptech Media Academy
          </h1>
          <p className="text-base text-gray-300 max-w-2xl leading-relaxed">
            Everything you need to know about our admission criteria, cohort intake schedule, requirements, and enrollment process.
          </p>
        </div>
      </section>

      {/* Overview & Requirements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-extrabold text-brand-black tracking-tight">
                Admission Criteria & Candidate Profile
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                At Greptech Media Academy, admission is based on creative passion, teachability, and commitment to intensive hands-on training. While prior technical background is welcomed, it is not required for foundational intakes.
              </p>

              <div className="space-y-4 pt-2">
                <h3 className="text-base font-bold text-brand-black">General Eligibility:</h3>
                <ul className="space-y-3">
                  {[
                    'Minimum age requirement: 16 years old',
                    'Basic computer literacy and comfort with digital technology',
                    'Demonstrated passion for photography, filmmaking, design, or audio production',
                    'Willingness to adhere to studio safety, equipment protocols, and teamwork',
                  ].map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-base font-bold text-brand-black">Documents Required to Apply:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-gray-200 bg-brand-light/50 space-y-1">
                    <span className="text-xs font-bold text-brand-black block">1. Passport Photograph</span>
                    <p className="text-[11px] text-gray-500">Recent color passport photo (max 2MB, JPEG or PNG).</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 bg-brand-light/50 space-y-1">
                    <span className="text-xs font-bold text-brand-black block">2. Identification</span>
                    <p className="text-[11px] text-gray-500">Government ID, student ID, or birth certificate details.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Summary Card */}
            <div className="lg:col-span-5 bg-brand-card text-white p-8 rounded-2xl border border-brand-border space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-brand-border pb-3">
                Intake Summary
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex justify-between items-center py-2 border-b border-brand-border/60">
                  <span className="text-gray-400">Duration</span>
                  <span className="font-bold text-white">3 Months Intensive</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-brand-border/60">
                  <span className="text-gray-400">Intake Schedule</span>
                  <span className="font-bold text-white">Quarterly Cohorts</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-brand-border/60">
                  <span className="text-gray-400">Class Format</span>
                  <span className="font-bold text-white">Weekday & Weekend Options</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-brand-border/60">
                  <span className="text-gray-400">Application Fee</span>
                  <span className="font-bold text-brand-orange">Free to Apply Online</span>
                </div>
              </div>

              <div className="pt-2 space-y-2.5">
                <Link
                  to="/apply"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors shadow-md"
                >
                  <span>Start Online Application</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/admissions/status"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-gray-300 bg-brand-black hover:text-white border border-brand-border transition-colors"
                >
                  <span>Already applied? Track your status →</span>
                </Link>
              </div>

              <p className="text-[11px] text-gray-400 text-center">
                Questions? WhatsApp: <span className="text-white font-medium">+234 807 756 6926</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion />
    </div>
  );
};
