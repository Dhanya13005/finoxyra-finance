export function formatINR(value, { compact = false } = {}) {
  const v = Number(value) || 0;
  if (compact) {
    if (Math.abs(v) >= 10000000) return `₹${(v / 10000000).toFixed(2)}Cr`;
    if (Math.abs(v) >= 100000) return `₹${(v / 100000).toFixed(2)}L`;
    if (Math.abs(v) >= 1000) return `₹${(v / 1000).toFixed(1)}K`;
  }
  return `₹${new Intl.NumberFormat("en-IN").format(v)}`;
}

export function formatPercent(value) {
  return `${value > 0 ? "+" : ""}${value}%`;
}

export function monthsBetween(fromDate, toDate) {
  const from = new Date(fromDate);
  const to = new Date(toDate);
  return Math.max(1, (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()));
}
