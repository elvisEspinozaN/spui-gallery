import { defineField, defineType } from "sanity";

export const artistProfile = defineType({
  name: "artistProfile",
  title: "Artist Profile",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Artist Name",
      type: "string",
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
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
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required().min(50),
    }),
    defineField({
      name: "specialties",
      title: "Specialties",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(0).max(60),
    }),
  ],

  preview: {
    select: { title: "name", media: "profileImage" },
  },
});
