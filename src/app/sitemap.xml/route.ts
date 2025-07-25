// app/sitemap.xml/route.ts

import { modelInfo } from '@/lib/models';

const URL = 'https://www.modeltoolkit.com';

function generateSitemap() {
  const pages = [
    { url: '', priority: 1.0 },
    { url: '/about', priority: 0.8 },
    { url: '/feedback', priority: 0.5 },
    { url: '/blog', priority: 0.7 },
    { url: '/blog/prioritize-your-tasks-a-guide-to-mastering-the-eisenhower-matrix', priority: 0.6 },
    { url: '/blog/optimizing-your-business-with-model-toolkit', priority: 0.6 },
    { url: '/blog/10-best-productivity-tools', priority: 0.6 },
    { url: '/blog/understanding-various-business-models-for-startup-growth', priority: 0.6 },
    { url: '/blog/formulating-a-strong-business-strategy-step-by-step', priority: 0.6 },
    { url: '/blog/driving-innovation-in-your-company', priority: 0.6 },
    { url: '/blog/from-idea-to-action-keys-to-successful-business-plan-execution', priority: 0.6 },
    { url: '/blog/5-personal-development-models-to-reach-your-full-potential', priority: 0.6 },
    { url: '/blog/productivity-enhancement-secrets-effective-strategies-and-tools', priority: 0.6 },
    { url: '/blog/best-free-tools-for-business-planning-and-productivity', priority: 0.6 },
    { url: '/blog/a-complete-guide-to-strategic-planning-for-small-businesses', priority: 0.6 },
    { url: '/terms', priority: 0.3 },
    { url: '/privacy', priority: 0.3 },
  ];

  const modelPages = Object.keys(modelInfo).map(modelId => ({
    url: `/models/${modelId}`,
    priority: 0.9,
  }));

  const allPages = [...pages, ...modelPages];

  const sitemapEntries = allPages.map(page => `
    <url>
      <loc>${URL}${page.url}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <priority>${page.priority.toFixed(1)}</priority>
    </url>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapEntries}
</urlset>`;
}

export async function GET() {
  const sitemap = generateSitemap();
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
