import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

const categoryBaseFields = groq`
  _id, title, "slug": slug.current, description
`;

export async function getAllCategories() {
  try {
    return await client.fetch(groq`
      *[_type == "category"] | order(title asc) {
        ${categoryBaseFields}
      }
      `);
  } catch (error) {
    console.error("Failed to fetch categories");
    return [];
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    return await client.fetch(groq`
      *[_type == "category" && slug.current == $slug][0] {
        ${categoryBaseFields}
      }
      `);
  } catch (error) {
    console.error("Failed to fetch category");
    return null;
  }
}
