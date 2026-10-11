/**
 * @file components/ui/circuit.tsx
 * @description Shared "circuit" design primitives: decorative node clusters,
 * section headings and elbow connector paths.
 */

import React from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/* Elbow connector path                                                */
/* ------------------------------------------------------------------ */

type Point = { x: number; y: number };

/**
 * Builds an orthogonal (PCB-style) path between two points with rounded
 * bends. `axis` decides which direction the trace leaves `from`; `mid` is
 * where it turns (defaults to halfway), so sibling traces can avoid crossing.
 */
export function elbowPath(from: Point, to: Point, axis: 'x' | 'y' = 'x', mid?: number, radius = 12): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  if (Math.abs(dx) < 1 || Math.abs(dy) < 1) return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;

  const sx = Math.sign(dx);
  const sy = Math.sign(dy);

  if (axis === 'x') {
    const midX = mid ?? from.x + dx / 2;
    const r = Math.min(radius, Math.abs(midX - from.x), Math.abs(to.x - midX), Math.abs(dy) / 2);
    return [
      `M ${from.x} ${from.y}`,
      `H ${midX - sx * r}`,
      `Q ${midX} ${from.y} ${midX} ${from.y + sy * r}`,
      `V ${to.y - sy * r}`,
      `Q ${midX} ${to.y} ${midX + sx * r} ${to.y}`,
      `H ${to.x}`,
    ].join(' ');
  }

  const midY = mid ?? from.y + dy / 2;
  const r = Math.min(radius, Math.abs(midY - from.y), Math.abs(to.y - midY), Math.abs(dx) / 2);
  return [
    `M ${from.x} ${from.y}`,
    `V ${midY - sy * r}`,
    `Q ${from.x} ${midY} ${from.x + sx * r} ${midY}`,
    `H ${to.x - sx * r}`,
    `Q ${to.x} ${midY} ${to.x} ${midY + sy * r}`,
    `V ${to.y}`,
  ].join(' ');
}

/** A trace with a static line and an animated signal pulse on top. */
export function Trace({ d, active = true, highlight = false, className }: { d: string; active?: boolean; highlight?: boolean; className?: string }) {
  return (
    <g className={className}>
      <path
        d={d}
        fill="none"
        stroke={highlight ? 'var(--brand-blue)' : 'var(--trace)'}
        strokeWidth={highlight ? 2 : 1.5}
        className="transition-[stroke] duration-300"
      />
      {active && (
        <path
          d={d}
          fill="none"
          stroke="url(#circuit-gradient)"
          strokeWidth={2}
          strokeLinecap="round"
          className="trace-pulse"
        />
      )}
    </g>
  );
}

/** Gradient definition shared by every trace inside an SVG. */
export function CircuitDefs() {
  return (
    <defs>
      <linearGradient id="circuit-gradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="var(--brand-cyan)" />
        <stop offset="100%" stopColor="var(--brand-violet)" />
      </linearGradient>
    </defs>
  );
}

/* ------------------------------------------------------------------ */
/* Decorative node cluster (the "constellation" in section corners)   */
/* ------------------------------------------------------------------ */

const CLUSTER_NODES: Point[] = [
  { x: 20, y: 40 }, { x: 60, y: 18 }, { x: 105, y: 30 }, { x: 140, y: 12 },
  { x: 38, y: 82 }, { x: 82, y: 66 }, { x: 128, y: 70 }, { x: 170, y: 48 },
  { x: 16, y: 120 }, { x: 62, y: 112 }, { x: 108, y: 118 }, { x: 150, y: 104 },
  { x: 40, y: 150 }, { x: 92, y: 156 }, { x: 138, y: 148 },
];

const CLUSTER_EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 5], [2, 6], [3, 7], [6, 7],
  [4, 5], [5, 6], [4, 8], [4, 9], [5, 9], [6, 10], [6, 11], [7, 11],
  [8, 9], [9, 10], [10, 11], [8, 12], [9, 12], [9, 13], [10, 13], [10, 14], [11, 14], [12, 13], [13, 14],
];

export function NodeCluster({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 190 170"
      aria-hidden="true"
      className={cn('pointer-events-none select-none text-brand-blue', className)}
    >
      {CLUSTER_EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={CLUSTER_NODES[a].x}
          y1={CLUSTER_NODES[a].y}
          x2={CLUSTER_NODES[b].x}
          y2={CLUSTER_NODES[b].y}
          stroke="currentColor"
          strokeOpacity={0.35}
          strokeWidth={0.8}
        />
      ))}
      {CLUSTER_NODES.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={i % 4 === 0 ? 3 : 2} fill="currentColor" fillOpacity={0.7} />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading                                                     */
/* ------------------------------------------------------------------ */

interface SectionHeadingProps {
  index: string;
  label: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ index, label, title, description, align = 'left', className }: SectionHeadingProps) {
  return (
    <div className={cn('space-y-4', align === 'center' && 'text-center mx-auto', className)}>
      <div className={cn('flex items-center gap-3 font-mono text-xs tracking-[0.25em] uppercase text-brand-cyan', align === 'center' && 'justify-center')}>
        <span className="text-muted-foreground">{index}</span>
        <span className="h-px w-10 bg-gradient-to-r from-brand-cyan to-transparent" />
        <span>{label}</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">{title}</h2>
      {description && (
        <p className={cn('text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      )}
    </div>
  );
}
