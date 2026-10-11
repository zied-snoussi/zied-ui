'use client';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { toast } from 'sonner';
import { ArrowUp, CheckCircle2, Loader2, Send, Shield, Sparkles } from 'lucide-react';
import { Fade } from '@/components/shared';
import { SectionHeading } from '@/components/ui/circuit';
import { Button } from '@/components/ui/button';
import { createContactFormSchema } from '@/lib/validations/contact';
import { cn } from '@/lib/utils';

type Field = 'name' | 'email' | 'subject' | 'message';
const TOPICS = ['freelance', 'job', 'collab', 'hello'] as const;
const MESSAGE_MAX = 2000;

const inputClass = (hasError: boolean) =>
    cn(
        'w-full rounded-lg border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70',
        hasError ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-border focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20'
    );

export default function Contact() {
    const t = useTranslations('Contact');
    const tCommon = useTranslations('Common');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- keys are validated by the schema factory
    const contactFormSchema = useMemo(() => createContactFormSchema((key: string) => t(key as any)), [t]);

    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', website: '' /* honeypot */ });
    const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sent, setSent] = useState(false);

    const validateForm = () => {
        const result = contactFormSchema.safeParse(formData);
        if (result.success) {
            setErrors({});
            return true;
        }
        const next: Partial<Record<Field, string>> = {};
        result.error.issues.forEach((issue: z.ZodIssue) => {
            next[issue.path[0] as Field] = issue.message;
        });
        setErrors(next);
        return false;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error(t('toast.fixFormErrors'));
            return;
        }

        setIsSubmitting(true);
        const loadingToast = toast.loading(t('toast.sending'));
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            toast.dismiss(loadingToast);

            if (response.ok) {
                toast.success(t('toast.success'), { description: t('toast.successDescription'), duration: 5000 });
                setFormData({ name: '', email: '', subject: '', message: '', website: '' });
                setErrors({});
                setSent(true);
            } else if (response.status === 429) {
                toast.error(t('toast.errorRateLimit'), {
                    description: t('toast.errorRateLimitDescription').replace('{seconds}', data.retryAfter),
                    duration: 5000,
                });
            } else if (Array.isArray(data.details)) {
                const next: Partial<Record<Field, string>> = {};
                data.details.forEach((detail: { field: Field; message: string }) => {
                    next[detail.field] = detail.message;
                });
                setErrors(next);
                toast.error(t('toast.errorValidation'), { description: t('toast.errorValidationDescription') });
            } else {
                toast.error(t('toast.errorGeneric'), { description: data.error || t('errorMessage'), duration: 5000 });
            }
        } catch {
            toast.dismiss(loadingToast);
            toast.error(t('toast.errorNetwork'), { description: t('toast.errorNetworkDescription'), duration: 5000 });
        } finally {
            setIsSubmitting(false);
        }
    };

    const setField = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as Field]) {
            setErrors((prev) => {
                const next = { ...prev };
                delete next[name as Field];
                return next;
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setField(e.target.name, e.target.value);

    return (
        <section id='contact' className='relative overflow-x-clip px-6 py-28 lg:px-20'>
            <div className='glow-blob top-1/3 -left-20 h-[400px] w-[400px] bg-brand-blue/50' />
            <div className='glow-blob bottom-0 right-0 h-[360px] w-[360px] bg-brand-violet/50' />

            <div className='relative z-10 mx-auto max-w-7xl'>
                <Fade bottom delay={50}>
                    <SectionHeading align='center' index='08' label={t('title')} title={t('subtitle')} description={t('description')} className='mb-16' />
                </Fade>

                <div className='mx-auto max-w-3xl'>
                    <div className='min-w-0'>
                        <Fade bottom delay={200}>
                            <div className='glass-panel overflow-hidden rounded-2xl'>
                                <div className='flex items-center gap-2 border-b border-border px-4 py-3'>
                                    <span className='h-3 w-3 rounded-full bg-red-500/80' />
                                    <span className='h-3 w-3 rounded-full bg-yellow-500/80' />
                                    <span className='h-3 w-3 rounded-full bg-emerald-500/80' />
                                    <span className='ms-3 font-mono text-xs text-muted-foreground' dir='ltr'>
                                        ~/contact/new-message
                                    </span>
                                    <span className='ms-auto flex items-center gap-1.5 text-xs text-muted-foreground'>
                                        <Shield className='h-3.5 w-3.5 text-emerald-500' />
                                        <span className='hidden sm:inline'>{t('secure')}</span>
                                    </span>
                                </div>

                                {sent ? (
                                    <div className='flex flex-col items-center gap-4 px-6 py-20 text-center fade-swap'>
                                        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand shadow-lg shadow-brand-violet/30'>
                                            <CheckCircle2 className='h-8 w-8 text-white' />
                                        </div>
                                        <h3 className='text-2xl font-semibold text-foreground'>{t('toast.success')}</h3>
                                        <p className='max-w-sm text-muted-foreground'>{t('successMessage')}</p>
                                        <button
                                            type='button'
                                            onClick={() => setSent(false)}
                                            className='mt-2 inline-flex items-center gap-2 rounded-lg border border-brand-blue/50 px-5 py-2.5 text-sm font-medium hover:bg-brand-blue/10'
                                        >
                                            <Send className='h-4 w-4' />
                                            {t('sendAnother')}
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} noValidate className='space-y-6 p-6 md:p-8'>
                                        <div>
                                            <h3 className='text-xl font-semibold text-foreground'>{t('formTitle')}</h3>
                                            <p className='mt-1 text-sm text-muted-foreground'>{t('formDescription')}</p>
                                        </div>

                                        {/* Honeypot: hidden from people, filled in by bots */}
                                        <div className='hidden' aria-hidden='true'>
                                            <label htmlFor='website'>Website (leave blank)</label>
                                            <input type='text' id='website' name='website' value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete='off' />
                                        </div>

                                        <div>
                                            <p className='mb-2 text-sm font-medium text-foreground'>{t('topicsLabel')}</p>
                                            <div className='flex flex-wrap gap-2'>
                                                {TOPICS.map((topic) => {
                                                    const label = t(`topics.${topic}`);
                                                    const active = formData.subject === label;
                                                    return (
                                                        <button
                                                            key={topic}
                                                            type='button'
                                                            aria-pressed={active}
                                                            onClick={() => setField('subject', active ? '' : label)}
                                                            className={cn(
                                                                'rounded-full border px-3.5 py-1.5 text-sm transition-all',
                                                                active
                                                                    ? 'border-brand-cyan bg-brand-cyan/10 text-foreground'
                                                                    : 'border-border text-muted-foreground hover:border-brand-blue/60 hover:text-foreground'
                                                            )}
                                                        >
                                                            {label}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className='grid gap-5 md:grid-cols-2'>
                                            {(['name', 'email'] as const).map((field) => (
                                                <div key={field}>
                                                    <label htmlFor={field} className='mb-2 block text-sm font-medium text-foreground'>
                                                        {t(`${field}Placeholder`)}
                                                    </label>
                                                    <input
                                                        type={field === 'email' ? 'email' : 'text'}
                                                        id={field}
                                                        name={field}
                                                        value={formData[field]}
                                                        onChange={handleChange}
                                                        autoComplete={field}
                                                        aria-invalid={!!errors[field]}
                                                        className={inputClass(!!errors[field])}
                                                    />
                                                    {errors[field] && <p className='mt-1.5 text-xs text-red-500'>{errors[field]}</p>}
                                                </div>
                                            ))}
                                        </div>

                                        <div>
                                            <label htmlFor='subject' className='mb-2 block text-sm font-medium text-foreground'>
                                                {t('subjectPlaceholder')}
                                            </label>
                                            <input
                                                type='text'
                                                id='subject'
                                                name='subject'
                                                value={formData.subject}
                                                onChange={handleChange}
                                                aria-invalid={!!errors.subject}
                                                className={inputClass(!!errors.subject)}
                                            />
                                            {errors.subject && <p className='mt-1.5 text-xs text-red-500'>{errors.subject}</p>}
                                        </div>

                                        <div>
                                            <div className='mb-2 flex items-center justify-between'>
                                                <label htmlFor='message' className='text-sm font-medium text-foreground'>
                                                    {t('messagePlaceholder')}
                                                </label>
                                                <span className={cn('font-mono text-xs', formData.message.length > MESSAGE_MAX ? 'text-red-500' : 'text-muted-foreground')}>
                                                    {formData.message.length}/{MESSAGE_MAX}
                                                </span>
                                            </div>
                                            <textarea
                                                id='message'
                                                name='message'
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={6}
                                                aria-invalid={!!errors.message}
                                                className={cn(inputClass(!!errors.message), 'resize-none')}
                                            />
                                            {errors.message && <p className='mt-1.5 text-xs text-red-500'>{errors.message}</p>}
                                        </div>

                                        <div className='space-y-3'>
                                            <button
                                                type='submit'
                                                disabled={isSubmitting}
                                                className='group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-blue/25 transition-all hover:-translate-y-0.5 hover:shadow-brand-violet/40 disabled:translate-y-0 disabled:opacity-70'
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className='h-4 w-4 animate-spin' />
                                                        {t('sending')}
                                                    </>
                                                ) : (
                                                    <>
                                                        {t('sendButton')}
                                                        <Send className='h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1' />
                                                    </>
                                                )}
                                            </button>
                                            <p className='flex items-center justify-center gap-1.5 text-xs text-muted-foreground'>
                                                <Sparkles className='h-3.5 w-3.5 text-brand-cyan' />
                                                {t('responseTime')}
                                            </p>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>

            {/* Scroll to top */}
            <Button
                variant='outline'
                size='icon'
                className='fixed bottom-6 right-20 z-50 rounded-lg border border-border shadow-md transition-all hover:bg-accent hover:shadow-lg'
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label={tCommon('scrollToTop')}
            >
                <ArrowUp className='h-4 w-4' />
            </Button>
        </section>
    );
}
