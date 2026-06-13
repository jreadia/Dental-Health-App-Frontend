# Dental Health App Frontend

Frontend for the Dental Web Application, built with React, Vite, and Tailwind CSS v4 to provide a seamless user and admin experience.

## Architecture

The application uses a modern React architecture built for fast performance and maintainability:

- **React 18** - UI library for building dynamic interfaces.
- **Vite** - Extremely fast frontend tooling and development server.
- **Tailwind CSS v4** - Utility-first CSS framework used exclusively for styling (replacing CSS-in-JS).
- **Lucide React** - Standardized icon library.

**Application Flow:**
1. Users can navigate between standard login, signup, and image upload views.
2. The application utilizes a client-side state router (`App.tsx`) to manage the current view.
3. Admins have a dedicated dashboard to manage user data and admin accounts.
4. UI consistency is maintained through a shared `components/ui/` directory utilizing class variance authority (`cva`) and `tailwind-merge` for flexible components.

## Project Structure

```text
src/
├── app/
│   ├── App.tsx                    # Main router and state manager
│   ├── adminAccounts.ts           # Admin accounts data & auth logic
│   │
│   ├── pages/                     # Full-screen Views
│   │   ├── user/                  # Standard User Pages
│   │   │   ├── Homepage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── SignupPage.tsx
│   │   │   ├── UploadPage.tsx
│   │   │   ├── ResultPage.tsx
│   │   │   ├── LoadingPage.tsx
│   │   │   └── SuccessPage.tsx
│   │   │
│   │   └── admin/                 # Admin Pages
│   │       ├── AdminPage.tsx      # Admin routing wrapper
│   │       └── components/        # Admin-specific page sections
│   │           ├── AdminHomepage.tsx
│   │           ├── DataDashboard.tsx
│   │           ├── AdminAccountsList.tsx
│   │           └── AddAdminModal.tsx
│   │
│   └── components/                # Reusable & Shared Components
│       ├── ui/                    # Base UI building blocks (Tailwind)
│       │   ├── Button.tsx
│       │   ├── Modal.tsx
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
│   ├── theme.css                  # CSS Variables
│   └── fonts.css                  # Typography imports
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

Routing is currently handled via lightweight internal state management inside `App.tsx` instead of a heavy library like React Router. 

**User Views**
- `login` - User authentication screen.
- `signup` - User registration screen.
- `homepage` - Main landing area for logged-in users.
- `upload` - Drag-and-drop interface for dental image analysis.
- `loading` - Intermediary state during image processing.
- `results` - View for displaying the final annotated image and findings.
- `success` - Confirmation screen.

**Admin Views**
- `admin-login` - Specialized login for administrators.
- `admin` - Core dashboard for administrators containing sub-views for managing accounts (`AdminHomepage`) and viewing platform data (`DataDashboard`).

## Security & Guardrails

- **Modular Components:** Shared UI elements (Buttons, Modals) are isolated to guarantee design consistency and prevent CSS-bleeding.
- **Client-Side Auth Mocks:** Currently utilizes `adminAccounts.ts` to simulate secure admin login flows locally before backend integration.
- **Tailwind Strictness:** Inline styles have been entirely stripped and replaced with strict Tailwind utility classes to ensure responsive design integrity.

## Current Implementation Status

**Completed**
- Transitioned entirely from inline CSS-in-JS to Tailwind CSS v4.
- Abstracted all complex vector graphics into dedicated React components (e.g., `ToothMascot.tsx`).
- Created a robust shared UI library (`components/ui`) supporting polymorphic variants.
- Reorganized project directory to strictly separate full-screen `pages` from reusable `components`.
- Replaced custom SVGs with standard `lucide-react` icons.
- Finalized layout adjustments and flexbox alignments for all admin and user pages.
