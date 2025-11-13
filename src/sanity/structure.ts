import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("Content")
    .items([
      // --- Singleton ---
      S.listItem().title("Site Settings").child(
        S.document().schemaType("siteSettings").documentId("siteSettings") // fixed _id ensures a single doc
      ),
      S.listItem()
        .title("Artist Profile")
        .child(
          S.document().schemaType("artistProfile").documentId("artistProfile")
        ),

      // --- Your content types (explicit order) ---
      S.documentTypeListItem("portfolioPiece").title("Portfolio"),
      S.documentTypeListItem("flashCollection").title("Flash Collections"),
      S.documentTypeListItem("category").title("Categories"),

      // --- Any remaining types, excluding ones already shown ---
      ...S.documentTypeListItems().filter(
        (li) =>
          ![
            "siteSettings",
            "artistProfile",
            "portfolioPiece",
            "flashCollection",
            "category",
          ].includes(li.getId() ?? "")
      ),
    ]);
