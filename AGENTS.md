# JobSphere Development Guidelines

## Project Overview

JobSphere is a modern recruitment platform built using:

- React
- TypeScript
- Vite
- Tailwind CSS v4
- Feature-Sliced Design (FSD)

The goal is to build a production-quality application with clean architecture.

---

# General Rules

- Never modify unrelated files.
- Follow existing folder structure.
- Reuse existing components whenever possible.
- Do not duplicate code.
- Keep components under 250 lines when possible.
- Prefer composition over large components.

---

# Styling

Use

- Tailwind CSS v4
- Existing design tokens
- Existing UI components

Do NOT use

- inline styles
- CSS modules
- random colors
- hardcoded spacing

---

# Components

Always use existing components before creating new ones.

Current UI components include

- Button
- Input
- Badge
- Card
- Container
- MainLayout

If a component already exists, extend it instead of replacing it.

---

# Code Style

Use

- TypeScript
- Functional components
- Hooks
- Named exports

Avoid

- any
- duplicated interfaces
- deeply nested JSX

---

# Folder Structure

Follow Feature-Sliced Design.

Example

src/

app/

pages/

widgets/

features/

entities/

shared/

Never create random folders.

---

# Performance

Prefer

- memoized components where useful
- lazy loading for pages
- reusable utilities

---

# Accessibility

Every form element should have

- labels
- keyboard navigation
- aria attributes when necessary

---

# Before finishing

Always run

npm run build

Do not stop until build passes successfully.

---

# Git

Never execute Git commands.

The user manages commits manually.