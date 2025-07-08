"""API routers grouped in a single APIRouter instance"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from .database import aio_session
from . import models, schemas
from passlib.context import CryptContext
from jose import jwt
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import status
import os

SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "devsecret")
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter(prefix="/api")

async def get_session() -> AsyncSession:
    async with aio_session() as session:
        yield session

# Rooms
@router.post("/rooms", response_model=schemas.Room)
async def create_room(room: schemas.RoomCreate, session: AsyncSession = Depends(get_session)):
    db_room = models.Room(**room.model_dump())
    session.add(db_room)
    await session.commit()
    await session.refresh(db_room)
    return db_room

@router.get("/rooms", response_model=list[schemas.Room])
async def list_rooms(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.Room))
    return result.scalars().all()

# Employees
@router.post("/employees", response_model=schemas.Employee)
async def create_employee(employee: schemas.EmployeeCreate, session: AsyncSession = Depends(get_session)):
    db_employee = models.Employee(**employee.model_dump())
    session.add(db_employee)
    await session.commit()
    await session.refresh(db_employee)
    return db_employee

@router.get("/employees", response_model=list[schemas.Employee])
async def list_employees(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.Employee))
    return result.scalars().all()

# Guests
@router.post("/guests", response_model=schemas.Guest)
async def create_guest(guest: schemas.GuestCreate, session: AsyncSession = Depends(get_session)):
    db_guest = models.Guest(**guest.model_dump())
    session.add(db_guest)
    await session.commit()
    await session.refresh(db_guest)
    return db_guest

@router.get("/guests", response_model=list[schemas.Guest])
async def list_guests(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.Guest))
    return result.scalars().all()

# Reservations
@router.post("/reservations", response_model=schemas.Reservation)
async def create_reservation(reservation: schemas.ReservationCreate, session: AsyncSession = Depends(get_session)):
    db_reservation = models.Reservation(**reservation.model_dump())
    session.add(db_reservation)
    await session.commit()
    await session.refresh(db_reservation)
    return db_reservation

@router.get("/reservations", response_model=list[schemas.Reservation])
async def list_reservations(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.Reservation))
    return result.scalars().all()

# Statistics endpoint for dashboard
@router.get("/stats")
async def get_stats(session: AsyncSession = Depends(get_session)):
    room_count = (await session.execute(select(models.Room))).scalars().all()
    employee_count = (await session.execute(select(models.Employee))).scalars().all()
    guest_count = (await session.execute(select(models.Guest))).scalars().all()
    reservation_count = (await session.execute(select(models.Reservation))).scalars().all()
    return {
        "rooms": len(room_count),
        "employees": len(employee_count),
        "guests": len(guest_count),
        "reservations": len(reservation_count)
    }

# Placeholder AI chat endpoint
@router.post("/chat")
async def ai_chat(message: dict):
    """Forward message to LangChain multi-agent service (placeholder)"""
    # TODO: integrate with LangChain service
    return {"reply": "This is a placeholder response. Integrate AI backend endpoint."}

# 用户注册
@router.post("/register")
async def register(user: schemas.UserCreate, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.User).where(models.User.username == user.username))
    db_user = result.scalar_one_or_none()
    if db_user:
        raise HTTPException(status_code=400, detail="用户名已存在")
    stored_password = user.password  # NOTE: storing plaintext, not recommended in production
    new_user = models.User(username=user.username, password_hash=stored_password)
    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)
    return {"msg": "注册成功"}

# 用户登录
@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.User).where(models.User.username == form_data.username))
    db_user = result.scalar_one_or_none()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="用户名或密码错误")
    
    # 直接比较明文密码
    if form_data.password != db_user.password_hash:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="用户名或密码错误")
    token_data = {"sub": db_user.username, "role": "admin" if db_user.is_admin else "user"}
    access_token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": access_token, "token_type": "bearer", "role": token_data["role"]}
