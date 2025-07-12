# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (opens on http://localhost:3000)
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## Architecture Overview

This is a Next.js 15 application using the App Router architecture with TypeScript. The project structure follows Next.js conventions:

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict configuration
- **Styling**: Tailwind CSS v4 with DaisyUI components
- **Fonts**: Geist Sans and Geist Mono (optimized with next/font)
- **Build Tool**: Turbopack for development (faster builds)
- **Linting**: ESLint with Next.js and TypeScript rules

### Project Structure
- `app/` - Next.js App Router directory containing pages and layouts
- `app/layout.tsx` - Root layout with font configuration and global structure
- `app/page.tsx` - Homepage component
- `app/globals.css` - Global styles with Tailwind CSS and theme variables
- `public/` - Static assets (SVG icons, images)

### Styling Architecture
- Uses Tailwind CSS v4 with inline theme configuration
- CSS custom properties for theming (light/dark mode support)
- DaisyUI plugin for pre-built components
- Theme variables defined in globals.css with automatic dark mode detection

### Key Configuration Files
- `next.config.ts` - Next.js configuration (currently minimal)
- `tsconfig.json` - TypeScript config with strict settings and path aliases (`@/*`)
- `eslint.config.mjs` - ESLint configuration extending Next.js rules
- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS v4

### Development Notes
- The project uses Next.js App Router (not Pages Router)
- Path aliases configured: `@/*` maps to the root directory
- Turbopack is enabled for faster development builds
- CSS uses the new Tailwind CSS v4 syntax with `@import "tailwindcss"`