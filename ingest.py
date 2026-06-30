from pathlib import Path
import os
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from dotenv import load_dotenv
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_qdrant import QdrantVectorStore

load_dotenv()

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

pdf_folder = Path("docs")

all_docs = []

print("Loading PDFs...\n")

for pdf_file in pdf_folder.glob("*.pdf"):
    try:
        loader = PyPDFLoader(str(pdf_file))
        docs = loader.load()

        # add source metadata
        for doc in docs:
            doc.metadata["source"] = pdf_file.name

        all_docs.extend(docs)

        print(f"{pdf_file.name} -> {len(docs)} pages")

    except Exception as e:
        print(f"Error loading {pdf_file.name}: {e}")




splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=100
)
chunks = splitter.split_documents(all_docs)

embeddings = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-en-v1.5"
)

# vectorstore = QdrantVectorStore.from_documents(
#     documents=chunks,
#     embedding=embeddings,
#     url=QDRANT_URL,
#     api_key=QDRANT_API_KEY,
#     collection_name="LexRAG"
# )

print("Upload Complete!")
print("Collection: LexRAG")
print("Chunks Uploaded:", len(chunks))

import pickle

with open("chunks.pkl", "wb") as f:
    pickle.dump(chunks, f)

print("Chunks saved successfully!")