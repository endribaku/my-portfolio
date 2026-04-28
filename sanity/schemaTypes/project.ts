import { defineType, defineField, defineArrayMember } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Position on the home page (lower numbers appear first).",
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Short tagline shown on the detail page.",
    }),
    defineField({
      name: "externalLink",
      title: "External link",
      type: "object",
      description: "Optional. Link to either the live site or the public repo.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "kind",
          title: "Type",
          type: "string",
          options: {
            list: [
              { title: "Live site", value: "site" },
              { title: "GitHub repo", value: "repo" },
            ],
            layout: "radio",
          },
        }),
        defineField({
          name: "url",
          title: "URL",
          type: "url",
          validation: (rule) =>
            rule.uri({ scheme: ["http", "https"] }),
        }),
      ],
      validation: (rule) =>
        rule.custom((value) => {
          const link = value as
            | { kind?: string; url?: string }
            | undefined;
          if (!link) return true;
          const hasKind = Boolean(link.kind);
          const hasUrl = Boolean(link.url);
          if (hasKind === hasUrl) return true;
          return "Both Type and URL are required when an external link is set.";
        }),
    }),
    defineField({
      name: "thumbnailImage",
      title: "Thumbnail Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "thumbnailImage",
      subtitle: "description",
    },
  },
});
