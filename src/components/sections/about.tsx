'use client';
import React, { useEffect, useState } from 'react';
import { Fade } from '@/components/shared';
import { useTranslations } from 'next-intl';
import { Code2, Palette, Rocket, Users, Sparkles, Lock } from 'lucide-react';
import { NodeCluster, SectionHeading } from '@/components/ui/circuit';
import { cn } from '@/lib/utils';

const highlights = [
    { icon: Code2, key: 'cleanCode', color: 'text-brand-blue' },
    { icon: Rocket, key: 'performance', color: 'text-brand-cyan' },
    { icon: Palette, key: 'modernDesign', color: 'text-brand-violet' },
    { icon: Users, key: 'collaboration', color: 'text-emerald-500' },
] as const;

/** Types `text` one character at a time, like a prompt being entered. */
function useTypewriter(text: string, speed = 70) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const id = setInterval(() => {
            setCount((c) => {
                if (c >= text.length) {
                    clearInterval(id);
                    return c;
                }
                return c + 1;
            });
        }, speed);
        return () => clearInterval(id);
    }, [text, speed]);
    return text.slice(0, count);
}

export default function About() {
    const t = useTranslations('About');
    const prompt = useTypewriter(t('windowPrompt'));

    return (
        <section id='about' className='relative overflow-x-clip px-6 py-28 lg:px-20'>
            <div className='glow-blob top-1/4 -left-40 h-[360px] w-[360px] bg-brand-blue/60' />
            <NodeCluster className='absolute left-6 bottom-16 hidden w-44 opacity-40 lg:block' />

            <div className='relative z-10 mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:items-center'>
                {/* Heading + highlights connected by a trace */}
                <div className='space-y-10 lg:col-span-5'>
                    <Fade bottom delay={100}>
                        <SectionHeading index='01' label={t('title')} title={t('subtitle')} description={t('tagline')} />
                    </Fade>

                    <div className='relative ps-8'>
                        <span className='absolute start-3 top-2 bottom-2 w-px bg-trace' aria-hidden='true' />
                        <span className='absolute start-3 top-2 h-16 w-px animate-pulse bg-gradient-to-b from-brand-cyan to-transparent' aria-hidden='true' />
                        <ul className='space-y-5'>
                            {highlights.map((item, i) => (
                                <Fade key={item.key} bottom delay={200 + i * 100}>
                                    <li className='relative'>
                                        <span className='absolute -start-[25px] top-3 h-2.5 w-2.5 rounded-full border-2 border-brand-cyan bg-background' aria-hidden='true' />
                                        <div className='flex items-start gap-3'>
                                            <item.icon className={cn('mt-0.5 h-5 w-5 shrink-0', item.color)} />
                                            <div>
                                                <h3 className='font-semibold text-foreground'>{t(`highlights.${item.key}.title`)}</h3>
                                                <p className='text-sm text-muted-foreground'>{t(`highlights.${item.key}.description`)}</p>
                                            </div>
                                        </div>
                                    </li>
                                </Fade>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Browser window */}
                <div className='lg:col-span-7'>
                    <Fade bottom delay={200}>
                        <div className='glass-panel overflow-hidden rounded-2xl'>
                            <div className='flex items-center gap-2 border-b border-border px-4 py-3'>
                                <span className='h-3 w-3 rounded-full bg-red-500/80' />
                                <span className='h-3 w-3 rounded-full bg-yellow-500/80' />
                                <span className='h-3 w-3 rounded-full bg-emerald-500/80' />
                                <div className='mx-auto flex items-center gap-1.5 rounded-md bg-muted/70 px-4 py-1 font-mono text-[11px] text-muted-foreground' dir='ltr'>
                                    <Lock className='h-3 w-3' />
                                    zied-snoussi.vercel.app
                                </div>
                            </div>

                            <div className='space-y-5 p-5 md:p-7'>
                                <div className='flex items-center gap-3 rounded-lg border border-border bg-background/60 px-4 py-3 font-mono text-sm'>
                                    <Sparkles className='h-4 w-4 shrink-0 text-yellow-400' />
                                    <span className='text-foreground'>{prompt}</span>
                                    <span className='caret-blink -ms-2 h-4 w-0.5 bg-brand-cyan' aria-hidden='true' />
                                </div>

                                <div className='whitespace-pre-line rounded-lg border border-border bg-background/40 p-5 text-sm leading-relaxed text-muted-foreground md:text-[15px]'>
                                    {t.rich('description', {
                                        span_bold: (chunks) => <span className='font-semibold text-foreground'>{chunks}</span>,
                                    })}
                                </div>
                            </div>
                        </div>
                    </Fade>
                </div>
            </div>
        </section>
    );
}
