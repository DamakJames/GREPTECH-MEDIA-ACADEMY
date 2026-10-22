import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ArrowRight,
  User,
  ChevronDown,
  BookOpen,
  Laptop,
  Building,
  GraduationCap,
  FileText,
  Info,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdown, setCoursesDropdown] = useState(false);
  const [academyDropdown, setAcademyDropdown] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mobileAcademyOpen, setMobileAcademyOpen] = useState(false);

  const location = useLocation();
  const { user, logout } = useAuth();

  const getDashboardRoute = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/portal/admin';
    if (user.role === 'instructor') return '/portal/instructor';
    return '/portal/student';
  };

  const getDashboardLabel = () => {
    if (!user) return 'Student Portal';
    if (user.role === 'admin') return 'Admin Suite';
    if (user.role === 'instructor') return 'Faculty Portal';
    return 'My Portal';
  };

  const isRouteActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isCoursesActive =
    isRouteActive('/courses') || isRouteActive('/online-training');

  const isAcademyActive =
    isRouteActive('/about') ||
    isRouteActive('/facilities') ||
    isRouteActive('/success-stories') ||
    isRouteActive('/media');

  const closeAll = () => {
    setMobileMenuOpen(false);
    setCoursesDropdown(false);
    setAcademyDropdown(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" onClick={closeAll} className="flex items-center gap-3 group shrink-0">
              <img
                src="/assets/logo/greptech-icon.png"
                alt="Greptech Media Academy"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <div className="flex items-center font-extrabold text-xl tracking-tight leading-none text-brand-black">
                  <span>GREP</span>
                  <span className="text-brand-orange">TECH</span>
                </div>
                <span className="text-[9px] font-bold tracking-[0.22em] text-brand-black uppercase mt-0.5">
                  — MEDIA ACADEMY —
                </span>
              </div>
            </Link>

            {/* Streamlined Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {/* Home */}
              <Link
                to="/"
                className={`text-sm font-semibold transition-colors duration-200 py-1 border-b-2 ${
                  location.pathname === '/'
                    ? 'text-brand-orange border-brand-orange'
                    : 'text-gray-700 border-transparent hover:text-brand-orange hover:border-brand-orange/40'
                }`}
              >
                Home
              </Link>

              {/* Courses Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCoursesDropdown(true)}
                onMouseLeave={() => setCoursesDropdown(false)}
              >
                <button
                  type="button"
                  onClick={() => setCoursesDropdown(!coursesDropdown)}
                  className={`flex items-center gap-1 text-sm font-semibold transition-colors duration-200 py-1 border-b-2 ${
                    isCoursesActive
                      ? 'text-brand-orange border-brand-orange'
                      : 'text-gray-700 border-transparent hover:text-brand-orange hover:border-brand-orange/40'
                  }`}
                >
                  <span>Courses</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      coursesDropdown ? 'transform rotate-180 text-brand-orange' : 'text-gray-400'
                    }`}
                  />
                </button>

                {coursesDropdown && (
                  <div className="absolute top-full left-0 w-72 pt-3 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3 space-y-1">
                      <Link
                        to="/courses"
                        onClick={closeAll}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-orange-50/70 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-orange-100/60 text-brand-orange flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-brand-black group-hover:text-brand-orange block">
                            All Programs
                          </span>
                          <span className="text-[11px] text-gray-500 block leading-tight">
                            Explore all 7 in-studio disciplines
                          </span>
                        </div>
                      </Link>

                      <Link
                        to="/online-training"
                        onClick={closeAll}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-orange-50/70 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-orange-100/60 text-brand-orange flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                          <Laptop className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-brand-black group-hover:text-brand-orange block">
                            Online & Hybrid Training
                          </span>
                          <span className="text-[11px] text-gray-500 block leading-tight">
                            Virtual studio & remote masterclasses
                          </span>
                        </div>
                      </Link>

                      <div className="pt-2 mt-1 border-t border-gray-100 px-2 flex justify-between items-center text-[11px]">
                        <span className="text-gray-400 font-medium">Practical Intakes</span>
                        <Link
                          to="/courses"
                          onClick={closeAll}
                          className="font-bold text-brand-orange hover:underline"
                        >
                          View Catalogue →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Admissions */}
              <Link
                to="/admissions"
                className={`text-sm font-semibold transition-colors duration-200 py-1 border-b-2 ${
                  isRouteActive('/admissions')
                    ? 'text-brand-orange border-brand-orange'
                    : 'text-gray-700 border-transparent hover:text-brand-orange hover:border-brand-orange/40'
                }`}
              >
                Admissions
              </Link>

              {/* Student Work / Projects */}
              <Link
                to="/student-projects"
                className={`text-sm font-semibold transition-colors duration-200 py-1 border-b-2 ${
                  isRouteActive('/student-projects')
                    ? 'text-brand-orange border-brand-orange'
                    : 'text-gray-700 border-transparent hover:text-brand-orange hover:border-brand-orange/40'
                }`}
              >
                Student Work
              </Link>

              {/* Academy Hub Dropdown (Merged About, Facilities, Success Stories, Media) */}
              <div
                className="relative"
                onMouseEnter={() => setAcademyDropdown(true)}
                onMouseLeave={() => setAcademyDropdown(false)}
              >
                <button
                  type="button"
                  onClick={() => setAcademyDropdown(!academyDropdown)}
                  className={`flex items-center gap-1 text-sm font-semibold transition-colors duration-200 py-1 border-b-2 ${
                    isAcademyActive
                      ? 'text-brand-orange border-brand-orange'
                      : 'text-gray-700 border-transparent hover:text-brand-orange hover:border-brand-orange/40'
                  }`}
                >
                  <span>Academy</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      academyDropdown ? 'transform rotate-180 text-brand-orange' : 'text-gray-400'
                    }`}
                  />
                </button>

                {academyDropdown && (
                  <div className="absolute top-full left-0 w-72 pt-3 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3 space-y-1">
                      <Link
                        to="/about"
                        onClick={closeAll}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-orange-50/70 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-orange-100/60 text-brand-orange flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                          <Info className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-brand-black group-hover:text-brand-orange block">
                            About Greptech
                          </span>
                          <span className="text-[11px] text-gray-500 block leading-tight">
                            Mission, values & practical ethos
                          </span>
                        </div>
                      </Link>

                      <Link
                        to="/facilities"
                        onClick={closeAll}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-orange-50/70 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-orange-100/60 text-brand-orange flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                          <Building className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-brand-black group-hover:text-brand-orange block">
                            Studios & Facilities
                          </span>
                          <span className="text-[11px] text-gray-500 block leading-tight">
                            Equipment bays, labs & suites
                          </span>
                        </div>
                      </Link>

                      <Link
                        to="/success-stories"
                        onClick={closeAll}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-orange-50/70 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-orange-100/60 text-brand-orange flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-brand-black group-hover:text-brand-orange block">
                            Alumni Success Stories
                          </span>
                          <span className="text-[11px] text-gray-500 block leading-tight">
                            Graduate career outcomes
                          </span>
                        </div>
                      </Link>

                      <Link
                        to="/media"
                        onClick={closeAll}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-orange-50/70 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-orange-100/60 text-brand-orange flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-brand-black group-hover:text-brand-orange block">
                            Media Hub & Articles
                          </span>
                          <span className="text-[11px] text-gray-500 block leading-tight">
                            Industry insights & masterclasses
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact */}
              <Link
                to="/contact"
                className={`text-sm font-semibold transition-colors duration-200 py-1 border-b-2 ${
                  isRouteActive('/contact')
                    ? 'text-brand-orange border-brand-orange'
                    : 'text-gray-700 border-transparent hover:text-brand-orange hover:border-brand-orange/40'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right Action Controls */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
              {user ? (
                <div className="flex items-center gap-2">
                  <Link
                    to={getDashboardRoute()}
                    className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-brand-black hover:bg-gray-900 rounded-lg transition-all duration-200 shadow-sm border border-gray-800"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-brand-orange" />
                    <span>{getDashboardLabel()}</span>
                    <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-brand-orange/20 text-brand-orange">
                      {user.role}
                    </span>
                  </Link>
                  <button
                    onClick={() => logout()}
                    title="Sign Out"
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Sign out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-brand-black hover:bg-gray-900 rounded-lg transition-all duration-200 shadow-sm"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Student Portal</span>
                </Link>
              )}

              <Link
                to="/apply"
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover rounded-lg transition-all duration-200 shadow-md hover:shadow-brand-glow transform hover:-translate-y-0.5"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Actions & Hamburger */}
            <div className="flex lg:hidden items-center space-x-2">
              <Link
                to="/apply"
                className="px-3.5 py-2 text-xs font-bold text-white bg-brand-orange rounded-md"
              >
                Apply
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-brand-orange rounded-lg focus:outline-none"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 gap-1">
              <Link
                to="/"
                onClick={closeAll}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'bg-brand-orange/10 text-brand-orange font-bold'
                    : 'text-gray-800 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>

              {/* Mobile Courses Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isCoursesActive ? 'text-brand-orange font-bold' : 'text-gray-800'
                  }`}
                >
                  <span>Courses</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileCoursesOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileCoursesOpen && (
                  <div className="pl-4 py-1 space-y-1 border-l-2 border-orange-100 ml-3">
                    <Link
                      to="/courses"
                      onClick={closeAll}
                      className="block px-3 py-2 text-xs font-semibold text-gray-600 hover:text-brand-orange"
                    >
                      • All Programs (In-Studio)
                    </Link>
                    <Link
                      to="/online-training"
                      onClick={closeAll}
                      className="block px-3 py-2 text-xs font-semibold text-gray-600 hover:text-brand-orange"
                    >
                      • Online & Hybrid Training
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/admissions"
                onClick={closeAll}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isRouteActive('/admissions')
                    ? 'bg-brand-orange/10 text-brand-orange font-bold'
                    : 'text-gray-800 hover:bg-gray-50'
                }`}
              >
                Admissions
              </Link>

              <Link
                to="/student-projects"
                onClick={closeAll}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isRouteActive('/student-projects')
                    ? 'bg-brand-orange/10 text-brand-orange font-bold'
                    : 'text-gray-800 hover:bg-gray-50'
                }`}
              >
                Student Work
              </Link>

              {/* Mobile Academy Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileAcademyOpen(!mobileAcademyOpen)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isAcademyActive ? 'text-brand-orange font-bold' : 'text-gray-800'
                  }`}
                >
                  <span>Academy</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileAcademyOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileAcademyOpen && (
                  <div className="pl-4 py-1 space-y-1 border-l-2 border-orange-100 ml-3">
                    <Link
                      to="/about"
                      onClick={closeAll}
                      className="block px-3 py-2 text-xs font-semibold text-gray-600 hover:text-brand-orange"
                    >
                      • About Greptech
                    </Link>
                    <Link
                      to="/facilities"
                      onClick={closeAll}
                      className="block px-3 py-2 text-xs font-semibold text-gray-600 hover:text-brand-orange"
                    >
                      • Studios & Facilities
                    </Link>
                    <Link
                      to="/success-stories"
                      onClick={closeAll}
                      className="block px-3 py-2 text-xs font-semibold text-gray-600 hover:text-brand-orange"
                    >
                      • Alumni Success Stories
                    </Link>
                    <Link
                      to="/media"
                      onClick={closeAll}
                      className="block px-3 py-2 text-xs font-semibold text-gray-600 hover:text-brand-orange"
                    >
                      • Media Hub & Articles
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/contact"
                onClick={closeAll}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isRouteActive('/contact')
                    ? 'bg-brand-orange/10 text-brand-orange font-bold'
                    : 'text-gray-800 hover:bg-gray-50'
                }`}
              >
                Contact
              </Link>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2.5">
              {user ? (
                <div className="space-y-2.5">
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-brand-black">{user.displayName || user.email}</p>
                      <p className="text-[10px] uppercase font-bold text-brand-orange">{user.role} Account</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        closeAll();
                      }}
                      className="text-xs text-red-600 hover:underline font-semibold flex items-center gap-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Logout</span>
                    </button>
                  </div>
                  <Link
                    to={getDashboardRoute()}
                    onClick={closeAll}
                    className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white bg-brand-black rounded-lg shadow-sm"
                  >
                    <LayoutDashboard className="w-4 h-4 text-brand-orange" />
                    <span>Go to {getDashboardLabel()}</span>
                  </Link>
                  <Link
                    to="/apply"
                    onClick={closeAll}
                    className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-white bg-brand-orange rounded-lg shadow-md"
                  >
                    <span>Apply for New Cohort</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeAll}
                    className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white bg-brand-black rounded-lg"
                  >
                    <User className="w-4 h-4" />
                    <span>Student Portal Login</span>
                  </Link>
                  <Link
                    to="/apply"
                    onClick={closeAll}
                    className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-white bg-brand-orange rounded-lg shadow-md"
                  >
                    <span>Apply Now for Cohort</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
