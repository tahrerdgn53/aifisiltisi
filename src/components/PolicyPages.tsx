/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ShieldCheck, Eye, HelpCircle, AlertCircle, FileText, Info } from 'lucide-react';

/* Shared Page Layout Shell Wrapper for all legal templates */
function LegalWrapper({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  useEffect(() => {
    document.title = `${title} - AIFısıltısı`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [title]);

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 py-16 sm:py-24 px-4 sm:px-8 relative overflow-hidden">
      <span className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-3xl mx-auto space-y-10 relative z-10">
        
        {/* Title Block Header */}
        <div className="flex items-center space-x-3.5 border-b border-white/10 pb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{title}</h1>
            <p className="text-[10px] sm:text-xs text-slate-550 font-mono mt-0.5">Son Güncelleme: 19 Haziran 2026</p>
          </div>
        </div>

        {/* Real copy body text */}
        <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-light tracking-wide">
          {children}
        </div>

      </div>
    </div>
  );
}

/* 1. GİZLİLİK POLİTİKASI (Privacy Policy) Component */
export function PrivacyPage() {
  return (
    <LegalWrapper title="Gizlilik Politikası" icon={ShieldCheck}>
      <p className="text-slate-400">
        AIFısıltısı olarak, çevrimiçi gizliliğinize ve kişisel bilgilerinizin güvenliğine saygı duyuyoruz. Bu Gizlilik Politikası, platformumuzu kullandığınızda hangi verilerin toplandığını, nasıl korunduğunu ve haklarınızı açıklar.
      </p>

      <div className="space-y-4 pt-4">
        <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">1. Toplanan Veriler</h3>
        <p>
          AIFısıltısı, genel ziyaretçi istatistiklerini izlemek (örneğin tıklanan araç kategorileri, haber okuma oranları) amacıyla tamamen anonim analiz verileri toplar. Ayrıca, bültenimize kendi rızanızla e-posta adresinizi bırakmanız durumunda sadece bu iletişim adresi sistemlerimize güvenle kaydedilir.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">2. Verilerin Kullanım Amacı</h3>
        <p>
          Toplanan veriler yalnızca platformumuzun kullanıcı deneyimini optimize etmek, teknik aksaklıkları gidermek, haftalık bülten içeriklerini ulaştırmak ve fısıltı asistanımızın yanıt parametrelerini sizlerin aramalarına göre zenginleştirmek için kullanılır. Üçüncü partilere pazarlama amacıyla asla satılmaz veya kiralanmaz.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">3. Güvenlik ve Altyapı</h3>
        <p>
          Kişisel verileriniz modern şifreleme algoritmalarıyla ve Google Bulut sistemleri üzerinde barındırılan güvenli katmanlarda saklanmaktadır. Yetkisiz erişimleri durdurmak için periyodik altyapı denetimleri yapılmaktadır.
        </p>
      </div>

      <div className="p-4 bg-cyan-950/20 border border-cyan-500/20 text-cyan-300 rounded-xl leading-relaxed">
        <span className="font-bold flex items-center space-x-1.5 mb-1 text-xs">
          <Info className="w-4 h-4 text-cyan-400" />
          <span>KVKK ve GDPR Uyumluluğu</span>
        </span>
        Dilediğiniz zaman bültenden ayrılma, verilerinizin sistemlerimizden kalıcı olarak silinmesini talep etme hakkına sahipsiniz. Bunun için doğrudan <strong className="font-mono text-white text-[11px]">tahrerdgn53@gmail.com</strong> adresine talep göndermeniz yeterlidir.
      </div>
    </LegalWrapper>
  );
}

/* 2. ÇEREZ POLİTİKASI (Cookies Policy) Component */
export function CookiesPage() {
  return (
    <LegalWrapper title="Çerez Politikası" icon={Eye}>
      <p className="text-slate-400">
        Bu Çerez Politikası, web sitemiz AIFısıltısı’nda neden çerezler (cookies) kullandığımızı ve bu çerezleri nasıl kontrol edebileceğinizi açıklamaktadır. Sitemizi kullanmaya devam ederek çerezlerin bu kurallara göre kullanılmasını onaylarsınız.
      </p>

      <div className="space-y-4 pt-4">
        <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">1. Çerez Nedir?</h3>
        <p>
          Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınıza veya bilgisayarınıza kaydedilen küçük metin dosyalarıdır. Çerezler web sitesinin daha kararlı çalışmasına, tercihlerinizi hatırlamasına ve içerik verimliliğinizi izlememize yardımcı olur.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">2. Kullandığımız Çerez Türleri</h3>
        <p>
          <strong>Zorunlu Çerezler:</strong> Sitemizin temel işlevlerinin (örneğin koyu/açık tema modu tercihiniz, asistan sohbet geçmişi veya yönetici fısıltı oturumu) çalıştırılabilmesi için gereken çerezlerdir. <br />
          <strong>Performans Çerezleri:</strong> Google Analytics gibi analiz araçlarımız aracılığıyla ziyaretçilerin sitemizi nasıl kullandığını tespit eden, anonim veriler içeren çerezlerdir.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">3. Çerez Kontrolü ve Devre Dışı Bırakma</h3>
        <p>
          Tarayıcınızın ayarlar menüsüne girerek çerezleri tamamen engelleyebilir veya sadece belirli web siteleri için sınırlandırabilirsiniz. Ancak çerezlerin devre dışı bırakılması durumunda, sitemizdeki bazı etkileşimli özelliklerin (örn: tema geçişi veya beğeniler) çalışmasında aksaklıklar yaşanabilir.
        </p>
      </div>
    </LegalWrapper>
  );
}

/* 3. KULLANIM ŞARTLARI (Terms of Use) Component */
export function TermsPage() {
  return (
    <LegalWrapper title="Kullanım Şartları" icon={FileText}>
      <p className="text-slate-400">
        AIFısıltısı platformuna erişerek ve bu platformu kullanarak, aşağıda yer alan yasal Kullanım Şartları’nı koşulsuz olarak kabul etmiş ve onaylamış sayılırsınız.
      </p>

      <div className="space-y-4 pt-4">
        <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">1. Fikri Mülkiyet ve İçerik</h3>
        <p>
          AIFısıltısı’nda yayınlanan fısıltılar, haber makaleleri, analizler ve özelleştirilmiş yazılımsal kodlamalar telif hakları ile korunmaktadır. Önceden yazılı izin alınmaksızın bu içeriklerin tamamının veya bir kısmının ticari amaçlarla kopyalanması, dağıtılması ve kaynak gösterilmeden başka yerlerde yayınlanması kesinlikle yasaktır.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">2. Sorumluluk Reddi</h3>
        <p>
          Sitemizde derlenen yapay zeka araçları ve bu araçların yönlendirildiği dış bağlantılar (URL) tamamen bilgi amaçlıdır. Araçların fiyat politikalarında, geliştirici şartlarında veya kullanım esnasında yaşayabileceğiniz veri kayıplarından AIFısıltısı platformu hiçbir şekilde hukuki olarak sorumlu tutulamaz. Dış bağlantılar üzerinden işlem yaparken ilgili sitelerin kendi sözleşmelerini incelemeliyiz.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">3. Şartların Değiştirilmesi</h3>
        <p>
          Platformumuz, bu kullanım şartlarını dilediği zaman her hangi bir ön bildirimde bulunmadan güncelleme hakkını saklı tutar. Kullanıcılar güncel şartları periyodik olarak kontrol etmekle yükümlüdür.
        </p>
      </div>
    </LegalWrapper>
  );
}
