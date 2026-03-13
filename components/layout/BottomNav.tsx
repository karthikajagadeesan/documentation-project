"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Code, PenTool, SearchCheck, Users } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/development", label: "Dev", icon: Code },
  { href: "/design", label: "Design", icon: PenTool },
  { href: "/seo", label: "SEO", icon: SearchCheck },
  { href: "/hr", label: "HR", icon: Users },
];

const BottomNav = () => {
  const pathname = usePathname();

  // Only show on mobile and only on documentation/home routes
  const isDocRoute = ["/", "/development", "/design", "/seo", "/hr"].includes(pathname);

  if (!isDocRoute) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full border-t border-white/10 bg-navbar-gradient backdrop-blur-lg safe-area-inset-bottom">
      <div className="grid h-16 grid-cols-5 items-center justify-items-center bg-black/20">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center h-full w-full transition-all duration-300 ${
                isActive 
                  ? "text-primary" 
                  : "text-white/50 hover:text-white"
              }`}
            >
              <div className="flex flex-col items-center">
                <Icon className={`h-6 w-6 mb-0.5 ${isActive ? "scale-110" : ""}`} />
                <span className="text-[9px] font-bold uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
              
              {isActive && (
                <div className="absolute top-0 h-1 w-10 rounded-b-full bg-primary shadow-[0_0_10px_rgba(236,26,87,0.5)]" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
