# React + Tailwind + Framer Motion Portfolio (GitHub Pages)

This guide shows how to set up a **React** portfolio using **Vite**, style it with **Tailwind CSS**, add tasteful animations via **Framer Motion**, include **lucide-react** icons, and deploy to **GitHub Pages**.

---

## 0) Prerequisites
- **Node.js LTS** installed (https://nodejs.org/)
- A GitHub account and a new repository ready

> If you plan to deploy to a **project site** (not `username.github.io`), note your repo name—e.g., `my-portfolio`. We'll need it for the Vite `base` config.

---

## 1) Create the project with Vite
```bash
# Create a React + Vite app
npm create vite@latest my-portfolio -- --template react

cd my-portfolio
npm install
```

Run dev server to confirm it works:
```bash
npm run dev
```

---

## 2) Add Tailwind CSS
Install Tailwind and its build tools:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update **`tailwind.config.js`** (replace content with the snippet below):
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Create/replace **`src/index.css`** with Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Optional: app-wide tweaks */
html, body, #root {
  height: 100%;
}
```

Import `index.css` in `src/main.jsx` if it isn't already:
```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## 3) Add Framer Motion + lucide-react
```bash
npm install framer-motion lucide-react
```

---

## 4) Add the Portfolio component
You have a ready-made React component file from ChatGPT: **`portfolio.jsx`**.

Option A – Replace `App.jsx` entirely:
1. Copy `portfolio.jsx` into `src/` and rename it to `App.jsx` (or keep `portfolio.jsx` and change the import below).
2. Ensure the default export is the component (already done).
3. Start the dev server.

```bash
npm run dev
```

Option B – Keep `App.jsx` and import the component:
```jsx
// src/App.jsx
import Portfolio from './portfolio.jsx'

export default function App() {
  return <Portfolio />
}
```

> If you see styling not applied, restart `npm run dev` after Tailwind setup.

---

## 5) Prepare Vite for GitHub Pages
If deploying to a **project repo** like `username/my-portfolio`, set a base path in `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Replace 'my-portfolio' with your repo name
  base: '/my-portfolio/',
})
```

If deploying to a **user/organization site** named `username.github.io`, you can omit the `base` option.

---

## 6) Deploy to GitHub Pages (GitHub Actions)
### A) Push your code
```bash
git init
git add -A
git commit -m "Init portfolio"
git branch -M main
git remote add origin https://github.com/<USERNAME>/<REPO>.git
git push -u origin main
```

### B) Add a GitHub Actions workflow
Create **`.github/workflows/deploy.yml`** in your project and paste the workflow below (a copy is also attached to this download):
```yaml
name: Deploy Vite site to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### C) Enable Pages
- In your GitHub repo: **Settings → Pages**  
- Set **Source** to **GitHub Actions**
- Push to `main` and the site will auto-deploy

> First build can take a minute or two. The workflow publishes `dist/` created by `npm run build`.

---

## 7) Local commands
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 8) Customization tips
- **Update contact info** in the avatar bubble inside `portfolio.jsx`
- Add your real **Projects** with screenshots, problem statements, roles, and links
- Consider a **dark mode** toggle (Tailwind’s `dark` variant + a small state hook)
- Keep images small and **optimize** for faster loads
- Test on **mobile**; the layout provided is responsive

---

## 9) Troubleshooting
- **Blank page on GitHub Pages:** base path missing/wrong. Set `base: '/REPO_NAME/'` in `vite.config.js`.
- **Styles not applied:** ensure Tailwind content paths are correct and `index.css` is imported.
- **Icons not rendering:** check `lucide-react` import and JSX usage.
- **404 on refresh:** enable SPA fallback in Pages settings (automatic) or use hash-based routing.

---

Happy shipping! 🚀
