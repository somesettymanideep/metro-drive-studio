import { useState, FormEvent } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import logoUrl from "@/assets/metro-cars-logo.png";

const USERNAME = "metrocars";
const PASSWORD = "Metrocars@@2026";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (typeof window !== "undefined" && localStorage.getItem("mc_admin") === "1") {
    return <Navigate to="/admin/add-inventory" replace />;
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (username.trim() === USERNAME && password === PASSWORD) {
        localStorage.setItem("mc_admin", "1");
        navigate("/admin/add-inventory");
      } else {
        setError("Invalid username or password.");
        setLoading(false);
      }
    }, 300);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black px-4 py-10">
      <Helmet>
        <title>Admin Login | Metro Cars Vijayawada</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src={logoUrl}
            alt="Metro Cars"
            className="h-20 w-auto drop-shadow-[0_0_25px_rgba(255,90,0,0.45)]"
          />
          <h1 className="mt-4 text-2xl font-bold text-white tracking-tight">
            Admin Login
          </h1>
          <p className="text-sm text-white/60 mt-1">
            Sign in to manage inventory
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl space-y-5"
        >
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[var(--brand-orange)] focus:ring-2 focus:ring-[var(--brand-orange)]/30 transition"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
              <input
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-11 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[var(--brand-orange)] focus:ring-2 focus:ring-[var(--brand-orange)]/30 transition"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white shadow-[0_10px_30px_-10px_rgba(255,90,0,0.6)] transition-all hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
            style={{ background: "var(--gradient-orange)" }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-xs text-white/40">
            Restricted area — authorized personnel only.
          </p>
        </form>
      </div>
    </main>
  );
}