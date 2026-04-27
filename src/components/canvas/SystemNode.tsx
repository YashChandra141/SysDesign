"use client";

import { memo } from "react";
import { Handle, Position } from "reactflow";
import { motion } from "framer-motion";
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
import { cn } from "@/lib/utils";
import { NodeData } from "@/store/systemStore";

const iconComponents: Record<string, LucideIcon> = {
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

interface SystemNodeProps {
  data: NodeData;
  selected?: boolean;
}

const SystemNode = ({ data, selected }: SystemNodeProps) => {
  const Icon = iconComponents[data.iconName] || Server;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)]";
      case "warning":
        return "bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]";
      default:
        return "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]";
    }
  };

  const getBarColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-emerald-500";
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "relative px-4 py-3 rounded-xl border-2 min-w-[160px] text-center",
        "bg-slate-900/90 backdrop-blur-md transition-all duration-300",
        selected
          ? "border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          : "border-slate-700 hover:border-slate-600"
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-slate-400 border-2 border-slate-900 rounded-full"
      />

      <div className="flex flex-col items-center gap-2">
        <div
          className={cn(
            "p-2.5 rounded-lg transition-all duration-500 text-white",
            getStatusColor(data.status)
          )}
        >
          <Icon size={22} />
        </div>

        <div className="text-sm font-semibold text-slate-100">{data.label}</div>

        <div className="w-full mt-1">
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className={cn("h-full transition-all duration-500", getBarColor(data.status))}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(data.load * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-slate-500 font-mono">
              {Math.round(data.load * 100)}% LOAD
            </span>
            <span className="text-[10px] text-slate-600 font-mono">
              {data.currentRequests} req/s
            </span>
          </div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-slate-400 border-2 border-slate-900 rounded-full"
      />

      {data.status === "critical" && (
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="absolute inset-0 rounded-xl border-2 border-red-500 pointer-events-none"
        />
      )}
    </motion.div>
  );
};

export default memo(SystemNode);
