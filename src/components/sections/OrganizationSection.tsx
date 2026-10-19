import type { OrganizationExperience } from '../../types/portfolio';
import { formatDateRange, formatDuration } from '../../lib/format';
import { Section } from '../common/Section';
import { Timeline } from '../common/Timeline';
import { TimelineItem } from '../common/TimelineItem';
import { Description } from '../common/Description';

interface Props {
  organizations: OrganizationExperience[];
}

export const OrganizationSection = ({ organizations }: Props) => (
  <Section
    id="organization"
    index="04"
    tag="Organization"
    title="Organization & Leadership"
    subtitle="My involvement in communities, leadership roles, and organizational experiences."
  >
    <Timeline>
      {organizations.map((item) => (
        <TimelineItem
          key={item.id}
          title={item.role}
          subtitle={item.organizationName}
          dateRange={formatDateRange(item.startDate, item.endDate, item.isCurrent)}
          duration={formatDuration(item.startDate, item.endDate, item.isCurrent)}
          isCurrent={item.isCurrent}
        >
          {item.description && <Description text={item.description} />}
        </TimelineItem>
      ))}
    </Timeline>
  </Section>
);