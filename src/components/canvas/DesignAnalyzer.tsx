"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Award, ShieldAlert, TrendingUp, Zap } from "lucide-react";
import { useSystemStore } from "@/store/systemStore";
import { cn } from "@/lib/utils";

interface ScoreBarProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  colorClass: string;
  barColor: string;
}

function ScoreBar({ label, value, icon, colorClass, barColor }: ScoreBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-[11px]">
        <div className={cn("flex items-center gap-1.5 font-medium", colorClass)}>
          {icon}
          <span>{label}</span>
        </div>
        <span className="text-slate-400 font-mono">{Math.round(value)}%</span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className={cn("h-full", barColor)}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function DesignAnalyzer() {
  const { nodes, edges } = useSystemStore();

  const scores = useMemo(() => {
    if (nodes.length === 0) {
      return { scalability: 0, reliability: 0, performance: 0, bottlenecks: 0 };
    }

    let scalability = 50;
    let reliability = 50;
    let performance = 50;
    let bottlenecks = 0;

    // Analyze nodes
    nodes.forEach((node) => {
      if (node.data.status === "critical") bottlenecks++;

      // Scalability boosts
      if (
        node.data.label.includes("Load Balancer") ||
        node.data.label.includes("Message Queue") ||
        node.data.label.includes("NoSQL")
      ) {
        scalability += 10;
      }

      if (node.data.label.includes("CDN") || node.data.label.includes("Cache")) {
        performance += 15;
      }
    });

    // Reliability: check for redundancy
    const counts: Record<string, number> = {};
    nodes.forEach((n) => {
      counts[n.data.label] = (counts[n.data.label] || 0) + 1;
    });
    const redundantTypes = Object.values(counts).filter((c) => c > 1).length;
    reliability += redundantTypes * 15;

    // Bottleneck penalty
    const penalty = bottlenecks * 20;

    return {
      scalability: Math.min(100, Math.max(0, scalability - penalty)),
      reliability: Math.min(100, Math.max(0, reliability - penalty)),
      performance: Math.min(100, Math.max(0, performance - penalty)),
      bottlenecks,
    };
  }, [nodes]);

  return (
    <div className="w-80 p-6 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-700 shadow-2xl">
      <div className="flex items-center gap-2 mb-5">
        <Award size={20} className="text-yellow-400" />
        <span className="text-sm font-bold text-white">Design Analysis</span>
      </div>

      <div className="space-y-4">
        <ScoreBar
          label="Scalability"
          value={scores.scalability}
          icon={<TrendingUp size={14} />}
          colorClass="text-blue-400"
          barColor="bg-blue-500"
        />
        <ScoreBar
          label="Reliability"
          value={scores.reliability}
          icon={<ShieldAlert size={14} />}
          colorClass="text-emerald-400"
          barColor="bg-emerald-500"
        />
        <ScoreBar
          label="Performance"
          value={scores.performance}
          icon={<Zap size={14} />}
          colorClass="text-yellow-400"
          barColor="bg-yellow-500"
        />
      </div>

      <div
        className={cn(
          "mt-5 p-3 rounded-lg text-center text-xs font-medium",
          scores.bottlenecks > 0
            ? "bg-red-500/20 text-red-400 border border-red-500/30"
            : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
        )}
      >
        {scores.bottlenecks > 0
          ? `⚠️ ${scores.bottlenecks} bottleneck(s) detected!`
          : "✅ Design meets scalability requirements"}
      </div>
    </div>
  );
}
