# Spíu Gallery

A modern **tattoo portfolio and booking platform** that allows clients to browse flash collections, view portfolio work, and book appointments with secure deposit payments.

Built for tattoo artists who want a professional online presence with integrated booking management.

## Features

- **Flash Collection Showcase** - Display tattoo flash sheets with booking functionality
- **Portfolio Gallery** - Categorized portfolio with filtering capabilities
- **Secure Booking System** - Stripe-powered deposit payments
- **Automated Notifications** - Email confirmations for clients and artists
- **Content Management** - Easy-to-use Sanity Studio for content updates
- **Mobile Responsive** - Optimized for all devices
- **Fast Performance** - Next.js with static generation and ISR

## Tech Stack

- **Frontend:** Next.js 15 + React 19 + TypeScript + Tailwind CSS
- **UI Components:** shadcn/ui + Lucide React icons
- **CMS:** Sanity Studio (hosted at `/studio`)
- **Database:** Supabase (booking data)
- **Payments:** Stripe (deposit processing)
- **Email:** Resend (notifications)
- **Hosting:** Vercel
- **Analytics:** Plausible (privacy-focused)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity account
- Supabase account (for booking data)
- Stripe account (for payments)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/elvisEspinozaN/spiu-gallery.git
   cd spiu-gallery
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your Sanity, Supabase, and Stripe credentials.

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Access the application**
   - Website: `http://localhost:3000`
   - Sanity Studio: `http://localhost:3000/studio`

## 📁 Project Structure

```
src/
├── app/                   # Next.js App Router pages
│   ├── studio/            # Sanity Studio route
│   ├── flash/             # Flash collection pages
│   ├── portfolio/         # Portfolio gallery
│   └── api/               # API routes (Stripe, webhooks)
├── components/            # Reusable UI components
├── lib/                   # Utilities and configurations
│   ├── queries/           # Sanity GROQ queries
│   └── utils.ts           # Helper functions
└── sanity/                # Sanity CMS configuration
    ├── schemaTypes/       # Content schemas
    └── lib/               # Sanity client setup
```

## Content Management

### Sanity Studio

Access the content management system at `/studio` to:

- Add/edit flash collections
- Upload portfolio pieces
- Manage categories
- Update site settings and artist profile

### Content Types

- **Flash Collections:** Tattoo flash sheets with pricing and booking info
- **Portfolio Pieces:** Individual tattoo photos with categories
- **Categories:** Organize work by style (Traditional, Fine Line, etc.)
- **Artist Profile:** Bio, specialties, and profile image
- **Site Settings:** Contact info, policies, and SEO settings

## Booking Flow

1. **Client browses** flash collections or portfolio
2. **Selects design** and fills out booking form
3. **Pays deposit** via Stripe checkout
4. **Receives confirmation** email with booking details
5. **Artist gets notification** with client information
6. **Artist approves** booking and schedules consultation

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Dependencies

- `next` - React framework
- `sanity` - Headless CMS
- `@supabase/supabase-js` - Database client
- `stripe` - Payment processing
- `resend` - Email service
- `tailwindcss` - CSS framework

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Resend
RESEND_API_KEY=
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
