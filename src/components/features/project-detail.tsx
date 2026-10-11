'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowLeft, Calendar, Check, ExternalLink, GitBranch, Lock } from 'lucide-react';
import { useRouter } from '@/i18n/routing';
import { Navbar, Footer } from '@/components/layout';
import { useTranslations } from 'next-intl';
import { VT_IMAGE, VT_TITLE, morphBackToCard } from '@/lib/view-transition';
import type { Project } from '@/data';

interface ProjectDetailClientProps {
  project: Project;
  projectId: string;
}

const isPublic = (url: string) => url.startsWith('http');

export default function ProjectDetailClient({ project, projectId }: ProjectDetailClientProps) {
  const router = useRouter();
  const t = useTranslations('ProjectDetail');

  const goBack = () =>
    morphBackToCard(projectId, () => {
      // Came from the portfolio: go back (keeps scroll position). Landed directly: open the projects section.
      if (document.referrer.startsWith(window.location.origin) && window.history.length > 1) router.back();
      else router.push('/#projects');
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main data-vt-page="project" className="relative overflow-x-clip px-6 pt-28 pb-24 lg:px-20">
        <div className="glow-blob -top-20 left-1/4 h-[420px] w-[420px] bg-brand-blue/50" />
        <div className="glow-blob top-1/2 -right-20 h-[380px] w-[380px] bg-brand-violet/50" />

        <div className="relative z-10 mx-auto max-w-5xl space-y-10">
          <button
            type="button"
            onClick={goBack}
            className="group inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-brand-blue/60 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1" />
            {t('backToProjects')}
          </button>

          {/* Header */}
          <header className="space-y-4">
            <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brand-cyan">
              <Calendar className="h-3.5 w-3.5" />
              {project.date}
            </p>
            <h1 style={{ viewTransitionName: VT_TITLE }} className="w-fit text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              {project.title}
            </h1>
          </header>

          {/* Hero image: the card image morphs into this */}
          <div className="rounded-2xl bg-gradient-to-br from-brand-blue/60 via-brand-violet/50 to-brand-cyan/40 p-px shadow-2xl shadow-brand-violet/20">
            <div style={{ viewTransitionName: VT_IMAGE }} className="relative aspect-video w-full overflow-hidden rounded-2xl bg-card">
              <Image src={project.photoUrl} alt={project.title} fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover object-top" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {isPublic(project.demoUrl) && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-blue/20 transition-transform hover:-translate-y-0.5"
              >
                <ExternalLink className="h-4 w-4" />
                {t('liveDemo')}
              </a>
            )}
            {isPublic(project.githubUrl) ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-brand-blue/50 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-brand-blue/10"
              >
                <GitBranch className="h-4 w-4" />
                {t('viewSource')}
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                {t('privateSource')}
              </span>
            )}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* About */}
            <section className="glass-panel rounded-2xl p-6 md:p-8 lg:col-span-2">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand-cyan">{t('aboutProject')}</h2>
              <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-muted-foreground">{project.description}</p>
              {project.highlights && project.highlights.length > 0 && (
                <>
                  <h3 className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-brand-cyan">{t('highlights')}</h3>
                  <ul className="mt-4 space-y-3">
                    {project.highlights.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>

            {/* Stack */}
            <section className="glass-panel rounded-2xl p-6 md:p-8">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand-cyan">{t('technologiesUsed')}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3 py-1 text-sm text-foreground/90">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Gallery: extra screenshots, each opens full size in a new tab */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="space-y-4">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand-cyan">{t('gallery')}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {project.gallery.map((src, i) => (
                  <a
                    key={src}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block aspect-video overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-brand-blue/60"
                  >
                    <Image
                      src={src}
                      alt={`${project.title} · ${i + 2}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
