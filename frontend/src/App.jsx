import { useState, useCallback, useEffect } from "react";
import Layout from "./components/layout/Layout";
import ChatWindow from "./components/chat/ChatWindow";
import ChatInput from "./components/chat/ChatInput";
import { askQuestion } from "./services/api";


let msgId = 0;
const uid = () => String(++msgId);

export default function App() {
const [conversations, setConversations] = useState(() => {
  const saved = localStorage.getItem("lexrag-conversations");

  if (saved) {
    return JSON.parse(saved);
  }

  return [
    {
      id: 1,
      title: "New Chat",
      messages: [],
    },
  ];
});

  const [activeConversationId, setActiveConversationId] = useState(() => {
  return Number(localStorage.getItem("lexrag-active")) || 1;
});

  const [isLoading, setIsLoading] = useState(false);    

  const [resetInput, setResetInput] = useState(0);

  const activeConversation =
  conversations.find(
    (c) => c.id === activeConversationId
  ) || conversations[0];
  
  useEffect(() => {
  localStorage.setItem(
    "lexrag-conversations",
    JSON.stringify(conversations)
  );

  localStorage.setItem(
    "lexrag-active",
    activeConversationId
  );
}, [conversations, activeConversationId]);

const push = (role, content) => {
  setConversations((prev) =>
    prev.map((conversation) => {
      if (conversation.id !== activeConversationId)
        return conversation;

      const updatedMessages = [
        ...conversation.messages,
        {
          id: uid(),
          role,
          content,
        },
      ];

      let title = conversation.title;

      // Rename only once using the first user question
      if (
        title === "New Chat" &&
        role === "user"
      ) {
        title =
          typeof content === "string"
            ? content.slice(0, 40)
            : "New Chat";
      }

      return {
        ...conversation,
        title,
        messages: updatedMessages,
      };
    })
  );
};

const handleSelectConversation = (id) => {
  setActiveConversationId(id);
};

  const handleSend = useCallback(
    async (question) => {
      if (isLoading) return;
      push("user", question);
      setIsLoading(true);
      try {
        const data = await askQuestion(question,activeConversationId);
        push("assistant", data);
      } catch {
        push("error", "");
      } finally {
        setIsLoading(false);
      }
    }, [isLoading, activeConversationId]);

const handleDeleteConversation = (id) => {
  setConversations((prev) => {
    const updated = prev.filter((c) => c.id !== id);

    if (updated.length === 0) {
      const fresh = {
        id: Date.now(),
        title: "New Chat",
        messages: [],
      };

      setActiveConversationId(fresh.id);
      return [fresh];
    }

    if (id === activeConversationId) {
      setActiveConversationId(updated[0].id);
    }

    return updated;
  });
};

const handleNewChat = useCallback(() => {

  // Check if there is already an empty conversation
  const emptyConversation = conversations.find(
    (conversation) => conversation.messages.length === 0
  );

  if (emptyConversation) {
    setActiveConversationId(emptyConversation.id);
    return;
  }

  const newConversation = {
    id: Date.now(),
    title: "New Chat",
    messages: [],
  };

  setConversations((prev) => [
    newConversation,
    ...prev,
  ]);

  setActiveConversationId(newConversation.id);

  setIsLoading(false);

  setResetInput((prev) => prev + 1);

}, [conversations]);

  return (
    <Layout
  onNewChat={handleNewChat}
  conversations={conversations}
  activeConversationId={activeConversationId}
  onSelectConversation={handleSelectConversation}
  onDeleteConversation={handleDeleteConversation}
>
      <ChatWindow messages={activeConversation.messages} isLoading={isLoading} onSuggestionClick={handleSend} />
      <ChatInput onSend={handleSend} disabled={isLoading} resetSignal={resetInput}/>
    </Layout>
  );
}