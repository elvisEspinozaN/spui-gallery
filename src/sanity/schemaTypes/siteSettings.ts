import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",

  groups: [
    { name: "general", title: "General" },
    { name: "contact", title: "Contact" },
    { name: "policies", title: "Booking Policies" },
    { name: "seo", title: "Seo" },
  ],

  fields: [
    // general
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      group: "general",
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      rows: 3,
      group: "general",
      validation: (rule) =>
        rule
          .required()
          .min(20)
          .warning("Add a descriptive summary for better SEO"),
    }),

    // contact
    defineField({
      name: "contact",
      title: "Contact",
      type: "object",
      group: "contact",
      fields: [
        defineField({
          name: "email",
          title: "Email",
          type: "string",
          validation: (rule) => rule.required().email(),
        }),
        defineField({
          name: "phone",
          title: "Phone",
          type: "string",
          description: "Display format, e.g. (123) 123-1234",
        }),
        defineField({
          name: "instagram",
          title: "Instagram",
          type: "url",
          description: "Full profile URL (https://instagram.com/username)",
        }),
      ],
    }),

    // booking policies
    defineField({
      name: "bookingPolicies",
      title: "Booking Policies",
      type: "object",
      group: "policies",
      fields: [
        defineField({
          name: "deposit",
          title: "Deposit Policy",
          type: "text",
          rows: 3,
          validation: (rule) => rule.required().min(10),
        }),
        defineField({
          name: "cancellation",
          title: "Cancellation Policy",
          type: "text",
          rows: 3,
          validation: (rule) => rule.required().min(10),
        }),
      ],
    }),

    // seo
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "seo",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          validation: (rule) => rule.required().max(60),
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          validation: (rule) => rule.required().max(160),
        }),
        defineField({
          name: "socialImage",
          title: "Social Share Image",
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
        }),
      ],
    }),
  ],

  preview: { select: { title: "siteTitle" } },
});
