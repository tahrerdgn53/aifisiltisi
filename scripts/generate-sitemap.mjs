import fs from 'fs';

const SUPABASE_URL = 'https://ayzlovxcimmqmyudqwfp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_AR_oL99i9WbCJu8Lgri3jA_NrY3etfq';

const SITE_URL = 'https://www.aifisiltisi.com';

function slugify(text) {
  if (!text) return '';

  const trMap = {
    ç: 'c',
    Ç: 'c',
    ğ: 'g',
    Ğ: 'g',
    ı: 'i',
    I: 'i',
    İ: 'i',
    ö: 'o',
    Ö: 'o',
    ş: 's',
    Ş: 's',
    ü: 'u',
    Ü: 'u',
  };

  let result = text;

  for (const key in trMap) {
    result = result.replace(new RegExp(key, 'g'), trMap[key]);
  }

  return result
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function fetchSupabase(table, select) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/${table}?select=${select}`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Supabase hatası (${table}): ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

async function generateSitemap() {
  try {
    const [tools, articles] = await Promise.all([
      fetchSupabase('tools', 'name'),
      fetchSupabase('articles', 'title,created_at'),
    ]);

    const staticPages = [
      '',
      '/about',
      '/contact',
      '/privacy',
      '/cookies',
      '/terms',
    ];

    const staticUrls = staticPages.map(
      (path) => `
  <url>
    <loc>${SITE_URL}${path}</loc>
  </url>`
    );

    const toolUrls = tools.map(
      (tool) => `
  <url>
    <loc>${SITE_URL}/ai-tools/${slugify(tool.name)}</loc>
  </url>`
    );

    const articleUrls = articles.map((article) => {
      const lastmod = article.created_at
        ? new Date(article.created_at).toISOString().split('T')[0]
        : '';

      return `
  <url>
    <loc>${SITE_URL}/news/${slugify(article.title)}</loc>${
        lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''
      }
  </url>`;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...toolUrls, ...articleUrls].join('')}
</urlset>
`;

    fs.writeFileSync('public/sitemap.xml', sitemap, 'utf8');

    console.log(
      `Sitemap oluşturuldu: ${staticPages.length} statik sayfa, ${tools.length} araç, ${articles.length} makale.`
    );
  } catch (error) {
    console.error('Sitemap oluşturulamadı:', error);
    process.exit(1);
  }
}

generateSitemap();
