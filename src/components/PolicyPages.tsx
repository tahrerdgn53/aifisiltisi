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
            <p className="text-[10px] sm:text-xs text-slate-550 font-mono mt-0.5">Son Güncelleme: 11 Eylül 2026</p>
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
        <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">
  1. Toplanan Veriler
</h3>
        <p>
  Aİ Fısıltısı'nı ziyaret ettiğinizde, site kullanımına ilişkin teknik ve
  istatistiksel veriler analiz araçları aracılığıyla işlenebilir. Bu veriler;
  ziyaret edilen sayfalar, kullanılan cihaz ve tarayıcı türü, yaklaşık konum
  bilgisi ve siteyle etkileşimlere ilişkin bilgileri içerebilir.
</p>

<p>
  E-posta bültenimize kendi isteğinizle abone olmanız durumunda, tarafınızca
  sağlanan e-posta adresi bülten aboneliğinin oluşturulması ve yönetilmesi
  amacıyla kaydedilir.
</p>

<p>
  İletişim formumuzu kullanmanız durumunda ise adınız, e-posta adresiniz ve
  tarafınızca gönderilen mesaj içeriği, talebinizin alınması ve sizinle
  iletişime geçilebilmesi amacıyla işlenir.
</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">2. Verilerin Kullanım Amacı</h3>
        <p>
  Toplanan veya tarafınızca sağlanan veriler; web sitesinin çalışmasını
  sağlamak, kullanıcı deneyimini geliştirmek, site performansını ve kullanım
  istatistiklerini analiz etmek, teknik sorunları tespit etmek, iletişim
  taleplerine yanıt vermek ve talep edilmesi halinde e-posta bültenlerini
  göndermek amacıyla kullanılabilir.
</p>

<p>
  Kişisel bilgileriniz reklam veya pazarlama amacıyla üçüncü taraflara satılmaz
  veya kiralanmaz. Bununla birlikte, web sitesinin işletilmesi için kullanılan
  analiz, iletişim, veri saklama ve benzeri hizmetlerin sağlanması kapsamında
  gerekli bilgiler ilgili hizmet sağlayıcıları tarafından işlenebilir.
</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">3. Güvenlik ve Altyapı</h3>
       <p>
  Kişisel verilerin korunması için, hizmet sağlayıcılarımızın sunduğu güvenlik
  önlemlerinden ve erişim kontrollerinden yararlanılır. Veriler yalnızca ilgili
  hizmetin sağlanması için gerekli olduğu ölçüde işlenir ve yetkisiz erişimi,
  değişikliği veya ifşayı önlemeye yönelik teknik ve idari önlemler uygulanır.
</p>

<p>
  Aİ Fısıltısı kapsamında kullanılan üçüncü taraf hizmetlerin kendi güvenlik ve
  veri işleme uygulamaları geçerlidir. Bu hizmet sağlayıcılar arasında analiz,
  iletişim ve veri saklama hizmetleri sunan platformlar yer alabilir.
</p>
      </div>

      <div className="p-4 bg-cyan-950/20 border border-cyan-500/20 text-cyan-300 rounded-xl leading-relaxed">
        <span className="font-bold flex items-center space-x-1.5 mb-1 text-xs">
          <Info className="w-4 h-4 text-cyan-400" />
          <span>KVKK ve GDPR Uyumluluğu</span>
        </span>
        Kişisel verilerinizle ilgili olarak; verilerinizin işlenip işlenmediğini öğrenme, işlenen verilere erişme, yanlış veya eksik bilgilerin düzeltilmesini isteme ve uygun koşullarda verilerinizin silinmesini veya işlenmesinin sınırlandırılmasını talep etme haklarına sahip olabilirsiniz. E-posta bülteni aboneliğinizi dilediğiniz zaman sonlandırabilir ve kişisel verilerinizle ilgili taleplerinizi <strong className="font-mono text-white text-[11px]">aifisiltisi@gmail.com</strong> adresine iletebilirsiniz.
      </div>
    </LegalWrapper>
  );
}

/* 2. ÇEREZ POLİTİKASI (Cookies Policy) Component */
export function CookiesPage() {
  return (
    <LegalWrapper title="Çerez Politikası" icon={Eye}>
    <p className="text-slate-400">
  Bu Çerez Politikası, Aİ Fısıltısı'nda kullanılan çerezler ve benzeri
  teknolojilerin hangi amaçlarla kullanıldığını ve bu teknolojilere ilişkin
  tercihlerinizi nasıl yönetebileceğinizi açıklamaktadır. Zorunlu olmayan
  çerezler ve benzeri teknolojiler, yürürlükteki mevzuatın gerekli kıldığı
  durumlarda kullanıcı tercihleri doğrultusunda kullanılacaktır.
</p>

      <div className="space-y-4 pt-4">
        <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">1. Çerez Nedir?</h3>
       <p>
  Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla
  cihazınıza kaydedilebilen küçük veri dosyalarıdır. Benzer teknolojiler de
  kullanıcı tercihlerini hatırlamak, site işlevlerini çalıştırmak, kullanım
  istatistiklerini ölçmek ve bazı durumlarda reklam veya analiz hizmetlerini
  desteklemek amacıyla kullanılabilir.
</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">2. Kullandığımız Çerez Türleri</h3>
       <p>
  <strong>Zorunlu Çerezler:</strong> Web sitesinin temel işlevlerinin
  çalışması, kullanıcı tercihlerinin hatırlanması ve gerekli teknik
  işlemlerin gerçekleştirilmesi amacıyla kullanılan çerezler ve benzeri
  teknolojilerdir.
  <br /><br />

  <strong>Analiz ve Performans Teknolojileri:</strong> Google Analytics gibi
  analiz hizmetleri; ziyaretçilerin siteyi nasıl kullandığını anlamamıza,
  trafik ve performans istatistiklerini ölçmemize ve kullanıcı deneyimini
  geliştirmemize yardımcı olabilir.
  <br /><br />

  <strong>Reklam Teknolojileri:</strong> Aİ Fısıltısı, Google AdSense gibi
  reklam hizmetlerinden yararlanabilir. Bu hizmetler kapsamında Google ve
  diğer reklam teknolojisi sağlayıcıları, yürürlükteki mevzuat ve kullanıcı
  tercihleri doğrultusunda reklamların sunulması, ölçülmesi ve
  kişiselleştirilmesi amacıyla çerezler veya benzeri teknolojiler
  kullanabilir.
</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">3. Çerez Kontrolü ve Devre Dışı Bırakma</h3>
<p>
  Tarayıcı ayarlarınız üzerinden çerezleri görüntüleyebilir, silebilir veya
  engelleyebilirsiniz. Ancak zorunlu çerezlerin engellenmesi, web sitesindeki
  bazı işlevlerin beklendiği şekilde çalışmamasına neden olabilir.
</p>

<p>
  İzin gerektiren analiz ve reklam teknolojilerinin kullanıldığı durumlarda,
  uygun bir izin yönetim mekanizması sunulabilir. Bu mekanizma üzerinden
  tercihlerinizi belirleyebilir ve sunulan seçenekler kapsamında daha sonra
  değiştirebilirsiniz.
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
          Sitemizde derlenen yapay zeka araçları ve bu araçların yönlendirildiği dış bağlantılar (URL) tamamen bilgi amaçlıdır. Araçların fiyat politikalarında, geliştirici şartlarında veya kullanım esnasında yaşayabileceğiniz veri kayıplarından AIFısıltısı platformu hiçbir şekilde hukuki olarak sorumlu tutulamaz. Dış bağlantılar üzerinden işlem yaparken ilgili sitelerin kendi sözleşmelerini incelemelisiniz.
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
