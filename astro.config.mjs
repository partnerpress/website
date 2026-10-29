// @ts-check
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import keystatic from '@keystatic/astro';
import { isIndexable } from './src/lib/indexing.mjs';

const indexable = isIndexable();

/**
 * Keeps non-live builds out of search results. Pages also get a robots meta tag
 * (see BaseLayout); this header covers every file, sitemap and images included.
 * @returns {import('astro').AstroIntegration}
 */
function searchVisibility() {
  return {
    name: 'partnerpress:search-visibility',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        if (indexable) {
          logger.info('search engines: allowed (live site)');
          return;
        }
        const headers = '/*\n  X-Robots-Tag: noindex, nofollow\n';
        await writeFile(fileURLToPath(new URL('_headers', dir)), headers);
        logger.info('search engines: blocked with noindex (not the live site)');
      },
    },
  };
}

export default defineConfig({
  site: 'https://partnerpress.net',
  // Pages stay prerendered; only the Keystatic admin (/keystatic) runs on demand.
  adapter: netlify(),
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Inline all CSS so no stylesheet blocks the first render.
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/thank-you/') && !page.includes('/404') && !page.includes('/keystatic'),
    }),
    searchVisibility(),
    react(),
    keystatic(),
  ],
});
