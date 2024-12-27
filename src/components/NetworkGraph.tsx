import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { NetworkData } from '../types';

interface NetworkGraphProps {
  data: NetworkData;
}

export function NetworkGraph({ data }: NetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const width = 600;
  const height = 400;

  useEffect(() => {
    if (!svgRef.current) return;

    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(d => (d as any).id))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const updateGraph = () => {
      if (svgRef.current) {
        // Force re-render by dispatching custom event
        svgRef.current.dispatchEvent(new CustomEvent('update'));
      }
    };

    simulation.on('tick', updateGraph);

    return () => {
      simulation.stop();
    };
  }, [data]);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full"
    />
  );
}
