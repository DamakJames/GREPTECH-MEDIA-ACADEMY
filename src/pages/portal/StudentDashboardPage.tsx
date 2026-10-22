import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Award,
  Video,
  Download,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const StudentDashboardPage: React.FC = () => {
  const { user } = useAuth();

  const enrolledCourseTitle =
    user?.enrolledCourse === 'professional-photography'
      ? 'Professional Photography'
      : user?.enrolledCourse === 'foley-sound-production'
      ? 'Foley & Sound Production'
      : 'Cinematography & Filmmaking';

  return (
    <div className="bg-brand-light min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="bg-brand-black text-white rounded-2xl p-6 sm:p-10 border border-brand-border shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-card text-[11px] font-bold text-brand-orange border border-brand-border uppercase tracking-wider">
              <span>STUDENT LEARNING PORTAL</span>
              <span>•</span>
              <span>ACTIVE COHORT 2026A</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome back, {user?.displayName || 'Student'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300">
              Enrolled Program:{' '}
              <span className="font-bold text-brand-orange">{enrolledCourseTitle}</span> (Studio Track)
            </p>
          </div>

          <div className="flex flex-wrap gap-3 relative z-10">
            <Link
              to={`/courses/${user?.enrolledCourse || 'cinematography-filmmaking'}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-card hover:bg-brand-border border border-brand-border transition-colors"
            >
              <span>Course Syllabus</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/certificate/verify/GMA-SAMPLE-2026"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors shadow-brand-glow"
            >
              <Award className="w-4 h-4" />
              <span>Certificate Status</span>
            </Link>
          </div>
        </div>

        {/* Progress & Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <span className="text-[10px] uppercase font-bold text-gray-400">Course Progress</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-brand-black">40%</span>
              <span className="text-xs text-brand-orange font-bold">Module 3 of 6</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-brand-orange rounded-full w-[40%]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <span className="text-[10px] uppercase font-bold text-gray-400">Attendance</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-green-600">95%</span>
              <span className="text-xs text-gray-500 font-medium">19 of 20 Labs</span>
            </div>
            <span className="text-[11px] text-gray-400 block">Exceeds 80% requirement</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <span className="text-[10px] uppercase font-bold text-gray-400">Assignments</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-brand-black">4 / 5</span>
              <span className="text-xs text-purple-600 font-bold">1 Due This Week</span>
            </div>
            <span className="text-[11px] text-gray-400 block">Average Grade: 92% (A)</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <span className="text-[10px] uppercase font-bold text-gray-400">Studio Hours</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-brand-black">48 hrs</span>
              <span className="text-xs text-gray-500 font-medium">Logged</span>
            </div>
            <span className="text-[11px] text-gray-400 block">Next session: Tomorrow 10am</span>
          </div>
        </div>

        {/* Two-Column LMS Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Modules & Current Lessons */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-orange" />
                <h2 className="text-lg font-bold text-brand-black">Current Module Lessons</h2>
              </div>
              <span className="text-xs text-gray-500 font-medium">Week 3 Syllabus</span>
            </div>

            <div className="space-y-3">
              {[
                {
                  title: 'Three-Point Lighting & Chiaroscuro Contrast Ratios',
                  duration: '45 mins',
                  completed: true,
                  type: 'Studio Masterclass',
                },
                {
                  title: 'Color Temperature (Kelvin), Gels & Textile Diffusion',
                  duration: '60 mins',
                  completed: true,
                  type: 'Hands-on Lab',
                },
                {
                  title: 'Blocking Camera Movements with Fluid Head Tripods & Sliders',
                  duration: '90 mins',
                  completed: false,
                  type: 'Studio Practical (Next)',
                },
                {
                  title: 'Negative Fill & Shaping Cinematic Low-Key Drama',
                  duration: '50 mins',
                  completed: false,
                  type: 'Workshop Lab',
                },
              ].map((lesson, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-colors ${
                    lesson.completed
                      ? 'bg-gray-50/60 border-gray-200 text-gray-700'
                      : 'bg-orange-50/40 border-brand-orange/40 text-brand-black'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {lesson.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    ) : (
                      <Clock className="w-5 h-5 text-brand-orange shrink-0 animate-pulse" />
                    )}
                    <div>
                      <h4 className="text-sm font-bold">{lesson.title}</h4>
                      <span className="text-[11px] text-gray-500">
                        {lesson.type} • {lesson.duration}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      lesson.completed
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-brand-orange text-white hover:bg-brand-orange-hover'
                    }`}
                  >
                    {lesson.completed ? 'Review' : 'Start Lesson'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Active Assignment & Schedule */}
          <div className="lg:col-span-4 space-y-6">
            {/* Active Assignment Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-xs font-bold uppercase text-brand-orange">
                  Active Assignment
                </span>
                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  Due Friday, 5pm
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-brand-black">
                  Project: Dramatic 2-Point Lighting Portrait
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Shoot and color grade a 30-second dramatic monologue clip demonstrating motivated key light and controlled negative fill.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => alert('Assignment upload modal will be activated in Stage 6 (LMS).')}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-brand-black hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <FileText className="w-4 h-4 text-brand-orange" />
                  <span>Submit Assignment Project</span>
                </button>
              </div>
            </div>

            {/* Upcoming Studio Schedule */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-bold text-brand-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Calendar className="w-4 h-4 text-brand-orange" />
                <span>Upcoming Studio Sessions</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-brand-light border border-gray-100 space-y-1">
                  <span className="font-bold text-brand-black block">
                    Cinema Rig & Gimbal Balancing Lab
                  </span>
                  <span className="text-gray-500 text-[11px] block">
                    Tomorrow, 10:00 AM – 1:00 PM • Studio A
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-brand-light border border-gray-100 space-y-1">
                  <span className="font-bold text-brand-black block">
                    DaVinci Resolve Color Timing Session
                  </span>
                  <span className="text-gray-500 text-[11px] block">
                    Thursday, 2:00 PM – 5:00 PM • Edit Suite 2
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
