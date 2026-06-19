/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, Bookmark, Calendar, Bot, Lock } from 'lucide-react';

interface HeaderProps {
  activeTab: 'tools' | 'news';
  setActiveTab: (tab: 'tools' | 'news') => void;
  bookmarkedCount: number;
  openWhisperBot: () => void;
  onScrollToSection: (sectionId: string) => void;
  isAdmin: boolean;
}

export default function Header({
  activeTab,
  setActiveTab,
  bookmarkedCount,
  openWhisperBot,
  onScrollToSection,
  isAdmin
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (tab: 'tools' | 'news') => {
    setActiveTab(tab);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => onScrollToSection('explore'), 200);
    } else {
      onScrollToSection('explore');
    }
  };

  const handleBrandClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onScrollToSection('hero');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md px-4 sm:px-8 py-7 bg-[#02040b]/90 border-white/5 text-slate-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={handleBrandClick} 
          className="flex items-center min-w-[280px] cursor-pointer select-none"
        >
          <img 
            src="logo.png" 
            alt="AI Fısıltısı Logo" 
            className="h-[110px] md:h-[150px] w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Navigation & Section Tab controls */}
        <nav className="hidden md:flex items-center space-x-1 p-1 rounded-full bg-slate-950/60 border border-white/5 shadow-inner">
          <button
            onClick={() => handleTabClick('tools')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-black transition-all duration-300 cursor-pointer ${
              activeTab === 'tools' && location.pathname === '/'
                ? 'bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 shadow-lg shadow-cyan-400/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Yapay Zeka Araçları
          </button>
          <button
            onClick={() => handleTabClick('news')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-black transition-all duration-300 cursor-pointer ${
              activeTab === 'news' && location.pathname === '/'
                ? 'bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 shadow-lg shadow-cyan-400/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Haberler &amp; Analizler
          </button>
        </nav>

        {/* Action Widgets */}
        <div className="flex items-center space-x-2.5">

          {/* Whisper Bot Trigger */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={openWhisperBot}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl text-button text-xs font-bold bg-cyan-500/10 hover:bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 shadow-sm shadow-cyan-500/5 transition cursor-pointer"
          >
            <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="hidden xs:inline">Rehbere Sor</span>
          </motion.button>

          {/* Secure Admin Gate Route Trigger Link */}
          <Link
            to="/admin"
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-button text-xs font-bold border transition-all ${
              isAdmin 
                ? 'bg-emerald-500/15 border-emerald-500/20 text-emerald-400 font-extrabold' 
                : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
            }`}
            title="Yönetici Paneli"
          >
            <Lock className={`w-3.5 h-3.5 ${isAdmin ? 'text-emerald-400 animate-pulse' : 'text-cyan-400'}`} />
            <span className="hidden sm:inline">Portal</span>
          </Link>

          {/* Bookmarks Counter */}
          <div
            onClick={() => handleTabClick('tools')}
            className="relative flex items-center justify-center p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
            title="Kaydedilenlerim"
          >
            <Bookmark className="w-4 h-4 text-indigo-400" />
            {bookmarkedCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-black text-white ring-2 ring-indigo-950">
                {bookmarkedCount}
              </span>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
