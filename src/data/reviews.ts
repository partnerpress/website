// Excerpts from PartnerPress Google reviews, quoted word for word.

export interface Review {
  quote: string;
  name: string;
  note: string;
}

export const REVIEWS = {
  maxson: {
    quote:
      'Shane keeps our website up to date and secure with monthly patches and analytics. All of this as well as routine changes to the website are included in our contract so there are no surprises.',
    name: 'Michael Maxson',
    note: 'Google review',
  },
  gibbs: {
    quote:
      "I trust him implicitly to give us honest and expert advice regarding our website. Shane truly seems to care about what's best for us and communicates in layman's terms.",
    name: 'Laurie Gibbs',
    note: 'nonprofit client since 2020',
  },
  gibbsSpend: {
    quote: "Maybe to his own detriment, he doesn't seem to be looking for angles to make us always spend more money.",
    name: 'Laurie Gibbs',
    note: 'nonprofit client since 2020',
  },
  perry: {
    quote:
      "The site has been running continuous and has never been down once the entire time I've worked with him. Partner Press is extremely responsive and dependable.",
    name: 'Jeffrey Perry',
    note: 'client for 6+ years',
  },
  perryRebrand: {
    quote:
      'He helped me port and convert an existing site I owned and then rebrand it. The process was easy, quick and painless.',
    name: 'Jeffrey Perry',
    note: 'Google review',
  },
  panek: {
    quote:
      'He is responsive, knowledgeable, and fixes our website, just like magic! Shane also takes the time to explain terminology and what he is doing.',
    name: 'Vickie Panek',
    note: 'Google review',
  },
  krivatsy: {
    quote:
      "We've worked with Shane at PartnerPress for several years now. He is always responsive, helpful, and practical. Shane is a true Pro.",
    name: 'Elizabeth Krivatsy',
    note: 'Google review',
  },
  wombacher: {
    quote:
      'He went in, did a ton of analytics, fixed a whole number of issues, merged the two sites and kept me updated in a regular and timely fashion.',
    name: 'Michael Wombacher',
    note: 'Google review',
  },
  jae: {
    quote: 'Extremely professional, honest, hardworking and never stops progressing on your SEO vehicle.',
    name: 'Jacynda Jae',
    note: 'Google review',
  },
} satisfies Record<string, Review>;
