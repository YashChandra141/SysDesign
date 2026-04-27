"use client";

import { COMPONENT_LIBRARY } from "@/lib/components";
import {
  Server,
  Database,
  Cpu,
  Zap,
  Globe,
  Layers,
  ArrowLeftRight,
  Activity,
  Network,
  Brain,
  Table,
  Search,
  GitBranch,
  HardDrive,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Server,
  Database,
  Cpu,
  Zap,
  Globe,
  Layers,
  ArrowLeftRight,
  Activity,
  Network,
  Brain,
  Table,
  Search,
  GitBranch,
  HardDrive,
};

export default function ComponentSidebar() {
  const onDragStart = (event: React.DragEvent, component: any) => {
    event.dataTransfer.setData("application/json", JSON.stringify(component));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-80 h-full bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 p-6 flex flex-col gap-6 overflow-y-auto">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          SysDesign
        </h1>
        <p className="text-xs text-slate-400">
          Drag components to build your architecture
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Infrastructure
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {COMPONENT_LIBRARY.filter((c) => c.category === "infrastructure").map(
              (comp) => {
                const Icon = iconMap[comp.iconName] || Server;
                return (
                  <div
                    key={comp.type}
                    draggable
                    onDragStart={(e) => onDragStart(e, comp)}
                    className="group flex items-center gap-3 p-3 rounded-xl border border-slate-800 bg-slate-800/40 cursor-grab active:cursor-grabbing hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-200"
                  >
                    <div className="p-1.5 rounded-lg bg-slate-900 text-blue-400 group-hover:text-blue-300 transition-colors">
                      <Icon size={15} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-200 group-hover:text-white">
                        {comp.label}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {comp.description}
                      </span>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            AI & ML
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {COMPONENT_LIBRARY.filter((c) => c.category === "ai").map((comp) => {
              const Icon = iconMap[comp.iconName] || Server;
              return (
                <div
                  key={comp.type}
                  draggable
                  onDragStart={(e) => onDragStart(e, comp)}
                  className="group flex items-center gap-3 p-3 rounded-xl border border-slate-800 bg-slate-800/40 cursor-grab active:cursor-grabbing hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-200"
                >
                  <div className="p-1.5 rounded-lg bg-slate-900 text-purple-400 group-hover:text-purple-300 transition-colors">
                    <Icon size={15} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-200 group-hover:text-white">
                      {comp.label}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {comp.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
        <p className="text-[11px] text-blue-300 leading-relaxed">
          💡 <strong>Tip:</strong> Connect components to simulate traffic flow.
          Watch for bottlenecks (red glow) under high load!
        </p>
      </div>
    </div>
  );
}
