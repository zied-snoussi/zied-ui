'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Sparkles, ArrowUp, MessageSquareText } from 'lucide-react';
import { Fade } from '@/components/shared';
import { SectionHeading } from '@/components/ui/circuit';
import { askChatbot } from '@/components/features/ai-chatbot/ask';
import { BOT_ASPECT, BOT_SLOT_ID } from '@/components/features/ai-chatbot/robot';

const SUGGESTIONS = ['strengths', 'microservices', 'ai'] as const;

export default function AskBot() {
    const t = useTranslations('AskBot');
    const [question, setQuestion] = useState('');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        askChatbot(question);
        setQuestion('');
    };

    return (
        <section id='ask-bot' className='relative overflow-x-clip px-6 py-28 lg:px-20'>
            <div className='glow-blob top-1/3 right-10 h-[360px] w-[360px] bg-brand-violet/70' />

            <div className='relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12'>
                <div className='space-y-8 lg:col-span-8'>
                    <Fade bottom delay={100}>
                        <SectionHeading index='07' label={t('label')} title={t('title')} description={t('description')} />
                    </Fade>

                    <Fade bottom delay={200}>
                        <form onSubmit={submit} className='glass-panel flex items-center gap-3 rounded-xl p-2 ps-4'>
                            <Sparkles className='h-5 w-5 shrink-0 text-yellow-400' />
                            <input
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder={t('placeholder')}
                                aria-label={t('placeholder')}
                                maxLength={2000}
                                className='min-w-0 flex-1 bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground md:text-base'
                            />
                            <button
                                type='submit'
                                className='inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5'
                            >
                                <span className='hidden sm:inline'>{t('send')}</span>
                                <ArrowUp className='h-4 w-4' />
                            </button>
                        </form>
                    </Fade>

                    <div className='grid gap-3 sm:grid-cols-3'>
                        {SUGGESTIONS.map((key, i) => (
                            <Fade key={key} bottom delay={250 + i * 80}>
                                <button
                                    type='button'
                                    onClick={() => askChatbot(t(`suggestions.${key}`))}
                                    className='group flex h-full w-full items-start gap-3 rounded-xl border border-border bg-card/50 p-4 text-start text-sm text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-brand-blue/60 hover:text-foreground'
                                >
                                    <MessageSquareText className='mt-0.5 h-4 w-4 shrink-0 text-brand-cyan' />
                                    {t(`suggestions.${key}`)}
                                </button>
                            </Fade>
                        ))}
                    </div>
                </div>

                <div className='lg:col-span-4'>
                    {/* Landing spot: the floating robot (see ai-chatbot/robot.tsx) flies here while this section is on screen */}
                    <div id={BOT_SLOT_ID} className='mx-auto w-full max-w-[280px]' style={{ aspectRatio: BOT_ASPECT }} aria-hidden='true' />
                </div>
            </div>
        </section>
    );
}
