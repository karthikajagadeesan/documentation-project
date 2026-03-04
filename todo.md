# Development Guide Documentation Page — Build Prompt

Build a fully functional **Next.js documentation-style web page** (using next.js + ShadcnTailwind CSS) based on the content and layout described below. Use only static content — no backend, no API calls.

---

 ## Authentication Flow

When the application loads at `http://localhost:3000`, the following auth flow applies:

- The root route `/` automatically redirects unauthenticated users to the **login page**.
- A user must **log in** before accessing any protected route.
- If a user **signs up**, they are not immediately logged in — they must **log in separately** after registration.
- After a **successful login**, the user is redirected to `/` (the main dashboard).

This flow is enforced via Next.js **Middleware** (`middleware.ts`) and Supabase Auth session checks.

```
http://localhost:3000
        ↓
  [Auth Check — Middleware]
        ↓
  Not logged in?          Logged in?
        ↓                      ↓
  /login page            / (Dashboard)
        ↓
  Sign up → /signup
        ↓
  Must log in manually
        ↓
  Login success → /
```

## 🧱 OVERALL LAYOUT STRUCTURE

```
┌─────────────────────────────────────────────────────────┐
│  NAVBAR (logo + title: "Development Guide")             │
├──────────────┬──────────────────────────┬───────────────┤
│              │                          │  On this page │
│   SIDEBAR    │    MAIN CONTENT          │  (anchor      │
│   (fixed)    │    (scrollable)          │   links)      │
│              │                          │               │
└──────────────┴──────────────────────────┴───────────────┘
```

- **Navbar**: Fixed top bar. Left side shows a triangle logo + "Development Guide" title.
- **Left Sidebar**: Fixed, scrollable. Contains navigation tree.
- **Main Content**: Center scrollable area. Renders section content.
- **Right Panel**: "On this page" anchor link list, updates per active section.

---

## 🗂️ SIDEBAR NAVIGATION STRUCTURE

```
Getting Started
Layout- Project Structure (folder tree visual)
Components - explain components
Technology
        ├── Next.js
        ├── Supabase
        ├── ShadCN
        ├── Zustand
        └── TanStack Query
Architecture Overview
Conclusion
```

- Sidebar items are **clickable links** — clicking scrolls the main content to the corresponding section using anchor navigation (`id`-based smooth scroll).
- Active item is **highlighted in blue**.
- Nested items are indented visually.
- Expandable parent items (Layout, Components, Technology) use an **Accordion/collapsible** pattern — click to expand/collapse children.

---

## 📄 MAIN CONTENT SECTIONS

Each section below maps to a sidebar item and has a unique `id` for anchor navigation.

---

### Section 1: `id="getting-started"` — Getting Started

**Breadcrumb:** Development Guide › Getting Started

**Content:**
- Title: "Getting Started"
- Last updated: (static date)
- Intro paragraph: This Development Guide covers the full technical stack used in our project — including frontend frameworks, backend services, state management, and database architecture.

**"On this page" right panel links:**
- Technical Stack Overview
- Frontend Technologies
- Backend Technologies
- Database Layer

**Sub-content (render inline as scrollable subsections):**

#### Technical Stack Overview
Explain: Frontend handles UI rendering, user interaction, and client-side logic. Backend handles database, auth, business logic, and security. Database layer focuses on data structure, performance, and security.

#### Frontend – Why We Use These Technologies
List each technology as a card or accordion item:

1. **Next.js (App Router)** — Full-stack capabilities, SSR, App Router, SEO-friendly, optimized performance.
2. **React** — Component-based, Virtual DOM, reusable UI, large ecosystem.
3. **JavaScript** — Core language, runs natively in browser, handles dynamic behavior.
4. **TypeScript** — Static typing, fewer runtime errors, better IDE support.
5. **Tailwind CSS** — Utility-first, responsive, no separate CSS files.
6. **ShadCN UI** — Prebuilt accessible components, customizable, built on Tailwind.
7. **Zustand** — Lightweight global state, minimal boilerplate, UI state management.
8. **TanStack Query** — API data fetching, caching, background refetching, optimistic updates.

#### Backend – Why We Use These Technologies
1. **Supabase** — Ready-made backend, auth, realtime, storage, auto APIs.
2. **PostgreSQL** — Reliable relational DB, ACID compliance, advanced indexing.
3. **Edge Functions** — Secure server-side logic, low latency, third-party integrations.
4. **RLS (Row Level Security)** — Database-level access control, per-user data restriction.

#### Database Layer
1. **PostgreSQL** — Enterprise-grade, ACID compliant.
2. **Relational Schema** — Structured relationships, avoids duplication, improves consistency. Example: Users table → Foreign key → Projects table.
3. **Indexed Queries** — Faster search, optimized filtering. Common fields: user_id, email, created_at.
4. **Secure Policies** — Protects sensitive data, enforces access control at DB level.

#### Architecture Summary (render as a styled info box)
```
Frontend  → UI & Interaction
Backend   → Business Logic & Authentication
Database  → Structured & Secure Data Storage

State Management:
  Zustand        → UI state
  TanStack Query → Server state
```

---

### Section 2: `id="layout"` — Layout

**Breadcrumb:** Development Guide › Layout

**Title:** Layout & Project Structure

#### Folder Structure (VISUAL TREE — render like Next.js docs screenshot)

Render a **visual folder tree** styled like a file explorer box (light gray background, monospace font, folder icons). Show this structure:

```
app/
├── (auth)/
│     ├── login/
│     ├── signup/
│     └── reset-password/
├── (main)/
│     ├── dashboard/
│     └── [feature modules]/
├── actions/
├── api/
├── components/
├── helpers/
├── hooks/
├── lib/
├── store/
├── supabase/
├── type/
├── utils/
└── public/
```

Below the tree, render a **description table** with two columns: Folder | Purpose

| Folder | Purpose |
|---|---|
| app/ | Main routing directory using App Router. Each folder represents a route. |
| (auth)/ | Authentication pages: Login, Signup, Reset Password |
| (main)/ | Main app pages: Dashboard and feature modules |
| actions/ | Server Actions — handles database operations and server logic |
| api/ | Custom API routes |
| components/ | Reusable UI components |
| helpers/ | Utility helper functions |
| hooks/ | Custom React hooks |
| lib/ | Library configurations (Supabase client, etc.) |
| store/ | State management (Zustand) |
| supabase/ | SQL schema files |
| type/ | TypeScript type definitions |
| utils/ | Common utility functions |
| public/ | Static files like images and icons |

---

### Section 3: `id="components"` — Components

**Breadcrumb:** Development Guide › Components

**Title:** Components

Intro: Reusable UI components are organized inside `components/ui/` using ShadCN.

Show a styled folder box:
```
components/
└── ui/
      ├── button.tsx
      ├── dialog.tsx
      ├── card.tsx
      └── input.tsx
```

Brief note: All components are built with Tailwind CSS + Radix UI via ShadCN. Fully customizable and accessible.

---

### Section 4: `id="technology"` — Technology

**Breadcrumb:** Development Guide › Components › Technology

**Title:** Technology Stack

Render each technology as an **Accordion component** (expandable/collapsible). Each accordion item has a header (technology name) and expanded body with full content.

---

#### Accordion Item 1: Next.js

**Header:** Next.js – Full Development Guide

**Body content:**

- Docs link: https://nextjs.org/docs
- **What is Next.js?** React-based full-stack framework with routing, API handling, SSR, and performance optimization.
- Supports: SSR, SSG, App Router, API Routes, Middleware, Edge runtime.

**Installation & Setup**
```
Step 1: npx create-next-app@latest project-name
Options: TypeScript → Yes, App Router → Yes, ESLint → Yes, Tailwind → Yes

Step 2: npm run dev
Runs at: http://localhost:3000
```

**App Router Core Files** (render as table):

| File | Purpose |
|---|---|
| layout.tsx | Global layout wrapper |
| page.tsx | Route page |
| loading.tsx | Loading UI |
| error.tsx | Error boundary |
| route.ts | API route handler |

**Rendering Types:**
- Server Component (default) — runs on server, secure for DB calls
- Client Component (`"use client"`) — runs in browser, used for state/events/hooks

**Data Fetching:**
- Server: `const data = await fetch(url)`
- Client: `useEffect(() => { fetchData() }, [])`

**Middleware:** Used for auth redirect and route protection. File: `middleware.ts`

**Environment Variables:** Stored in `.env.local`
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

#### Accordion Item 2: Supabase

**Header:** Supabase – Backend Features

**Body content:**

- Docs: https://supabase.com/docs
- **What is Supabase?** Open-source Backend-as-a-Service built on PostgreSQL. Provides: Database, Auth, Storage, Realtime, Edge Functions, Auto APIs.

**2.1 Database (PostgreSQL)** — Create tables, store structured data, manage relationships. Supports foreign keys, indexing, constraints, JSON fields.

**2.2 Table Editor** — UI-based database manager. No SQL required. Best for quick modifications and testing.

**2.3 SQL Editor** — Run raw SQL. Used for complex joins, stored procedures, triggers, functions, RLS policies.
Example: `SELECT * FROM users WHERE role = 'admin';`

**2.4 Authentication** — Handles signup, login, logout, sessions. Supports Email+Password, OTP, OAuth (Google, GitHub).
Frontend: `supabase.auth.signInWithPassword()`

**2.5 Row Level Security (RLS)**
```sql
create policy "User can view own data"
on profiles
for select
using (auth.uid() = user_id);
```

**2.6 Storage** — Image/file upload, public/private buckets, signed URLs.
`supabase.storage.from("avatars").upload()`

**2.7 Realtime** — Live chat, dashboard updates, notifications.
`supabase.channel('room1').on('postgres_changes', ...)`

**2.8 Edge Functions** — Server-side logic, payment processing, third-party integrations.

**2.9 Auto API Generation** — REST APIs auto-generated for all tables.
`GET /rest/v1/users` — No backend code required.

---

#### Accordion Item 3: ShadCN

**Header:** ShadCN – Design System Guide

**Body content:**

- Docs: https://ui.shadcn.com/docs
- **What is ShadCN?** Reusable component library built on Radix UI + Tailwind CSS + accessible design principles.

**Why Use ShadCN?** Fully customizable, no heavy UI framework, production-ready, clean design system.

**Installation:**
```
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
```

**Design Principles:** Consistent spacing, theme-based colors, accessible components, minimal UI approach.

**Theming:** Uses Tailwind + CSS variables. Modify: `tailwind.config.ts`

---

#### Accordion Item 4: Zustand

**Header:** Zustand – State Management

**Body content:**

**Overview:** Lightweight and minimal global state management for React. Focuses on simplicity, performance, and developer experience. Used for client-side state only.

**Why We Use Zustand:**
- Managing global state
- Sharing state across unrelated components
- Avoiding prop drilling
- Handling UI states

**What It's Used For:**
1. Managing Global State — logged-in user data, selected agent, dashboard filters
2. Sharing State Across Components — sidebar toggle, chatbot open/close
3. Handling UI State — modal open/close, theme, sidebar collapse, toast notifications

**Advantages:**
- Minimal boilerplate (no action types, no reducers)
- Simple store creation
- Performance optimized (only re-renders components using changed state)
- Excellent TypeScript support
- No Provider wrapping required

**When to Use:** UI state, lightweight global state, theme switching, chatbot UI, admin panels, Next.js apps.

**When NOT to Use:** Server-side DB management, complex enterprise state logic, persistent server state (use TanStack Query instead).

**Comparison Table:**

| Tool | Purpose |
|---|---|
| Zustand | Client-side global UI state |
| TanStack Query | Server state & API caching |
| Redux | Complex predictable state management |
| Context API | Simple shared state |

---

#### Accordion Item 5: TanStack Query

**Header:** TanStack Query – React Query

**Body content:**

**Overview:** Powerful data-fetching and server-state management library for React. Handles fetching, caching, synchronization, and error states.

**What is Server State?** Data that lives on a remote server, fetched over network, changes independently of UI. Examples: user profiles, dashboard analytics, chat history.

**Why We Use It:** Avoids repetitive loading state logic, manual error handling, duplicate API calls, UI desynchronization.

**What It's Used For:**
1. Fetching API Data — manages loading, error, success states
2. Caching Responses — prevents unnecessary calls, reduces server load
3. Background Refetching — on window focus, network reconnect, at intervals
4. Automatic Retries — retries failed requests automatically
5. Optimistic Updates — UI updates before server confirms (e.g., chat messages)
6. Pagination & Infinite Scroll — paginated data, load more, infinite scrolling

**Advantages:**
- No manual useState for loading/error
- Intelligent caching system
- Keeps UI synchronized with server
- Cleaner and more maintainable code
- Great for large-scale applications

**Disadvantages:**
- Learning curve (caching strategies, query invalidation)
- Not for local UI state
- Overkill for very small projects

**Comparison Table:**

| Feature | TanStack Query | Zustand |
|---|---|---|
| Manages Server State | Yes | No |
| Manages UI State | No | Yes |
| Caching | Yes | No |
| Background Refetch | Yes | No |
| API Retry | Yes | No |
| Modal State | No | Yes |

**Real-World Example (AI chatbot dashboard):**
- Scraped endpoint data → TanStack Query
- Agent configuration → Fetch & cache
- Chat messages → Mutations with optimistic updates
- Chatbot open/close state → Zustand

---

### Section 5: `id="architecture"` — Architecture Overview

**Breadcrumb:** Development Guide › Architecture Overview

**Title:** Architecture Overview

Render as a styled diagram/info box:
```
Frontend     → Next.js
Backend      → Supabase
Database     → PostgreSQL
Auth         → Supabase Auth
Storage      → Supabase Storage
Realtime     → Supabase Realtime
Server Logic → Edge Functions
```

---

### Section 6: `id="conclusion"` — Conclusion

**Breadcrumb:** Development Guide › Conclusion

**Title:** Conclusion

This document explains:
- Technical stack overview
- Next.js full development setup
- Supabase complete backend features
- ShadCN design system usage
- Zustand state management
- TanStack Query server state
- Sample file structure explanation

---

## 🎨 DESIGN REFERENCE

- Match the **Next.js docs visual shadcn style**: white background, clean sans-serif font, left sidebar with active blue highlight, right anchor panel.
- Code blocks: dark background, monospace, with copy button.
- Folder tree: light gray bordered box, folder icons, monospace indentation.
- Accordion: chevron icon rotates on expand, smooth animation.
- Breadcrumb: small gray text at top of each section.
- Active sidebar item: blue text, slight left border indicator.
- Right panel "On this page": sticky, small text, gray until hovered.

---

## ⚙️ TECHNICAL REQUIREMENTS

- Single file React JSX with Tailwind CSS.
- Use `useState` for accordion open/close and active sidebar tracking.
- Smooth scroll to section on sidebar click using `scrollIntoView` or anchor `href`.
- All content is **static** — no API calls.
- Accordion uses chevron icon (rotate on open).
- Folder tree is rendered as a styled `pre` or custom component — NOT a plain list.
- Right panel "On this page" links update based on which main section is active.
- Mobile-responsive: sidebar collapses on small screens.