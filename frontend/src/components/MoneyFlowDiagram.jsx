const nodes = [
  { key: "salary", label: "Salary", x: 40, y: 100, color: "#F0BC6B" },
  { key: "household", label: "Household", x: 260, y: 30, color: "#E85D5D" },
  { key: "expenses", label: "Daily Expenses", x: 260, y: 100, color: "#B8B2A3" },
  { key: "savings", label: "Savings", x: 260, y: 170, color: "#4FD1C5" },
  { key: "goals", label: "Future Goals", x: 480, y: 170, color: "#E8A33D" },
];

const paths = [
  { d: "M70,95 C140,55 190,35 240,32", color: "#E85D5D", delay: "0s" },
  { d: "M70,102 C140,102 190,102 240,102", color: "#B8B2A3", delay: "0.3s" },
  { d: "M70,110 C140,150 190,168 240,170", color: "#4FD1C5", delay: "0.6s" },
  { d: "M290,172 C360,172 400,172 450,172", color: "#E8A33D", delay: "1.1s" },
];

export default function MoneyFlowDiagram() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 540 210" className="w-full min-w-[480px] h-auto" role="img"
        aria-label="Diagram showing money flowing from salary into household spend, daily expenses, savings, and future goals">
        {paths.map((p, i) => (
          <path key={i} d={p.d} fill="none" stroke={p.color} strokeWidth="2" strokeOpacity="0.55"
            strokeDasharray="6 6" className="animate-flow" style={{ animationDelay: p.delay }} />
        ))}
        {nodes.map((n) => (
          <g key={n.key} className="animate-pulse_dot" style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
            <circle cx={n.x} cy={n.y} r="5" fill={n.color} />
            <text x={n.x} y={n.y - 14} textAnchor="middle" className="font-body" fontSize="12" fill="#EDE7D9" opacity="0.85">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
