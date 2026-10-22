import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { articlesData } from '../../data/articles';

export const ArticlesPreview: React.FC = () => {
  return (
    <section className="py-24 bg-brand-light border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
              <span className="w-5 h-[2px] bg-brand-orange"></span>
              MEDIA HUB & INSIGHTS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight">
              Latest Articles & Resources
            </h2>
            <p className="text-sm text-gray-600 max-w-lg">
              Industry knowledge, technical masterclasses, and creative breakdowns from Greptech mentors.
            </p>
          </div>

          <Link
            to="/media"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-orange-hover uppercase tracking-wider group"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articlesData.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-brand-black/85 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {article.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3 text-brand-orange" />
                      {article.readTime}
                    </span>
                    <span>•</span>
                    <span>{article.publishedAt}</span>
                  </div>

                  <h3 className="text-base font-bold text-brand-black group-hover:text-brand-orange transition-colors line-clamp-2 leading-snug">
                    <Link to={`/media/${article.slug}`}>{article.title}</Link>
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">
                    By {article.author.name}
                  </span>
                  <Link
                    to={`/media/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-orange group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
