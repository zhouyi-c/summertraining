"""FastAPI application entrypoint"""
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import router
from .auth import router as auth_router

app = FastAPI(title="Hotel Management System")

# CORS for frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(auth_router)

@app.get("/")
async def root():
    return {"message": "Hotel Management System API is running"}

if __name__ == "__main__":
    uvicorn.run("hotel_ms.backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
