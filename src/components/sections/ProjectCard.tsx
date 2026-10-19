import type { Project } from '../../types/portfolio';
import { Card } from '../common/Card';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { TagList } from '../common/TagList';
import { ArrowRightIcon, ArrowUpRightIcon, CodeIcon } from '../common/Icons';

interface Props {
  project: Project;
  variant?: 'featured' | 'compact';
  onOpen: (project: Project) => void;
}

export const ProjectCard = ({ project, variant = 'featured', onOpen }: Props) => {
  const featured = variant === 'featured';
  const { title, shortDescription, thumbnailUrl, demoUrl, repositoryUrl, skills } = project;

  return (
    <Card className="flex h-full flex-col p-0">
      {/* Media */}
      <div className="relative aspect-video overflow-hidden border-b border-surface-border/60 bg-accent-soft">
        <ImageWithFallback
          src={thumbnailUrl}
          alt={`${title} preview`}
          className="absolute inset-0 h-full w-full object-contain"
          fallback={
            <div aria-hidden="true" className="bg-dots grid h-full w-full place-items-center">
              <span className="font-display text-6xl font-bold text-secondary/25">{title.charAt(0)}</span>
            </div>
          }
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-display text-lg font-bold tracking-tight text-primary md:text-xl">{title}</h3>

        {shortDescription && (
          <p
            className={`mt-2 text-sm leading-relaxed text-pretty text-secondary ${
              featured ? 'line-clamp-3' : 'line-clamp-2'
            }`}
          >
            {shortDescription}
          </p>
        )}

        {/* Max 2 rows keeps every card the same height; the rest collapses into "+N" */}
        <TagList
          className="mt-4"
          tags={skills.map(({ skill }) => skill.name)}
          maxRows={2}
          label="Tech stack"
        />

        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          {/* Stretched button: the whole card opens the detail dialog */}
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="group/more inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary after:absolute after:inset-0 after:content-['']"
          >
            Read more
            <span className="sr-only"> about {title}</span>
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover/more:translate-x-0.5 group-hover/card:translate-x-0.5" />
          </button>

          {/* z-10 keeps these independently clickable above the stretched button */}
          {(demoUrl || repositoryUrl) && (
            <div className="relative z-10 flex items-center gap-1">
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Live demo of ${title}`}
                  title="Live demo"
                  className="grid h-8 w-8 place-items-center rounded-full text-secondary transition-colors hover:bg-accent-soft hover:text-primary"
                >
                  <ArrowUpRightIcon className="h-4 w-4" />
                </a>
              )}
              {repositoryUrl && (
                <a
                  href={repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Source code of ${title}`}
                  title="Source code"
                  className="grid h-8 w-8 place-items-center rounded-full text-secondary transition-colors hover:bg-accent-soft hover:text-primary"
                >
                  <CodeIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};