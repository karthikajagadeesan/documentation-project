"use client";

import React, { useState } from "react";
import { 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Terminal, 
  BookOpen, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Package,
  LucideIcon 
} from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TechItem {
  id: string;
  title: string;
  docs: string;
  tags: string[];
  tagline: string;
  what: string;
  why: string;
  useCases: { title: string; desc: string }[];
  install: { label?: string; cmd: string; note?: string; multi?: boolean; lang?: string }[];
  table?: { title: string; headers: string[]; rows: string[][] };
  codeExample?: { title: string; lang?: string; code: string; note?: string };
  pros: string[];
  cons: string[];
  whenNot: string;
}

interface TechCardProps {
  tech: TechItem;
  index: number;
}

const CodeBlock = ({ code, language = "bash" }: { code: string; language?: string }) => (
  <div className="relative rounded-md border bg-muted/50 font-mono text-xs">
    <div className="flex items-center justify-between border-b bg-muted/80 px-4 py-2">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{language}</span>
      <CopyButton text={code} />
    </div>
    <pre className="overflow-x-auto p-4 leading-relaxed text-foreground">{code}</pre>
  </div>
);

const InlineCommand = ({ cmd }: { cmd: string }) => (
  <div className="flex items-center justify-between rounded-md border bg-muted/50 px-4 py-2.5 font-mono text-sm">
    <span className="text-foreground">{cmd}</span>
    <CopyButton text={cmd} />
  </div>
);

const SectionHeader = ({ icon: Icon, title }: { icon: LucideIcon; title: string }) => (
  <div className="flex items-center gap-2 mb-3">
    <div className="flex h-7 w-7 items-center justify-center rounded-md border bg-muted">
      <Icon className="h-4 w-4 text-muted-foreground" />
    </div>
    <h4 className="text-sm font-semibold tracking-tight">{title}</h4>
  </div>
);

const ProConList = ({ pros, cons }: { pros: string[]; cons: string[] }) => (
  <div className="grid gap-4 sm:grid-cols-2">
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-semibold">Advantages</span>
      </div>
      <ul className="space-y-2">
        {pros.map((p, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
            {p}
          </li>
        ))}
      </ul>
    </div>
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-semibold">Disadvantages</span>
      </div>
      <ul className="space-y-2">
        {cons.map((c, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
            {c}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const DataTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <Card className="overflow-hidden">
    <Table>
      <TableHeader className="bg-muted/50">
        <TableRow>
          {headers.map((h, i) => (
            <TableHead key={i} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">{h}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={i} className="hover:bg-muted/30 transition-colors border-b last:border-0">
            {row.map((cell, j) => (
              <TableCell key={j} className={`px-4 py-3 text-sm ${j === 0 ? "font-mono text-xs font-medium" : "text-muted-foreground"}`}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
);

const TechCard = ({ tech, index }: TechCardProps) => {
  const [open, setOpen] = useState(true);

  return (
    <Card className="rounded-xl overflow-hidden mb-6">
      <div
        className="flex cursor-pointer items-start justify-between gap-4 p-6 hover:bg-muted/20 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-muted text-sm font-bold text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <CardTitle className="text-lg font-bold tracking-tight">{tech.title}</CardTitle>
              {tech.tags.map((t, i) => <Badge variant="secondary" key={i}>{t}</Badge>)}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{tech.tagline}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 mt-0.5">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="h-8 gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <a
              href={tech.docs}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Docs
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
          {open ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
        </div>
      </div>

      {open && (
        <CardContent className="border-t pb-6 pt-6 space-y-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <SectionHeader icon={BookOpen} title="What is it?" />
              <p className="text-sm text-muted-foreground leading-relaxed">{tech.what}</p>
            </div>
            <div>
              <SectionHeader icon={Zap} title="Why use it?" />
              <p className="text-sm text-muted-foreground leading-relaxed">{tech.why}</p>
            </div>
          </div>

          <div>
            <SectionHeader icon={Package} title="Common Use Cases" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {tech.useCases.map((uc, i) => (
                <div key={i} className="rounded-lg border bg-muted/30 px-4 py-3">
                  <p className="text-xs font-semibold mb-1">{uc.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader icon={Terminal} title="Installation & Setup" />
            <div className="space-y-3">
              {tech.install.map((step, i) => (
                <div key={i}>
                  <p className="mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Step {i + 1}{step.label ? ` — ${step.label}` : ""}
                  </p>
                  {step.multi ? (
                    <CodeBlock code={step.cmd} language={step.lang || "bash"} />
                  ) : (
                    <InlineCommand cmd={step.cmd} />
                  )}
                  {step.note && <p className="mt-1.5 text-xs text-muted-foreground">{step.note}</p>}
                </div>
              ))}
            </div>
          </div>

          {tech.table && (
            <div>
              <SectionHeader icon={BookOpen} title={tech.table.title} />
              <DataTable headers={tech.table.headers} rows={tech.table.rows} />
            </div>
          )}

          {tech.codeExample && (
            <div>
              <SectionHeader icon={Terminal} title={tech.codeExample.title} />
              <CodeBlock code={tech.codeExample.code} language={tech.codeExample.lang || "typescript"} />
              {tech.codeExample.note && <p className="mt-2 text-xs text-muted-foreground">{tech.codeExample.note}</p>}
            </div>
          )}

          <div>
            <SectionHeader icon={CheckCircle2} title="Pros & Cons" />
            <ProConList pros={tech.pros} cons={tech.cons} />
          </div>

          <div className="rounded-lg border border-dashed p-4 bg-muted/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">When NOT to use</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{tech.whenNot}</p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const technologies: TechItem[] = [
  {
    id: "nextjs",
    title: "Next.js",
    docs: "https://nextjs.org/docs",
    tags: ["Framework", "Full-Stack", "React"],
    tagline: "The React framework for production — handles routing, rendering, APIs, and optimizations out of the box.",
    what: "Next.js is a full-stack React framework developed by Vercel. It extends React by adding built-in file-system routing, multiple rendering strategies (SSR, SSG, ISR), API routes, proxy, image and font optimization, and a powerful App Router introduced in v13. It removes the need for separate routing libraries, custom webpack configs, and server setup — everything works from day one.",
    why: "Teams choose Next.js because it collapses the frontend and backend into a single coherent codebase. You get server-side rendering for SEO-critical pages, static generation for blazing-fast delivery, React Server Components to eliminate unnecessary JS shipped to the browser, and API routes to handle backend logic — all without reaching for Express, React Router, or a separate server.",
    useCases: [
      { title: "Marketing Sites", desc: "Statically generated pages with fast load times and built-in SEO metadata APIs." },
      { title: "E-commerce", desc: "ISR (Incremental Static Regeneration) keeps product pages fresh without full rebuilds." },
      { title: "Dashboards", desc: "Client components handle interactivity while server components fetch data securely." },
      { title: "API Backend", desc: "Route Handlers (route.ts) replace the need for a separate Express/Fastify server." },
      { title: "Authentication", desc: "Proxy runs at the edge before routes, ideal for session-based auth guards." },
      { title: "Multi-tenant Apps", desc: "Dynamic routing and rewrites support complex domain-per-tenant architectures." },
    ],
    install: [
      { label: "Create project", cmd: "npx create-next-app@latest my-app", note: "Choose: TypeScript → Yes | App Router → Yes | Tailwind → Yes | ESLint → Yes" },
      { label: "Enter directory", cmd: "cd my-app" },
      { label: "Start dev server", cmd: "npm run dev", note: "Runs at http://localhost:3000" },
      { label: "Build for production", cmd: "npm run build && npm start" },
    ],
    table: {
      title: "App Router File Conventions",
      headers: ["File", "Purpose", "Notes"],
      rows: [
        ["layout.tsx", "Persistent wrapper for route segment", "Wraps all children, doesn't re-render on navigation"],
        ["page.tsx", "Unique UI for a route", "Makes the route publicly accessible"],
        ["loading.tsx", "Suspense boundary UI", "Shows while page.tsx is streaming"],
        ["error.tsx", "Error boundary UI", "Must be a Client Component"],
        ["not-found.tsx", "404 UI for segment", "Triggered by notFound() helper"],
        ["route.ts", "API endpoint handler", "Replaces pages/api — supports GET, POST, etc."],
        ["proxy.ts", "Edge logic before request", "Auth guards, redirects, rewrites"],
      ],
    },
    codeExample: {
      title: "Sample Code",
      lang: "typescript",
      code: `'use server'
      
      import { createClient } from '@/lib/supabase/server'
      import { revalidatePath } from 'next/cache'
      import { redirect } from 'next/navigation'
      import * as z from 'zod'
      import type { AuthActionResult, SignupFormValues } from '@/types/general-type'
      
      const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })
      
      const signupSchema = z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
      })
      
      export async function signIn(
        formData: z.infer<typeof loginSchema>
      ): Promise<AuthActionResult> {
        const supabase = await createClient()
      
        const validation = loginSchema.safeParse(formData)
        if (!validation.success) {
          return { error: 'Invalid input' }
        }
      
        const { error } = await supabase.auth.signInWithPassword(validation.data)
        if (error) {
          return { error: error.message }
        }
      
        revalidatePath('/', 'layout')
        redirect('/')
      }
      
      export async function signUp(
        formData: SignupFormValues
      ): Promise<AuthActionResult> {
        const supabase = await createClient()
      
        const validation = signupSchema.safeParse(formData)
        if (!validation.success) {
          return { error: 'Invalid input' }
        }
      
        const { error } = await supabase.auth.signUp({
          email: validation.data.email,
          password: validation.data.password,
          options: {
            data: {
              full_name: validation.data.name,
            },
          },
        })
      
        if (error) {
          return { error: error.message }
        }
      
        revalidatePath('/', 'layout')
        return { success: true }
      }
      
      export async function signOut(): Promise<void> {
        const supabase = await createClient()
        await supabase.auth.signOut()
        revalidatePath('/', 'layout')
        redirect('/login')
      }`,
      note: "Server Components can be async. They have direct access to databases, environment variables, and backend services — no API layer needed.",
    },
    pros: [
      "Zero-config setup with TypeScript, ESLint, and Tailwind out of the box",
      "React Server Components reduce JavaScript bundle size significantly",
      "Multiple rendering strategies (SSG, SSR, ISR, CSR) per page",
      "Built-in image optimization, font loading, and metadata APIs",
      "File-system routing eliminates react-router boilerplate",
      "Large ecosystem, Vercel hosting, and excellent documentation",
      "Edge Runtime support for globally distributed low-latency APIs",
    ],
    cons: [
      "App Router has a steep learning curve — Server vs Client Component boundaries can be confusing",
      "Framework lock-in: heavy reliance on Next.js-specific APIs",
      "Build times grow on large projects with many static pages",
      "Debugging SSR hydration errors can be tricky",
      "Overkill for simple single-page apps or purely static sites",
    ],
    whenNot: "If you're building a purely client-side SPA with no SEO requirements and no server logic, plain Vite + React is simpler and faster to set up. Also avoid Next.js if your team needs full control over the server layer — a custom Express/Fastify + React setup gives more flexibility.",
  },
  {
    id: "supabase",
    title: "Supabase",
    docs: "https://supabase.com/docs",
    tags: ["Backend-as-a-Service", "PostgreSQL", "Auth"],
    tagline: "The open-source Firebase alternative — PostgreSQL database, authentication, storage, and realtime subscriptions in one platform.",
    what: "Supabase is a Backend-as-a-Service platform built on top of PostgreSQL. It auto-generates a RESTful and GraphQL API from your database schema, provides a full authentication system (email, OAuth, magic links), a file storage service, realtime subscriptions via WebSockets, and serverless Edge Functions — all accessible through typed JavaScript/TypeScript SDKs. It is fully open-source and self-hostable.",
    why: "Supabase eliminates the need to build and maintain a backend from scratch. Instead of writing authentication logic, setting up a database server, managing migrations manually, and building file upload endpoints — Supabase provides all of this through a web dashboard and a single SDK. It's especially powerful combined with Next.js because server-side data fetching can hit Supabase directly without an API layer.",
    useCases: [
      { title: "User Authentication", desc: "Email/password, magic links, OAuth (Google, GitHub) — fully managed with session handling." },
      { title: "Database Storage", desc: "PostgreSQL tables with relationships, indexes, and full SQL support via the SQL editor." },
      { title: "File Uploads", desc: "Supabase Storage handles avatars, documents, and media with access policies." },
      { title: "Realtime Features", desc: "Subscribe to database changes via WebSockets — live chats, dashboards, notifications." },
      { title: "Row Level Security", desc: "Policies enforce per-user data access directly in the database layer." },
      { title: "Edge Functions", desc: "Serverless Deno functions for webhooks, payment processing, and custom logic." },
    ],
    install: [
      { label: "Install SDK", cmd: "npm install @supabase/supabase-js" },
      { label: "Install Auth helpers (Next.js)", cmd: "npm install @supabase/ssr" },
      { label: "Add environment variables", cmd: "NEXT_PUBLIC_SUPABASE_URL=your-project-url\nNEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key", multi: true, lang: ".env.local" },
      { label: "Create Supabase client", cmd: "utils/supabase/client.ts", note: "See code example below for the full setup." },
    ],
    table: {
      title: "Core Supabase Features",
      headers: ["Feature", "What it does", "Key concept"],
      rows: [
        ["Database", "PostgreSQL tables, views, functions", "Full SQL + auto-generated REST API"],
        ["Auth", "Signup, login, sessions, OAuth", "JWT tokens, server-side session refresh"],
        ["Storage", "File buckets with policies", "Public/private buckets, signed URLs"],
        ["Realtime", "WebSocket subscriptions to DB changes", "channel().on('postgres_changes', ...)"],
        ["Edge Functions", "Serverless Deno functions", "Deployed globally, invoked via SDK"],
        ["RLS", "Row Level Security policies", "Database-enforced access control"],
      ],
    },
    codeExample: {
      title: "Sample Code",
      lang: "typescript",
      code: `// utils/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

// ─── Signing in ──────────────────────────────────────────
const supabase = createClient();

const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "secure-password",
});

// ─── Querying with RLS enforced ───────────────────────────
const { data: posts, error: postsError } = await supabase
  .from("posts")
  .select("id, title, created_at")
  .eq("user_id", data.user?.id)   // RLS policy also enforces this
  .order("created_at", { ascending: false })
  .limit(10);

// ─── Realtime subscription ────────────────────────────────
supabase
  .channel("posts-changes")
  .on("postgres_changes", { event: "INSERT", schema: "public", table: "posts" }, 
    (payload) => console.log("New post:", payload.new))
  .subscribe();`,
      note: "RLS policies run server-side in PostgreSQL. Even if a client bypasses the SDK, the database enforces access rules automatically.",
    },
    pros: [
      "Full PostgreSQL — real relational DB with joins, functions, triggers, and indexes",
      "Auto-generated TypeScript types from your schema keep queries type-safe",
      "Authentication fully managed — no JWT logic to write yourself",
      "Realtime subscriptions without managing WebSocket infrastructure",
      "Open-source and self-hostable — no vendor lock-in",
      "Row Level Security moves access control into the database, not the app layer",
      "Generous free tier for side projects and prototyping",
    ],
    cons: [
      "Performance overhead: auto-generated API (PostgREST) is less optimized than hand-written queries",
      "Complex queries (multiple joins, aggregations) can be awkward through the SDK — SQL editor needed",
      "RLS policies can be difficult to debug and reason about for beginners",
      "Edge Functions use Deno, not Node.js — some npm packages are incompatible",
      "Free tier has usage limits and project pausing after inactivity",
    ],
    whenNot: "If your data access patterns are highly complex (reporting, heavy analytics, multi-step transactions), a dedicated PostgreSQL instance with Prisma or Drizzle ORM gives more control. Supabase is also not ideal for apps requiring strict compliance (HIPAA, SOC2) unless you're on their enterprise plan.",
  },
  {
    id: "shadcn",
    title: "shadcn/ui",
    docs: "https://ui.shadcn.com/docs",
    tags: ["UI Components", "Radix UI", "Tailwind CSS"],
    tagline: "Beautifully designed, accessible components you copy into your project — not a component library you install as a dependency.",
    what: "shadcn/ui is not a traditional component library. Instead of installing a package, you copy individual components directly into your codebase using a CLI. Each component is built on Radix UI primitives (for accessibility and behavior) and styled with Tailwind CSS. Because the code lives in your project, you have full ownership — you can modify every pixel without fighting library internals or overriding deeply nested CSS.",
    why: "Traditional UI libraries ship pre-styled, opinionated components locked behind package versions. shadcn/ui gives you the accessibility and behavior guarantees of Radix UI while letting you own the styling. You're not fighting class specificity wars or reading source code to understand why a dropdown closes incorrectly — the component code is right there in your project, readable and modifiable. This is particularly powerful when building design systems that must match brand guidelines precisely.",
    useCases: [
      { title: "Design Systems", desc: "Build a company-specific component library that teams can extend and modify freely." },
      { title: "Admin Dashboards", desc: "Tables, dialogs, forms, tabs, and sheets are all included with keyboard navigation." },
      { title: "Forms", desc: "Integrates tightly with React Hook Form and Zod for validated, accessible form UIs." },
      { title: "Dialogs & Modals", desc: "Radix Dialog primitives ensure focus trapping and ARIA roles are handled correctly." },
      { title: "Data Tables", desc: "TanStack Table + shadcn DataTable gives sortable, filterable, paginated tables." },
      { title: "Theming", desc: "CSS variables and the theme system allow dark mode and brand customization." },
    ],
    install: [
      { label: "Initialize in existing Next.js project", cmd: "npx shadcn-ui@latest init", note: "Configures tailwind.config.ts, globals.css CSS variables, and creates lib/utils.ts" },
      { label: "Add a component (e.g. Button)", cmd: "npx shadcn-ui@latest add button", note: "Copies the component into components/ui/button.tsx — you own this file." },
      { label: "Add multiple components", cmd: "npx shadcn-ui@latest add dialog table form card badge", multi: true, lang: "bash" },
      { label: "Update a component to latest", cmd: "npx shadcn-ui@latest add button --overwrite" },
    ],
    table: {
      title: "Commonly Used Components",
      headers: ["Component", "Use case", "Underlying primitive"],
      rows: [
        ["Button", "Primary actions, form submits", "Native button + variants"],
        ["Dialog", "Modals, confirmations", "Radix Dialog (focus trap, ARIA)"],
        ["Form", "Validated forms with React Hook Form", "Radix Label + RHF Controller"],
        ["Table", "Data display with TanStack Table", "Native table + shadcn styling"],
        ["Select", "Dropdown pickers", "Radix Select"],
        ["Tabs", "Content switching", "Radix Tabs"],
        ["Toast / Sonner", "Notifications", "Sonner library"],
        ["Sheet", "Slide-in sidebars", "Radix Dialog (side variant)"],
      ],
    },
    codeExample: {
      title: "Sample Code",
      lang: "tsx",
      code: `"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

export default function CreateUserDialog() {
  const form = useForm({ resolver: zodResolver(schema) });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(console.log)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}`,
      note: "FormMessage automatically renders Zod validation errors. The Dialog handles focus trapping and ESC key behavior via Radix UI.",
    },
    pros: [
      "Full code ownership — no dependency versioning conflicts on UI components",
      "Built on Radix UI: ARIA compliance, keyboard navigation, focus management handled automatically",
      "Tailwind-based styling is easy to override without specificity fights",
      "Excellent dark mode support via CSS variables in globals.css",
      "Integrates seamlessly with React Hook Form and Zod",
      "Large, active community with new components added regularly",
      "TypeScript-first with strong prop types out of the box",
    ],
    cons: [
      "Components must be manually updated — no version bump via npm",
      "Requires Tailwind CSS — not compatible with CSS Modules or styled-components projects without changes",
      "Initial setup (tailwind config, CSS variables, cn utility) has some boilerplate",
      "Component variants are limited to what's defined — extending means editing the component file",
      "Not ideal if you want a fully pre-packaged, zero-customization solution",
    ],
    whenNot: "If your team needs a fully managed, versioned component library with a dedicated design team, something like MUI (Material UI) or Mantine may be a better fit. shadcn/ui is best when you want control — if you don't want to touch component code ever, a traditional library serves better.",
  },
  {
    id: "zustand",
    title: "Zustand",
    docs: "https://docs.pmnd.rs/zustand/getting-started/introduction",
    tags: ["State Management", "Client-side", "React"],
    tagline: "Minimal, fast, and scalable global state management for React — no boilerplate, no providers, no magic.",
    what: "Zustand is a lightweight global state management library for React. It creates stores as simple JavaScript objects with state and actions. Compared to Redux (actions, reducers, dispatchers, proxy), Zustand has almost no boilerplate. Components subscribe to only the slices of state they use, preventing unnecessary re-renders. Zustand stores exist outside the React tree, making state accessible anywhere — including inside event handlers, utilities, and even outside components.",
    why: "React's built-in useState is great for local state but breaks down when state needs to be shared across many disconnected components. Context API works but re-renders every consumer on any change. Zustand solves both problems: it's global, it supports granular subscriptions (only re-render when the piece of state you use changes), and its API is a simple function call — no wrapping your app in a Provider tree required.",
    useCases: [
      { title: "Auth State", desc: "Store the logged-in user object and authentication status globally, accessible from any component." },
      { title: "UI State", desc: "Sidebar open/close, modal visibility, notification queue — any UI toggle shared between components." },
      { title: "Dashboard Filters", desc: "Date ranges, search queries, and filter values persisted across page navigations." },
      { title: "Shopping Cart", desc: "Cart items, quantities, and totals available across product pages, header, and checkout." },
      { title: "Theme Settings", desc: "User preferences like dark/light mode, language, or density stored globally." },
      { title: "Multi-step Forms", desc: "Form data shared across steps without prop drilling through every intermediate component." },
    ],
    install: [
      { label: "Install Zustand", cmd: "npm install zustand" },
      { label: "Create a store", cmd: "touch store/useUserStore.ts", note: "See the code example below for the store definition pattern." },
    ],
    table: {
      title: "Zustand vs Other State Solutions",
      headers: ["Library", "Boilerplate", "Re-renders", "Bundle Size", "Best for"],
      rows: [
        ["useState / useReducer", "None", "Component-level", "0 kb", "Local, isolated state"],
        ["Context API", "Low", "All consumers re-render", "0 kb", "Infrequently updated global state"],
        ["Zustand", "Very low", "Subscribed slices only", "~3 kb", "Global state with performance"],
        ["Redux Toolkit", "Medium", "Selector-based", "~47 kb", "Large apps, time-travel debugging"],
        ["Jotai", "Low", "Atom-level", "~5 kb", "Fine-grained atomic state"],
      ],
    },
    codeExample: {
      title: "Sample Code",
      lang: "typescript",
      code: `// store/useAppStore.ts
import { create } from "zustand";
import { persist } from "zustand/proxy"; // persist to localStorage

interface User {
  id: string;
  name: string;
  email: string;
}

interface AppStore {
  // State
  user: User | null;
  sidebarOpen: boolean;
  notifications: string[];

  // Actions
  setUser: (user: User | null) => void;
  toggleSidebar: () => void;
  addNotification: (msg: string) => void;
  clearNotifications: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      user: null,
      sidebarOpen: true,
      notifications: [],

      setUser: (user) => set({ user }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      addNotification: (msg) =>
        set((state) => ({ notifications: [...state.notifications, msg] })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    { name: "app-storage" } // persists to localStorage
  )
);

// ─── Usage in components ──────────────────────────────────
// Subscribe to only "user" — component won't re-render on sidebar changes
const user = useAppStore((state) => state.user);
const setUser = useAppStore((state) => state.setUser);

// Subscribe to multiple slices
const { sidebarOpen, toggleSidebar } = useAppStore((state) => ({
  sidebarOpen: state.sidebarOpen,
  toggleSidebar: state.toggleSidebar,
}));`,
      note: "The persist proxy automatically saves/restores state from localStorage. Use shallow comparison when subscribing to objects to prevent unnecessary re-renders.",
    },
    pros: [
      "Minimal boilerplate — a store is just a function, no actions/reducers/dispatchers",
      "Granular subscriptions prevent unnecessary re-renders automatically",
      "No Provider wrapper needed — works outside React components too",
      "Built-in proxy: persist (localStorage), devtools (Redux DevTools), immer (mutations)",
      "Tiny bundle size (~3 kb gzipped)",
      "TypeScript support is excellent with full type inference",
      "Works seamlessly alongside server state solutions like TanStack Query",
    ],
    cons: [
      "No built-in time-travel debugging (Redux DevTools integration exists but is limited)",
      "For very large, complex state trees, Redux Toolkit's structure can be more maintainable",
      "Global mutable state can become hard to trace in large teams without conventions",
      "No native support for derived/computed state — selectors must be written manually",
    ],
    whenNot: "Don't use Zustand to store server data (API responses, database records) — that's TanStack Query's job. Also avoid it for state that only one component uses — useState is simpler and more appropriate for truly local state.",
  },
  {
    id: "tanstack",
    title: "TanStack Query",
    docs: "https://tanstack.com/query/latest/docs/framework/react/overview",
    tags: ["Server State", "Data Fetching", "Caching"],
    tagline: "Powerful asynchronous data management for React — handles fetching, caching, synchronization, and updates so you don't have to.",
    what: "TanStack Query (formerly React Query) is a server-state management library. It manages all the complexity around fetching, caching, synchronizing, and updating data from APIs or databases in React apps. It introduces the concept of 'server state' — data that lives on a server and must be fetched, can become stale, and must be refetched — as distinct from 'client state' (UI toggles, form inputs). It handles loading states, error states, background refetching, cache invalidation, pagination, and optimistic updates out of the box.",
    why: "Without TanStack Query, data fetching in React leads to repeated useEffect + useState boilerplate, race conditions on component unmount, no shared caching across components, manual loading/error handling in every component, and no automatic background sync. TanStack Query eliminates all of this. Two components that query the same data share a cache — only one network request is made. Data refetches automatically when the window regains focus. Mutations invalidate related queries and trigger refetches.",
    useCases: [
      { title: "API Data Fetching", desc: "Replace useEffect + useState fetch patterns with a single useQuery hook." },
      { title: "Shared Cache", desc: "Multiple components reading the same data share one cache entry — one request, many consumers." },
      { title: "Pagination / Infinite Scroll", desc: "usePaginatedQuery and useInfiniteQuery handle page-based and cursor-based loading." },
      { title: "Mutations", desc: "useMutation handles POST/PUT/DELETE requests with loading states and automatic cache invalidation." },
      { title: "Optimistic Updates", desc: "Update the UI immediately before the server responds, roll back on error." },
      { title: "Background Sync", desc: "Automatically refetch stale data when window refocuses or network reconnects." },
    ],
    install: [
      { label: "Install TanStack Query", cmd: "npm install @tanstack/react-query" },
      { label: "Install DevTools (optional)", cmd: "npm install @tanstack/react-query-devtools" },
      { label: "Wrap app in QueryClientProvider", cmd: "app/layout.tsx", note: "See code example below. The provider must wrap the component tree." },
    ],
    table: {
      title: "Key Hooks & Their Purpose",
      headers: ["Hook", "Purpose", "When to use"],
      rows: [
        ["useQuery", "Fetch and cache data", "Any GET request / data read"],
        ["useMutation", "Create, update, delete", "POST, PUT, PATCH, DELETE requests"],
        ["useInfiniteQuery", "Cursor/page-based loading", "Infinite scroll, load more"],
        ["useQueryClient", "Access the cache imperatively", "Manual invalidation, prefetching"],
        ["useSuspenseQuery", "Suspense-compatible fetching", "React Suspense boundaries"],
        ["prefetchQuery", "Prefetch on server (SSR)", "Next.js server components + hydration"],
      ],
    },
    codeExample: {
      title: "Sample Code",
      lang: "typescript",
      code: `// app/providers.tsx — Wrap your app
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,      // Data stays fresh for 60s
        refetchOnWindowFocus: true, // Refetch when tab regains focus
        retry: 2,                   // Retry failed requests twice
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

// ─── Fetching data ────────────────────────────────────────
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Post { id: number; title: string; }

function usePosts() {
  return useQuery<Post[]>({
    queryKey: ["posts"],              // Cache key — shared across components
    queryFn: () =>
      fetch("/api/posts").then((r) => r.json()),
  });
}

// ─── Mutating data + invalidating cache ──────────────────
function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPost: Omit<Post, "id">) =>
      fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: { "Content-Type": "application/json" },
      }).then((r) => r.json()),

    onSuccess: () => {
      // Invalidate "posts" cache -> triggers automatic refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

// ─── Component usage ──────────────────────────────────────
function PostsList() {
  const { data: posts, isLoading, isError } = usePosts();
  const createPost = useCreatePost();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading posts.</p>;

  return (
    <>
      {posts?.map((p) => <div key={p.id}>{p.title}</div>)}
      <button onClick={() => createPost.mutate({ title: "New Post" })}>
        {createPost.isPending ? "Saving..." : "Add Post"}
      </button>
    </>
  );
}`,
      note: "queryKey is the cache identifier. Any two useQuery calls with the same queryKey share a cache entry. Changing the key (e.g., ['posts', userId]) creates a separate cache entry per user.",
    },
    pros: [
      "Eliminates useEffect + useState data fetching boilerplate entirely",
      "Automatic caching — multiple components share one request and one cache entry",
      "Background refetching on window focus, network reconnect, and configurable intervals",
      "Built-in loading, error, and success states on every query",
      "Optimistic updates with automatic rollback on error",
      "Powerful DevTools for inspecting cache state and query timings",
      "Works with any async function — fetch, Axios, Supabase, GraphQL, etc.",
    ],
    cons: [
      "Adds complexity for simple apps — useState + fetch is sufficient for single-use, non-cached data",
      "QueryClientProvider must wrap the component tree — requires 'use client' boundary in Next.js App Router",
      "Cache invalidation logic can become complex in large apps with many related queries",
      "SSR/hydration setup with Next.js App Router requires additional dehydration/rehydration steps",
      "Slight learning curve around staleTime, gcTime, and queryKey design",
    ],
    whenNot: "Don't use TanStack Query for client-side-only state (UI toggles, form values) — Zustand is better for that. In Next.js App Router, simple data fetching in Server Components (async/await fetch) may be sufficient without TanStack Query for read-only, non-interactive data.",
  },
];

const TechnologyList = () => {
  return (
    <div className="space-y-6 py-8">
      {/* Nav overview */}
      <Card className="bg-muted/30 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Stack Overview</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((t, i) => (
            <Button
              key={t.id}
              variant="outline"
              size="sm"
              asChild
              className="group h-8 gap-1.5 text-xs font-medium"
            >
              <a href={`#${t.id}`}>
                <span className="text-foreground group-hover:text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {t.title}
              </a>
            </Button>
          ))}
        </div>
      </Card>

      {/* Tech cards */}
      {technologies.map((tech, index) => (
        <div key={tech.id} id={tech.id} className="scroll-mt-6">
          <TechCard tech={tech} index={index} />
        </div>
      ))}
    </div>
  );
};

export default TechnologyList;