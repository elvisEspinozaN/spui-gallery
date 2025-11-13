import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

const flashCollectionBaseFields = groq`
  _id, title, "slug": slug.current,
  coverImage {
    asset->{
      url, metadata { lqip }
    },
    alt
  },
  depositAmount,
  designParameters{
    sizing, placement, price
  }
`;

// Get all active flash collections
export async function getAllFlashCollections() {
  try {
    return await client.fetch(groq`
    *[_type == "flashCollection" && isAvailable == true] | order(_createdAt desc) {
      ${flashCollectionBaseFields},
      categories[]->{
        title, "slug": slug.current
      }
    }
    `);
  } catch (error) {
    console.error("Failed to fetch collections");
    return [];
  }
}

// Get single flash collection by slug
export async function getFlashCollectionBySlug(slug: string) {
  try {
    return await client.fetch(
      groq`
    *[_type == "flashCollection" && slug.current == $slug && isAvailable == true][0] {
      ${flashCollectionBaseFields},
      categories[]->{
        title, "slug": slug.current, description
      },
      description, bookingNote
    }
    `,
      { slug }
    );
  } catch (error) {
    console.error("Failed to fetch collection");
    return null;
  }
}

// Get flash collections by category
export async function getFlashCollectionsByCategory(categorySlug: string) {
  try {
    return await client.fetch(
      groq`
    *[_type == "flashCollection" && isAvailable == true && $categorySlug in categories[]->slug.current] | order(_createdAt desc) {
      ${flashCollectionBaseFields},
      categories[]->{
        title, "slug": slug.current
      }
    }
    `,
      { categorySlug }
    );
  } catch (error) {
    console.error("Failed to fetch category collections");
  }
}

// Get recent collections
export async function getRecentFlashCollections(limit: number = 8) {
  try {
    return await client.fetch(
      groq`
    *[_type == "flashCollection" && isAvailable == true] | order(_createdAt desc)[0...$limit] {
      ${flashCollectionBaseFields}
    }
    `,
      { limit }
    );
  } catch (error) {
    console.error("Failed to fetch recent collections");
    return [];
  }
}
