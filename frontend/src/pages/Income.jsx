import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { formatINR } from "../utils/format";

const currentMonth = new Date().toISOString().slice(0, 7);

export default function Income() {
  const { income, addIncome, deleteIncome, totalIncome } = useFinance();
  const [form, setForm] = useState({ source: "", amount: "", month: currentMonth });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.source || !form.amount) return;
    addIncome({ ...form, amount: Number(form.amount) });
    setForm({ source: "", amount: "", month: currentMonth });
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl md:text-3xl text-cream">Income</h1>
        <p className="text-cream-dim text-sm mt-1">
          Total logged: <span className="font-tabular text-marigold">{formatINR(totalIncome)}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-surface border border-white/5 p-6">
            <h3 className="font-display text-lg text-cream mb-4">Add income</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-cream-dim mb-1.5 block">Source</label>
                <select
                  required
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-pine px-4 py-2.5 text-sm text-cream focus:border-marigold transition-colors"
                >
                  <option value="" disabled>Select source</option>
                  <option value="Salary">Salary</option>
                  <option value="Bonus">Bonus</option>
                  <option value="Freelancing">Freelancing</option>
                  <option value="Rental Income">Rental Income</option>
                  <option value="Interest Income">Interest Income</option>
                  <option value="Business Income">Business Income</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-cream-dim mb-1.5 block">Amount (₹)</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  placeholder="e.g. 65000"
                  className="w-full rounded-xl border border-white/10 bg-pine px-4 py-2.5 text-sm text-cream font-tabular placeholder:text-cream-dim/50 placeholder:font-body focus:border-marigold transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-cream-dim mb-1.5 block">Month</label>
                <input
                  type="month"
                  required
                  value={form.month}
                  onChange={(e) => setForm({ ...form, month: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-pine px-4 py-2.5 text-sm text-cream font-tabular focus:border-marigold transition-colors"
                />
              </div>

              <button
                type="submit"
                className="mt-1 w-full rounded-xl bg-marigold text-pine font-semibold py-2.5 text-sm hover:bg-marigold-soft transition-colors"
              >
                Add income entry
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-surface border border-white/5 p-6">
            <h3 className="font-display text-lg text-cream mb-4">History</h3>
            {income.length === 0 ? (
              <p className="text-cream-dim text-sm">No income logged yet. Add your first entry to the left.</p>
            ) : (
              <div className="flex flex-col divide-y divide-white/5">
                {income.map((i) => (
                  <div key={i.id} className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm text-cream font-medium">{i.source}</p>
                      <p className="text-xs text-cream-dim font-tabular">{i.month}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-tabular text-sm text-mint">{formatINR(i.amount)}</p>
                      <button
                        onClick={() => deleteIncome(i.id)}
                        className="text-cream-dim hover:text-coral transition-colors text-xs"
                        aria-label={`Delete ${i.source} entry`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
