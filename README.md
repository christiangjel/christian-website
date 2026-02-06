# Christian Gjelstrup - Portfolio Website

A modern, performant portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js
- **Forms**: React Hook Form + Zod
- **Testing**: Vitest + React Testing Library

## Architecture

### Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── not-found.tsx      # 404 page
│   ├── robots.ts          # Dynamic robots.txt
│   ├── sitemap.ts         # Dynamic sitemap
│   ├── fonts.ts           # Font configuration
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/            # Layout (Header, Footer, navigation, waves, theme)
│   ├── sections/          # Page sections (Hero, About, Skills, etc.)
│   └── ui/                # Reusable UI components
├── hooks/                  # Custom React hooks (root level)
│   ├── useNavigation.ts
│   ├── useSectionAnimation.ts
│   └── useTabAnimation.ts
├── constants/              # Application constants
│   ├── index.ts            # Re-exports
│   ├── sections.ts         # Section IDs
│   ├── config.ts           # App configuration
│   ├── metadata.ts         # SEO metadata
│   └── animations.ts       # Animation configs
├── lib/                    # Utility functions
│   ├── content.ts          # Typed content loader
│   ├── logger.ts           # Logging utility
│   ├── utils.ts            # General utilities
│   └── validations/         # Validation schemas (e.g. contact)
├── types/                  # TypeScript type definitions
│   └── content.ts          # Content types
├── data/                   # Static data
│   └── content.json        # Site content
└── tests/                  # Vitest tests (mirrors source structure)
```

### Key Design Decisions

- **Type Safety**: All content is typed with TypeScript for compile-time safety
- **Server Components**: Used where possible for better performance
- **Constants**: Centralized constants for maintainability
- **Error Handling**: Logger utility for consistent error handling
- **Testing**: Vitest for fast, modern testing

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Deployment Steps

1. **Push your code to GitHub** (if not already done)

2. **Import your project in Vercel:**

   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Set Environment Variable (Recommended):**

   - Go to your project settings in Vercel
   - Navigate to "Environment Variables"
   - Add: `NEXT_PUBLIC_SITE_URL` = `https://christian-gjelstrup.com`
   - Select "Production" environment
   - Click "Save"

4. **Deploy:**
   - Vercel will automatically deploy on every push to your main branch
   - Preview deployments are created for pull requests

### Domain Configuration

- **Production Domain**: `christian-gjelstrup.com`
- The app uses `NEXT_PUBLIC_SITE_URL` for SEO metadata, sitemap, and structured data
- If not set, it falls back to Vercel's auto-generated URL (`VERCEL_URL`)

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Development

### Running Tests

```bash
npm run test          # Run tests in watch mode
npm run test:ui       # Run tests with UI
npm run test:coverage # Run tests with coverage
```

### Code Organization

- **Constants**: All magic strings and configuration values are in `constants/`
- **Types**: TypeScript types are in `types/` directory
- **Validations**: Zod schemas are in `lib/validations/`
- **Content**: All text content is in `data/content.json` with TypeScript types

### Best Practices

- Use server components when possible (no client-side features needed)
- Import constants from `@/constants` instead of hardcoding values
- Use typed content from `@/lib/content` instead of direct JSON imports
- Use logger utility instead of console statements
- Follow existing component patterns for consistency

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run type-check` - Run TypeScript type checking
