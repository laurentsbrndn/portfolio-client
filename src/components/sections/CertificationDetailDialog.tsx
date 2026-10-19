import type { Certification } from '../../types/portfolio';
import { formatMonthYear } from '../../lib/format';
import { Modal } from '../common/Modal';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { ArrowUpRightIcon } from '../common/Icons';

interface Props {
  certification: Certification | null;
  onClose: () => void;
}

export const CertificationDetailDialog = ({ certification, onClose }: Props) => (
  <Modal
    open={Boolean(certification)}
    onClose={onClose}
    labelledBy="certification-dialog-title"
    size="lg"
  >
    {certification && (
      <>
        {certification.imageUrl && (
          <div className="border-b border-surface-border/60 bg-accent-soft">
            <ImageWithFallback
              src={certification.imageUrl}
              alt={`${certification.title} certificate`}
              className="mx-auto max-h-[60dvh] w-full object-contain"
              fallback={null}
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">
            {certification.issuingOrganization}
          </p>

          <h2
            id="certification-dialog-title"
            className="mt-3 font-display text-2xl font-bold tracking-tight text-primary md:text-3xl"
          >
            {certification.title}
          </h2>

          <p className="mt-3 font-mono text-xs text-secondary">
            Issued {formatMonthYear(certification.issueDate, 'long')}
          </p>

          {(certification.credentialUrl || certification.imageUrl) && (
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-surface-border/60 pt-6">
              {certification.credentialUrl && (
                <a
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-background transition-colors hover:bg-accent-hover"
                >
                  Verify Credential
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </a>
              )}
              {certification.imageUrl && (
                <a
                  href={certification.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-surface-border px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-primary transition-colors hover:bg-surface"
                >
                  Full Size Image
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          )}
        </div>
      </>
    )}
  </Modal>
);