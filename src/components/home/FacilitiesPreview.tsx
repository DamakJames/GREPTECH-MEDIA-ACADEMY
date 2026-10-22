import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { facilitiesData } from '../../data/facilities';

export const FacilitiesPreview: React.FC = () => {
  return (
    <section id="facilities-preview" className="py-24 bg-brand-black text-white border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
              <span className="w-5 h-[2px] bg-brand-orange"></span>
              OUR FACILITIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Learn in a Professional <br />
              <span className="text-brand-orange">Creative Environment</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-xl">
              Modern equipment, dedicated studios and a practical learning space designed to help you develop real-world skills.
            </p>
          </div>

          <div>
            <Link
              to="/facilities"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-transparent border border-white/60 hover:bg-white/10 hover:border-white transition-all duration-200"
            >
              <span>Explore All Facilities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Facility Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilitiesData.map((facility) => (
            <div
              key={facility.id}
              className="bg-brand-card rounded-xl border border-brand-border overflow-hidden group hover:border-brand-orange/60 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-44 overflow-hidden bg-brand-dark">
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-sm font-bold text-white group-hover:text-brand-orange transition-colors">
                    {facility.name}
                  </h3>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {facility.category}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {facility.description}
                </p>
                <div className="pt-2 border-t border-brand-border/60">
                  <Link
                    to="/facilities"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-orange hover:text-brand-orange-hover uppercase tracking-wider"
                  >
                    <span>View Equipment</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

