# JobSphere

<p align="center">
  <img src="public/logo.png" alt="JobSphere Logo" width="128" height="128" style="border-radius: 16px;" />
</p>

<p align="center">
  <strong>Modern AI-Powered Job Board built with React, TypeScript, Vite, Tailwind CSS and modern frontend architecture.</strong>
</p>

---

## Live Links

🌐 **Live Demo:** [https://jobsphere-phi.vercel.app](https://jobsphere-phi.vercel.app)

📂 **GitHub Repository:** [https://github.com/druvath-09/jobsphere](https://github.com/druvath-09/jobsphere)

---

## Project Overview

JobSphere is a premium, developer-focused recruitment portal designed to connect software engineers with top-tier technology organizations. It resolves the common frustrations associated with traditional job sites—such as recruiter ghosting, convoluted forms, and lack of compensation transparency—by offering a highly responsive, clean, and transparent candidate and employer dashboard system.

---

## Features

* **Job Listings**: Categorized and paginated directory of open technical positions.
* **Company Listings**: Explore hiring companies complete with open jobs, team sizing, and industry categories.
* **Search**: Instant multi-keyword search across jobs, descriptions, and companies.
* **Filtering**: Seamless filters covering job types (Full-time, Part-time, Contract, Remote), industries, and salary ranges.
* **Responsive UI**: Sleek, desktop-first responsive interface that scales to mobile and tablet screens.
* **Authentication**: Complete mock sign-in, registration, and recovery flows.
* **Dashboard**: User-facing overview of application status, recommended roles, and profile completion rates.
* **Notifications**: Integrated interface to review read/unread candidate notifications.
* **Employer Portal**: Specialized informational overview explaining hiring incentives.
* **Modern UI**: Built with rich design tokens, smooth interactive animations, and a cohesive professional color system.
* **Local Persistence**: State remains persistent across sessions using LocalStorage-backed mocks.

---

## Tech Stack

| Technology | Badge / Usage |
| :--- | :--- |
| **React** | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) |
| **TypeScript** | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) |
| **Vite** | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD627) |
| **Tailwind CSS** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) |
| **React Router** | ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) |
| **GitHub Actions** | ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white) |
| **Vercel** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) |

---

## Project Structure

This project is built using the **Feature-Sliced Design (FSD)** architectural standard, splitting files into logical, domain-driven layers:

```
src/
├── app/          # Initialization of routing, styles, and global providers
├── pages/        # Composition of page layouts and structures
├── widgets/      # Autonomous dashboard sections, lists, and content blocks
├── features/     # User-driven business actions (e.g. auth, search, profile editing)
├── entities/     # Domain data objects and baseline cards (Job, Company, User)
└── shared/       # Reusable helper hooks, utility styles, and primitive UI components
```

---

## Installation

Get a local copy up and running by following these steps:

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

---

## CI/CD

JobSphere utilizes a fully automated continuous integration and delivery system:
* **GitHub Actions**: Every pull request and push to the `main` branch triggers the Actions CI pipeline, automatically installing dependencies and verifying production builds.
* **Vercel Deployment**: Successful builds are automatically detected by Vercel's Git Integration, trigger-deploying changes straight to production.

---

## Screenshots

### Home Page
*(Placeholder for Home Page screenshot)*

### Jobs
*(Placeholder for Jobs directory screenshot)*

### Companies
*(Placeholder for Companies directory screenshot)*

---

## Documentation

A comprehensive technical manual describing database simulation, routing, layers, and project structures is available in:
📄 **[DOCUMENTATION.md](DOCUMENTATION.md)**

---

## Future Improvements

* **Active Database Integration**: Swapping local mock repositories for live PostgreSQL or Firebase Cloud adapters.
* **File Upload Services**: Integrating Amazon S3 or Cloudinary storage systems to accept actual CV files.
* **Real-time Recruiter Interactivity**: Instant status messaging and dynamic dashboard tracking.

---

## Author

**Ganta Druvath Kumar**
* GitHub: [druvath-09](https://github.com/druvath-09)

---
