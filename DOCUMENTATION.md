# JobSphere Documentation

Welcome to the comprehensive technical documentation for **JobSphere**, a modern recruitment platform built to connect software engineers with top-tier technology companies.

---

## 1. Project Overview

### Purpose
JobSphere is a premium, production-ready career portal designed for software developers and technology recruiters. It simplifies the job application process by offering clean layouts, salary transparency, and structured profiles.

### Problem Solved
Traditional job portals are often cluttered, slow, and lack transparency regarding salaries and recruiter response times. JobSphere solves this by offering:
* A clean, modern SaaS-like interface.
* Instant one-click applications using stored profiles.
* Transparent salary ranges, locations, and company statistics.
* Real-time local notifications and tracking of application status.

---

## Project Links

**GitHub Repository**
https://github.com/druvath-09/jobsphere

**Live Demo**
https://jobsphere-phi.vercel.app

---

## 2. Features

Every feature listed below is fully implemented using mock data and local storage to simulate a live backend:

* **Homepage**: Features a premium hero section with job search, popular job categories, featured employer logos, user testimonials, and a trust section highlighting key value propositions.
* **Job Listings**: A comprehensive, paginated list of jobs supporting text searches, category filters, job-type toggles (Full-time, Part-time, Contract, Remote), and sorting (Recent, High Salary).
* **Company Listings**: A directory of hiring organizations complete with industry filters, company sizes, and detail views showcasing open positions.
* **Search & Filters**: Multi-parameter search capabilities linking jobs with industries, salary ranges, and job styles.
* **Navigation**: A responsive navbar containing links to job directories, companies, developer dashboards, employer pages, and user notifications.
* **Responsive Design**: Clean desktop-first layouts built with Tailwind CSS that scale elegantly to tablet and mobile screens.
* **Authentication**: Simulated login, registration, and password recovery workflows powered by LocalStorage state synchronization. Includes a demo candidate account (`demo@jobsphere.dev` / `password123`) for evaluation.
* **Notifications**: Provides a notification interface for displaying user notifications.
* **Employer Portal**: Informational landing page for recruiters to understand JobSphere's value propositions.

---

## 3. Technology Stack

* **React**: Component-based UI rendering library (v19).
* **TypeScript**: Static typing for robust code architecture and developer safety.
* **Vite**: Rapid-speed front-end development server and production bundler.
* **Tailwind CSS (v4)**: Modern CSS utility framework for fast, consistent styling.
* **React Router DOM**: Client-side routing management.
* **Zod & React Hook Form**: Schema validation and form management.
* **Local Storage / Mock APIs**: Local state persistence representing the database layer. No active Firebase/external databases are integrated yet.

---

## 4. Project Architecture

The application is structured using **Feature-Sliced Design (FSD)** principles, dividing the codebase into logical layers:

```
src/
├── app/          # Application initialization, routing, and global providers
├── pages/        # Composition of page-level layouts and widgets
├── widgets/      # Autonomous, reusable components composing multiple features/entities
├── features/     # User actions and business logic (e.g., auth, search, profile editing)
├── entities/     # Domain models, entities (e.g., user, job, company), and simple UI cards
└── shared/       # Reusable components (UI primitives), helpers, hooks, and constants
```

### Folder Responsibilities:
* `src/`: Root containing entry files (`main.tsx`) and FSD directories.
* `shared/`: Generic utilities, base styling, design tokens, hooks (e.g., local storage), API mocks, and shared components (Buttons, Cards, Inputs).
* `widgets/`: Independent page sections combining features and business entities (e.g., `dashboard-recommended-jobs`, `jobs-listing`).
* `providers/`: App-level context providers (e.g., `auth-provider.tsx`) located within `src/app/providers`.
* `services/` / `lib/`: Shared helper functions, search algorithms, and client utility setups within `src/shared/lib/` or `src/shared/services/`.
* `types/`: Domain-agnostic TS interfaces within `src/shared/types/`.

---

## 5. Component Architecture

JobSphere maintains a unidirectional component communication structure:
1. **Pages** act as route entry-points that render template layouts.
2. **Widgets** fetch/simulate retrieval of model data (Jobs, Companies) and coordinate actions.
3. **Features** (like the search bar or profile forms) handle specific user interactions.
4. **Entities** (like JobCard or CompanyCard) present structured data.
5. **Shared Components** (Buttons, Badges) render raw styled elements.

*Interactive Diagram Placeholder: Component Hierarchy*
`Page` ➔ `Widgets` ➔ `Features / Entities` ➔ `Shared UI Primitives`

---

## 6. Data Flow

Since the project operates on local mock data:
1. **Initial Load**: Mocks are generated and stored in a LocalStorage keys (`jobsphere_mock_db`, `jobsphere.auth.user`, etc.).
2. **State Contexts**: React Context Providers (`AuthContext`) read from storage and supply global states (current user, active session).
3. **User Action**: Triggering a feature (e.g., applying to a job) writes updates directly to LocalStorage.
4. **Reactive Rendering**: State is updated in-memory, prompting components to re-render.

---

## 7. Routing

The application routes are declared in `src/app/router.tsx` and map to `src/shared/constants/routes.ts`:

* **Public Routes**:
  * `/` — Homepage
  * `/jobs` — Job listings and search
  * `/jobs/:jobId` — Detailed job description, requirements, and apply action
  * `/companies` — Employer directory
  * `/companies/:companyId` — Company detailed overview
  * `/employers` — Recruiter landing page
  * `/login` & `/register` — Authentication pages
* **Protected Routes (Require Authentication)**:
  * `/dashboard` — User profile metrics, applications, and recommended roles
  * `/profile` — Edit personal details, experience, skills, and CVs
  * `/saved-jobs` — List of bookmarked positions
  * `/applications` — Job application status tracker
  * `/notifications` — Activity feed

---

## 8. Build & Development

Follow these steps to set up the development environment and compile for production:

### Install Dependencies
```bash
npm install
```

### Start Development Server (Vite)
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

---

## 9. GitHub Actions CI Pipeline

A continuous integration (CI) workflow is configured at `.github/workflows/ci.yml`:

* **Trigger Conditions**: Triggers on any `push` or `pull_request` targeting the `main` branch.
* **Environment**: Runs on `ubuntu-latest` with **Node.js 22**.
* **Dependency Installation**: Runs `npm ci` utilizing npm cache actions for fast build turnarounds.
* **Build Verification**: Compiles the TypeScript compiler (`tsc`) and bundles Vite client files via `npm run build`.
* **Conditional Testing**: Safely detects if tests are configured in `package.json` and skips test suites if they are not defined, preventing pipeline failures.

---

## 10. Deployment

The application is deployed continuously through **Vercel**'s native Git Integration:
1. **Trigger**: Any changes merged into the `main` branch on GitHub trigger Vercel.
2. **Build**: Vercel clones the repository and runs `npm run build`.
3. **Distribution**: Bundled outputs inside the `dist/` directory are hosted globally on Vercel's edge network.

---

## CI/CD Workflow

The project follows an automated CI/CD workflow:

```text
Developer
    ↓
Push to GitHub (main)
    ↓
GitHub Actions
- Install dependencies
- Build application
- Validate project
    ↓
Successful Build
    ↓
Vercel automatically detects the new commit
    ↓
Production Deployment
    ↓
Live Website Updated
```

* Every push to the `main` branch automatically triggers the GitHub Actions workflow.
* The workflow installs dependencies and validates the project by running the production build.
* After the workflow succeeds, Vercel automatically deploys the latest commit from GitHub.
* This provides an automated CI/CD pipeline from GitHub to production.

---

## 11. Environment Variables

*No external environment variables are currently required.* All API models and integrations are simulated client-side.

---

## 12. Performance Optimizations

1. **Vite Bundler**: Hot module reloading and code splitting compile only modified modules.
2. **Tailwind CSS v4 Engine**: Pre-compiles utility class mappings into a optimized single CSS file.
3. **Asset Optimization**: High-resolution branding assets (like `public/logo.png`) are cropped and saved as transparent web-ready PNGs to ensure fast loading times.

---

## 13. Future Improvements

* **Database Integration**: Connect backend database adapters (such as Supabase or Firebase Firestore) to replace LocalStorage mocks.
* **Real CV Uploads**: Integrate cloud storage (AWS S3 or Cloudinary) for candidate resume uploads.
* **Real-time Notifications**: Support WebSockets or push notifications for instant application updates.
* **Employer Dashboard**: Build out full CRUD capability for employers to publish, edit, and delete job postings.

---

## 14. Conclusion

JobSphere is built following high engineering standards, separating application layers with Feature-Sliced Design to provide a solid foundation for future backend integrations.
