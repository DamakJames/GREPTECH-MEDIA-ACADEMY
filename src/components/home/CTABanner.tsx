import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const CTABanner: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-[#F56B0A] to-[#E05A00] py-16 sm:py-20 text-white relative overflow-hidden">
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-white/90">
              START YOUR JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              Turn Your Creative Passion <br />
              Into a Professional Future
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
              Take the next step. Apply now and join a community of future-ready photographers, filmmakers, designers, and media creators.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-brand-black hover:bg-gray-900 transition-all duration-200 shadow-xl"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4 text-brand-orange" />
            </Link>

            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-transparent border-2 border-white hover:bg-white hover:text-brand-orange transition-all duration-200"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

