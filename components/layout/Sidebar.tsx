"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/actions/auth-actions";
import { createClient } from "@/lib/supabase/client";

interface NavItem {
  title: string;
  href?: string;
  items?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: "Getting Started",
    href: "#getting-started",
  },
  {
    title: "Layout",
    href: "#layout",
    items: [{ title: "Project Structure", href: "#project-structure" }],
  },
  {
    title: "Components",
    href: "#components",
  },
  {
    title: "Sample Code Structure",
    href: "#sample-code",
  },
  {
    title: "Technology",
    href: "#technology",
    items: [
      { title: "Next.js", href: "#nextjs" },
      { title: "Supabase", href: "#supabase" },
      { title: "ShadCN", href: "#shadcn" },
      { title: "Zustand", href: "#zustand" },
      { title: "TanStack Query", href: "#tanstack" },
    ],
  },
  {
    title: "Conclusion",
    href: "#conclusion",
  },
];

const Sidebar = ({ className, onLinkClick }: { className?: string; onLinkClick?: () => void }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [activeHref, setActiveHref] = useState<string>("");

  React.useEffect(() => {
    // Sync expanded state from localStorage
    const saved = localStorage.getItem("sidebar-expanded");
    if (saved) {
      try {
        setExpanded(JSON.parse(saved));
      } catch (e) {
        setExpanded({
          Layout: false,
          Components: true,
          Technology: false,
        });
      }
    } else {
      setExpanded({
        Layout: false,
        Components: true,
        Technology: false,
      });
    }
  }, []);

  React.useEffect(() => {
    setActiveHref(window.location.hash);
    const handleHashChange = () => setActiveHref(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const getIsActive = (href: string) => {
    if (activeHref === href) return true;
    
    if (href === "#getting-started") {
      return ["#technical-stack", "#frontend", "#backend", "#database"].includes(activeHref);
    }
    
    return false;
  };

  const toggleExpand = (title: string) => {
    setExpanded((prev) => {
      const newState = { ...prev, [title]: !prev[title] };
      localStorage.setItem("sidebar-expanded", JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <aside className={`flex w-56 shrink-0 flex-col overflow-hidden border-r bg-background ${className || ""}`}>
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="w-full space-y-4">
          {navItems.map((item) => (
            <div key={item.title} className="space-y-1">
              <div className="flex items-center">
                {item.items && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleExpand(item.title)}
                    className="mr-1 h-6 w-6 shrink-0"
                  >
                    {expanded[item.title] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                )}
                {!item.items && <div className="w-7 shrink-0" />}
                {item.href ? (
                  <Button
                    asChild
                    variant={getIsActive(item.href || "") ? "secondary" : "ghost"}
                    className="h-8 w-full justify-start px-2 py-1 text-sm font-medium"
                  >
                    <Link 
                      href={item.href} 
                      onClick={() => {
                        setActiveHref(item.href || "");
                        if (onLinkClick) onLinkClick();
                      }}
                    >
                      {item.title}
                    </Link>
                  </Button>
                ) : (
                  <span className="flex h-8 w-full cursor-default items-center px-2 py-1 text-sm font-medium">
                    {item.title}
                  </span>
                )}
              </div>
              {item.items && expanded[item.title] && (
                <div className="ml-5 space-y-1 border-l pl-4">
                  {item.items.map((subItem) => (
                    <Button
                      key={subItem.title}
                      asChild
                      variant={activeHref === subItem.href ? "secondary" : "ghost"}
                      className={`h-8 w-full justify-start px-2 py-1 text-sm ${
                        activeHref === subItem.href 
                          ? "text-foreground font-medium" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Link 
                        href={subItem.href ?? ""} 
                        onClick={() => {
                          setActiveHref(subItem.href ?? "");
                          if (onLinkClick) onLinkClick();
                        }}
                      >
                        {subItem.title}
                      </Link>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t p-4">
        <SignOutButton />
      </div>
    </aside>
  );
};

function SignOutButton() {
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
        setUserName("Sign Out");
      }
    };
    fetchUser();
  }, []);

  return (
    <Button
      variant="outline"
      className="w-full justify-between text-muted-foreground"
      onClick={() => startTransition(() => signOut())}
      disabled={isPending}
      title="Sign Out"
    >
      <span className="truncate">{userName}</span>
      <LogOut className={`ml-2 h-4 w-4 shrink-0 ${isPending ? "animate-pulse" : ""}`} />
    </Button>
  );
}

export default Sidebar;
