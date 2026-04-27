"use client";

import { Trash2, Download, Upload } from "lucide-react";
import { useSystemStore } from "@/store/systemStore";

export default function Toolbar() {
  const { nodes, edges, clearCanvas, setNodes, setEdges } = useSystemStore();

  const exportDesign = () => {
    const data = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `system-design-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importDesign = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.nodes) setNodes(json.nodes);
        if (json.edges) setEdges(json.edges);
      } catch {
        alert("Invalid design file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-slate-700 shadow-2xl">
      <button
        onClick={() => {
          if (confirm("Clear entire design?")) clearCanvas();
        }}
        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
        title="Clear Canvas"
      >
        <Trash2 size={15} />
      </button>

      <div className="w-px h-4 bg-slate-700" />

      <button
        onClick={exportDesign}
        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
        title="Export Design"
      >
        <Download size={15} />
      </button>

      <label className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all cursor-pointer">
        <Upload size={15} />
        <input
          type="file"
          className="hidden"
          onChange={importDesign}
          accept=".json"
        />
      </label>
    </div>
  );
}
