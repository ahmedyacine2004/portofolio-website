# Architecture Overview

The portfolio application is structured as a monorepo with clear separation between the client and server layers.

## High-level structure

- `apps/client` contains the Next.js frontend application.
- `apps/server` contains the NestJS backend application.
- `packages` is reserved for reusable shared packages such as UI primitives, utilities, and types.

## Client architecture

The frontend uses:

- Next.js App Router
- React and TypeScript
- Tailwind CSS for styling
- React Query for async state
- Zustand for lightweight UI state
- Three.js and React Three Fiber for interactive 3D experiences

The app is organized around feature-oriented folders inside the client source tree, including `app`, `components`, `hooks`, `lib`, `providers`, `schemas`, `services`, and `stores`.

## Server architecture

The backend uses:

- NestJS modules and dependency injection
- Config-driven environment loading
- Validation pipes and exception filters
- MongoDB via Mongoose
- Swagger for API documentation

The server is intentionally modular so business logic, database access, and request validation remain separated.

## Design principles

- Keep the frontend and backend loosely coupled.
- Prefer modular, feature-oriented organization.
- Use strict TypeScript and validation at API boundaries.
- Make UI and API behavior predictable and accessible.

## Expected evolution

As the portfolio grows, the architecture should continue to support additional content sections, richer interactive experiences, and more robust API integrations without sacrificing maintainability.
