import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({
  children,
  onNewChat,
  conversations,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-white">
      {/* Desktop sidebar — always visible on lg+ */}
      <div className="hidden lg:flex">
        <Sidebar
  isOpen={true}
  onClose={() => {}}
  onNewChat={onNewChat}
  conversations={conversations}
  activeConversationId={activeConversationId}
  onSelectConversation={onSelectConversation}
  onDeleteConversation={onDeleteConversation}
/>
      </div>

      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <Sidebar
  isOpen={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
  onNewChat={() => {
    onNewChat();
    setSidebarOpen(false);
  }}
  conversations={conversations}
  activeConversationId={activeConversationId}
  onDeleteConversation={onDeleteConversation}
  onSelectConversation={(id) => {
    onSelectConversation(id);
    setSidebarOpen(false);
  }}
/>
      </div>

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 h-full">
        <Navbar onToggleSidebar={() => setSidebarOpen((p) => !p)} />
        <main className="flex flex-col flex-1 min-h-0">{children}</main>
      </div>
    </div>
  );
}