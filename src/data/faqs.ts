export interface Faq {
  q: string;
  a: string;
}

export const CARE_FAQS: Faq[] = [
  {
    q: 'What if my site gets hacked?',
    a: 'I scan daily and fix issues as soon as they appear. If a site is compromised, I clean it and restore from a recent backup.',
  },
  { q: 'Can I change plans later?', a: "Yes. Upgrade or downgrade any time and I'll prorate the difference." },
  { q: 'Do you offer discounts for multiple sites?', a: "Yes. Get in touch and I'll put together a custom plan." },
  {
    q: "What isn't a quick fix?",
    a: "Redesigns and new features such as eCommerce, memberships or a learning platform. I'll send an estimate for those first.",
  },
];

export const SEO_FAQS: Faq[] = [
  {
    q: 'How long until I see results?',
    a: 'Google Business Profile fixes can show up within weeks. New pages and rankings usually take [X to Y] months. If you need calls sooner, pair SEO with Google Ads.',
  },
  { q: 'Do I need a contract?', a: 'No. Plans are month to month and you can change or cancel at the end of any term.' },
  {
    q: 'Why is website maintenance included?',
    a: 'A slow, broken or hacked site undoes SEO work. Including a Success Plan keeps the foundation solid.',
  },
  {
    q: "My site isn't on WordPress. Can you still help?",
    a: "Google Business Profile and review work, yes. For on-site SEO I'll recommend moving the site to WordPress first.",
  },
];

export const ADS_FAQS: Faq[] = [
  {
    q: 'How much should I spend on ads?',
    a: "It depends on your service and area. On the free call I'll estimate click costs for your top keywords and recommend a starting budget.",
  },
  {
    q: 'Who owns the Google Ads account?',
    a: 'You do. If we stop working together, the account, campaigns and history stay with you.',
  },
  { q: 'Is there a contract?', a: 'No. Management is month to month.' },
  {
    q: 'Do you also run Local Services Ads?',
    a: '[Yes / No. If yes: For eligible trades I can set up Google Local Services Ads, the "Google Guaranteed" listings above the regular ads.]',
  },
];

export const WEB_DESIGN_FAQS: Faq[] = [
  {
    q: 'Will a redesign hurt my Google rankings?',
    a: "Not if it's done carefully. I map every old URL to its new page and watch Search Console after launch.",
  },
  {
    q: 'Do you write the content?',
    a: '[Yes, copywriting is included / available as an add-on / You provide content and I edit it for the web.]',
  },
  {
    q: 'Who hosts the site?',
    a: "I'll recommend managed WordPress hosting and set it up in your name, or work with the host you already have.",
  },
  {
    q: 'Can I update the site myself?',
    a: 'Yes. You get a walkthrough at launch, and care plan clients can send small changes to me instead.',
  },
];
