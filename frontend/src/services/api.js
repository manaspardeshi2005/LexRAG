import axios from "axios";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: { "Content-Type": "application/json" },
});

export const askQuestion = async (
  question,
  conversationId
) => {
  const response = await client.post("/ask", {
    question,
    conversation_id: conversationId,
  });

  return response.data;
};