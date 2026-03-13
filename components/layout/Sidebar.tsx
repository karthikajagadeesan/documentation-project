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
    const handleHashChange = () => {
      const hash = window.location.hash;
      setActiveHref(hash);
      
      // Auto-expand parent if hash matches a sub-item
      navItems.forEach(item => {
        if (item.items?.some(sub => sub.href === hash)) {
          setExpanded(prev => ({ ...prev, [item.title]: true }));
        }
      });
    };

    window.addEventListener("hashchange", handleHashChange);

    // Scroll-based active section detection
    const observer = new IntersectionObserver(
      (entries) => {
        // Collect all intersecting IDs
        const intersectingIds = entries
          .filter(entry => entry.isIntersecting)
          .map(entry => `#${entry.target.id}`);

        if (intersectingIds.length > 0) {
          // Find if any of the intersecting IDs is a sub-item
          let targetHref = intersectingIds[0];
          
          // Heuristic: If multiple are intersecting, prefer sub-items (they are "deeper")
          // or just pick the one that is closest to the top of the viewport
          for (const id of intersectingIds) {
            const isSubItem = navItems.some(item => item.items?.some(sub => sub.href === id));
            if (isSubItem) {
              targetHref = id;
              break; 
            }
          }

          setActiveHref(targetHref);

          // Auto-expand parent of the active section
          navItems.forEach(item => {
            if (item.href === targetHref || item.items?.some(sub => sub.href === targetHref)) {
              setExpanded(prev => {
                if (prev[item.title]) return prev; // Avoid unnecessary state updates
                return { ...prev, [item.title]: true };
              });
            }
          });
        }
      },
      { 
        threshold: [0, 0.1, 0.5, 1.0], 
        rootMargin: "-20% 0px -60% 0px" // Focus on the upper-middle part of the viewport
      }
    );

    // Get all potential IDs from navItems
    const ids = navItems.flatMap(item => [
      item.href?.replace("#", ""),
      ...(item.items?.map(sub => sub.href?.replace("#", "")) || [])
    ]).filter(Boolean);

    // Initial observer connection with a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      ids.forEach(id => {
        const element = document.getElementById(id!);
        if (element) observer.observe(element);
      });
    }, 100);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      observer.disconnect();
      clearTimeout(timer);
    };
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
    <aside className={`flex w-56 shrink-0 flex-col overflow-hidden bg-sidebar-gradient ${className || ""}`}>
      <div className="flex-1 overflow-y-auto px-4 py-8 custom-scrollbar">
        <div className="w-full space-y-4">
          {navItems.map((item) => (
            <div key={item.title} className="space-y-1">
              <div className="flex items-center">
                {item.items && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleExpand(item.title)}
                    className="mr-1 h-6 w-6 shrink-0 text-white hover:bg-white/10"
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
                    variant="ghost"
                    className={`h-8 w-full justify-start px-2 py-1 text-sm font-medium transition-colors ${
                      getIsActive(item.href || "") 
                        ? "bg-white/20 text-white" 
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
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
                  <span className="flex h-8 w-full cursor-default items-center px-2 py-1 text-sm font-medium text-white/70">
                    {item.title}
                  </span>
                )}
              </div>
              {item.items && expanded[item.title] && (
                <div className="ml-5 space-y-1 border-l border-white/10 pl-4">
                  {item.items.map((subItem) => (
                    <Button
                      key={subItem.title}
                      asChild
                      variant="ghost"
                      className={`h-8 w-full justify-start px-2 py-1 text-sm transition-colors ${
                        activeHref === subItem.href 
                          ? "bg-white/20 text-white font-medium shadow-sm" 
                          : "text-white/60 hover:text-white hover:bg-white/10"
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
      <div className="border-t border-white/10 p-4">
        <SignOutButton />
      </div>
    </aside>
  );
};

function SignOutButton() {
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
      className="w-full justify-start gap-3 text-white/80 hover:bg-white/10 hover:text-white px-2"
      onClick={() => startTransition(() => signOut())}
      disabled={isPending}
      title="Sign Out"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-[12px] font-bold text-white shadow-lg">
        {userInitial}
      </div>
      <span className="truncate text-xs font-medium">{userName}</span>
      <LogOut className={`ml-auto h-3.5 w-3.5 shrink-0 opacity-50 ${isPending ? "animate-pulse" : ""}`} />
    </Button>
  );
}

export default Sidebar;
