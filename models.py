# models.py
from sqlalchemy import Column, Integer, String, DateTime
from database import Base
from datetime import datetime

class ChatLog(Base):
    __tablename__ = "chat_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String)
    message = Column(String)
    summary = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)


class UserPreference(Base):
    __tablename__ = "user_preferences"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    preferred_topics = Column(String)  # 예: "공지,학식"
    notification_time = Column(String, nullable=True)
    language = Column(String, default="ko")

class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    message_id = Column(Integer, nullable=True)
    feedback_text = Column(String, nullable=True)
    rating = Column(Integer, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, unique=True, index=True)
    name = Column(String)
    student_number = Column(Integer)
    gender = Column(String)
    grade = Column(Integer)
    school = Column(String)

    
