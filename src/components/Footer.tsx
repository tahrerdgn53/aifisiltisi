/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Shield, CheckCircle, ExternalLink, Loader2, Heart } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    
    // Simulate Formspree/Mailchimp transmission hook
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 1200);
  };

  return (
    <footer className="border-t border-white/10 bg-[#06080F] text-slate-400 py-16 px-6 sm:px-12 backdrop-blur-md">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand section */}
        <div className="md:col-span-1.5 space-y-4">
          <Link to="/" className="inline-block select-none">
            <img 
              src="./logo.png" 
              alt="AI Fısıltısı Logo" 
              className="h-[70px] md:h-[90px] w-auto object-contain transition-opacity hover:opacity-90"
              referrerPolicy="no-referrer"
            />
          </Link>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            Sektör lideri yapay zeka araçlarını ve anlık teknoloji gelişmelerini derinlemesine analiz edip size fısıldayan bağımsız içerik platformu.
          </p>
          <div className="flex items-center space-x-1 text-[11px] text-slate-550">
            <span>Yapay zeka fısıltılarıyla tasarlandı</span>
            <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" />
          </div>
        </div>

        {/* Dynamic Newsletter subscribe */}
        <div className="md:col-span-1.5 space-y-4">
          <span className="block text-xs font-bold text-slate-200 uppercase tracking-widest font-mono">BÜLTENE ABONE OLUN</span>
          <p className="text-xs text-slate-500 font-light">
            Haftalık filtrelenmiş AI gelişmelerini ve özel fısıltıları kaçırmayın. Sıfır spam, saf teknoloji.
          </p>
          
          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-sm">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz..."
                  className="w-full bg-slate-950 border border-white/10 focus:border-cyan-500/50 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 outline-none transition"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center space-x-1 flex-shrink-0"
              >
                {loading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <span>Kaydol</span>
                )}
              </button>
            </form>
          ) : (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center space-x-2 max-w-sm">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-300 font-medium">Bültene başarıyla kaydedildiniz!</span>
            </div>
          )}
        </div>

        {/* Corporate Pages Links */}
        <div className="space-y-4">
          <span className="block text-xs font-bold text-slate-200 uppercase tracking-widest font-mono">Platform</span>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <Link to="/about" className="hover:text-cyan-400 transition-colors duration-150">Hakkımızda</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-cyan-400 transition-colors duration-150">İletişim &amp; Reklam</Link>
            </li>
            <li>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors duration-150 flex items-center space-x-1">
                <span>GitHub Topluluğu</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>

        {/* Policies Links */}
        <div className="space-y-4">
          <span className="block text-xs font-bold text-slate-200 uppercase tracking-widest font-mono font-mono">Güvencemiz</span>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <Link to="/privacy" className="hover:text-cyan-400 transition-colors duration-150">Gizlilik Politikası</Link>
            </li>
            <li>
              <Link to="/cookies" className="hover:text-cyan-400 transition-colors duration-150">Çerez Politikası</Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-cyan-400 transition-colors duration-150">Kullanım Şartları</Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-550">
        <div className="font-light">
          &copy; 2026 AIFısıltısı. Tüm hakları saklıdır.
        </div>
        
        <div className="flex items-center space-x-4">
          <Link
            to="/admin"
            className="text-[11px] font-semibold text-cyan-500/70 hover:text-cyan-400 hover:underline transition flex items-center space-x-1 cursor-pointer"
          >
            <span>🔒 Yönetici Geçidi</span>
          </Link>
          <span>&bull;</span>
          <span className="font-mono text-[10px] text-slate-600">v2.4.0 Production</span>
        </div>
      </div>
    </footer>
  );
}
