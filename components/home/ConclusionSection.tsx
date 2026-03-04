import { ChevronRight } from "lucide-react";

export default function ConclusionSection() {
  return (
    <section id="conclusion" className="mt-16 scroll-mt-20 border-t pt-24 pb-24">
      <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
        <div>Development Guide</div>
        <ChevronRight className="h-4 w-4" />
        <div className="font-medium text-foreground">Conclusion</div>
      </div>
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight">
        Conclusion
      </h2>
      <p className="mt-4 leading-7">
        This document explains the foundation of our project. By following these
        patterns, we ensure a scalable, maintainable, and premium user
        experience.
      </p>
      <ul className="mt-6 list-disc pl-6 space-y-2 text-muted-foreground">
        <li>Technical stack overview</li>
        <li>Next.js full development setup</li>
        <li>Supabase complete backend features</li>
        <li>ShadCN design system usage</li>
      </ul>
    </section>
  );
}
