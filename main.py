
# main.py
from fastapi import FastAPI
from routers import chat

# ✅ DB 관련 import
from database import engine, get_db
from models import Base

from routers import chat, user


# ✅ DB 테이블 생성
Base.metadata.create_all(bind=engine)

# ✅ FastAPI 앱 생성
app = FastAPI()

# 라우터 연결
app.include_router(chat.router, prefix="/api")

app.include_router(user.router, prefix="/api")

