/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AITool, AINews, ToolCategory } from './types';

export const TOOL_CATEGORIES: ToolCategory[] = [
  { id: 'all', label: 'Tüm Araçlar', icon: 'LayoutGrid' },
  { id: 'text', label: 'Metin & Yazma', icon: 'FileText' },
  { id: 'image', label: 'Görsel & Tasarım', icon: 'Image' },
  { id: 'video', label: 'Video & Animasyon', icon: 'Video' },
  { id: 'code', label: 'Yazılım & Kodlama', icon: 'Code' },
  { id: 'voice', label: 'Ses & Müzik', icon: 'Music' },
  { id: 'productivity', label: 'Verimlilik', icon: 'Zap' }
];

export const INITIAL_TOOLS: AITool[] = [
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Google\'ın gelişmiş çoklu modlu yapay zeka ailesi. Metin, kod, ses, görsel ve videoyu aynı anda anlayıp işleyebilir.',
    longDescription: 'Google Gemini, gelişmiş rasyonalizasyon yetenekleri ve 2 milyondan fazla token bağlam penceresiyle dikkat çeken lider üretken yapay zeka modelidir. Hem geliştiriciler için güçlü API\'ler sunar hem de günlük kullanıcılar için mükemmel bir sohbet asistanı görevi görür. Özellikle karmaşık belgeleri analiz etme ve veri örüntülerini çözmede çığır açmıştır.',
    category: 'text',
    url: 'https://gemini.google.com',
    logo: 'Sparkles',
    upvotes: 245,
    bookmarks: false,
    tags: ['Multimodal', 'Google', 'Asistan', 'LLM'],
    featured: true,
    developer: 'Google',
    pricing: 'Freemium'
  },
  {
    id: 'midjourney',
    name: 'Midjourney v6',
    description: 'Discord üzerinden çalışan, sanatsal kalitesi ve gerçekçiliği son derece yüksek görsel üretim aracı.',
    longDescription: 'Midjourney, kelimeleri nefes kesici tablolara, hiper-gerçekçi fotoğraflara veya yenilikçi tasarımlara dönüştürmenizi sağlar. v6 sürümü ile özellikle metin entegrasyonu, gelişmiş ışıklandırma ve daha derin komut anlama kabiliyetlerine sahip olmuştur.',
    category: 'image',
    url: 'https://www.midjourney.com',
    logo: 'Palette',
    upvotes: 189,
    bookmarks: false,
    tags: ['Görsel Üretimi', 'Tasarım', 'Discord', 'Sanat'],
    featured: true,
    developer: 'Midjourney Inc.',
    pricing: 'Ücretli'
  },
  {
    id: 'cursor',
    name: 'Cursor AI',
    description: 'Yazılımcılar için özel olarak tasarlanmış, kod tabanınızı tamamen tarayabilen yapay zeka destekli kod editörü.',
    longDescription: 'VS Code altyapısı üzerine inşa edilen Cursor, projenizin tamamını indeksleyerek size bağlamsal kod desteği sunar. Hataları anında tespit edebilir, karmaşık refaktör işlemlerini saniyeler içinde tamamlayabilir ve doğal dil ile doğrudan kod üretebilir.',
    category: 'code',
    url: 'https://cursor.com',
    logo: 'Cpu',
    upvotes: 312,
    bookmarks: false,
    tags: ['Yazılım', 'Kod Editörü', 'Copilot', 'Refaktör'],
    featured: true,
    developer: 'Anysphere',
    pricing: 'Freemium'
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    description: 'Duygu ve tonlama derinliğine sahip, dünyanın en gerçekçi yapay zeka ses sentezleme ve klonlama platformu.',
    longDescription: 'Yazılı metinleri profesyonel seslendirme sanatçısı kalitesinde ses dosyalarına dönüştürür. Kendi sesinizi klonlamanıza, farklı dillerde aksan koruyarak dublaj yapmanıza ve video içerikleriniz için özelleştirilmiş sesler üretmenize imkan tanır.',
    category: 'voice',
    url: 'https://elevenlabs.io',
    logo: 'Volume2',
    upvotes: 154,
    bookmarks: false,
    tags: ['Ses Sentezi', 'Ses Klonlama', 'Dublaj', 'Podcast'],
    featured: false,
    developer: 'ElevenLabs Inc.',
    pricing: 'Freemium'
  },
  {
    id: 'v0-vercel',
    name: 'v0 by Vercel',
    description: 'Doğal dil komutlarıyla modern, şık ve responsive kullanıcı arayüzleri (UI) ve React bileşenleri oluşturucu.',
    longDescription: 'Tasarımcıların ve yazılımcıların saniyeler içinde Tailwind CSS ve Shadcn UI temelli harika frontend tasarımları üretmesini sağlar. Üretilen kodları doğrudan kopyalayabilir veya projenize NPM aracılığıyla entegre edebilirsiniz.',
    category: 'code',
    url: 'https://v0.dev',
    logo: 'Compass',
    upvotes: 278,
    bookmarks: false,
    tags: ['UI/UX', 'React', 'Tailwind', 'Frontend'],
    featured: true,
    developer: 'Vercel',
    pricing: 'Freemium'
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT Plus',
    description: 'Gelişmiş problem çözme, veri analizi ve akıl yürütme becerilerine sahip GPT-4o ve OpenAI o1 modeli entegreli asistan.',
    longDescription: 'OpenAI tarafından geliştirilen ChatGPT, felsefeden yazılıma, yaratıcı yazarlıktan karmaşık matematik problemlerine kadar her alanda yardımcınızdır. o1 serisi modelleri sayesinde derin düşünme yeteneğine de kavuşmuştur.',
    category: 'text',
    url: 'https://chat.openai.com',
    logo: 'MessageSquare',
    upvotes: 210,
    bookmarks: false,
    tags: ['LLM', 'OpenAI', 'Sohbet Robotu', 'Veri Analizi'],
    featured: false,
    developer: 'OpenAI',
    pricing: 'Freemium'
  },
  {
    id: 'suno',
    name: 'Suno AI v4',
    description: 'Sadece metin tarifi yazarak, profesyonel kalitede vokal ve enstrümantal müzikler besteleyen devrimsel araç.',
    longDescription: 'Suno, istediğiniz türde, dilde ve duygu durumunda tam uzunlukta şarkılar üretir. Kendi yazdığınız sözleri şarkıya dökebilir, yapay zekanın vokaliyle eşsiz ritimler yakalayabilirsiniz.',
    category: 'voice',
    url: 'https://suno.com',
    logo: 'Music',
    upvotes: 198,
    bookmarks: false,
    tags: ['Müzik Üretimi', 'Beste', 'Vokal Sentezi', 'Yaratıcı'],
    featured: false,
    developer: 'Suno AI',
    pricing: 'Freemium'
  },
  {
    id: 'heygen',
    name: 'HeyGen',
    description: 'Dijital ikizler ve foto-realistik avatar sunucular ile saniyeler içinde kurumsal tanıtım ve eğitim videoları oluşturun.',
    longDescription: 'HeyGen, kamera karşısına geçmeye gerek kalmadan profesyonel videolar üretmenizi sağlar. Metinlerinizi okuyan gerçekçi dijital insanlar oluşturabilir, 40\'tan fazla dilde ses senkronizasyonlu dudak hareketleri (Lip-sync) sağlayabilirsiniz.',
    category: 'video',
    url: 'https://heygen.com',
    logo: 'Tv',
    upvotes: 142,
    bookmarks: false,
    tags: ['Avatar', 'Video Üretimi', 'Pazarlama', 'Yapay Video'],
    featured: false,
    developer: 'HeyGen Inc.',
    pricing: 'Freemium'
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    description: 'Notlar oluşturma, özetleme ve beyin fırtınası yapma imkanı veren akıllı çalışma alanı asistanı.',
    longDescription: 'Mevcut Notion sayfalarınızın içinde doğrudan çalışarak uzun dökümanları maddeler halinde özetler, yazım hatalarını düzeltir, ton değişikliği yapar ve fikir taslakları oluşturmanızda rehberlik eder.',
    category: 'productivity',
    url: 'https://notion.so',
    logo: 'Zap',
    upvotes: 118,
    bookmarks: false,
    tags: ['Not Alma', 'Özetleme', 'Verimlilik', 'Yazı Asistanı'],
    featured: false,
    developer: 'Notion Labs',
    pricing: 'Ücretli'
  }
];

export const INITIAL_NEWS: AINews[] = [
  {
    id: 'news-1',
    title: 'Google Gemini Live Türkçe Desteğiyle Tüm Android Kullanıcılarına Açıldı',
    excerpt: 'Google\'ın sesli ve dinamik yapay zeka görüşme özelliği Gemini Live, artık tamamen Türkçe konuşabiliyor ve anlıyor.',
    content: 'Yapay zeka devriminde yerelleşme adımları hız kazanıyor. Google, gelişmiş ses asistanı deneyimi sunan Gemini Live modelini Türkçe dil desteği ile birlikte küresel çapta kullanıma sundu. Artık kullanıcılar, sanki karşısında gerçek bir insan varmış gibi kesintisiz, akıcı ve doğal bir tonda Gemini ile sohbet edebilecek, sözünü kesip yeni yönergeler verebilecekler.\n\nGemini Live konuşurken araya girerek fısıldayabilir veya konu değiştirebilirsiniz. Bu özellik, özellikle günlük planlama yapma, beyin fırtınası gerçekleştirme ve pratik yabancı dil konuşma dersleri için muazzam bir kolaylık sunuyor. Özelliğin yakın zamanda iOS platformuna da tam entegre edilmesi bekleniyor.',
    category: 'Yazılım',
    readTime: '3 dk okuma',
    date: '18 Haziran 2026',
    source: 'Yerli Teknoloji Raporu',
    author: 'Deniz Yıldız',
    upvotes: 124,
    commentsCount: 14
  },
  {
    id: 'news-2',
    title: 'Sora Rekabetinde Yeni Boyut: Açık Kaynaklı Video Modelleri Yükselişte',
    excerpt: 'OpenAI Sora\'nın henüz genel kullanıma tam kapalı olmasını fırsat bilen açık kaynak toplulukları, şaşırtıcı video modelleri yayınlıyor.',
    content: 'Yüksek kaliteli video üretimi yapay zekanın en sıcak savaş alanı haline geldi. OpenAI\'ın Sora modelini sınırlı bir grupla test etmeye devam ettiği bugünlerde, Luma Dream Machine, Kling AI ve Runway Gen-3 gibi rakipler piyasayı domine etmeye başladı.\n\nYazılımcı ve araştırmacı toplulukları ise tamamen ücretsiz, yerel bilgisayarlarda çalıştırılabilen açık kaynak kodlu video modellerini hızla geliştiriyor. Hugging Face üzerinde paylaşılan son modeller, sinematik kamera hareketleri ve fizik kurallarına uyum açısından ticari rakipleriyle yarışır düzeye ulaştı. Bu gelişme, bağımsız animatörler ve film yapımcıları için harika bir demokratikleşme dalgası yaratıyor.',
    category: 'Video/AI',
    readTime: '5 dk okuma',
    date: '16 Haziran 2026',
    source: 'Yapay Zeka Bülteni',
    author: 'Kaan Demir',
    upvotes: 95,
    commentsCount: 8
  },
  {
    id: 'news-3',
    title: 'Yapay Zeka Destekli Giyilebilir Cihazların Yeni Nesli Gösterildi',
    excerpt: 'Akıllı gözlükler ve yaka iğneleri, telefon ekranlarına bağımlılığımızı azaltmayı hedefleyen fütüristik tasarımlarla geri dönüyor.',
    content: 'İlk nesil yapay zeka donanımlarının aldığı karmaşık eleştirilerden ders çıkaran teknoloji öncüleri, bu kez çok daha kararlı donanımlarla sahnede. Yeni tanıtılan akıllı gözlük tasarımları, doğrudan kullanıcının baktığı yönü analiz eden gizli kameralara sahip.\n\nBu cihazlar fısıldayarak kulağınıza bilgi aktarıyor; örneğin markette bir ürüne baktığınızda fiyat karşılaştırmasını yapıp size söylüyor veya karşınızdaki kişinin adını hatırlatıyor. Ekran içermeyen, tamamen ses ve göz hareketlerine odaklanan bu minimalist donanımlar, akıllı telefonların yerini tam olarak almasa da yanlarında vazgeçilmez birer asistan olacak gibi görünüyor.',
    category: 'Donanım',
    readTime: '4 dk okuma',
    date: '12 Haziran 2026',
    source: 'Gelecek Trendleri',
    author: 'Buse Tanır',
    upvotes: 82,
    commentsCount: 5
  },
  {
    id: 'news-4',
    title: 'Yazılım Sektöründe "AI Agent" Dönemi Başladı: Kod Yazan Değil, Yöneten Yazılımcılar',
    excerpt: 'Yalnızca kod tamamlayan copilotlar yerini, tüm bir projeyi kendi kendine baştan sona tasarlayıp derleyen otonom yapay zeka ajanlarına bırakıyor.',
    content: 'Yazılım dünyası son on yılın en köklü dönüşümünü yaşıyor. Kod editörlerinin akıllanmasının ötesinde, artık sisteme "Şöyle bir e-ticaret sitesi kur, veritabanını bağla ve testlerini yaz" talimatı verildiğinde, arka planda saatlerce çalışıp projeyi bitiren "Yapay Zeka Ajanları" (AI Agents) kullanılmaya başlandı.\n\nTemsilci ajanlar kendi aralarında rol dağılımı yapıyor: Biri kod yazarken diğeri kod incelemesi (Code Review) yapıyor, üçüncüsü ise güvenlik açıklarını denetliyor. Bu durum yazılımcıların artık kod satırları arasında kaybolmak yerine sistem mimarı ve yönetici pozisyonuna evrilmesine neden oluyor.',
    category: 'Yazılım',
    readTime: '6 dk okuma',
    date: '08 Haziran 2026',
    source: 'Developer Postası',
    author: 'Emre Çelik',
    upvotes: 167,
    commentsCount: 22
  }
];

export const LOCAL_WHISPER_RESPONSES = [
  {
    keywords: ['kod', 'programlama', 'yazılım', 'web', 'javascript', 'html', 'react', 'css', 'geliştirici'],
    reply: "Kodlama dünyasında fısıltılar yükseliyor! 💻 Projelerinizde devrim yaratmak için **Cursor AI** kod editörünü ve şık arayüz tasarımlarını anında üretmek için **v0 by Vercel** aracını kesinlikle denemelisiniz. Kod yazarken hız kazanmak için ikiliden daha iyisi yok!"
  },
  {
    keywords: ['tasarım', 'görsel', 'resim', 'çizim', 'görüntü', 'fotoğraf', 'illüstrasyon', 'sanat'],
    reply: "Yaratıcılığın sınırlarını fısıldayayım mı? 🎨 Muazzam sanatsal dokunuşlar ve detaylı görüntüler üretmek istiyorsanız Discord'da harikalar yaratan **Midjourney v6** zirvede. Alternatif olarak web arayüz tasarımlarınız için **v0 by Vercel** inanılmaz yardımcı olacaktır."
  },
  {
    keywords: ['metin', 'yazı', 'içerik', 'makale', 'özet', 'sohbet', 'asistan', 'e-posta'],
    reply: "Metin üretimi ve zeka konusunda fısıltılar çok net! ✍️ Google'ın devasa bağlam pencereli **Google Gemini** modeli uzun dökümanları anlamada mükemmel. Günlük asistanlık ve karmaşık akıl yürütmeler için ise **ChatGPT Plus** vazgeçilmez sığınağınız olacaktır."
  },
  {
    keywords: ['video', 'animasyon', 'avatar', 'film', 'sinema'],
    reply: "Kamera arkasındaki fısıltıları dinleyin! 🎬 Profesyonel kurumsal videolar, sunumlar veya dijital insan ikizleri oluşturmak için **HeyGen** muhteşem bir dönüştürücü. Kısa kesitler ve sinematik denemeler için de popüler AI video araçlarını sitemizdeki filtrelerden arayabilirsiniz!"
  },
  {
    keywords: ['ses', 'müzik', 'şarkı', 'vokal', 'dublaj', 'podcast', 'konuşma'],
    reply: "Nefis akustik fısıltılar! 🎵 Harika kelimelerinizi bestelere döken **Suno AI** saniyeler içinde vokalli şarkılar yaratıyor. Eğer profesyonel seslendirmeler, dublajlar veya kendi sesinizi klonlamak isterseniz **ElevenLabs** bu alanda rakipsiz."
  },
  {
    keywords: ['verimlilik', 'not', 'organize', 'takvim', 'iş'],
    reply: "Zaman paha biçilmez! Sorunsuz ve organize çalışmak için fısıltımız: **Notion AI**. Notlarınızı otomatik özetler, toplantı tutanaklarınızı kusursuzlaştırır ve yapay zeka gücüyle sayfalarınızı canlandırır. ⚡"
  },
  {
    keywords: ['ücretsiz', 'free', 'beleş', 'para vermeden'],
    reply: "Bütçe dostu fısıltılar! Sitemizde bulunan araçların çoğu 'Freemium' yani başlangıçta tamamen ücretsiz sürüm sunuyor. **Google Gemini**, **Cursor**, **v0** ve **ElevenLabs** gibi devleri hiçbir ücret ödemeden ücretsiz limitleriyle keşfetmeye hemen başlayabilirsiniz! 💸"
  },
  {
    keywords: ['merhaba', 'selam', 'hey', 'naber'],
    reply: "Merhaba! 🎧 Ben **AIFısıltısı Akıllı Rehberi**. Sana yapay zeka haberleri hakkında fısıldayabilir veya aradığın ideal yapay zeka aracını bulmanda yardımcı olabilirim. Kod, Görsel, Ses ya da Verimlilik... Ne hakkında konuşalım?"
  }
];

export const fallback_whisper = "Yapay zeka fısıltılarını dinliyorum! 🌌 Bana aramayı düşündüğün özelliklerden bahset (Örn: 'kod yazmak istiyorum', 'müzik oluşturma', 'ücretsiz araçlar neler?'). Sana en özel önerileri fısıldayayım!";
