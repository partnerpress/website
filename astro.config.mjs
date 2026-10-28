// @ts-check
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
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
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/thank-you/') && !page.includes('/404'),
    }),
    searchVisibility(),
  ],
});
