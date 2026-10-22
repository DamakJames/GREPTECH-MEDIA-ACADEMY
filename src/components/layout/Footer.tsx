import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageCircle, ShieldCheck, ArrowRight, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black text-gray-300 border-t border-brand-border pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-border">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/assets/logo/greptech-icon.png"
                alt="Greptech Media Academy"
                className="h-10 w-auto object-contain"
              />
              <div className="flex flex-col">
                <div className="flex items-center font-extrabold text-xl tracking-tight leading-none text-white">
                  <span>GREP</span>
                  <span className="text-brand-orange">TECH</span>
                </div>
                <span className="text-[9px] font-bold tracking-[0.22em] text-gray-300 uppercase mt-0.5">
                  — MEDIA ACADEMY —
                </span>
              </div>
            </Link>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Practical media education for the next generation of photographers, filmmakers, designers, content creators, sound engineers and media professionals.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-card border border-brand-border text-xs text-gray-300">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span>Admissions currently open for new cohorts</span>
              </div>
            </div>
          </div>

          {/* Column 2: Programs */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider text-white uppercase">Programs</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link to="/courses/cinematography-filmmaking" className="hover:text-brand-orange transition-colors">
                  Cinematography & Filmmaking
                </Link>
              </li>
              <li>
                <Link to="/courses/professional-photography" className="hover:text-brand-orange transition-colors">
                  Professional Photography
                </Link>
              </li>
              <li>
                <Link to="/courses/graphic-design" className="hover:text-brand-orange transition-colors">
                  Graphic Design
                </Link>
              </li>
              <li>
                <Link to="/courses/content-creation" className="hover:text-brand-orange transition-colors">
                  Content Creation
                </Link>
              </li>
              <li>
                <Link to="/courses/foley-sound-production" className="hover:text-brand-orange transition-colors">
                  Foley & Sound Production
                </Link>
              </li>
              <li>
                <Link to="/courses/live-streaming-production" className="hover:text-brand-orange transition-colors">
                  Live Streaming & Production
                </Link>
              </li>
              <li>
                <Link to="/courses/voiceover-audio-production" className="hover:text-brand-orange transition-colors">
                  Voiceover & Audio Production
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academy Exploration */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider text-white uppercase">Academy</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link to="/about" className="hover:text-brand-orange transition-colors">
                  About Greptech
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-brand-orange transition-colors">
                  Admissions Guide
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-brand-orange transition-colors">
                  Studios & Facilities
                </Link>
              </li>
              <li>
                <Link to="/student-projects" className="hover:text-brand-orange transition-colors">
                  Student Portfolios
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="hover:text-brand-orange transition-colors">
                  Alumni Success Stories
                </Link>
              </li>
              <li>
                <Link to="/online-training" className="hover:text-brand-orange transition-colors">
                  Online Training
                </Link>
              </li>
              <li>
                <Link to="/media" className="hover:text-brand-orange transition-colors">
                  Media Hub & Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Contact & Verification */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider text-white uppercase">Official Contact</h4>
            <ul className="space-y-3 text-xs text-gray-300">
              <li>
                <a
                  href="https://wa.me/2348077566926"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-brand-orange transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-green-500 shrink-0" />
                  <span>WhatsApp: +234 807 756 6926</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+2348077566926"
                  className="flex items-center gap-2 hover:text-brand-orange transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                  <span>+234 807 756 6926</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:Greptechmediaacademy@gmail.com"
                  className="flex items-center gap-2 hover:text-brand-orange transition-colors"
                >
                  <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                  <span className="truncate">Greptechmediaacademy@gmail.com</span>
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                to="/certificate/verify/GMA-SAMPLE-2026"
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-300 bg-brand-card hover:bg-brand-border rounded-lg border border-brand-border transition-colors w-full justify-center"
              >
                <ShieldCheck className="w-4 h-4 text-brand-orange" />
                <span>Verify a Certificate</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 Greptech Media Academy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/admissions" className="hover:text-gray-400">
              Admissions Policy
            </Link>
            <Link to="/contact" className="hover:text-gray-400">
              Support
            </Link>
            <Link to="/login" className="hover:text-gray-400">
              Student Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

