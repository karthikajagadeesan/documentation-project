"use client";

import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stackSummary = [
  {
    name: "Next.js",
    role: "Application Framework",
    summary:
      "Serves as the foundation of the project — handling routing, rendering strategies (SSR, SSG, ISR), API endpoints via Route Handlers, and React Server Components that eliminate unnecessary JavaScript shipped to the browser. All pages, layouts, and proxy live within Next.js's file-system conventions.",
  },
  {
    name: "Supabase",
    role: "Backend & Database",
    summary:
      "Powers the entire backend layer — PostgreSQL database with auto-generated APIs, managed authentication (email, OAuth, magic links), file storage, and realtime subscriptions. Row Level Security policies enforce per-user data access directly at the database level, removing the need for a separate server.",
  },
  {
    name: "shadcn/ui",
    role: "Design System",
    summary:
      "Provides the component library for all UI — buttons, dialogs, forms, tables, and more. Components are copied directly into the codebase, giving full ownership over styling and behavior. Built on Radix UI primitives to guarantee accessibility, keyboard navigation, and ARIA compliance throughout.",
  },
  {
    name: "Zustand",
    role: "Client State Management",
    summary:
      "Manages global client-side state — authenticated user, sidebar visibility, notification queue, and UI preferences. Granular subscriptions ensure components only re-render when their specific slice of state changes, and the persist proxy syncs relevant state to localStorage automatically.",
  },
  {
    name: "TanStack Query",
    role: "Server State & Data Fetching",
    summary:
      "Handles all asynchronous data — fetching, caching, synchronizing, and updating API responses. Shared cache keys mean multiple components consuming the same data trigger only one network request. Automatic background refetching, optimistic updates, and built-in loading and error states remove the need for manual useEffect-based fetch logic.",
  },
];

export default function ConclusionSection() {
  return (
    <section id="conclusion" className="mt-16 scroll-mt-20 border-t pt-16">
      <div className="mb-6 flex items-center space-x-1 text-sm text-muted-foreground">
        <span>Development Guide</span>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-foreground">Conclusion</span>
      </div>

      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
        Conclusion
      </h2>
      <p className="mt-4 leading-7 text-muted-foreground">
        This guide has walked through every layer of the stack — from the
        framework that serves pages to the library that manages a dropdown's
        focus state. Each technology was chosen to solve a specific class of
        problem, and together they form a cohesive system where responsibilities
        are clearly separated and patterns are consistent across the entire
        codebase.
      </p>

      <div className="mt-12 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Technology Stack Recap
        </h3>
        <div className="grid gap-4 lg:grid-cols-1">
          {stackSummary.map((item, i) => (
            <Card
              key={item.name}
              className="group flex gap-5 p-5 transition-colors hover:bg-muted/20"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-muted text-xs font-bold text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold">{item.name}</span>
                  <Badge variant="outline" className="text-muted-foreground font-medium">
                    {item.role}
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-6 p-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          By following the patterns documented in this guide — rendering
          strategies in Next.js, Row Level Security in Supabase, component
          ownership with shadcn/ui, state separation between Zustand and
          TanStack Query — the project remains scalable as features are added,
          maintainable as the team grows, and performant by construction rather
          than by optimization after the fact.
        </p>
      </div>
    </section>
  );
}
