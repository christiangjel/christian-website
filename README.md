This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy to GitHub Pages

This project is configured for static export and GitHub Pages deployment.

### Prerequisites

1. Ensure your GitHub repository is set up
2. The repository name should match the `basePath` in `next.config.ts` (currently `/christian-website`)

### Deployment Steps

1. **Build the static export:**

   ```bash
   npm run build
   ```

   This creates an `out` directory with the static files.

2. **Deploy to GitHub Pages:**

   ```bash
   npm run deploy
   ```

   This uses `gh-pages` to deploy the `out` directory to the `gh-pages` branch.

3. **Configure GitHub Pages:**
   - Go to your repository settings on GitHub
   - Navigate to "Pages" in the sidebar
   - Under "Source", select the `gh-pages` branch
   - Click "Save"

Your site will be available at `https://[your-username].github.io/christian-website`

### Notes

- The `next.config.ts` is configured with `basePath` and `assetPrefix` for GitHub Pages
- Static export is enabled only in production builds
- The `out` directory contains all static files needed for deployment
