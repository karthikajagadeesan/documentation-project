import { ChevronRight } from "lucide-react";

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
        <p className="mt-4 leading-7">
          Frontend handles UI rendering, user interaction, and client-side
          logic. Backend handles database, auth, business logic, and security.
          Database layer focuses on data structure, performance, and security.
        </p>
      </div>

      <div id="frontend" className="mt-12 scroll-mt-20">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Frontend – Why We Use These Technologies
        </h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border p-4">
            <h4 className="font-bold">Next.js (App Router)</h4>
            <p className="text-sm text-muted-foreground">
              Full-stack capabilities, SSR, App Router, SEO-friendly, optimized
              performance.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h4 className="font-bold">React</h4>
            <p className="text-sm text-muted-foreground">
              Component-based, Virtual DOM, reusable UI, large ecosystem.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h4 className="font-bold">JavaScript</h4>
            <p className="text-sm text-muted-foreground">
              Core language, runs natively in browser, handles dynamic behavior.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h4 className="font-bold">TypeScript</h4>
            <p className="text-sm text-muted-foreground">
              Static typing, fewer runtime errors, better IDE support.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h4 className="font-bold">Tailwind CSS</h4>
            <p className="text-sm text-muted-foreground">
              Utility-first, responsive, no separate CSS files.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h4 className="font-bold">ShadCN UI</h4>
            <p className="text-sm text-muted-foreground">
              Prebuilt accessible components, customizable, built on Tailwind.
            </p>
          </div>
        </div>
      </div>

      <div id="backend" className="mt-12 scroll-mt-20">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Backend – Why We Use These Technologies
        </h3>
        <ul className="mt-6 space-y-4">
          <li className="flex flex-col space-y-1">
            <span className="font-bold">Supabase</span>
            <span className="text-sm text-muted-foreground">
              Ready-made backend, auth, realtime, storage, auto APIs.
            </span>
          </li>
          <li className="flex flex-col space-y-1">
            <span className="font-bold">PostgreSQL</span>
            <span className="text-sm text-muted-foreground">
              Reliable relational DB, ACID compliance, advanced indexing.
            </span>
          </li>
          <li className="flex flex-col space-y-1">
            <span className="font-bold">RLS (Row Level Security)</span>
            <span className="text-sm text-muted-foreground">
              Database-level access control, per-user data restriction.
            </span>
          </li>
        </ul>
      </div>

      <div id="database" className="mt-12 scroll-mt-20">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Database Layer
        </h3>
        <div className="mt-6 rounded-lg border bg-blue-50/50 dark:bg-blue-950/20 p-6">
          <div className="font-mono text-sm space-y-2">
            <div className="flex justify-between">
              <span>Frontend</span>
              <span>→ UI &amp; Interaction</span>
            </div>
            <div className="flex justify-between">
              <span>Backend</span>
              <span>→ Business Logic &amp; Authentication</span>
            </div>
            <div className="flex justify-between">
              <span>Database</span>
              <span>→ Structured &amp; Secure Data Storage</span>
            </div>
            <div className="pt-4 border-t">
              <p className="font-bold mb-1">State Management:</p>
              <div className="flex justify-between pl-4">
                <span>Zustand</span>
                <span>→ UI state</span>
              </div>
              <div className="flex justify-between pl-4">
                <span>TanStack Query</span>
                <span>→ Server state</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
