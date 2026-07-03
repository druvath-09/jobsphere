# JobSphere Development Guidelines

## Project Overview

JobSphere is a modern recruitment platform built using:

- React
- TypeScript
- Vite
- Tailwind CSS v4
- Feature-Sliced Design (FSD)

The goal is to build a production-quality recruitment platform with clean architecture, reusable components, and maintainable code.

---

# Scope

Only implement the feature requested.

Do NOT modify:

- Homepage unless explicitly requested
- Authentication
- Existing completed modules
- Unrelated pages
- Global styling unless required
- Existing APIs unless requested

Stop after completing the requested feature and wait for review before continuing.

---

# General Rules

- Never modify unrelated files.
- Follow the existing folder structure.
- Reuse existing components whenever possible.
- Do not duplicate code.
- Keep components under 250 lines whenever practical.
- Prefer composition over large components.
- Keep code readable and maintainable.
- Make the smallest change necessary.

---

# Feature-Sliced Design

Follow the existing Feature-Sliced Design architecture.

Use each layer correctly.

## app

- application initialization
- providers
- routing
- global configuration

## pages

- compose widgets only
- page layout
- page routing

## widgets

- compose multiple features/entities
- page sections

## features

- business functionality
- user actions

## entities

- business models
- entity UI
- entity logic

## shared

- reusable UI
- utilities
- hooks
- helpers
- constants

Never create random folders outside the existing architecture.

---

# Routing

- Reuse the existing router.
- Do not replace routing architecture.
- Add only routes required for the current feature.
- Do not modify unrelated routes.

---

# Styling

Use:

- Tailwind CSS v4
- Existing design tokens
- Existing UI components
- Responsive utility classes

Do NOT use:

- Inline styles
- CSS Modules
- Random colors
- Hardcoded spacing
- Hardcoded font sizes
- Arbitrary styling unless necessary

Maintain consistent spacing and typography throughout the application.

---

# UI Requirements

Every page must be:

- Responsive
- Desktop-first
- Tablet compatible
- Mobile compatible

Maintain consistent:

- spacing
- typography
- border radius
- shadows
- colors

Reuse the existing design language.

Avoid layouts that feel like generic AI-generated templates.

---

# Design Principles

The application should resemble a modern SaaS product.

Prefer:

- clean layouts
- generous whitespace
- subtle shadows
- rounded corners
- restrained animations
- professional typography
- consistent spacing
- polished interactions

Avoid:

- glassmorphism
- excessive gradients
- neon colors
- oversized hero sections
- inconsistent spacing
- flashy animations
- template-like designs

---

# Components

Always reuse existing components before creating new ones.

Current shared components include:

- Button
- Input
- Badge
- Card
- Container
- MainLayout

If a component already exists:

- extend it
- compose it
- avoid replacing it

Keep components:

- focused
- reusable
- testable

---

# Code Style

Use:

- TypeScript
- Functional Components
- React Hooks
- Named Exports

Avoid:

- any
- duplicated interfaces
- deeply nested JSX
- unnecessary abstraction
- large files

Prefer:

- reusable utilities
- small helper functions
- readable code

---

# Data

Until backend integration is requested:

- Use mock data only.
- Keep mock data close to its feature or entity.
- Do not implement API integration.
- Do not create API clients.
- Do not install state management libraries unless requested.

Prepare the architecture so real APIs can replace mock data later with minimal changes.

---

# Performance

Prefer:

- React.memo where beneficial
- lazy-loaded pages
- reusable hooks
- reusable utilities
- optimized rendering

Avoid premature optimization.

---

# Accessibility

Every interactive element should support:

- keyboard navigation
- semantic HTML
- accessible labels
- ARIA attributes when necessary

All forms should include:

- labels
- validation feedback
- proper focus states

---

# Dependencies

Do not install new packages unless absolutely necessary.

Always prefer existing dependencies already present in package.json.

---

# Verification

Before stopping:

- Run `npm run build`
- Fix all TypeScript errors
- Fix build errors
- Fix import issues

Do not stop while the build is failing.

---

# Git

Never execute Git commands, including:

- git add
- git commit
- git push
- git pull
- git merge
- git rebase
- git checkout
- git reset

The user manages version control manually.

---

# When Unsure

When multiple solutions are possible:

Choose the one that:

- reuses existing code
- creates fewer files
- minimizes changes
- follows Feature-Sliced Design
- keeps the codebase consistent
- is easiest to maintain

Avoid unnecessary refactoring.

---

# Completion Rules

When the requested feature is complete:

1. Verify the implementation.
2. Run `npm run build`.
3. Ensure there are no build errors.
4. Stop after completing only the requested feature.
5. Wait for user review before continuing to the next feature.