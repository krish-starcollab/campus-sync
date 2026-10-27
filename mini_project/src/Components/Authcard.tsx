// Shared auth card layout component
export const inputCls = `w-full px-3.5 py-2.5 text-sm text-slate-800 bg-white border border-slate-200
  rounded-lg outline-none placeholder:text-slate-300
  focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition duration-150`;

export const labelCls = "block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5";

export function AuthCard({
  badge, badgeColor, title, subtitle, children, footer
}: {
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="flex justify-center pt-4">
      <div className="w-full max-w-sm">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor}`}>{badge}</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 pt-6 pb-5 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
            <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
          </div>

          {/* Body */}
          <div className="px-6 py-5">
            {children}
          </div>
        </div>

        {footer && <div className="text-center mt-4 text-sm text-slate-400">{footer}</div>}
      </div>
    </div>
  );
}
