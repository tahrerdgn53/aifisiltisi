/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ThumbsUp, Bookmark, ExternalLink, ArrowRight, User } from 'lucide-react';
import LucideIcon from './LucideIcon';
import { AITool } from '../types';

interface ToolCardProps {
  tool: AITool;
  onUpvote: (id: string, e: React.MouseEvent) => void;
  onBookmark: (id: string, e: React.MouseEvent) => void;
  onSelect: (tool: AITool) => void;
}

export default function ToolCard({ tool, onUpvote, onBookmark, onSelect }: ToolCardProps) {
  const [hovered, setHovered] = useState(false);
  const [upvoteAnimated, setUpvoteAnimated] = useState(false);

  const handleUpvoteClick = (e: React.MouseEvent) => {
    setUpvoteAnimated(true);
    onUpvote(tool.id, e);
    setTimeout(() => setUpvoteAnimated(false), 405);
  };

  const getPricingStyle = (pricing: AITool['pricing']) => {
    switch (pricing) {
      case 'Ücretsiz':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-550/20';
      case 'Freemium':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'Ücretli':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col justify-between h-full bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md"
      onClick={() => onSelect(tool)}
    >
      
      {/* Subtle floating background gradient */}
      <span className="absolute -right-10 -top-10 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-2xl group-hover:from-indigo-500/20 transition-all duration-300 pointer-events-none"></span>

      {/* Top action row */}
      <div className="flex items-start justify-between mb-4">
        
        {/* Category & Logo Icon */}
        <div className="flex items-center space-x-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/5 border border-white/5 group-hover:border-indigo-500/30 transition duration-300">
            <LucideIcon name={tool.logo} className="w-5 h-5 text-indigo-400 group-hover:text-cyan-400 transition-colors" />
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">
              AI Fısıltısı
            </div>
            
            {/* User Submission indicator */}
            {tool.addedByUser && (
              <span className="inline-flex items-center space-x-0.5 mt-0.5 text-[9px] font-mono text-cyan-400/90 bg-cyan-950/20 border border-cyan-550/20 px-1 py-0.5 rounded">
                <User className="w-2 h-2" />
                <span>Kullanıcıdan</span>
              </span>
            )}
          </div>
        </div>

        {/* Action Widgets */}
        <div className="flex items-center space-x-1.5" onClick={(e) => e.stopPropagation()}>
          
          {/* Bookmark Toggle */}
          <button
            onClick={(e) => onBookmark(tool.id, e)}
            className={`p-2 rounded-lg border transition ${
              tool.bookmarks
                ? 'bg-rose-500/15 border-rose-500/25 text-rose-400'
                : 'bg-white/[0.02] border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10'
            }`}
            title={tool.bookmarks ? 'Kaydedilenlerden Çıkar' : 'Kaydedilenlere Ekle'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${tool.bookmarks ? 'fill-current' : ''}`} />
          </button>

          {/* Pricing indicator */}
          <span className={`text-[10px] font-medium border px-2 py-1 rounded-lg ${getPricingStyle(tool.pricing)}`}>
            {tool.pricing}
          </span>
        </div>

      </div>

      {/* Main text descriptors */}
      <div className="flex-1 mb-5">
        <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 flex items-center space-x-1">
          <span>{tool.name}</span>
          {tool.featured && (
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" title="Öne Çıkan" />
          )}
        </h4>
        <p className="text-slate-400 text-xs sm:text-sm font-light mt-2 line-clamp-3 leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Footer tags and score counters */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
        
        {/* Dynamic Tags list */}
        <div className="flex flex-wrap gap-1 max-w-[60%]">
          {tool.tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="text-[10px] text-slate-500 bg-white/[0.01] px-2 py-0.5 rounded font-mono">
              #{tag}
            </span>
          ))}
        </div>

        {/* Upvotes score counter */}
        <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
          
          <motion.button
            animate={upvoteAnimated ? { scale: [1, 1.25, 1], rotate: [0, -10, 0] } : {}}
            transition={{ duration: 0.4 }}
            onClick={handleUpvoteClick}
            className="flex items-center space-x-1.5 bg-indigo-500/5 hover:bg-indigo-500/10 active:bg-indigo-500/15 border border-indigo-500/10 text-indigo-300 hover:text-white px-2.5 py-1.5 rounded-xl transition cursor-pointer text-xs"
          >
            <ThumbsUp className="w-3.5 h-3.5 fill-current text-indigo-400 group-hover:text-cyan-400 transition-colors" />
            <span className="font-mono font-medium">{tool.upvotes}</span>
          </motion.button>

          {/* Go Link indicator */}
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Sitesi Ziyaret Et"
            className="p-1.5 rounded-xl text-slate-500 hover:text-cyan-300 bg-transparent hover:bg-cyan-500/10 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

    </motion.div>
  );
}
