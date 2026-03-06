import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import OnThisPage from "@/components/layout/OnThisPage";
import { requireAuth } from "@/lib/supabase/proxy";
import GettingStartedSection from "@/components/home/GettingStartedSection";
import LayoutSection from "@/components/home/LayoutSection";
import ComponentsSection from "@/components/home/ComponentsSection";
import SampleCodeSection from "@/components/home/SampleCodeSection";
import TechnologySection from "@/components/home/TechnologySection";
import ConclusionSection from "@/components/home/ConclusionSection";
import type { Anchor } from "@/types/general-type";

const anchors: Anchor[] = [
  { id: "getting-started", title: "Getting Started" },
  { id: "technical-stack", title: "Technical Stack Overview" },
  { id: "frontend", title: "Frontend Technologies" },
  { id: "backend", title: "Backend Technologies" },
  { id: "database", title: "Database Layer" },
  { id: "layout", title: "Layout" },
  { id: "project-structure", title: "Project Structure" },
  { id: "components", title: "Components" },
  { id: "sample-code", title: "Sample Code Structure" },
  { id: "technology", title: "Technology Stack" },
  { id: "conclusion", title: "Conclusion" },
];

export default async function DevelopmentGuide() {
  await requireAuth();

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden pt-14">
        <Sidebar className="hidden md:flex" />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto  min-w-0 px-6 py-8">
            <GettingStartedSection />
            <LayoutSection />
            <ComponentsSection />
            <SampleCodeSection />
            <TechnologySection />
            <ConclusionSection />
          </div>
        </main>
        <OnThisPage anchors={anchors} />
      </div>
    </div>
  );
}
