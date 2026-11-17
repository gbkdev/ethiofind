export default function HeroBlob({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none select-none blob-anim ${className}`}
      width="520"
      height="520"
      viewBox="0 0 520 520"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="heroBlobGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(var(--indigo))" stopOpacity="0.22" />
          <stop offset="55%" stopColor="rgb(var(--ochre))" stopOpacity="0.18" />
          <stop offset="100%" stopColor="rgb(var(--rust))" stopOpacity="0.14" />
        </linearGradient>
      </defs>
      <path
        fill="url(#heroBlobGradient)"
        d="M420.5 84.5Q470 169 447 253.5Q424 338 350 388Q276 438 191.5 415Q107 392 68 312.5Q29 233 63 155.5Q97 78 176 45Q255 12 337.5 30Q420 48 420.5 84.5Z"
      />
    </svg>
  );
}
