"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/actions/auth-actions";
import { LogOut, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import Sidebar from "@/components/layout/Sidebar";
import { createClient } from "@/lib/supabase/client";

const gettingStartedLinks = [
  { id: "getting-started", label: "Getting Started" },
  { id: "technical-stack", label: "Technical Stack Overview" },
  { id: "frontend", label: "Frontend Technologies" },
  { id: "backend", label: "Backend Technologies" },
  { id: "database", label: "Database Layer" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getTitle = (path: string) => {
    switch (path) {
      case "/":
        return "Home";
      case "/development":
        return "Development Document";
      case "/design":
        return "Design Document";
      case "/seo":
        return "SEO Document";
      case "/hr":
        return "HR Document";
      default:
        return "Portal";
    }
  };

  const filtered = gettingStartedLinks.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const showDropdown = focused && filtered.length > 0;
  const isHomePage = pathname === "/";

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:px-8">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="font-bold">
              {getTitle(pathname)}
            </span>
          </Link>
          {isHomePage && (
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link 
                href="/development" 
                className="transition-colors hover:text-foreground/80 text-foreground/60 data-[active=true]:text-foreground"
              >
                Documents
              </Link>
            </div>
          )}
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {!isHomePage && (
            <div className="relative w-full max-w-[200px] sm:max-w-none md:w-[200px] lg:w-[300px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
              <Input
                type="search"
                placeholder="Search documentation..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                className="h-9 w-full pl-9"
              />

              {showDropdown && (
                <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-md border bg-popover shadow-md">
                  <div className="px-3 py-2">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Getting Started
                    </p>
                    <ul className="space-y-0.5">
                      {filtered.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`/development#${item.id}`}
                            className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setFocused(false)}
                          >
                            <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {!isHomePage && (
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Toggle Sidebar</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] sm:w-[340px] p-0 flex flex-col">
                  <div className="border-b px-4 py-4 md:hidden">
                    <SheetTitle className="text-lg font-semibold tracking-tight">Navigation</SheetTitle>
                  </div>
                  <Sidebar className="w-full flex-1 border-none" onLinkClick={() => setIsMobileMenuOpen(false)} />
                </SheetContent>
              </Sheet>
            </div>
          )}

          <SignOutButton className={isHomePage ? "flex" : "hidden"} />
        </div>
      </div>
    </nav>
  );
};

function SignOutButton({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  const [userName, setUserName] = useState<string>("Loading...");

  React.useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        const name = data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || "User";
        setUserName(name);
      } else {
        setUserName("");
      }
    };
    fetchUser();
  }, []);

  return (
    <Button
      variant="outline"
      onClick={() => startTransition(() => signOut())}
      disabled={isPending}
      className={`h-9 px-3 gap-2 ${className || ""}`}
      title="Sign Out"
    >
      <span className="max-w-[100px] truncate sm:max-w-[150px]">{userName}</span>
      <LogOut className={`h-4 w-4 shrink-0 ${isPending ? "animate-pulse" : ""}`} />
      <span className="sr-only">Sign Out</span>
    </Button>
  );
}

export default Navbar;
