import TechnologyList from "@/components/TechnologyList";
import { ChevronRight } from "lucide-react";

export default function TechnologySection() {
  return (
    <section id="technology" className="mt-16 scroll-mt-20 border-t pt-16">
      <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
        <div>Development Guide</div>
        <ChevronRight className="h-4 w-4" />
        <div>Components</div>
        <ChevronRight className="h-4 w-4" />
        <div className="font-medium text-foreground">Technology</div>
      </div>
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight">
        Technology Stack
      </h2>
      <TechnologyList />
    </section>
  );
}
