import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  "Searching legal documents...",
  "Ranking relevant sections...",
  "Generating legal response...",
];

export default function Loader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % STEPS.length);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-start gap-3 px-1">
      {/* Scale pulse dots */}
      <div className="mt-1 flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-1.5 h-1.5 rounded-full bg-indigo-500"
            animate={{ scaleY: [1, 2, 1] }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Cycling label */}
      <div className="h-5 overflow-hidden relative w-64">
        <AnimatePresence mode="wait">
          <motion.span
            key={STEPS[index]}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="absolute text-sm text-slate-400"
          >
            {STEPS[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}