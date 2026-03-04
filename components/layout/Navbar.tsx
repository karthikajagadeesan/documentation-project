"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { signOut } from "@/actions/auth-actions";
import { LogOut, Search } from "lucide-react";

const gettingStartedLinks = [
  { id: "getting-started", label: "Getting Started" },
  { id: "technical-stack", label: "Technical Stack Overview" },
  { id: "frontend", label: "Frontend Technologies" },
  { id: "backend", label: "Backend Technologies" },
  { id: "database", label: "Database Layer" },
];

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const filtered = gettingStartedLinks.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const showDropdown = focused && filtered.length > 0;

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:px-8">
        {/* Brand */}
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
            <span className="hidden font-bold sm:inline-block">
              Development Guide
            </span>
          </Link>
        </div>

        {/* Search + Actions */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* Search with Getting Started dropdown */}
          <div className="relative w-full md:w-[200px] lg:w-[300px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search documentation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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
                          href={`#${item.id}`}
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

          <SignOutButton />
        </div>
      </div>
    </nav>
  );
};

function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => signOut())}
      disabled={isPending}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
      title="Sign Out"
    >
      <LogOut className={`h-4 w-4 ${isPending ? "animate-pulse" : ""}`} />
      <span className="sr-only">Sign Out</span>
    </button>
  );
}

export default Navbar;
