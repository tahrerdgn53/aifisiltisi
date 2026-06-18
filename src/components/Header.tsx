/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Bookmark, Calendar, Bot, Lock } from 'lucide-react';

interface HeaderProps {
  activeTab: 'tools' | 'news';
  setActiveTab: (tab: 'tools' | 'news') => void;
  bookmarkedCount: number;
  openWhisperBot: () => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenAdmin: () => void;
  isAdmin: boolean;
}

export default function Header({
  activeTab,
  setActiveTab,
  bookmarkedCount,
  openWhisperBot,
  onScrollToSection,
  onOpenAdmin,
  isAdmin
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-black/20 backdrop-blur-md px-4 sm:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => onScrollToSection('hero')} 
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
          </div>
          
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              AIFısıltısı
            </h1>
            <p className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">Yapay Zeka Evreni</p>
          </div>
        </div>

        {/* Navigation & Section Tab controls */}
        <nav className="hidden md:flex items-center space-x-1.5 bg-white/[0.02] border border-white/5 p-1 rounded-full">
          <button
            onClick={() => {
              setActiveTab('tools');
              onScrollToSection('explore');
            }}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'tools'
                ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white border border-transparent'
            }`}
          >
            Yapay Zeka Araçları
          </button>
          <button
            onClick={() => {
              setActiveTab('news');
              onScrollToSection('explore');
            }}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'news'
                ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white border border-transparent'
            }`}
          >
            Yazar Köşesi & Haberler
          </button>
        </nav>

        {/* Action Widgets */}
        <div className="flex items-center space-x-3">
          
          {/* Calendar Indicator */}
          <div className="hidden lg:flex items-center space-x-1.5 text-xs font-mono text-slate-400 bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-lg">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            <span>18 Haziran 2026</span>
          </div>

          {/* Whisper Bot Trigger */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={openWhisperBot}
            className="flex items-center space-x-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-button text-xs sm:text-sm font-medium bg-cyan-500/10 hover:bg-cyan-500/15 text-cyan-300 border border-cyan-500/20 shadow-sm shadow-cyan-500/5 transition cursor-pointer"
          >
            <Bot className="w-4 h-4 animate-pulse text-cyan-400" />
            <span className="hidden xs:inline">Asistana Sor</span>
          </motion.button>

          {/* Secure Admin Gate Trigger */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onOpenAdmin}
            className={`flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-button text-xs font-semibold cursor-pointer border transition-all ${
              isAdmin 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:border-cyan-500/30'
            }`}
            title="Yönetim Paneli"
          >
            <Lock className={`w-3.5 h-3.5 ${isAdmin ? 'text-emerald-400' : 'text-cyan-450'}`} />
            <span className="hidden sm:inline">{isAdmin ? 'Yönetici' : 'Yönetim'}</span>
          </motion.button>

          {/* Bookmarks Counter */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              setActiveTab('tools');
              onScrollToSection('explore');
              // Highlight bookmarked tools filter outside if possible
            }}
            className="relative flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition cursor-pointer"
            title="Kaydedilenlerim"
          >
            <Bookmark className="w-5 h-5 text-indigo-400" />
            {bookmarkedCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white ring-2 ring-[#0a0b0d]">
                {bookmarkedCount}
              </span>
            )}
          </motion.div>
        </div>

      </div>
    </header>
  );
}
