import { useState, useEffect } from "react";

interface Event {
  id?: string;
  eventName: string;
  name: string;
  rNo: number;
  eventLocation: string;
  eventDate?: string;
  facultyId?: string;
  eventDescription?: string;
}

export default function ViewEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [rno, setRno] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Load events forwarded from student login
  useEffect(() => {
    const stored = sessionStorage.getItem("studentEvents");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEvents(parsed);
          setHasSearched(true);
        }
      } catch {}
      sessionStorage.removeItem("studentEvents");
    }
  }, []);

  const fetchEvents = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/events/number/${rno}`);
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : [data]);
      setHasSearched(true);
    } catch {
      setEvents([]); setHasSearched(true);
    } finally { setLoading(false); }
  };

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center">
          <span className="text-white text-sm">▦</span>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Event Tracker</h1>
          <p className="text-xs text-slate-400 mt-0.5">Search and view student event records</p>
        </div>
      </div>

      {/* Search */}
      <form onSubmit={fetchEvents} className="flex gap-2 mb-8 max-w-md">
        <input
          required
          value={rno}
          onChange={e => setRno(e.target.value)}
          placeholder="Enter Registration Number…"
          className="flex-1 px-3.5 py-2.5 text-sm text-slate-800 bg-white border border-slate-200 rounded-lg outline-none placeholder:text-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
        />
        <button type="submit" disabled={loading}
          className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition shadow-sm shadow-blue-200 whitespace-nowrap">
          {loading ? "…" : "Search"}
        </button>
      </form>

      {/* Empty state */}
      {hasSearched && events.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300 text-2xl mb-3">⊘</div>
          <p className="text-sm font-medium text-slate-500">No events found</p>
          <p className="text-xs text-slate-400 mt-1">No records match this registration number.</p>
        </div>
      )}

      {/* Results count */}
      {events.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            {events.length} {events.length === 1 ? "Event" : "Events"} Found
          </span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>
      )}

      {/* Event list */}
      <div className="space-y-2">
        {events.map((ev, i) => {
          const key = ev.id ?? String(i);
          const open = expanded === key;
          return (
            <div key={key}
              className={`bg-white border rounded-xl overflow-hidden transition-all duration-200
                ${open ? "border-blue-200 shadow-sm shadow-blue-50" : "border-slate-200 hover:border-slate-300"}`}>

              {/* Card header */}
              <button
                type="button"
                onClick={() => setExpanded(open ? null : key)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left"
              >
                <div className={`w-2 h-2 rounded-full shrink-0 ${open ? "bg-blue-500" : "bg-slate-300"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{ev.eventName}</p>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{ev.eventLocation}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {ev.eventDate && (
                    <span className="text-xs text-slate-400 font-mono-custom hidden sm:block">{ev.eventDate}</span>
                  )}
                  <span className={`text-lg leading-none transition-transform duration-200 text-slate-400
                    ${open ? "rotate-45" : ""}`}>+</span>
                </div>
              </button>

              {/* Expanded details */}
              {open && (
                <div className="px-5 pb-5 border-t border-slate-100">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 mb-4">
                    {[
                      { label: "Student",    value: ev.name },
                      { label: "Reg. No",    value: ev.rNo },
                      { label: "Date",       value: ev.eventDate  ?? "—" },
                      { label: "Faculty ID", value: ev.facultyId  ?? "—" },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">{label}</p>
                        <p className="text-sm font-medium text-slate-700">{value}</p>
                      </div>
                    ))}
                  </div>
                  {ev.eventDescription && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5">Description</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{ev.eventDescription}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
