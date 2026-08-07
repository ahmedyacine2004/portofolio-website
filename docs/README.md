# Documentation Hub

This directory contains the technical documentation for the portfolio application. The project is organized as a monorepo with a Next.js frontend, a NestJS backend, and a shared package layer for reusable UI, utilities, and types.

## What this project includes

- A polished portfolio website for showcasing projects, services, experience, and certifications
- A modern frontend built with Next.js, React, TypeScript, and Tailwind CSS
- A backend API built with NestJS and MongoDB
- A component-driven UI system with shadcn-inspired primitives and motion-enhanced interactions

## Documentation map

- [Setup](./setup.md) — environment setup, installation, and local development
- [Architecture](./architecture.md) — system structure and design decisions
- [Frontend](./frontend.md) — client-side architecture and conventions
- [Backend](./backend.md) — server-side architecture and modules
- [API](./api.md) — endpoints, conventions, and payload patterns
- [Components](./components.md) — reusable UI component guidance
- [Forms](./forms.md) — form architecture and validation patterns
- [State Management](./state-management.md) — React Query and Zustand usage
- [Design System](./design-system.md) — visual language and styling conventions
- [Environment](./environment.md) — required environment variables
- [Deployment](./deployment.md) — production deployment guidance
- [SEO](./seo.md) — metadata, accessibility, and discoverability

## Recommended workflow

1. Start with [Setup](./setup.md) to configure the workspace.
2. Review [Architecture](./architecture.md) to understand the monorepo structure.
3. Use the feature-specific documents when implementing or modifying modules.
4. Keep documentation updated whenever API contracts, layout patterns, or environment requirements change.

## Development commands

From the repository root:

- `npm run dev:client` — start the frontend
- `npm run dev:server` — start the backend
- `npm run build:client` — build the client app
- `npm run build:server` — build the server app
- `npm run lint:client` — lint the client app
- `npm run lint:server` — lint the server app

## Notes

The documentation should be treated as a living reference for contributors. As features evolve, keep the relevant guides aligned with the implementation.
