'use client';
import React from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io';
import { useTranslations } from 'next-intl';
import { Separator } from '@/components/ui/separator';
import { 
    Heart, 
    Mail, 
    MapPin, 
    User, 
    FolderKanban, 
    GraduationCap, 
    Briefcase, 
    Award, 
    MessageSquare 
} from 'lucide-react';
import Image from 'next/image';


/** Flat signal on the left that blooms into interfering waves on the right. */
function buildWaves(count = 9, width = 1200, height = 200) {
    return Array.from({ length: count }, (_, i) => {
        const phase = (i / count) * Math.PI * 2;
        const freq = 0.012 + i * 0.0009;
        const points: string[] = [];
        for (let x = 0; x <= width; x += 10) {
            const t = Math.max(0, (x - width * 0.35) / (width * 0.65));
            const envelope = Math.sin(Math.PI * Math.min(1, t)) * (height * 0.42);
            const y = height / 2 + envelope * Math.sin(x * freq + phase);
            points.push(`${x === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`);
        }
        return points.join(' ');
    });
}

const WAVES = buildWaves();

export default function Footer() {
    const t = useTranslations('Footer');
    
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
        e.preventDefault();
        const targetId = link.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    
    const socialLinks = [
        { icon: FaLinkedin, href: 'https://www.linkedin.com/in/zied-snoussi/', label: 'LinkedIn', color: 'hover:text-[#0077B5]' },
        { icon: FaGithub, href: 'https://github.com/zied-snoussi', label: 'GitHub', color: 'hover:text-foreground' },
        { icon: IoLogoYoutube, href: 'https://youtube.com/@ziedsnoussi', label: 'YouTube', color: 'hover:text-[#FF0000]' },
        { icon: FaFacebook, href: 'https://www.facebook.com/zied.snoussi.792/', label: 'Facebook', color: 'hover:text-[#1877F2]' },
        { icon: FaInstagram, href: 'https://www.instagram.com/Zied__Snoussi/', label: 'Instagram', color: 'hover:text-[#E4405F]' },
        { icon: FaWhatsapp, href: 'https://wa.me/21625822514', label: 'WhatsApp', color: 'hover:text-[#25D366]' },
    ];

    const quickLinks = [
        { nameKey: 'about', href: '#about', icon: User },
        { nameKey: 'projects', href: '#projects', icon: FolderKanban },
        { nameKey: 'education', href: '#education', icon: GraduationCap },
        { nameKey: 'work', href: '#work', icon: Briefcase },
        { nameKey: 'skills', href: '#skills', icon: Award },
        { nameKey: 'contact', href: '#contact', icon: MessageSquare },
    ];
    
    return (
        <footer className='relative overflow-x-clip border-t border-border'>
            {/* Closing CTA with signal waves */}
            <div className='relative mx-auto max-w-7xl px-6 pt-24 lg:px-8'>
                <div className='glow-blob -top-10 left-1/3 h-[300px] w-[300px] bg-brand-blue/60' />
                <div className='relative z-10 space-y-6'>
                    <h2 className='max-w-2xl text-3xl font-light tracking-tight text-foreground md:text-5xl'>{t('ctaTitle')}</h2>
                    <a
                        href='mailto:ziedalsnoussi@gmail.com'
                        className='inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/25 transition-transform hover:-translate-y-0.5'
                    >
                        <Mail className='h-4 w-4' />
                        {t('ctaButton')}
                    </a>
                </div>
                <svg viewBox='0 0 1200 200' preserveAspectRatio='none' className='relative mt-10 h-40 w-full md:h-52' aria-hidden='true'>
                    <defs>
                        <linearGradient id='wave-gradient' x1='0' y1='0' x2='1' y2='0'>
                            <stop offset='0%' stopColor='var(--brand-blue)' stopOpacity='0.4' />
                            <stop offset='55%' stopColor='var(--brand-cyan)' />
                            <stop offset='100%' stopColor='var(--brand-violet)' />
                        </linearGradient>
                    </defs>
                    {WAVES.map((d, i) => (
                        <path
                            key={i}
                            d={d}
                            fill='none'
                            stroke='url(#wave-gradient)'
                            strokeWidth={1.2}
                            strokeOpacity={0.35 + (i % 3) * 0.2}
                            className='wave-line'
                            style={{ animationDelay: `${-i * 0.8}s` }}
                        />
                    ))}
                </svg>
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
                {/* Main Footer Content */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'>
                    {/* Brand Section */}
                    <div className='lg:col-span-2'>
                        <div className='flex flex-col items-start gap-2 mb-4'>
                                <Image
                                    src="/assets/LogoZiedSnoussi.png"
                                    alt='Zied Snoussi'
                                    width={100}
                                    height={100}
                                    className='h-8 w-auto dark:invert dark:brightness-0 dark:contrast-200 transition-opacity'
                                />
                                <div>
                            </div>
                        </div>
                        <p className='text-sm text-muted-foreground mb-6 max-w-md leading-relaxed'>
                            {t('description')}
                        </p>
                        <div className='space-y-3'>
                            <div className='group flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors'>
                                <div className='p-1.5 rounded-md bg-muted group-hover:bg-muted/70 transition-colors'>
                                    <MapPin className='h-4 w-4' />
                                </div>
                                <span>{t('location')}</span>
                            </div>
                            <div className='group flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors'>
                                <div className='p-1.5 rounded-md bg-muted group-hover:bg-muted/70 transition-colors'>
                                    <Mail className='h-4 w-4' />
                                </div>
                                <a href="mailto:ziedalsnoussi@gmail.com" className='hover:text-primary transition-colors'>
                                    ziedalsnoussi@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className='text-sm font-semibold mb-4 tracking-tight'>{t('quickLinks')}</h4>
                        <ul className='space-y-3'>
                            {quickLinks.map((link) => {
                                const IconComponent = link.icon;
                                return (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            onClick={(e) => handleNavClick(e, link.href)}
                                            className='group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer'
                                        >
                                            <IconComponent className='h-4 w-4 transition-transform group-hover:scale-105 group-hover:text-primary' />
                                            <span>{t(`links.${link.nameKey}`)}</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className='text-sm font-semibold mb-4 tracking-tight'>{t('connect')}</h4>
                        <div className='flex flex-wrap gap-2'>
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className={`group p-2.5 rounded-lg text-muted-foreground ${social.color} hover:bg-muted transition-colors hover:shadow-sm`}
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} className='transition-transform group-hover:scale-105' />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <Separator className='mb-8' />

                {/* Bottom Bar */}
                <div className='flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground'>
                    <p className='flex items-center gap-2 flex-wrap justify-center sm:justify-start'>
                        <span suppressHydrationWarning>© {new Date().getFullYear()} Zied Snoussi</span>
                        <span className='hidden sm:inline'>•</span>
                        <span className='inline-flex items-center gap-1.5'>
                            {t('madeWith')} <Heart className='h-3.5 w-3.5 text-red-500 fill-red-500' /> {t('madeIn')}
                        </span>
                    </p>
                    <p className='text-xs text-muted-foreground'>
                        {t('builtWith')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
