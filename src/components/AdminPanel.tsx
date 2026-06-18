/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, LogOut, Trash2, LayoutGrid, Newspaper, Clock, ExternalLink, Settings, Sparkles, User, Info } from 'lucide-react';
import { AITool, AINews } from '../types';
import SubmitForm from './SubmitForm';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onLogin: (passcode: string) => boolean;
  onLogout: () => void;
  tools: AITool[];
  newsList: AINews[];
  onAddTool: (tool: any) => void;
  onAddNews: (news: any) => void;
  onDeleteTool: (id: string) => void;
  onDeleteNews: (id: string) => void;
}

export default function AdminPanel({
  isOpen,
  onClose,
  isAdmin,
  onLogin,
  onLogout,
  tools,
  newsList,
  onAddTool,
  onAddNews,
  onDeleteTool,
  onDeleteNews
}: AdminPanelProps) {
  const [passcodeInput, setPasscodeInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'create' | 'manage_tools' | 'manage_news'>('create');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    const success = onLogin(passcodeInput);
    if (success) {
      setPasscodeInput('');
    } else {
      setErrorMessage('Hatalı şifre! Lütfen girilen kodu kontrol edin.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-55 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#020306] backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-4xl bg-[#090d16]/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/5 z-10 max-h-[90vh] flex flex-col backdrop-blur-xl"
        >
          {/* Top aesthetic color bar */}
          <div className="h-2 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 animate-pulse" />

          {/* Header row */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                {isAdmin ? (
                  <Unlock className="w-5 h-5 text-cyan-400" />
                ) : (
                  <Lock className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight flex items-center space-x-1.5">
                  <span>Yönetim Paneli</span>
                  <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 px-2 py-0.5 rounded-full font-mono font-bold uppercase tracking-widest">YÖNETİCİ</span>
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-400">Eklemeler yapın, içerikleri kontrol edin ve sitenizi sessizce güncelleyin.</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {isAdmin && (
                <button
                  type="button"
                  onClick={onLogout}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20 hover:border-rose-500/35 text-rose-400 text-xs font-semibold rounded-xl transition cursor-pointer"
                  title="Çıkış Yap"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Çıkış</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 rounded-xl text-xs font-medium transition cursor-pointer"
              >
                Kapat
              </button>
            </div>
          </div>

          {/* Main Modal body content */}
          <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-6 scrollbar-thin">
            {!isAdmin ? (
              /* --- SECURE LOGIN GATE VIEW --- */
              <div className="max-w-md mx-auto py-12 text-center space-y-6">
                <div className="w-16 h-16 bg-slate-900/80 border border-white/10 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <Lock className="w-8 h-8 text-cyan-400 animate-pulse" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white tracking-tight">Yönetici Girişi Gerekli</h4>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Bu alana yalnızca site sahibi fısıltı yöneticileri erişebilir. Lütfen özel şifrenizi girin.
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/25 to-blue-500/25 rounded-xl blur opacity-100 group-focus-within:from-cyan-500/40 group-focus-within:to-indigo-500/40 transition duration-300 pointer-events-none"></div>
                    <input
                      type="password"
                      autoFocus
                      required
                      value={passcodeInput}
                      onChange={(e) => {
                        setPasscodeInput(e.target.value);
                        setErrorMessage('');
                      }}
                      placeholder="Şifreyi fısıldayın..."
                      className="relative w-full bg-slate-950/90 text-center border border-white/10 focus:border-cyan-500/50 rounded-xl px-5 py-3.5 text-sm text-slate-200 outline-none transition"
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-xs text-rose-400 font-semibold">{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-cyan-500/10 cursor-pointer"
                  >
                    Giriş Yetkisini Onayla
                  </button>
                </form>

                {/* Helpful Instruction box for AI Studio tester */}
                <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-cyan-300 text-xs flex items-start space-x-2.5 text-left font-light leading-relaxed">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-cyan-400" />
                  <div>
                    <span className="font-bold block mb-0.5">Test İpucu:</span>
                    Arayüzün kurgulanan yönetim mekanizmasını test etmek için şu şifreyi yazın: <strong className="font-mono bg-cyan-900/40 px-1.5 py-0.5 rounded text-white text-[11px]">fisilti123</strong>
                  </div>
                </div>

              </div>
            ) : (
              /* --- HIGH END ADMIN DASHBOARD VIEW --- */
              <div className="space-y-8">
                
                {/* Stats board bar */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">Toplam Yapay Zeka Araçları</span>
                    <span className="text-xl sm:text-2xl font-extrabold text-white mt-1.5 block font-mono">{tools.length} adet</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">Yayınlanmış Haberler</span>
                    <span className="text-xl sm:text-2xl font-extrabold text-white mt-1.5 block font-mono">{newsList.length} adet</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 col-span-2 sm:col-span-1">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">Kategoriler Aktif</span>
                    <span className="text-sm font-semibold text-cyan-400 mt-2 block font-mono">Multimodal & Gelişmiş</span>
                  </div>
                </div>

                {/* Navigation sub tabs */}
                <div className="flex border-b border-white/5 space-x-2">
                  <button
                    onClick={() => setActiveSubTab('create')}
                    className={`py-2 px-4 text-xs sm:text-sm font-bold transition relative ${
                      activeSubTab === 'create' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-350'
                    }`}
                  >
                    <span>Yeni İçerik Yayınla</span>
                    {activeSubTab === 'create' && (
                      <motion.div layoutId="adminSubTabId" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveSubTab('manage_tools')}
                    className={`py-2 px-4 text-xs sm:text-sm font-bold transition relative ${
                      activeSubTab === 'manage_tools' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-350'
                    }`}
                  >
                    <span>AI Araçlarını Yönet ({tools.length})</span>
                    {activeSubTab === 'manage_tools' && (
                      <motion.div layoutId="adminSubTabId" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveSubTab('manage_news')}
                    className={`py-2 px-4 text-xs sm:text-sm font-bold transition relative ${
                      activeSubTab === 'manage_news' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-350'
                    }`}
                  >
                    <span>Makaleleri / Haberleri Yönet ({newsList.length})</span>
                    {activeSubTab === 'manage_news' && (
                      <motion.div layoutId="adminSubTabId" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
                    )}
                  </button>
                </div>

                {/* Tab content area */}
                <div>
                  {activeSubTab === 'create' && (
                    <div className="bg-[#0b0f1a] border border-white/5 rounded-2xl">
                      <SubmitForm
                        onAddTool={onAddTool}
                        onAddNews={onAddNews}
                      />
                    </div>
                  )}

                  {activeSubTab === 'manage_tools' && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs text-slate-500 pb-1 font-mono">
                        <span>Araç Adı & Geliştirici</span>
                        <span>Silme İşlemi</span>
                      </div>
                      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                        {tools.map((theTool) => (
                          <div
                            key={theTool.id}
                            className="flex items-center justify-between p-3.5 bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 rounded-xl text-xs transition"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-cyan-400 fill-current">✦</span>
                              <div>
                                <span className="font-bold text-white block">{theTool.name}</span>
                                <span className="text-[10px] text-slate-500 font-mono">Geliştirici: {theTool.developer || 'Bilinmiyor'} • Fiyat: {theTool.pricing}</span>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                if (window.confirm(`${theTool.name} aracını silmek istediğinize emin misiniz?`)) {
                                  onDeleteTool(theTool.id);
                                }
                              }}
                              className="p-1 px-2 flex items-center space-x-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-450 border border-rose-500/25 rounded-lg transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline text-[9px] font-mono">SİL</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSubTab === 'manage_news' && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs text-slate-500 pb-1 font-mono">
                        <span>Haber Başlığı</span>
                        <span>Silme İşlemi</span>
                      </div>
                      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                        {newsList.map((theNews) => (
                          <div
                            key={theNews.id}
                            className="flex items-center justify-between p-3.5 bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 rounded-xl text-xs transition"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-cyan-400">⚡</span>
                              <div>
                                <span className="font-bold text-white block truncate max-w-sm sm:max-w-lg">{theNews.title}</span>
                                <span className="text-[10px] text-slate-500 font-mono">Yazar: {theNews.author} • Tarih: {theNews.date}</span>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                if (window.confirm(`"${theNews.title}" makalesini tamamen silmek istediğinize emin misiniz?`)) {
                                  onDeleteNews(theNews.id);
                                }
                              }}
                              className="p-1 px-2 flex items-center space-x-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-450 border border-rose-500/25 rounded-lg transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline text-[9px] font-mono">SİL</span>
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

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
