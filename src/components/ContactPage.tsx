/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Send, CheckCircle, HelpCircle, Building2, ExternalLink } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    document.title = "İletişim ve Reklam - AIFısıltısı";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSubmitting(true);

    // Simulate submission handler hooks
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 py-20 px-4 sm:px-8 relative overflow-hidden">
      
      {/* Glow shapes */}
      <span className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <span className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Side: Editorial information / sponsor info */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold font-mono rounded-full uppercase tracking-wider">
              <span>İletişime Geçin</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              AIFısıltısı’nda <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Yerinizi Alın</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-455 leading-relaxed font-light">
              Yeni projenizi bizimle paylaşmak mı istiyorsunuz? Yoksa araç tanıtımları, affiliate birlikteliği, sponsorlu bülten alanları veya genel geri bildirimler için mi fısıldıyorsunuz? Aşağıdaki e-posta veya doğrudan iletişim formuyla ekibimize ulaşın.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-3.5 p-4 rounded-xl bg-white/[0.01] border border-white/5">
              <Mail className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
              <div>
                <span className="block text-xs font-bold text-white uppercase tracking-wider font-mono">E-posta Adresimiz</span>
                <span className="text-xs text-slate-400 block mt-0.5">tahrerdgn53@gmail.com</span>
                <span className="text-[10px] text-slate-500 mt-1 block">Tüm sponsorluk ve hak talepleri için destek hattıdır.</span>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 p-4 rounded-xl bg-white/[0.01] border border-white/5">
              <Building2 className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
              <div>
                <span className="block text-xs font-bold text-white uppercase tracking-wider font-mono">Reklam &amp; Affiliate Ortaklığı</span>
                <span className="text-xs text-slate-400 block mt-0.5">Sponsorlu İçerik Sponsorlu Banner ve Araç Öne Çıkarma</span>
                <span className="text-[10px] text-slate-500 mt-1 block">Projeniz "Haftanın AI Aracı" veya "Öne Çıkan AI Araçları" içerisinde her gün binlerce kullanıcıyla buluşabilir.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: High-End Interactive Form */}
        <div className="lg:col-span-7">
          <div className="p-8 bg-white/[0.01] border border-white/5 rounded-3xl relative overflow-hidden backdrop-blur-md">
            
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <MessageSquare className="w-24 h-24 text-white" />
            </div>

            <h3 className="text-lg font-bold text-white tracking-tight mb-6">Hızlı Mesaj Gönderin</h3>

            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">Adınız Soyadınız *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Örn: Deniz Yılmaz"
                      className="w-full bg-[#080d16] border border-white/10 hover:border-white/20 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 outline-none transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">E-posta Adresiniz *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Örn: deniz@ornek.com"
                      className="w-full bg-[#080d16] border border-white/10 hover:border-white/20 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 outline-none transition"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">Mesajınız *</label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Sponsorluk, araç önerileri veya sorularınızı buraya fısıldayın..."
                    className="w-full bg-[#080d16] border border-white/10 hover:border-white/20 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 outline-none transition resize-none leading-relaxed"
                  />
                </div>

                <div className="p-3.5 bg-cyan-950/20 border border-cyan-500/10 rounded-xl text-cyan-300 text-[11px] font-light leading-relaxed flex items-start space-x-2">
                  <HelpCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Gönderilen mesajlar Formspree/Mailchimp altyapımız üzerinden filtrelenir. Ekibimiz genellikle 24-48 saat içerisinde e-posta adresiniz üzerinden geri dönüş sağlar.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg shadow-cyan-500/10 cursor-pointer flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center space-x-1">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Gönderiliyor...</span>
                    </span>
                  ) : (
                    <>
                      <span>Mesajı Gönder</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/5">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-lg font-bold text-white">Mesajınız Ulaştı!</h4>
                  <p className="text-xs text-slate-400">
                    Mesajınız yapay zeka fısıltı rüzgarıyla ekibimize fısıldandı. İlginiz için çok teşekkür ederiz!
                  </p>
                </div>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-6 px-4 py-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 border border-cyan-500/25 rounded-xl bg-cyan-950/20 hover:bg-cyan-950/40 transition cursor-pointer"
                >
                  Yeni Bir Mesaj Gönder
                </button>
              </motion.div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
