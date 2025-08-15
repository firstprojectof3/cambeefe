# database.py
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base

DB_URL = URL.create(
    drivername="postgresql+psycopg2",
    username="cambee_admin",
    password="Cambee2025!",  # 비밀번호
    host="cambee-db.c10wgg8su66w.ap-northeast-2.rds.amazonaws.com",
    port=5432,
    database="cambee_db",
)

engine = create_engine(DB_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
