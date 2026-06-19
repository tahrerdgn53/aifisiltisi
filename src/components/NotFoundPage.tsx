/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, MoveLeft, Terminal } from 'lucide-react';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "Sayfa Bulunamadı (404) - AIFısıltısı";
  }, []);

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 text-center relative overflow-hidden bg-[#020306]">
      
      {/* Decorative vector glows */}
      <span className="absolute w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="space-y-6 relative z-10 max-w-md mx-auto">
        <div className="w-16 h-16 bg-white/[0.02] border border-white/5 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-cyan-500/5">
          <Terminal className="w-8 h-8 animate-pulse text-cyan-400" />
        </div>

        <div className="space-y-2">
          <h1 className="text-8xl font-black text-white leading-none tracking-tighter">404</h1>
          <h2 className="text-lg font-bold text-slate-200 tracking-tight">Kayıp Yapay Zeka Fısıltısı</h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
            Aradığınız sayfa veya yapay zeka makalesi rüzgarda kaybolmuş ya da başka bir boyuta fısıldanmış olabilir.
          </p>
        </div>

        {/* Action Button Links */}
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-cyan-500/10 transition cursor-pointer"
          >
            <MoveLeft className="w-4 h-4" />
            <span>Kataloğa Geri Dön</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
