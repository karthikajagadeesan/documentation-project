import { ChevronRight, Info } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const componentGroups = [
  {
    folder: "components/layout/",
    label: "Layout Shell",
    description:
      "Persistent chrome rendered once at the root layout level — wraps every page.",
    color: "border-t-primary",
    items: [
      {
        name: "Navbar.tsx",
        usage: "Rendered in app/layout.tsx at the top of every route.",
        note: "Contains logo, nav links, and the user avatar dropdown.",
      },
      {
        name: "Sidebar.tsx",
        usage: "Rendered in app/layout.tsx alongside the main content area.",
        note: "Collapsible navigation tree, persists open/close state via Zustand.",
      },
    ],
  },
  {
    folder: "components/auth/",
    label: "Auth Forms",
    description:
      "Self-contained forms that handle their own validation and Supabase calls — import and place anywhere.",
    color: "border-t-primary/80",
    items: [
      {
        name: "LoginForm.tsx",
        usage: "<LoginForm />  — drop inside any page or modal.",
        note: "Calls supabase.auth.signInWithPassword, shows inline errors.",
      },
      {
        name: "SignupForm.tsx",
        usage: "<SignupForm />  — drop inside any page or modal.",
        note: "Calls supabase.auth.signUp, handles email confirmation flow.",
      },
    ],
  },
  {
    folder: "components/ (custom)",
    label: "Custom Primitives",
    description:
      "Project-specific components that follow the same atomic pattern as ShadCN but are built in-house.",
    color: "border-t-primary/60",
    items: [
      {
        name: "empty-state.tsx",
        usage: '<EmptyState title="No results" description="Try a different filter." />',
        note: "Shown when a list or table has zero rows.",
      },
      {
        name: "error-state.tsx",
        usage: "<ErrorState message={error.message} />",
        note: "Full-area error fallback with retry button slot.",
      },
      {
        name: "loading-state.tsx",
        usage: "<LoadingState />",
        note: "Centered spinner — used inside Suspense boundaries.",
      },
      {
        name: "header.tsx",
        usage: '<Header title="Settings" description="Manage your account." />',
        note: "Page-level heading block with optional description and action slot.",
      },
    ],
  },
  {
    folder: "components/ui/",
    label: "UI Primitives",
    description:
      "Atomic, stateless building blocks. Each file is a single ShadCN component — drop it in, style it with Tailwind, done.",
    color: "border-t-primary/40",
    items: [
      {
        name: "button.tsx",
        usage: "<Button variant='outline' size='sm'>Save</Button>",
        note: "Variants: default, outline, ghost, destructive, link.",
      },
      {
        name: "input.tsx",
        usage: "<Input placeholder='Email address' />",
        note: "Pairs with Label and FormMessage for accessible forms.",
      },
      {
        name: "dialog.tsx",
        usage: "<Dialog><DialogTrigger /><DialogContent /></Dialog>",
        note: "Focus-trapped modal powered by Radix Dialog primitive.",
      },
      {
        name: "card.tsx",
        usage: "<Card><CardHeader /><CardContent /></Card>",
        note: "Composable card with header, content, and footer slots.",
      },
    ],
  },
];

const reusePatterns = [
  {
    title: "Variant props",
    description:
      "Pass a variant prop to change the visual style without touching the component source. ShadCN uses class-variance-authority (CVA) internally.",
    example: `<Button variant="destructive">Delete</Button>\n<Button variant="outline">Cancel</Button>`,
  },
  {
    title: "Slot composition",
    description:
      "Compound components (Card, Dialog, Table) expose named sub-components as slots. Use only the slots you need — leave the rest out.",
    example: `<Card>\n  <CardHeader>\n    <CardTitle>Revenue</CardTitle>\n  </CardHeader>\n  <CardContent>...</CardContent>\n</Card>`,
  },
];

export default function ComponentsSection() {
  return (
    <section id="components" className="mt-16 scroll-mt-20 border-t pt-16">
      <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
        <div>Development Guide</div>
        <ChevronRight className="h-4 w-4" />
        <div className="font-medium text-foreground">Components</div>
      </div>

      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight">
        Components
      </h2>
      <p className="mt-4 leading-7 text-muted-foreground">
        Every UI piece lives in{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono text-foreground">
          components/
        </code>{" "}
        and is grouped by role — primitives, layout shell, auth forms, and
        custom in-house atoms. All primitives follow the{" "}
        <strong className="text-foreground">ShadCN pattern</strong>: one file,
        one component, Tailwind + Radix under the hood, fully accessible out of
        the box.
      </p>

      <div className="mt-10 space-y-6">
        {componentGroups.map(({ folder, label, description, color, items }) => (
          <Card
            key={folder}
            className={`overflow-hidden border-t-2 ${color}`}
          >
            <CardHeader className="bg-muted/30 px-5 py-4 space-y-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {label}
              </p>
              <CardTitle className="mt-0.5 text-sm font-mono font-semibold text-foreground">
                {folder}
              </CardTitle>
              <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
            </CardHeader>

            <CardContent className="p-0 divide-y border-t">
              {items.map(({ name, usage, note }) => (
                <div
                  key={name}
                  className="grid grid-cols-1 gap-2 px-5 py-4 hover:bg-muted/20 transition-colors sm:grid-cols-[160px_1fr]"
                >
                  <code className="self-start text-xs font-mono font-semibold text-primary pt-0.5">
                    {name}
                  </code>
                  
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <div className="relative group/copy">
                      <code className="block rounded-md bg-muted px-3 py-1.5 text-xs font-mono text-foreground leading-relaxed whitespace-pre pr-10">
                        {usage}
                      </code>
                      <div className="absolute right-1.5 top-1.5 opacity-0 group-hover/copy:opacity-100 transition-opacity">
                        <CopyButton text={usage} />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{note}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <div id="reuse" className="mt-16 scroll-mt-20">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Reuse &amp; Customization Patterns
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Four patterns cover virtually every customization scenario — from a
          one-line style tweak to a full domain wrapper.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {reusePatterns.map(({ title, description, example }) => (
            <Card
              key={title}
              className="flex flex-col gap-3 p-5"
            >
              <h4 className="font-semibold text-foreground">{title}</h4>
              <p className="text-sm text-muted-foreground">{description}</p>
              <div className="relative group/copy mt-auto">
                <pre className="overflow-x-auto rounded-md bg-muted px-4 py-3 text-xs font-mono text-foreground leading-relaxed whitespace-pre pr-12">
                  {example}
                </pre>
                <div className="absolute right-2 top-2 opacity-0 group-hover/copy:opacity-100 transition-opacity">
                  <CopyButton text={example} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="mt-10 bg-muted/30 p-5 border-none shadow-none">
        <div className="flex items-center gap-2 mb-2">
          <Info className="h-4 w-4 text-primary" />
          <p className="text-sm font-semibold text-foreground">
            Convention
          </p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Never modify a ShadCN component file directly. If you need a
          persistent style change, wrap it in a new component inside{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground font-medium">
            components/ui/
          </code>{" "}
          and export from there. This keeps upstream upgrades painless and your
          customizations traceable.
        </p>
      </Card>
    </section>
  );
}
