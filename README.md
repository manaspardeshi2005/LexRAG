# ⚖️ LexRAG

An AI-powered legal research assistant for Indian laws built using Retrieval-Augmented Generation (RAG).

LexRAG combines Hybrid Retrieval, Cross-Encoder Re-ranking, Conversation Memory, and History-Aware Query Rewriting to provide accurate, context-aware answers grounded in legal documents.

---

## 🚀 Features

- 🔍 Hybrid Retrieval Pipeline
- 📚 Dense Vector Search using Qdrant
- 🧠 Cross-Encoder Re-ranking
- 💬 Multi-turn Conversational Memory
- 🔄 History-Aware Query Rewriting
- 📄 Source-backed Answers
- ⚡ Retrieval & Generation Time Statistics
- 🗂️ Multi-Conversation Chat Interface
- 💾 Persistent Chat History (Local Storage)
- 📋 Copy Response Button
- 🎨 Modern React + Tailwind UI

---

## 🏗️ Architecture

```
User
   │
   ▼
React Frontend
   │
   ▼
FastAPI Backend
   │
   ▼
Conversation Memory
   │
   ▼
History-Aware Query Rewriter
   │
   ▼
Hybrid Retrieval
(Dense Retrieval + BM25)
   │
   ▼
Cross-Encoder Re-ranking
   │
   ▼
Prompt Construction
   │
   ▼
Groq LLM
   │
   ▼
Answer + Sources
```

---

## 🛠️ Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- Framer Motion
- Axios
- React Markdown

### Backend

- FastAPI
- LangChain
- Qdrant
- HuggingFace Embeddings (BAAI/bge-small-en-v1.5)
- Cross Encoder (ms-marco-MiniLM-L-6-v2)
- Groq Llama Models

---

## 📂 Project Structure

```
LexRAG/
│
├── frontend/
│
├── app.py
├── retrieval.py
├── generator.py
├── memory.py
├── query_rewriter.py
├── ingest.py
├── evaluate.py
├── chunks.pkl
├── docs/
│
├── requirements.txt
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/LexRAG.git

cd LexRAG
```

### Create Environment

```bash
conda create -n tf_env python=3.10

conda activate tf_env
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Configure Environment Variables

Create a `.env` file.

```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
```

---

## ▶️ Run Backend

```bash
uvicorn app:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

---

## ▶️ Run Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 📊 Retrieval Pipeline

1. User submits a legal query.
2. Conversation history is retrieved.
3. Follow-up questions are rewritten into standalone queries.
4. Hybrid Retrieval searches the legal corpus.
5. Cross-Encoder re-ranks retrieved chunks.
6. Relevant context is passed to the LLM.
7. Response is generated with cited legal sources.

---

## 💡 Example Conversation

**User**

> What is theft?

**Assistant**

Explains Section 303 with legal references.

**User**

> What is its punishment?

LexRAG rewrites the question internally to:

> What is the punishment for theft?

before retrieval, enabling context-aware responses.

---

## 🔮 Future Improvements

- User Authentication
- PDF Viewer for Sources
- Streaming Responses
- Conversation Summarization
- Cloud Database
- Docker Deployment
- Role-based Legal Assistant Modes

---

## 📜 License

This project is intended for educational and research purposes.

It should not be considered legal advice.
