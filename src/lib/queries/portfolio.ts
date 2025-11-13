import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

const portfolioBaseFields = groq`
  _id, title, "slug": slug.current,
  image {
    asset->{
      url, metadata{ lqip }
    },
    alt
  },
  publishedAt, isFeatured
`;

// Get all portfolio pieces
export async function getAllPortfolioPieces() {
  try {
    return await client.fetch(groq`
      *[_type == "portfolioPiece"] | order(publishedAt desc) {
        ${portfolioBaseFields},
        categories[]->{
          title, "slug": slug.current
        },
        description
      }
      `);
  } catch (error) {
    console.error("Failed to fetch portfolio pieces");
    return [];
  }
}

// Get single portfolio piece by slug
export async function getPortfolioPieceBySlug(slug: string) {
  try {
    return await client.fetch(
      groq`
      *[_type == "portfolioPiece" && slug.current == $slug][0] {
        ${portfolioBaseFields},
        categories[]->{
          title, "slug": slug.current, description
        }
      }
      `,
      { slug }
    );
  } catch (error) {
    console.error("Failed to fetch portfolio piece");
    return null;
  }
}

// Get featured portfolio pieces
export async function getFeaturedPortfolioPieces(limit: number = 8) {
  try {
    return await client.fetch(
      groq`
      *[_type == "portfolioPiece" && isFeatured == true] | order(publishedAt desc)[0...$limit] {
        ${portfolioBaseFields},
        categories[]->{
          title, "slug": slug.current
        }
      }
      `,
      { limit }
    );
  } catch (error) {
    console.error("Failed to fetch featured portfolio pieces");
    return [];
  }
}

// Get portfolio pieces by category
export async function getPortfolioPiecesByCategory(categorySlug: string) {
  try {
    return await client.fetch(
      groq`
      *[_type == "portfolioPiece" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
        ${portfolioBaseFields},
        categories[]->{
          title, "slug": slug.current
        },
        description
      }
      `,
      { categorySlug }
    );
  } catch (error) {
    console.error("Failed to fetch portfolio pieces by category");
    return [];
  }
}

// Get recent portfolio pieces
export async function getRecentPortfolioPieces(limit: number = 8) {
  try {
    return await client.fetch(
      groq`
      *[_type == "portfolioPiece"] | order(publishedAt desc)[0...$limit] {
        ${portfolioBaseFields},
        categories[]->{
          title
        }
      }
      `,
      { limit }
    );
  } catch (error) {
    console.error("Failed to fetch recent portfolio pieces");
    return [];
  }
}
