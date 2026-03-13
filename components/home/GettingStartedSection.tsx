import { ChevronRight, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const frontendStack = [
  {
    name: "Next.js",
    badge: "App Router",
    description:
      "Full-stack React framework with server-side rendering, file-based routing, and built-in API routes. Powers both the UI and edge functions in a single project.",
    why: "SSR + SEO + performance out of the box",
    color: "bg-primary text-background",
    link: null,
  },
  {
    name: "React",
    badge: "UI Layer",
    description:
      "Component-based library for building interactive UIs. React's Virtual DOM ensures efficient re-renders; hooks handle lifecycle and state cleanly.",
    why: "Composable, declarative, and battle-tested",
    color: "bg-ring text-primary-foreground",
    link: "https://react.dev/learn",
  },
  {
    name: "TypeScript",
    badge: "Type Safety",
    description:
      "Superset of JavaScript that adds static types. Catches bugs at compile time, powers IDE autocompletion, and makes large codebases refactorable.",
    why: "Fewer runtime errors, better DX",
    color: "bg-secondary text-secondary-foreground",
    link: "https://www.typescriptlang.org/docs/",
  },
  {
    name: "ShadCN UI",
    badge: "Components",
    description:
      "Copy-paste component library built on Radix primitives and Tailwind. Fully accessible, unstyled at the base layer — owned by your codebase, not a dependency.",
    why: "Accessible + fully customizable",
    color: "bg-accent text-accent-foreground",
    link: null,
  },
  {
    name: "Tailwind CSS",
    badge: "Styling",
    description:
      "Utility-first CSS framework. Write responsive, dark-mode-aware styles inline without leaving your markup — no naming collisions, no dead CSS.",
    why: "Fast to write, easy to maintain",
    color: "bg-destructive text-primary-foreground",
    link: "https://tailwindcss.com/docs/installation/framework-guides",
  },
  {
    name: "JavaScript",
    badge: "Runtime",
    description:
      "The core language running in every browser and Node.js server. Handles dynamic behavior, event handling, and async data flows.",
    why: "Native to every environment",
    color: "bg-foreground text-primary-foreground",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
];

const backendStack = [
  {
    name: "Supabase",
    badge: "BaaS",
    description:
      "Open-source Firebase alternative built on PostgreSQL. Provides auth, realtime subscriptions, file storage, and auto-generated REST + GraphQL APIs from your database schema.",
    why: "Full backend without managing a server",
  },
  {
    name: "PostgreSQL",
    badge: "Database",
    description:
      "The world's most advanced open-source relational database. ACID-compliant, supports complex joins, JSONB columns, full-text search, and custom extensions.",
    why: "Reliable, scalable, feature-rich",
  },
  {
    name: "Row Level Security",
    badge: "RLS",
    description:
      "PostgreSQL policy system that restricts table access at the database level. Each user can only read or write rows that match their identity — enforced before data leaves the DB.",
    why: "Security that cannot be bypassed by code bugs",
  },
];

const stateManagement = [
  {
    name: "Zustand",
    scope: "Client / UI State",
    description:
      "Lightweight global state manager (~1kb). Stores UI-only data — sidebar open/close, user preferences, modal state — without the boilerplate of Redux.",
    example: "useUserStore, useSettingsStore",
  },
  {
    name: "TanStack Query",
    scope: "Server / Async State",
    description:
      "Handles all async data: fetching, caching, background refetch, optimistic updates, and pagination. Replaces hand-written useEffect fetch patterns.",
    example: "useQuery, useMutation, useInfiniteQuery",
  },
];

export default function GettingStartedSection() {
  return (
    <section id="getting-started" className="scroll-mt-20">
      <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
          Development Guide
        </div>
        <ChevronRight className="h-4 w-4" />
        <div className="font-medium text-foreground">Getting Started</div>
      </div>

      <h1 className="inline-block font-heading text-4xl lg:text-5xl font-bold tracking-tight">
        Getting Started
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: March 3, 2026
      </p>
      <p className="mt-6 text-lg text-muted-foreground">
        This Development Guide covers the full technical stack used in our
        project — including frontend frameworks, backend services, state
        management, and database architecture.
      </p>

      <div id="technical-stack" className="mt-12 scroll-mt-20">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Technical Stack Overview
        </h2>
        <p className="mt-4 leading-7 text-muted-foreground">
          The project is split into three clearly separated concerns. The{" "}
          <strong className="text-foreground">frontend</strong> handles
          rendering, routing, and user interaction. The{" "}
          <strong className="text-foreground">backend</strong> (Supabase)
          manages auth, data, and business rules. A dedicated{" "}
          <strong className="text-foreground">state layer</strong> bridges the
          two — Zustand for local UI state, TanStack Query for remote server
          state.
        </p>

        <Card className="mt-8 overflow-hidden bg-muted/30">
          <div className="grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              {
                layer: "Frontend",
                role: "UI & Interaction",
                items: ["Next.js", "React", "TypeScript", "Tailwind", "ShadCN"],
                accent: "border-t-primary",
              },
              {
                layer: "State",
                role: "Data Management",
                items: ["Zustand", "TanStack Query"],
                accent: "border-t-primary/70",
              },
              {
                layer: "Backend",
                role: "Auth, DB & APIs",
                items: ["Supabase", "PostgreSQL", "RLS"],
                accent: "border-t-primary/40",
              },
            ].map(({ layer, role, items, accent }) => (
              <div
                key={layer}
                className={`border-t-2 ${accent} p-5 flex flex-col gap-3`}
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {layer}
                  </p>
                  <p className="mt-0.5 font-semibold text-foreground">{role}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="rounded-md bg-background px-2 py-0.5 text-xs font-mono text-foreground"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div id="frontend" className="mt-16 scroll-mt-20">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Frontend
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Why each technology was chosen for the presentation layer.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {frontendStack.map(({ name, badge, description, why, color, link }) => (
            <Card
              key={name}
              className="group relative flex flex-col gap-3 overflow-hidden p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-foreground">{name}</h4>
                <Badge
                  variant="outline"
                  className={`shrink-0 text-[10px] font-semibold uppercase tracking-wide ${color}`}
                >
                  {badge}
                </Badge>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>

              <div className="mt-auto flex items-center justify-between gap-2 border-t pt-2">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Why: </span>
                  {why}
                </p>
                {link && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="h-7 gap-1 px-2 text-[11px] font-medium text-muted-foreground hover:text-foreground"
                  >
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      Docs
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div id="backend" className="mt-16 scroll-mt-20">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Backend
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Server-side services handling data, auth, and security rules.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          {backendStack.map(({ name, badge, description, why }) => (
            <Card
              key={name}
              className="flex flex-col gap-2 p-5 sm:flex-row sm:items-start sm:gap-6"
            >
              <div className="flex shrink-0 flex-col gap-1 sm:w-36">
                <span className="font-bold text-foreground">{name}</span>
                <Badge
                  variant="outline"
                  className="w-fit text-[10px] font-semibold uppercase tracking-wide text-primary bg-primary/10"
                >
                  {badge}
                </Badge>
              </div>

              <div className="flex flex-col gap-1.5">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Why: </span>
                  {why}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div id="state-management" className="mt-16 scroll-mt-20">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          State Management
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Two complementary tools — one for local UI state, one for remote
          server state.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {stateManagement.map(({ name, scope, description, example }) => (
            <Card
              key={name}
              className="flex flex-col gap-4 p-5"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-foreground">{name}</h4>
                <Badge
                  variant="outline"
                  className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-primary bg-primary/10"
                >
                  {scope}
                </Badge>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>

              <div className="mt-auto rounded-md bg-muted px-3 py-2">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Example hooks:{" "}
                  </span>
                  <span className="font-mono">{example}</span>
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div id="database" className="mt-16 scroll-mt-20">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Database Layer
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          How data flows from the user's action down to secure, structured
          storage.
        </p>

        <Card className="mt-6 bg-muted/30 p-6">
          <div className="space-y-0">
            {[
              {
                label: "Browser / Client",
                arrow: "User triggers action (click, form submit)",
                color: "border-primary/80",
              },
              {
                label: "Next.js",
                arrow: "Server Component or Route Handler processes request",
                color: "border-primary/70",
              },
              {
                label: "Supabase Client",
                arrow: "Authenticated API call with session cookie",
                color: "border-primary/60",
              },
              {
                label: "PostgreSQL + RLS",
                arrow: "Row Level Security validates access before query runs",
                color: "border-primary/50",
              },
              {
                label: "Response",
                arrow: "Data returned → TanStack Query caches it",
                color: "border-primary/40",
              },
            ].map(({ label, arrow, color }, i, arr) => (
              <div key={label} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${color} bg-background text-xs font-bold text-foreground`}
                  >
                    {i + 1}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="h-8 w-px bg-border" />
                  )}
                </div>
                <div className="pb-6 pt-1">
                  <p className="text-sm font-semibold text-foreground">
                    {label}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{arrow}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
