/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Trash2, HelpCircle, AudioLines, Minimize2 } from 'lucide-react';
import { LOCAL_WHISPER_RESPONSES, fallback_whisper } from '../data';

interface WhisperBotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export default function WhisperBot({ isOpen, onClose }: WhisperBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Selam! Ben AIFısıltısı Akıllı Rehberi. 🌌 Yapay zeka araçları arasında kaybolmamanız için buradayım. Bana ne tarz bir araç aradığınızı fısıldayabilirsiniz!",
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add User Message
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Calculate Bot Answer
    setTimeout(() => {
      const lowerText = textToSend.toLowerCase();
      let matchedReply = '';

      // Run keyword scan
      for (const group of LOCAL_WHISPER_RESPONSES) {
        if (group.keywords.some(k => lowerText.includes(k))) {
          matchedReply = group.reply;
          break;
        }
      }

      if (!matchedReply) {
        matchedReply = fallback_whisper;
      }

      const botMsg: Message = {
        id: Math.random().toString(),
        sender: 'bot',
        text: matchedReply,
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: "Geçmiş temizlendi. 🌌 Yapay zeka evreninde neyi keşfetmek istersiniz? Bana fısıldayabilirsiniz!",
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const hotQuestions = [
    "En iyi kod yazma araçları hangileri?",
    "Ücretsiz AI araçları var mı?",
    "Harika bir makale yazmak istiyorum",
    "Görsel çizdirebileceğim araçlar"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#020203] z-50 backdrop-blur-sm lg:hidden"
          />

          {/* Chat Side Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 24, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[460px] bg-[#0c0d12]/95 border-l border-white/5 shadow-2xl z-50 flex flex-col backdrop-blur-md"
          >
            {/* Header section */}
            <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
              <div className="flex items-center space-x-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <Bot className="w-5 h-5 text-cyan-400" />
                  <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-indigo-950"></span>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">Fısıltı Asistanı</h3>
                  <div className="flex items-center space-x-1.5">
                    <AudioLines className="w-3 h-3 text-cyan-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-cyan-300">Akıllı Öneri Modu</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={clearChat}
                  title="Sohbeti Temizle"
                  className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/5"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white rounded-tr-none shadow-md shadow-indigo-600/10'
                        : 'bg-white/[0.03] border border-white/5 text-slate-300 rounded-tl-none'
                    }`}
                  >
                    {/* Render message support bold markdown tags in safe local text */}
                    <p className="whitespace-pre-line">
                      {msg.text.split('**').map((part, index) => 
                        index % 2 === 1 ? <strong key={index} className="text-cyan-300 font-semibold">{part}</strong> : part
                      )}
                    </p>
                    <span className="block text-right text-[10px] text-slate-500 font-mono mt-1.5">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.03] border border-white/5 rounded-2xl rounded-tl-none px-4 py-3.5">
                    <div className="flex space-x-1.5 items-center">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-100"></span>
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-200"></span>
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-300"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Recommended Questions panel */}
            <div className="p-4 border-t border-white/5 bg-white/[0.005]">
              <div className="flex items-center space-x-1 mb-2 text-slate-400 text-xs">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                <span>Hızlı Sorular</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {hotQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="text-left text-xs bg-slate-800/20 hover:bg-indigo-500/10 text-slate-300 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/20 px-2.5 py-1.5 rounded-lg transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input field area */}
            <div className="p-4 border-t border-white/5 bg-white/[0.01]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="flex items-center space-x-2 bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-xl p-1.5 transition-all focus-within:ring-1 focus-within:ring-cyan-500/50"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Yapay zeka hakkında bir soru fısılda..."
                  className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 px-3 py-2 outline-none"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className={`p-2.5 rounded-lg flex items-center justify-center transition-all ${
                    inputValue.trim()
                      ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow shadow-indigo-500/10 hover:opacity-95'
                      : 'bg-white/5 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[10px] text-slate-600 font-mono text-center mt-2">
                AIFısıltısı Rehberi doğrudan sitemizdeki araçlardan fısıldayarak yanıtlar.
              </p>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
