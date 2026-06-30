from generator import generate_answer

TEST_QUESTIONS = [
    "Why was Section 66A struck down?",
    "What is punishment for theft?",
    "Explain copyright infringement.",
    "What is Article 21?",
    "What is insolvency resolution process?",
    "What is Section 302?",
    "What is trademark infringement?",
    "Explain right to information.",
    "What is a contract?",
    "What is cyber terrorism?"
]


def evaluate():

    print("=" * 80)
    print("LexRAG Evaluation")
    print("=" * 80)

    for i, question in enumerate(TEST_QUESTIONS, start=1):

        print("\n" + "=" * 80)
        print(f"Question {i}")
        print("=" * 80)

        print(f"\nQuestion:\n{question}")

        result = generate_answer(question)

        print(f"\nRetrieved Documents: {result['documents_retrieved']}")
        print(f"Retrieval Time: {result['retrieval_time']} sec")
        print(f"Generation Time: {result['generation_time']} sec")
        print(f"Total Time: {result['total_time']} sec")

        print("\nAnswer:\n")
        print(result["answer"])


if __name__ == "__main__":

    evaluate()