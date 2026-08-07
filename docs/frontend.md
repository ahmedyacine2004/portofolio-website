# Frontend Guide

The frontend is a Next.js application focused on delivering a highly polished portfolio experience.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- React Query
- Zustand
- Framer Motion / Motion
- Three.js and React Three Fiber

## Application structure

Key folders include:

- `src/app` — route-level pages and layout
- `src/components` — reusable UI and feature-specific components
- `src/hooks` — custom hooks for behavior and data access
- `src/lib` — shared configuration and helper utilities
- `src/providers` — app-wide providers such as theme and query state
- `src/schemas` — validation schemas for forms and API payloads
- `src/services` — API service wrappers
- `src/stores` — local UI state and client-side interactions

## Routing

The app uses the Next.js App Router. Page routes are defined in the `app` directory, with layout and page components kept close to the route they belong to.

## UI conventions

- Prefer server components by default and use client components only when required.
- Keep components small and focused.
- Reuse shared UI primitives before introducing one-off implementations.
- Maintain dark/light theme compatibility and accessible interaction states.

## 3D experience notes

The current frontend includes an interactive keyboard scene built with React Three Fiber. This experience should remain performant and lightweight, especially on mobile devices.

## Performance guidance

- Avoid unnecessary re-renders.
- Keep bundle sizes in check by importing components lazily when appropriate.
- Optimize images and other media assets.
- Ensure navigation remains fast and responsive.
