import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Award } from 'lucide-react';
import { coursesData } from '../../data/courses';

export const FeaturedCourses: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
              <span className="w-5 h-[2px] bg-brand-orange"></span>
              OUR COURSES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight leading-tight">
              Popular Courses <br />
              <span className="text-brand-orange">for Creative Minds</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl">
              Gain practical, industry-focused skills with hands-on training, real-world projects and professional mentorship.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-orange-hover uppercase tracking-wider group"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                aria-label="Previous courses"
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:border-brand-orange hover:text-brand-orange transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="Next courses"
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:border-brand-orange hover:text-brand-orange transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Courses Horizontal Scroll Grid */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {coursesData.map((course) => (
            <div
              key={course.id}
              className="min-w-[270px] sm:min-w-[290px] max-w-[310px] bg-white rounded-xl border border-gray-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col snap-start group"
            >
              {/* Course Thumbnail Image */}
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to high res Unsplash if local crop issue
                    (e.target as HTMLImageElement).src = course.highResImage;
                  }}
                />
                <div className="absolute top-3 left-3 bg-brand-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {course.category}
                </div>
              </div>

              {/* Course Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-brand-black group-hover:text-brand-orange transition-colors line-clamp-1">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-gray-500 pt-1">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-orange" />
                      {course.duration}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-brand-orange" />
                      Practical
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <Link
                    to={`/courses/${course.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-orange-hover uppercase tracking-wider group/link"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" />
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

