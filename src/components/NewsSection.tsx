/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Newspaper, Send, Search, Sparkles, TrendingUp } from 'lucide-react';
import { AINews } from '../types';
import NewsCard from './NewsCard';

interface NewsSectionProps {
  newsList: AINews[];
  onUpvoteNews: (id: string, e: any) => void;
  onSelect: (news: AINews) => void;
}

export default function NewsSection({ newsList, onUpvoteNews, onSelect }: NewsSectionProps) {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredNews = newsList.filter(article => 
    article.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(filterQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(filterQuery.toLowerCase()) ||
    article.author.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <section id="news-section" className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-20 scroll-m-20">
      
      {/* Editorial Title Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-3">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Fısıltı Makaleleri & İncelemeler</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Haber Köşesi & <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Analizler</span>
          </h3>
          <p className="text-slate-400 text-sm max-w-xl font-light mt-2">
            Yapay zekanın hızlı gelişim sürecine fener tutan; teknik incelemeler, etik tartışmalar ve son dakika gelişmeleri.
          </p>
        </div>

        {/* Local Search inside News Section only */}
        <div className="relative w-full md:w-80 group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur opacity-100 group-focus-within:from-cyan-500/20 group-focus-within:to-blue-500/20 transition duration-300"></div>
          <div className="relative bg-slate-900/85 border border-white/10 rounded-xl flex items-center px-3.5 py-2.5">
            <Search className="w-3.5 h-3.5 text-slate-500 mr-2.5" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Haber başlıklarında ara..."
              className="bg-transparent border-none outline-none text-xs text-slate-200 placeholder-slate-600 w-full"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side Featured Billboard */}
        <div className="lg:col-span-4 bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
          
          <span className="absolute -inset-0.5 bg-gradient-to-br from-indigo-500/15 via-purple-500/5 to-transparent blur-xl pointer-events-none"></span>

          <div>
            <div className="flex items-center space-x-2 text-cyan-400 mb-6">
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Haftanın Özeti</span>
            </div>
            
            <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug mb-4">
              Yapay Zeka Fikirlerinizi En Kolay Şekilde Hayata Geçirmenin Sırrı
            </h4>
            
            <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
              Geçmişte aylar süren kodlama ve tasarım döngüleri, günümüzde otonom AI asistanları ve web üreticileri sayesinde saatlere inmiş durumda. Fikirlerinizi fısıldayın ve gerisini akıllı platformlara bırakın.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5">
            <h5 className="text-xs font-mono font-bold text-slate-450 mb-1 flex items-center space-x-1.5">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Günün Fısıltısı</span>
            </h5>
            <p className="text-[11px] text-slate-400 italic">
              "En iyi kod, yazılmak zorunda olmayan koddur. Yapay zeka ile kod bloklarını mimari detaylarla birleştirmek asıl ustalıktır."
            </p>
          </div>

        </div>

        {/* Right Side News Cards Grid */}
        <div className="lg:col-span-8">
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredNews.map((news) => (
                <div key={news.id}>
                  <NewsCard
                    news={news}
                    onUpvote={onUpvoteNews}
                    onSelect={onSelect}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-64 border border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center p-6 text-center text-slate-500">
              <p className="text-sm italic">Aradığınız kriterlere uygun haber başlığı bulunamadı.</p>
              <button 
                onClick={() => setFilterQuery('')} 
                className="text-xs text-cyan-400 hover:underline mt-2"
              >
                Tüm haberleri göster
              </button>
            </div>
          )}
        </div>

      </div>

    </section>
  );
}
