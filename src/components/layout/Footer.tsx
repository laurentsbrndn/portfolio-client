import type { Profile } from '../../types/portfolio';
import { SocialLinks } from '../common/SocialLinks';

interface Props {
  profile?: Profile | null;
}

export const Footer = ({ profile }: Props) => {
  const name = profile?.fullName?.trim() || 'Laurentius Brandon Vikario';
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-surface-border/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between md:px-8">
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold text-primary">{name}</p>
          <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-secondary">© {year} · All rights reserved.</p>
        </div>

        <SocialLinks profile={profile} />
      </div>
    </footer>
  );
};