"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import SystemNode from "./SystemNode";
import TrafficEdge from "./TrafficEdge";
import SimulationControls from "./SimulationControls";
import DesignAnalyzer from "./DesignAnalyzer";
import Toolbar from "./Toolbar";
import { useSystemStore } from "@/store/systemStore";
import { useSimulationEngine } from "@/hooks/useSimulationEngine";
import { ComponentDefinition } from "@/lib/components";

const nodeTypes = {
  systemNode: SystemNode,
};

const edgeTypes = {
  trafficEdge: TrafficEdge,
};

export default function DesignCanvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const { addNode, addEdge } = useSystemStore();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Sync with store
  const storeNodes = useSystemStore((state) => state.nodes);
  const storeEdges = useSystemStore((state) => state.edges);

  useEffect(() => {
    setNodes(storeNodes as any);
  }, [storeNodes, setNodes]);

  useEffect(() => {
    setEdges(storeEdges as any);
  }, [storeEdges, setEdges]);

  useSimulationEngine();

  const onConnect = useCallback(
    (connection: Connection) => {
      if (connection.source && connection.target) {
        addEdge(connection.source, connection.target);
      }
    },
    [addEdge]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const data = event.dataTransfer.getData("application/json");
      if (!data || !reactFlowInstance) return;

      const component: ComponentDefinition = JSON.parse(data);
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNode(component, position);
    },
    [reactFlowInstance, addNode]
  );

  return (
    <div className="w-full h-full bg-slate-950" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        className="bg-slate-950"
        minZoom={0.2}
        maxZoom={4}
      >
        <Background color="#1e293b" gap={20} size={1} />
        <Controls className="bg-slate-900 border-slate-700 fill-slate-400" />

        <Panel position="top-right" className="m-4">
          <SimulationControls />
        </Panel>

        <Panel position="top-left" className="m-4 ml-[340px]">
          <Toolbar />
        </Panel>

        <Panel position="bottom-left" className="m-4 ml-[340px]">
          <DesignAnalyzer />
        </Panel>
      </ReactFlow>
    </div>
  );
}
