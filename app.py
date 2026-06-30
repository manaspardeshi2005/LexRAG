from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from generator import generate_answer


app = FastAPI(
    title="LexRAG API",
    description="AI-powered Legal Research Assistant",
    version="1.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://lex-rag-theta.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class QueryRequest(BaseModel):
    question: str
    conversation_id: int


@app.get("/")
def home():
    return {
        "message": "Welcome to LexRAG API"
    }


@app.post("/ask")
def ask(request: QueryRequest):

    result = generate_answer(request.question,request.conversation_id,)

    return result


if __name__ == "__main__":

    import uvicorn

    uvicorn.run(
        "app:app",
        host="127.0.0.1",
        port=8000,
        reload=True
    )