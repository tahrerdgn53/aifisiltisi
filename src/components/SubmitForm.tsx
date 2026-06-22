/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Send, CheckCircle2, Tv, AlertCircle, Plus, X } from 'lucide-react';
import { AITool, AINews } from '../types';

interface SubmitFormProps {
  onAddTool: (tool: Omit<AITool, 'upvotes' | 'bookmarks' | 'featured'> & { upvotes?: number; bookmarks?: boolean; featured?: boolean }) => void;
  onAddNews: (news: Omit<AINews, 'upvotes' | 'commentsCount'> & { upvotes?: number; commentsCount?: number }) => void;
}

export default function SubmitForm({ onAddTool, onAddNews }: SubmitFormProps) {
  const [formType, setFormType] = useState<'tool' | 'news'>('tool');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Tool Form state
  const [toolName, setToolName] = useState('');
  const [toolDesc, setToolDesc] = useState('');
  const [toolLongDesc, setToolLongDesc] = useState('');
  const [toolCategory, setToolCategory] = useState('text');
  const [toolUrl, setToolUrl] = useState('');
  const [toolDev, setToolDev] = useState('');
  const [toolPricing, setToolPricing] = useState<'Ücretsiz' | 'Freemium' | 'Ücretli'>('Freemium');
  const [tagInput, setTagInput] = useState('');
  const [toolTags, setToolTags] = useState<string[]>(['Yapay Zeka', 'Yeni']);

  // News Form state
  const [newsTitle, setNewsTitle] = useState('');
  const [newsExcerpt, setNewsExcerpt] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsCategory, setNewsCategory] = useState('Genel');
  const [newsSource, setNewsSource] = useState('');
  const [newsAuthor, setNewsAuthor] = useState('');

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !toolTags.includes(trimmed)) {
      setToolTags([...toolTags, trimmed]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setToolTags(toolTags.filter(t => t !== tag));
  };

  const handleToolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!toolName || !toolDesc || !toolUrl) {
      setError('Lütfen tüm zorunlu alanları (*) doldurun.');
      return;
    }

    try {
      // Validate URL format simply
      const formattedUrl = toolUrl.startsWith('http') ? toolUrl : `https://${toolUrl}`;

      onAddTool({
        id: `custom-tool-${Date.now()}`,
        name: toolName,
        description: toolDesc,
        longDescription: toolLongDesc || toolDesc,
        category: toolCategory,
        url: formattedUrl,
        logo: getRandomLogoIcon(toolCategory),
        pricing: toolPricing,
        tags: toolTags,
        developer: toolDev || 'AI Fısıltısı',
        addedByUser: true
      });

      // Reset
      setToolName('');
      setToolDesc('');
      setToolLongDesc('');
      setToolUrl('');
      setToolDev('');
      setToolTags(['Yapay Zeka', 'Yeni']);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Bir hata oluştu, lütfen girdileri kontrol edin.');
    }
  };

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newsTitle || !newsExcerpt || !newsContent) {
      setError('Lütfen tüm zorunlu alanları (*) doldurun.');
      return;
    }

    onAddNews({
      id: `custom-news-${Date.now()}`,
      title: newsTitle,
      excerpt: newsExcerpt,
      content: newsContent,
      category: newsCategory,
      readTime: `${Math.max(2, Math.ceil(newsContent.length / 500))} dk okuma`,
      date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      source: newsSource || 'Fısıltı Kullanıcı Yayını',
      author: newsAuthor || 'Gizemli Yazar'
    });

    // Reset
    setNewsTitle('');
    setNewsExcerpt('');
    setNewsContent('');
    setNewsCategory('Genel');
    setNewsSource('');
    setNewsAuthor('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  const getRandomLogoIcon = (cat: string) => {
    const map: Record<string, string> = {
      text: 'FileText',
      image: 'Palette',
      video: 'Tv',
      code: 'Cpu',
      voice: 'Volume2',
      productivity: 'Zap'
    };
    return map[cat] || 'Sparkles';
  };

  return (
    <section id="whisper-submit" className="max-w-4xl mx-auto px-4 py-8 sm:py-16">
      
      {/* Visual background badge */}
      <div className="text-center mb-10">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
          Yapay Zeka Evrenine Fısılda
        </h3>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          Keşfettiğin harika bir yapay zeka aracını veya son dakika haberini sitemizde paylaş, toplulukla buluştur!
        </p>
      </div>

      <div className="border border-white/5 bg-[#101119]/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl shadow-indigo-950/20">
        
        {/* Toggle navigation panel */}
        <div className="flex border-b border-white/5 bg-white/[0.01]">
          <button
            type="button"
            onClick={() => {
              setFormType('tool');
              setError('');
            }}
            className={`flex-1 py-4 text-center font-medium text-sm transition-all relative ${
              formType === 'tool' ? 'text-cyan-400 bg-white/[0.01]' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span>AI Araç Fısılda</span>
            {formType === 'tool' && (
              <motion.div layoutId="activeFormTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
            )}
          </button>
          
          <button
            type="button"
            onClick={() => {
              setFormType('news');
              setError('');
            }}
            className={`flex-1 py-4 text-center font-medium text-sm transition-all relative ${
              formType === 'news' ? 'text-cyan-400 bg-white/[0.01]' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span>Yazar Köşesine Haber Fısılda</span>
            {formType === 'news' && (
              <motion.div layoutId="activeFormTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
            )}
          </button>
        </div>

        <div className="p-6 sm:p-10">
          
          {/* Notifications banner */}
          {success && (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm flex items-center space-x-3"
            >
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>Harika! Başarıyla fısıldadın. Gönderin hemen üst panele eklendi ve filtrelenebilir durumda! 🚀</span>
            </motion.div>
          )}

          {error && (
            <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Content */}
          {formType === 'tool' ? (
            <form onSubmit={handleToolSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Araç Adı *
                  </label>
                  <input
                    type="text"
                    required
                    value={toolName}
                    onChange={(e) => setToolName(e.target.value)}
                    placeholder="Örn: VoiceSynth AI"
                    className="w-full bg-white/[0.02] border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Araç Web Adresi (URL) *
                  </label>
                  <input
                    type="text"
                    required
                    value={toolUrl}
                    onChange={(e) => setToolUrl(e.target.value)}
                    placeholder="Örn: voicesynth.ai"
                    className="w-full bg-white/[0.02] border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Kategori *
                  </label>
                  <select
                    value={toolCategory}
                    onChange={(e) => setToolCategory(e.target.value)}
                    className="w-full bg-[#12141c] border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-slate-300 outline-none transition"
                  >
                    <option value="text">Metin & Yazma</option>
                    <option value="image">Görsel & Tasarım</option>
                    <option value="video">Video & Animasyon</option>
                    <option value="code">Yazılım & Kodlama</option>
                    <option value="voice">Ses & Müzik</option>
                    <option value="productivity">Verimlilik</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Ücretlendirme Durumu
                  </label>
                  <div className="flex bg-[#12141c] border border-white/5 rounded-xl p-1 justify-between text-xs">
                    {(['Ücretsiz', 'Freemium', 'Ücretli'] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setToolPricing(mode)}
                        className={`flex-1 py-2 text-center rounded-lg font-medium transition ${
                          toolPricing === mode ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/25' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Geliştirici Kurum/Kişi
                  </label>
                  <input
                    type="text"
                    value={toolDev}
                    onChange={(e) => setToolDev(e.target.value)}
                    placeholder="Örn: OpenAI veya Lab-X"
                    className="w-full bg-white/[0.02] border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Kısa Açıklama * (Maksimum 120 Karakter)
                </label>
                <input
                  type="text"
                  required
                  maxLength={120}
                  value={toolDesc}
                  onChange={(e) => setToolDesc(e.target.value)}
                  placeholder="Araç ne işe yarar? Tek cümleyle özetleyin."
                  className="w-full bg-white/[0.02] border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Detaylı Tanıtım (Bileşen Detay Modalı İçin)
                </label>
                <textarea
                  rows={3}
                  value={toolLongDesc}
                  onChange={(e) => setToolLongDesc(e.target.value)}
                  placeholder="Gelişmiş özellikleri, kullanım yolları ve sağladığı kolaylıklar..."
                  className="w-full bg-white/[0.02] border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition resize-none"
                />
              </div>

              {/* Tag System */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Etiketler (Maksimum 4 etiket tavsiye edilir)
                </label>
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="Yazıp Enter'a basın..."
                    className="flex-1 bg-white/[0.02] border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-xl hover:bg-indigo-500/20 text-sm transition font-medium"
                  >
                    Ekle
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {toolTags.map((t, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-indigo-550/10 border border-indigo-500/20 text-slate-300 text-xs"
                    >
                      <span>#{t}</span>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveTag(t)}
                        className="text-slate-500 hover:text-white transform transition hover:scale-110 ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:opacity-95 text-white font-medium text-sm rounded-xl transition shadow-lg shadow-cyan-500/10 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Aracı Listeye Fısılda</span>
                </button>
              </div>

            </form>
          ) : (
            <form onSubmit={handleNewsSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Haber / İnceleme Başlığı *
                  </label>
                  <input
                    type="text"
                    required
                    value={newsTitle}
                    onChange={(e) => setNewsTitle(e.target.value)}
                    placeholder="Örn: GPT-5 Hakkında Yeni Sızıntılar Doğrulandı"
                    className="w-full bg-white/[0.02] border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Kategori/Etiket
                    </label>
                    <input
                      type="text"
                      value={newsCategory}
                      onChange={(e) => setNewsCategory(e.target.value)}
                      placeholder="Örn: Donanım, AI"
                      className="w-full bg-white/[0.02] border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      İmza / Takma Adınız
                    </label>
                    <input
                      type="text"
                      value={newsAuthor}
                      onChange={(e) => setNewsAuthor(e.target.value)}
                      placeholder="Gizemli Yazar"
                      className="w-full bg-white/[0.02] border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Kaynak Referans Linki / Kurum
                  </label>
                  <input
                    type="text"
                    value={newsSource}
                    onChange={(e) => setNewsSource(e.target.value)}
                    placeholder="Örn: Fısıltı Medya"
                    className="w-full bg-white/[0.02] border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Kısa Özet * (Maksimum 200 Karakter)
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={200}
                    value={newsExcerpt}
                    onChange={(e) => setNewsExcerpt(e.target.value)}
                    placeholder="Haberin ana fikrini anlatan çarpıcı tek satırlık özet..."
                    className="w-full bg-white/[0.02] border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Haber Metni / İçerik Detayı *
                </label>
                <textarea
                  rows={6}
                  required
                  value={newsContent}
                  onChange={(e) => setNewsContent(e.target.value)}
                  placeholder="Detaylı makale, haber anlatımı veya kişisel inceleme yazınız..."
                  className="w-full bg-white/[0.02] border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:opacity-95 text-white font-medium text-sm rounded-xl transition shadow-lg shadow-cyan-500/10 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Haberi Yazar Köşesine Yayınla</span>
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}
