/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowDown, TrendingUp, Cpu, Volume2, Image as ImageIcon, FileText } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden py-16 sm:py-24">
      
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-indigo-500/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none -z-10 animate-pulse duration-[6000ms]"></div>
      <div className="absolute top-1/3 left-1/4 w-[250px] h-[250px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[90px] pointer-events-none -z-10 animate-bounce duration-[10000ms]"></div>

      {/* Decorative Top Ticker Tag */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium tracking-wide mb-6 backdrop-blur-sm"
      >
        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
        <span>Geleceğin Yapay Zeka Keşif Platformu</span>
      </motion.div>

      {/* Main Taglines */}
      <motion.h2 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-6"
      >
        Yapay Zeka Evrenini <span className="text-cyan-400">Keşfedin</span>
      </motion.h2>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-2xl text-slate-400 text-base sm:text-lg font-normal leading-relaxed mb-10 px-4"
      >
        Yapay zeka araçlarının fısıltı rüzgarını yakalayın. En yeni AI asistanları, fütüristik kod üreticileri ve sıcak teknoloji haberleri bir arada.
      </motion.p>

      {/* Action CTA Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
      >
        <button
          onClick={onExploreClick}
          className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/20 transition duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center space-x-2"
        >
          <span>Kataloğu Keşfet</span>
          <ArrowDown className="w-4 h-4 ml-1 animate-bounce" />
        </button>
      </motion.div>

      {/* Under-hero Mini Live Ticker stats */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="w-full max-w-5xl border border-white/5 bg-white/[0.01] backdrop-blur-sm p-4 sm:p-5 rounded-2xl flex flex-wrap gap-4 items-center justify-around text-slate-400 font-mono text-xs"
      >
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>Filtrelenebilir: <strong className="text-white">60+ AI Araç</strong></span>
        </div>
        <div className="hidden sm:block text-white/10">|</div>
        <div className="flex items-center space-x-2">
          <ImageIcon className="w-4 h-4 text-purple-400" />
          <span>Tasarım Zenginliği: <strong className="text-white">Hiper-Gerçekçilik</strong></span>
        </div>
        <div className="hidden sm:block text-white/10">|</div>
        <div className="flex items-center space-x-2">
          <Volume2 className="w-4 h-4 text-indigo-400" />
          <span>Etiket Erişimi: <strong className="text-white">Tek Tıkla Filtre</strong></span>
        </div>
        <div className="hidden sm:block text-white/10">|</div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>En Çok Tercih Edilen: <strong className="text-white">Cursor AI</strong></span>
        </div>
      </motion.div>

    </section>
  );
}
