import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";


import StudentRegister from "./Components/StudentRegister";
import StudentLogin from "./Components/StudentLogin";
import AddEvent from "./Components/AddEvent";
import ViewEvents from "./Components/ViewEvents";

const NAV_GROUPS = [
  {
    section: "Management",
    items: [
      { to: "/add-event", label: "Add Event", icon: "✦" },
      { to: "/events",    label: "Event Tracker", icon: "▦" },
    ],
  },
  
  {
    section: "Student",
    items: [
      { to: "/student-login",    label: "Student Login",    icon: "→" },
      { to: "/student-register", label: "Student Register", icon: "+" },
    ],
  },
];

function SidebarLink({ to, label, icon }: { to: string; label: string; icon: string }) {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
        ${active
          ? "bg-blue-50 text-blue-700 border border-blue-100"
          : "text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-transparent"
        }`}
    >
      <span className={`text-xs w-4 text-center ${active ? "text-blue-500" : "text-slate-400"}`}>{icon}</span>
      {label}
    </Link>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-slate-50 overflow-hidden">

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-slate-200 shrink-0">
          {/* Logo */}
          <div className="px-5 py-5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white text-xs font-bold">CS</span>
              </div>
              <span className="text-sm font-semibold text-slate-800 tracking-tight">
                Campus<span className="text-blue-600">Sync</span>
              </span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
            {NAV_GROUPS.map(group => (
              <div key={group.section}>
                <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  {group.section}
                </p>
                <div className="space-y-0.5">
                  {group.items.map(item => (
                    <SidebarLink key={item.to} {...item} />
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                <span className="text-slate-500 text-[10px] font-bold">A</span>
              </div>
              <span className="text-xs text-slate-400">Admin Portal</span>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto">
          {/* Top bar */}
          <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-8 py-3.5">
            <div className="flex items-center justify-between max-w-3xl">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono-custom">
                <span>CampusSync</span>
                <span>/</span>
                <span className="text-slate-600">Dashboard</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                <span className="text-xs text-slate-400">System online</span>
              </div>
            </div>
          </div>

          <div className="px-8 py-8 max-w-3xl">
            <Routes>
             
              <Route path="/student-register" element={<StudentRegister />} />
              <Route path="/student-login"    element={<StudentLogin />} />
              <Route path="/add-event"        element={<AddEvent />} />
              <Route path="/events"           element={<ViewEvents />} />
              <Route path="*" element={
                <div className="flex flex-col items-start justify-center pt-10">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 text-lg mb-4">✦</div>
                <h1 className="text-2xl font-semibold text-red-500 mb-1">Welcome to CampusSync</h1>
                  <p className="text-slate-400 text-sm">Select an option from the sidebar to get started.</p>
                </div>
              } />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
