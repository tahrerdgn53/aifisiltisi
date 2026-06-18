/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Clock, ThumbsUp, ArrowRight, BookOpen } from 'lucide-react';
import { AINews } from '../types';

interface NewsCardProps {
  news: AINews;
  onUpvote: (id: string, e: any) => void;
  onSelect: (news: AINews) => void;
}

export default function NewsCard({ news, onUpvote, onSelect }: NewsCardProps) {
  const [hovered, setHovered] = useState(false);
  const [upvoteAnimated, setUpvoteAnimated] = useState(false);

  const handleUpvote = (e: React.MouseEvent) => {
    setUpvoteAnimated(true);
    onUpvote(news.id, e);
    setTimeout(() => setUpvoteAnimated(false), 405);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(news)}
      className="group flex flex-col justify-between h-full bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer backdrop-blur-md"
    >
      
      {/* Top Meta Details Row */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-4">
        <span className="text-cyan-400 font-medium tracking-widest uppercase">
          {news.category}
        </span>
        <div className="flex items-center space-x-2.5">
          <span className="flex items-center space-x-1">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>{news.readTime}</span>
          </span>
          <span>•</span>
          <span>{news.date}</span>
        </div>
      </div>

      {/* Title & Excerpt */}
      <div className="mb-6">
        <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight line-clamp-2 leading-snug">
          {news.title}
        </h4>
        <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed mt-2.5 line-clamp-3">
          {news.excerpt}
        </p>
      </div>

      {/* Footer Credentials */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto" onClick={e => e.stopPropagation()}>
        
        {/* Source and author name */}
        <div className="text-[10px] text-slate-400">
          <span className="text-slate-500">Kaynak: </span>
          <span className="font-medium text-slate-350">{news.source}</span>
          <span className="mx-1.5 text-white/5">•</span>
          <span className="font-mono text-cyan-400/90">@{news.author}</span>
        </div>

        {/* Counter controls */}
        <div className="flex items-center space-x-3.5">
          
          {/* Support likes */}
          <motion.button
            animate={upvoteAnimated ? { scale: [1, 1.2, 1] } : {}}
            onClick={handleUpvote}
            className="flex items-center space-x-1 text-slate-500 hover:text-rose-400 transition"
            title="Beğen"
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span className="text-xs font-mono">{news.upvotes}</span>
          </motion.button>

          {/* Comments count */}
          <div className="flex items-center space-x-1.5 text-slate-500">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-mono">{news.commentsCount}</span>
          </div>

          {/* Read anchor link icon */}
          <button
            onClick={() => onSelect(news)}
            className="p-1 px-2.5 bg-indigo-500/10 rounded-lg text-indigo-300 hover:text-white transition text-xs flex items-center space-x-1"
          >
            <span>Oku</span>
            <BookOpen className="w-3 h-3" />
          </button>
        </div>

      </div>

    </motion.article>
  );
}
