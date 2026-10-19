import type { WorkExperience } from '../../types/portfolio';
import { formatDateRange, formatDuration } from '../../lib/format';
import { Section } from '../common/Section';
import { Timeline } from '../common/Timeline';
import { TimelineItem } from '../common/TimelineItem';
import { Description } from '../common/Description';

interface Props {
  work: WorkExperience[];
}

export const WorkSection = ({ work }: Props) => (
  <Section
    id="work"
    index="01"
    tag="Work"
    title="Professional Experience"
    subtitle="My career journey and professional roles in software development."
  >
    <Timeline>
      {work.map((item) => (
        <TimelineItem
          key={item.id}
          title={item.role}
          subtitle={item.companyName}
          meta={item.employmentType}
          logoUrl={item.companyLogoUrl}
          dateRange={formatDateRange(item.startDate, item.endDate, item.isCurrent)}
          duration={formatDuration(item.startDate, item.endDate, item.isCurrent)}
          location={item.location}
          isCurrent={item.isCurrent}
        >
          {item.description && <Description text={item.description} />}
        </TimelineItem>
      ))}
    </Timeline>
  </Section>
);