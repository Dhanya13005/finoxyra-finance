import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { formatINR, monthsBetween } from "../utils/format";

const defaultTargetDate = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
};

const presets = ["New Car", "New House", "Higher Education", "Wedding", "Vacation", "Emergency Fund", "Other"];

export default function Goals() {
  const { goals, addGoal, deleteGoal, totalSavings } = useFinance();
  const [form, setForm] = useState({ name: "", targetAmount: "", saved: "", targetDate: defaultTargetDate() });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.targetAmount) return;
    addGoal({ ...form, targetAmount: Number(form.targetAmount), saved: Number(form.saved) || 0 });
    setForm({ name: "", targetAmount: "", saved: "", targetDate: defaultTargetDate() });
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl md:text-3xl text-cream">Goals</h1>
        <p className="text-cream-dim text-sm mt-1">Want to buy something? Set a target and see exactly what to save each month.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-surface border border-white/5 p-6 sticky top-6">
            <h3 className="font-display text-lg text-cream mb-4">Add a goal</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-cream-dim mb-1.5 block">What are you saving for?</label>
                <input
                  list="goal-presets"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. New Car"
                  className="w-full rounded-xl border border-white/10 bg-pine px-4 py-2.5 text-sm text-cream placeholder:text-cream-dim/50 focus:border-marigold transition-colors"
                />
                <datalist id="goal-presets">
                  {presets.map((p) => <option key={p} value={p} />)}
                </datalist>
              </div>

              <div>
                <label className="text-xs font-medium text-cream-dim mb-1.5 block">Price / target amount (₹)</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={form.targetAmount}
                  onChange={(e) => setForm({ ...form, targetAmount: e.target.value })}
                  placeholder="e.g. 800000"
                  className="w-full rounded-xl border border-white/10 bg-pine px-4 py-2.5 text-sm text-cream font-tabular placeholder:text-cream-dim/50 placeholder:font-body focus:border-marigold transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-cream-dim mb-1.5 block">Already saved toward this (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={form.saved}
                  onChange={(e) => setForm({ ...form, saved: e.target.value })}
                  placeholder="0"
                  className="w-full rounded-xl border border-white/10 bg-pine px-4 py-2.5 text-sm text-cream font-tabular placeholder:text-cream-dim/50 placeholder:font-body focus:border-marigold transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-cream-dim mb-1.5 block">Target date</label>
                <input
                  type="date"
                  required
                  value={form.targetDate}
                  onChange={(e) => setForm({ ...form, targetDate: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-pine px-4 py-2.5 text-sm text-cream font-tabular focus:border-marigold transition-colors"
                />
              </div>

              <button
                type="submit"
                className="mt-1 w-full rounded-xl bg-marigold text-pine font-semibold py-2.5 text-sm hover:bg-marigold-soft transition-colors"
              >
                Add goal
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          {goals.length === 0 ? (
            <div className="rounded-2xl bg-surface border border-white/5 p-8 text-center">
              <p className="text-cream-dim text-sm">
                No goals yet. Add something you want to buy — a car, a house, anything — and
                we'll tell you exactly how much to save each month to get there.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {goals.map((g) => {
                const remaining = Math.max(0, g.targetAmount - g.saved);
                const months = monthsBetween(new Date(), g.targetDate);
                const monthlyNeeded = Math.ceil(remaining / months);
                const pct = Math.min(100, Math.round((g.saved / g.targetAmount) * 100));
                const affordable = totalSavings >= monthlyNeeded;

                return (
                  <div key={g.id} className="rounded-2xl bg-surface border border-white/5 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display text-lg text-cream">{g.name}</h3>
                        <p className="text-xs text-cream-dim font-tabular mt-0.5">
                          Target: {new Date(g.targetDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteGoal(g.id)}
                        className="text-cream-dim hover:text-coral transition-colors text-xs shrink-0"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="h-2 rounded-full bg-white/5 overflow-hidden mb-2">
                      <div className="h-full bg-marigold rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-xs text-cream-dim font-tabular mb-4">
                      {formatINR(g.saved, { compact: true })} of {formatINR(g.targetAmount, { compact: true })} saved ({pct}%)
                    </p>

                    <div className="rounded-xl bg-pine px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-cream-dim">To reach this by your target date, save</p>
                        <p className="font-tabular text-lg font-semibold text-marigold mt-0.5">
                          {formatINR(monthlyNeeded)} <span className="text-xs text-cream-dim font-body">/ month</span>
                        </p>
                      </div>
                      {totalSavings > 0 && (
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${affordable ? "bg-mint/15 text-mint" : "bg-coral/15 text-coral"}`}>
                          {affordable ? "On track" : "Above current savings"}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
