/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ThumbsUp, Calendar, User, Clock, MessageSquare, 
  Send, Share2, Check, ArrowRight, HelpCircle 
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

  // Custom comments states
  const [comments, setComments] = useState<Comment[]>([]);
  const [username, setUsername] = useState('');
  const [commentText, setCommentText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const matched = findNewsBySlug(newsList, slug);
    if (matched) {
      setArticle(matched);
      document.title = `${matched.title} - AIFısıltısı Gündem`;
      
      // Load specific comments from localstorage
      const stored = localStorage.getItem(`comments_news_${matched.id}`);
      if (stored) {
        setComments(JSON.parse(stored));
      } else {
        // Form initial mockup reviews
        const demoComments: Comment[] = [
          {
            id: 'cn-1',
            targetId: matched.id,
            username: 'TeknoOkur',
            commentText: 'Bu gelişmeyi bir süredir bekliyordum! Yapay zeka dünyasında rekabetin bu kadar hız kazanması biz son kullanıcılara son derece yarıyor. Teşekkürler fısıltı ekibi!',
            date: '17 Haziran 2026'
          }
        ];
        setComments(demoComments);
        localStorage.setItem(`comments_news_${matched.id}`, JSON.stringify(demoComments));
      }
    } else {
      navigate('/404');
    }
  }, [slug, newsList, navigate]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !commentText.trim()) return;

    const newComment: Comment = {
      id: Math.random().toString(),
      targetId: article.id,
      username: username.trim(),
      commentText: commentText.trim(),
      date: 'Bugün'
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(`comments_news_${article.id}`, JSON.stringify(updated));
    setCommentText('');
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Recommendations
  const otherNews = newsList
    .filter(n => n.id !== article.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 py-16 px-4 sm:px-8 relative overflow-hidden">
      
      {/* Decorative background aura */}
      <span className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto space-y-10 relative z-10">
        
        {/* Back navigation */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs sm:text-sm text-slate-400 hover:text-white font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Haber Akışına Dön</span>
          </Link>
        </div>

        {/* Dynamic Editorial Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main content block */}
          <div className="lg:col-span-8 space-y-8">
            
            <div className="space-y-4">
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

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
                {article.title}
              </h1>

              <div className="flex items-center justify-between border-y border-white/5 py-3 pt-4">
                <div className="flex items-center space-x-2 text-xs font-semibold">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-350">Yazar: {article.author}</span>
                  <span className="text-slate-600">({article.source})</span>
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
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Main Post Media / Image placeholder */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-slate-900/50">
              <img
                src={article.imageUrl || "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000"}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[#02040a] to-transparent" />
            </div>

            {/* Editorial Articles Content Text */}
            <div className="text-sm sm:text-base text-slate-200 leading-relaxed font-light space-y-6 font-sans whitespace-pre-line tracking-wide">
              {article.content}
            </div>

            {/* Article Local Comments Engine */}
            <div className="p-6 sm:p-8 bg-white/[0.01] border border-white/5 rounded-3xl space-y-6">
              <h3 className="text-sm font-bold text-white tracking-widest uppercase font-mono border-b border-white/5 pb-3 flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>YORUMLAR / FIKIRLER ({comments.length})</span>
              </h3>

              {/* Form elements */}
              <form onSubmit={handleAddComment} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    required
                    maxLength={20}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Takma adınız..."
                    className="sm:col-span-1 bg-slate-950 border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none transition"
                  />
                  <input
                    type="text"
                    required
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
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

              {/* Comments Render list */}
              <div className="space-y-3 pt-4">
                {comments.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4 font-light">Bu haber hakkında henüz fikir paylaşılmamış. İlk fısıldayan siz olun!</p>
                ) : (
                  comments.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 rounded-xl bg-white/[0.005] border border-white/5 text-xs sm:text-sm space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">@{c.username}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{c.date}</span>
                      </div>
                      <p className="text-slate-350 leading-relaxed font-light">{c.commentText}</p>
                    </div>
                  ))
                )}
              </div>

            </div>

          </div>

          {/* Right sidebar details */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* SPONSOR banner block */}
            <div className="p-6 bg-gradient-to-br from-indigo-950/10 to-indigo-900/10 border border-cyan-500/20 rounded-3xl relative overflow-hidden shadow-xl">
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

            {/* Other Trending Articles suggestions */}
            <div className="p-6 bg-white/[0.01] border border-white/5 rounded-3xl space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-white/5 pb-2">
                DİĞER ÖNE ÇIKAN HABERLER
              </h4>
              <div className="space-y-4">
                {otherNews.map((n) => (
                  <Link
                    key={n.id}
                    to={`/news/${slugify(n.title)}`}
                    className="block space-y-1 group"
                  >
                    <span className="font-bold text-xs text-white group-hover:text-cyan-400 transition leading-snug line-clamp-2">{n.title}</span>
                    <span className="text-[10px] text-slate-500 font-mono italic block">{n.date}</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
