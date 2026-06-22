/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, LayoutGrid, List, SlidersHorizontal, BookmarkCheck, RotateCcw, AlertCircle, Sparkles } from 'lucide-react';
import { TOOL_CATEGORIES } from '../data';
import { AITool, ToolCategory } from '../types';
import ToolCard from './ToolCard';
import LucideIcon from './LucideIcon';

interface ToolGridProps {
  tools: AITool[];
  onUpvote: (id: string, e: React.MouseEvent) => void;
  onBookmark: (id: string, e: React.MouseEvent) => void;
  onSelect: (tool: AITool) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function ToolGrid({
  tools,
  onUpvote,
  onBookmark,
  onSelect,
  searchQuery,
  setSearchQuery
}: ToolGridProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [pricingFilter, setPricingFilter] = useState<'All' | 'Ücretsiz' | 'Ücretli' | 'Freemium'>('All');
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');

  // Filter tools logic
  const filteredTools = tools.filter((tool) => {
    // Search match
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (tool.developer && tool.developer.toLowerCase().includes(searchQuery.toLowerCase()));

    // Category match
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;

    // Pricing match
    const matchesPricing = pricingFilter === 'All' || tool.pricing === pricingFilter;

    // Bookmarks match
    const matchesBookmarks = !showOnlyBookmarks || tool.bookmarks;

    return matchesSearch && matchesCategory && matchesPricing && matchesBookmarks;
  });

  const clearFilters = () => {
    setActiveCategory('all');
    setPricingFilter('All');
    setShowOnlyBookmarks(false);
    setSearchQuery('');
  };

  return (
    <div id="explore" className="max-w-7xl mx-auto px-4 sm:px-8 py-8 scroll-m-20">
      
      {/* Dynamic filtering bar panel */}
      <div className="bg-white/[0.02] border border-white/5 p-4 sm:p-6 rounded-3xl backdrop-blur-md mb-8">
        
        {/* Search and filters row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* Main Search */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-2xl blur opacity-100 group-focus-within:from-cyan-500/35 group-focus-within:to-blue-500/35 transition duration-300"></div>
            <div className="relative bg-slate-900/85 border border-white/10 rounded-xl flex items-center px-4 py-3.5">
              <Search className="w-4 h-4 text-slate-500 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="AI aracı veya özellik fısılda... (Örn: Cursor, görsel)"
                className="bg-transparent border-none outline-none text-white w-full text-sm placeholder:text-slate-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-1.5 text-slate-400 hover:text-white text-xs font-mono font-bold transition"
                >
                  TEMİZLE
                </button>
              )}
            </div>
          </div>

          {/* Pricing Toggle Pills */}
          <div className="lg:col-span-4 flex items-center justify-between gap-1 p-1 bg-slate-900/60 rounded-2xl border border-white/5 min-w-0">
            <span className="text-[10px] uppercase font-mono text-slate-500 pl-2 hidden xl:inline-block whitespace-nowrap">Ücret:</span>
            {(['All', 'Ücretsiz', 'Ücretli', 'Freemium'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setPricingFilter(mode)}
                className={`flex-1 text-center py-2 px-1.5 sm:px-2.5 rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  pricingFilter === mode
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                {mode === 'All' ? 'Tümü' : mode}
              </button>
            ))}
          </div>

          {/* Bookmarks Toggle button */}
          <div className="lg:col-span-3 flex items-center justify-between sm:justify-end gap-3">
            <button
              onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-2xl border transition-all text-xs font-medium cursor-pointer ${
                showOnlyBookmarks
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow shadow-cyan-500/5'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              <BookmarkCheck className={`w-4 h-4 ${showOnlyBookmarks ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>Sadece Kaydedilenler</span>
            </button>

            {/* Layout switch buttons */}
            <div className="flex bg-white/5 border border-white/10 p-1 rounded-2xl">
              <button
                onClick={() => setLayoutMode('grid')}
                className={`p-2 rounded-xl transition ${
                  layoutMode === 'grid' ? 'bg-[#020617] text-cyan-400' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Izgara Görünümü"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutMode('list')}
                className={`p-2 rounded-xl transition ${
                  layoutMode === 'list' ? 'bg-[#020617] text-cyan-400' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Liste Görünümü"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Categories tags line */}
        <div className="flex items-center space-x-2 mt-6 overflow-x-auto pb-2 scrollbar-thin">
          {TOOL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-white/5 border border-white/10 hover:border-cyan-500/50 text-slate-300'
              }`}
            >
              <LucideIcon name={cat.icon} className={`w-3.5 h-3.5 ${activeCategory === cat.id ? 'text-slate-950' : 'text-slate-400'}`} />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

      </div>

      {/* Grid items layout flow */}
      <AnimatePresence mode="popLayout">
        {filteredTools.length > 0 ? (
          <motion.div 
            layout
            className={
              layoutMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4 max-w-4xl mx-auto'
            }
          >
            {filteredTools.map((tool) => (
              <div 
                key={tool.id} 
                className={layoutMode === 'list' ? 'w-full' : ''}
              >
                {layoutMode === 'grid' ? (
                  <ToolCard
                    tool={tool}
                    onUpvote={onUpvote}
                    onBookmark={onBookmark}
                    onSelect={onSelect}
                  />
                ) : (
                  // Custom elegant Horizontal wide card for List view!
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => onSelect(tool)}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-5 bg-[#12141c]/80 border border-white/5 hover:border-indigo-500/30 rounded-2xl cursor-pointer hover:shadow hover:shadow-indigo-500/5 transition duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/5 border border-white/5">
                        <LucideIcon name={tool.logo} className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm sm:text-base font-bold text-white pr-2">{tool.name}</h4>
                          <span className={`text-[9px] border px-1.5 py-0.5 rounded ${
                            tool.pricing === 'Ücretsiz' ? 'text-emerald-400 border-emerald-500/20' : tool.pricing === 'Freemium' ? 'text-cyan-400 border-cyan-500/20' : 'text-amber-400 border-amber-500/20'
                          }`}>
                            {tool.pricing}
                          </span>
                        </div>
                        <p className="text-slate-400 text-xs mt-1 max-w-lg line-clamp-1">{tool.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 mt-4 sm:mt-0 ml-auto sm:ml-0" onClick={e => e.stopPropagation()}>
                      <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-1 rounded">
                        #{tool.category}
                      </span>
                      <button
                        onClick={(e) => onUpvote(tool.id, e)}
                        className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-indigo-500/10 hover:border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-300 transition text-xs font-mono"
                      >
                        <span>▲</span>
                        <span>{tool.upvotes}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        ) : (
          /* Empty placeholder statement */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-white/5 rounded-3xl bg-white/[0.005] max-w-md mx-auto"
          >
            <AlertCircle className="w-12 h-12 text-slate-600 mb-4" />
            <h5 className="text-base font-bold text-slate-350 mb-1">Hiçbir Fısıltı Bulunamadı</h5>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed mb-6">
              Arama sorgunuza veya seçtiğiniz fiyat/kategori filtrelerine uyan hiçbir yapay zeka aracı bulamadık.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 text-xs font-medium rounded-xl transition flex items-center space-x-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Aramayı & Filtreleri Sıfırla</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
