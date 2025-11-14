import { defineField, defineType } from "sanity";

export const flashCollection = defineType({
  name: "flashCollection",
  title: "Flash Collection",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Collection Title",
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
      name: "coverImage",
      title: "Cover Image",
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
      validation: (rule) => rule.min(1).error("Pick at least one category"),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "designParameters",
      title: "Design Parameters",
      type: "object",
      fields: [
        defineField({ name: "sizing", title: "Sizing", type: "string" }),
        defineField({ name: "placement", title: "Placement", type: "string" }),
        defineField({
          name: "price",
          title: "Pricing (display)",
          type: "string",
          description:
            'e.g., "$200 - $450" (display only; Stripe uses the deposit amount)',
        }),
      ],
    }),
    defineField({
      name: "depositAmount",
      title: "Deposit Amount (USD)",
      type: "number",
      description: "Non-refundable deposit (Stripe will charge this).",
      validation: (rule) => rule.required().integer().min(1).max(100000),
    }),
    defineField({
      name: "isAvailable",
      title: "Is Available",
      type: "boolean",
      initialValue: true,
      description: "Should this collection be available for booking?",
    }),
    defineField({
      name: "bookingNote",
      title: "Booking Note",
      type: "text",
      description:
        "Please include preferred design/placement in the booking notes.",
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "coverImage",
      isAvailable: "isAvailable",
      categories: "categories.0.title",
      isFeatured: "isFeatured",
    },
    prepare({ title, media, isAvailable, categories, isFeatured }) {
      const parts = [
        categories ? `${categories}` : null,
        isFeatured ? "Featured" : null,
        isAvailable ? "Available" : null,
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
      title: "Available -> Newest",
      name: "availableNewest",
      by: [
        { field: "isAvailable", direction: "desc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
    {
      title: "Newest first",
      name: "createdDesc",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
