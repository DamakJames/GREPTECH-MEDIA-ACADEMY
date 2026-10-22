import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Compass, Award, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-brand-light min-h-screen">
      {/* Hero Banner */}
      <section className="bg-brand-black text-white py-20 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
            <span className="w-5 h-[2px] bg-brand-orange"></span>
            ABOUT GREPTECH
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Pioneering Practical Media Education
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
            We are closing the gap between academic theory and real-world commercial creative production.
          </p>
        </div>
      </section>

      {/* Main Philosophy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl font-extrabold text-brand-black tracking-tight leading-tight">
                Our Story & Institutional Purpose
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Greptech Media Academy was established to solve a critical industry challenge: traditional educational institutions teach abstract media history, while the modern market demands tactile technical fluency with cinema cameras, studio lighting, audio mixing desks, and live broadcast protocols.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                At Greptech, our students spend 80% of their learning time behind viewfinders, inside acoustically treated vocal booths, at color grading panels, and in production control rooms. They are mentored by active practitioners who understand the nuance of commercial client delivery.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  '100% Practical, studio-based learning environment',
                  'Dedicated access to commercial-tier production equipment',
                  'Mentorship from active film directors and creative leads',
                  'Output focused on commercial client portfolio reels',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                    <span className="text-xs font-semibold text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80"
                  alt="Photography Studio Training"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-brand-light border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-brand-black tracking-tight">
              Our Core Institutional Pillars
            </h2>
            <p className="text-sm text-gray-600">
              The guiding ethos behind every masterclass, studio lab, and syllabus module.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-brand-orange">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-black">Tactile Craftsmanship</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We believe true mastery is forged through muscle memory and continuous physical practice on professional camera gear and consoles.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-brand-orange">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-black">Commercial Relevance</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Our syllabus evolves continuously to match actual commercial briefs, advertising industry demands, and current streaming standards.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-brand-orange">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-black">Creative Integrity</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We instill onset discipline, professional responsibility, client relationship ethics, and intellectual property respect in all graduates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 bg-brand-black text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl font-black text-white">Join the Next Cohort</h2>
          <p className="text-sm text-gray-400">
            Limited seats are available per cohort to guarantee direct access to studio equipment.
          </p>
          <div>
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors shadow-brand-glow"
            >
              <span>Apply Online</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
