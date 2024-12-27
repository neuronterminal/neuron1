import React from 'react';
import { NeuralLink, NeuralNode } from '../types';

interface NetworkLinksProps {
  links: NeuralLink[];
  showWeights: boolean;
}

export function NetworkLinks({ links, showWeights }: NetworkLinksProps) {
  return (
    <g>
      {links.map((link, i) => {
        const source = link.source as unknown as NeuralNode;
        const target = link.target as unknown as NeuralNode;
        
        return (
          <line
            key={i}
            x1={source.x}
            y1={source.y}
            x2={target.x}
            y2={target.y}
            stroke="#00ff41"
            strokeOpacity={0.6}
            strokeWidth={Math.abs(link.weight) * 3}
          >
            {showWeights && (
              <title>Weight: {link.weight.toFixed(3)}</title>
            )}
          </line>
        );
      })}
    </g>
  );
}