export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <a
        href="https://www.instagram.com/fortechz_pvt_ltd/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fortechz on Instagram"
        className="w-9 h-9 flex items-center justify-center text-ink/40 hover:text-accent transition-colors duration-200"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
        </svg>
      </a>
      <a
        href="https://www.tiktok.com/@fortechz"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fortechz on TikTok"
        className="w-9 h-9 flex items-center justify-center text-ink/40 hover:text-accent transition-colors duration-200"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M16.6 2h-3.2v14.2a3.1 3.1 0 1 1-2.2-2.97V9.9a6.3 6.3 0 1 0 5.4 6.24V8.62a7.9 7.9 0 0 0 4.6 1.47V6.9a4.7 4.7 0 0 1-4.6-4.9Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  );
}
