"use client";

import React from "react";
import { Folder, File, ChevronRight, ChevronDown } from "lucide-react";

interface TreeNodeProps {
  name: string;
  type: "folder" | "file";
  ext?: "ts" | "tsx" | "sql" | "json" | "md" | "js" | "env";
  children?: TreeNodeProps[];
  level?: number;
}

const FILE_COLORS: Record<string, string> = {
  tsx: "text-primary",
  ts: "text-primary/80",
  sql: "text-accent-foreground",
  json: "text-secondary-foreground",
  md: "text-muted-foreground",
  js: "text-foreground",
  env: "text-destructive",
};

const TreeNode = ({ name, type, ext, children, level = 0 }: TreeNodeProps) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const fileColor = ext
    ? FILE_COLORS[ext] ?? "text-muted-foreground"
    : "text-muted-foreground";

  return (
    <div className="select-none">
      <div
        className="flex items-center gap-1.5 py-[3px] px-2 hover:bg-muted/60 rounded-sm cursor-pointer transition-colors group"
        onClick={() => type === "folder" && setIsOpen(!isOpen)}
        style={{ paddingLeft: `${level * 1.25 + 0.5}rem` }}
      >
        {type === "folder" ? (
          <>
            <span className="text-muted-foreground/60 w-3.5">
              {isOpen ? (
                <ChevronDown className="h-3.5 w-3.5" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5" />
              )}
            </span>
            <Folder
              className={`h-4 w-4 shrink-0 ${
                isOpen
                  ? "text-primary fill-primary/20"
                  : "text-primary/70 fill-primary/10"
              }`}
            />
          </>
        ) : (
          <>
            <span className="w-3.5" />
            <File className={`h-4 w-4 shrink-0 ml-0 ${fileColor}`} />
          </>
        )}
        <span
          className={`text-sm font-mono ${
            type === "folder"
              ? "text-foreground/90 font-medium"
              : "text-foreground/70"
          }`}
        >
          {name}
        </span>
        {ext && (
          <span
            className={`text-[10px] font-mono ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${fileColor}`}
          >
            .{ext}
          </span>
        )}
      </div>

      {type === "folder" && isOpen && children && (
        <div className="border-l border-border/40 ml-[1.15rem]">
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
    name: "project-root",
    type: "folder",
    children: [
      { name: ".next", type: "folder", children: [] },
      { name: "app", type: "folder", children: [] },
      {
        name: "components",
        type: "folder",
        children: [
          { name: "global-provider", type: "folder" },
          { name: "profile", type: "folder" },
          { name: "settings", type: "folder" },
          { name: "sidebar", type: "folder" },
          {
            name: "ui",
            type: "folder",
            children: [
              { name: "empty-state.tsx", type: "file", ext: "tsx" },
              { name: "error-state.tsx", type: "file", ext: "tsx" },
              { name: "header.tsx", type: "file", ext: "tsx" },
              { name: "loading-state.tsx", type: "file", ext: "tsx" },
              { name: "logo.tsx", type: "file", ext: "tsx" },
            ],
          },
        ],
      },
      {
        name: "helpers",
        type: "folder",
        children: [
          { name: "domain-finder.ts", type: "file", ext: "ts" },
          { name: "role-gateway.tsx", type: "file", ext: "tsx" },
        ],
      },
      { name: "hooks", type: "folder", children: [] },
      {
        name: "lib",
        type: "folder",
        children: [{ name: "utils.ts", type: "file", ext: "ts" }],
      },
      { name: "node_modules", type: "folder", children: [] },
      { name: "public", type: "folder", children: [] },
      {
        name: "store",
        type: "folder",
        children: [
          { name: "superadmin", type: "folder", children: [] },
          { name: "user", type: "folder" },
        ],
      },
      {
        name: "supabase",
        type: "folder",
        children: [
          { name: "settings_schema.sql", type: "file", ext: "sql" },
        ],
      },
      {
        name: "type",
        type: "folder",
        children: [
          { name: "database-type.ts", type: "file", ext: "ts" },
          { name: "general-type.ts", type: "file", ext: "ts" },
        ],
      },
      {
        name: "utils",
        type: "folder",
        children: [
          {
            name: "supabase",
            type: "folder",
            children: [
              { name: "admin.ts", type: "file", ext: "ts" },
              { name: "client.ts", type: "file", ext: "ts" },
              { name: "index.ts", type: "file", ext: "ts" },
              { name: "proxy.ts", type: "file", ext: "ts" },
              { name: "server.ts", type: "file", ext: "ts" },
            ],
          },
        ],
      },
      { name: ".env.local", type: "file", ext: "env" },
      { name: ".gitignore", type: "file" },
      { name: "components.json", type: "file", ext: "json" },
      { name: "eslint.config.mjs", type: "file", ext: "js" },
      { name: "next-env.d.ts", type: "file", ext: "ts" },
      { name: "next.config.ts", type: "file", ext: "ts" },
      { name: "package-lock.json", type: "file", ext: "json" },
      { name: "package.json", type: "file", ext: "json" },
      { name: "postcss.config.mjs", type: "file", ext: "js" },
      { name: "proxy.ts", type: "file", ext: "ts" },
      { name: "README.md", type: "file", ext: "md" },
      { name: "todo.md", type: "file", ext: "md" },
      { name: "tsconfig.json", type: "file", ext: "json" },
    ],
  };

  return (
    <div className="not-prose my-6 rounded-lg border bg-muted/30 p-4 font-mono text-sm overflow-auto max-h-[480px]">
      <TreeNode {...structure} />
    </div>
  );
};

export default FolderTree;