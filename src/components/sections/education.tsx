import { Fade } from '@/components/shared';
import { SectionHeading } from '@/components/ui/circuit';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';
import { educationData } from '@/data';

export default function Education() {
    const t = useTranslations('Education');
    const tCommon = useTranslations('Common');

    return (
        <section 
            id='education' 
            className='py-24 px-6 lg:px-20 relative'
            aria-label={tCommon('educationTimeline')}
        >
            {/* Subtle Background */}
            <div className="absolute inset-0 bg-linear-to-b from-muted/20 to-transparent pointer-events-none" aria-hidden="true" />
            
            <div className='max-w-5xl mx-auto relative z-10'>
                {/* Header Section */}
                <Fade bottom delay={50}>
                    <SectionHeading align='center' index='03' label={t('title')} title={t('subtitle')} description={t('description')} className='mb-16 lg:mb-20' />
                </Fade>

                {/* Timeline Container */}
                <div className="relative">
                    {/* Vertical Timeline Line */}
                    <div 
                        className="absolute left-[23px] md:left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-brand-cyan via-trace to-trace/30 rtl:left-auto rtl:right-[23px] md:rtl:right-8"
                        aria-hidden="true"
                    />

                    {/* Timeline Events */}
                    <ol className="relative space-y-8 md:space-y-10" role="list">
                        {educationData.map((item, index) => {
                            const itemTranslations = t.raw(`items.${item.id}`);
                            return (
                            <li key={item.id} className="relative">
                                <Fade delay={150 + (index * 50)} bottom>
                                    <div className="flex gap-4 md:gap-6 group">
                                        {/* Timeline Node */}
                                        <div className="relative flex-shrink-0 z-10" aria-hidden="true">
                                            <div 
                                                className={`
                                                    w-12 h-12 rounded-full flex items-center justify-center
                                                    transition-all duration-200 ease-out
                                                    ring-4 ring-background
                                                    ${item.status === 'ongoing' 
                                                        ? 'bg-primary shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/30 group-hover:scale-105' 
                                                        : 'bg-muted border-2 border-border group-hover:border-primary/50 group-hover:bg-muted/80'
                                                    }
                                                `}
                                            >
                                                {/* Institution Logo */}
                                                <div className="relative w-7 h-7 rounded-full overflow-hidden bg-background/50">
                                                    <Image
                                                        src={item.logo}
                                                        alt=""
                                                        width={28}
                                                        height={28}
                                                        className="object-contain p-0.5"
                                                    />
                                                </div>
                                                
                                                {/* Current Indicator Pulse */}
                                                {/* Removed animate-ping for performance */}
                                            </div>
                                        </div>

                                        {/* Content Card */}
                                        <Card 
                                            className={`
                                                flex-1 transition-all duration-200 ease-out
                                                hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5
                                                ${item.status === 'ongoing' ? 'border-primary/30 shadow-sm' : ''}
                                            `}
                                        >
                                            <CardContent className="p-5 md:p-6">
                                                {/* Event Header */}
                                                <div className="space-y-3 mb-3">
                                                    <div className="flex flex-wrap items-start justify-between gap-2">
                                                        <h3 className='text-base md:text-lg font-semibold leading-tight pr-2 flex-1'>
                                                            {itemTranslations.title}
                                                        </h3>
                                                        {item.status === 'ongoing' && (
                                                            <Badge 
                                                                variant="default" 
                                                                className="text-xs font-medium px-2 py-0.5 bg-primary/10 text-primary hover:bg-primary/15"
                                                            >
                                                                {tCommon('current')}
                                                            </Badge>
                                                        )}
                                                    </div>

                                                    {/* Meta Information */}
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                                        <Badge 
                                                            variant="secondary" 
                                                            className="w-fit font-normal text-xs hover:bg-secondary/80 transition-colors"
                                                        >
                                                            <MapPin className="mr-1 h-3 w-3" aria-hidden="true" />
                                                            {itemTranslations.subtitle}
                                                        </Badge>
                                                        <time 
                                                            className="flex items-center text-xs md:text-sm text-muted-foreground font-medium"
                                                            dateTime={itemTranslations.time}
                                                        >
                                                            <Calendar className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                                                            {itemTranslations.time}
                                                        </time>
                                                    </div>
                                                </div>

                                                {/* Event Description */}
                                                <p className='text-sm text-muted-foreground leading-relaxed pt-2 border-t border-border/50'>
                                                    {itemTranslations.description}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </Fade>
                            </li>
                        )})}
                    </ol>

                    {/* Timeline End Cap */}
                    <div 
                        className="absolute left-[19px] md:left-[26px] bottom-0 w-2 h-2 rounded-full bg-border"
                        aria-hidden="true"
                    />
                </div>
            </div>
        </section>
    );
}
