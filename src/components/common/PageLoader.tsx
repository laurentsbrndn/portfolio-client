const block = 'bg-surface-border/70';

export const PageLoader = () => (
  <div role="status" aria-live="polite" className="min-h-dvh bg-background">
    <span className="sr-only">Loading portfolio…</span>

    <div aria-hidden="true" className="mx-auto max-w-7xl animate-pulse px-6 md:px-8">
      <div className="flex items-center justify-between py-5">
        <div className={`h-8 w-8 rounded-lg ${block}`} />
        <div className={`h-9 w-28 rounded-full ${block}`} />
      </div>

      <div className="grid items-center gap-14 pt-20 md:grid-cols-[1fr_auto] md:pt-32">
        <div className="order-2 space-y-5 md:order-1">
          <div className={`mx-auto h-7 w-44 rounded-full md:mx-0 ${block}`} />
          <div className={`h-14 w-full max-w-xl rounded-lg ${block}`} />
          <div className={`h-14 w-3/4 max-w-md rounded-lg ${block}`} />
          <div className={`h-5 w-full max-w-lg rounded ${block}`} />
          <div className={`h-5 w-2/3 max-w-md rounded ${block}`} />
          <div className="flex justify-center gap-3 pt-4 md:justify-start">
            <div className={`h-11 w-36 rounded-full ${block}`} />
            <div className={`h-11 w-36 rounded-full ${block}`} />
          </div>
        </div>
        <div className={`order-1 mx-auto h-48 w-48 rounded-full sm:h-56 sm:w-56 md:order-2 lg:h-72 lg:w-72 ${block}`} />
      </div>
    </div>
  </div>
);