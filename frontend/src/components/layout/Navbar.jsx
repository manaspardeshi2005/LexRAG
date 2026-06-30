import { HiMenuAlt2 } from "react-icons/hi";

export default function Navbar({ onToggleSidebar }) {
  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-slate-800 bg-slate-950 shrink-0 z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors duration-150 cursor-pointer lg:hidden"
        >
          <HiMenuAlt2 size={20} />
        </button>
        <span className="text-white font-semibold text-base tracking-tight">
          LexRAG
        </span>
      </div>

      <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
        AI Legal Research Assistant
      </span>
    </header>
  );
}