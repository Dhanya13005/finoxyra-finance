# Finoxyra Frontend v2 — Setup Guide

This replaces your entire `frontend` folder — it's a full rebuild, cleaner than before,
with real Login/Register and working Income/Expense/Goals tracking.

## What's new in this version

- **`/login`** and **`/register`** pages — working forms, currently using mock authentication
  (stored in your browser's localStorage) until the real backend Auth module is connected
- **`/dashboard`** (Overview) — now shows real numbers based on what you enter, with a proper
  empty state prompting you to add your first income/expense
- **`/dashboard/income`** — add income entries (Salary, Bonus, Freelancing, etc.) with amount and month
- **`/dashboard/expenses`** — add expenses by category (Household, Food, Health, Entertainment,
  Children's Education, Travel, Other), see totals per category
- **`/dashboard/goals`** — the "I want to buy X" planner: enter what you're saving for, the price,
  what you've already saved, and a target date — it calculates exactly how much you need to save
  per month to hit that date, and flags whether that's realistic given your current savings rate
- Protected routes — you can't reach `/dashboard/*` without being logged in
- A "Log out" button in the sidebar

All data (login state, income, expenses, goals) is currently stored in your browser's
localStorage — meaning it persists across refreshes but only on this browser, and isn't
connected to your MySQL database yet. That's intentional, matching the "frontend first,
backend wiring second" order we agreed on.

## 1. Replace your existing frontend folder

Delete your current `FINOXYRA/frontend` folder entirely, then copy everything from this
zip's `finoxyra-frontend` folder into its place — same as last time.

## 2. Install and run

```bash
cd frontend
npm install
npm run dev
```

Open the printed localhost URL (usually `http://localhost:5173`).

## 3. Try the flow

1. Landing page → click "Get started free"
2. Fill in the Register form (any values — it's mock auth right now, no real validation against a database)
3. You'll land on the Dashboard with an empty state
4. Go to **Income** → add a salary entry
5. Go to **Expenses** → add a few expenses across different categories
6. Go back to **Overview** → see your stats and category breakdown fill in
7. Go to **Goals** → add something you want to buy (e.g. "New Car", ₹8,00,000, target date a year out) → see the monthly savings figure

## 4. Project structure

```
src/
├── context/
│   ├── AuthContext.jsx      — mock login/register, swap for real API later
│   └── FinanceContext.jsx   — income/expenses/goals state + calculations
├── layouts/
│   └── DashboardLayout.jsx  — sidebar + page outlet
├── components/
│   ├── Logo.jsx
│   ├── MoneyFlowDiagram.jsx
│   ├── Sidebar.jsx
│   ├── StatCard.jsx
│   └── ProtectedRoute.jsx
├── pages/
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Overview.jsx
│   ├── Income.jsx
│   ├── Expenses.jsx
│   └── Goals.jsx
├── utils/
│   └── format.js
├── App.jsx
├── main.jsx
└── index.css
```

## What's mock vs what connects to the real backend later

- `AuthContext.jsx` — has a comment marking exactly where to swap in real `fetch()` calls
  to `/api/auth/login` and `/api/auth/register` once you're ready to connect it
- `FinanceContext.jsx` — currently reads/writes localStorage; this is where Income/Expense/Goal
  REST APIs will plug in once those backend modules exist

## Next steps

1. Run this and make sure the whole flow works for you end to end
2. Once you're happy with the UX, we'll build the backend **Income module** (entity, repository,
   controller, matching what this form sends) and then connect `FinanceContext.jsx` to real APIs
   instead of localStorage
