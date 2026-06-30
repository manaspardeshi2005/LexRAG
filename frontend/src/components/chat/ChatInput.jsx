import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { IoSendSharp } from "react-icons/io5";

export default function ChatInput({ onSend, disabled, resetSignal }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);
useEffect(() => {
  if (textareaRef.current) {
    textareaRef.current.style.height = "auto";
    textareaRef.current.focus();
  }
}, [resetSignal]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    // Auto-grow
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
    }
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="px-4 py-4 border-t border-slate-800 bg-slate-950">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end gap-3 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 shadow-lg shadow-black/30 focus-within:border-indigo-500/60 transition-colors duration-200">
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Ask anything about Indian law..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 resize-none outline-none leading-relaxed min-h-[24px] max-h-[180px] disabled:opacity-50"
          />
          <motion.button
            onClick={handleSubmit}
            disabled={!canSend}
            whileHover={{ scale: canSend ? 1.08 : 1 }}
            whileTap={{ scale: canSend ? 0.93 : 1 }}
            className={`
              shrink-0 w-8 h-8 rounded-xl flex items-center justify-center
              transition-colors duration-150 cursor-pointer
              ${
                canSend
                  ? "bg-indigo-500 hover:bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                  : "bg-slate-800 text-slate-600 cursor-not-allowed"
              }
            `}
          >
            <IoSendSharp size={14} />
          </motion.button>
        </div>
        <p className="text-center text-xs text-slate-600 mt-2">
          LexRAG may produce errors. Verify important legal information independently.
        </p>
      </div>
    </div>
  );
}