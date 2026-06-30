import axios from "axios";

const client = axios.create({
  baseURL: "https://lexrag-production-9cfb.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
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