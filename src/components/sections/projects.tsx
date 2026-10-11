'use client';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { morphToProject } from '@/lib/view-transition';
import { Fade } from '@/components/shared';
import { projectsData, type ProjectCategory } from '@/data';
import { SectionHeading } from '@/components/ui/circuit';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

type FilterType = 'featured' | 'all' | ProjectCategory;
const FILTERS: FilterType[] = ['featured', 'ai', 'web', 'mobile', 'data', 'all'];
/* First load: 1 featured (2x2) + 5 tiles fills three rows of a 3-column grid; each "more" adds two rows */
const INITIAL = 6;
const STEP = 6;

type Project = (typeof projectsData)[number]['data'][number] & { projectId: string; groupId: number };

function categorize(project: Project): FilterType[] {
    const categories: FilterType[] = ['all', ...project.categories];
    if (project.featured) categories.push('featured');
    return categories;
}

const isPublicUrl = (url?: string) => !!url && url.startsWith('http');

function ProjectChip({ project, index, featured }: { project: Project; index: number; featured: boolean }) {
    const tc = useTranslations('Common');
    const router = useRouter();
    const [spot, setSpot] = useState({ x: 50, y: 50 });
    const extraTags = project.skills.length - (featured ? 6 : 3);
    const href = `/projects/${project.projectId}`;

    // Morph the card's image and title into the project page (plain navigation as fallback)
    const openProject = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // new tab etc.
        e.preventDefault();
        const card = e.currentTarget.closest('article');
        if (card) morphToProject(card, () => router.push(href));
        else router.push(href);
    };

    return (
        <article
            data-project-card={project.projectId}
            onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setSpot({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
            }}
            className={cn(
                'group relative h-full min-h-[280px] rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/60 hover:shadow-2xl hover:shadow-brand-violet/20',
                featured && 'min-h-[380px] md:min-h-[580px]'
            )}
        >
            <div className='relative h-full overflow-hidden rounded-2xl'>
                <div data-vt='image' className='absolute inset-0 overflow-hidden rounded-2xl'>
                    <Image
                        src={project.photoUrl}
                        alt={project.title}
                        fill
                        sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                        className='object-cover opacity-75 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 dark:opacity-60 dark:group-hover:opacity-90'
                        priority={featured}
                    />
                </div>
                {/* Readability gradient + mouse-follow spotlight */}
                <div className='absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/10' />
                <div
                    className='absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                    style={{ background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, color-mix(in srgb, var(--brand-violet) 22%, transparent), transparent 60%)` }}
                />

                {/* Chip label */}
                <div className='absolute top-4 start-4 flex items-center gap-2 rounded-md border border-border bg-background/80 px-2 py-1 font-mono text-[11px] text-muted-foreground backdrop-blur'>
                    <span className='h-1.5 w-1.5 rounded-full bg-brand-cyan' />U{String(index + 1).padStart(2, '0')}
                    <span className='text-foreground/40'>·</span>
                    {project.date}
                </div>

                {isPublicUrl(project.demoUrl) && (
                    <a
                        href={project.demoUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label={`${tc('liveDemo')}: ${project.title}`}
                        className='absolute top-4 end-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground backdrop-blur transition-colors hover:border-brand-cyan hover:text-foreground'
                    >
                        <ExternalLink className='h-4 w-4' />
                    </a>
                )}

                {/* Content */}
                <div className='absolute inset-x-0 bottom-0 space-y-3 p-5 md:p-6'>
                    <h3 data-vt='title' className={cn('w-fit font-semibold leading-tight text-foreground', featured ? 'text-2xl md:text-3xl' : 'text-lg')}>
                        {/* Whole card is clickable through this link */}
                        <Link href={href} onClick={openProject} className='after:absolute after:inset-0 focus:outline-none'>
                            {project.title}
                        </Link>
                    </h3>
                    <p
                        className={cn(
                            'text-sm leading-relaxed text-muted-foreground',
                            featured ? 'line-clamp-3 md:text-base' : 'line-clamp-2 max-h-0 opacity-0 transition-all duration-300 group-hover:max-h-12 group-hover:opacity-100 group-focus-within:max-h-12 group-focus-within:opacity-100'
                        )}
                    >
                        {project.description}
                    </p>
                    <div className='flex flex-wrap items-center gap-1.5'>
                        {project.skills.slice(0, featured ? 6 : 3).map((s) => (
                            <span key={s} className='rounded-full border border-brand-blue/30 bg-brand-blue/10 px-2.5 py-0.5 text-[11px] text-foreground/90'>
                                {s}
                            </span>
                        ))}
                        {extraTags > 0 && <span className='font-mono text-[11px] text-muted-foreground'>+{extraTags}</span>}
                        <ArrowUpRight className='ms-auto h-5 w-5 text-muted-foreground transition-all group-hover:rotate-45 group-hover:text-brand-cyan rtl:-scale-x-100' />
                    </div>
                </div>
            </div>
        </article>
    );
}

export default function Projects() {
    const t = useTranslations('Projects');

    const allProjects = useMemo<Project[]>(
        () => projectsData.flatMap((group) => group.data.map((p, i) => ({ ...p, projectId: `${group.id}-${i}`, groupId: group.id }))),
        []
    );

    const [filter, setFilter] = useState<FilterType>('featured');
    const [visible, setVisible] = useState(INITIAL);
    const projects = useMemo(() => allProjects.filter((p) => categorize(p).includes(filter)), [allProjects, filter]);
    const shown = projects.slice(0, visible);

    return (
        <section id='projects' className='relative overflow-x-clip px-6 py-28 lg:px-20'>
            <div className='glow-blob top-10 right-0 h-[420px] w-[420px] bg-brand-violet/70' />
            <div className='glow-blob bottom-20 left-0 h-[360px] w-[360px] bg-brand-blue/50' />

            <div className='relative z-10 mx-auto max-w-7xl space-y-10'>
                <Fade bottom delay={100}>
                    <SectionHeading index='02' label={t('title')} title={t('subtitle')} description={t('description')} />
                </Fade>

                <Fade bottom delay={150}>
                    <div className='flex flex-wrap items-center gap-2'>
                        {FILTERS.map((f) => (
                            <button
                                key={f}
                                type='button'
                                onClick={() => {
                                    setFilter(f);
                                    setVisible(INITIAL);
                                }}
                                aria-pressed={filter === f}
                                className={cn(
                                    'rounded-full border px-4 py-1.5 text-sm transition-all',
                                    filter === f
                                        ? 'border-brand-blue bg-brand-blue/15 text-foreground'
                                        : 'border-border bg-card/40 text-muted-foreground hover:border-brand-blue/50 hover:text-foreground'
                                )}
                            >
                                {t(`filters.${f}`)}
                            </button>
                        ))}
                        <span className='ms-auto font-mono text-xs text-muted-foreground'>{t('count', { count: projects.length })}</span>
                    </div>
                </Fade>

                {/* Bento board: first project is the featured 2x2 chip */}
                <div className='grid auto-rows-[minmax(280px,auto)] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                    {shown.map((project, i) => (
                        <div key={`${filter}-${project.projectId}`} className={cn('fade-swap', i === 0 && 'md:col-span-2 md:row-span-2')} style={{ animationDelay: `${(i % STEP) * 60}ms` }}>
                            <ProjectChip project={project} index={i} featured={i === 0} />
                        </div>
                    ))}
                </div>

                {projects.length > INITIAL && (
                    <div className='relative flex justify-center pt-2'>
                        <span className='absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-trace to-transparent' aria-hidden='true' />
                        <button
                            type='button'
                            onClick={() => setVisible((v) => (v >= projects.length ? INITIAL : v + STEP))}
                            className='relative inline-flex items-center gap-2 rounded-full border border-brand-blue/50 bg-background px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-brand-cyan hover:bg-brand-blue/10'
                        >
                            {visible >= projects.length ? (
                                <>
                                    {t('showLess')} <ChevronUp className='h-4 w-4' />
                                </>
                            ) : (
                                <>
                                    {t('showMore')} <span className='font-mono text-xs text-muted-foreground'>{`${shown.length}/${projects.length}`}</span>
                                    <ChevronDown className='h-4 w-4' />
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
