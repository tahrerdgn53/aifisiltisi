import React, { useEffect, useState } from 'react';
import { Save, X } from 'lucide-react';
import { AINews } from '../types';

interface EditNewsPanelProps {
  news: AINews;
  onUpdateNews: (news: AINews) => void | Promise<void>;
  onClose: () => void;
}

export default function EditNewsPanel({
  news,
  onUpdateNews,
  onClose
}: EditNewsPanelProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [source, setSource] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    setTitle(news.title || '');
    setCategory(news.category || 'Genel');
    setAuthor(news.author || '');
    setSource(news.source || '');
    setExcerpt(news.excerpt || '');
    setContent(news.content || '');
    setSaveMessage('');
  }, [news]);

  const handleSave = async () => {
    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setSaveMessage('Başlık, kısa özet ve makale içeriği zorunludur.');
      return;
    }

    try {
      setIsSaving(true);
      setSaveMessage('');

      const updatedNews: AINews = {
        ...news,
        title: title.trim(),
        category: category.trim() || 'Genel',
        author: author.trim() || 'AI Fısıltısı',
        source: source.trim() || 'AI Fısıltısı',
        excerpt: excerpt.trim(),
        content: content.trim(),
        readTime: `${Math.max(
          2,
          Math.ceil(content.trim().length / 500)
        )} dk okuma`
      };

      await onUpdateNews(updatedNews);

      setSaveMessage('Makale başarıyla güncellendi.');

      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    } catch (error) {
      console.error('News editing error:', error);
      setSaveMessage('Makale güncellenirken bir hata oluştu.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-indigo-500/20 bg-[#050a13] shadow-2xl shadow-indigo-950/10">
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <div>
          <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-indigo-400">
            Makale düzenleme paneli
          </span>

          <h4 className="mt-1 text-sm font-black text-white">
            {news.title}
          </h4>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
          title="Paneli kapat"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-6 p-5 sm:p-6">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-200">
            Makale Başlığı *
          </label>

          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#080c15] px-4 py-3 text-xs text-slate-200 outline-none transition focus:border-indigo-500/50"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-200">
              Kategori
            </label>

            <input
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#080c15] px-4 py-3 text-xs text-slate-200 outline-none transition focus:border-indigo-500/50"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-200">
              Yazar
            </label>

            <input
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#080c15] px-4 py-3 text-xs text-slate-200 outline-none transition focus:border-indigo-500/50"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-200">
              Kaynak
            </label>

            <input
              type="text"
              value={source}
              onChange={(event) => setSource(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#080c15] px-4 py-3 text-xs text-slate-200 outline-none transition focus:border-indigo-500/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-200">
            Kısa Özet *
          </label>

          <textarea
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            rows={3}
            maxLength={200}
            className="w-full resize-y rounded-xl border border-white/10 bg-[#080c15] px-4 py-3 text-xs leading-relaxed text-slate-200 outline-none transition focus:border-indigo-500/50"
          />

          <div className="flex justify-end">
            <span
              className={`text-[9px] font-mono ${
                excerpt.length >= 200
                  ? 'text-orange-400'
                  : 'text-slate-600'
              }`}
            >
              {excerpt.length}/200
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-200">
            Makale İçeriği *
          </label>

          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={16}
            className="w-full resize-y rounded-xl border border-white/10 bg-[#080c15] px-4 py-3 text-xs leading-relaxed text-slate-200 outline-none transition focus:border-indigo-500/50"
          />
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-white/5 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {saveMessage && (
              <p
                className={`text-[11px] font-bold ${
                  saveMessage.includes('başarıyla')
                    ? 'text-emerald-400'
                    : 'text-rose-400'
                }`}
              >
                {saveMessage}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-xs font-bold text-slate-400 transition hover:bg-white/[0.06] hover:text-white disabled:opacity-50 sm:flex-none"
            >
              Vazgeç
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-400 to-blue-600 px-6 py-3 text-xs font-black text-white shadow-lg shadow-indigo-500/10 transition hover:opacity-90 disabled:opacity-50 sm:flex-none"
            >
              <Save className="h-4 w-4" />

              <span>
                {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
