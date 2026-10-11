'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
    ArrowUpRight, Award, BookMarked, Calendar, CheckCircle2, Eye, FileCode2, GitCommitHorizontal, GitMerge, GitPullRequest,
    Github, Lock, MapPin, Star, Users,
} from 'lucide-react';
import { Fade } from '@/components/shared';
import { NodeCluster, SectionHeading } from '@/components/ui/circuit';
import { cn } from '@/lib/utils';
import { formatNumber } from '@/lib/utils/format';
import snapshot from '@/data/github-snapshot.json';

/* Static data: regenerate with `GITHUB_TOKEN=$(gh auth token) node scripts/github-snapshot.mjs` */
const data = snapshot;

/* GitHub linguist colors, so the charts match what visitors see on GitHub */
const LANG_COLORS: Record<string, string> = {
    TypeScript: '#3178c6', JavaScript: '#f1e05a', Java: '#b07219', PHP: '#4f5d95', HTML: '#e34c26', CSS: '#663399', 'C#': '#178600',
    Python: '#3572a5', Shell: '#89e051', Dart: '#00b4ab', Groovy: '#4298b8', Dockerfile: '#384d54', SCSS: '#c6538c', Twig: '#c1d026',
};
const langColor = (name: string) => LANG_COLORS[name] ?? 'var(--brand-violet)';
const LEVEL_BG = ['var(--muted)', 'color-mix(in srgb, var(--brand-blue) 35%, transparent)', 'color-mix(in srgb, var(--brand-blue) 60%, transparent)', 'color-mix(in srgb, var(--brand-violet) 80%, transparent)', 'var(--brand-violet)'];
const ACHIEVEMENT_KEYS: Record<string, string> = {
    'Pull Shark': 'pullShark', 'Pair Extraordinaire': 'pairExtraordinaire', Starstruck: 'starstruck', 'Galaxy Brain': 'galaxyBrain', Quickdraw: 'quickdraw', YOLO: 'yolo',
};

const panel = 'glass-panel rounded-2xl';
const heading = 'font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground';

/* Count-up number that starts when it scrolls into view */
function CountUp({ value, duration = 1400 }: { value: number; duration?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [shown, setShown] = useState(0);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let raf = 0;
        const io = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            io.disconnect();
            const start = performance.now();
            const step = (now: number) => {
                const p = Math.min(1, (now - start) / duration);
                setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
                if (p < 1) raf = requestAnimationFrame(step);
            };
            raf = requestAnimationFrame(step);
        });
        io.observe(el);
        return () => {
            io.disconnect();
            cancelAnimationFrame(raf);
        };
    }, [value, duration]);
    return <span ref={ref}>{shown.toLocaleString('en-US')}</span>;
}

function StatTile({ icon: Icon, label, value, hint }: { icon: React.ElementType; label: string; value: number; hint: string }) {
    return (
        <div className={cn(panel, 'group relative flex h-full flex-col justify-between gap-4 overflow-hidden p-5 transition-all hover:-translate-y-0.5 hover:border-brand-blue/60')}>
            <div className='absolute -top-10 -end-10 h-28 w-28 rounded-full bg-brand-violet/20 opacity-60 blur-2xl transition-opacity group-hover:opacity-100' />
            <div className='relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground'>
                <Icon className='h-4 w-4 text-brand-cyan' />
                <span className='truncate'>{label}</span>
            </div>
            <div className='relative'>
                <p className='text-3xl font-bold tracking-tight md:text-4xl'>
                    <span className='text-gradient'>
                        <CountUp value={value} />
                    </span>
                </p>
                <p className='mt-1 truncate text-xs text-muted-foreground'>{hint}</p>
            </div>
        </div>
    );
}

/* 53-week heatmap, same layout as the GitHub profile */
function ContributionCalendar() {
    const t = useTranslations('GithubStats.calendar');
    const locale = useLocale();
    const dayFmt = useMemo(() => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }), [locale]);
    const monthFmt = useMemo(() => new Intl.DateTimeFormat(locale, { month: 'short' }), [locale]);
    const weeks = data.contributions.weeks as [string, number, number][][];
    const CELL = 11, GAP = 3, STEP = CELL + GAP;
    const width = weeks.length * STEP;
    const months = weeks
        .map((w, i) => ({ i, date: new Date(w[0][0]) }))
        .filter(({ i, date }) => i === 0 || date.getMonth() !== new Date(weeks[i - 1][0][0]).getMonth())
        .slice(1);
    const peakYear = Math.max(...data.contributions.perYear.map((y) => y.total));

    return (
        <div className={cn(panel, 'h-full p-6')}>
            <div className='mb-4 flex flex-wrap items-baseline justify-between gap-2'>
                <h3 className={heading}>{t('title')}</h3>
                <p className='text-sm text-foreground'>
                    <span className='font-semibold text-gradient'>{data.contributions.lastYear.toLocaleString(locale)}</span> {t('total')}
                </p>
            </div>
            <div className='overflow-x-auto pb-2'>
                <svg viewBox={`0 0 ${width} ${7 * STEP + 16}`} className='min-w-[640px]' role='img' aria-label={`${data.contributions.lastYear} ${t('total')}`}>
                    {months.map(({ i, date }) => (
                        <text key={i} x={i * STEP} y={9} className='fill-muted-foreground' fontSize={9}>
                            {monthFmt.format(date)}
                        </text>
                    ))}
                    {weeks.map((week, wi) =>
                        week.map(([date, count, level]) => (
                            <rect
                                key={date}
                                x={wi * STEP}
                                y={16 + new Date(date).getDay() * STEP}
                                width={CELL}
                                height={CELL}
                                rx={2}
                                style={{ fill: LEVEL_BG[level] }}
                            >
                                <title>{t('tooltip', { count, date: dayFmt.format(new Date(date)) })}</title>
                            </rect>
                        ))
                    )}
                </svg>
            </div>
            <div className='mt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground'>
                <span>{t('privateNote')}</span>
                <span className='flex items-center gap-1'>
                    {t('less')}
                    {LEVEL_BG.map((bg) => (
                        <span key={bg} className='h-2.5 w-2.5 rounded-[3px]' style={{ background: bg }} />
                    ))}
                    {t('more')}
                </span>
            </div>
            {/* Per-year totals */}
            <div className='mt-6 border-t border-border pt-5'>
                <h4 className={cn(heading, 'mb-4')}>{t('perYear')}</h4>
                <div className='flex items-end gap-2 sm:gap-3' style={{ height: 120 }}>
                    {data.contributions.perYear.map(({ year, total }) => (
                        <div key={year} className='group flex h-full flex-1 flex-col items-center justify-end gap-1.5'>
                            <span className='font-mono text-[10px] text-muted-foreground group-hover:text-foreground'>{formatNumber(total)}</span>
                            <div
                                className={cn(
                                    'w-full max-w-9 rounded-t-md transition-all group-hover:brightness-125',
                                    total === peakYear ? 'bg-gradient-to-t from-brand-blue to-brand-violet shadow-lg shadow-brand-violet/30' : 'bg-gradient-to-t from-brand-blue/40 to-brand-blue/70'
                                )}
                                style={{ height: `${Math.max(3, (total / peakYear) * 80)}px` }}
                            />
                            <span className='font-mono text-[10px] text-muted-foreground'>{`'${String(year).slice(2)}`}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Meter({ label, value }: { label: string; value: number }) {
    return (
        <div>
            <div className='mb-1.5 flex items-center justify-between text-sm'>
                <span className='text-foreground/90'>{label}</span>
                <span className='font-mono text-brand-cyan'>{value}%</span>
            </div>
            <div className='h-2 overflow-hidden rounded-full bg-muted'>
                <div className='h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-violet' style={{ width: `${value}%` }} />
            </div>
        </div>
    );
}

function PullRequestPractice() {
    const t = useTranslations('GithubStats.prs');
    const pr = data.pullRequests;
    return (
        <div className={cn(panel, 'h-full p-6')}>
            <div className='mb-1 flex items-center gap-2'>
                <GitPullRequest className='h-4 w-4 text-brand-cyan' />
                <h3 className={heading}>{t('title')}</h3>
            </div>
            <p className='mb-5 text-xs text-muted-foreground'>{t('sample', { count: pr.sample })}</p>
            <div className='space-y-4'>
                <Meter label={t('mergeRate')} value={Math.round((100 * pr.merged) / pr.opened)} />
                <Meter label={t('conventional')} value={pr.conventionalTitles} />
                <Meter label={t('description')} value={pr.withDescription} />
                <Meter label={t('checks')} value={pr.greenChecks} />
            </div>
            <ul className='mt-6 space-y-2.5 border-t border-border pt-5'>
                {(['p1', 'p2', 'p3', 'p4', 'p5'] as const).map((k) => (
                    <li key={k} className='flex gap-2.5 text-sm text-muted-foreground'>
                        <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-brand-cyan' />
                        <span>{t(`practices.${k}`)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Achievements() {
    const t = useTranslations('GithubStats.achievements');
    return (
        <div className={cn(panel, 'h-full p-6')}>
            <div className='mb-5 flex items-center gap-2'>
                <Award className='h-4 w-4 text-brand-cyan' />
                <h3 className={heading}>{t('title')}</h3>
            </div>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
                {data.achievements.map((a) => (
                    <div key={a.name} className='group flex flex-col items-center gap-2 rounded-xl border border-border bg-card/40 p-3 text-center transition-colors hover:border-brand-blue/60'>
                        <div className='relative h-20 w-20'>
                            <Image src={a.image} alt={a.name} fill sizes='80px' className='object-contain transition-transform duration-300 group-hover:scale-110' />
                            {a.tier > 1 && (
                                <span className='absolute -bottom-1 -end-1 rounded-full border border-amber-400/60 bg-amber-400/15 px-1.5 font-mono text-[11px] font-bold text-amber-400'>
                                    ×{a.tier}
                                </span>
                            )}
                        </div>
                        <p className='text-sm font-semibold text-foreground'>{a.name}</p>
                        <p className='text-[11px] leading-snug text-muted-foreground'>{t(`items.${ACHIEVEMENT_KEYS[a.name] ?? 'pullShark'}`)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Languages() {
    const t = useTranslations('GithubStats.languages');
    const total = data.languages.reduce((s, l) => s + l.bytes, 0);
    const langs = data.languages.map((l) => ({ ...l, percent: (100 * l.bytes) / total }));
    return (
        <div className={cn(panel, 'h-full p-6')}>
            <h3 className={heading}>{t('title')}</h3>
            <p className='mt-1 text-xs text-muted-foreground'>{t('note')}</p>
            <div className='mt-5 flex h-3 overflow-hidden rounded-full'>
                {langs.map((l) => (
                    <span key={l.name} style={{ width: `${l.percent}%`, background: langColor(l.name) }} title={`${l.name} ${l.percent.toFixed(1)}%`} />
                ))}
            </div>
            <ul className='mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-4'>
                {langs.map((l) => (
                    <li key={l.name} className='flex items-center gap-2 text-sm'>
                        <span className='h-2.5 w-2.5 shrink-0 rounded-full' style={{ background: langColor(l.name) }} />
                        <span className='flex-1 truncate text-foreground/90'>{l.name}</span>
                        <span className='font-mono text-xs text-muted-foreground'>{l.percent.toFixed(1)}%</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

type Featured = (typeof data.featured)[number];

function FeaturedRepo({ repo, dateFmt }: { repo: Featured; dateFmt: Intl.DateTimeFormat }) {
    const t = useTranslations('GithubStats.featured');
    const share = Math.round((100 * repo.myCommits) / Math.max(1, repo.totalCommits));
    return (
        <Link
            href={`/projects/${repo.projectId}`}
            className={cn(panel, 'group relative flex h-full flex-col gap-4 overflow-hidden p-5 transition-all hover:-translate-y-1 hover:border-brand-blue/60')}
        >
            <span className='absolute inset-x-0 top-0 h-0.5 opacity-70 transition-opacity group-hover:opacity-100' style={{ background: langColor(repo.languages[0]?.name ?? '') }} />
            <div className='flex items-start gap-2'>
                <BookMarked className='mt-0.5 h-4 w-4 shrink-0 text-brand-cyan' />
                <h4 className='min-w-0 flex-1 truncate font-semibold text-foreground'>{repo.title}</h4>
                <ArrowUpRight className='h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:rotate-45 group-hover:text-brand-cyan rtl:-scale-x-100' />
            </div>
            <p className='-mt-2 flex items-center gap-1.5 whitespace-nowrap font-mono text-[11px] text-muted-foreground'>
                <Lock className='h-3 w-3 shrink-0 text-amber-500' />
                {repo.repoCount > 1 ? t('privateRepos', { count: repo.repoCount }) : t('privateRepo')}
            </p>

            <div>
                <div className='mb-1.5 flex items-center justify-between text-xs'>
                    <span className='flex items-center gap-1.5 text-muted-foreground'>
                        <GitCommitHorizontal className='h-3.5 w-3.5' />
                        {t('commits')}
                    </span>
                    <span className='font-mono text-foreground'>{t('commitsValue', { mine: repo.myCommits, total: repo.totalCommits, share })}</span>
                </div>
                <div className='h-1.5 overflow-hidden rounded-full bg-muted'>
                    <div className='h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-violet' style={{ width: `${share}%` }} />
                </div>
            </div>

            <div>
                <div className='flex h-1.5 overflow-hidden rounded-full'>
                    {repo.languages.map((l) => (
                        <span key={l.name} style={{ width: `${l.percent}%`, background: langColor(l.name) }} />
                    ))}
                </div>
                <div className='mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-muted-foreground'>
                    {repo.languages.slice(0, 3).map((l) => (
                        <span key={l.name} className='flex items-center gap-1'>
                            <span className='h-2 w-2 rounded-full' style={{ background: langColor(l.name) }} />
                            {l.name} {l.percent}%
                        </span>
                    ))}
                </div>
            </div>

            <div className='mt-auto flex items-center justify-between border-t border-border pt-3 font-mono text-[11px] text-muted-foreground'>
                <span className='flex items-center gap-1'>
                    <FileCode2 className='h-3.5 w-3.5' />
                    {t('files', { count: repo.files })}
                </span>
                <span>{t('lastActivity', { date: dateFmt.format(new Date(repo.lastPush)) })}</span>
            </div>
        </Link>
    );
}

export default function GithubStats() {
    const t = useTranslations('GithubStats');
    const locale = useLocale();
    const dateFmt = useMemo(() => new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }), [locale]);
    const longDate = useMemo(() => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }), [locale]);
    const { profile, pullRequests: pr } = data;

    return (
        <section id='github' className='relative overflow-x-clip px-6 py-28 lg:px-20'>
            <div className='glow-blob top-1/4 -left-24 h-[380px] w-[380px] bg-brand-blue/50' />
            <div className='glow-blob bottom-10 right-0 h-[340px] w-[340px] bg-brand-violet/50' />

            <div className='relative z-10 mx-auto max-w-7xl space-y-10'>
                <Fade bottom delay={100}>
                    <SectionHeading align='center' index='06' label={t('title')} title={t('subtitle')} />
                    <p className='mt-4 text-center font-mono text-xs text-muted-foreground'>{t('snapshot', { date: longDate.format(new Date(data.generatedAt)) })}</p>
                </Fade>

                <div className='grid gap-5 lg:grid-cols-12'>
                    {/* Profile */}
                    <Fade bottom delay={150} className='lg:col-span-4'>
                        <div className={cn(panel, 'relative flex h-full flex-col items-center overflow-hidden p-7 text-center')}>
                            <NodeCluster className='absolute -top-6 -end-6 w-36 opacity-30' />
                            <div className='relative rounded-full bg-gradient-brand p-[3px] shadow-lg shadow-brand-violet/30'>
                                {/* eslint-disable-next-line @next/next/no-img-element -- remote GitHub avatar, no next/image domain configured */}
                                <img src={profile.avatarUrl} alt={profile.name} width={104} height={104} className='h-26 w-26 rounded-full border-4 border-background object-cover' />
                                <span className='absolute bottom-2 end-2 h-4 w-4 rounded-full border-2 border-background bg-emerald-500' />
                            </div>
                            <h3 className='mt-5 text-xl font-semibold text-foreground'>{profile.name}</h3>
                            <p className='font-mono text-sm text-brand-cyan'>@{profile.login}</p>
                            <p className='mt-2 text-sm text-muted-foreground'>{t('role')}</p>

                            <div className='mt-5 flex w-full justify-center gap-6 border-y border-border py-4 text-sm'>
                                <div>
                                    <p className='text-lg font-bold text-foreground'>{formatNumber(profile.followers)}</p>
                                    <p className='text-xs text-muted-foreground'>{t('followers')}</p>
                                </div>
                                <div className='w-px bg-border' />
                                <div>
                                    <p className='text-lg font-bold text-foreground'>{formatNumber(profile.following)}</p>
                                    <p className='text-xs text-muted-foreground'>{t('following')}</p>
                                </div>
                                <div className='w-px bg-border' />
                                <div>
                                    <p className='text-lg font-bold text-foreground'>{data.achievements.length}</p>
                                    <p className='text-xs text-muted-foreground'>{t('badges')}</p>
                                </div>
                            </div>

                            <ul className='mt-5 w-full space-y-2.5 text-start text-sm text-muted-foreground'>
                                <li className='flex items-center gap-2.5'>
                                    <MapPin className='h-4 w-4 text-brand-blue' />
                                    {profile.location}
                                </li>
                                <li className='flex items-center gap-2.5'>
                                    <Calendar className='h-4 w-4 text-brand-violet' />
                                    {t('memberSince', { date: dateFmt.format(new Date(profile.memberSince)) })}
                                </li>
                            </ul>

                            <div className='min-h-6 flex-1' />
                            <a
                                href={`https://github.com/${profile.login}`}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-blue/20 transition-transform hover:-translate-y-0.5'
                            >
                                <Github className='h-4 w-4' />
                                {t('viewProfile')}
                            </a>
                        </div>
                    </Fade>

                    {/* Stat tiles */}
                    <div className='grid grid-cols-2 gap-5 md:grid-cols-3 lg:col-span-8'>
                        <Fade bottom delay={200}><StatTile icon={GitCommitHorizontal} label={t('stats.contributions')} value={data.contributions.lastYear} hint={t('stats.contributionsHint')} /></Fade>
                        <Fade bottom delay={230}><StatTile icon={GitPullRequest} label={t('stats.prs')} value={pr.opened} hint={t('stats.prsHint')} /></Fade>
                        <Fade bottom delay={260}><StatTile icon={GitMerge} label={t('stats.merged')} value={pr.merged} hint={t('stats.mergedHint', { percent: Math.round((100 * pr.merged) / pr.opened) })} /></Fade>
                        <Fade bottom delay={290}><StatTile icon={Eye} label={t('stats.reviews')} value={pr.reviewsGiven} hint={t('stats.reviewsHint')} /></Fade>
                        <Fade bottom delay={320}><StatTile icon={BookMarked} label={t('stats.repos')} value={profile.repos} hint={t('stats.reposHint', { count: profile.publicRepos })} /></Fade>
                        <Fade bottom delay={350}><StatTile icon={Star} label={t('stats.stars')} value={profile.stars} hint={t('stats.starsHint')} /></Fade>
                    </div>
                </div>

                {/* Contributions */}
                <Fade bottom delay={150}>
                    <ContributionCalendar />
                </Fade>

                {/* Practices + badges + languages */}
                <div className='grid gap-5 lg:grid-cols-12'>
                    <Fade bottom delay={150} className='lg:col-span-5'><PullRequestPractice /></Fade>
                    <Fade bottom delay={200} className='lg:col-span-7'><Achievements /></Fade>
                </div>

                {/* Featured repositories */}
                <div className='space-y-5'>
                    <div className='flex flex-wrap items-end justify-between gap-2'>
                        <div>
                            <h3 className='text-2xl font-light text-foreground'>{t('featured.title')}</h3>
                            <p className='mt-1 text-sm text-muted-foreground'>{t('featured.subtitle')}</p>
                        </div>
                        <p className='flex items-center gap-1.5 font-mono text-xs text-muted-foreground'>
                            <Users className='h-3.5 w-3.5' />
                            {t('featured.teamNote')}
                        </p>
                    </div>
                    <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                        {data.featured.map((repo, i) => (
                            <Fade key={repo.projectId} bottom delay={100 + i * 60} className='h-full min-w-0'>
                                <FeaturedRepo repo={repo} dateFmt={dateFmt} />
                            </Fade>
                        ))}
                    </div>
                    <Fade bottom delay={150}><Languages /></Fade>
                </div>
            </div>
        </section>
    );
}
