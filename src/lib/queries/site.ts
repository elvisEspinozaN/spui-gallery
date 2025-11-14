import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

// Get site settings
export async function getSiteSettings() {
  try {
    return await client.fetch(groq`
      *[_type == "siteSettings"][0] {
        siteTitle, siteDescription,
        contact{
          email, phone, instagram
        },
        bookingPolicies{
          deposit, cancellation
        },
        seo{
          metaTitle, metaDescription,
          socialImage{
            asset->{
              url, 
              metadata{
                dimensions, lqip
              },
              alt
            }
          }
        }
      }
      `);
  } catch (error) {
    console.error("failed to fetch site settings");
    return {
      siteTitle: "Spiu Gallery",
      siteDescription:
        "Professional tattoo in New York offering custom designs, fine line, black & grey, and color tattoos. Our skilled NYC tattoo artists create unique, high-quality body art in a clean, welcoming environment. Book your appointment today!",
      contact: {
        email: "spiugallery4386@yahoo.com",
        phone: "",
        instagram: "https://instagram.com/spiu_gallery",
      },
      bookingPolicies: { deposit: "", cancellation: "" },
      seo: { metaTitle: "", metaDescription: "" },
    };
  }
}

// Get artist profile
export async function getArtistProfile() {
  try {
    return await client.fetch(groq`
      *[_type == "artistProfile"][0]{
        name, bio, specialties,
        profileImage{
          asset->{
            url, metadata{
              dimensions, lqip
            }
          }
        }
      }
      `);
  } catch (error) {
    console.error("Failed to fetch artist profile");
    return {
      name: "Sophia Pennino",
      profileImage: null,
      bio: "",
      specialties: [],
    };
  }
}
