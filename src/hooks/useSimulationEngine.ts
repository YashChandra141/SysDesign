"use client";

import { useEffect, useRef } from "react";
import { useSystemStore, SystemNode, SystemEdge } from "@/store/systemStore";
import { COMPONENT_LIBRARY } from "@/lib/components";

export function useSimulationEngine() {
  const {
    nodes,
    edges,
    isSimulating,
    trafficVolume,
    updateNodeLoad,
    updateEdgeTraffic,
  } = useSystemStore();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isSimulating) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      if (nodes.length === 0 || edges.length === 0) return;

      // Find entry nodes (nodes with no incoming edges)
      const targetIds = new Set(edges.map((e) => e.target));
      const entryNodeIds = nodes
        .filter((n) => !targetIds.has(n.id))
        .map((n) => n.id);

      if (entryNodeIds.length === 0) return;

      // Base traffic per entry node
      const baseTraffic = 100 * trafficVolume;
      const trafficPerEntry = baseTraffic / entryNodeIds.length;

      const nodeTraffic = new Map<string, number>();
      const nodeOutgoingEdges = new Map<string, string[]>();

      // Initialize entry nodes
      entryNodeIds.forEach((id) => {
        nodeTraffic.set(id, trafficPerEntry);
      });

      // Build edge map
      edges.forEach((edge) => {
        const existing = nodeOutgoingEdges.get(edge.source) || [];
        existing.push(edge.id);
        nodeOutgoingEdges.set(edge.source, existing);
      });

      // Propagate traffic through graph (BFS)
      const queue = [...entryNodeIds];
      const visited = new Set<string>();

      while (queue.length > 0) {
        const currentId = queue.shift()!;
        if (visited.has(currentId)) continue;
        visited.add(currentId);

        const currentTraffic = nodeTraffic.get(currentId) || 0;
        const outgoingEdgeIds = nodeOutgoingEdges.get(currentId) || [];

        if (outgoingEdgeIds.length > 0) {
          const trafficPerEdge = currentTraffic / outgoingEdgeIds.length;

          outgoingEdgeIds.forEach((edgeId) => {
            const edge = edges.find((e) => e.id === edgeId);
            if (!edge) return;

            // Update edge traffic
            updateEdgeTraffic(edgeId, trafficPerEdge);

            // Accumulate traffic at target
            const targetTraffic = nodeTraffic.get(edge.target) || 0;
            nodeTraffic.set(edge.target, targetTraffic + trafficPerEdge);

            if (!visited.has(edge.target)) {
              queue.push(edge.target);
            }
          });
        }
      }

      // Calculate load and status for each node
      nodes.forEach((node) => {
        const traffic = nodeTraffic.get(node.id) || 0;
        const compDef = COMPONENT_LIBRARY.find(
          (c) => c.label === node.data.label
        );
        const capacity = compDef ? compDef.baseCapacity : 1000;

        const load = Math.min(traffic / capacity, 1.5);

        let status: "healthy" | "warning" | "critical" = "healthy";
        if (load > 0.9) status = "critical";
        else if (load > 0.6) status = "warning";

        updateNodeLoad(node.id, load, status);
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    isSimulating,
    nodes,
    edges,
    trafficVolume,
    updateNodeLoad,
    updateEdgeTraffic,
  ]);

  return null;
}
