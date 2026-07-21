import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-pine flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo size={36} />
        </div>

        <div className="rounded-2xl bg-surface border border-white/5 p-8">
          <h1 className="font-display text-2xl text-cream text-center mb-1">Create your account</h1>
          <p className="text-cream-dim text-sm text-center mb-7">Takes less than a minute</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-medium text-cream-dim mb-1.5 block">Full name</label>
              <input
                type="text"
                required
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="Aditya Rao"
                className="w-full rounded-xl border border-white/10 bg-pine px-4 py-2.5 text-sm text-cream placeholder:text-cream-dim/50 focus:border-marigold transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-cream-dim mb-1.5 block">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-pine px-4 py-2.5 text-sm text-cream placeholder:text-cream-dim/50 focus:border-marigold transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-cream-dim mb-1.5 block">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="At least 6 characters"
                className="w-full rounded-xl border border-white/10 bg-pine px-4 py-2.5 text-sm text-cream placeholder:text-cream-dim/50 focus:border-marigold transition-colors"
              />
            </div>

            {error && (
              <p className="text-coral text-xs bg-coral/10 border border-coral/20 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-marigold text-pine font-semibold py-2.5 text-sm hover:bg-marigold-soft transition-colors disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-cream-dim mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-marigold font-medium hover:text-marigold-soft">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
