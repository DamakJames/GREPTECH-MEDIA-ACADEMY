import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-brand-black text-white overflow-hidden min-h-[580px] lg:min-h-[640px] flex items-center border-b border-brand-border">
      {/* Background glow and subtle ambient light */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/95 to-brand-black/70 z-10" />

      {/* Background cinema image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity scale-105 transform duration-1000"
        style={{ backgroundImage: `url('/assets/hero/hero-bg.jpg')` }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-card/90 border border-brand-border text-[11px] font-bold tracking-[0.2em] text-brand-orange uppercase">
              GREPTECH MEDIA ACADEMY
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white uppercase">
              BUILDING <br />
              INDUSTRY-READY <br />
              <span className="text-brand-orange">MEDIA EXPERTS</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed font-normal">
              Practical media education for the next generation of photographers, filmmakers, designers, content creators and media professionals.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/apply"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-all duration-200 shadow-brand-glow transform hover:-translate-y-0.5"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/courses"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-transparent border border-white/60 hover:bg-white/10 hover:border-white transition-all duration-200"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-3 pt-4">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-brand-black object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Student"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-brand-black object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  alt="Student"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-brand-black object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                  alt="Student"
                />
              </div>
              <p className="text-xs text-gray-400 font-medium">
                Join a new generation of creative professionals
              </p>
            </div>
          </div>

          {/* Right Column: Hero Visual, Story Play button */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden border border-brand-border/80 shadow-2xl bg-brand-card group">
              <img
                src="/assets/hero/hero-cinematographer.jpg"
                alt="Cinematographer operating cinema camera"
                className="w-full h-[360px] sm:h-[420px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80" />

              {/* Story Overlay & Play Button */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('facilities-preview');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-3 text-white group/btn"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-orange/90 flex items-center justify-center text-white shadow-lg group-hover/btn:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                  <span className="text-xs font-bold tracking-wide uppercase group-hover/btn:text-brand-orange transition-colors">
                    Watch Our Story
                  </span>
                </button>

                <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
                  <span className="text-brand-orange">01</span>
                  <span>/</span>
                  <span>03</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

