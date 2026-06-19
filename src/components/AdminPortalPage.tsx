/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, Unlock, LogOut, Trash2, LayoutGrid, Newspaper, Inbox, AlertTriangle, Info } from 'lucide-react';
import { AITool, AINews } from '../types';
import SubmitForm from './SubmitForm';

interface AdminPortalPageProps {
  tools: AITool[];
  newsList: AINews[];
  onAddTool: (tool: any) => void;
  onAddNews: (news: any) => void;
  onDeleteTool: (id: string) => void;
  onDeleteNews: (id: string) => void;
  isAdmin: boolean;
  onLogin: (passcode: string) => boolean;
  onLogout: () => void;
}

export default function AdminPortalPage({
  tools,
  newsList,
  onAddTool,
  onAddNews,
  onDeleteTool,
  onDeleteNews,
  isAdmin,
  onLogin,
  onLogout
}: AdminPortalPageProps) {
  const [passcodeInput, setPasscodeInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'create' | 'manage_tools' | 'manage_news'>('create');

  useEffect(() => {
    document.title = "Sistem Yönetim Paneli - AIFısıltısı";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Perform login
    const success = onLogin(passcodeInput);
    if (success) {
      setPasscodeInput('');
    } else {
      setErrorMessage('Hatalı sistem anahtarı! Yetkisiz istek sonlandırıldı.');
    }
  };

  return (
    <div className="min-h-screen bg-[#020408] text-slate-100 py-16 px-4 sm:px-8 relative overflow-hidden">
      
      {/* Dynamic background lighting */}
      <span className="absolute top-0 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <span className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Top title block */}
        <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-8">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              {isAdmin ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
                <span>Yönetici Kontrol Merkezi</span>
                <span className="text-[9px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 px-2.5 py-0.5 rounded-full font-bold">RESTRİKTE</span>
              </h1>
              <p className="text-xs text-slate-500 mt-1">Platform araçlarını, haber akışlarını ve içerikleri güvenli şekilde güncelleyin.</p>
            </div>
          </div>

          {isAdmin && (
            <button
              onClick={onLogout}
              className="flex items-center space-x-1.5 px-4 py-2 bg-rose-500/15 hover:bg-rose-500/20 border border-rose-500/20 text-rose-450 text-xs font-bold rounded-xl transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sistem Girişini Kapat</span>
            </button>
          )}
        </div>

        {/* Master contents */}
        {!isAdmin ? (
          /* --- RESTRICTED LOGIN ENTRANCE --- */
          <div className="max-w-md mx-auto py-12 text-center space-y-6">
            <div className="w-16 h-16 bg-white/[0.01] border border-white/5 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
              <Lock className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white tracking-tight">Güvenli Katman Şifre Doğrulaması</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                Bu alana yalnızca yetkili AIFısıltısı yöneticileri erişebilir. Lütfen özel fısıltı sistem şifrenizi girin.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 rounded-xl blur opacity-80 group-focus-within:opacity-100 transition duration-300" />
                <input
                  type="password"
                  autoFocus
                  required
                  value={passcodeInput}
                  onChange={(e) => {
                    setPasscodeInput(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="Yönetici anahtarını fısıldayın..."
                  className="relative w-full bg-[#080b12]/95 border border-white/10 focus:border-cyan-500/50 rounded-xl px-5 py-4 text-center text-xs sm:text-sm text-slate-200 outline-none transition"
                />
              </div>

              {errorMessage && (
                <p className="text-xs text-rose-400 font-bold tracking-wide">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 px-5 bg-gradient-to-r from-cyan-400 to-blue-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                Giriş Yetkisini Onayla
              </button>
            </form>

            <div className="p-4 rounded-xl bg-orange-950/20 border border-orange-500/10 text-orange-400 text-xs text-left flex items-start space-x-3 leading-relaxed">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-orange-400" />
              <div>
                <span className="font-bold block mb-1">Erişim Bildirimi:</span>
                Hatalı şifre denemeleri ve yetkisiz erişim istekleri güvenlik politikalarımız gereği kayıt altına fısıldanabilir. Lütfen gizli anahtarınızı kimseyle paylaşmayınız.
              </div>
            </div>

          </div>
        ) : (
          /* --- ADMIN CHANNELS PANEL --- */
          <div className="space-y-8">
            
            {/* Quick counters grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5">
                <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">Kayıtlı AI Araçları</span>
                <span className="text-xl sm:text-2xl font-extrabold text-white mt-1.5 block font-mono">{tools.length} adet</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5">
                <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">Yayınlanmış Haberler</span>
                <span className="text-xl sm:text-2xl font-extrabold text-white mt-1.5 block font-mono">{newsList.length} adet</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 col-span-2 sm:col-span-1">
                <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">Altyapı Güvenliği</span>
                <span className="text-xs font-bold text-emerald-400 mt-2.5 block font-mono">Aktif ve Korumalı</span>
              </div>
            </div>

            {/* Sub menus */}
            <div className="flex border-b border-white/5 space-x-2">
              <button
                onClick={() => setActiveSubTab('create')}
                className={`py-2.5 px-4 text-xs sm:text-sm font-bold transition relative ${
                  activeSubTab === 'create' ? 'text-cyan-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <span>Yeni İçerik Ekle</span>
                {activeSubTab === 'create' && (
                  <motion.div layoutId="subTabBorder" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
                )}
              </button>

              <button
                onClick={() => setActiveSubTab('manage_tools')}
                className={`py-2.5 px-4 text-xs sm:text-sm font-bold transition relative ${
                  activeSubTab === 'manage_tools' ? 'text-cyan-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <span>AI Araçlarını Yönet ({tools.length})</span>
                {activeSubTab === 'manage_tools' && (
                  <motion.div layoutId="subTabBorder" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
                )}
              </button>

              <button
                onClick={() => setActiveSubTab('manage_news')}
                className={`py-2.5 px-4 text-xs sm:text-sm font-bold transition relative ${
                  activeSubTab === 'manage_news' ? 'text-cyan-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <span>Haber ve Makaleleri Yönet ({newsList.length})</span>
                {activeSubTab === 'manage_news' && (
                  <motion.div layoutId="subTabBorder" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
                )}
              </button>
            </div>

            {/* Content areas */}
            <div className="bg-[#040811] p-6 sm:p-8 rounded-3xl border border-white/5 shadow-xl">
              {activeSubTab === 'create' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white tracking-wider uppercase font-mono pb-2 border-b border-white/5">YENİ ARAÇ VEYA HABER YAYINLA</h3>
                  <SubmitForm
                    onAddTool={onAddTool}
                    onAddNews={onAddNews}
                  />
                </div>
              )}

              {activeSubTab === 'manage_tools' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white tracking-wider uppercase font-mono pb-2 border-b border-white/5">AI ARAÇLARINI LİSTEDEN SİL / DÜZENLE</h3>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                    {tools.map((t) => (
                      <div
                        key={t.id}
                        className="flex items-center justify-between p-3.5 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 rounded-xl transition text-xs"
                      >
                        <div className="flex items-center space-x-3 truncate">
                          <span className="text-cyan-400">⚡</span>
                          <div className="truncate">
                            <span className="font-bold text-white block">{t.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono tracking-wide">Developer: {t.developer || 'Belirtilmedi'} &bull; Fiyat: {t.pricing}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (window.confirm(`${t.name} aracını kalıcı olarak silmek istediğinize emin misiniz?`)) {
                              onDeleteTool(t.id);
                            }
                          }}
                          className="flex items-center space-x-1 p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/25 rounded-xl transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline font-mono text-[9px]">SİL</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSubTab === 'manage_news' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white tracking-wider uppercase font-mono pb-2 border-b border-white/5">HABER MAKALE VE GÜNCELLEMELERİ YÖNET</h3>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                    {newsList.map((n) => (
                      <div
                        key={n.id}
                        className="flex items-center justify-between p-3.5 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 rounded-xl transition text-xs"
                      >
                        <div className="flex items-center space-x-3 truncate">
                          <span className="text-indigo-400">⚡</span>
                          <div className="truncate">
                            <span className="font-bold text-white block truncate max-w-sm sm:max-w-md">{n.title}</span>
                            <span className="text-[10px] text-slate-500 font-mono tracking-wide">Yazar: {n.author} &bull; Tarih: {n.date}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (window.confirm(`"${n.title}" makalesini tamamen silmek istediğinize emin misiniz?`)) {
                              onDeleteNews(n.id);
                            }
                          }}
                          className="flex items-center space-x-1 p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/25 rounded-xl transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline font-mono text-[9px]">SİL</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
