export default function Logo({ size = 32, showWordmark = true, className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="4" y="22" width="6" height="14" rx="1.5" fill="#B67E2C" />
        <rect x="13" y="14" width="6" height="22" rx="1.5" fill="#E8A33D" />
        <rect x="22" y="6" width="6" height="30" rx="1.5" fill="#F0BC6B" />
        <path d="M31 6H36M31 6C33.5 6 35.5 7.6 35.5 10C35.5 12.4 33.5 14 31 14H31.5L36 20" stroke="#EDE7D9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {showWordmark && <span className="font-display text-xl font-semibold tracking-tight text-cream">Finoxyra</span>}
    </div>
  );
}
