import type { Education } from '../../types/portfolio';
import { formatDateRange } from '../../lib/format';
import { Section } from '../common/Section';
import { Timeline } from '../common/Timeline';
import { TimelineItem } from '../common/TimelineItem';
import { Description } from '../common/Description';

interface Props {
  education: Education[];
}

const formatGpa = (value: unknown): string | null => {
  if (value === null || value === undefined || value === '') return null;
  const num = Number(value);
  return Number.isFinite(num) ? num.toFixed(2) : null;
};

const buildDegree = ({ degree, fieldOfStudy }: Education) =>
  degree && fieldOfStudy ? `${degree} in ${fieldOfStudy}` : degree || fieldOfStudy || undefined;

export const EducationSection = ({ education }: Props) => (
  <Section
    id="education"
    index="02"
    tag="Education"
    title="Academic Background"
    subtitle="Formal education and institutional studies."
  >
    <Timeline>
      {education.map((item) => {
        const gpa = formatGpa(item.gpa);
        return (
          <TimelineItem
            key={item.id}
            title={item.institution}
            subtitle={buildDegree(item)}
            dateRange={formatDateRange(item.startDate, item.endDate, item.isCurrent, 'year')}
            isCurrent={item.isCurrent}
          >
            {(gpa || item.description) && (
              <div className="space-y-4">
                {gpa && (
                  <div className="inline-flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold tracking-tight text-primary">{gpa}</span>
                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-secondary">GPA</span>
                  </div>
                )}
                {item.description && <Description text={item.description} />}
              </div>
            )}
          </TimelineItem>
        );
      })}
    </Timeline>
  </Section>
);