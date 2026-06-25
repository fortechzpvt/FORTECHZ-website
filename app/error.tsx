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
        <p className="font-mono text-[0.6rem] tracking-[0.2em] text-ink/40 uppercase">
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
          className="font-mono text-[0.6rem] tracking-[0.14em] text-ink uppercase
                     px-4 py-2 border border-ink/20 hover:border-ink/50
                     transition-colors duration-200"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
