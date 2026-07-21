import { formatINR } from "../utils/format";

export default function StatCard({ label, value, isPercent, tone = "default", delay = 0 }) {
  const toneColor = tone === "positive" ? "text-mint" : tone === "negative" ? "text-coral" : "text-cream";
  return (
    <div
      className="rounded-2xl bg-surface border border-white/5 p-5 hover:bg-surface-hover transition-colors duration-200 animate-rise opacity-0"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <p className="text-sm text-cream-dim font-medium">{label}</p>
      <p className={`mt-2 font-tabular text-2xl font-semibold ${toneColor}`}>
        {isPercent ? `${value}%` : formatINR(value, { compact: true })}
      </p>
    </div>
  );
}
