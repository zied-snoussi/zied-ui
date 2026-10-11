'use client';
import { Fade } from '@/components/shared';
import { useTranslations } from 'next-intl';
import { socialLinks, techStack } from '@/data';
import { cn } from '@/lib/utils';
import { MapPin, GraduationCap, ArrowRight, FolderKanban } from 'lucide-react';
import Particles from '@/components/ui/particles';
import { NodeCluster } from '@/components/ui/circuit';

/* Portrait in a circle: the shoulders follow the circle, the head rises above its top edge */
const BOARD = { w: 440, h: 480 };
const DISC = { cx: 220, cy: 270, r: 170 };
const ORBIT_R = 202;
const PHOTO = { x: 30, y: 72, w: 380, h: 379 };

function scrollToId(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Home() {
    const t = useTranslations('HomePage');

    return (
        <section id='home' className='relative min-h-screen overflow-hidden px-6 pt-32 pb-20 lg:px-20'>
            {/* Background: particles + glow */}
            <div className='absolute inset-0 z-0 opacity-40 dark:opacity-60'>
                <Particles
                    particleColors={['#4f7cff', '#9266ff', '#ffffff']}
                    particleCount={160}
                    particleSpread={12}
                    speed={0.12}
                    particleBaseSize={100}
                    moveParticlesOnHover
                    alphaParticles
                    pixelRatio={1.25}
                />
            </div>
            <div className='glow-blob -top-40 left-1/4 h-[420px] w-[420px] bg-brand-blue' />
            <div className='glow-blob top-1/3 -right-20 h-[380px] w-[380px] bg-brand-violet' />

            <div className='relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-12'>
                {/* Copy */}
                <div className='order-2 space-y-8 lg:order-1 lg:col-span-7'>
                    <Fade bottom delay={150}>
                        <div className='space-y-3'>
                            <p className='text-2xl font-light text-foreground/90 md:text-3xl'>{t('greeting')}</p>
                            <h1 className='text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl'>
                                <span className='font-mono font-light text-brand-cyan/70'>{'{'}</span>
                                <span className='text-gradient'>Zied Snoussi</span>
                                <span className='font-mono font-light text-brand-cyan/70'>{'}'}</span>
                            </h1>
                            <h2 className='text-xl font-medium text-foreground md:text-2xl'>{t('heroTitle')}</h2>
                        </div>
                    </Fade>

                    <Fade bottom delay={200}>
                        <p className='max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg'>{t('heroIntro')}</p>
                        <div className='mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground'>
                            <span className='flex items-center gap-2'>
                                <MapPin className='h-4 w-4 text-brand-blue' />
                                {t('location')}
                            </span>
                            <span className='flex items-center gap-2'>
                                <GraduationCap className='h-4 w-4 text-brand-violet' />
                                {t('education')}
                            </span>
                        </div>
                    </Fade>

                    <Fade bottom delay={250}>
                        <div className='flex flex-wrap gap-4'>
                            <button
                                type='button'
                                onClick={() => scrollToId('contact')}
                                className='group inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/25 transition-all hover:-translate-y-0.5 hover:shadow-brand-violet/40'
                            >
                                {t('startProject')}
                                <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1' />
                            </button>
                            <button
                                type='button'
                                onClick={() => scrollToId('projects')}
                                className='inline-flex items-center gap-2 rounded-lg border border-brand-blue/50 bg-brand-blue/5 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-brand-violet hover:bg-brand-violet/10'
                            >
                                <FolderKanban className='h-4 w-4' />
                                {t('viewProjects')}
                            </button>
                        </div>
                    </Fade>

                    <Fade bottom delay={300}>
                        <div className='flex flex-wrap gap-3'>
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    aria-label={social.label}
                                    className={cn(
                                        'flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-brand-blue/60',
                                        social.color
                                    )}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </Fade>
                </div>

                {/* Portrait in a circle, with an orbit ring */}
                <div className='order-1 lg:order-2 lg:col-span-5'>
                    <Fade bottom delay={100}>
                        <div className='relative mx-auto w-full max-w-[300px] sm:max-w-[420px]' style={{ aspectRatio: `${BOARD.w} / ${BOARD.h}` }}>
                            <svg viewBox={`0 0 ${BOARD.w} ${BOARD.h}`} className='absolute inset-0 h-full w-full overflow-visible' role='img' aria-label='Zied Snoussi'>
                                <defs>
                                    <linearGradient id='hero-disc' x1='0' y1='0' x2='1' y2='1'>
                                        <stop offset='0%' stopColor='var(--brand-violet)' />
                                        <stop offset='100%' stopColor='var(--brand-blue)' />
                                    </linearGradient>
                                    <linearGradient id='hero-ring' x1='0' y1='0' x2='1' y2='1'>
                                        <stop offset='0%' stopColor='var(--brand-cyan)' />
                                        <stop offset='50%' stopColor='var(--brand-violet)' stopOpacity='0.2' />
                                        <stop offset='100%' stopColor='var(--brand-blue)' />
                                    </linearGradient>
                                    {/* Circle for the shoulders + everything above the circle's upper part for the head */}
                                    <clipPath id='hero-portrait-clip'>
                                        <circle cx={DISC.cx} cy={DISC.cy} r={DISC.r} />
                                        <rect x={DISC.cx - DISC.r} y={0} width={DISC.r * 2} height={DISC.cy - 60} />
                                    </clipPath>
                                </defs>

                                {/* Orbit: dashed ring turning slowly, with a glowing dot travelling around it */}
                                <g className='hero-orbit' style={{ transformOrigin: `${DISC.cx}px ${DISC.cy}px` }}>
                                    <circle cx={DISC.cx} cy={DISC.cy} r={ORBIT_R} fill='none' stroke='var(--trace)' strokeWidth={1.5} strokeDasharray='4 10' />
                                </g>
                                <g className='hero-orbit-dot' style={{ transformOrigin: `${DISC.cx}px ${DISC.cy}px` }}>
                                    <circle cx={DISC.cx} cy={DISC.cy - ORBIT_R} r={9} fill='var(--brand-cyan)' opacity={0.25} />
                                    <circle cx={DISC.cx} cy={DISC.cy - ORBIT_R} r={4.5} fill='var(--brand-cyan)' />
                                </g>

                                <circle cx={DISC.cx} cy={DISC.cy} r={DISC.r + 10} fill='none' stroke='url(#hero-ring)' strokeWidth={2} />
                                <circle cx={DISC.cx} cy={DISC.cy} r={DISC.r} fill='url(#hero-disc)' opacity={0.9} />
                                <image
                                    href='/assets/profile-cutout.webp?v=2'
                                    x={PHOTO.x}
                                    y={PHOTO.y}
                                    width={PHOTO.w}
                                    height={PHOTO.h}
                                    clipPath='url(#hero-portrait-clip)'
                                    preserveAspectRatio='xMidYMid meet'
                                />
                            </svg>

                            <NodeCluster className='absolute -right-10 -bottom-10 w-40 opacity-60' />
                        </div>
                    </Fade>
                </div>
            </div>

            {/* Tech stack rail */}
            <Fade bottom delay={350}>
                <div className='relative z-10 mx-auto mt-20 max-w-7xl'>
                    <div className='mb-5 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground'>
                        {t('techStack')}
                        <span className='h-px flex-1 bg-gradient-to-r from-trace to-transparent rtl:bg-gradient-to-l' />
                    </div>
                    <div className='flex flex-wrap gap-3'>
                        {techStack.map((tech) => (
                            <a
                                key={tech.name}
                                href={tech.href}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='group flex items-center gap-2 rounded-lg border border-border bg-card/50 px-3 py-2 text-sm text-muted-foreground transition-all hover:border-brand-blue/50 hover:text-foreground'
                            >
                                <tech.icon className={cn('text-lg transition-transform group-hover:scale-110', tech.color)} />
                                {tech.name}
                            </a>
                        ))}
                    </div>
                </div>
            </Fade>
        </section>
    );
}
