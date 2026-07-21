import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import MoneyFlowDiagram from "../components/MoneyFlowDiagram";
import { useAuth } from "../context/AuthContext";

const features = [
  { title: "Salary & Income Tracking", desc: "Log every source of income and see your true monthly and annual picture." },
  { title: "Expense Categories", desc: "Household, food, health, entertainment, children's education — see exactly where it goes." },
  { title: "Automatic Savings Insight", desc: "We calculate what you're actually saving each month, no spreadsheet needed." },
  { title: "Goal Planning", desc: "Want a car, a house, anything? Set the price, and see what to save monthly to get there." },
];

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-pine">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Logo />
        <Link
          to={user ? "/dashboard" : "/login"}
          className="text-sm font-medium px-4 py-2 rounded-lg bg-marigold text-pine hover:bg-marigold-soft transition-colors"
        >
          {user ? "Go to Dashboard" : "Log in"}
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        <section className="pt-16 md:pt-24 pb-12 text-center">
          <p className="text-marigold font-tabular text-sm tracking-widest uppercase mb-4">
            Built for how Indian income actually moves
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-medium leading-[1.1] text-cream max-w-3xl mx-auto">
            See where every rupee of your salary actually goes.
          </h1>
          <p className="mt-6 text-cream-dim text-lg max-w-xl mx-auto">
            Log your salary, track what you spend on household, food, health and more,
            and know exactly how much you're saving — and what you can afford next.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              to={user ? "/dashboard" : "/register"}
              className="px-6 py-3 rounded-xl bg-marigold text-pine font-semibold hover:bg-marigold-soft transition-colors"
            >
              {user ? "Open Dashboard" : "Get started free"}
            </Link>
          </div>
        </section>

        <section className="rounded-3xl bg-surface border border-white/5 p-8 md:p-12 mb-24">
          <p className="text-sm text-cream-dim mb-6 text-center">How your salary flows through your finances</p>
          <MoneyFlowDiagram />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-24">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/5 bg-surface p-6 hover:bg-surface-hover transition-colors">
              <h3 className="font-display text-xl text-cream mb-2">{f.title}</h3>
              <p className="text-cream-dim text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-cream-dim text-sm">
        Finoxyra — Personal Finance Intelligence, built for India.
      </footer>
    </div>
  );
}
