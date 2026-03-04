import { ChevronRight } from "lucide-react";

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
      <p className="mt-4 leading-7">
        Reusable UI components are organized inside{" "}
        <code>components/ui/</code> using ShadCN.
      </p>
      <div className="mt-6 rounded-md border bg-zinc-950 p-6 text-zinc-50 font-mono text-sm leading-relaxed">
        <p>components/</p>
        <div className="pl-4">
          <p>└── ui/</p>
          <div className="pl-6 text-zinc-400">
            <p>├── button.tsx</p>
            <p>├── dialog.tsx</p>
            <p>├── card.tsx</p>
            <p>└── input.tsx</p>
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground italic">
        All components are built with Tailwind CSS + Radix UI via ShadCN. Fully
        customizable and accessible.
      </p>
    </section>
  );
}
