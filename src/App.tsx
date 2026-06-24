/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ToolGrid from './components/ToolGrid';
import NewsSection from './components/NewsSection';
import WhisperBot from './components/WhisperBot';
import Footer from './components/Footer';

// Static corporate routed views
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import { PrivacyPage, CookiesPage, TermsPage } from './components/PolicyPages';
import NotFoundPage from './components/NotFoundPage';

// URL Friendly Slugs views
import ToolDetailPage from './components/ToolDetailPage';
import NewsDetailPage from './components/NewsDetailPage';
import AdminPortalPage from './components/AdminPortalPage';

import { supabase } from './supabase';
import { AITool, AINews, Comment } from './types';
import { Sparkles, ArrowUp, Bot, ExternalLink, Flame, BookmarkCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { slugify } from './utils';

/* Homepage catalog controller layout element wrapper */
function HomeLanding({
  tools,
  newsList,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  handleUpvoteTool,
  handleBookmarkTool,
  handleUpvoteNews
}: {
  tools: AITool[];
  newsList: AINews[];
  activeTab: 'tools' | 'news';
  setActiveTab: (tab: 'tools' | 'news') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleUpvoteTool: (id: string) => void;
  handleBookmarkTool: (id: string) => void;
  handleUpvoteNews: (id: string) => void;
}) {
  const navigate = useNavigate();

  // Scroll target element helper
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Find trending pick
  const trendingTool = tools.reduce((prev, current) => (prev.upvotes > current.upvotes ? prev : current), tools[0]);

  return (
    <>
      {/* Primary Hero Section */}
      <Hero
        onExploreClick={() => {
          setActiveTab('tools');
          setTimeout(() => handleScrollToSection('explore'), 50);
        }}
      />

      {/* Main Grid & Contents with Tab Switcher */}
      <main className="relative z-10 flex-grow">
        
        {/* Under Hero Selection Tab bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 flex flex-col items-center justify-center space-y-8">
          
          {/* Bento-Grid monetization banners */}
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl">
            
            {/* 1. Hot trending AI tool picker */}
            <div className="md:col-span-7 p-6 rounded-3xl border bg-gradient-to-tr from-cyan-950/20 to-[#040811] border-cyan-500/20 text-slate-100 shadow-lg shadow-cyan-500/5 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Flame className="w-3.5 h-3.5 mr-1" />
                  <span>HAFTANIN EN POPÜLERİ</span>
                </span>
                {trendingTool && (
                  <>
                    <h4 className="text-xl sm:text-2xl font-black tracking-tight">{trendingTool.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      {trendingTool.description}
                    </p>
                  </>
                )}
              </div>
              <div className="pt-6">
                {trendingTool && (
                  <button
                    onClick={() => navigate(`/ai-tools/${slugify(trendingTool.name)}`)}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
                  >
                    <span>Analizi Oku ve Keşfet</span>
                    <ArrowRight className="w-4 h-4 translate-x-px group-hover:translate-x-1 transition" />
                  </button>
                )}
              </div>
            </div>

            {/* 2. Affiliate / sponsor panel banner link */}
            <div className="md:col-span-5 p-6 rounded-3xl border bg-[#040812] border-white/5 text-slate-100 shadow-lg flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[9px] bg-indigo-505/10 text-indigo-400 font-bold px-2 py-0.5 rounded uppercase tracking-widest font-mono">
                  Sponsorluk
                </span>
                <h4 className="text-lg font-bold tracking-tight">Kendi Projenizi Öne Çıkarın</h4>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  AIFısıltısı sponsor alanları ve affiliate entegrasyonu için hemen bizimle iletişime geçin.
                </p>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full text-center block px-4 py-2.5 bg-gradient-to-r from-cyan-400 to-indigo-500 hover:opacity-90 text-white font-bold text-xs rounded-xl transition"
                >
                  Bilgi Al &amp; Reklam Ver
                </button>
              </div>
            </div>

          </div>

          {/* Under-hero Dynamic Switch Tabs - High contrast redesigned pills */}
          <div className="flex p-1.5 rounded-2xl shadow-xl backdrop-blur-md border bg-slate-950/60 border-white/5">
            <button
              onClick={() => setActiveTab('tools')}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all duration-305 cursor-pointer ${
                activeTab === 'tools'
                  ? 'bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 shadow-lg shadow-cyan-450/20 border-none'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Araçları Kataloğu</span>
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all duration-305 cursor-pointer ${
                activeTab === 'news'
                  ? 'bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 shadow-lg shadow-cyan-450/20 border-none'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>Gündem &amp; Analizler</span>
            </button>
          </div>
        </div>

        {/* Conditional Layout Grid Loading */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'tools' ? (
              <ToolGrid
                tools={tools}
                onUpvote={handleUpvoteTool}
                onBookmark={handleBookmarkTool}
                onSelect={(tool) => {
                  navigate(`/ai-tools/${slugify(tool.name)}`);
                }}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            ) : (
              <NewsSection
                newsList={newsList}
                onUpvoteNews={handleUpvoteNews}
                onSelect={(news) => {
                  navigate(`/news/${slugify(news.title)}`);
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
}

/* Base Root Routing Router container */
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // --- States ---
  const [tools, setTools] = useState<AITool[]>([]);
  const [newsList, setNewsList] = useState<AINews[]>([]);
  const [activeTab, setActiveTab] = useState<'tools' | 'news'>('tools');
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // --- Admin credentials and states ---
  const [isAdmin, setIsAdmin] = useState(false);

  // Loading skeleton on mount
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setInitLoading(false);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  // Load and check persist administrative states
  useEffect(() => {
    const authStatus = localStorage.getItem('aifisiltisi_isAdmin');
    if (authStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const handleAdminLogin = (passcode: string): boolean => {
    // Read optional passcode from environment variables or fallback to obscured test passcode "fisilti123"
    const correctKey = (import.meta as any).env.VITE_ADMIN_PASSCODE || atob('ZmlzaWx0aTEyMw==');
    if (passcode === correctKey) {
      setIsAdmin(true);
      localStorage.setItem('aifisiltisi_isAdmin', 'true');
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('aifisiltisi_isAdmin');
    navigate('/');
  };

  // Manage data list state and sync with localstorage
useEffect(() => {
  const fetchData = async () => {
    const { data: toolsData } = await supabase
      .from('tools')
      .select('*')
      .order('id', { ascending: false });

    const { data: newsData } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    const mappedTools = (toolsData || []).map((tool: any) => ({
      id: String(tool.id),
      name: tool.name,
      url: tool.url,
      category: tool.category,
      pricing: tool.pricing,
      developer: tool.developer,
      description: tool.short_description,
      longDescription: tool.long_description,
      tags: Array.isArray(tool.tags)
        ? tool.tags
        : tool.tags
        ? tool.tags.split(',').map((t: string) => t.trim())
        : [],
      upvotes: 1,
      bookmarks: false,
      featured: false,
      logo: 'Sparkles'
    }));

    const mappedNews = (newsData || []).map((news: any) => ({
      id: String(news.id),
      title: news.title,
      category: news.category,
      author: news.author,
      source: news.source,
      summary: news.summary,
      content: news.content,
      createdAt: news.created_at,
      upvotes: 1,
      commentsCount: 0
    }));

    setTools(mappedTools as any);
    setNewsList(mappedNews as any);
  };

  fetchData();
}, []);

  // Track scroll position to display floats
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const saveTools = (updatedTools: AITool[]) => {
    setTools(updatedTools);
    localStorage.setItem('aifisiltisi_tools_v2', JSON.stringify(updatedTools));
  };

  const saveNews = (updatedNews: AINews[]) => {
    setNewsList(updatedNews);
    localStorage.setItem('aifisiltisi_news_v2', JSON.stringify(updatedNews));
  };

  // --- Support events handlers ---
  const handleUpvoteTool = (id: string) => {
    const updated = tools.map((t) => (t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t));
    saveTools(updated);
  };

  const handleBookmarkTool = (id: string) => {
    const updated = tools.map((t) => (t.id === id ? { ...t, bookmarks: !t.bookmarks } : t));
    saveTools(updated);
  };

  const handleUpvoteNews = (id: string) => {
    const updated = newsList.map((n) => (n.id === id ? { ...n, upvotes: n.upvotes + 1 } : n));
    saveNews(updated);
  };

 const handleAddToolSubmit = async (newTool: any) => {
  const formatted = {
    name: newTool.name,
    url: newTool.url,
    category: newTool.category,
    pricing: newTool.pricing,
    developer: newTool.developer || 'AI Fısıltısı',
    short_description: newTool.description,
    long_description: newTool.longDescription,
    tags: newTool.tags
  };

  await supabase.from('tools').insert([formatted]);

  const { data } = await supabase
    .from('tools')
    .select('*')
    .order('id', { ascending: false });

  setTools((data || []) as any);
};

const handleAddNewsSubmit = async (newNews: any) => {
  const formatted = {
    title: newNews.title,
    category: newNews.category,
    author: newNews.author || 'AI Fısıltısı',
    source: newNews.source,
    summary: newNews.excerpt,
    content: newNews.content
  };

  await supabase.from('articles').insert([formatted]);

  const { data } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  const mappedNews = (data || []).map((news: any) => ({
    id: String(news.id),
    title: news.title,
    category: news.category,
    author: news.author,
    source: news.source,
    summary: news.summary,
    content: news.content,
    createdAt: news.created_at,
    upvotes: 1,
    commentsCount: 0
  }));

  setNewsList(mappedNews as any);
};

  const handleDeleteTool = (id: string) => {
    const updated = tools.filter(t => t.id !== id);
    saveTools(updated);
  };

  const handleDeleteNews = (id: string) => {
    const updated = newsList.filter(n => n.id !== id);
    saveNews(updated);
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const bookmarkedCount = tools.filter(t => t.bookmarks).length;

  // Render initialization loading skeleton screen
  if (initLoading) {
    return (
      <div translate="no" className="notranslate min-h-screen bg-[#02040a] flex flex-col items-center justify-center space-y-4">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 shadow-lg animate-bounce">
          <Sparkles className="w-7 h-7 text-cyan-400 animate-spin" strokeWidth={1.5} />
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-sm font-black text-white tracking-widest uppercase font-mono animate-pulse">AIFISIILTIISI</h2>
          <p className="text-[10px] text-slate-500 font-mono tracking-wider">AKILLI AI PORTALI YÜKLENİYOR...</p>
        </div>
      </div>
    );
  }

  // Get matching bookmarked IDs list
  const bookmarkedIds = tools.filter(t => t.bookmarks).map(t => t.id);

  return (
    <div translate="no" className="notranslate min-h-screen flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden bg-[#020306] text-slate-100 dark">
      
      {/* Absolute Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarkedCount={bookmarkedCount}
        openWhisperBot={() => setIsBotOpen(true)}
        onScrollToSection={handleScrollToSection}
        isAdmin={isAdmin}
      />

      {/* Primary Routes Mapping */}
      <div className="flex-grow">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomeLanding
                tools={tools}
                newsList={newsList}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleUpvoteTool={handleUpvoteTool}
                handleBookmarkTool={handleBookmarkTool}
                handleUpvoteNews={handleUpvoteNews}
              />
            } 
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/terms" element={<TermsPage />} />
          
          <Route 
            path="/ai-tools/:slug" 
            element={
              <ToolDetailPage
                tools={tools}
                onUpvote={handleUpvoteTool}
                onToggleBookmark={handleBookmarkTool}
                bookmarkedIds={bookmarkedIds}
              />
            } 
          />

          <Route
            path="/news/:slug"
            element={
              <NewsDetailPage
                newsList={newsList}
                onUpvoteNews={handleUpvoteNews}
              />
            }
          />

          <Route
            path="/admin"
            element={
              <AdminPortalPage
                tools={tools}
                newsList={newsList}
                onAddTool={handleAddToolSubmit}
                onAddNews={handleAddNewsSubmit}
                onDeleteTool={handleDeleteTool}
                onDeleteNews={handleDeleteNews}
                isAdmin={isAdmin}
                onLogin={handleAdminLogin}
                onLogout={handleAdminLogout}
              />
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {/* Shared Responsive Footer */}
      <Footer />

      {/* --- Sidebar AI assistant (Akıllı Öneri Rehberi) overlay component --- */}
      <WhisperBot
        isOpen={isBotOpen}
        onClose={() => setIsBotOpen(false)}
      />

      {/* --- Back to Top Float Button --- */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 z-40 p-3 rounded-xl bg-slate-900 border border-white/5 hover:bg-cyan-500/10 text-indigo-400 hover:text-cyan-300 transition shadow-xl"
            title="Yukarı Git"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
