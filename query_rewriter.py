from langchain_core.prompts import ChatPromptTemplate
from retrieval import llm

REWRITE_PROMPT = ChatPromptTemplate.from_template("""
You are an expert at rewriting follow-up questions.

Conversation History:
{history}

Current Question:
{question}

Rewrite the current question into a complete standalone question.

Rules:
- Preserve the original meaning.
- Resolve pronouns like "it", "its", "they", "them", "this", "that".
- Do not answer the question.
- Return ONLY the rewritten question.
""")

rewrite_chain = REWRITE_PROMPT | llm


FOLLOWUP_WORDS = {
    "it",
    "its",
    "they",
    "them",
    "their",
    "this",
    "that",
    "these",
    "those",
    "he",
    "she",
    "his",
    "her",
}


def rewrite_question(question, history):

    # No conversation yet
    if not history.strip():
        return question

    question_lower = question.lower().split()

    # Looks like a standalone question -> skip rewriting
    if not any(word in question_lower for word in FOLLOWUP_WORDS):
        return question

    response = rewrite_chain.invoke({
        "history": history,
        "question": question
    })

    return response.content.strip()