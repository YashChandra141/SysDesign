"use client";

import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import DesignCanvas from "@/components/canvas/DesignCanvas";
import ComponentSidebar from "@/components/sidebar/ComponentSidebar";

export default function Home() {
  return (
    <ReactFlowProvider>
      <main className="flex w-screen h-screen bg-slate-950 overflow-hidden">
        <ComponentSidebar />
        <div className="flex-1 relative">
          <DesignCanvas />
        </div>
      </main>
    </ReactFlowProvider>
  );
}
