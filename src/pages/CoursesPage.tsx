import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { coursesData } from '../data/courses';

export const CoursesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { label: 'All Programs', value: 'all' },
    { label: 'Cinematography & Visuals', value: 'visual' },
    { label: 'Sound & Audio', value: 'audio' },
    { label: 'Graphic Design', value: 'design' },
    { label: 'Production & Streaming', value: 'production' },
  ];

  const filteredCourses =
    selectedCategory === 'all'
      ? coursesData
      : coursesData.filter((c) => c.category === selectedCategory);

  return (
    <div className="bg-brand-light min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
            <span className="w-5 h-[2px] bg-brand-orange"></span>
            ACADEMIC PROGRAMS
            <span className="w-5 h-[2px] bg-brand-orange"></span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-brand-black tracking-tight">
            Professional Media Training Courses
          </h1>
          <p className="text-base text-gray-600 leading-relaxed">
            Hands-on, studio-intensive curricula designed to take you from foundational concepts to commercially viable execution.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
                selectedCategory === cat.value
                  ? 'bg-brand-orange text-white shadow-md shadow-brand-glow'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-brand-orange hover:text-brand-orange'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = course.highResImage;
                  }}
                />
                <div className="absolute top-4 left-4 bg-brand-black/85 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                  {course.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-brand-orange" />
                      {course.duration}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 font-medium">
                      <Award className="w-3.5 h-3.5 text-brand-orange" />
                      {course.format}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-brand-black group-hover:text-brand-orange transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {course.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Tuition</span>
                    <span className="font-semibold text-brand-black">{course.tuitionFee}</span>
                  </div>

                  <Link
                    to={`/courses/${course.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
