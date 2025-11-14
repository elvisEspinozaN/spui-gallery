import { type SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./siteSettings";
import { category } from "./category";
import { flashCollection } from "./flashCollection";
import { portfolioPiece } from "./portfolioPiece";
import { artistProfile } from "./artistProfile";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    category,
    flashCollection,
    portfolioPiece,
    artistProfile,
  ],
};
