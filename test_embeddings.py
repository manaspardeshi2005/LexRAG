from langchain_huggingface import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-en-v1.5"
)

vector = embeddings.embed_query(
    "What is punishment for theft?"
)

print("Dimension:", len(vector))
print(vector[:10])