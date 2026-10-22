import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, FileText, ArrowRight } from 'lucide-react';
import { coursesData } from '../../data/courses';
import { articlesData } from '../../data/articles';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingCourses = trimmed
    ? coursesData.filter(
        (c) =>
          c.title.toLowerCase().includes(trimmed) ||
          c.category.toLowerCase().includes(trimmed) ||
          c.shortDescription.toLowerCase().includes(trimmed)
      )
    : coursesData.slice(0, 3);

  const matchingArticles = trimmed
    ? articlesData.filter(
        (a) =>
          a.title.toLowerCase().includes(trimmed) ||
          a.category.toLowerCase().includes(trimmed) ||
          a.summary.toLowerCase().includes(trimmed)
      )
    : articlesData.slice(0, 2);

  const handleSelect = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-brand-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="relative flex items-center p-4 border-b border-gray-100">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, facilities, articles (e.g. photography, sound, admissions)..."
            className="w-full text-base text-brand-black placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-brand-black rounded-lg ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {/* Courses Section */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 px-2">
              <BookOpen className="w-3.5 h-3.5 text-brand-orange" />
              Academic Courses
            </span>
            <div className="space-y-1">
              {matchingCourses.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleSelect(`/courses/${c.slug}`)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-orange-50/60 text-left transition-colors group"
                >
                  <div>
                    <h4 className="text-sm font-bold text-brand-black group-hover:text-brand-orange transition-colors">
                      {c.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{c.shortDescription}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Articles Section */}
          <div className="space-y-2 border-t border-gray-100 pt-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 px-2">
              <FileText className="w-3.5 h-3.5 text-brand-orange" />
              Media Hub & Masterclasses
            </span>
            <div className="space-y-1">
              {matchingArticles.map((a) => (
                <button
                  key={a.id}
                  onClick={() => handleSelect(`/media/${a.slug}`)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-orange-50/60 text-left transition-colors group"
                >
                  <div>
                    <h4 className="text-sm font-bold text-brand-black group-hover:text-brand-orange transition-colors">
                      {a.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{a.summary}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {matchingCourses.length === 0 && matchingArticles.length === 0 && (
            <div className="text-center py-8 text-xs text-gray-500">
              No results found for "<span className="font-semibold text-brand-black">{query}</span>".
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-gray-50 px-4 py-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
          <span>Tip: Press ESC to exit</span>
          <button
            onClick={() => handleSelect('/courses')}
            className="text-brand-orange font-bold hover:underline"
          >
            Browse all courses →
          </button>
        </div>
      </div>
    </div>
  );
};

