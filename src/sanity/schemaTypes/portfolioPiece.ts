import { defineField, defineType } from "sanity";

export const portfolioPiece = defineType({
  name: "portfolioPiece",
  title: "PortfolioPiece",
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
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (slug, ctx) => ctx.defaultIsUnique(slug, ctx),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required().min(3),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (rule) =>
        rule.required().min(1).error("Pick at least one category"),
    }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      description: "Used for ordering/scheduling in the gallery",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Pin to featured sections/carousels",
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
      categories: "categories.0.title",
      isFeatured: "isFeatured",
    },
    prepare({ title, media, categories, isFeatured }) {
      const parts = [
        categories ? `${categories}` : null,
        isFeatured ? "Featured" : null,
      ].filter(Boolean);

      return {
        title,
        media,
        subtitle: parts.join(" • "),
      };
    },
  },
  orderings: [
    {
      title: "Featured -> Newest",
      name: "featuredNewest",
      by: [
        { field: "isFeatured", direction: "desc" },
        { field: "publishedAt", direction: "desc" },
      ],
    },
    {
      title: "Newest first",
      name: "publishedAt",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
