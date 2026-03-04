"use client";

import React, { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

interface TechItem {
  id: string;
  title: string;
  docs: string;
  description: string;
  content: React.ReactNode;
}

const TechnologyAccordion = () => {
  const [openItem, setOpenItem] = useState<string | null>("nextjs");

  const technologies: TechItem[] = [
    {
      id: "nextjs",
      title: "Next.js – Full Development Guide",
      docs: "https://nextjs.org/docs",
      description: "React-based full-stack framework with routing, API handling, SSR, and performance optimization.",
      content: (
        <div className="space-y-4">
          <div>
            <p className="mb-2 font-medium">What is Next.js?</p>
            <p className="text-muted-foreground">React-based full-stack framework with routing, API handling, SSR, and performance optimization. Supports: SSR, SSG, App Router, API Routes, Middleware, Edge runtime.</p>
          </div>
          <div className="rounded-md border bg-muted/50 p-4">
            <p className="mb-2 font-mono text-sm font-bold">Installation & Setup</p>
            <pre className="font-mono text-xs leading-relaxed">
              Step 1: npx create-next-app@latest project-name{"\n"}
              Options: TypeScript → Yes, App Router → Yes, ESLint → Yes, Tailwind → Yes{"\n\n"}
              Step 2: npm run dev{"\n"}
              Runs at: http://localhost:3000
            </pre>
          </div>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 font-medium text-muted-foreground">File</th>
                <th className="py-2 font-medium text-muted-foreground">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr><td className="py-2 font-mono text-xs">layout.tsx</td><td className="py-2">Global layout wrapper</td></tr>
              <tr><td className="py-2 font-mono text-xs">page.tsx</td><td className="py-2">Route page</td></tr>
              <tr><td className="py-2 font-mono text-xs">loading.tsx</td><td className="py-2">Loading UI</td></tr>
              <tr><td className="py-2 font-mono text-xs">error.tsx</td><td className="py-2">Error boundary</td></tr>
              <tr><td className="py-2 font-mono text-xs">route.ts</td><td className="py-2">API route handler</td></tr>
            </tbody>
          </table>
          <div className="space-y-2">
            <p className="font-medium">Rendering Types:</p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              <li>Server Component (default) — runs on server, secure for DB calls</li>
              <li>Client Component ("use client") — runs in browser, used for state/events/hooks</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "supabase",
      title: "Supabase – Backend Features",
      docs: "https://supabase.com/docs",
      description: "Open-source Backend-as-a-Service built on PostgreSQL.",
      content: (
        <div className="space-y-4 text-sm">
          <p><strong>What is Supabase?</strong> Open-source Backend-as-a-Service built on PostgreSQL. Provides: Database, Auth, Storage, Realtime, Edge Functions, Auto APIs.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border p-3">
              <p className="font-bold">2.1 Database</p>
              <p className="text-muted-foreground">Create tables, store structured data, manage relationships.</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="font-bold">2.2 Table Editor</p>
              <p className="text-muted-foreground">UI-based database manager. No SQL required.</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="font-bold">2.3 SQL Editor</p>
              <p className="text-muted-foreground">Run raw SQL. Used for complex joins, policies, etc.</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="font-bold">2.4 Authentication</p>
              <p className="text-muted-foreground">Handles signup, login, logout, sessions.</p>
            </div>
          </div>
          <div className="rounded-md bg-zinc-950 p-4 text-zinc-50 font-mono text-xs">
            <p className="text-blue-400">-- 2.5 Row Level Security (RLS)</p>
            <p>create policy <span className="text-emerald-400">"User can view own data"</span></p>
            <p>on profiles for select</p>
            <p>using (auth.uid() = user_id);</p>
          </div>
        </div>
      )
    },
    {
      id: "shadcn",
      title: "ShadCN – Design System Guide",
      docs: "https://ui.shadcn.com/docs",
      description: "Reusable component library built on Radix UI + Tailwind CSS.",
      content: (
        <div className="space-y-4 text-sm">
          <p><strong>What is ShadCN?</strong> Reusable component library built on Radix UI + Tailwind CSS + accessible design principles.</p>
          <div className="space-y-2">
            <p className="font-bold">Installation:</p>
            <pre className="rounded-md bg-muted p-4 font-mono text-xs">
              npx shadcn-ui@latest init{"\n"}
              npx shadcn-ui@latest add button
            </pre>
          </div>
          <p className="text-muted-foreground"><strong>Theming:</strong> Uses Tailwind + CSS variables. Modify: <code>tailwind.config.ts</code></p>
        </div>
      )
    },
    {
      id: "zustand",
      title: "Zustand – State Management",
      docs: "https://docs.pmnd.rs/zustand",
      description: "Lightweight and minimal global state management for React.",
      content: (
        <div className="space-y-4 text-sm">
          <p>Lightweight and minimal global state management for React. Focuses on simplicity, performance, and developer experience. Used for client-side state only.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Global State:</strong> Logged-in user data, dashboard filters</li>
            <li><strong>Shared State:</strong> Sidebar toggle, chatbot open/close</li>
            <li><strong>UI State:</strong> Modal state, theme, notifications</li>
          </ul>
        </div>
      )
    },
    {
      id: "tanstack",
      title: "TanStack Query – React Query",
      docs: "https://tanstack.com/query/latest",
      description: "Powerful data-fetching and server-state management library for React.",
      content: (
        <div className="space-y-4 text-sm">
          <p>Handles fetching, caching, synchronization, and error states for server-originated data.</p>
          <div className="grid gap-2 text-xs">
            <div className="flex justify-between border-b py-1"><span>Caching Responses</span><span className="text-primary font-bold">✓</span></div>
            <div className="flex justify-between border-b py-1"><span>Background Refetching</span><span className="text-primary font-bold">✓</span></div>
            <div className="flex justify-between border-b py-1"><span>Automatic Retries</span><span className="text-primary font-bold">✓</span></div>
            <div className="flex justify-between border-b py-1"><span>Optimistic Updates</span><span className="text-primary font-bold">✓</span></div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4 mt-8">
      {technologies.map((tech) => (
        <div key={tech.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <button
            onClick={() => setOpenItem(openItem === tech.id ? null : tech.id)}
            className="flex w-full items-center justify-between p-4 text-left transition-all hover:bg-accent/50"
          >
            <div className="flex flex-col">
              <span className="text-lg font-semibold tracking-tight">{tech.title}</span>
              <span className="text-sm text-muted-foreground">{tech.description}</span>
            </div>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                openItem === tech.id ? "rotate-180" : ""
              }`}
            />
          </button>
          {openItem === tech.id && (
            <div className="border-t p-4 pt-0">
              <div className="mt-4">
                <div className="mb-4 flex items-center justify-between border-b pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Documentation</span>
                  <a href={tech.docs} target="_blank" className="flex items-center gap-1 text-xs text-primary hover:underline">
                    {tech.docs} <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                {tech.content}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TechnologyAccordion;
