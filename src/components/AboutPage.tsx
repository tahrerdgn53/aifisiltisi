/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Target, Zap, Heart, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  // Set SEO Header Title and description dynamically
  useEffect(() => {
    document.title = "Hakkımızda - AIFısıltısı";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 py-20 px-4 sm:px-8 relative overflow-hidden">
      
      {/* Decorative background glows */}
      <span className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <span className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        
        {/* Title view container */}
        <div className="space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-1 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold font-mono rounded-full uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Biz Kimiz?</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            Yapay Zekanın Geleceğini <br/>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Derinden Analiz Ediyoruz</span>
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-light font-sans leading-relaxed">
            Hızla gelişen AI ekosisteminde kaybolmamanız için en prestijli araçları filtreleyen ve tarafsız teknoloji fısıltıları sunan bağımsız rehberiniz.
          </p>
        </div>

        {/* Corporate core pillars section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:bg-white/[0.04] transition duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400 mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Tarafsızlık İlkesi</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Hiçbir yapay zeka devinin gölgesinde kalmadan, araçları sadece sundukları gerçek değer ve performans kriterlerine göre puanlıyoruz.
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:bg-white/[0.04] transition duration-300">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400 mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Seçici Kürasyon</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              İnternette yer alan binbirlik "slop" AI araçlarını eliyor, yalnızca günlük üretkenliğinizi zirveye taşıyacak verimli araçları paylaşıyoruz.
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:bg-white/[0.04] transition duration-300">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Hızlı ve Filtrelenmiş</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Gereksiz teknik jargonlardan arındırılmış pratik incelemeler ve anlık fısıltılarla en güncel yapay zeka haberlerine erişim sağlıyoruz.
            </p>
          </div>
        </div>

        {/* Detail editorial values */}
        <div className="p-8 rounded-3xl bg-white/[0.01] border border-white/5 space-y-6">
          <h3 className="text-lg font-extrabold text-white flex items-center space-x-2 border-b border-white/5 pb-4 font-sans uppercase tracking-wider">
            <span>Büyük Misyonumuz &amp; Vizyonumuz</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light tracking-wide">
            AIFısıltısı, 2026 yılında kurulmuş olup, yapay zekayı gündelik yaşamın ve iş modellerinin standart birer çarpanı haline getirmeyi hedefler. Sadece karmaşık kod yazan geliştiriciler için değil, içerik üreticilerinden akademisyenlere, her seviyedeki insanın yapay zeka teknolojilerinden adil ve verimli şekilde faydalanmasını fısıldamayı amaçlıyoruz.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {[
              "Profesyonel ve sadeleştirilmiş arayüz tasarımları",
              "Sponsorlu ve reklamlardan arındırılmış nitelikli listeler",
              "Yapay zeka asistanları ile anlık akıllı eşleştirme",
              "En güncel dil modeli ve multimodal yetenekleri takibi"
            ].map((topic, i) => (
              <div key={i} className="flex items-center space-x-2.5 text-xs text-slate-400">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>{topic}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
