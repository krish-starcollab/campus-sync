import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthCard, inputCls, labelCls } from "./Authcard";

export default function StudentLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Calls LoginController at /StuLogin/ (port 8082)
  // Returns List<EventModel> which we store in sessionStorage for ViewEvents
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("http://localhost:8082/StuLogin/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const events = await res.json();
        sessionStorage.setItem("studentEvents", JSON.stringify(events));
        navigate("/events");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch { setError("Network error. Is the server running?"); }
    finally { setLoading(false); }
  };

  return (
    <AuthCard
      badge="Student Portal"
      badgeColor="bg-sky-50 text-sky-700 border border-sky-200"
      title="Sign In"
      subtitle="Access your academic events"
      footer={
        <span>
          No account?{" "}
          <button onClick={() => navigate("/student-register")}
            className="text-blue-600 font-medium hover:underline">Register here</button>
        </span>
      }
    >
      <form onSubmit={login} className="space-y-4">
        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-700">
            <span className="mt-0.5">⚠</span> {error}
          </div>
        )}
        <div>
          <label className={labelCls}>Email Address</label>
          <input required type="email" className={inputCls} placeholder="jane@student.edu"
            onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Password</label>
          <input required type="password" className={inputCls} placeholder="••••••••"
            onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" disabled={loading}
          className="w-full mt-1 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition shadow-sm shadow-blue-200">
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </AuthCard>
  );
}
