<!-- BEGIN:nextjs-agent-rules -->

# AGENTS.md

> AI Development Guidelines for this repository.
>
> These instructions apply to every AI coding agent working on this project
> (ChatGPT, Codex, Claude, Gemini, Cursor, Windsurf, Cline, etc.).

---

# Project Overview

This repository contains a modern full-stack portfolio application.

## Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

### Backend

- NestJS
- TypeScript
- MongoDB
- Mongoose

### Tooling

- pnpm Workspace
- ESLint
- Prettier
- Husky
- lint-staged

---

# Project Goals

The project should prioritize:

- Maintainability
- Scalability
- Performance
- Accessibility
- SEO
- Security
- Clean Architecture
- Excellent Developer Experience

---

# General Rules

## TypeScript

Always use strict TypeScript.

Never use:

- `any`
- `@ts-ignore`
- unnecessary type assertions

Prefer:

- interfaces
- utility types
- generics
- discriminated unions

---

## Code Quality

Write code that is:

- readable
- reusable
- modular
- self-documenting

Avoid code duplication.

Prefer composition over inheritance.

Keep functions focused on a single responsibility.

---

## Naming Conventions

### Components

```
ProjectCard.tsx
Navbar.tsx
ContactForm.tsx
```

### Hooks

```
useProjects.ts
useTheme.ts
```

### Utilities

```
formatDate.ts
slugify.ts
```

### Types

```
project.types.ts
api.types.ts
```

### Constants

```
routes.ts
colors.ts
```

---

# Folder Organization

Never create random folders.

Place files in their proper locations.

Example:

```
components/
features/
hooks/
lib/
services/
types/
utils/
```

Each feature should own its:

- components
- hooks
- services
- types
- constants
- utils

---

# React Guidelines

Prefer:

- Functional Components
- Hooks
- Composition

Avoid:

- Class Components

Keep components small.

If a component exceeds ~200 lines, consider splitting it into smaller pieces.

---

# Next.js Guidelines

Use:

- App Router
- Server Components by default
- Client Components only when required
- Server Actions when appropriate
- Route Handlers for backend logic inside Next.js only if it belongs to the frontend application

Optimize:

- Images
- Fonts
- Metadata
- SEO

Avoid deprecated APIs.

---

# NestJS Guidelines

Organize code by feature modules.

Each module should contain:

```
controllers/
services/
dto/
schemas/
repositories/
interfaces/
```

Keep controllers thin.

Business logic belongs in services.

Database access belongs in repositories.

Validate every incoming request.

---

# MongoDB

Design schemas carefully.

Avoid deeply nested documents.

Use indexes when appropriate.

Use timestamps.

Validate input before saving.

---

# API Design

Use REST conventions.

Example:

```
GET    /projects
GET    /projects/:id

POST   /projects

PATCH  /projects/:id

DELETE /projects/:id
```

Always return consistent JSON responses.

Example:

```json
{
  "success": true,
  "data": {},
  "message": "Project created successfully"
}
```

---

# Error Handling

Never swallow errors.

Return meaningful error messages.

Log unexpected failures.

Use proper HTTP status codes.

---

# Validation

Validate:

- body
- params
- query
- headers (when required)

Never trust client input.

---

# Security

Never:

- expose secrets
- hardcode credentials
- trust client input

Always:

- sanitize input
- validate data
- use environment variables

---

# Performance

Prefer:

- lazy loading
- code splitting
- memoization only when beneficial
- efficient database queries

Avoid unnecessary re-renders.

---

# Accessibility

Every UI must:

- support keyboard navigation
- include ARIA attributes where appropriate
- use semantic HTML
- provide accessible labels

---

# Styling

Use:

- Tailwind CSS
- shadcn/ui

Maintain:

- consistent spacing
- responsive layouts
- design tokens
- dark mode compatibility (if implemented)

Avoid inline styles unless absolutely necessary.

---

# Imports

Prefer aliases.

Example:

```ts
import { Button } from "@/components/ui/button";
```

Avoid long relative imports.

---

# Comments

Do not comment obvious code.

Comment only:

- complex logic
- algorithms
- business rules

---

# Git

Write meaningful commit messages.

Examples:

```
feat: add projects API

fix: resolve navbar hydration issue

refactor: simplify contact form validation
```

---

# Testing

When adding features:

- test happy paths
- test edge cases
- test failure scenarios

---

# Documentation

Update documentation when:

- adding features
- changing APIs
- changing architecture

---

# Before Finishing Any Task

Verify:

- project builds
- lint passes
- types pass
- no unused imports
- no console.log statements
- no dead code
- formatting is correct

---

# AI Agent Behavior

When modifying code:

- Preserve the existing architecture.
- Reuse existing components, utilities, and hooks before creating new ones.
- Avoid introducing new dependencies unless they provide clear value.
- Follow the project's naming conventions and folder structure.
- Favor simplicity over unnecessary abstraction.
- If requirements are unclear, ask for clarification instead of making assumptions.
- When multiple valid approaches exist, choose the one that is most maintainable and consistent with the current codebase.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

