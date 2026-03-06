import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const architectureItems = [
  { label: "Frontend", value: "Next.js" },
  { label: "Backend", value: "Supabase" },
  { label: "Database", value: "PostgreSQL" },
  { label: "Auth", value: "Supabase Auth" },
  { label: "Storage", value: "Supabase Storage" },
  { label: "Realtime", value: "Supabase Realtime" },
  { label: "Server Logic", value: "Edge Functions" },
] as const;

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="mt-16 scroll-mt-20 border-t pt-16">
      <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
        <div>Development Guide</div>
        <ChevronRight className="h-4 w-4" />
        <div className="font-medium text-foreground">Architecture Overview</div>
      </div>
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight">
        Architecture Overview
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {architectureItems.map((item) => (
          <Card
            key={item.label}
            className="flex flex-col items-center text-center p-4"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground line-clamp-1">
              {item.label}
            </span>
            <span className="mt-1 text-lg font-medium">→ {item.value}</span>
          </Card>
        ))}
      </div>
    </section>
  );
}
