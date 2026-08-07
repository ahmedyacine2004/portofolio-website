# Components Guide

Components should remain reusable, readable, and aligned with the project’s design system.

## Component principles

- Keep components focused on a single responsibility.
- Prefer composition over inheritance.
- Reuse shared primitives before creating one-off components.
- Keep styling consistent with the Tailwind-based design system.

## Component organization

Place components in the most relevant folder based on scope:

- shared UI primitives in the general UI folder
- layout-specific components in the layout folder
- feature-specific components near the related feature module

## Naming conventions

Use descriptive, consistent names such as:

- `ProjectCard`
- `ContactForm`
- `Header`
- `Sidebar`

## Accessibility expectations

Every interactive component should support:

- keyboard navigation
- visible focus states
- semantic markup
- descriptive labels where appropriate

## When to create a new component

Create a new component when:

- a piece of UI is reused across multiple routes or sections
- the logic would otherwise clutter a page component
- the UI needs to be tested or maintained independently
