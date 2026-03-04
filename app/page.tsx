import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import OnThisPage from "@/components/layout/OnThisPage";
import { requireAuth } from "@/lib/supabase/proxy";
import GettingStartedSection from "@/components/home/GettingStartedSection";
import LayoutSection from "@/components/home/LayoutSection";
import ComponentsSection from "@/components/home/ComponentsSection";
import TechnologySection from "@/components/home/TechnologySection";
import ArchitectureSection from "@/components/home/ArchitectureSection";
import ConclusionSection from "@/components/home/ConclusionSection";
import type { Anchor } from "@/types/general-type";

const anchors: Anchor[] = [
  { id: "getting-started", title: "Getting Started" },
  { id: "technical-stack", title: "Technical Stack Overview" },
  { id: "frontend", title: "Frontend Technologies" },
  { id: "backend", title: "Backend Technologies" },
  { id: "database", title: "Database Layer" },
  { id: "layout", title: "Layout & Project Structure" },
  { id: "components", title: "Components" },
  { id: "technology", title: "Technology Stack" },
  { id: "architecture", title: "Architecture Overview" },
  { id: "conclusion", title: "Conclusion" },
];

export default async function Home() {
  await requireAuth();

  return (
    // Full viewport height, fixed navbar, nothing on body overflows
    <div className="flex h-screen flex-col overflow-hidden">
      <Navbar />

      {/* Content row — sits below the 56px navbar */}
      <div className="flex flex-1 overflow-hidden pt-14">

        {/* Left sidebar — fixed height, independently scrollable */}
        <Sidebar />

        {/* Center content — ONLY this area scrolls */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-4xl min-w-0 px-6 py-8">
            <GettingStartedSection />
            <LayoutSection />
            <ComponentsSection />
            <TechnologySection />
            <ArchitectureSection />
            <ConclusionSection />
          </div>
        </main>

        {/* Right TOC sidebar — fixed height, independently scrollable */}
        <OnThisPage anchors={anchors} />
      </div>
    </div>
  );
}
