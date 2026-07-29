/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ThumbsUp, Bookmark, ExternalLink, Calendar, User, 
  MessageSquare, Send, Sparkles, Check, Share2, AlertCircle, Info 
} from 'lucide-react';
import { AITool, Comment } from '../types';
import { slugify, findToolBySlug } from '../utils';
import LucideIcon from './LucideIcon';

interface ToolDetailPageProps {
  tools: AITool[];
  onUpvote: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  bookmarkedIds: string[];
}

export default function ToolDetailPage({ 
  tools, 
  onUpvote, 
  onToggleBookmark,
  bookmarkedIds 
}: ToolDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [tool, setTool] = useState<AITool | null>(null);
  
  // Custom comments system
  const [comments, setComments] = useState<Comment[]>([]);
  const [username, setUsername] = useState('');
  const [commentText, setCommentText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Load target tool and its custom mock comments based on slug / id
  useEffect(() => {
    if (!slug) return;
    const matched = findToolBySlug(tools, slug);
    if (matched) {
      setTool(matched);
      document.title = `${matched.name} - En İyi Yapay Zeka Araçları - AIFısıltısı`;
      
      // Load comments from localstorage specific to this tool
      const stored = localStorage.getItem(`comments_${matched.id}`);
      if (stored) {
        const parsed = JSON.parse(stored) as Comment[];
        // Filter out preset comments that start with 'c-'
        const userComments = parsed.filter(c => !c.id.startsWith('c-'));
        setComments(userComments);
        localStorage.setItem(`comments_${matched.id}`, JSON.stringify(userComments));
      } else {
        setComments([]);
      }
    } else {
      // Redirect to 404 if not found
      navigate('/404');
    }
  }, [slug, tools, navigate]);

  if (!tool) {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  const isBookmarked = bookmarkedIds.includes(tool.id);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !commentText.trim()) return;

    const newComment: Comment = {
      id: Math.random().toString(),
      targetId: tool.id,
      username: username.trim(),
      commentText: commentText.trim(),
      date: 'Bugün'
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(`comments_${tool.id}`, JSON.stringify(updated));
    setCommentText('');
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Filter recommendations
  const relatedTools = tools
    .filter(t => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 py-16 px-4 sm:px-8 relative overflow-hidden">
      
      {/* Dynamic background lighting */}
      <span className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Back Link Row */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs sm:text-sm text-slate-400 hover:text-white font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kataloğa Geri Dön</span>
          </Link>
        </div>

        {/* Master details section grid */}
        <div className="space-y-10">
          
          {/* LEFT: Broad specs and commentary (8 cols) */}
          <div className="space-y-8">
            
     {/* Premium Tool Hero */}
<section className="relative overflow-hidden rounded-3xl border border-cyan-500/15 bg-gradient-to-br from-white/[0.04] via-white/[0.015] to-cyan-950/10 p-6 sm:p-9 shadow-2xl shadow-cyan-950/20">
  <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
  <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

  <div className="relative">
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
      
      {/* Tool identity */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-300 shadow-lg shadow-cyan-500/10">
          <LucideIcon name={tool.logo} size={38} />
        </div>

        <div className="max-w-2xl">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300">
              {tool.category}
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300">
              {tool.pricing}
            </span>

            {tool.featured && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                <Sparkles className="h-3 w-3" />
                Editörün Seçimi
              </span>
            )}
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            {tool.name}
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            {tool.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
            <span>
              Geliştirici:{' '}
              <strong className="font-semibold text-slate-300">
                {tool.developer || tool.name}
              </strong>
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block" />

            <span>
              Aİ Fısıltısı araç kataloğunda incelendi
            </span>
          </div>
        </div>
      </div>

      {/* Main actions */}
      <div className="flex shrink-0 flex-wrap items-center gap-2 lg:max-w-[260px] lg:justify-end">
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-500/15 transition hover:-translate-y-0.5 hover:from-cyan-500 hover:to-blue-700 lg:flex-none"
        >
          Resmî Site
          <ExternalLink className="h-4 w-4" />
        </a>

        <button
          onClick={() => onToggleBookmark(tool.id)}
          className={`rounded-xl border p-3 transition ${
            isBookmarked
              ? 'border-rose-400/30 bg-rose-500/10 text-rose-300'
              : 'border-white/10 bg-white/[0.04] text-slate-400 hover:border-cyan-400/20 hover:text-white'
          }`}
          title={isBookmarked ? 'Favorilerden kaldır' : 'Favorilere ekle'}
        >
          <Bookmark className="h-4 w-4" />
        </button>

        <button
          onClick={handleShareClick}
          className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-slate-400 transition hover:border-cyan-400/20 hover:text-white"
          title="Bağlantıyı kopyala"
        >
          {copiedLink ? (
            <Check className="h-4 w-4 text-emerald-400" />
          ) : (
            <Share2 className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>

    {/* Footer information */}
    <div className="mt-8 flex flex-col gap-5 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {tool.tags.slice(0, 5).map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="rounded-lg border border-white/5 bg-slate-950/60 px-3 py-1.5 text-[11px] text-slate-400"
          >
            #{tag}
          </span>
        ))}
      </div>

      <button
        onClick={() => onUpvote(tool.id)}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2.5 text-xs font-bold text-cyan-300 transition hover:bg-cyan-500/20"
      >
        <ThumbsUp className="h-4 w-4" />
        <span>{tool.upvotes} kişi beğendi</span>
      </button>
    </div>
  </div>
</section>

            {/* Detailed long explanation markup */}
            <div className="p-6 sm:p-8 bg-white/[0.01] border border-white/5 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold text-white tracking-widest uppercase font-mono border-b border-white/5 pb-3">
                DETAYLI BİLGİ VE ANALİZ
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light font-sans whitespace-pre-line tracking-wide">
                {tool.longDescription || tool.description}
              </p>
              
              <div className="pt-6">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2.5 px-6 py-3.5 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-cyan-500/10 cursor-pointer"
                >
                  <span>Resmi Web Sitesine Git</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* AI Fısıltısı Editorial Review */}
<section className="relative overflow-hidden rounded-3xl border border-cyan-500/15 bg-gradient-to-br from-cyan-950/20 via-white/[0.015] to-indigo-950/10 p-6 sm:p-8">
  <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

  <div className="relative">
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-300">
        <Sparkles className="h-5 w-5" />
      </div>

      <div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
          Editör Değerlendirmesi
        </span>

        <h2 className="mt-2 text-xl font-black tracking-tight text-white sm:text-2xl">
          Aİ Fısıltısı’nın {tool.name} Yorumu
        </h2>
      </div>
    </div>

    <div className="mt-6 border-t border-white/5 pt-6">
      <p className="text-sm leading-7 text-slate-300 sm:text-base">
        {tool.name}, {tool.category.toLowerCase()} kategorisinde çözüm arayan
        kullanıcılar için dikkat çeken seçeneklerden biridir.{' '}
        {tool.description} Kullanım amacı, bütçe ve ihtiyaç duyulan özellikler
        değerlendirilerek tercih edilmesi önerilir.
      </p>
    </div>

    <div className="mt-6 flex flex-wrap gap-2">
      <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
        Kullanıcı dostu
      </span>

      <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
        {tool.pricing}
      </span>

      <span className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300">
        {tool.category}
      </span>
    </div>
  </div>
</section>

            {/* Target Audience */}
<section className="rounded-3xl border border-white/5 bg-white/[0.01] p-6 sm:p-8">
  <div className="mb-6">
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
      Doğru Kullanıcıyı Bul
    </span>

    <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
      Kimler İçin Uygun?
    </h2>

    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
      {tool.name}, özellikle aşağıdaki kullanıcı profilleri için değerlendirilebilir.
    </p>
  </div>

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {tool.tags.slice(0, 4).map((tag, index) => (
      <div
        key={`${tag}-${index}`}
        className="rounded-2xl border border-white/5 bg-slate-950/50 p-5 transition hover:border-cyan-400/20 hover:bg-slate-950/80"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-300">
          <User className="h-5 w-5" />
        </div>

        <h3 className="mt-4 text-sm font-bold capitalize text-white">
          {tag}
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          {tool.name} ile {tag.toLowerCase()} odaklı süreçlerini geliştirmek isteyen kullanıcılar.
        </p>
      </div>
    ))}
  </div>
</section>

            {/* Use Cases */}
<section className="rounded-3xl border border-white/5 bg-white/[0.01] p-6 sm:p-8">
  <div className="mb-6">
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
      Neler Yapabilirsiniz?
    </span>

    <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
      Kullanım Alanları
    </h2>

    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
      {tool.name}, aşağıdaki görev ve üretim süreçlerinde kullanılabilir.
    </p>
  </div>

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {tool.tags.slice(0, 6).map((tag, index) => (
      <div
        key={`${tag}-${index}`}
        className="group flex items-start gap-4 rounded-2xl border border-white/5 bg-slate-950/50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400/25 hover:bg-slate-950/80"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300">
          <Check className="h-5 w-5" />
        </div>

        <div>
          <h3 className="text-sm font-bold capitalize text-white">
            {tag}
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            {tool.name} ile {tag.toLowerCase()} odaklı çalışmalarınızı daha hızlı ve verimli şekilde gerçekleştirebilirsiniz.
          </p>
        </div>
      </div>
    ))}
  </div>
</section>

            {/* Live Interactive Comments Area */}
            <div className="p-6 sm:p-8 bg-white/[0.01] border border-white/5 rounded-3xl space-y-6">
              <h3 className="text-sm font-bold text-white tracking-widest uppercase font-mono border-b border-white/5 pb-3 flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>KULLANICI TARTIŞMALARI ({comments.length})</span>
              </h3>

              {/* Form to submit review */}
              <form onSubmit={handleAddComment} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    required
                    maxLength={20}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="İsminiz / Nickname..."
                    className="sm:col-span-1 bg-slate-950 border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none transition"
                  />
                  <input
                    type="text"
                    required
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Araca dair fikirlerinizi buraya fısıldayın..."
                    className="sm:col-span-2 bg-slate-950 border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none transition"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 text-xs font-bold rounded-xl transition cursor-pointer flex items-center space-x-1.5"
                  >
                    <span>Yayınla</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* Comments Render list */}
              <div className="space-y-3 pt-4">
                {comments.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4 font-light">Henüz yorum yok. İlk yorumu sen fısılda.</p>
                ) : (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-4 rounded-xl bg-white/[0.005] border border-white/5 text-xs sm:text-sm space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200 flex items-center space-x-1">
                          <User className="w-3.5 h-3.5 text-cyan-400" />
                          <span>@{comment.username}</span>
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">{comment.date}</span>
                      </div>
                      <p className="text-slate-350 leading-relaxed font-light">{comment.commentText}</p>
                    </div>
                  ))
                )}
              </div>

            </div>

          </div>

          {/* RIGHT: Sponsored layout and Affiliate Sidebar panels (4 cols) */}
          <div className="space-y-6">

          {/* Premium Related Tools */}
<section className="rounded-3xl border border-white/5 bg-white/[0.01] p-6 sm:p-8">
  <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
        Alternatifleri Keşfet
      </span>

      <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
        Benzer AI Araçları
      </h2>

      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
        {tool.name} ile aynı kategoride yer alan alternatif araçları
        karşılaştırarak ihtiyacınıza en uygun seçeneği keşfedin.
      </p>
    </div>

    <span className="text-xs font-medium text-slate-500">
      {relatedTools.length} alternatif
    </span>
  </div>

  {relatedTools.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {relatedTools.map((relatedTool) => (
        <Link
          key={relatedTool.id}
          to={`/ai-tools/${slugify(relatedTool.name)}`}
          className="group flex min-h-[190px] flex-col justify-between rounded-2xl border border-white/5 bg-slate-950/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-slate-950/80 hover:shadow-xl hover:shadow-cyan-500/5"
        >
          <div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-300">
                <LucideIcon name={relatedTool.logo} size={22} />
              </div>

              <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {relatedTool.pricing}
              </span>
            </div>

            <h3 className="mt-5 text-lg font-black text-white transition group-hover:text-cyan-300">
              {relatedTool.name}
            </h3>

            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-400">
              {relatedTool.description}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {relatedTool.category}
            </span>

            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400">
              İncele
              <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/30 px-6 py-10 text-center">
      <p className="text-sm text-slate-500">
        Bu kategoride henüz başka bir araç bulunmuyor.
      </p>
    </div>
  )}
</section>

          </div>

        </div>

      </div>
    </div>
  );
}
