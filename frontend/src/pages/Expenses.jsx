import { useState } from "react";
import { useFinance, EXPENSE_CATEGORIES } from "../context/FinanceContext";
import { formatINR } from "../utils/format";

const today = new Date().toISOString().slice(0, 10);

export default function Expenses() {
  const { expenses, addExpense, deleteExpense, totalExpenses } = useFinance();
  const [form, setForm] = useState({ category: "", amount: "", note: "", date: today });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.category || !form.amount) return;
    addExpense({ ...form, amount: Number(form.amount) });
    setForm({ category: "", amount: "", note: "", date: today });
  }

  const categoryTotals = EXPENSE_CATEGORIES.map((cat) => ({
    ...cat,
    total: expenses.filter((e) => e.category === cat.key).reduce((s, e) => s + Number(e.amount), 0),
  }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl md:text-3xl text-cream">Expenses</h1>
        <p className="text-cream-dim text-sm mt-1">
          Total logged: <span className="font-tabular text-coral">{formatINR(totalExpenses)}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-surface border border-white/5 p-6">
            <h3 className="font-display text-lg text-cream mb-4">Add expense</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-cream-dim mb-1.5 block">Category</label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-pine px-4 py-2.5 text-sm text-cream focus:border-marigold transition-colors"
                >
                  <option value="" disabled>Select category</option>
                  {EXPENSE_CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>{c.label}</option>
                  ))}
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
                  placeholder="e.g. 3500"
                  className="w-full rounded-xl border border-white/10 bg-pine px-4 py-2.5 text-sm text-cream font-tabular placeholder:text-cream-dim/50 placeholder:font-body focus:border-marigold transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-cream-dim mb-1.5 block">Note (optional)</label>
                <input
                  type="text"
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  placeholder="e.g. Groceries"
                  className="w-full rounded-xl border border-white/10 bg-pine px-4 py-2.5 text-sm text-cream placeholder:text-cream-dim/50 focus:border-marigold transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-cream-dim mb-1.5 block">Date</label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-pine px-4 py-2.5 text-sm text-cream font-tabular focus:border-marigold transition-colors"
                />
              </div>

              <button
                type="submit"
                className="mt-1 w-full rounded-xl bg-marigold text-pine font-semibold py-2.5 text-sm hover:bg-marigold-soft transition-colors"
              >
                Add expense entry
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="rounded-2xl bg-surface border border-white/5 p-6">
            <h3 className="font-display text-lg text-cream mb-4">By category</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categoryTotals.map((c) => (
                <div key={c.key} className="rounded-xl border border-white/5 bg-pine px-4 py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                    <p className="text-xs text-cream-dim">{c.label}</p>
                  </div>
                  <p className="font-tabular text-sm text-cream font-semibold">{formatINR(c.total, { compact: true })}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-surface border border-white/5 p-6">
            <h3 className="font-display text-lg text-cream mb-4">History</h3>
            {expenses.length === 0 ? (
              <p className="text-cream-dim text-sm">No expenses logged yet. Add your first one to the left.</p>
            ) : (
              <div className="flex flex-col divide-y divide-white/5 max-h-96 overflow-y-auto">
                {expenses.map((e) => {
                  const cat = EXPENSE_CATEGORIES.find((c) => c.key === e.category);
                  return (
                    <div key={e.id} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: cat?.color }} />
                        <div>
                          <p className="text-sm text-cream font-medium">{cat?.label}{e.note ? ` — ${e.note}` : ""}</p>
                          <p className="text-xs text-cream-dim font-tabular">{e.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-tabular text-sm text-coral">{formatINR(e.amount)}</p>
                        <button
                          onClick={() => deleteExpense(e.id)}
                          className="text-cream-dim hover:text-coral transition-colors text-xs"
                          aria-label="Delete expense entry"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
