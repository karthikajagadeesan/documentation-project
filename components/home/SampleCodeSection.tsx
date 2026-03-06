import { ChevronRight, Github, Folder, File } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SampleCodeSection() {
  return (
    <section id="sample-code" className="mt-16 scroll-mt-20 border-t pt-16">
      <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
        <div>Development Guide</div>
        <ChevronRight className="h-4 w-4" />
        <div className="font-medium text-foreground">Sample Code Structure</div>
      </div>

      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight text-foreground">
        Sample Code Structure
      </h2>
      <p className="mt-4 leading-7 text-muted-foreground">
        The complete project boilerplate and sample code can be found in our
        official GitHub repository. This structure follows the Next.js App Router 
        conventions and best practices for modular, scalable applications.
      </p>

      <div className="mt-8">
        <Button asChild className="gap-2">
          <a 
            href="https://github.com/karthikajagadeesan/code-structure.git" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </a>
        </Button>
      </div>

      <Card className="mt-10 bg-muted/40 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Folder className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground tracking-tight">Project Blueprint</h3>
        </div>
        
        <div className="space-y-4 font-mono text-[13px] leading-tight">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-foreground font-medium">
              <Folder className="h-4 w-4 text-muted-foreground" />
              <span>app/</span>
            </div>
            <div className="ml-6 space-y-2 border-l border-border pl-4">
              <div className="flex items-center gap-2">
                <Folder className="h-4 w-4 text-muted-foreground/60" />
                <span className="text-muted-foreground">(main)/</span>
                <span className="text-xs text-muted-foreground/50 italic ml-2">// Grouped UI Routes</span>
              </div>
              <div className="ml-4 space-y-1 border-l border-border/60 pl-4">
                <div className="flex items-center gap-2 text-muted-foreground/80">
                  <Folder className="h-4 w-4 text-muted-foreground/40" />
                  <span>development/</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground/80">
                  <Folder className="h-4 w-4 text-muted-foreground/40" />
                  <span>design/</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Folder className="h-4 w-4 text-muted-foreground/60" />
                <span>actions/</span>
                <span className="text-xs text-muted-foreground/50 italic ml-2">// Server-side Logic</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <File className="h-4 w-4 text-muted-foreground/60" />
                <span>layout.tsx</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground/80">
                <File className="h-4 w-4 text-muted-foreground/40" />
                <span>page.tsx</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-foreground font-medium">
              <Folder className="h-4 w-4 text-muted-foreground" />
              <span>components/</span>
            </div>
            <div className="ml-6 space-y-2 border-l border-border pl-4">
              <div className="flex items-center gap-2 text-muted-foreground/80">
                <Folder className="h-4 w-4 text-muted-foreground/40" />
                <span>ui/</span>
                <span className="text-xs text-muted-foreground/50 italic ml-2">// Atomic Shadcn Primitives</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground/80">
                <Folder className="h-4 w-4 text-muted-foreground/40" />
                <span>layout/</span>
                <span className="text-xs text-muted-foreground/50 italic ml-2">// Shell Architecture</span>
              </div>
              <div className="flex items-center gap-2 text-primary font-medium">
                <Folder className="h-4 w-4 text-primary" />
                <span>home/</span>
                <span className="text-xs text-muted-foreground/50 italic ml-2">// Section Components</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-foreground font-medium">
              <Folder className="h-4 w-4 text-muted-foreground" />
              <span>lib/</span>
              <span className="text-xs text-muted-foreground/50 italic ml-2">// Infrastructure & Config</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-foreground font-medium">
              <Folder className="h-4 w-4 text-muted-foreground" />
              <span>types/</span>
              <span className="text-xs text-muted-foreground/50 italic ml-2">// Shared Interfaces</span>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
