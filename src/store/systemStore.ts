import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ComponentDefinition } from "@/lib/components";

export interface NodeData {
  label: string;
  iconName: string;
  load: number;
  status: "healthy" | "warning" | "critical";
  capacity: number;
  currentRequests: number;
}

export interface EdgeData {
  traffic: number;
  latency: number;
}

export interface SystemNode {
  id: string;
  type: "systemNode";
  position: { x: number; y: number };
  data: NodeData;
}

export interface SystemEdge {
  id: string;
  source: string;
  target: string;
  type: "trafficEdge";
  data: EdgeData;
}

interface SystemStore {
  nodes: SystemNode[];
  edges: SystemEdge[];
  isSimulating: boolean;
  trafficVolume: number;
  setNodes: (nodes: SystemNode[] | ((prev: SystemNode[]) => SystemNode[])) => void;
  setEdges: (edges: SystemEdge[] | ((prev: SystemEdge[]) => SystemEdge[])) => void;
  addNode: (component: ComponentDefinition, position: { x: number; y: number }) => void;
  addEdge: (source: string, target: string) => void;
  removeNode: (id: string) => void;
  removeEdge: (id: string) => void;
  setSimulation: (status: boolean) => void;
  setTrafficVolume: (volume: number) => void;
  updateNodeLoad: (
    nodeId: string,
    load: number,
    status: "healthy" | "warning" | "critical"
  ) => void;
  updateEdgeTraffic: (edgeId: string, traffic: number) => void;
  clearCanvas: () => void;
}

export const useSystemStore = create<SystemStore>()(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      isSimulating: false,
      trafficVolume: 1,

      setNodes: (nodes) =>
        set((state) => ({
          nodes: typeof nodes === "function" ? nodes(state.nodes) : nodes,
        })),

      setEdges: (edges) =>
        set((state) => ({
          edges: typeof edges === "function" ? edges(state.edges) : edges,
        })),

      addNode: (component, position) => {
        const newNode: SystemNode = {
          id: `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: "systemNode",
          position,
          data: {
            label: component.label,
            iconName: component.iconName,
            load: 0,
            status: "healthy",
            capacity: component.baseCapacity,
            currentRequests: 0,
          },
        };
        set((state) => ({ nodes: [...state.nodes, newNode] }));
      },

      addEdge: (source, target) => {
        const id = `edge_${source}_${target}_${Date.now()}`;
        const newEdge: SystemEdge = {
          id,
          source,
          target,
          type: "trafficEdge",
          data: { traffic: 0, latency: 0 },
        };
        set((state) => ({ edges: [...state.edges, newEdge] }));
      },

      removeNode: (id) => {
        set((state) => ({
          nodes: state.nodes.filter((n) => n.id !== id),
          edges: state.edges.filter((e) => e.source !== id && e.target !== id),
        }));
      },

      removeEdge: (id) => {
        set((state) => ({
          edges: state.edges.filter((e) => e.id !== id),
        }));
      },

      setSimulation: (status) => set({ isSimulating: status }),
      setTrafficVolume: (volume) => set({ trafficVolume: volume }),

      updateNodeLoad: (nodeId, load, status) => {
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === nodeId
              ? { ...node, data: { ...node.data, load, status } }
              : node
          ),
        }));
      },

      updateEdgeTraffic: (edgeId, traffic) => {
        set((state) => ({
          edges: state.edges.map((edge) =>
            edge.id === edgeId
              ? { ...edge, data: { ...edge.data, traffic } }
              : edge
          ),
        }));
      },

      clearCanvas: () => set({ nodes: [], edges: [] }),
    }),
    {
      name: "system-design-storage",
      partialize: (state) => ({ nodes: state.nodes, edges: state.edges }),
    }
  )
);
