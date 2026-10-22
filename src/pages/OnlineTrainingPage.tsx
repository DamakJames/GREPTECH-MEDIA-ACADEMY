import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Video, MessageSquare, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

export const OnlineTrainingPage: React.FC = () => {
  return (
    <div className="bg-brand-light min-h-screen">
      {/* Banner */}
      <section className="bg-brand-black text-white py-20 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
            <span className="w-5 h-[2px] bg-brand-orange"></span>
            FLEXIBLE LEARNING
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Online & Hybrid Training
          </h1>
          <p className="text-base text-gray-300 max-w-2xl leading-relaxed">
            Gain industry-standard media competencies from anywhere through our interactive virtual classrooms, live mentor feedback, and remote project reviews.
          </p>
        </div>
      </section>

      {/* Online Pillars */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-brand-black tracking-tight">
              Virtual Learning Built for Creatives
            </h2>
            <p className="text-sm text-gray-600">
              We eliminated passive lecture videos. Our online model is built around weekly project deadlines, direct screen-sharing critiques, and live mentor access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-light p-8 rounded-2xl border border-gray-200 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-brand-orange">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-black">Live Interactive Masterclasses</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Connect weekly via live video streams for real-time breakdowns of lighting setups, timeline workflows, and audio mixing techniques.
              </p>
            </div>

            <div className="bg-brand-light p-8 rounded-2xl border border-gray-200 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-brand-orange">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-black">1-on-1 Creative Critiques</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Upload your raw project edits, photo retouches, or audio stems. Mentors deliver frame-by-frame video critiques directly to your dashboard.
              </p>
            </div>

            <div className="bg-brand-light p-8 rounded-2xl border border-gray-200 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-brand-orange">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-black">Verifiable Certification</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Online and hybrid graduates undergo the exact same rigorous capstone assessments and earn the same authentic Greptech credentials.
              </p>
            </div>
          </div>

          {/* Callout */}
          <div className="bg-brand-card text-white rounded-2xl p-8 sm:p-12 border border-brand-border flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <h3 className="text-2xl font-bold text-white">
                Ready to Learn Online with Greptech?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Select 'Online / Hybrid' as your preferred format when filling out your admission application.
              </p>
            </div>

            <Link
              to="/apply"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors shadow-brand-glow shrink-0"
            >
              <span>Apply for Online Cohort</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
