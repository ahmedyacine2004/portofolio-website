# Design System Guide

The frontend uses a modern, Tailwind-first design system that emphasizes clarity, consistency, and visual polish.

## Principles

- Keep spacing consistent.
- Use a restrained color palette with strong contrast.
- Make interfaces responsive across mobile and desktop.
- Favor subtle motion and meaningful interaction states.

## Styling stack

- Tailwind CSS
- `cn` utility helpers for class merging
- shadcn-inspired UI primitives
- theme-aware styling with dark mode support

## Visual conventions

- Use rounded surfaces and soft borders for cards and panels.
- Keep typography hierarchy clear and readable.
- Prefer accessible contrast and thoughtful whitespace.
- Use motion sparingly to support interaction rather than distract from it.

## Theme support

The application should remain visually consistent across theme modes. When changing a component, ensure the styling still works in both light and dark contexts.
