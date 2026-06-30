import { motion } from "framer-motion";

export default function Card({ children, className = "", animate = false }) {
  const base =
    "bg-slate-900 border border-slate-800 rounded-2xl shadow-md";

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`${base} ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={`${base} ${className}`}>{children}</div>;
}