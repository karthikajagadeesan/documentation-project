"use client";

import React, { useEffect, useState } from "react";
import type { Anchor } from "@/types/general-type";
import { cn } from "@/lib/utils";

interface OnThisPageProps {
  anchors: Anchor[];
}

const OnThisPage = ({ anchors }: OnThisPageProps) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            window.history.replaceState(null, "", `#${entry.target.id}`);
            window.dispatchEvent(new HashChangeEvent("hashchange"));
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    anchors.forEach((anchor) => {
      const element = document.getElementById(anchor.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [anchors]);

  if (anchors.length === 0) return null;

  return (
    <div className="hidden shrink-0 text-sm lg:block lg:w-48 xl:w-56">
      <div className="sticky top-0 h-full overflow-y-auto px-4 py-8">
        <h4 className="mb-4 font-medium leading-none uppercase tracking-wider text-muted-foreground text-[11px]">
          On this page
        </h4>
        <ul className="m-0 list-none space-y-2">
          {anchors.map((anchor) => (
            <li key={anchor.id} className="pt-0.5">
              <a
                href={`#${anchor.id}`}
                className={cn(
                  "inline-block no-underline transition-colors hover:text-foreground",
                  activeId === anchor.id
                    ? "font-medium text-primary"
                    : "text-muted-foreground"
                )}
              >
                {anchor.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OnThisPage;
