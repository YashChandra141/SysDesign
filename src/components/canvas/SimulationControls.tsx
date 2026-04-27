"use client";

import { Play, Pause, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useSystemStore } from "@/store/systemStore";
import { cn } from "@/lib/utils";

export default function SimulationControls() {
  const {
    isSimulating,
    setSimulation,
    trafficVolume,
    setTrafficVolume,
  } = useSystemStore();

  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-700 shadow-2xl w-72">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={15} className="text-blue-400" />
          <span className="text-sm font-bold text-white">Simulation</span>
        </div>
        <button
          onClick={() => setSimulation(!isSimulating)}
          className={cn(
            "p-2 rounded-lg transition-all duration-200",
            isSimulating
              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
              : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
          )}
        >
          {isSimulating ? <Pause size={15} /> : <Play size={15} />}
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-[11px] text-slate-400 uppercase tracking-wider">
          <span>Traffic Volume</span>
          <span className="text-blue-400 font-mono">
            {Math.round(trafficVolume * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={trafficVolume}
          onChange={(e) => setTrafficVolume(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      <div className="pt-4 border-t border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>Healthy - Normal load</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <span>Warning - High load</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span>Critical - Bottleneck</span>
        </div>
      </div>
    </div>
  );
}
