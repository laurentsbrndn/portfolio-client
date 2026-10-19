import { useEffect, useRef, type MouseEvent } from 'react';
import type { Project } from '../../types/portfolio';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { ArrowUpRightIcon, CloseIcon, CodeIcon } from '../common/Icons';

interface Props {
  project: Project | null;
  onClose: () => void;
}

/** Native <dialog>: Esc to close, focus trap and focus restore are handled by the browser. */
export const ProjectDetailDialog = ({ project, onClose }: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  // The dialog has no padding, so a click whose target is the dialog itself hit the backdrop
  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) ref.current?.close();
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-labelledby="project-dialog-title"
      className="m-auto w-[calc(100%-2rem)] max-w-3xl overflow-hidden rounded-2xl border border-surface-border bg-background p-0 text-primary shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      {project && (
        <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain">
          {/* Sticky close button stays visible while scrolling */}
          <div className="sticky top-0 z-10 flex h-0 justify-end">
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Close project details"
              className="m-4 grid h-9 w-9 place-items-center rounded-full border border-surface-border bg-background/80 text-primary backdrop-blur transition-colors hover:bg-surface"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>

          {project.thumbnailUrl && (
            <div className="border-b border-surface-border/60 bg-accent-soft">
              <ImageWithFallback
                src={project.thumbnailUrl}
                alt={`${project.title} preview`}
                className="mx-auto max-h-[55dvh] w-full object-contain"
                fallback={null}
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            {project.isFeatured && (
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">Featured project</p>
            )}

            <h2 id="project-dialog-title" className="font-display text-2xl font-bold tracking-tight text-primary md:text-3xl">
              {project.title}
            </h2>

            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-pretty text-secondary md:text-base">
              {project.fullDescription ?? project.shortDescription}
            </p>

            {project.skills.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Tech Stack</h3>
                <ul className="flex flex-wrap gap-1.5">
                  {project.skills.map(({ skill }) => (
                    <li
                      key={skill.id}
                      className="rounded-md border border-surface-border bg-surface px-2.5 py-1 font-mono text-[11px] text-secondary"
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.images.length > 0 && (
              <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {project.images.map((image) => (
                  <li key={image.id}>
                    <ImageWithFallback
                      src={image.imageUrl}
                      alt={image.caption ?? `${project.title} screenshot`}
                      className="w-full rounded-xl border border-surface-border"
                      fallback={null}
                    />
                    {image.caption && (
                      <p className="mt-2 font-mono text-[11px] text-secondary">{image.caption}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {(project.demoUrl || project.repositoryUrl) && (
              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-surface-border/60 pt-6">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-background transition-colors hover:bg-accent-hover"
                  >
                    Live Demo
                    <ArrowUpRightIcon className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.repositoryUrl && (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-surface-border px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-primary transition-colors hover:bg-surface"
                  >
                    <CodeIcon className="h-3.5 w-3.5" />
                    Source Code
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
};