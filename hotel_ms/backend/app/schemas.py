"""Pydantic schemas for API payloads"""
from datetime import datetime
from pydantic import BaseModel
from typing import Optional

class RoomBase(BaseModel):
    number: str
    type: str | None = None
    price: int | None = None
    is_available: bool | None = True

class RoomCreate(RoomBase):
    pass

class Room(RoomBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class EmployeeBase(BaseModel):
    name: str
    role: str

class EmployeeCreate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    id: int

    class Config:
        orm_mode = True

class GuestBase(BaseModel):
    name: str
    email: str

class GuestCreate(GuestBase):
    pass

class Guest(GuestBase):
    id: int

    class Config:
        orm_mode = True

class ReservationBase(BaseModel):
    room_id: int
    guest_id: int
    check_in: datetime
    check_out: datetime

class ReservationCreate(ReservationBase):
    pass

class Reservation(ReservationBase):
    id: int

    class Config:
        orm_mode = True

# ---------------- Users & Auth ----------------
class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str
    is_admin: bool | None = False

class User(UserBase):
    id: int
    is_admin: bool

    class Config:
        orm_mode = True

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str

class UserCreate(BaseModel):
    username: str
    password: str
