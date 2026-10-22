import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { facilitiesData } from '../data/facilities';

export const FacilitiesPage: React.FC = () => (
  <div className="bg-brand-light min-h-screen">
    <section className="bg-brand-black text-white py-20 border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
          <span className="w-5 h-[2px] bg-brand-orange"></span>OUR FACILITIES
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">Studios, Labs & Production Spaces</h1>
        <p className="text-base text-gray-300 max-w-2xl leading-relaxed">Industry-grade equipment and purpose-built creative environments designed for hands-on professional training.</p>
      </div>
    </section>
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {facilitiesData.map((f, idx) => (
          <div key={f.id} className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            <div className={`lg:col-span-6 ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-gray-100">
                <img src={f.image} alt={f.name} className="w-full h-[340px] object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80'; }} />
              </div>
            </div>
            <div className={`lg:col-span-6 space-y-5 ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange bg-orange-50 px-3 py-1 rounded-full">{f.category}</span>
              <h2 className="text-3xl font-extrabold text-brand-black tracking-tight">{f.name}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{f.description}</p>
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Key Equipment & Capabilities</h4>
                <ul className="space-y-2">
                  {f.keyGear.map((g, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-700"><span className="text-brand-orange font-bold mt-0.5">•</span><span>{g}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    <section className="py-16 bg-brand-black text-white text-center">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        <h2 className="text-3xl font-black text-white">Experience Our Studios First-Hand</h2>
        <p className="text-sm text-gray-400">Apply for the next cohort and gain unlimited access to all production spaces during your training.</p>
        <Link to="/apply" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors shadow-brand-glow"><span>Apply Now</span><ArrowRight className="w-4 h-4" /></Link>
      </div>
    </section>
  </div>
);
