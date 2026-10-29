import { config, fields, collection } from '@keystatic/core';

// Local dev edits files on disk; the deployed admin commits to GitHub.
const storage = import.meta.env.PROD
  ? ({ kind: 'github', repo: 'partnerpress/website' } as const)
  : ({ kind: 'local' } as const);

export default config({
  storage,
  ui: { brand: { name: 'PartnerPress' } },
  collections: {
    blog: collection({
      label: 'Blog posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'pubDate'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        pubDate: fields.date({ label: 'Publish date', validation: { isRequired: true } }),
        updatedDate: fields.date({ label: 'Updated date' }),
        author: fields.text({ label: 'Author', defaultValue: 'Shane Barnes' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        draft: fields.checkbox({ label: 'Draft', description: 'Hidden on the live site.' }),
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),
    legal: collection({
      label: 'Legal pages',
      slugField: 'title',
      path: 'src/content/legal/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),
  },
});
