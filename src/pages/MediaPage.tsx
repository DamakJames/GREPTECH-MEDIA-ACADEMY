import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { articlesData } from '../data/articles';

export const MediaPage: React.FC = () => (
  <div className="bg-brand-light min-h-screen">
    <section className="bg-brand-black text-white py-20 border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange"><span className="w-5 h-[2px] bg-brand-orange"></span>MEDIA HUB</div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">Articles, Insights & Creative Resources</h1>
        <p className="text-base text-gray-300 max-w-2xl leading-relaxed">Industry knowledge and technical masterclasses from Greptech mentors and practitioners.</p>
      </div>
    </section>
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesData.map((a) => (
            <article key={a.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="relative h-52 overflow-hidden bg-gray-100">
                <img src={a.coverImage} alt={a.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-brand-black/85 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">{a.category}</div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-gray-500"><Clock className="w-3 h-3 text-brand-orange" /><span>{a.readTime}</span><span>•</span><span>{a.publishedAt}</span></div>
                  <h3 className="text-lg font-bold text-brand-black group-hover:text-brand-orange transition-colors line-clamp-2 leading-snug"><Link to={`/media/${a.slug}`}>{a.title}</Link></h3>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{a.summary}</p>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">By {a.author.name}</span>
                  <Link to={`/media/${a.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-brand-orange"><span>Read</span><ArrowRight className="w-3.5 h-3.5" /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </div>
);

