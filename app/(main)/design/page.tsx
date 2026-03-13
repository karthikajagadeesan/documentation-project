import Navbar from "@/components/layout/Navbar";
import { requireAuth } from "@/lib/supabase/proxy";
import { Card } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default async function DesignPage() {
  await requireAuth();

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <Navbar />
      <main className="container mx-auto flex-1 px-4 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Design Department</h1>
          <p className="text-muted-foreground mt-2">
            UI/UX guidelines, design system, and ShadCN components.
          </p>
        </div>
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/5 p-12 text-center">
          <div className="mb-4 rounded-full bg-primary/10 p-4">
            <Construction className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight">This section is currently under development</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-[420px]">
            We're currently building out the design guidelines and component libraries. Check back soon for updates!
          </p>
        </div>
      </main>
    </div>
  );
}
