"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";

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
    items: [
      { title: "Project Structure", href: "#layout" },
    ],
  },
  {
    title: "Components",
    href: "#components",
  },
  {
    title: "Technology",
    href: "#technology",
    items: [
      { title: "Next.js", href: "#technology" },
      { title: "Supabase", href: "#technology" },
      { title: "ShadCN", href: "#technology" },
      { title: "Zustand", href: "#technology" },
      { title: "TanStack Query", href: "#technology" },
    ],
  },
  {
    title: "Architecture Overview",
    href: "#architecture",
  },
  {
    title: "Conclusion",
    href: "#conclusion",
  },
];

const Sidebar = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    Layout: true,
    Components: true,
    Technology: true,
  });

  const toggleExpand = (title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block md:w-64 overflow-y-auto border-r px-4 py-6 md:px-8">
      <div className="w-full">
        <div className="space-y-4">
          {navItems.map((item) => (
            <div key={item.title} className="space-y-1">
              <div className="flex items-center">
                {item.items && (
                  <button
                    onClick={() => toggleExpand(item.title)}
                    className="mr-2 h-4 w-4 shrink-0 transition-transform duration-200"
                  >
                    {expanded[item.title] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                )}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex w-full items-center rounded-md px-2 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <span className="flex w-full cursor-default items-center rounded-md px-2 py-1 text-sm font-medium">
                    {item.title}
                  </span>
                )}
              </div>
              {item.items && expanded[item.title] && (
                <div className="ml-4 space-y-1 border-l pl-4">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.href || ""}
                      className="block rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
