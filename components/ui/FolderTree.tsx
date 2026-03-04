"use client";

import React from "react";
import { Folder, File, ChevronRight, ChevronDown } from "lucide-react";

interface TreeNodeProps {
  name: string;
  type: "folder" | "file";
  children?: TreeNodeProps[];
  level?: number;
}

const TreeNode = ({ name, type, children, level = 0 }: TreeNodeProps) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="select-none">
      <div
        className="flex items-center gap-1.5 py-1 px-2 hover:bg-muted/50 rounded-sm cursor-pointer transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
      >
        {type === "folder" ? (
          <>
            <span className="text-muted-foreground/50">
              {isOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
            </span>
            <Folder className="h-4 w-4 text-primary/80 fill-primary/10" />
          </>
        ) : (
          <File className="h-4 w-4 text-muted-foreground ml-3.5" />
        )}
        <span className="text-sm font-mono">{name}</span>
      </div>
      {type === "folder" && isOpen && children && (
        <div>
          {children.map((child, index) => (
            <TreeNode key={index} {...child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const FolderTree = () => {
  const structure: TreeNodeProps = {
    name: "app",
    type: "folder",
    children: [
      {
        name: "(auth)",
        type: "folder",
        children: [
          { name: "login", type: "folder" },
          { name: "signup", type: "folder" },
          { name: "reset-password", type: "folder" },
        ],
      },
      {
        name: "(main)",
        type: "folder",
        children: [
          { name: "dashboard", type: "folder" },
          { name: "[feature modules]", type: "folder" },
        ],
      },
      { name: "actions", type: "folder" },
      { name: "api", type: "folder" },
      { name: "components", type: "folder" },
      { name: "helpers", type: "folder" },
      { name: "hooks", type: "folder" },
      { name: "lib", type: "folder" },
      { name: "store", type: "folder" },
      { name: "supabase", type: "folder" },
      { name: "type", type: "folder" },
      { name: "utils", type: "folder" },
      { name: "public", type: "folder" },
    ],
  };

  return (
    <div className="not-prose my-6 rounded-lg border bg-muted/30 p-4">
      <TreeNode {...structure} />
    </div>
  );
};

export default FolderTree;
