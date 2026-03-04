import FolderTree from "@/components/ui/FolderTree";
import { ChevronRight } from "lucide-react";

export default function LayoutSection() {
  return (
    <section id="layout" className="mt-16 scroll-mt-20 border-t pt-16">
      <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
        <div>Development Guide</div>
        <ChevronRight className="h-4 w-4" />
        <div className="font-medium text-foreground">Layout</div>
      </div>
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight">
        Layout &amp; Project Structure
      </h2>
      <p className="mt-4 leading-7">
        Visual representation of our project architecture and folder
        organization.
      </p>

      <FolderTree />

      <div className="mt-8 overflow-hidden rounded-lg border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50">
            <tr className="border-b">
              <th className="px-4 py-3 font-medium">Folder</th>
              <th className="px-4 py-3 font-medium">Purpose</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="px-4 py-3 font-mono text-xs">app/</td>
              <td className="px-4 py-3 text-muted-foreground">
                Main routing directory using App Router.
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs">(auth)/</td>
              <td className="px-4 py-3 text-muted-foreground">
                Authentication pages: Login, Signup, Reset Password
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs">actions/</td>
              <td className="px-4 py-3 text-muted-foreground">
                Server Actions — handles database operations
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs">components/</td>
              <td className="px-4 py-3 text-muted-foreground">
                Reusable UI components
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs">hooks/</td>
              <td className="px-4 py-3 text-muted-foreground">
                Custom React hooks
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
