# routers/user.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User as UserModel
from schemas import User

router = APIRouter()

@router.post("/user")
def create_user(user: User, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.user_id == user.user_id).first()
    if db_user:
        raise HTTPException(status_code=400, detail="이미 등록된 사용자입니다.")
    
    new_user = UserModel(
        user_id=user.user_id,
        name=user.name,
        student_number=user.student_number,
        gender=user.gender,
        grade=user.grade,
        school=user.school,
        id=user.id
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "사용자 등록 성공", "user_id": new_user.user_id}


@router.get("/users")
def list_users(db: Session = Depends(get_db)):
    users = db.query(UserModel).all()
    return users
