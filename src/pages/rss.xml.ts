import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '@/lib/blog';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: 'PartnerPress Blog',
    description: 'Plain-English guides on WordPress, Local SEO and Google Ads for small service businesses.',
    site: context.site ?? 'https://partnerpress.net',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
    })),
  });
}
