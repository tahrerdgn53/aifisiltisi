/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ThumbsUp,
  Calendar,
  User,
  Clock,
  MessageSquare,
  Send,
  Share2,
  Check,
  ArrowRight,
} from 'lucide-react';
import { AINews, Comment } from '../types';
import { slugify, findNewsBySlug } from '../utils';

interface NewsDetailPageProps {
  newsList: AINews[];
  onUpvoteNews: (id: string) => void;
}

export default function NewsDetailPage({ newsList, onUpvoteNews }: NewsDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<AINews | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);
  const [username, setUsername] = useState('');
  const [commentText, setCommentText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const matched = findNewsBySlug(newsList, slug);

    if (matched) {
      setArticle(matched);
      document.title = `${matched.title} | Aİ Fısıltısı`;

      const stored = localStorage.getItem(`comments_news_${matched.id}`);

      if (stored) {
        const parsed = JSON.parse(stored) as Comment[];
        const userComments = parsed.filter((comment) => !comment.id.startsWith('cn-'));
        setComments(userComments);
        localStorage.setItem(`comments_news_${matched.id}`, JSON.stringify(userComments));
      } else {
        setComments([]);
      }
    } else {
      navigate('/404');
    }
  }, [slug, newsList, navigate]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400" />
      </div>
    );
  }

  const handleAddComment = (event: React.FormEvent) => {
    event.preventDefault();

    if (!username.trim() || !commentText.trim()) return;

    const newComment: Comment = {
      id: Math.random().toString(),
      targetId: article.id,
      username: username.trim(),
      commentText: commentText.trim(),
      date: 'Bugün',
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`comments_news_${article.id}`, JSON.stringify(updatedComments));
    setCommentText('');
  };

  const handleShareClick = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const otherNews = newsList
    .filter((news) => news.id !== article.id)
    .slice(0, 3);

  const contentParagraphs = article.content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 py-16 px-4 sm:px-8 relative overflow-hidden">
      <span className="absolute top-8 right-0 w-[34rem] h-[34rem] bg-cyan-500/[0.05] rounded-full blur-3xl pointer-events-none" />
      <span className="absolute top-[32rem] left-0 w-[28rem] h-[28rem] bg-indigo-500/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-white font-medium transition mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Gündem ve Analizlere Dön</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
          <main className="lg:col-span-8 min-w-0">
            <header className="mb-9">
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-5">
                <span className="text-[10px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-3 py-1 rounded-full font-bold uppercase tracking-[0.18em] font-mono">
                  {article.category}
                </span>

                <span className="hidden sm:inline text-slate-700">•</span>

                <span className="flex items-center gap-1.5 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.date}</span>
                </span>

                <span className="text-slate-700">•</span>

                <span className="flex items-center gap-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.08] tracking-[-0.035em] max-w-4xl">
                {article.title}
              </h1>

              {article.summary && (
                <p className="mt-6 text-base sm:text-xl text-slate-300 leading-8 font-light max-w-3xl">
                  {article.summary}
                </p>
              )}

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-y border-white/[0.07] py-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-cyan-300" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-200 truncate">{article.author}</p>
                    <p className="text-[11px] text-slate-500 font-mono truncate">{article.source}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpvoteNews(article.id)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-cyan-500/10 hover:bg-cyan-500/15 text-cyan-300 border border-cyan-500/25 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{article.upvotes} Beğeni</span>
                  </button>

                  <button
                    onClick={handleShareClick}
                    aria-label="Makale bağlantısını kopyala"
                    className="p-2 bg-white/5 border border-white/[0.07] text-slate-400 hover:text-white hover:bg-white/[0.08] rounded-xl transition cursor-pointer"
                  >
                    {copiedLink ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </header>

            <div className="relative aspect-[16/9] rounded-[1.75rem] overflow-hidden border border-white/[0.07] bg-slate-900/50 shadow-2xl shadow-black/20 mb-12">
              <img
                src={
                  article.imageUrl ||
                  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1400'
                }
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-85"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[#02040a]/70 via-transparent to-transparent" />
            </div>

            <article className="max-w-3xl mx-auto text-[16px] sm:text-[18px] text-slate-200 leading-[1.95] font-light tracking-[-0.01em]">
              {contentParagraphs.map((paragraph, index) => (
                <p
                  key={`${article.id}-paragraph-${index}`}
                  className="mb-7 whitespace-pre-line first-letter:text-slate-100"
                >
                  {paragraph}
                </p>
              ))}
            </article>

            <section className="mt-14 p-6 sm:p-8 bg-white/[0.015] border border-white/[0.07] rounded-3xl space-y-6">
              <h3 className="text-sm font-bold text-white tracking-widest uppercase font-mono border-b border-white/[0.07] pb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>Yorumlar / Fikirler ({comments.length})</span>
              </h3>

              <form onSubmit={handleAddComment} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    required
                    maxLength={20}
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Takma adınız..."
                    className="sm:col-span-1 bg-slate-950 border border-white/[0.07] focus:border-cyan-500/50 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none transition"
                  />

                  <input
                    type="text"
                    required
                    value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}
                    placeholder="Yazıya dair ne düşünüyorsunuz?"
                    className="sm:col-span-2 bg-slate-950 border border-white/[0.07] focus:border-cyan-500/50 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none transition"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Gönder</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              <div className="space-y-3 pt-4">
                {comments.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4 font-light">
                    Henüz yorum yok. İlk yorumu sen fısılda.
                  </p>
                ) : (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-4 rounded-xl bg-white/[0.008] border border-white/[0.06] text-xs sm:text-sm space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">@{comment.username}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{comment.date}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed font-light">{comment.commentText}</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </main>

          <aside className="lg:col-span-4 space-y-6 lg:pt-4">
            <div className="p-6 bg-gradient-to-br from-indigo-950/10 to-indigo-900/10 border border-cyan-500/20 rounded-3xl relative overflow-hidden shadow-xl">
              <div className="relative space-y-4">
                <span className="text-[8px] bg-cyan-500/25 border border-cyan-500/30 text-cyan-400 font-bold px-2 py-0.5 rounded uppercase tracking-widest font-mono">
                  Haftanın AI Aracı
                </span>
                <h4 className="text-base font-extrabold text-white tracking-tight">Vercel v0</h4>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Basit bir metin tarifiyle saniyeler içinde React bileşenleri ve hazır tasarımlar üretin.
                </p>
                <Link
                  to="/ai-tools/v0-by-vercel"
                  className="w-full text-center block px-4 py-2.5 bg-cyan-400 hover:bg-cyan-500 text-slate-950 font-black text-xs rounded-xl transition whitespace-nowrap"
                >
                  Aracı İncele
                </Link>
              </div>
            </div>

            <div className="p-6 bg-white/[0.015] border border-white/[0.07] rounded-3xl space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-white/[0.07] pb-3">
                Diğer Öne Çıkan İçerikler
              </h4>

              <div className="space-y-5">
                {otherNews.map((news) => (
                  <Link
                    key={news.id}
                    to={`/news/${slugify(news.title)}`}
                    className="block group"
                  >
                    <span className="font-bold text-xs text-white group-hover:text-cyan-400 transition leading-snug line-clamp-2">
                      {news.title}
                    </span>
                    <span className="mt-1.5 text-[10px] text-slate-500 font-mono block">
                      {news.date}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-cyan-400 opacity-0 group-hover:opacity-100 transition">
                      Oku <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
