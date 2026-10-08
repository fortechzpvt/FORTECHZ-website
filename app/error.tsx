"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-10">
      <div className="space-y-4 max-w-md">
        <p className="btn-glass">
          System Error
        </p>
        <h1 className="font-display font-bold text-ink text-3xl tracking-[-0.04em] uppercase">
          Something went wrong
        </h1>
        <p className="font-mono text-[0.65rem] text-ink/50 leading-relaxed">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="btn-glass"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
