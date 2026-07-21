import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import StatCard from "../components/StatCard";
import { useFinance, EXPENSE_CATEGORIES } from "../context/FinanceContext";
import { useAuth } from "../context/AuthContext";
import { formatINR } from "../utils/format";

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="rounded-lg bg-pine-light border border-white/10 px-3 py-2 text-xs">
      <p className="font-tabular" style={{ color: p.payload.color }}>
        {p.name}: {formatINR(p.value, { compact: true })}
      </p>
    </div>
  );
}

export default function Overview() {
  const { user } = useAuth();
  const { income, expenses, goals, totalIncome, totalExpenses, totalSavings, savingsRate } = useFinance();

  const expenseByCategory = EXPENSE_CATEGORIES.map((cat) => ({
    name: cat.label,
    color: cat.color,
    value: expenses.filter((e) => e.category === cat.key).reduce((s, e) => s + Number(e.amount), 0),
  })).filter((c) => c.value > 0);

  const hasData = income.length > 0 || expenses.length > 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl md:text-3xl text-cream">Hi, {user?.fullName?.split(" ")[0] || "there"}</h1>
        <p className="text-cream-dim text-sm mt-1">Here's your financial picture right now</p>
      </div>

      {!hasData && (
        <div className="rounded-2xl bg-surface border border-white/5 p-8 text-center mb-8">
          <h2 className="font-display text-xl text-cream mb-2">Let's get your numbers in</h2>
          <p className="text-cream-dim text-sm mb-5 max-w-md mx-auto">
            Add your salary and your first few expenses, and this page fills in automatically —
            your savings rate, spending breakdown, and progress toward your goals.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/dashboard/income" className="px-4 py-2 rounded-lg bg-marigold text-pine text-sm font-semibold hover:bg-marigold-soft transition-colors">
              Add income
            </Link>
            <Link to="/dashboard/expenses" className="px-4 py-2 rounded-lg border border-white/10 text-cream text-sm font-medium hover:bg-white/5 transition-colors">
              Add an expense
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Income" value={totalIncome} delay={0} />
        <StatCard label="Total Expenses" value={totalExpenses} delay={60} tone={totalExpenses > 0 ? "negative" : "default"} />
        <StatCard label="Savings" value={totalSavings} delay={120} tone={totalSavings >= 0 ? "positive" : "negative"} />
        <StatCard label="Savings Rate" value={savingsRate} isPercent delay={180} tone={savingsRate >= 0 ? "positive" : "negative"} />
      </div>

      {expenseByCategory.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          <div className="rounded-2xl bg-surface border border-white/5 p-6 lg:col-span-1">
            <h3 className="font-display text-lg text-cream mb-4">Where it's going</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={expenseByCategory} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {expenseByCategory.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-2">
              {expenseByCategory.map((e) => (
                <div key={e.name} className="flex items-center gap-1.5 text-xs text-cream-dim">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: e.color }} />
                  {e.name}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-surface border border-white/5 p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg text-cream">Goals</h3>
              <Link to="/dashboard/goals" className="text-xs text-marigold hover:text-marigold-soft">View all</Link>
            </div>
            {goals.length === 0 ? (
              <p className="text-cream-dim text-sm">No goals yet. Add one to see how close you are.</p>
            ) : (
              <div className="flex flex-col gap-5">
                {goals.slice(0, 3).map((g) => {
                  const pct = Math.min(100, Math.round((g.saved / g.targetAmount) * 100));
                  return (
                    <div key={g.id}>
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-sm font-medium text-cream">{g.name}</p>
                        <p className="text-xs text-cream-dim font-tabular">{pct}%</p>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full bg-marigold rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="mt-1.5 text-xs text-cream-dim font-tabular">
                        {formatINR(g.saved, { compact: true })} of {formatINR(g.targetAmount, { compact: true })}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
