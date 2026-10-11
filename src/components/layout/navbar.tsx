'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { 
    Menu, 
    Home, 
    User, 
    FolderKanban, 
    GraduationCap, 
    Briefcase, 
    Award, 
    BarChart3, 
    Mail 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from './theme-toggle';
import { LanguageSwitcher } from './language-switcher';

export default function Navbar() {
    const t = useTranslations('Navbar');
    const tCommon = useTranslations('Common');
    const [open, setOpen] = useState(false);

    const navItems = [
        { name: t("Home"), link: "/#home", icon: Home },
        { name: t("About"), link: "/#about", icon: User },
        { name: t("Projects"), link: "/#projects", icon: FolderKanban },
        { name: t("Education"), link: "/#education", icon: GraduationCap },
        { name: t("Work"), link: "/#work", icon: Briefcase },
        { name: t("Skills"), link: "/#skills", icon: Award },
        { name: t("GitHub Stats"), link: "/#github", icon: BarChart3 },
        { name: t("Contact"), link: "/#contact", icon: Mail },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
        e.preventDefault();
        const targetId = link.replace('/#', '');
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <nav className='fixed top-0 z-50 w-full border-b border-brand-blue/15 bg-background/70 backdrop-blur-xl'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 items-center justify-between'>
                    {/* Logo */}
                    <a 
                        href={navItems[0].link} 
                        onClick={(e) => handleNavClick(e, navItems[0].link)}
                        className='flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer'
                    >
                        <Image
                            src="/assets/LogoZiedSnoussi.png"
                            alt='Zied Snoussi'
                            width={100}
                            height={100}
                            className='h-8 w-auto dark:invert dark:brightness-0 dark:contrast-200 transition-opacity'
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <div className='hidden lg:flex lg:items-center lg:gap-1'>
                        {navItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <a
                                    key={item.link}
                                    href={item.link}
                                    onClick={(e) => handleNavClick(e, item.link)}
                                    className='group relative flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md transition-colors cursor-pointer after:absolute after:inset-x-3 after:-bottom-px after:h-px after:scale-x-0 after:bg-gradient-to-r after:from-brand-cyan after:to-brand-violet after:transition-transform hover:after:scale-x-100'
                                >
                                    <IconComponent className='h-4 w-4 transition-transform group-hover:scale-105' />
                                    <span>{item.name}</span>
                                </a>
                            );
                        })}
                        <div className='ml-2 flex items-center gap-4'>
                            <LanguageSwitcher />
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div className='flex items-center gap-4 lg:hidden'>
                        <LanguageSwitcher />
                        <ThemeToggle />
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className='lg:hidden'>
                                    <Menu className='h-5 w-5' />
                                    <span className='sr-only'>{tCommon('toggleMenu')}</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className='bg-white/98 dark:bg-background/95 backdrop-blur-xl border-l border-border'>
                                <SheetHeader>
                                    <SheetTitle className='text-foreground'>{tCommon('navigation')}</SheetTitle>
                                </SheetHeader>
                                <div className='flex flex-col gap-3 mt-8'>
                                    {navItems.map((item) => {
                                        const IconComponent = item.icon;
                                        return (
                                            <a
                                                key={item.link}
                                                href={item.link}
                                                onClick={(e) => {
                                                    handleNavClick(e, item.link);
                                                    setOpen(false);
                                                }}
                                                className='group flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors py-3 px-3 rounded-lg cursor-pointer'
                                            >
                                                <IconComponent className='h-5 w-5 transition-transform group-hover:scale-105 group-hover:text-primary' />
                                                <span>{item.name}</span>
                                            </a>
                                        );
                                    })}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
}
