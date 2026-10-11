/**
 * @file components/features/ai-chatbot/robot.tsx
 * @description Robot avatar that opens the chat. It rests in the bottom-right corner and
 * flies into the "Ask my bot" section (the element with id BOT_SLOT_ID) while that section
 * is on screen, then flies back when the visitor scrolls away.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export const BOT_SLOT_ID = 'bot-slot';

/* The robot is drawn at a fixed base size and scaled with transforms (no layout per frame) */
const BASE_W = 280;
const BASE_H = Math.round((BASE_W * 280) / 240);
export const BOT_ASPECT = '240 / 280';

export function RobotSvg({ className }: { className?: string }) {
  return (
    <svg viewBox='0 0 240 280' className={className} aria-hidden='true'>
      <defs>
        <linearGradient id='bot-body' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='var(--brand-blue)' />
          <stop offset='100%' stopColor='var(--brand-violet)' />
        </linearGradient>
        <radialGradient id='bot-eye' cx='0.5' cy='0.5' r='0.5'>
          <stop offset='0%' stopColor='white' />
          <stop offset='100%' stopColor='var(--brand-cyan)' />
        </radialGradient>
      </defs>
      {/* antenna */}
      <line x1='140' y1='42' x2='140' y2='70' stroke='var(--brand-violet)' strokeWidth='4' strokeLinecap='round' />
      <circle cx='140' cy='36' r='9' fill='var(--brand-cyan)' className='animate-pulse' />
      {/* head */}
      <rect x='72' y='68' width='136' height='104' rx='44' fill='url(#bot-body)' />
      <rect x='88' y='90' width='104' height='58' rx='29' fill='#0b1030' />
      <g className='bot-eyes'>
        <ellipse cx='122' cy='119' rx='11' ry='13' fill='url(#bot-eye)' />
        <ellipse cx='160' cy='119' rx='11' ry='13' fill='url(#bot-eye)' />
      </g>
      {/* ears */}
      <rect x='62' y='104' width='14' height='32' rx='7' fill='var(--brand-violet)' />
      <rect x='204' y='104' width='14' height='32' rx='7' fill='var(--brand-violet)' />
      {/* body */}
      <path d='M100 180 Q140 170 180 180 L172 232 Q140 244 108 232 Z' fill='url(#bot-body)' />
      <circle cx='140' cy='204' r='8' fill='var(--brand-cyan)' opacity='0.9' />
      {/* arms */}
      <path d='M100 188 Q78 200 80 222' stroke='var(--brand-blue)' strokeWidth='12' strokeLinecap='round' fill='none' />
      <path d='M180 188 Q204 176 210 154' stroke='var(--brand-violet)' strokeWidth='12' strokeLinecap='round' fill='none' />
      {/* hover shadow */}
      <ellipse cx='140' cy='266' rx='46' ry='8' fill='var(--brand-cyan)' opacity='0.25' />
    </svg>
  );
}

type Box = { x: number; y: number; w: number };

function dockBox(): Box {
  const small = window.innerWidth < 768;
  const w = small ? 58 : 64;
  const h = (w * BASE_H) / BASE_W;
  return { x: window.innerWidth - w - 16, y: window.innerHeight - h - (small ? 14 : 10), w };
}

interface RobotLauncherProps {
  onClick: () => void;
  hidden: boolean;
  label: string;
  hello: string;
}

export function RobotLauncher({ onClick, hidden, label, hello }: RobotLauncherProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [staged, setStaged] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let cur: Box | null = null;
    let inSection = false;
    let locked = false; // true once the robot has landed in the section: it then tracks scroll exactly
    let tilt = 0;

    const tick = () => {
      const vh = window.innerHeight;
      let target = dockBox();
      let wantSection = false;

      const slot = document.getElementById(BOT_SLOT_ID);
      if (slot) {
        const r = slot.getBoundingClientRect();
        if (r.width > 0 && r.top < vh * 0.72 && r.bottom > vh * 0.28) {
          wantSection = true;
          target = { x: r.left, y: r.top, w: r.width };
        }
      }

      if (wantSection !== inSection) {
        inSection = wantSection;
        locked = false;
        setStaged(wantSection);
      }

      if (!cur) cur = { ...target };
      const dx = target.x - cur.x;
      const dy = target.y - cur.y;
      const dw = target.w - cur.w;
      if (inSection && Math.abs(dx) < 1.5 && Math.abs(dy) < 1.5 && Math.abs(dw) < 1.5) locked = true;

      const k = reduceMotion || locked ? 1 : 0.085;
      const stepX = dx * k;
      cur = { x: cur.x + stepX, y: cur.y + dy * k, w: cur.w + dw * k };

      // Lean into the direction of flight
      const wantTilt = locked || reduceMotion ? 0 : Math.max(-14, Math.min(14, stepX * 0.6));
      tilt += (wantTilt - tilt) * 0.15;

      const s = cur.w / BASE_W;
      const offX = (BASE_W * (1 - s)) / 2;
      const offY = (BASE_H * (1 - s)) / 2;
      el.style.transform = `translate3d(${cur.x - offX}px, ${cur.y - offY}px, 0) scale(${s}) rotate(${tilt}deg)`;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <button
      ref={ref}
      type='button'
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        'group fixed top-0 left-0 z-40 origin-center cursor-pointer outline-none transition-opacity duration-300',
        hidden ? 'pointer-events-none opacity-0' : 'opacity-100'
      )}
      style={{ width: BASE_W, height: BASE_H, transform: 'translate3d(-9999px, 0, 0)' }}
    >
      <span
        className={cn(
          'glass-panel absolute -top-2 left-0 z-10 rounded-2xl rounded-bl-none px-4 py-2 text-lg font-bold transition-all duration-500',
          staged ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        )}
      >
        <span className='text-gradient'>{hello}</span>
      </span>
      <span className='float-y block h-full w-full'>
        <RobotSvg className='h-full w-full drop-shadow-[0_10px_30px_rgba(124,77,255,0.45)] transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105' />
      </span>
    </button>
  );
}
