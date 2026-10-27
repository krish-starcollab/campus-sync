import { useState } from "react";
import { useNavigate } from "react-router-dom";

const inputCls = `w-full px-3.5 py-2.5 text-sm text-slate-800 bg-white border border-slate-200
  rounded-lg outline-none placeholder:text-slate-300
  focus:border-blue-400 focus:ring-2 focus:ring-blue-100
  transition duration-150`;

const labelCls = "block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5";

export default function AddEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "", rNo: "", eventName: "", eventLocation: "",
    eventDate: "", facultyId: "", eventDescription: ""
  });

  const set = (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/events/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, rNo: Number(data.rNo) })
      });
      if (res.ok) { alert("Event published!"); navigate("/events"); }
      else alert("Failed. Check server.");
    } catch { alert("Network error."); }
    finally { setLoading(false); }
  };

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
          <span className="text-white text-sm">✦</span>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Create Event</h1>
          <p className="text-xs text-slate-400 mt-0.5">Register a new student activity</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">

        {/* Section: Student */}
        <div className="px-6 py-5 border-b border-slate-100">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-4">Student Details</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Full Name</label>
              <input required className={inputCls} placeholder="e.g. Krishna Menon" onChange={set("name")} />
            </div>
            <div>
              <label className={labelCls}>Registration Number</label>
              <input required type="number" className={inputCls} placeholder="e.g. 1023" onChange={set("rNo")} />
            </div>
          </div>
        </div>

        {/* Section: Event */}
        <div className="px-6 py-5 border-b border-slate-100">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-4">Event Details</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Event Name</label>
              <input required className={inputCls} placeholder="e.g. Tech Symposium 2025" onChange={set("eventName")} />
            </div>
            <div>
              <label className={labelCls}>Location</label>
              <input required className={inputCls} placeholder="e.g. Main Auditorium" onChange={set("eventLocation")} />
            </div>
            <div>
              <label className={labelCls}>Date</label>
              <input required type="date" className={inputCls} onChange={set("eventDate")} />
            </div>
            <div>
              <label className={labelCls}>Faculty ID</label>
              <input required className={inputCls} placeholder="e.g. FAC-101" onChange={set("facultyId")} />
            </div>
            <div className="md:col-span-2">
              <label className={labelCls}>Description</label>
              <textarea required rows={3} className={`${inputCls} resize-none`}
                placeholder="Briefly describe the event…" onChange={set("eventDescription")} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-slate-50 flex justify-end gap-3">
          <button type="button" onClick={() => navigate("/events")}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition">
            Cancel
          </button>
          <button type="submit" disabled={loading}
            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition shadow-sm shadow-blue-200">
            {loading ? "Publishing…" : "Publish Event"}
          </button>
        </div>
      </form>
    </div>
  );
}
