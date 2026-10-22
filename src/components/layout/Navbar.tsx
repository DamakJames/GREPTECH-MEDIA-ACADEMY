import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ArrowRight, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Online Training', path: '/online-training' },
    { name: 'Projects', path: '/student-projects' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Media', path: '/media' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
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

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 py-1 border-b-2 ${
                  isActive(link.path)
                    ? 'text-brand-orange border-brand-orange font-semibold'
                    : 'text-gray-700 border-transparent hover:text-brand-orange hover:border-brand-orange/40'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              aria-label="Search"
              className="p-2 text-gray-500 hover:text-brand-orange hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              to="/login"
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-brand-black hover:bg-gray-900 rounded-lg transition-all duration-200 shadow-sm"
            >
              <User className="w-3.5 h-3.5" />
              <span>Student Portal</span>
            </Link>

            <Link
              to="/apply"
              className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover rounded-lg transition-all duration-200 shadow-md hover:shadow-brand-glow transform hover:-translate-y-0.5"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center space-x-3">
            <Link
              to="/apply"
              className="px-3.5 py-2 text-xs font-bold text-white bg-brand-orange rounded-md md:hidden"
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

      {/* Mobile Sliding Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-brand-orange/10 text-brand-orange font-bold'
                    : 'text-gray-800 hover:bg-gray-50 hover:text-brand-orange'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2.5">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white bg-brand-black rounded-lg"
            >
              <User className="w-4 h-4" />
              <span>Student Portal Login</span>
            </Link>
            <Link
              to="/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-white bg-brand-orange rounded-lg shadow-md"
            >
              <span>Apply Now for Cohort</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

