# Dental Health App Frontend

Frontend for the Dental Web Application, built with React, Vite, and Tailwind CSS v4 to provide a seamless user and admin experience.

## Architecture

The application uses a modern React architecture built for fast performance and maintainability:

- **React 18** - UI library for building dynamic interfaces.
- **Vite** - Extremely fast frontend tooling and development server.
- **React Router v6** - Robust client-side routing and protected routes.
- **Tailwind CSS v4** - Utility-first CSS framework used exclusively for styling.
- **Lucide React** - Standardized icon library.

**Application Flow:**
1. Users authenticate via the Firebase backend (using HTTP-only cross-site cookies).
2. The application utilizes `<BrowserRouter>` and `<Routes>` to manage distinct URLs and page navigation.
3. Users can view their historical scans, which are intelligently cached in `sessionStorage` to drastically minimize Firebase Free Tier reads.
4. Users upload dental images, which are passed to the backend, processed by a YOLOv8 ML model, and rendered visually on the frontend.
5. Admins have a dedicated dashboard to manage user data and admin accounts.

## Project Structure

```text
src/
├── api/
│   ├── client.ts                  # Centralized fetch wrapper handling cookies and data unwrapping
│   ├── auth.ts                    # Backend authentication endpoints
│   └── dental.ts                  # Image upload and history retrieval endpoints
│
├── app/
│   ├── App.tsx                    # Main React Router configuration and ProtectedRoutes
│   │
│   ├── pages/                     # Full-screen Views
│   │   ├── user/                  # Standard User Pages
│   │   │   ├── Homepage.tsx       # Features `sessionStorage` caching
│   │   │   ├── LoginPage.tsx
│   │   │   ├── SignupPage.tsx
│   │   │   ├── UploadPage.tsx     # Handles ML inference request
│   │   │   ├── ResultPage.tsx     # Dynamically displays YOLOv8 bounding boxes
│   │   │   ├── LoadingPage.tsx
│   │   │   └── SuccessPage.tsx
│   │   │
│   │   └── admin/                 # Admin Pages
│   │       ├── AdminPage.tsx      # Admin routing wrapper
│   │       ├── AdminLoginScreen.tsx 
│   │       └── components/        # Admin-specific page sections
│   │           ├── AdminHomepage.tsx
│   │           ├── DataDashboard.tsx
│   │           └── AddAdminModal.tsx
│   │
│   └── components/                # Reusable & Shared Components
│       ├── ui/                    # Base UI building blocks (Tailwind)
│       │   ├── Button.tsx
│       │   ├── PageLayout.tsx
│       │   ├── StatusBadge.tsx
│       │   └── ImageDropzone.tsx
│       │
│       ├── pictures/              # SVGs and Illustration Components
│       │   └── ToothMascot.tsx
│       │
│       └── DisclaimerModal.tsx    # App-specific shared components
│
├── styles/                        # Global Styling Configuration
│   ├── index.css                  # Main CSS entry
│   ├── tailwind.css               # Tailwind v4 configuration imports
│   └── theme.css                  # CSS Variables
│
└── main.tsx                       # React DOM root entry point
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

3. **Build for production**
```bash
npm run build
```

## View Routing

Routing is managed by `react-router-dom` using standard URL paths. Protected Routes check `localStorage` for authentication status and prevent unauthorized access.

**User Views**
- `/login` - User authentication screen.
- `/signup` - User registration screen.
- `/homepage` - Main landing area for logged-in users.
- `/upload` - Drag-and-drop interface for dental image analysis.
- `/results` - View for displaying the final annotated image and calculus detection findings.
- `/success` - Confirmation screen.

**Admin Views**
- `/admin/login` - Specialized login for administrators.
- `/admin` - Core dashboard for administrators containing sub-views for managing accounts and viewing platform data.

## Security & Features

- **Cross-Origin Authentication:** Implements `credentials: 'include'` on the `fetchClient` to accept highly secure, HTTP-only cookies injected by the backend API.
- **Quota Optimizations:** Reduces Firebase database reads by intelligently syncing the user's `sessionStorage` with recent image uploads. 
- **Firestore Timestamps:** Implements custom parsing to seamlessly handle raw Firebase native `_seconds` timestamp objects returned by the backend.
- **Medical Terminology:** Replaced generalized terms (e.g. Plaques) with accurate, specific medical output mapping (Calculus Detected) derived directly from the YOLOv8 model's classification arrays.

## Current Implementation Status

**Completed**
- Transitioned entirely from inline CSS-in-JS to Tailwind CSS v4.
- Migrated from manual state-based routing to robust `react-router-dom` architecture.
- Abstracted all complex vector graphics into dedicated React components.
- Integrated frontend seamlessly with the live Node/Express/Firebase backend.
- Replaced mock client-side auth with real JWT/Cookie based API requests.

## Upcoming Features

- **Admin Authentication Overhaul:** Transitioning the admin login system from legacy pre-determined username/password pairs to a fully integrated Firebase Email/Password authentication flow to match the user architecture and improve security.
