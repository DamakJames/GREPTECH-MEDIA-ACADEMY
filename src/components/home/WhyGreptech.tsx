import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, TrendingUp, Users, FolderCheck, Star, Award, ArrowRight } from 'lucide-react';

export const WhyGreptech: React.FC = () => {
  const reasons = [
    {
      icon: Camera,
      title: 'Practical Training',
      description: 'Real-world projects and hands-on experience with real cameras and studio equipment.',
    },
    {
      icon: TrendingUp,
      title: 'Industry-Focused',
      description: 'Training aligned with current commercial production standards and client expectations.',
    },
    {
      icon: Users,
      title: 'Expert Mentorship',
      description: 'Learn from active directors, seasoned photographers, and audio engineers.',
    },
    {
      icon: FolderCheck,
      title: 'Portfolio Development',
      description: 'Build a commercial-ready creative reel and portfolio you can show to clients.',
    },
    {
      icon: Star,
      title: 'Work Ethics',
      description: 'Learn professionalism, onset protocols, client communication, and creative responsibility.',
    },
    {
      icon: Award,
      title: 'Certification',
      description: 'Receive an authentic, verifiable Greptech certificate with online validation.',
    },
  ];

  return (
    <section className="py-24 bg-brand-black text-white relative overflow-hidden border-t border-brand-border">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
              <span className="w-5 h-[2px] bg-brand-orange"></span>
              WHY CHOOSE GREPTECH
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              More Than Training <br />
              <span className="text-brand-orange">A Creative Career Path</span>
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              We provide practical skills, industry exposure and mentorship to help you become a confident, professional creative equipped for real market demands.
            </p>

            <div className="pt-2">
              <Link
                to="/apply"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-all duration-200 shadow-brand-glow transform hover:-translate-y-0.5"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: 6-item Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-brand-card/80 border border-brand-border rounded-xl p-6 hover:border-brand-orange/60 transition-colors duration-300 space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-black flex items-center justify-center text-brand-orange border border-brand-border group-hover:border-brand-orange/50 transition-colors">
                    <Icon className="w-5 h-5 text-brand-orange" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

