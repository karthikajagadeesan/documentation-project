"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/actions/auth-actions";
import { LogOut, Search, Menu, ChevronDown, ArrowLeft } from "lucide-react";
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
  const [isDocDropdownOpen, setIsDocDropdownOpen] = useState(false);

  const documentRoutes = [
    { href: "/development", label: "Development Document" },
    { href: "/design", label: "Design Document" },
    { href: "/seo", label: "SEO Document" },
    { href: "/hr", label: "HR Document" },
  ];

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
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-navbar-gradient backdrop-blur supports-[backdrop-filter]:bg-navbar-gradient/60 py-2">
      <div className="container flex h-14 items-center px-4 md:px-8">
        <div className="flex items-center space-x-4">
          <Link href="/" className="ml-6 flex items-center space-x-2 shrink-0">
            <img
              src="/s22_logo.svg"
              alt="Logo"
              className="h-12 w-auto"
            />
          </Link>

          {!isHomePage && (
            <div className="hidden md:flex items-center space-x-2 ml-12">
              <Link 
                href="/"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              
              <div className="relative">
                <button
                  onClick={() => setIsDocDropdownOpen(!isDocDropdownOpen)}
                  onBlur={() => setTimeout(() => setIsDocDropdownOpen(false), 200)}
                  className="flex items-center space-x-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <span>{getTitle(pathname)}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isDocDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isDocDropdownOpen && (
                  <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-md border border-white/10 bg-[#160827]/95 p-1 backdrop-blur-md shadow-xl animate-in fade-in zoom-in-95 duration-200">
                    {documentRoutes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        className={`block rounded-sm px-3 py-2 text-sm transition-colors ${
                          pathname === route.href
                            ? "bg-primary text-white"
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                        onClick={() => setIsDocDropdownOpen(false)}
                      >
                        {route.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {isHomePage && (
            <span className="font-bold text-white ml-2">
              {getTitle(pathname)}
            </span>
          )}

          {/* {isHomePage && (
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium ml-4">
              <Link 
                href="/development" 
                className="transition-colors hover:text-white/80 text-white/60"
              >
                Documents
              </Link>
            </div>
          )} */}
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {!isHomePage && (
            <div className="relative w-full max-w-[200px] sm:max-w-none md:w-[200px] lg:w-[300px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60 z-10" />
              <Input
                type="search"
                placeholder="Search documentation..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                className="h-9 w-full pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/20"
              />

              {showDropdown && (
                <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-md border border-white/10 bg-navbar-to/95 backdrop-blur-md shadow-xl">
                  <div className="px-3 py-2">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                      Getting Started
                    </p>
                    <ul className="space-y-0.5">
                      {filtered.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`/development#${item.id}`}
                            className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-white hover:bg-white/10"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setFocused(false)}
                          >
                            <Search className="h-3.5 w-3.5 shrink-0 text-white/60" />
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
                  <Button variant="outline" size="icon" className="h-9 w-9 border-white/20 bg-white/10 text-white hover:bg-white/20">
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Toggle Sidebar</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] sm:w-[340px] p-0 flex flex-col border-none bg-sidebar-gradient">
                  <div className="px-6 py-5 md:hidden bg-navbar-gradient border-b border-white/10">
                    <SheetTitle className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                      <Menu className="h-5 w-5" />
                      Navigation
                    </SheetTitle>
                  </div>
                  <Sidebar className="w-full flex-1 border-none bg-transparent" onLinkClick={() => setIsMobileMenuOpen(false)} />
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
  const [userInitial, setUserInitial] = useState<string>("U");

  React.useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        const name = data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || "User";
        setUserName(name);
        setUserInitial(name.charAt(0).toUpperCase());
      } else {
        setUserName("Sign Out");
      }
    };
    fetchUser();
  }, []);

  return (
    <Button
      variant="ghost"
      onClick={() => startTransition(() => signOut())}
      disabled={isPending}
      className={`h-9 justify-start gap-3 text-white hover:bg-white/10 hover:text-white px-2 ${className || ""}`}
      title="Sign Out"
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-lg">
        {userInitial}
      </div>
      <span className="truncate text-xs font-medium">{userName}</span>
      <LogOut className={`h-4 w-4 shrink-0 opacity-50 ${isPending ? "animate-pulse" : ""}`} />
      <span className="sr-only">Sign Out</span>
    </Button>
  );
}

export default Navbar;
