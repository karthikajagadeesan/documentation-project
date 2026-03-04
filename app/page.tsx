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

const anchors = [
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
    <div className="relative flex min-h-screen flex-col smooth-scroll">
      <Navbar />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)_200px] lg:grid-cols-[240px_minmax(0,1fr)_240px] md:gap-6 lg:gap-10 px-4 md:px-8">
        <Sidebar />

        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_0px]">
          <div className="mx-auto w-full min-w-0">
            <GettingStartedSection />
            <LayoutSection />
            <ComponentsSection />
            <TechnologySection />
            <ArchitectureSection />
            <ConclusionSection />
          </div>
        </main>

        <OnThisPage anchors={anchors} />
      </div>
    </div>
  );
}
