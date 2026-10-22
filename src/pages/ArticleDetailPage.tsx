import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, ArrowLeft, ArrowRight, User, Share2 } from 'lucide-react';
import { articlesData } from '../data/articles';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articlesData.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/media" replace />;
  }

  const otherArticles = articlesData.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <div className="bg-brand-light min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          to="/media"
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-orange hover:text-brand-orange-hover uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Media Hub</span>
        </Link>

        <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm p-6 sm:p-10 space-y-8">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-md text-xs font-bold uppercase tracking-wider">
              {article.category}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 pb-6 border-b border-gray-100 text-xs text-gray-500">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-black text-white flex items-center justify-center font-bold text-xs">
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-brand-black block">{article.author.name}</span>
                  <span className="text-[11px] text-brand-orange">{article.author.role}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-orange" />
                  {article.readTime}
                </span>
                <span>•</span>
                <span>{article.publishedAt}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-[360px] object-cover"
            />
          </div>

          <div className="space-y-5 text-gray-700 leading-relaxed text-sm sm:text-base">
            <p className="font-medium text-brand-black text-base sm:text-lg italic border-l-4 border-brand-orange pl-4">
              {article.summary}
            </p>
            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
            <div className="text-xs text-gray-500">
              Published by <span className="font-semibold text-brand-black">Greptech Media Academy</span>
            </div>
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors"
            >
              <span>Learn With Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>

        {otherArticles.length > 0 && (
          <div className="pt-8 space-y-6">
            <h3 className="text-xl font-bold text-brand-black">More Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherArticles.map((oa) => (
                <div key={oa.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-2">
                  <span className="text-[10px] uppercase font-bold text-brand-orange">{oa.category}</span>
                  <h4 className="text-sm font-bold text-brand-black hover:text-brand-orange transition-colors">
                    <Link to={`/media/${oa.slug}`}>{oa.title}</Link>
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">{oa.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

