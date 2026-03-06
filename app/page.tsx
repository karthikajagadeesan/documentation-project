import Navbar from "@/components/layout/Navbar";
import { requireAuth } from "@/lib/supabase/proxy";
import Link from "next/link";
import { Code, PenTool, SearchCheck, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

export default async function Home() {
  await requireAuth();

  const cards = [
    {
      title: "Development",
      description: "Technical stack, architecture, and project structure guide.",
      icon: Code,
      href: "/development",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Design",
      description: "UI/UX guidelines, design system, and ShadCN components.",
      icon: PenTool,
      href: "/design",
      color: "text-secondary-foreground",
      bg: "bg-secondary",
    },
    {
      title: "SEO",
      description: "Search engine optimization best practices and metadata.",
      icon: SearchCheck,
      href: "/seo",
      color: "text-accent-foreground",
      bg: "bg-accent",
    },
    {
      title: "HR",
      description: "Company policies, onboarding, and employee resources.",
      icon: Users,
      href: "/hr",
      color: "text-muted-foreground",
      bg: "bg-muted",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <Navbar />
      <main className="container mx-auto flex-1 px-4 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back. Select a module below to view its documentation and resources.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Link 
              key={card.title} 
              href={card.href}
              className="group"
            >
              <Card className="h-full group-hover:border-primary/50 transition-all shadow-sm group-hover:shadow-md flex flex-col justify-between p-6">
                <div>
                  <div className={`mb-4 inline-flex rounded-lg p-3 ${card.bg}`}>
                    <card.icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                  <h3 className="mb-2 font-semibold leading-none tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {card.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  View section &rarr;
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
