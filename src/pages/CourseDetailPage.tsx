import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Clock,
  Calendar,
  Award,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Video,
} from 'lucide-react';
import { coursesData } from '../data/courses';

export const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const course = coursesData.find((c) => c.slug === slug);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <div className="bg-brand-light min-h-screen pb-24">
      {/* Course Hero Banner */}
      <section className="bg-brand-black text-white py-16 border-b border-brand-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 to-brand-black/70 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{ backgroundImage: `url(${course.highResImage})` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Link to="/courses" className="text-gray-400 hover:text-white">
              Courses
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-brand-orange font-bold uppercase">{course.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {course.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-3xl leading-relaxed">
            {course.shortDescription}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 max-w-4xl border-t border-brand-border/80">
            <div>
              <span className="text-[11px] uppercase font-bold text-gray-400 block">Duration</span>
              <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                <Clock className="w-4 h-4 text-brand-orange" />
                {course.duration}
              </span>
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold text-gray-400 block">Training Format</span>
              <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                <Award className="w-4 h-4 text-brand-orange" />
                {course.format}
              </span>
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold text-gray-400 block">Start Date</span>
              <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-4 h-4 text-brand-orange" />
                {course.startDate}
              </span>
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold text-gray-400 block">Tuition</span>
              <span className="text-sm font-bold text-brand-orange mt-0.5 block">
                {course.tuitionFee}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to={`/apply?course=${course.slug}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-all duration-200 shadow-brand-glow transform hover:-translate-y-0.5"
            >
              <span>Apply for This Course</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-2xl font-bold text-brand-black">Course Overview</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {course.fullOverview}
              </p>
            </div>

            {/* Learning Outcomes */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-brand-black">What You Will Master</h2>
              <div className="grid grid-cols-1 gap-4">
                {course.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-relaxed">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Week-by-Week Curriculum */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-brand-black">Syllabus Breakdown</h2>
                <span className="text-xs font-semibold text-brand-orange bg-orange-50 px-3 py-1 rounded-full">
                  6 Intensive Modules
                </span>
              </div>

              <div className="space-y-4">
                {course.curriculum.map((mod) => (
                  <div
                    key={mod.week}
                    className="p-5 rounded-xl border border-gray-200 bg-brand-light/40 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-brand-black text-white flex items-center justify-center text-xs font-bold shrink-0">
                        0{mod.week}
                      </span>
                      <h3 className="text-base font-bold text-brand-black">{mod.title}</h3>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-11 text-xs text-gray-600 list-disc list-inside">
                      {mod.topics.map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Projects & Gear */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-brand-black font-bold text-lg">
                  <Video className="w-5 h-5 text-brand-orange" />
                  <span>Practical Portfolio Projects</span>
                </div>
                <ul className="space-y-2.5 text-xs text-gray-600">
                  {course.practicalProjects.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-brand-orange font-bold">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-brand-black font-bold text-lg">
                  <Cpu className="w-5 h-5 text-brand-orange" />
                  <span>Studio Equipment & Tech</span>
                </div>
                <ul className="space-y-2.5 text-xs text-gray-600">
                  {course.equipmentProvided.map((eq, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-brand-orange font-bold">•</span>
                      <span>{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Instructor & Application Card */}
          <div className="lg:col-span-4 space-y-8">
            {/* Enrollment Summary Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6 sticky top-28">
              <h3 className="text-lg font-bold text-brand-black border-b border-gray-100 pb-3">
                Course Enrolment
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-bold text-brand-black">{course.duration}</span>
                </div>
                <div className="py-2 border-b border-gray-100 space-y-1.5">
                  <span className="text-gray-500 block">Available Tracks:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {course.durationOptions?.map((opt, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-50 text-brand-orange border border-orange-200/60"
                      >
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500">Mode</span>
                  <span className="font-bold text-brand-black">{course.format}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500">Certification</span>
                  <span className="font-bold text-brand-black text-right max-w-[180px]">
                    Verifiable Certificate
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500">Tuition Fee</span>
                  <span className="font-bold text-brand-orange">{course.tuitionFee}</span>
                </div>
              </div>

              <Link
                to={`/apply?course=${course.slug}`}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors shadow-md"
              >
                <span>Apply for Next Cohort</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Lead Instructor */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <span className="text-[11px] uppercase font-bold text-gray-400 block">
                  Lead Instructor
                </span>
                <div className="flex items-center gap-3">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-brand-black">
                      {course.instructor.name}
                    </h4>
                    <p className="text-xs text-brand-orange">{course.instructor.role}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {course.instructor.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
