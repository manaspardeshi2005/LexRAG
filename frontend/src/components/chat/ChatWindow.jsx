import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Message from "./Message";
import Loader from "../ui/Loader";

function WelcomeScreen({ onSuggestionClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center h-full text-center px-6 select-none"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-6xl mb-6"
      >
        ⚖️
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-white tracking-tight mb-2"
      >
        LexRAG
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-slate-400 text-base mb-6"
      >
        AI-Powered Legal Research Assistant
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-slate-500 text-sm max-w-sm"
      >
        Ask questions about Indian Laws, Acts, Sections and Legal Concepts.
      </motion.p>

      {/* Suggested chips */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="flex flex-wrap justify-center gap-2 mt-8"
      >
       {[
  "What is the Right to Information Act?",
  "What is the punishment for theft",
  "Fundamental rights under Article 19",
  "What is anticipatory bail?",
].map((q) => (
  <button
    key={q}
    onClick={() => onSuggestionClick(q)}
    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 text-xs hover:border-indigo-500 hover:text-white hover:bg-slate-800 transition-all duration-200 cursor-pointer"
  >
    {q}
  </button>
))}
      </motion.div>
    </motion.div>
  );
}

export default function ChatWindow({ messages, isLoading, onSuggestionClick, }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const isEmpty = messages.length === 0;

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
      {isEmpty ? (
        <WelcomeScreen onSuggestionClick={onSuggestionClick} />
      ) : (
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <Message key={msg.id} role={msg.role} content={msg.content} />
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 pl-10"
            >
              <Loader />
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}