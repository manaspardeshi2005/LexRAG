from langchain_core.prompts import ChatPromptTemplate
from retrieval import retrieve, llm
import time
from memory import add_message, get_history
from query_rewriter import rewrite_question

LEGAL_PROMPT = ChatPromptTemplate.from_template(
"""
You are LexRAG, an AI-powered legal research assistant.

Answer ONLY using the retrieved legal documents.

Rules:
- Never use outside knowledge.
- Never invent legal provisions.
- If the retrieved documents are insufficient, say:
"The provided legal documents do not contain enough information to answer this question."
- Combine information from multiple documents if needed.
- Write in professional but easy-to-understand language.
Conversation History:
{history}
Context:
{context}
Question:
{question}

Respond in the following format.

### Summary
(A short answer in one paragraph.)

### Legal Provisions
(List the applicable Act and Section numbers.)

### Explanation
(Explain the legal provision in simple language.)

### Sources
(List only the unique documents and page numbers used.)
"""
)


def format_context(results):

    context = ""

    for i, (doc, score) in enumerate(results, start=1):

        context += f"""
========== DOCUMENT {i} ==========
Relevance Score:
{float(score):.2f}

Act:
{doc.metadata.get("source")}

Page:
{doc.metadata.get("page")}

Content:
{doc.page_content}

==================================

"""

    return context


def generate_answer(question,conversation_id):

    history = get_history(conversation_id)

    rewritten_question = rewrite_question(
    question,
    history
)

    print("\n==============================")
    print("Original Question :", question)
    print("Rewritten Question:", rewritten_question)
    print("==============================\n")

    results, retrieval_time = retrieve(rewritten_question)

    context = format_context(results)


    chain = LEGAL_PROMPT | llm

    generation_start=time.perf_counter()

    response = chain.invoke({
        "history": history,
        "question": question,
        "context": context
    })
    generation_time = time.perf_counter() - generation_start

    add_message(
    conversation_id,
    "user",
    question,
)

    add_message(
    conversation_id,
    "assistant",
    response.content,
)

    return {
        "answer": response.content,
        "documents_retrieved": len(results),
        "retrieval_time": round(retrieval_time, 3),
        "generation_time": round(generation_time, 3),
        "total_time": round(retrieval_time + generation_time, 3)
    }

if __name__ == "__main__":

    question = "What is punishment for theft?"

    answer = generate_answer(question)

    print(answer)