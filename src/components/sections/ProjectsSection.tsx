import { useCallback, useRef, useState } from 'react';
import type { Project } from '../../types/portfolio';
import { cn } from '../../lib/cn';
import { Section } from '../common/Section';
import { Reveal } from '../common/Reveal';
import { HorizontalScroller } from '../common/HorizontalScroller';
import { ArrowRightIcon } from '../common/Icons';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailDialog } from './ProjectDetailDialog';

interface Props {
  projects: Project[];
}

const MAX_FEATURED = 3;
const INITIAL_VISIBLE = 6;
const GRID = 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8';

// Fixed card width in the featured row. Increase these to make the cards bigger.
const FEATURED_ITEM = 'flex w-[85%] max-w-md shrink-0 snap-start sm:w-[26rem] sm:max-w-none lg:w-[28rem]';

export const ProjectsSection = ({ projects }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  const closeDialog = useCallback(() => setSelected(null), []);

  // Featured = flagged in DB (max 3). Fallback: first 3 projects.
  const flagged = projects.filter((p) => p.isFeatured);
  const featured = (flagged.length > 0 ? flagged : projects).slice(0, MAX_FEATURED);
  const featuredIds = new Set(featured.map((p) => p.id));
  const others = projects.filter((p) => !featuredIds.has(p.id));

  const visibleOthers = expanded ? others : others.slice(0, INITIAL_VISIBLE);
  const canExpand = others.length > INITIAL_VISIBLE;

  const toggleExpanded = () => {
    if (expanded) moreRef.current?.scrollIntoView({ block: 'start' });
    setExpanded((value) => !value);
  };

  return (
    <>
      <Section
        id="projects"
        index="03"
        tag="Projects"
        title="Featured Projects"
        subtitle="A showcase of recent projects focusing on fullstack architecture and seamless user experiences."
      >
        {featured.length > 0 && (
          <Reveal>
            <HorizontalScroller label="Featured projects">
              {featured.map((project) => (
                <div key={project.id} className={FEATURED_ITEM}>
                  <ProjectCard project={project} variant="featured" onOpen={setSelected} />
                </div>
              ))}
            </HorizontalScroller>
          </Reveal>
        )}

        {others.length > 0 && (
          <div ref={moreRef} className="mt-20 scroll-mt-32">
            <div className="mb-8 flex items-center gap-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary">More Projects</h3>
              <span aria-hidden="true" className="h-px flex-1 bg-surface-border" />
              <span className="font-mono text-xs text-secondary">{String(others.length).padStart(2, '0')}</span>
            </div>

            <div className={GRID}>
              {visibleOthers.map((project, index) => (
                <Reveal key={project.id} delay={(index % 3) * 0.06} className="h-full min-w-0">
                  <ProjectCard project={project} variant="compact" onOpen={setSelected} />
                </Reveal>
              ))}
            </div>

            {canExpand && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={toggleExpanded}
                  aria-expanded={expanded}
                  className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-background/60 px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.12em] text-primary backdrop-blur transition-all hover:border-secondary/40 hover:bg-surface active:scale-[0.98]"
                >
                  {expanded ? 'Show less' : `Show all projects (${others.length})`}
                  <ArrowRightIcon
                    className={cn('h-3.5 w-3.5 transition-transform duration-300', expanded ? '-rotate-90' : 'rotate-90')}
                  />
                </button>
              </div>
            )}
          </div>
        )}
      </Section>

      <ProjectDetailDialog project={selected} onClose={closeDialog} />
    </>
  );
};