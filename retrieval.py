import os
import pickle
import time
from dotenv import load_dotenv

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_qdrant import QdrantVectorStore
from langchain_classic.retrievers import EnsembleRetriever
from langchain_community.retrievers import BM25Retriever
from langchain_groq import ChatGroq
from sentence_transformers import CrossEncoder

load_dotenv()

# =====================================================
# Load Everything Once
# =====================================================

print("Loading Embeddings...")

embeddings = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-en-v1.5"
)

print("Connecting to Qdrant...")

vectorstore = QdrantVectorStore.from_existing_collection(
    embedding=embeddings,
    collection_name="LexRAG",
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY")
)

print("Loading Chunks...")

with open("chunks.pkl", "rb") as f:
    chunks = pickle.load(f)

print(f"Loaded {len(chunks)} chunks")

bm25_retriever = BM25Retriever.from_documents(chunks)
bm25_retriever.k = 5

dense_retriever = vectorstore.as_retriever(
    search_type="similarity",
    search_kwargs={
        "k": 5
    }
)

hybrid_retriever = EnsembleRetriever(
    retrievers=[
        bm25_retriever,
        dense_retriever
    ],
    weights=[0.4, 0.6]
)

print("Loading Reranker...")

reranker = CrossEncoder(
    "cross-encoder/ms-marco-MiniLM-L-6-v2"
)

print("Loading LLM...")

llm = ChatGroq(
    model="llama-3.1-8b-instant",
    temperature=0,
    max_tokens=512
)

print("LexRAG Ready!\n")


# =====================================================
# Retrieval + Reranking
# =====================================================

def retrieve(query):
    start=time.perf_counter()
    docs = hybrid_retriever.invoke(query)

    pairs = [
        (query, doc.page_content)
        for doc in docs
    ]

    scores = reranker.predict(pairs)

    ranked_results = sorted(
        zip(docs, scores),
        key=lambda x: x[1],
        reverse=True
    )
    retrieval_time=time.perf_counter()-start

    return ranked_results,retrieval_time


# =====================================================
# Testing
# =====================================================

if __name__ == "__main__":

    query = "Why was Section 66A struck down?"

    results = retrieve(query)

    for rank, (doc, score) in enumerate(results, start=1):

        print("\n" + "=" * 60)
        print(f"Rank {rank}")
        print(f"Score: {float(score):.4f}")

        print("\nSource:")
        print(doc.metadata["source"])

        print("\nContent:")
        print(doc.page_content[:300])