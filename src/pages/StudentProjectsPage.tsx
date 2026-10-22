import React, { useState } from 'react';
import { Camera, Film, Palette, Headphones, Video, ExternalLink } from 'lucide-react';
import { projectsData } from '../data/projects';

export const StudentProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Photography', 'Films', 'Designs', 'Audio', 'Content'];

  const categoryIcons: Record<string, React.ElementType> = {
    Photography: Camera,
    Films: Film,
    Designs: Palette,
    Audio: Headphones,
    Content: Video,
  };

  const filteredProjects =
    filter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  return (
    <div className="bg-brand-light min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
            <span className="w-5 h-[2px] bg-brand-orange"></span>
            PORTFOLIO SHOWCASE
            <span className="w-5 h-[2px] bg-brand-orange"></span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-brand-black tracking-tight">
            Student Projects & Creative Works
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Real commercial briefs, short films, soundscapes, and identity designs produced by Greptech students.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
                filter === cat
                  ? 'bg-brand-orange text-white shadow-md shadow-brand-glow'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-brand-orange hover:text-brand-orange'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p) => {
            const Icon = categoryIcons[p.category] || Camera;
            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-brand-black/85 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wider flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-brand-orange" />
                    <span>{p.category}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-brand-black/85 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {p.year}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-brand-black group-hover:text-brand-orange transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700">
                      Creator: {p.studentName}
                    </span>
                    <span className="text-[11px] font-bold text-brand-orange uppercase tracking-wider">
                      Verified Portfolio
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
