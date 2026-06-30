import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/20",
  ghost:
    "bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700",
  danger: "bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-800",
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
  icon,
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
        transition-colors duration-150 cursor-pointer
        disabled:opacity-40 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {icon && <span className="text-base">{icon}</span>}
      {children}
    </motion.button>
  );
}