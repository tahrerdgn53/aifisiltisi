/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ToolGrid from './components/ToolGrid';
import NewsSection from './components/NewsSection';
import AdminPanel from './components/AdminPanel';
import WhisperBot from './components/WhisperBot';
import ToolDetailModal from './components/ToolDetailModal';
import { INITIAL_TOOLS, INITIAL_NEWS } from './data';
import { AITool, AINews, Comment } from './types';
import { Sparkles, Bot, ArrowUp, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // --- States ---
  const [tools, setTools] = useState<AITool[]>([]);
  const [newsList, setNewsList] = useState<AINews[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeTab, setActiveTab] = useState<'tools' | 'news'>('tools');
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AITool | AINews | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // --- Admin States ---
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load admin persistence
  useEffect(() => {
    const authStatus = localStorage.getItem('aifisiltisi_isAdmin');
    if (authStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const handleAdminLogin = (passcode: string): boolean => {
    if (passcode === 'fisilti123') {
      setIsAdmin(true);
      localStorage.setItem('aifisiltisi_isAdmin', 'true');
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('aifisiltisi_isAdmin');
  };

  const handleDeleteTool = (id: string) => {
    const updated = tools.filter(t => t.id !== id);
    setTools(updated);
    localStorage.setItem('aifisiltisi_tools_v2', JSON.stringify(updated));
  };

  const handleDeleteNews = (id: string) => {
    const updated = newsList.filter(n => n.id !== id);
    setNewsList(updated);
    localStorage.setItem('aifisiltisi_news_v2', JSON.stringify(updated));
  };

  // --- LocalStorage Loader ---
  useEffect(() => {
    const savedTools = localStorage.getItem('aifisiltisi_tools_v2');
    const savedNews = localStorage.getItem('aifisiltisi_news_v2');
    const savedComments = localStorage.getItem('aifisiltisi_comments_v2');

    if (savedTools) {
      setTools(JSON.parse(savedTools));
    } else {
      setTools(INITIAL_TOOLS);
    }

    if (savedNews) {
      setNewsList(JSON.parse(savedNews));
    } else {
      setNewsList(INITIAL_NEWS);
    }

    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      // Pre-populate some funny/insightful comments
      const defaultComments: Comment[] = [
        {
          id: 'com-1',
          targetId: 'cursor',
          username: 'kodperisi',
          commentText: 'Cursor gerçekten yapay zeka entegrasyonunda harikalar yaratıyor. Tüm backend kodlama işlerimi onunla 10 kat hızlandırdım!',
          date: '17 Haziran 2026'
        },
        {
          id: 'com-2',
          targetId: 'gemini',
          username: 'yapayzekasevdalisi',
          commentText: '2M bağlam penceresi sayesinde PDF incelemek inanılmaz kolaylaştı. Google mühendisleri bu sürümle devasa bir sıçrama yapmış gerçekten.',
          date: '18 Haziran 2026'
        },
        {
          id: 'com-3',
          targetId: 'midjourney',
          username: 'sanat_asigi',
          commentText: 'Midjourney v6 ile gerçekçilik ve metin yazma yeteneği aşırı geliştirilmiş. Tasarımlarımdaki render süresini ciddi derecede optimize etti.',
          date: '15 Haziran 2026'
        }
      ];
      setComments(defaultComments);
    }
  }, []);

  // --- Track scroll to display 'scroll-to-top' button ---
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Helpers to save state changes ---
  const saveTools = (updatedTools: AITool[]) => {
    setTools(updatedTools);
    localStorage.setItem('aifisiltisi_tools_v2', JSON.stringify(updatedTools));
  };

  const saveNews = (updatedNews: AINews[]) => {
    setNewsList(updatedNews);
    localStorage.setItem('aifisiltisi_news_v2', JSON.stringify(updatedNews));
  };

  const saveComments = (updatedComments: Comment[]) => {
    setComments(updatedComments);
    localStorage.setItem('aifisiltisi_comments_v2', JSON.stringify(updatedComments));
  };

  // --- Handlers ---
  const handleUpvoteTool = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = tools.map((t) => {
      if (t.id === id) {
        return { ...t, upvotes: t.upvotes + 1 };
      }
      return t;
    });
    saveTools(updated);

    // Keep selectedItem modal count in sync if active
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem(prev => prev ? { ...prev, upvotes: prev.upvotes + 1 } : null);
    }
  };

  const handleBookmarkTool = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = tools.map((t) => {
      if (t.id === id) {
        return { ...t, bookmarks: !t.bookmarks };
      }
      return t;
    });
    saveTools(updated);

    // Keep selectedItem modal status in sync if active
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem(prev => prev ? { ...prev, bookmarks: !(prev as AITool).bookmarks } : null);
    }
  };

  const handleUpvoteNews = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = newsList.map((n) => {
      if (n.id === id) {
        return { ...n, upvotes: n.upvotes + 1 };
      }
      return n;
    });
    saveNews(updated);

    // Keep selectedItem modal count in sync if active
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem(prev => prev ? { ...prev, upvotes: prev.upvotes + 1 } : null);
    }
  };

  const handleAddToolSubmit = (newTool: Omit<AITool, 'upvotes' | 'bookmarks' | 'featured'> & { upvotes?: number; bookmarks?: boolean; featured?: boolean }) => {
    const formatted: AITool = {
      ...newTool,
      upvotes: newTool.upvotes ?? 1,
      bookmarks: newTool.bookmarks ?? false,
      featured: newTool.featured ?? false
    };
    const updated = [formatted, ...tools];
    saveTools(updated);
  };

  const handleAddNewsSubmit = (newNews: Omit<AINews, 'upvotes' | 'commentsCount'> & { upvotes?: number; commentsCount?: number }) => {
    const formatted: AINews = {
      ...newNews,
      upvotes: newNews.upvotes ?? 1,
      commentsCount: newNews.commentsCount ?? 0
    };
    const updated = [formatted, ...newsList];
    saveNews(updated);
  };

  const handleAddComment = (commentText: string) => {
    if (!selectedItem) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      targetId: selectedItem.id,
      username: `kullanici_${Math.floor(Math.random() * 899) + 100}`,
      commentText: commentText,
      date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    const updated = [newComment, ...comments];
    saveComments(updated);

    // Increments comments count for news category
    if (selectedItem.id.startsWith('news-') || selectedItem.id.startsWith('custom-news-')) {
      const updatedNews = newsList.map(item => {
        if (item.id === selectedItem.id) {
          return { ...item, commentsCount: item.commentsCount + 1 };
        }
        return item;
      });
      saveNews(updatedNews);
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const bookmarkedCount = tools.filter(t => t.bookmarks).length;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans relative selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-cyan-500/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-blue-600/10 blur-[120px]"></div>
      </div>

      {/* Absolute Header Navigation */}
      <div className="relative z-10 w-full">
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          bookmarkedCount={bookmarkedCount}
          openWhisperBot={() => setIsBotOpen(true)}
          onScrollToSection={handleScrollToSection}
          onOpenAdmin={() => setIsAdminOpen(true)}
          isAdmin={isAdmin}
        />
      </div>

      {/* Primary Hero Section */}
      <div className="relative z-10 w-full">
        <Hero
          onExploreClick={() => {
            setActiveTab('tools');
            setTimeout(() => handleScrollToSection('explore'), 50);
          }}
        />
      </div>

      {/* Main Grid & Contents with Tab Switcher */}
      <main className="relative z-10 flex-grow">
        
        {/* Under Hero Selection Tab bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 flex justify-center">
          <div className="flex bg-[#0f172a]/70 border border-white/5 p-1 rounded-2xl shadow-xl backdrop-blur-md">
            <button
              onClick={() => setActiveTab('tools')}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === 'tools'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Yapay Zeka Araçları Kataloğu</span>
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === 'news'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>Haberler & Analizler</span>
            </button>
          </div>
        </div>

        {/* Conditional Layout Rendering */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            {activeTab === 'tools' ? (
              <ToolGrid
                tools={tools}
                onUpvote={handleUpvoteTool}
                onBookmark={handleBookmarkTool}
                onSelect={(tool) => setSelectedItem(tool)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            ) : (
              <NewsSection
                newsList={newsList}
                onUpvoteNews={handleUpvoteNews}
                onSelect={(news) => setSelectedItem(news)}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* The public SubmitForm area has been removed to meet the strict Admin privacy policy */}
      </main>

      {/* Footer Design */}
      <footer className="relative z-10 border-t border-white/5 bg-[#020617]/90 py-12 px-4 sm:px-8 text-slate-500 text-xs text-center backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <div className="flex items-center space-x-1 mb-1">
              <span className="font-bold text-slate-100 text-sm tracking-tight">AI<span className="text-cyan-400 font-extrabold">Fısıltısı</span></span>
              <span className="text-[10px] bg-white/5 border border-white/5 rounded px-1.5 font-mono text-slate-400 uppercase">AIF</span>
            </div>
            <p className="max-w-md text-slate-500 font-light leading-relaxed">
              Yapay zeka araçlarının, fütüristik kod editörlerinin ve son dakika bültenlerinin buluştuğu minimalist ve çağdaş topluluk rehberi.
            </p>
          </div>

          <div className="flex items-center space-x-6 text-slate-400">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-[11px] font-semibold text-cyan-400/80 hover:text-cyan-300 transition duration-200 cursor-pointer flex items-center space-x-1"
            >
              <span>🔒 Yönetici Girişi</span>
            </button>
            <span>•</span>
            <span className="text-[10px] font-mono">Lokal Saat: 18 Haziran 2026</span>
            <span>•</span>
            <button 
              onClick={() => handleScrollToSection('hero')} 
              className="hover:text-cyan-300 transition"
            >
              Yukarı Çık
            </button>
          </div>
        </div>
      </footer>

      {/* --- Secret Admin Dashboard Panel Overlay --- */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        isAdmin={isAdmin}
        onLogin={handleAdminLogin}
        onLogout={handleAdminLogout}
        tools={tools}
        newsList={newsList}
        onAddTool={handleAddToolSubmit}
        onAddNews={handleAddNewsSubmit}
        onDeleteTool={handleDeleteTool}
        onDeleteNews={handleDeleteNews}
      />

      {/* --- Sidebar AI assistant overlay component --- */}
      <WhisperBot
        isOpen={isBotOpen}
        onClose={() => setIsBotOpen(false)}
      />

      {/* --- Card detail modal popup overlay --- */}
      <ToolDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onUpvoteTools={(id) => handleUpvoteTool(id)}
        onUpvoteNews={(id) => handleUpvoteNews(id)}
        onBookmark={(id) => handleBookmarkTool(id)}
        comments={comments}
        onAddComment={handleAddComment}
      />

      {/* --- Back to Top Float Button --- */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => handleScrollToSection('hero')}
            className="fixed bottom-6 left-6 z-40 p-3 rounded-xl bg-[#12141c] hover:bg-cyan-500/20 text-indigo-400 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/30 transition shadow-lg shadow-black/50 cursor-pointer"
            title="Yukarı Git"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
