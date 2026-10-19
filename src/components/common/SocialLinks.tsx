import type { ComponentType, SVGProps } from 'react';
import type { Profile } from '../../types/portfolio';
import { cn } from '../../lib/cn';
import { toEmailHref, toExternalUrl } from '../../lib/format';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons';

interface Props {
  profile?: Profile | null;
  className?: string;
}

interface SocialLink {
  label: string;
  href?: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const SocialLinks = ({ profile, className }: Props) => {
  const links: SocialLink[] = [
    { label: 'LinkedIn', href: toExternalUrl(profile?.linkedinUrl), Icon: LinkedInIcon },
    { label: 'GitHub', href: toExternalUrl(profile?.githubUrl), Icon: GitHubIcon },
    { label: 'Email', href: toEmailHref(profile?.emailUrl, profile?.email), Icon: MailIcon },
  ];

  const available = links.filter((link): link is SocialLink & { href: string } => Boolean(link.href));
  if (available.length === 0) return null;

  return (
    <ul className={cn('flex items-center gap-1', className)}>
      {available.map(({ label, href, Icon }) => {
        const isExternal = !href.startsWith('mailto:');
        return (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              title={label}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="grid h-9 w-9 place-items-center rounded-full text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-soft hover:text-primary"
            >
              <Icon className="h-4 w-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
};