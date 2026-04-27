"use client";

import { memo } from "react";
import { EdgeProps, getBezierPath } from "reactflow";
import { motion } from "framer-motion";

const TrafficEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}: EdgeProps & { data?: { traffic: number } }) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const traffic = data?.traffic || 0;
  const particleCount = Math.min(Math.ceil(traffic / 20), 8);
  const isOverloaded = traffic > 500;

  return (
    <>
      <path
        id={id}
        d={edgePath}
        className="fill-none transition-colors duration-500"
        style={{
          stroke: isOverloaded ? "#ef4444" : "#475569",
          strokeWidth: isOverloaded ? 3 : 2,
          opacity: 0.6,
        }}
      />

      {[...Array(particleCount)].map((_, i) => (
        <motion.circle
          key={`${id}-particle-${i}`}
          r={isOverloaded ? 3 : 2}
          fill={isOverloaded ? "#ef4444" : "#38bdf8"}
          initial={{ offsetDistance: "0%", opacity: 0 }}
          animate={{ offsetDistance: "100%", opacity: [0, 1, 0] }}
          transition={{
            duration: Math.max(1.5 - traffic / 500, 0.3),
            repeat: Infinity,
            ease: "linear",
            delay: (i / particleCount) * 2,
            opacity: {
              duration: Math.max(1.5 - traffic / 500, 0.3),
              repeat: Infinity,
              times: [0, 0.5, 1],
            },
          }}
          style={{
            offsetPath: `path("${edgePath}")`,
            offsetRotate: "auto",
          }}
        />
      ))}
    </>
  );
};

export default memo(TrafficEdge);
