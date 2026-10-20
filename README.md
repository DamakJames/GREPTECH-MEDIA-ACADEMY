# Greptech Media Academy

![Brand Colors](https://img.shields.io/badge/Brand%20Black-%23111820-black)
![Brand Orange](https://img.shields.io/badge/Brand%20Orange-%23F56B0A-orange)
![Brand Light](https://img.shields.io/badge/Brand%20Light-%23F3F5F6-lightgrey)
![React](https://img.shields.io/badge/Frontend-React%20%7C%20TypeScript%20%7C%20Vite-blue)
![Tailwind CSS](https://img.shields.io/badge/Styles-Tailwind%20CSS-38B2AC)
![Firebase](https://img.shields.io/badge/Backend-Firebase-FFCA28)

> **Building Industry-Ready Media Experts**  
> Practical media education for the next generation of photographers, filmmakers, graphic designers, content creators, sound engineers, and media professionals.

---

## 📌 Table of Contents
1. [Overview](#-overview)
2. [Brand Identity & Aesthetic](#-brand-identity--aesthetic)
3. [Official Contact Information](#-official-contact-information)
4. [Technology Stack](#-technology-stack)
5. [9-Stage Development Blueprint](#-9-stage-development-blueprint)
6. [Repository & Documentation Structure](#-repository--documentation-structure)
7. [Getting Started & Local Development](#-getting-started--local-development)
8. [Engineering Rules & Guidelines](#-engineering-rules--guidelines)

---

## 🎯 Overview

**Greptech Media Academy** is a practical media education institution founded to train aspiring and developing creative talents into industry-ready professionals.

Rather than a generic academic website or static template, this platform combines:
- **A cinematic public web experience** showcasing programs, mentors, facilities, creative student projects, and media publications.
- **An online admissions system** featuring multi-step applications, asset uploads, and application status tracking.
- **A secure student learning portal (LMS)** with course modules, video lessons, assignments, quizzes, gradebooks, and attendance records.
- **Role-based admin & instructor portals** providing cohort management, grading, admissions review, and comprehensive reporting.
- **Public digital certificate verification** backed by unique identifiers and QR-code validation.

---

## 🎨 Brand Identity & Aesthetic

The academy's visual identity reflects that of an elite creative studio, film school, and contemporary editorial publication. It avoids generic school templates, cluttered widgets, excessive gradients, or frivolous animations.

### Color System
| Role | Hex | Visual Preview | Application |
| :--- | :--- | :--- | :--- |
| **Charcoal Black** | `#111820` | <img src="https://via.placeholder.com/20/111820/111820.png" width="16" height="16" /> | Hero backgrounds, dark sections, high-contrast framing, primary text on light backgrounds |
| **Signal Orange** | `#F56B0A` | <img src="https://via.placeholder.com/20/F56B0A/F56B0A.png" width="16" height="16" /> | Brand accents, primary call-to-action buttons, active badges, highlights |
| **Pure White** | `#FFFFFF` | <img src="https://via.placeholder.com/20/FFFFFF/FFFFFF.png" width="16" height="16" /> | Clean card surfaces, readable content sections, light UI backgrounds |
| **Soft Grey** | `#F3F5F6` | <img src="https://via.placeholder.com/20/F3F5F6/F3F5F6.png" width="16" height="16" /> | Secondary backgrounds, subtle borders, neutral card fills |

### Logo Integrity Rule
The official Greptech Media Academy logo supplied in the brand assets must be preserved in its original aspect ratio and styling. Never recreate it with text fonts or substitute it with generic placeholders in production.

---

## 📞 Official Contact Information

- **Academy**: Greptech Media Academy
- **Phone / WhatsApp**: [+234 807 756 6926](https://wa.me/2348077566926)
- **Email**: [Greptechmediaacademy@gmail.com](mailto:Greptechmediaacademy@gmail.com)

> ⚠️ *Notice*: All contact channels link directly to official verified touchpoints. No fictitious office addresses, tuition amounts, or accreditation bodies are invented.

---

## 💻 Technology Stack

### Frontend Architecture
- **Framework**: [React 18+](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite](https://vitejs.dev/) for rapid HMR and optimized builds
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design tokens for `#111820`, `#F56B0A`, and `#F3F5F6`
- **Component Primitives**: [shadcn/ui](https://ui.shadcn.com/) / Radix UI primitives
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) for subtle, editorial transitions
- **Routing**: [React Router v6](https://reactrouter.com/)

### Backend & Cloud Infrastructure (Stages 2–9)
- **Authentication**: Firebase Authentication (Email/Password, Google OAuth, custom claims)
- **Database**: Cloud Firestore (Structured collections, strict indexing, least-privilege security rules)
- **Object Storage**: Firebase Storage (Secure document & portfolio media storage)
- **Serverless Compute**: Firebase Cloud Functions (Node.js/TypeScript backend actions)
- **Security & Integrity**: Firebase App Check, Firestore Security Rules, Storage Rules
- **Emulation & Testing**: Firebase Local Emulator Suite

---

## 🗺️ 9-Stage Development Blueprint

Development is strictly phased. Each stage must be implemented, tested, and reviewed prior to advancing:

| Stage | Name | Core Deliverables | Status |
| :---: | :--- | :--- | :---: |
| **01** | **Frontend & UI/UX Design System** | Public website, all 15 routes, responsive layouts, components, admissions form UI | 🟡 *In Setup* |
| **02** | **Firebase Setup & Foundation** | Project initialization, Firebase SDK, emulators, environment config, security rules baseline | ⚪ *Queued* |
| **03** | **Admissions System** | Application submissions, asset uploads, application reference generation, admissions review workflow | ⚪ *Queued* |
| **04** | **Authentication & Roles** | Secure RBAC (Student, Instructor, Admin), protected routes, custom claims | ⚪ *Queued* |
| **05** | **Payments & Enrolment** | Admission offers, payment verification, student onboarding, cohort assignment | ⚪ *Queued* |
| **06** | **Student Learning Portal (LMS)** | Student dashboard, course lessons, video player, assignments, quizzes, attendance, grades | ⚪ *Queued* |
| **07** | **Admin & Instructor Dashboards** | Course management, cohort scheduling, student grading, revenue reports, analytics | ⚪ *Queued* |
| **08** | **Certificates & Verification** | Digital certificate generator, cryptographic IDs, QR-code validation route | ⚪ *Queued* |
| **09** | **Testing, Audit & Deployment** | End-to-end integration tests, security audit, Firebase Hosting production deployment | ⚪ *Queued* |

For full granular details on each milestone, refer to [ROADMAP.md](./ROADMAP.md).

---

## 📂 Repository & Documentation Structure

```text
GREPTECH-MEDIA-ACADEMY/
├── .gitignore
├── README.md                          # Master overview & quickstart
├── ROADMAP.md                         # Detailed 9-stage engineering roadmap
├── docs/
│   ├── DEVELOPMENT_BLUEPRINT.md       # Master architecture & engineering specs
│   ├── BRAND_AND_DESIGN_SYSTEM.md     # Color palette, typography, UI guidelines
│   ├── PUBLIC_WEBSITE_SPECS.md        # Public routes, 13 homepage sections, course data
│   ├── FIREBASE_ARCHITECTURE.md       # Firestore schemas, auth, storage, security rules
│   └── ASSET_GUIDELINES.md            # Asset drop zones (logo, UI mocks, photos)
├── public/                            # Static assets
│   ├── assets/
│   │   ├── logo/                      # Place official logo here
│   │   ├── courses/                   # Course photography
│   │   └── facilities/                # Studio and equipment visuals
└── src/                               # Application source code (Stage 1 implementation)
    ├── components/                    # Reusable UI components
    │   ├── layout/                    # Header, Footer, MobileNav, Containers
    │   ├── ui/                        # Buttons, Badges, Cards, Inputs, Modals
    │   └── common/                    # SectionHeading, Accordions, Testimonials
    ├── pages/                         # Route view components
    ├── data/                          # Development mock datasets & types
    ├── types/                         # TypeScript interfaces and domain schemas
    ├── styles/                        # Tailwind config and global CSS
    └── App.tsx                        # Root application and route configuration
```

---

## 🚀 Getting Started & Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or 20 LTS recommended)
- `npm` or `pnpm`

### Installation
```bash
# Clone the repository (if not already cloned)
git clone https://github.com/DamakJames/GREPTECH-MEDIA-ACADEMY.git

# Navigate into the project directory
cd GREPTECH-MEDIA-ACADEMY

# Install dependencies (once initialized)
npm install

# Start the local development server
npm run dev
```

### Production Build
```bash
# Build the TypeScript production bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## 🛡️ Engineering Rules & Guidelines

1. **Staged Execution**: Never skip stages or build ahead of the authorized phase.
2. **Design Integrity**: Adhere strictly to the black (`#111820`), orange (`#F56B0A`), and white/light grey (`#FFFFFF`/`#F3F5F6`) palette.
3. **No Fabricated Information**: When official numbers, dates, or addresses are unavailable, use clean "Details to be announced" development placeholders.
4. **Backend Security First**: No sensitive client-side assumptions; all roles, payments, grades, and certificate issuance must be validated server-side in later stages.

---

© 2026 Greptech Media Academy. All rights reserved.

