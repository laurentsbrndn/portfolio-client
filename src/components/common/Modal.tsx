import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { CloseIcon } from './Icons';

interface Props {
  open: boolean;
  onClose: () => void;
  /** id of the element that titles the dialog (for screen readers) */
  labelledBy: string;
  size?: 'md' | 'lg';
  children: ReactNode;
}

/** Native <dialog> wrapper: Esc to close, focus trap, focus restore and backdrop click come from the browser. */
export const Modal = ({ open, onClose, labelledBy, size = 'md', children }: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // The dialog has no padding, so a click whose target is the dialog itself hit the backdrop
  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) ref.current?.close();
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-labelledby={labelledBy}
      className={cn(
        'm-auto w-[calc(100%-2rem)] overflow-hidden rounded-2xl border border-surface-border bg-background p-0 text-primary shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm',
        size === 'lg' ? 'max-w-4xl' : 'max-w-3xl',
      )}
    >
      {open && (
        <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain">
          {/* Sticky close button stays visible while scrolling */}
          <div className="sticky top-0 z-10 flex h-0 justify-end">
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Close details"
              className="m-4 grid h-9 w-9 place-items-center rounded-full border border-surface-border bg-background/80 text-primary backdrop-blur transition-colors hover:bg-surface"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
          {children}
        </div>
      )}
    </dialog>
  );
};