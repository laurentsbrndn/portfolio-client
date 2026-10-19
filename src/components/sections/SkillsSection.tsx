import { motion, type Variants } from 'framer-motion';
import type { Language, Skill } from '../../types/portfolio';
import { cn } from '../../lib/cn';
import { EASE_OUT, VIEWPORT, stagger } from '../../lib/motion';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { Reveal } from '../common/Reveal';

interface Props {
  skills: Skill[];
  languages: Language[];
}

const chip: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
};

// Single source of truth: technical and interpersonal chips always look and behave the same
const CHIP_CLASS =
  'inline-flex cursor-default items-center gap-2 rounded-xl border border-surface-border bg-background px-4 py-2 text-sm font-medium text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-sm';

const count = (n: number) => String(n).padStart(2, '0');

const ChipList = ({ skills }: { skills: Skill[] }) => (
  <motion.ul
    initial="hidden"
    whileInView="visible"
    viewport={VIEWPORT}
    variants={stagger(0.03)}
    className="flex flex-wrap gap-2.5"
  >
    {skills.map((skill) => (
      <motion.li key={skill.id} variants={chip}>
        <span title={skill.proficiencyLevel ?? undefined} className={CHIP_CLASS}>
          {skill.iconUrl && (
            <img src={skill.iconUrl} alt="" loading="lazy" decoding="async" className="h-4 w-4 object-contain" />
          )}
          {skill.name}
          {skill.proficiencyLevel && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-secondary">
              {skill.proficiencyLevel}
            </span>
          )}
        </span>
      </motion.li>
    ))}
  </motion.ul>
);

export const SkillsSection = ({ skills, languages }: Props) => {
  const hardSkills = skills.filter((s) => s.category === 'HARD');
  const softSkills = skills.filter((s) => s.category === 'SOFT');
  const hasSideCards = softSkills.length > 0 || languages.length > 0;

  return (
    <Section
      id="skills"
      index="05"
      tag="Skills"
      title="Competencies"
      subtitle="Technical stack, methodologies, and languages mastered over the years."
      texture="dots"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {hardSkills.length > 0 && (
          <Reveal className={cn('h-full', hasSideCards ? 'md:col-span-2 md:row-span-2' : 'md:col-span-3')}>
            <Card className="h-full p-6 md:p-10">
              <div className="mb-8 flex items-end justify-between">
                <h3 className="font-display text-xl font-bold tracking-tight text-primary md:text-2xl">
                  Technical Skills
                </h3>
                <span className="font-mono text-xs text-secondary">{count(hardSkills.length)}</span>
              </div>
              <ChipList skills={hardSkills} />
            </Card>
          </Reveal>
        )}

        {softSkills.length > 0 && (
          <Reveal delay={0.08} className="h-full">
            <Card className="h-full p-6 md:p-8">
              <div className="mb-6 flex items-end justify-between">
                <h3 className="font-display text-lg font-bold tracking-tight text-primary">Soft Skills</h3>
                <span className="font-mono text-xs text-secondary">{count(softSkills.length)}</span>
              </div>
              <ChipList skills={softSkills} />
            </Card>
          </Reveal>
        )}

        {languages.length > 0 && (
          <Reveal delay={0.16} className="h-full">
            <Card className="h-full p-6 md:p-8">
              <div className="mb-5 flex items-end justify-between">
                <h3 className="font-display text-lg font-bold tracking-tight text-primary">Languages</h3>
                <span className="font-mono text-xs text-secondary">{count(languages.length)}</span>
              </div>
              <ul className="divide-y divide-surface-border/70">
                {languages.map((lang) => (
                  <li key={lang.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                    <span className="text-sm font-semibold text-primary">{lang.name}</span>
                    <span className="text-right font-mono text-xs text-secondary">{lang.proficiency}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        )}
      </div>
    </Section>
  );
};