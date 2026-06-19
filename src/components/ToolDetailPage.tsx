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
        setComments(JSON.parse(stored));
      } else {
        // Feed initial dummy discussions to make it feel extremely active and populated
        const initialCommentsList: Comment[] = [
          {
            id: 'c-1',
            targetId: matched.id,
            username: 'YapayZekaMuarrizi',
            commentText: `Harika bir inceleme! ${matched.name} aracını son 3 aydır projelerimizde aktif olarak kullanıyoruz. Günlük verimliliğimizi en az 2 katına çıkardığını söyleyebilirim. Tavsiye edilir.`,
            date: '16 Haziran 2026'
          },
          {
            id: 'c-2',
            targetId: matched.id,
            username: 'KreatifDirektor',
            commentText: 'Özellikle arayüz hızı ve kullanım kolaylığı açısından piyasadaki diğer rakiplerinin fersah fersah önünde kalıyor. Beğenerek fısıldıyoruz.',
            date: '18 Haziran 2026'
          }
        ];
        setComments(initialCommentsList);
        localStorage.setItem(`comments_${matched.id}`, JSON.stringify(initialCommentsList));
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: Broad specs and commentary (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Main Title & Header Box */}
            <div className="bg-white/[0.02] border border-white/5 p-6 sm:p-8 rounded-3xl relative overflow-hidden">
              <span className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/5 to-indigo-500/5 blur rounded-3xl pointer-events-none" />
              
              <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                
                {/* Logo & Category details */}
                <div className="flex items-start space-x-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent flex items-center justify-center border border-cyan-500/20 shadow-lg text-cyan-400 mt-1 flex-shrink-0">
                    <LucideIcon name={tool.logo} size={30} className="text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-widest font-mono border border-cyan-500/15">
                      {tool.category.toUpperCase()}
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight">{tool.name}</h1>
                    <p className="text-xs text-slate-450 mt-1 font-mono">Geliştirici: {tool.developer || 'Bilinmeyen Ortak'}</p>
                  </div>
                </div>

                {/* Badges / Interactions buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpvote(tool.id)}
                    className="flex items-center space-x-2 px-4 py-2.5 bg-cyan-500/15 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/25 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shadow-md shadow-cyan-500/5"
                  >
                    <ThumbsUp className="w-4 h-4 text-cyan-400" />
                    <span>{tool.upvotes} Beğeni</span>
                  </button>

                  <button
                    onClick={() => onToggleBookmark(tool.id)}
                    className={`p-2.5 rounded-xl border transition cursor-pointer ${
                      isBookmarked
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'
                    }`}
                    title={isBookmarked ? 'Yer İşaretini Kaldır' : 'Favorilere Ekle'}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleShareClick}
                    className="p-2.5 bg-white/5 border border-white/5 text-slate-400 hover:text-white rounded-xl transition cursor-pointer"
                    title="Bağlantıyı kopyala"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Tag links cloud row */}
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/5">
                {tool.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-[#0c101a] text-slate-400 border border-white/5 px-3 py-1 rounded-lg font-light"
                  >
                    #{tag}
                  </span>
                ))}
                <span className="ml-auto text-xs px-2.5 py-1 bg-white/[0.03] border border-white/10 rounded-lg text-slate-400 font-bold">
                  Ödeme Türü: {tool.pricing}
                </span>
              </div>
            </div>

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
                  <p className="text-xs text-slate-500 text-center py-4 font-light">Bu araç hakkında henüz fısıldanmış bir fikir yok. İlk fısıldayan siz olun!</p>
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
          <div className="lg:col-span-4 space-y-6">
            
            {/* SPONSOR banner block */}
            <div className="p-6 bg-gradient-to-br from-indigo-950/10 to-indigo-900/10 border border-cyan-500/20 rounded-3xl relative overflow-hidden shadow-xl">
              <span className="absolute -top-3 -right-3 w-20 h-20 bg-cyan-400/10 rounded-full blur-xl animate-pulse" />
              
              <div className="relative space-y-4">
                <span className="text-[8px] bg-cyan-500/25 border border-cyan-500/30 text-cyan-400 font-bold px-2 py-0.5 rounded uppercase tracking-widest font-mono">
                  SPONSORLU İÇERİK
                </span>
                
                <h4 className="text-base font-extrabold text-white tracking-tight">Haftanın AI Aracı</h4>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  İşinizi otonom hale getirmek için geliştirilen en dinamik yapay zeka entegrasyonu. AIFısıltısı referansı ile hemen ücretsiz deneyin.
                </p>

                <div className="pt-2">
                  <a
                    href="https://cursor.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center block px-4 py-2.5 bg-cyan-400 hover:bg-cyan-500 text-slate-950 font-black text-xs rounded-xl transition"
                  >
                    Hemen Keşfet ($20 Bonus)
                  </a>
                </div>
              </div>
            </div>

            {/* AFFILIATE Banner spot */}
            <div className="p-6 bg-white/[0.01] border border-white/5 rounded-3xl space-y-4">
              <span className="text-[8px] bg-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded uppercase tracking-widest font-mono">
                ORTAKLIK PROGRAMI
              </span>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Sizin de bir AI Aracınız mı Var?</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Girişiminizi her gün binlerce yenilikçi profesyonel ve geliştirici ile buluşturmak için bizimle iletişime geçin.
              </p>
              <Link
                to="/contact"
                className="block text-center text-xs text-cyan-400 hover:text-cyan-300 font-semibold border border-cyan-500/20 hover:border-cyan-500/40 rounded-xl py-2.5 bg-cyan-500/5 transition"
              >
                Bilgi Al ve Sponsor Ol
              </Link>
            </div>

            {/* Related Tools suggestions list */}
            <div className="p-6 bg-white/[0.01] border border-white/5 rounded-3xl space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-white/5 pb-2">
                BENZER AI ARAÇLARI
              </h4>
              <div className="space-y-3">
                {relatedTools.map((rt) => (
                  <Link
                    key={rt.id}
                    to={`/ai-tools/${slugify(rt.name)}`}
                    className="flex items-center space-x-3 p-2 hover:bg-white/[0.03] border border-transparent hover:border-white/5 rounded-xl transition group duration-200"
                  >
                    <div className="w-9 h-9 bg-slate-900 border border-white/5 font-bold flex items-center justify-center rounded-lg text-cyan-400 group-hover:bg-cyan-500/10">
                      <LucideIcon name={rt.logo} size={16} />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-white block group-hover:text-cyan-355 transition truncate max-w-[150px]">{rt.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono italic">{rt.pricing}</span>
                    </div>
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
