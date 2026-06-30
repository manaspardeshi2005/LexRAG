import { motion, AnimatePresence } from "framer-motion";
import { HiOutlinePencilAlt, HiX } from "react-icons/hi";
import { FiMessageSquare } from "react-icons/fi";



function RecentChat({
  conversation,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
}) {
  const isActive = activeConversationId === conversation.id;

  return (
    <motion.div
      whileHover={{ x: 2 }}
      className={`
        group flex items-center justify-between gap-2 px-3 py-2 rounded-xl
        transition-colors duration-150 cursor-pointer
        ${
          isActive
            ? "bg-slate-800 text-white"
            : "text-slate-400 hover:text-white hover:bg-slate-800"
        }
      `}
      onClick={() => onSelectConversation(conversation.id)}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <FiMessageSquare
          size={14}
          className="shrink-0 text-slate-600 group-hover:text-slate-400"
        />

        <span className="truncate text-sm">
          {conversation.title}
        </span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDeleteConversation(conversation.id);
        }}
        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 hover:text-red-400 transition-all"
      >
        🗑️
      </button>
    </motion.div>
  );
}

export default function Sidebar({
  isOpen,
  onClose,
  onNewChat,
  conversations,
  activeConversationId,
  onSelectConversation,
   onDeleteConversation,
}) {
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar panel */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="
          fixed top-0 left-0 h-full w-64 z-30
          bg-slate-900 border-r border-slate-800
          flex flex-col
          lg:relative lg:translate-x-0 lg:z-auto
        "
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">⚖️</span>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">
                LexRAG
              </p>
              <p className="text-slate-500 text-xs">AI Legal Research</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors duration-150 lg:hidden cursor-pointer"
          >
            <HiX size={16} />
          </button>
        </div>

        {/* New Chat */}
        <div className="px-3 pt-4">
          <motion.button
            onClick={onNewChat}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium shadow-lg shadow-indigo-500/20 transition-colors duration-150 cursor-pointer"
          >
            <HiOutlinePencilAlt size={16} />
            New Chat
          </motion.button>
        </div>

        {/* Recent chats */}
        <div className="px-3 pt-5 flex-1 overflow-y-auto">
          <p className="text-xs font-medium text-slate-600 uppercase tracking-wider px-3 mb-2">
            Recent
          </p>
          <div className="flex flex-col gap-0.5">
           {conversations.map((conversation) => (
  <RecentChat
    key={conversation.id}
    conversation={conversation}
    activeConversationId={activeConversationId}
    onSelectConversation={onSelectConversation}
    onDeleteConversation={onDeleteConversation}
  />
))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-slate-800">
          <p className="text-xs text-slate-600 text-center">
            LexRAG — Research Assistant
          </p>
        </div>
      </motion.aside>
    </>
  );
}