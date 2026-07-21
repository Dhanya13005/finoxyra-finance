import { createContext, useContext, useState, useEffect } from "react";

const FinanceContext = createContext(null);

const STORAGE_KEY = "finoxyra_finance";

export const EXPENSE_CATEGORIES = [
  { key: "household", label: "Household", color: "#E8A33D" },
  { key: "food", label: "Food", color: "#4FD1C5" },
  { key: "health", label: "Health", color: "#E85D5D" },
  { key: "entertainment", label: "Entertainment", color: "#F0BC6B" },
  { key: "education", label: "Children's Education", color: "#7FE0D6" },
  { key: "travel", label: "Travel", color: "#B67E2C" },
  { key: "other", label: "Other", color: "#B8B2A3" },
];

const defaultState = {
  income: [],   // { id, source, amount, month }  month = "2026-07"
  expenses: [], // { id, category, amount, note, date }
  goals: [],    // { id, name, targetAmount, saved, targetDate }
};

export function FinanceProvider({ children }) {
  const [data, setData] = useState(defaultState);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  function addIncome(entry) {
    setData((prev) => ({
      ...prev,
      income: [{ ...entry, id: crypto.randomUUID() }, ...prev.income],
    }));
  }

  function deleteIncome(id) {
    setData((prev) => ({ ...prev, income: prev.income.filter((i) => i.id !== id) }));
  }

  function addExpense(entry) {
    setData((prev) => ({
      ...prev,
      expenses: [{ ...entry, id: crypto.randomUUID() }, ...prev.expenses],
    }));
  }

  function deleteExpense(id) {
    setData((prev) => ({ ...prev, expenses: prev.expenses.filter((e) => e.id !== id) }));
  }

  function addGoal(goal) {
    setData((prev) => ({
      ...prev,
      goals: [{ ...goal, id: crypto.randomUUID(), saved: Number(goal.saved) || 0 }, ...prev.goals],
    }));
  }

  function deleteGoal(id) {
    setData((prev) => ({ ...prev, goals: prev.goals.filter((g) => g.id !== id) }));
  }

  const totalIncome = data.income.reduce((sum, i) => sum + Number(i.amount || 0), 0);
  const totalExpenses = data.expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const totalSavings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? Math.round((totalSavings / totalIncome) * 100) : 0;

  return (
    <FinanceContext.Provider
      value={{
        ...data,
        addIncome,
        deleteIncome,
        addExpense,
        deleteExpense,
        addGoal,
        deleteGoal,
        totalIncome,
        totalExpenses,
        totalSavings,
        savingsRate,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used within FinanceProvider");
  return ctx;
}
