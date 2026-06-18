/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ThumbsUp, Bookmark, Calendar, Globe, Heart, MessageSquare, Send } from 'lucide-react';
import LucideIcon from './LucideIcon';
import { AITool, AINews, Comment } from '../types';

interface ToolDetailModalProps {
  item: AITool | AINews | null;
  onClose: () => void;
  onUpvoteTools: (id: string) => void;
  onUpvoteNews: (id: string) => void;
  onBookmark: (id: string) => void;
  comments: Comment[];
  onAddComment: (commentText: string) => void;
}

export default function ToolDetailModal({
  item,
  onClose,
  onUpvoteTools,
  onUpvoteNews,
  onBookmark,
  comments,
  onAddComment
}: ToolDetailModalProps) {
  const [commentInput, setCommentInput] = useState('');

  if (!item) return null;

  const isTool = (item as any).url !== undefined;
  const filteredComments = comments.filter(c => c.targetId === item.id);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(commentInput);
    setCommentInput('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop overlay filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#030304] backdrop-blur-sm"
        />

        {/* Modal Main container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative w-full max-w-3xl bg-[#0e1017]/95 border border-white/5 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[85vh] flex flex-col backdrop-blur-md"
        >
          {/* Top Banner Accent */}
          <div className="h-2 w-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500" />

          {/* Sticky Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition"
            title="Kapat"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Content Scrollable Area */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1 scrollbar-thin">
            
            {/* Title / Header area */}
            <div className="flex items-start space-x-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 shadow-md">
                {isTool ? (
                  <LucideIcon name={(item as AITool).logo} className="w-7 h-7 text-cyan-400" />
                ) : (
                  <Calendar className="w-7 h-7 text-cyan-400" />
                )}
              </div>
              <div className="max-w-[70%]">
                <div className="flex items-center space-x-2 flex-wrap">
                  <span className="text-xs uppercase tracking-widest font-mono text-cyan-400">
                    {isTool ? (item as AITool).developer : 'AIFısıltısı Haber'}
                  </span>
                  {isTool && (
                    <span className="text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/15 px-2 py-0.5 rounded-full font-medium">
                      {(item as AITool).pricing}
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  {isTool ? (item as AITool).name : (item as AINews).title}
                </h3>
              </div>
            </div>

            {/* Quick stats grid info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.01]">
              
              <div>
                <span className="block text-[10px] font-mono text-slate-500 uppercase">Beğenilme</span>
                <span className="text-sm font-semibold text-white flex items-center space-x-1.5 mt-1">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>{item.upvotes} Fısıltı</span>
                </span>
              </div>
              
              <div>
                <span className="block text-[10px] font-mono text-slate-500 uppercase">Kategori</span>
                <span className="text-sm font-semibold text-cyan-300 mt-1 block capitalize">
                  {isTool ? (item as AITool).category : (item as AINews).category}
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-mono text-slate-500 uppercase">Yorum Sayısı</span>
                <span className="text-sm font-semibold text-slate-300 mt-1 flex items-center space-x-1.5">
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                  <span>{filteredComments.length}</span>
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-mono text-slate-500 uppercase">
                  {isTool ? 'Tavsiye Kaynak' : 'Yayın Tarihi'}
                </span>
                <span className="text-sm font-semibold text-slate-400 mt-1 block truncate">
                  {isTool ? (
                    <a
                      href={(item as AITool).url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline flex items-center space-x-1"
                    >
                      <span>Web Sitesi</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    (item as AINews).date
                  )}
                </span>
              </div>

            </div>

            {/* Content Details paragraph */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest font-mono text-slate-400 font-bold">Detaylı Bilgiler</h4>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-light">
                {isTool ? (item as AITool).longDescription : (item as AINews).content}
              </p>
            </div>

            {/* Custom tags indicators */}
            {isTool && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {(item as AITool).tags.map((tag, idx) => (
                  <span key={idx} className="text-xs bg-indigo-500/5 text-indigo-300 border border-indigo-550/10 px-2.5 py-1 rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Interactions buttons section */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/5">
              
              <button
                onClick={() => isTool ? onUpvoteTools(item.id) : onUpvoteNews(item.id)}
                className="flex items-center space-x-2 px-5 py-2.5 bg-rose-500/10 hover:bg-rose-500/15 border border-rose-550/20 hover:border-rose-500/35 text-rose-300 hover:text-white rounded-xl transition text-sm font-medium cursor-pointer"
              >
                <ThumbsUp className="w-4 h-4 text-rose-400" />
                <span>Bunu Beğen (+1 Oy)</span>
              </button>

              {isTool && (
                <button
                  onClick={() => onBookmark(item.id)}
                  className={`flex items-center space-x-2 px-5 py-2.5 border rounded-xl transition text-sm font-medium cursor-pointer ${
                    (item as AITool).bookmarks
                      ? 'bg-amber-500/10 border-amber-550/20 text-amber-400 hover:bg-amber-500/15'
                      : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${(item as AITool).bookmarks ? 'fill-current text-amber-400' : ''}`} />
                  <span>{(item as AITool).bookmarks ? 'Kaydedildi' : 'Listeme Kaydet'}</span>
                </button>
              )}

              {isTool && (
                <a
                  href={(item as AITool).url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl font-medium text-sm transition hover:opacity-95 shadow-md shadow-indigo-500/10"
                >
                  <span>Resmi Sitesine Git</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Interactive Comment Zone */}
            <div className="space-y-4 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white tracking-wide flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <span>Yorumlar ({filteredComments.length})</span>
                </h4>
                <p className="text-[10px] text-slate-500 font-mono">Düşüncelerini Paylaş</p>
              </div>

              {/* Add Comment input form */}
              <form onSubmit={handleSubmitComment} className="flex gap-2">
                <input
                  type="text"
                  required
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Yorumunuzu fısıldayın..."
                  className="flex-1 bg-white/[0.02] border border-white/5 focus:border-cyan-500/30 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none transition"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 rounded-xl text-xs font-semibold transition flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Yorum Yap</span>
                </button>
              </form>

              {/* Comments flow stack */}
              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                {filteredComments.length > 0 ? (
                  filteredComments.map((com) => (
                    <div key={com.id} className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-300 tracking-wider font-mono">
                          @{com.username}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">{com.date}</span>
                      </div>
                      <p className="text-slate-400 leading-relaxed font-light">{com.commentText}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-xs text-slate-600 italic py-4">
                    Henüz yorum yapılmamış. İlk yorumu sen fısılda! 🌌
                  </p>
                )}
              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
