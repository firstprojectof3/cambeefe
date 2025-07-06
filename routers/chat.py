# cambee-backend/routers/chat.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from crud import get_user_by_id
from schemas import ChatRequest, ChatResponse
from datetime import datetime
import requests

from database import get_db
from models import ChatLog

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat_api(request: ChatRequest, db: Session = Depends(get_db)):
    
    user = get_user_by_id(db, request.user_id)
    
    if not user:
        return ChatResponse(
            summary="사용자 정보를 찾을 수 없습니다.",
            timestamp=datetime.utcnow().isoformat()
        )
    
    
    # 승현벗 서버에 요청 보내기 (AI_Study에서 실행 중인 서버)
    ai_server_url = "http://localhost:8000/chat"  # 승현벗 서버 주소
    full_message = f"{user.user_id}님의 학년은 {user.grade}학년입니다.\n질문: {request.message}"

    try:
        response = requests.post(ai_server_url, json={"message": full_message})
        response.raise_for_status()
        ai_result = response.json()
        
        summary = ai_result["summary"]
  
        
         # ✅ DB에 저장
        chat_log = ChatLog(
            user_id=request.user_id,
            message=request.message,
            summary=summary,
            timestamp=datetime.utcnow()
        )
        db.add(chat_log)
        db.commit()
        
        
        
        return ChatResponse(
        summary=summary,
        timestamp=datetime.utcnow().isoformat()
        )
        
    except Exception as e:
        return ChatResponse(
            summary=f"AI 서버 오류: {e}",
            timestamp=datetime.utcnow().isoformat()
        )
