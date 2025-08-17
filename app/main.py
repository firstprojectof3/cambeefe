# app/main.py (또는 네가 서버 올리는 엔트리 파일)

from fastapi import FastAPI
from routers import chat, user
from routers import notice, feedback, preference

from datetime import datetime 

from app.services.ai.prompt.prompt_builder import build_generic_prompt
from app.models.user_db import get_user_by_id
from app.services.ai.ai_setting import call_openai,client

# env에 불러오기
import os
from dotenv import load_dotenv



# ⬇⬇⬇ [추가] CORS 미들웨어
from fastapi.middleware.cors import CORSMiddleware

# DB 관련 import
from database import engine, get_db
from schema_models import Base

# DB 테이블 생성
Base.metadata.create_all(bind=engine)

# FastAPI 앱 생성
load_dotenv()
app = FastAPI()

# ⬇⬇⬇ [추가] 개발 단계: 전부 허용 (나중에 앱 도메인/IP로 좁히자)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # RN 개발 중 편하게 전체 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# api 키 호출
openai.api_key=os.getenv("OPENAI_API_KEY")

# 챗봇 구성
@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    user = get_user_by_id(req.user_id)
    prompt = build_generic_prompt(user, req.message)
    
    response = call_openai(client,[
        {"role": "system", "content": prompt},
        {"role": "user", "content": req.message}
    ])
    
    if not response or not response.choices:
        return ChatResponse(
        summary="AI 응답을 가져오지 못했습니다.",
        timestamp=datetime.now().isoformat()
    )

    return ChatResponse(
    summary=response.choices[0].message.content,
    timestamp=datetime.now().isoformat()
    
)


# 라우터 연결 (네 코드 그대로)
app.include_router(chat.router, prefix="/api")
app.include_router(user.router, prefix="/api")
app.include_router(notice.router, prefix="/api")
app.include_router(feedback.router, prefix="/api")
app.include_router(preference.router, prefix="/api")

# ⬇⬇⬇ [추가] 헬스체크 엔드포인트: 프론트 연결 확인용
@app.get("/ping")
def ping():
    return {"status": "ok"}
