"""Database connection utility using SQLAlchemy 2.0 style async engine
Configure with MySQL 8.x (root/12345678) on localhost:3306
"""
from sqlalchemy.ext.asyncio import AsyncAttrs, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import MetaData

DATABASE_URL = "mysql+asyncmy://root:12345678@localhost:3306/hotel_ms?charset=utf8mb4"

# Naming convention to avoid alembic issues later
naming_convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}
metadata = MetaData(naming_convention=naming_convention)

class Base(AsyncAttrs, DeclarativeBase):
    metadata = metadata

# Async engine & session factory
engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    pool_pre_ping=True,
)

async_session_factory = async_sessionmaker(engine, expire_on_commit=False)

aio_session = async_session_factory  # alias for import convenience
