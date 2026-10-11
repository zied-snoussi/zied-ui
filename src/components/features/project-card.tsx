'use client';
import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight, Calendar, FolderCode } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProjectProps {
    project: {
        title: string;
        photoUrl: string;
        date: string;
        description: string;
        skills: string[];
        githubUrl: string;
        demoUrl: string;
    };
    projectId: string;
}

export default function Project({ project, projectId }: ProjectProps) {
    const router = useRouter();
    const t = useTranslations('Common');
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleViewDetails = () => {
        router.push(`/projects/${projectId}`);
    };

    return (
        <Card className="group h-full min-h-[420px] flex flex-col overflow-hidden hover:border-primary transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-0.5" onClick={handleViewDetails}>
            {/* Enhanced Image Section */}
            <div className="relative h-52 w-full overflow-hidden bg-muted flex-shrink-0">
                {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 bg-muted animate-pulse" />
                )}
                
                {imageError ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3 opacity-50">
                            <div className="p-3 rounded-full bg-slate-800/50 ring-1 ring-white/10">
                                <FolderCode className="w-8 h-8 text-slate-400" /> 
                            </div>
                            <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">About Project</span>
                        </div>
                    </div>
                ) : (
                    <Image
                        src={project.photoUrl}
                        alt={project.title}
                        fill
                        className={`object-cover object-top group-hover:scale-105 transition-all duration-300 ${
                            imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => {
                            setImageError(true);
                            setImageLoaded(true);
                        }}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-200" />
                
                {/* Quick Action Buttons Overlay */}
                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                    {project.demoUrl !== '/confidential' && (
                        <Button 
                            variant="secondary" 
                            size="icon"
                            className="h-8 w-8 bg-background/90 hover:bg-background backdrop-blur-sm"
                            asChild
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                            <a 
                                href={project.demoUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label={t('liveDemo')}
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                        </Button>
                    )}
                    {project.githubUrl !== '/confidential' && (
                        <Button 
                            variant="secondary" 
                            size="icon"
                            className="h-8 w-8 bg-background/90 hover:bg-background backdrop-blur-sm"
                            asChild
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                            <a 
                                href={project.githubUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label={t('githubRepository')}
                            >
                                <Github className="h-3.5 w-3.5" />
                            </a>
                        </Button>
                    )}
                </div>
            </div>
            
            <CardContent className='p-5 flex-1 flex flex-col'>
                {/* Title and Date */}
                <div className='mb-3'>
                    <h3 className="text-xl font-bold mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
                        {project.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{project.date}</span>
                    </div>
                </div>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                </p>
                
                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5 font-normal">
                            {skill}
                        </Badge>
                    ))}
                    {project.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs px-2 py-0.5 font-normal">
                            +{project.skills.length - 3}
                        </Badge>
                    )}
                </div>
            </CardContent>

            {/* View Details Footer */}
            <CardFooter className='p-5 pt-0'>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-between group/btn hover:bg-primary/5"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails();
                    }}
                >
                    <span className="text-sm font-medium">{t('viewDetails')}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
            </CardFooter>
        </Card>
    );
}
