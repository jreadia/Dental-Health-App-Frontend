# Dental Health App Frontend

Frontend for the Dental Web Application, built with React, Vite, and Tailwind CSS v4 to provide a seamless user and admin experience.

## Frameworks, APIs, libraries, and dependencies

- **React 18** - UI library for building dynamic interfaces.
- **Vite** - Extremely fast frontend tooling and development server.
- **React Router v7** - Robust client-side routing and protected routes.
- **Tailwind CSS v4** - Utility-first CSS framework used exclusively for styling.
- **Radix UI** - Accessible, unstyled UI primitives.
- **Lucide React** - Standardized icon library.
- **React Hook Form** - Performant and flexible form state management.
- **Framer Motion** - Production-ready animation library.
- **Recharts** - Composable charting library built on React components.
- **Playwright** - Reliable end-to-end testing framework.
- **Vitest** - Blazing fast unit test framework powered by Vite.
- **TypeScript & ESLint** - Static type checking and code linting.

**Application Flow:**

1. Users authenticate via the live backend API (using HTTP-only cross-site cookies).
2. The application utilizes `<BrowserRouter>` and `<Routes>` to manage distinct URLs and page navigation.
3. Users can view their historical scans, which are intelligently cached in `sessionStorage` to drastically minimize Firebase Free Tier reads.
4. Users upload dental images, which are passed to the backend, processed by a YOLOv8 ML model, and rendered visually on the frontend.
5. Admins have a dedicated dashboard to manage user data and admin accounts.

## Project Structure

```text
Dental-Health-App-Frontend/
├── e2e/                           # Playwright end-to-end tests
├── src/                           # Application Source Code
│   ├── api/                       # Backend API endpoints & fetch client
│   ├── app/                       # Main application logic
│   │   ├── components/            # Reusable UI, Layouts, and SVGs
│   │   ├── pages/                 # Full-screen Views (Admin and User pages)
│   │   └── App.tsx                # Main React Router configuration
│   ├── styles/                    # Global Tailwind & CSS Configuration
│   ├── __tests__/                 # Unit and Component tests (Vitest)
│   └── main.tsx                   # React DOM root entry point
├── .github/                       # GitHub Actions CI/CD workflows
├── dist/                          # Compiled production build
└── [Configuration Files]          # vite, tailwind, playwright, package.json, etc.
```

## Setup Instructions

1. **Install dependencies**

```bash
npm install
```

2. **Run the development server**

```bash
npm run dev
```

Navigate to `http://localhost:5173/` to view the application in your browser.

3. **Testing**

**Unit & Component Tests (Vitest)**

```bash
npm run test
```

**End-to-End Tests (Playwright)**
Before running E2E tests for the first time, you must install the Playwright browsers:

```bash
npx playwright install
npm run test:e2e
```

> **Note on CI/CD:** Our GitHub Actions workflow (`ci.yml`) runs Playwright tests using the official Playwright Docker container for faster execution. If you ever update the `@playwright/test` version in `package.json`, you **must** also update the Docker image tag in `.github/workflows/ci.yml` to match!

4. **Build for production**

```bash
npm run build
```

## View Routing

Routing is managed by `react-router-dom` using standard URL paths. Protected Routes check `localStorage` for authentication status and prevent unauthorized access.

**User Views**

- `/login` - User authentication screen.
- `/signup` - User registration screen.
- `/homepage` - Main landing area for logged-in users (Protected).
- `/upload` - Drag-and-drop interface for dental image analysis (Protected).
- `/results` - View for displaying the final annotated image and calculus detection findings (Protected).
- `/loading` - Transitional loading screen for processing states.
- `/success` - Confirmation screen.

**Admin Views**

- `/admin-login` - Specialized login for administrators.
- `/admin` - Core dashboard for administrators containing sub-views for managing accounts and viewing platform data (Protected).
- `/admin/users/:userId/scans` - Dedicated view to inspect historical scan records for a specific user (Protected).

## Security & Features

- **Cross-Origin Authentication:** Utilizes `credentials: 'include'` on the centralized `fetchClient` to accept and transmit highly secure, HTTP-only JWT cookies injected by the backend API.
- **Role-Based Access Control (RBAC):** Strictly separates User and Administrator privileges via custom `<ProtectedRoute>` wrappers that conditionally block unauthorized routing.
- **Quota Optimizations:** Drastically reduces Firebase database reads by caching the user's recent ML scans inside `sessionStorage`.
- **API Response Unwrapping:** The centralized fetch client automatically handles error parsing and unwraps the `data` payloads, keeping component logic incredibly clean.
- **Medical Terminology Mapping:** Replaced generalized terms with accurate, specific medical output mapping (e.g., "Calculus Detected") derived directly from the YOLOv8 model's classification arrays.
- **Automated E2E Testing:** Robust Playwright test suite featuring a global setup script that securely caches authenticated sessions to bypass repetitive login flows, avoiding API rate limits.
