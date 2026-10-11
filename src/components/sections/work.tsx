import { Fade } from '@/components/shared';
import { SectionHeading } from '@/components/ui/circuit';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';
import { workData } from '@/data';

export default function Work() {
    const t = useTranslations('Work');
    const tCommon = useTranslations('Common');

    return (
        <section 
            id='work' 
            className='py-24 px-6 lg:px-20 relative'
            aria-label={tCommon('workTimeline')}
        >
            {/* Background */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-muted/10 to-transparent pointer-events-none" aria-hidden="true" />
            
            <div className='max-w-7xl mx-auto relative z-10'>
                {/* Header */}
                <Fade bottom delay={50}>
                    <SectionHeading align='center' index='04' label={t('title')} title={t('subtitle')} description={t('description')} className='mb-20' />
                </Fade>

                {/* Alternating Timeline */}
                <div className="relative">
                    {/* Vertical Timeline Line - Desktop */}
                    <div 
                        className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-brand-cyan via-trace to-trace/30 -translate-x-1/2 z-5 shadow-sm"
                        aria-hidden="true"
                    />

                    {/* Timeline Items */}
                    <div className="space-y-12 lg:space-y-20">
                        {workData.map((item, index) => {
                            const isLeft = index % 2 === 0;
                            const itemTranslations = t.raw(`items.${item.id}`);
                            const isCurrentRole = index === 0; // First item is current role
                            
                            return (
                                <Fade key={item.id} delay={150 + (index * 50)} bottom>
                                    <div className="relative lg:grid lg:grid-cols-2 lg:gap-12 items-start">
                                        {/* Left Side - Card or Date */}
                                        <div className={`${isLeft ? 'lg:pr-12' : 'lg:order-2 lg:pl-12'}`}>
                                            {isLeft ? (
                                                /* Card on Left */
                                                <Card 
                                                    className={`
                                                        group relative overflow-hidden transition-all duration-300
                                                        hover:shadow-xl hover:-translate-y-1
                                                        ${isCurrentRole 
                                                            ? 'border-primary/40 shadow-lg shadow-primary/5' 
                                                            : 'hover:border-primary/30'
                                                        }
                                                    `}
                                                >
                                                    {/* Side Border Accent */}
                                                    <div 
                                                        className={`
                                                            absolute top-0 right-0 bottom-0 w-1
                                                            transition-all duration-200
                                                            ${isCurrentRole 
                                                                ? 'bg-primary' 
                                                                : 'bg-border group-hover:bg-primary/50'
                                                            }
                                                        `}
                                                        aria-hidden="true"
                                                    />

                                                    <CardContent className="p-6 lg:p-8">
                                                        <div className="space-y-5">
                                                            {/* Header with Logo */}
                                                            <div className="flex items-start gap-4">
                                                                <div className="shrink-0">
                                                                    <div className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-linear-to-br from-muted to-muted/50 flex items-center justify-center ring-2 ring-border group-hover:ring-primary/30 transition-all duration-300 shadow-sm">
                                                                        <Image
                                                                            src={item.logo}
                                                                            alt={itemTranslations.company}
                                                                            width={56}
                                                                            height={56}
                                                                            className="object-contain p-2 rounded-lg"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-start justify-between gap-3 mb-2">
                                                                        <div className="flex-1">
                                                                            <h3 className="text-xl lg:text-2xl font-bold tracking-tight mb-1 group-hover:text-primary transition-colors">
                                                                                {itemTranslations.title}
                                                                            </h3>
                                                                            <p className="text-base lg:text-lg font-semibold text-primary/80">
                                                                                {itemTranslations.company}
                                                                            </p>
                                                                        </div>
                                                                        {isCurrentRole && (
                                                                            <Badge 
                                                                                variant="default" 
                                                                                className="shrink-0 bg-primary text-primary-foreground"
                                                                            >
                                                                                {tCommon('current')}
                                                                            </Badge>
                                                                        )}
                                                                    </div>

                                                                    {/* Location on Mobile */}
                                                                    <div className="lg:hidden flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
                                                                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                                                                        {t('location')}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Description */}
                                                            <div className="text-sm lg:text-base text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                                                                {itemTranslations.description.split('\n').map((line: string, i: number) => (
                                                                    <p key={i} className={i > 0 ? "mt-2" : ""}>
                                                                        {line}
                                                                    </p>
                                                                ))}
                                                            </div>

                                                            {/* Tags */}
                                                            <div className="flex flex-wrap gap-2">
                                                                {item.tags.map((tag, tagIndex) => (
                                                                    <Badge 
                                                                        key={tagIndex} 
                                                                        variant="secondary" 
                                                                        className="text-xs font-normal hover:bg-secondary/80 transition-colors"
                                                                    >
                                                                        {tag}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ) : (
                                                /* Date & Location on Left when Card is on Right */
                                                <div className="hidden lg:flex flex-col items-end text-right pr-8">
                                                    <time 
                                                        className="text-lg font-bold text-foreground mb-2"
                                                        dateTime={itemTranslations.time}
                                                    >
                                                        {itemTranslations.time}
                                                    </time>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                                        <span>{t('location')}</span>
                                                        <MapPin className="h-4 w-4" aria-hidden="true" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right Side - Date or Card */}
                                        <div className={`${!isLeft ? 'lg:order-2 lg:pl-12' : 'lg:pl-12'}`}>
                                            {!isLeft ? (
                                                /* Card on Right */
                                                <Card 
                                                    className={`
                                                        group relative overflow-hidden transition-all duration-300
                                                        hover:shadow-xl hover:-translate-y-1
                                                        ${isCurrentRole 
                                                            ? 'border-primary/40 shadow-lg shadow-primary/5' 
                                                            : 'hover:border-primary/30'
                                                        }
                                                    `}
                                                >
                                                    {/* Side Border Accent */}
                                                    <div 
                                                        className={`
                                                            absolute top-0 left-0 bottom-0 w-1
                                                            transition-all duration-300
                                                            ${isCurrentRole 
                                                                ? 'bg-primary' 
                                                                : 'bg-border group-hover:bg-primary/50'
                                                            }
                                                        `}
                                                        aria-hidden="true"
                                                    />

                                                    <CardContent className="p-6 lg:p-8">
                                                        <div className="space-y-5">
                                                            <div className="flex items-start gap-4">
                                                                <div className="shrink-0">
                                                                    <div className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-linear-to-br from-muted to-muted/50 flex items-center justify-center ring-2 ring-border group-hover:ring-primary/30 transition-all duration-300 shadow-sm">
                                                                        <Image
                                                                            src={item.logo}
                                                                            alt={itemTranslations.company}
                                                                            width={56}
                                                                            height={56}
                                                                            className="object-contain p-2 rounded-lg"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-start justify-between gap-3 mb-2">
                                                                        <div className="flex-1">
                                                                            <h3 className="text-xl lg:text-2xl font-bold tracking-tight mb-1 group-hover:text-primary transition-colors">
                                                                                {itemTranslations.title}
                                                                            </h3>
                                                                            <p className="text-base lg:text-lg font-semibold text-primary/80">
                                                                                {itemTranslations.company}
                                                                            </p>
                                                                        </div>
                                                                        {isCurrentRole && (
                                                                            <Badge 
                                                                                variant="default" 
                                                                                className="shrink-0 bg-primary text-primary-foreground"
                                                                            >
                                                                                {tCommon('current')}
                                                                            </Badge>
                                                                        )}
                                                                    </div>

                                                                    {/* Location on Mobile */}
                                                                    <div className="lg:hidden flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
                                                                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                                                                        {t('location')}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="text-sm lg:text-base text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                                                                {itemTranslations.description.split('\n').map((line: string, i: number) => (
                                                                    <p key={i} className={i > 0 ? "mt-2" : ""}>
                                                                        {line}
                                                                    </p>
                                                                ))}
                                                            </div>

                                                            <div className="flex flex-wrap gap-2">
                                                                {item.tags.map((tag, tagIndex) => (
                                                                    <Badge 
                                                                        key={tagIndex} 
                                                                        variant="secondary" 
                                                                        className="text-xs font-normal hover:bg-secondary/80 transition-colors"
                                                                    >
                                                                        {tag}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ) : (
                                                /* Date & Location on Right when Card is on Left */
                                                <div className="hidden lg:flex flex-col items-start text-left pl-8">
                                                    <time 
                                                        className="text-lg font-bold text-foreground mb-2"
                                                        dateTime={itemTranslations.time}
                                                    >
                                                        {itemTranslations.time}
                                                    </time>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                                        <MapPin className="h-4 w-4" aria-hidden="true" />
                                                        <span>{t('location')}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Center Timeline Node - Desktop Only */}
                                        <div className="hidden lg:block absolute left-1/2 top-10 -translate-x-1/2 z-20">
                                            <div 
                                                className={`
                                                    w-4 h-4 rounded-full border-4 border-background
                                                    transition-all duration-200 shadow-md
                                                    ${isCurrentRole 
                                                        ? 'bg-primary ring-4 ring-primary/20 scale-125' 
                                                        : 'bg-muted-foreground hover:bg-primary hover:scale-105'
                                                    }
                                                `}
                                                aria-hidden="true"
                                            />
                                        </div>

                                        {/* Mobile Date Display */}
                                        <div className="lg:hidden mt-3 flex items-center gap-2 text-sm text-muted-foreground font-medium px-4">
                                            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                                            <time dateTime={itemTranslations.time}>{itemTranslations.time}</time>
                                        </div>
                                    </div>
                                </Fade>
                            );
                        })}
                    </div>

                    {/* Timeline End Cap */}
                    <div className="hidden lg:block absolute left-1/2 -bottom-8 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-muted-foreground z-20 shadow-sm" aria-hidden="true" />
                </div>
            </div>
        </section>
    );
}
