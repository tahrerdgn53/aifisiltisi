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
  Sparkles
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
  if (!slug || newsList.length === 0) return;

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
      date: 'Bugün'
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

  const recommendedNews = newsList
    .filter((news) => news.id !== article.id)
    .sort((first, second) => {
      const firstSameCategory = first.category === article.category ? 1 : 0;
      const secondSameCategory = second.category === article.category ? 1 : 0;

      if (firstSameCategory !== secondSameCategory) {
        return secondSameCategory - firstSameCategory;
      }

      const firstDate = new Date(first.createdAt || first.date || 0).getTime();
      const secondDate = new Date(second.createdAt || second.date || 0).getTime();
      return secondDate - firstDate;
    })
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 py-16 px-4 sm:px-8 relative overflow-hidden">
      <span className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        <div>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs sm:text-sm text-slate-400 hover:text-white font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Gündem ve Analizlere Dön</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500">
                <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-widest font-mono">
                  {article.category}
                </span>
                <span>&bull;</span>
                <span className="flex items-center space-x-1 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.date}</span>
                </span>
                <span>&bull;</span>
                <span className="flex items-center space-x-1 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-[1.05] tracking-tight max-w-4xl">
                {article.title}
              </h1>

              {article.summary && (
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-3xl">
                  {article.summary}
                </p>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-y border-white/5 py-4">
                <div className="flex items-center space-x-3 text-xs font-semibold">
                  <div className="w-9 h-9 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-slate-200">{article.author}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{article.source}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpvoteNews(article.id)}
                    className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/15 text-cyan-300 border border-cyan-500/25 rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{article.upvotes} Beğeni</span>
                  </button>

                  <button
                    onClick={handleShareClick}
                    className="p-1.5 bg-white/5 border border-white/5 text-slate-400 hover:text-white rounded-lg transition cursor-pointer"
                    aria-label="Makale bağlantısını kopyala"
                  >
                    {copiedLink ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-slate-900/50">
              <img
                src={
                  article.imageUrl ||
                  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1400'
                }
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-85"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[#02040a]/80 via-transparent to-transparent" />
            </div>

            <article className="max-w-3xl text-base sm:text-[17px] text-slate-200 leading-8 sm:leading-9 font-light space-y-7 font-sans whitespace-pre-line tracking-[0.01em]">
              {article.content}
            </article>

            <div className="text-red-400 text-sm">
  Toplam makale: {newsList.length} | Önerilen makale: {recommendedNews.length}
</div>
            
            {recommendedNews.length > 0 && (
              <section className="pt-6 space-y-6">
                <div className="flex items-end justify-between gap-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-cyan-400">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.22em] font-mono">
                        Okumaya devam et
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      Bunlar da İlginizi Çekebilir
                    </h2>
                    <p className="text-sm text-slate-400 font-light">
                      Aynı konuyu farklı açılardan ele alan seçilmiş içerikler.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {recommendedNews.map((news) => (
                    <Link
                      key={news.id}
                      to={`/news/${slugify(news.title)}`}
                      className="group rounded-2xl overflow-hidden border border-white/5 bg-white/[0.015] hover:border-cyan-500/25 hover:bg-cyan-500/[0.025] transition-all duration-300"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900/60">
                        <img
                          src={
                            news.imageUrl ||
                            'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=900'
                          }
                          alt={news.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-[1.03] transition duration-500"
                        />
                        <span className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/10 to-transparent" />
                        <span className="absolute left-4 bottom-4 text-[9px] bg-cyan-500/15 text-cyan-300 border border-cyan-500/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider font-mono">
                          {news.category}
                        </span>
                      </div>

                      <div className="p-5 space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug group-hover:text-cyan-300 transition line-clamp-3">
                            {news.title}
                          </h3>
                          <p className="text-xs text-slate-400 leading-relaxed font-light line-clamp-3">
                            {news.summary}
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-white/5 pt-3 text-[10px] text-slate-500 font-mono">
                          <span>{news.readTime}</span>
                          <span className="inline-flex items-center gap-1 text-cyan-400 font-bold">
                            Oku
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="p-6 sm:p-8 bg-white/[0.01] border border-white/5 rounded-3xl space-y-6">
              <h3 className="text-sm font-bold text-white tracking-widest uppercase font-mono border-b border-white/5 pb-3 flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>YORUMLAR / FİKİRLER ({comments.length})</span>
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
                    className="sm:col-span-1 bg-slate-950 border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none transition"
                  />
                  <input
                    type="text"
                    required
                    value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}
                    placeholder="Yazıya dair ne düşünüyorsunuz?"
                    className="sm:col-span-2 bg-slate-950 border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none transition"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 text-xs font-bold rounded-xl transition cursor-pointer flex items-center space-x-1.5"
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
                      className="p-4 rounded-xl bg-white/[0.005] border border-white/5 text-xs sm:text-sm space-y-1.5"
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
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-gradient-to-br from-indigo-950/10 to-indigo-900/10 border border-cyan-500/20 rounded-3xl relative overflow-hidden shadow-xl lg:sticky lg:top-24">
              <div className="relative space-y-4">
                <span className="text-[8px] bg-cyan-500/25 border border-cyan-500/30 text-cyan-400 font-bold px-2 py-0.5 rounded uppercase tracking-widest font-mono">
                  HAFTANIN AI ARACI
                </span>
                <h4 className="text-base font-extrabold text-white tracking-tight">Vercel v0</h4>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Basit bir metin tarifiyle saniyeler içinde React bileşenleri ve hazır tasarımlar üretin.
                </p>
                <Link
                  to="/ai-tools/v0-by-vercel"
                  className="w-full text-center block px-4 py-2.5 bg-cyan-400 hover:bg-cyan-500 text-slate-950 font-black text-xs rounded-xl transition whitespace-nowrap"
                >
                  Aracı İncele &amp; Git
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
