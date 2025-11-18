# API Documentation

## Overview

All queries use Sanity's GROQ query language to fetch content from the CMS.

## 📋 Table of Contents

- [Flash Collection Queries](#flash-collection-queries)
- [Portfolio Queries](#portfolio-queries)
- [Category Queries](#category-queries)
- [Site & Artist Queries](#site--artist-queries)
- [Error Handling](#error-handling)

---

## Flash Collection Queries

### `getAllFlashCollections()`

Fetches all active flash collections ordered by creation date.

**Response Structure:**

```typescript
{
  _id: string;
  title: string;
  slug: string;
  coverImage: {
    asset: { url: string; metadata: { lqip: string } };
    alt: string;
  };
  depositAmount: number;
  designParameters: {
    sizing?: string;
    placement?: string;
    price?: string;
  };
  categories: Array<{
    title: string;
    slug: string;
  }>;
}
```

---

### `getFlashCollectionBySlug(slug: string)`

Fetches a single flash collection by its slug identifier.

**Parameters:**

- `slug` (string) - The URL-friendly identifier for the collection

**Returns:** `Promise<FlashCollection | null>`

---

### `getFlashCollectionsByCategory(categorySlug: string)`

Fetches flash collections filtered by category.

**Parameters:**

- `categorySlug` (string) - The category slug to filter by

**Returns:** `Promise<FlashCollection[]>`

---

### `getRecentFlashCollections(limit?: number)`

Fetches the most recently created flash collections.

**Parameters:**

- `limit` (number, optional) - Maximum number of collections to return (default: 6)

**Returns:** `Promise<FlashCollection[]>`

---

## Portfolio Queries

### `getAllPortfolioPieces()`

Fetches all portfolio pieces ordered by published date.

**Returns:** `Promise<PortfolioPiece[]>`

**Response Structure:**

```typescript
{
  _id: string;
  title: string;
  slug: string;
  image: {
    asset: { url: string; metadata: { lqip: string } };
    alt: string;
  };
  categories: Array<{
    title: string;
    slug: string;
  }>;
  description?: string;
  publishedAt: string;
  isFeatured: boolean;
}
```

---

### `getPortfolioPieceBySlug(slug: string)`

Fetches a single portfolio piece by slug.

**Parameters:**

- `slug` (string) - The portfolio piece identifier

**Returns:** `Promise<PortfolioPiece | null>`

---

### `getFeaturedPortfolioPieces(limit?: number)`

Fetches portfolio pieces marked as featured.

**Parameters:**

- `limit` (number, optional) - Maximum number of pieces (default: 8)

**Returns:** `Promise<PortfolioPiece[]>`

---

### `getPortfolioPiecesByCategory(categorySlug: string)`

Fetches portfolio pieces filtered by category.

**Parameters:**

- `categorySlug` (string) - Category to filter by

**Returns:** `Promise<PortfolioPiece[]>`

---

### `getRecentPortfolioPieces(limit?: number)`

Fetches recently published portfolio pieces.

**Parameters:**

- `limit` (number, optional) - Maximum number of pieces (default: 8)

**Returns:** `Promise<PortfolioPiece[]>`

---

## Category Queries

### `getAllCategories()`

Fetches all categories ordered alphabetically.

**Returns:** `Promise<Category[]>`

**Response Structure:**

```typescript
{
  _id: string;
  title: string;
  slug: string;
  description?: string;
}
```

---

### `getCategoryBySlug(slug: string)`

Fetches a single category by slug.

**Parameters:**

- `slug` (string) - Category identifier

**Returns:** `Promise<Category | null>`

---

## Site & Artist Queries

### `getSiteSettings()`

Fetches global site configuration and settings.

**Returns:** `Promise<SiteSettings>`

**Response Structure:**

```typescript
{
  siteTitle: string;
  siteDescription: string;
  contact: {
    email: string;
    phone?: string;
    instagram?: string;
  };
  bookingPolicies: {
    deposit: string;
    cancellation: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    socialImage?: {
      asset: { url: string; metadata: { dimensions: object } };
      alt: string;
    };
  };
}
```

---

### `getArtistProfile()`

Fetches artist profile information.

**Returns:** `Promise<ArtistProfile>`

**Example:**

**Response Structure:**

```typescript
{
  name: string;
  bio: string;
  specialties: string[];
  profileImage?: {
    asset: { url: string; metadata: { dimensions: object; lqip: string } };
    alt?: string;
  };
}
```

**Fallback:** Returns default artist info if query fails.

---

## Error Handling

### Query Error Patterns

All queries implement consistent error handling:

### Error Response Types

- **List queries** (getAll*, getRecent*): Return empty array `[]`
- **Single queries** (getBySlug): Return `null`
- **Settings queries**: Return fallback default values
