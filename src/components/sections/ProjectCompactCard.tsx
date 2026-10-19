import type { Project } from '../../types/portfolio';
import { Card } from '../common/Card';
import { ArrowUpRightIcon, CodeIcon } from '../common/Icons';

interface Props {
  project: Project;
}

const MAX_TAGS = 3;

/** Compact card for non-featured projects. The whole card links to the demo (or repo). */
export const ProjectCompactCard = ({ project }: Props) => {
  const { title, shortDescription, demoUrl, repositoryUrl, skills } = project;
  const primaryHref = demoUrl ?? repositoryUrl;
  const showSecondaryRepo = Boolean(demoUrl && repositoryUrl);
  const visibleTags = skills.slice(0, MAX_TAGS);
  const hiddenCount = skills.length - visibleTags.length;

  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <span
          aria-hidden="true"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft font-display text-base font-bold text-secondary ring-1 ring-surface-border"
        >
          {title.charAt(0)}
        </span>
        {primaryHref && (
          <ArrowUpRightIcon className="h-4 w-4 text-secondary transition-all duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-primary" />
        )}
      </div>

      <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-primary">
        {primaryHref ? (
          // Stretched link: the whole card becomes clickable
          <a
            href={primaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 after:content-['']"
          >
            {title}
          </a>
        ) : (
          title
        )}
      </h3>

      {shortDescription && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-pretty text-secondary">
          {shortDescription}
        </p>
      )}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-5">
        {skills.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
            {visibleTags.map(({ skill }) => (
              <li
                key={skill.id}
                className="rounded-md border border-surface-border bg-background px-2 py-0.5 font-mono text-[10px] text-secondary"
              >
                {skill.name}
              </li>
            ))}
            {hiddenCount > 0 && (
              <li className="px-1 py-0.5 font-mono text-[10px] text-secondary">+{hiddenCount}</li>
            )}
          </ul>
        ) : (
          <span />
        )}

        {showSecondaryRepo && (
          // Sits above the stretched link so it stays independently clickable
          <a
            href={repositoryUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-secondary transition-colors hover:text-primary"
          >
            <CodeIcon className="h-3.5 w-3.5" />
            Source
            <span className="sr-only"> code of {title}</span>
          </a>
        )}
      </div>
    </Card>
  );
};