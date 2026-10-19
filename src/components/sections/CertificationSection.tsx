import { useCallback, useState } from 'react';
import type { Certification } from '../../types/portfolio';
import { formatMonthYear } from '../../lib/format';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { Reveal } from '../common/Reveal';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { ArrowRightIcon, ArrowUpRightIcon, BadgeCheckIcon } from '../common/Icons';
import { CertificationDetailDialog } from './CertificationDetailDialog';

interface Props {
  certifications: Certification[];
}

export const CertificationSection = ({ certifications }: Props) => {
  const [selected, setSelected] = useState<Certification | null>(null);
  const closeDialog = useCallback(() => setSelected(null), []);

  return (
    <>
      <Section
        id="credentials"
        index="06"
        tag="Credentials"
        title="Licenses & Certifications"
        subtitle="Professional awards, licenses, and verified credentials."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <Reveal key={cert.id} delay={(index % 3) * 0.08} className="h-full min-w-0">
              <Card className="flex h-full flex-col p-0">
                <div className="relative aspect-[11/8.5] overflow-hidden border-b border-surface-border/60 bg-accent-soft">
                  <ImageWithFallback
                    src={cert.imageUrl}
                    alt={`${cert.title} certificate`}
                    className="absolute inset-0 h-full w-full object-contain"
                    fallback={
                      <div aria-hidden="true" className="bg-dots grid h-full w-full place-items-center text-secondary/40">
                        <BadgeCheckIcon className="h-12 w-12" strokeWidth={1.25} />
                      </div>
                    }
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-secondary">
                    {cert.issuingOrganization}
                  </p>
                  <h3 className="mt-2 font-display text-base font-bold leading-snug tracking-tight text-primary md:text-lg">
                    {cert.title}
                  </h3>
                  <p className="mt-3 font-mono text-xs text-secondary">
                    Issued {formatMonthYear(cert.issueDate, 'long')}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                    {/* Stretched button: the whole card opens the detail dialog */}
                    <button
                      type="button"
                      onClick={() => setSelected(cert)}
                      className="group/more inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary after:absolute after:inset-0 after:content-['']"
                    >
                      View details
                      <span className="sr-only"> of {cert.title}</span>
                      <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover/more:translate-x-0.5 group-hover/card:translate-x-0.5" />
                    </button>

                    {/* z-10 keeps the link independently clickable above the stretched button */}
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 inline-flex items-center gap-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-secondary transition-colors hover:text-primary"
                      >
                        Verify
                        <span className="sr-only"> {cert.title} credential</span>
                        <ArrowUpRightIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <CertificationDetailDialog certification={selected} onClose={closeDialog} />
    </>
  );
};