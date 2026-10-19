interface Props {
  onRetry: () => void;
}

export const ErrorState = ({ onRetry }: Props) => (
  <div role="alert" className="grid min-h-dvh place-items-center bg-background px-6">
    <div className="max-w-md text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">Something went wrong</p>
      <h1 className="mt-3 font-display text-2xl font-bold text-primary md:text-3xl">
        Couldn&apos;t load the portfolio
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-secondary">
        The server may be temporarily unavailable. Please try again in a moment.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-hover active:scale-[0.98]"
      >
        Try again
      </button>
    </div>
  </div>
);