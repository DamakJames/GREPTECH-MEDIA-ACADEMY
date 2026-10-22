import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Film, Palette, Headphones, Video } from 'lucide-react';
import { projectsData } from '../../data/projects';

export const StudentProjectsSection: React.FC = () => {
  const categoryIcons: Record<string, React.ElementType> = {
    Photography: Camera,
    Films: Film,
    Designs: Palette,
    Audio: Headphones,
    Content: Video,
  };

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
              <span className="w-5 h-[2px] bg-brand-orange"></span>
              STUDENT PROJECTS
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight leading-tight">
              Real Projects. <br />
              <span className="text-brand-orange">Real Skills.</span>
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              Explore creative works produced by our students during and after their training, demonstrating hands-on technical mastery.
            </p>

            <div className="pt-2">
              <Link
                to="/student-projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-bold text-brand-black bg-white border border-gray-300 hover:border-brand-orange hover:text-brand-orange transition-all duration-200"
              >
                <span>View More Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: 5 Projects Cards */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {projectsData.map((project) => {
              const Icon = categoryIcons[project.category] || Camera;
              return (
                <Link
                  key={project.id}
                  to="/student-projects"
                  className="group flex flex-col items-center bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:border-brand-orange/50 transition-all duration-300"
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                      <span className="text-[10px] text-white font-medium line-clamp-2">
                        {project.title}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 w-full flex items-center justify-center gap-2 text-xs font-bold text-brand-black group-hover:text-brand-orange transition-colors">
                    <Icon className="w-3.5 h-3.5 text-brand-orange" />
                    <span>{project.category}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

