import React from 'react';
import { Quote, User } from 'lucide-react';
import { testimonialsData } from '../../data/testimonials';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-brand-light border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
            <span className="w-5 h-[2px] bg-brand-orange"></span>
            STUDENT SUCCESS STORIES
            <span className="w-5 h-[2px] bg-brand-orange"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight">
            Hear From Our Graduates
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Real testimonies from students who transitioned from passionate beginners to active media professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl p-8 border border-gray-200 shadow-brand-light flex flex-col justify-between space-y-6 relative"
            >
              <Quote className="w-8 h-8 text-brand-orange/30 absolute top-6 right-6" />

              <p className="text-sm text-gray-700 leading-relaxed italic relative z-10">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-11 h-11 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 shadow-inner shrink-0">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-black">{t.name}</h4>
                  <p className="text-xs text-brand-orange font-medium">{t.careerRole}</p>
                  <p className="text-[11px] text-gray-400">{t.cohort}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

