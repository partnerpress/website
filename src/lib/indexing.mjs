// Decides whether search engines may index this build.
//
// Netlify sets CONTEXT (production, deploy-preview, branch-deploy) and URL (the
// site's primary address). Until partnerpress.net is the primary domain, URL is
// the netlify.app address, so every build stays out of search results while
// remaining public for Huddlekit and reviewers.
//
// SITE_INDEXABLE=true|false overrides the check (handy for local builds).

export const LIVE_HOST = 'partnerpress.net';

export function isIndexable(env = process.env) {
  const override = (env.SITE_INDEXABLE ?? '').trim().toLowerCase();
  if (['true', '1', 'yes'].includes(override)) return true;
  if (['false', '0', 'no'].includes(override)) return false;

  const url = env.URL ?? '';
  return env.CONTEXT === 'production' && url.includes(LIVE_HOST) && !url.includes('netlify.app');
}
