import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';
import { testimonialsData } from '../data/testimonials';

export const SuccessStoriesPage: React.FC = () => (
  <div className="bg-brand-light min-h-screen">
    <section className="bg-brand-black text-white py-20 border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange"><span className="w-5 h-[2px] bg-brand-orange"></span>ALUMNI STORIES</div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">Success Stories & Graduate Outcomes</h1>
        <p className="text-base text-gray-300 max-w-2xl leading-relaxed">Real graduates who transformed their creative passion into thriving professional careers after training at Greptech.</p>
      </div>
    </section>
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {testimonialsData.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm flex flex-col md:flex-row gap-8 items-start relative">
            <Quote className="w-10 h-10 text-brand-orange/20 absolute top-6 right-6 hidden md:block" />
            <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full object-cover ring-4 ring-brand-orange/20 shrink-0" />
            <div className="space-y-4 flex-1">
              <p className="text-sm text-gray-700 leading-relaxed italic">"{t.quote}"</p>
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-base font-bold text-brand-black">{t.name}</h3>
                <p className="text-xs text-brand-orange font-semibold">{t.careerRole}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{t.course} · {t.cohort}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    <section className="py-16 bg-brand-black text-white text-center">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        <h2 className="text-3xl font-black text-white">Write Your Own Success Story</h2>
        <Link to="/apply" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors shadow-brand-glow"><span>Apply for Next Cohort</span><ArrowRight className="w-4 h-4" /></Link>
      </div>
    </section>
  </div>
);
