import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthCard, inputCls, labelCls } from "./Authcard";

export default function StudentRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", rNo: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  // Calls RegisterController at /regStudent/ (port 8082)
  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("http://localhost:8082/regStudent/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rNo: Number(form.rNo) })
      });
      if (res.ok) { alert("Registered! Please sign in."); navigate("/student-login"); }
      else setError("Registration failed. Please try again.");
    } catch { setError("Network error. Is the server running?"); }
    finally { setLoading(false); }
  };

  return (
    <AuthCard
      badge="Student Portal"
      badgeColor="bg-sky-50 text-sky-700 border border-sky-200"
      title="Create Account"
      subtitle="Register your student profile"
      footer={
        <span>
          Already registered?{" "}
          <button onClick={() => navigate("/student-login")}
            className="text-blue-600 font-medium hover:underline">Sign in</button>
        </span>
      }
    >
      <form onSubmit={register} className="space-y-4">
        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-700">
            <span className="mt-0.5">⚠</span> {error}
          </div>
        )}
        <div>
          <label className={labelCls}>Roll Number</label>
          <input required className={inputCls} placeholder="e.g. 1023" onChange={set("rNo")} />
        </div>
        <div>
          <label className={labelCls}>Full Name</label>
          <input required className={inputCls} placeholder="Jane Doe" onChange={set("name")} />
        </div>
        <div>
          <label className={labelCls}>Email Address</label>
          <input required type="email" className={inputCls} placeholder="jane@student.edu" onChange={set("email")} />
        </div>
        <div>
          <label className={labelCls}>Password</label>
          <input required type="password" className={inputCls} placeholder="••••••••" onChange={set("password")} />
        </div>
        <button type="submit" disabled={loading}
          className="w-full mt-1 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition shadow-sm shadow-blue-200">
          {loading ? "Registering…" : "Register"}
        </button>
      </form>
    </AuthCard>
  );
}
