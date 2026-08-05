# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project structure

This is a **single-file static portfolio website** — all HTML, CSS, and JavaScript lives in `index.html`. There is no build step, bundler, or framework.

- `index.html` — the entire site (HTML structure, `<style>` block, `<script>` block)
- `visualcache/` — gallery images (GSEF, Einstein group, Detroit, lecture hall, TechGirls)
- `candy!.png` — candy image used in the footer easter egg
- `projectpics/` — project card images

## Deployment

The site is deployed on **Vercel** at the URL in README.md. It is also mirrored to **GitHub Pages** (`sophieclin.github.io`). Pushing to `main` deploys both. There is no preview environment — changes go live immediately on push.

## Key architectural patterns in index.html

**CSS** is in a single `<style>` block in `<head>`. Key sections (marked with comments):
- Layout sections: `#home`, `#projects`, `#experience`, `#gallery`, `#contact`
- Custom cursor: `* { cursor: none !important }` + `#custom-cursor` + `#cursor-trail` canvas
- Gallery hover: `.gitem::after` overlay + `.gitem-caption` text layer
- Terminal easter egg: `.terminal-body`, `.terminal-mode` toggle class on `.status-card`
- Mobile breakpoints: `@media (max-width: 768px)` and `@media (max-width: 480px)` at end of style block

**JavaScript** is in a single `<script>` block before `</body>`. Key sections:
- Scroll reveal: `IntersectionObserver` on `.reveal` elements
- Projects carousel: `initCards()` / `slideTo()` with dynamic card widths; shows 1 card on mobile (≤768px), 4 on desktop
- Experience accordion: click `.exp-card-top` toggles `.active` class
- Terminal easter egg: `CMDS` object, toggled by clicking `#term-toggle`
- Custom cursor IIFE: arrow SVG positioned via lerp loop + canvas laser trail (`TRAIL_MS` controls trail length)
- Candy follower IIFE: `#candy-trigger` click picks up candy, clicking candy itself drops it with bounce animation

## Analytics

Two analytics scripts in `<head>`:
- **GoatCounter** (`sphioel.goatcounter.com`) — works on GitHub Pages
- **Vercel Analytics** (`/_vercel/insights/script.js`) — only active on Vercel deployment
