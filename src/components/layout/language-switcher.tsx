'use client';

import React, { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages, Check } from 'lucide-react';

const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: 'GB' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: 'FR' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: 'TN' },
];

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const currentLanguage = languages.find(lang => lang.code === locale);

    const handleLanguageChange = (newLocale: string) => {
        startTransition(() => {
            router.replace(pathname, { locale: newLocale as 'en' | 'fr' | 'ar' });
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" disabled={isPending} className="relative">
                    {currentLanguage ? (
                        <img
                            src={`https://flagcdn.com/24x18/${currentLanguage.flag.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/48x36/${currentLanguage.flag.toLowerCase()}.png 2x, https://flagcdn.com/72x54/${currentLanguage.flag.toLowerCase()}.png 3x`}
                            width="24"
                            height="18"
                            alt={`${currentLanguage.name} flag`}
                            className="rounded-sm"
                        />
                    ) : (
                        <Languages className="h-4 w-4" />
                    )}
                    <span className="sr-only">Change language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-800 border border-border rounded-md shadow-lg">
                {languages.map((language) => (
                    <DropdownMenuItem
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        disabled={isPending}
                        className={`cursor-pointer flex items-center justify-between ${
                            locale === language.code ? 'bg-muted' : ''
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={`https://flagcdn.com/24x18/${language.flag.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/48x36/${language.flag.toLowerCase()}.png 2x, https://flagcdn.com/72x54/${language.flag.toLowerCase()}.png 3x`}
                                width="24"
                                height="18"
                                alt={`${language.name} flag`}
                                className="rounded-sm"
                            />
                            <div className="flex flex-col">
                                <span className="font-medium">{language.nativeName}</span>
                                <span className="text-xs text-muted-foreground">{language.name}</span>
                            </div>
                        </div>
                        {locale === language.code && (
                            <Check className="h-4 w-4 text-primary" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
