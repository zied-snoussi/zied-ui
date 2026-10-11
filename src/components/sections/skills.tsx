'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Fade } from '@/components/shared';
import { SkillsList } from '@/data/skills';
import { projectsData } from '@/data/projects';
import { CircuitDefs, NodeCluster, SectionHeading, Trace, elbowPath } from '@/components/ui/circuit';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/* Board geometry (viewBox units). Slots are ordered so traces never   */
/* cross: outer slots turn closer to the chip than inner ones.         */
/* ------------------------------------------------------------------ */

const BOARD = { w: 640, h: 460 };
const CHIP = { x: 260, y: 190, w: 120, h: 80 };

type Slot = { at: { x: number; y: number }; from: { x: number; y: number }; axis: 'x' | 'y'; mid?: number };

const SLOTS: Slot[] = [
    // top
    { at: { x: 240, y: 50 }, from: { x: 300, y: 190 }, axis: 'y', mid: 140 },
    { at: { x: 400, y: 50 }, from: { x: 340, y: 190 }, axis: 'y', mid: 140 },
    // sides (straight)
    { at: { x: 140, y: 230 }, from: { x: 260, y: 230 }, axis: 'x' },
    { at: { x: 500, y: 230 }, from: { x: 380, y: 230 }, axis: 'x' },
    // bottom
    { at: { x: 240, y: 410 }, from: { x: 300, y: 270 }, axis: 'y', mid: 320 },
    { at: { x: 400, y: 410 }, from: { x: 340, y: 270 }, axis: 'y', mid: 320 },
    // outer top
    { at: { x: 120, y: 50 }, from: { x: 275, y: 190 }, axis: 'y', mid: 165 },
    { at: { x: 520, y: 50 }, from: { x: 365, y: 190 }, axis: 'y', mid: 165 },
    // outer sides
    { at: { x: 50, y: 140 }, from: { x: 260, y: 212 }, axis: 'x', mid: 205 },
    { at: { x: 590, y: 140 }, from: { x: 380, y: 212 }, axis: 'x', mid: 435 },
    { at: { x: 50, y: 320 }, from: { x: 260, y: 248 }, axis: 'x', mid: 205 },
    { at: { x: 590, y: 320 }, from: { x: 380, y: 248 }, axis: 'x', mid: 435 },
    // outer bottom
    { at: { x: 120, y: 410 }, from: { x: 275, y: 270 }, axis: 'y', mid: 295 },
    { at: { x: 520, y: 410 }, from: { x: 365, y: 270 }, axis: 'y', mid: 295 },
];

const CATEGORIES = [
    { id: 1, key: 'frontend' },
    { id: 2, key: 'backend' },
    { id: 3, key: 'ai' },
    { id: 5, key: 'devops' },
    { id: 4, key: 'cloud' },
] as const;

const pct = (v: number, total: number) => `${(v / total) * 100}%`;
const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

export default function Skills() {
    const t = useTranslations('Skills');
    const [categoryId, setCategoryId] = useState<number>(2);
    const [inspected, setInspected] = useState<string | null>(null);

    // How many projects use each skill (project tags like "Next.js 14" match "Next.js")
    const usage = useMemo(() => {
        const projectSkills = projectsData.flatMap((g) => g.data.map((p) => p.skills.map(normalize)));
        const counts = new Map<string, number>();
        for (const skill of SkillsList) {
            const pattern = new RegExp(`^${normalize(skill.name)}\\d*$`);
            counts.set(skill.name, projectSkills.filter((tags) => tags.some((tag) => pattern.test(tag))).length);
        }
        return counts;
    }, []);
    const maxUsage = Math.max(1, ...usage.values());

    const skills = useMemo(
        () =>
            // Core skills stay on the board first, then the rest by project usage
            SkillsList.filter((s) => s.categoryId === categoryId).sort(
                (a, b) => Number(!!b.core) - Number(!!a.core) || (usage.get(b.name) ?? 0) - (usage.get(a.name) ?? 0)
            ),
        [categoryId, usage]
    );
    const onBoard = skills.slice(0, SLOTS.length);
    const overflow = skills.slice(SLOTS.length);

    const active = skills.find((s) => s.name === inspected) ?? skills[0];
    const activeCount = active ? usage.get(active.name) ?? 0 : 0;
    const categoryKey = CATEGORIES.find((c) => c.id === categoryId)?.key ?? 'backend';
    const categoryName = t(`categories.${categoryKey}.name`);

    return (
        <section id='skills' className='relative overflow-x-clip px-6 py-28 lg:px-20'>
            <div className='glow-blob bottom-0 -left-32 h-[380px] w-[380px] bg-brand-violet/70' />
            <NodeCluster className='absolute left-10 bottom-10 hidden w-40 opacity-40 lg:block' />

            <div className='relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center'>
                {/* Controls + inspector */}
                <div className='space-y-8 lg:col-span-4'>
                    <Fade bottom delay={100}>
                        <SectionHeading index='05' label={t('title')} title={t('techDescription')} description={t('circuitHint')} />
                    </Fade>

                    <Fade bottom delay={200}>
                        <div className='flex flex-wrap gap-2' role='tablist' aria-label={t('categoryLabel')}>
                            {CATEGORIES.map((c) => (
                                <button
                                    key={c.id}
                                    type='button'
                                    role='tab'
                                    aria-selected={categoryId === c.id}
                                    onClick={() => {
                                        setCategoryId(c.id);
                                        setInspected(null);
                                    }}
                                    className={cn(
                                        'flex items-center gap-2 rounded-lg border px-3 py-2 font-mono text-xs transition-all',
                                        categoryId === c.id
                                            ? 'border-brand-blue bg-brand-blue/15 text-foreground shadow-md shadow-brand-blue/20'
                                            : 'border-border bg-card/50 text-muted-foreground hover:border-brand-blue/50 hover:text-foreground'
                                    )}
                                >
                                    <span className={cn('h-1.5 w-1.5 rounded-full', categoryId === c.id ? 'bg-brand-cyan' : 'bg-trace')} />
                                    {t(`categories.${c.key}.name`)}
                                </button>
                            ))}
                        </div>
                    </Fade>

                    {active && (
                        <Fade bottom delay={300}>
                            <div className='glass-panel rounded-xl p-5' aria-live='polite'>
                                <div className='flex items-center gap-4'>
                                    <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue/15 text-2xl text-brand-blue'>
                                        {active.icon}
                                    </div>
                                    <div className='min-w-0 font-mono text-sm'>
                                        <p className='truncate'>
                                            <span className='text-muted-foreground'>{t('skillLabel')}: </span>
                                            <span className='text-brand-cyan'>{active.name}</span>
                                        </p>
                                        <p className='truncate'>
                                            <span className='text-muted-foreground'>{t('categoryLabel')}: </span>
                                            {categoryName}
                                        </p>
                                    </div>
                                </div>
                                <div className='mt-4 space-y-2'>
                                    <div className='flex justify-between font-mono text-xs text-muted-foreground'>
                                        <span>{t('projectsLabel')}</span>
                                        <span className='text-foreground'>{activeCount}</span>
                                    </div>
                                    <div className='h-1.5 overflow-hidden rounded-full bg-muted'>
                                        <div
                                            className='h-full rounded-full bg-gradient-brand transition-[width] duration-500'
                                            style={{ width: `${Math.max(6, (activeCount / maxUsage) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    )}
                </div>

                {/* Circuit board */}
                <div className='lg:col-span-8'>
                    <Fade bottom delay={200}>
                        <div className='relative mx-auto w-full max-w-[720px]' style={{ aspectRatio: `${BOARD.w} / ${BOARD.h}` }}>
                            <svg viewBox={`0 0 ${BOARD.w} ${BOARD.h}`} className='absolute inset-0 h-full w-full' aria-hidden='true'>
                                <CircuitDefs />
                                {onBoard.map((skill, i) => {
                                    const slot = SLOTS[i];
                                    return (
                                        <Trace
                                            key={`${categoryId}-${skill.name}`}
                                            d={elbowPath(slot.from, slot.at, slot.axis, slot.mid)}
                                            highlight={active?.name === skill.name}
                                        />
                                    );
                                })}
                                {/* Chip */}
                                <rect x={CHIP.x} y={CHIP.y} width={CHIP.w} height={CHIP.h} rx={12} fill='var(--card)' stroke='url(#circuit-gradient)' strokeWidth={2} />
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <g key={i}>
                                        <rect x={CHIP.x + 14 + i * 22} y={CHIP.y - 6} width={6} height={6} rx={1} fill='var(--trace)' />
                                        <rect x={CHIP.x + 14 + i * 22} y={CHIP.y + CHIP.h} width={6} height={6} rx={1} fill='var(--trace)' />
                                    </g>
                                ))}
                                <text x={CHIP.x + CHIP.w / 2} y={CHIP.y + 36} textAnchor='middle' className='fill-foreground font-mono' fontSize={20} fontWeight={700}>
                                    ZS
                                </text>
                                <text x={CHIP.x + CHIP.w / 2} y={CHIP.y + 58} textAnchor='middle' className='fill-muted-foreground font-mono' fontSize={11}>
                                    {categoryName}
                                </text>
                            </svg>

                            {onBoard.map((skill, i) => {
                                const slot = SLOTS[i];
                                const isActive = active?.name === skill.name;
                                return (
                                    <button
                                        key={`${categoryId}-${skill.name}`}
                                        type='button'
                                        onMouseEnter={() => setInspected(skill.name)}
                                        onFocus={() => setInspected(skill.name)}
                                        onClick={() => setInspected(skill.name)}
                                        aria-label={skill.name}
                                        title={skill.name}
                                        className={cn(
                                            'absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 bg-card text-base transition-all duration-300 md:h-12 md:w-12 md:text-xl',
                                            isActive
                                                ? 'scale-110 border-brand-cyan text-brand-cyan shadow-lg shadow-brand-cyan/30'
                                                : 'border-trace text-muted-foreground hover:border-brand-blue hover:text-foreground'
                                        )}
                                        style={{ left: pct(slot.at.x, BOARD.w), top: pct(slot.at.y, BOARD.h) }}
                                    >
                                        {skill.icon}
                                    </button>
                                );
                            })}
                        </div>
                    </Fade>

                    {overflow.length > 0 && (
                        <Fade bottom delay={300}>
                            <div className='mt-8'>
                                <p className='mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground'>{t('moreLabel')}</p>
                                <div className='flex flex-wrap gap-2'>
                                    {overflow.map((skill) => (
                                        <button
                                            key={skill.name}
                                            type='button'
                                            onMouseEnter={() => setInspected(skill.name)}
                                            onFocus={() => setInspected(skill.name)}
                                            onClick={() => setInspected(skill.name)}
                                            className={cn(
                                                'flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs transition-colors',
                                                active?.name === skill.name
                                                    ? 'border-brand-cyan text-foreground'
                                                    : 'border-border bg-card/50 text-muted-foreground hover:text-foreground'
                                            )}
                                        >
                                            <span className='text-sm'>{skill.icon}</span>
                                            {skill.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Fade>
                    )}
                </div>
            </div>
        </section>
    );
}
