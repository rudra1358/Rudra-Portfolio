# Rudra Patel — Portfolio

Personal developer portfolio built with **React 19 + TypeScript + Vite**, **Tailwind CSS v4**, **Motion** (Framer Motion) and **Lucide / React Icons**.

**Live:** https://rudra-patel-portfolio.rudra1358.workers.dev

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

## Folder structure

```
portfolio/
├── public/                  static files copied as-is
│   ├── favicon.svg, og.png  favicon + social preview image
│   ├── projects/            put project screenshots here (optional)
│   └── resume/              put your résumé PDF here (optional)
├── src/
│   ├── data/                ← ALL CONTENT LIVES HERE
│   │   ├── personal.ts      name, headline, about text, email, socials, résumé, form endpoint
│   │   ├── projects.ts      every project card + modal
│   │   ├── skills.ts        skill categories, technologies, "currently exploring"
│   │   ├── achievements.ts  certifications, hackathons, webinars
│   │   ├── education.ts     degrees
│   │   ├── navigation.ts    navbar / footer links
│   │   └── types.ts         TypeScript shapes for the data above
│   ├── components/          UI (Navbar, Hero, About, Skills, Projects, ProjectCard,
│   │   │                    ProjectModal, Experience, Education, Contact, Footer…)
│   │   └── ui/              small reusable pieces (Section, Reveal, ButtonLink, TechBadge)
│   ├── hooks/               useTheme, useActiveSection, useScrolled
│   ├── lib/cn.ts            className + safe external-link helpers
│   ├── styles/index.css     design tokens (colours for light/dark themes) + Tailwind
│   ├── App.tsx
│   └── main.tsx
├── index.html               page title, meta description, Open Graph tags
└── wrangler.jsonc           Cloudflare deployment config
```

Components never contain your content — they read it from `src/data/`.

## Add a new project

Open `src/data/projects.ts` and append an object to the `projects` array:

```ts
{
  id: "my-new-project",                 // unique, url-friendly
  title: "My New Project",
  summary: "One or two sentences for the card.",
  description: ["Paragraph one for the modal.", "Paragraph two."],
  highlights: ["Feature one", "Feature two"],   // optional
  technologies: ["Python", "FastAPI"],
  category: "Machine Learning",         // a new category creates a new filter automatically
  github: "https://github.com/rudra1358/my-new-project",  // optional
  live: "https://my-demo.example.com",  // optional — omit and no Live Demo button is shown
  image: "/projects/my-new-project.webp", // optional — otherwise a cover is generated
  icon: Brain,                          // optional lucide-react icon (import it at the top)
  featured: true,                       // optional — listed first with a "Featured" badge
},
```

The card, the category filter, the modal and the project count in the About and Hero sections all update automatically. Cover colours per category are in `categoryColors` in the same file.

## Update other content

| What | Where |
| --- | --- |
| Name, headline, about text, email, availability | `src/data/personal.ts` |
| **LinkedIn** (currently hidden) | `socials` in `src/data/personal.ts` — set the `url` |
| **Résumé** (currently hidden) | put the PDF in `public/resume/` and set `resume: "/resume/your-file.pdf"` |
| Add a technology | push `{ name, icon, color }` into a category in `src/data/skills.ts` |
| Add a certification / achievement | append to `src/data/achievements.ts` (`date`, `location`, `link` are optional) |
| Education details (e.g. years) | `src/data/education.ts` |
| Page title / SEO description | `index.html` |
| Colours | CSS variables at the top of `src/styles/index.css` |

Icons: browse https://lucide.dev/icons and https://react-icons.github.io/react-icons (Simple Icons, `Si…`, for tech logos).

## Contact form

There's no backend by default. The form validates input and opens the visitor's email app with the message pre-filled (`mailto:`). To have messages delivered straight to your inbox:

1. Create a free form at https://formspree.io (or a similar service) and copy its endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
2. Set `contactFormEndpoint` in `src/data/personal.ts` to that URL.
3. Redeploy. The form will then POST JSON to the endpoint and show sending / success / error states.

## Deploy

The site is deployed to Cloudflare as static assets (Cloudflare Pages, now part of Workers):

```bash
npx wrangler login     # once per machine
npm run deploy         # builds, then uploads dist/
```

Other hosts also work since `dist/` is a plain static site: Vercel or Netlify (build command `npm run build`, output directory `dist`), or GitHub Pages.

To use a custom domain, open the Worker in the Cloudflare dashboard → *Settings → Domains & Routes*, then update the URLs in `index.html` and `siteUrl` in `personal.ts`.

## Features

- Light/dark theme toggle that remembers the choice (falls back to the system setting)
- Light and dark sections alternate, and both adapt to the theme
- Sticky navbar with animated active-section indicator and mobile menu
- Scroll reveals, animated hero code editor, rotating role text, count-up stats
- Project filter by category and an accessible modal (Escape / click-outside to close, focus trap, focus restore)
- Respects `prefers-reduced-motion`, has a skip link, semantic landmarks and visible focus styles
- SEO and Open Graph meta, favicon, cache headers for hashed assets
