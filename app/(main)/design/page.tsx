import Navbar from "@/components/layout/Navbar";
import { requireAuth } from "@/lib/supabase/proxy";
import { Card, CardContent } from "@/components/ui/card";

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
        <Card className="p-8">
          <CardContent className="p-0">
            <p className="text-muted-foreground">This section is currently under development.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
