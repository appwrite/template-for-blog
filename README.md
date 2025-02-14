# Blog template

A modern template designed for blog with a mobile-friendly interface & a customizable theme.

## Showcase

### 1. Homepage

Paginated list of blog with featured blog post at the top. Blog posts can be filtered by categories.

### 2. Blog post details

Blog post with detailed description and ability to configure and select variations. Blog posts can be added to the list
by just writing your content in a markdown file.

## Highlight

### 1. Image optimization

[BlurHash](https://github.com/woltapp/blurhash) technology (commonly known from Wolt app) optimizes application
experience and looks while images are still loading. A very useful improvement for use on mobile devices with limited
internet access and speed.

### 2. Dark theme

Theme toggle in footer allows visitors to switch to dark theme when browsing during night. Developer can easily enforce
a theme, set default theme, or remove the feature all-together.

### 3. Performance, accessibility and SEO

Near-perfect Lighthouse score to ensure great accessibility for people with disabilities, and SEO optimizations to
ensure search engines can scan the website with ease.

## Useful links

- Blog posts: [src/posts](./src/posts)
- Blog cover pictures: [static/images/posts](./static/images/posts)
- Site footer: [src/lib/components/footer/Footer.svelte](./src/lib/components/footer/Footer.svelte)
- Logo: [static/logo.svg](./static/logo.svg) and [static/favicon.ico](./static/favicon.ico)
- OG image (preview thumbnail): [static/thumbnail.png](./static/thumbnail.png)

## Technologies

We use [Svelte](https://svelte.dev/docs/svelte/overview) and [SvelteKit](https://svelte.dev/docs/kit/introduction) as a
web framework with [TypeScript](https://www.typescriptlang.org/) codebase.

CSS framework [TailwindCSS](https://tailwindcss.com/) is used for all styling needs.

## Tips and tricks

- Blog content supports [Markdown](https://www.markdownguide.org/) syntax
- Never use images with resolution greater than 1080p
- Before production use, connect to analytics tool such as [Plausible](https://plausible.io/)
  or [Google Analytics](https://marketingplatform.google.com/about/analytics/)

## Local development

1. Install dependencies with `npm install` (or `pnpm install` or `yarn`)
2. Start a development server with `npm run dev` (or `pnpm dev` or `yarn dev`)
3. Visit [localhost:5173](http://localhost:5173/)

## Deploy to production

When used with Appwrite, all changes to `main` branch are automatically deployed to production.

Otherwise, use `npm run build` (or `pnpm build` or `yarn build`), and deploy as Node.js server with build folder as
`./build`.
