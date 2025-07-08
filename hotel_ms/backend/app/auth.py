from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt, JWTError
from passlib.hash import bcrypt
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .database import aio_session
from . import models, schemas

SECRET_KEY = "CHANGE_ME_SECRET_KEY"  # put in env in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 1 day

router = APIRouter(prefix="/api", tags=["auth"])

async def get_db() -> AsyncSession:
    async with aio_session() as session:
        yield session


def create_access_token(data: dict, expires_delta: int = ACCESS_TOKEN_EXPIRE_MINUTES):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_delta)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


@router.post("/register", response_model=schemas.UserCreate)
async def register(user: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    existing = (await db.execute(select(models.User).where(models.User.username == user.username))).scalar_one_or_none()
    if existing:
        raise HTTPException(status_code=400, detail="用户名已存在")
    db_user = models.User(
        username=user.username,
        password_hash=bcrypt.hash(user.password),
        is_admin=False,
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return schemas.UserCreate(username=db_user.username, password="******")


@router.post("/login", response_model=schemas.LoginResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    user = (await db.execute(select(models.User).where(models.User.username == form_data.username))).scalar_one_or_none()
    if not user or not bcrypt.verify(form_data.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="用户名或密码错误")

    token = create_access_token({"sub": user.username, "role": "admin" if user.is_admin else "user"})
    return {"access_token": token, "token_type": "bearer", "role": "admin" if user.is_admin else "user"}
