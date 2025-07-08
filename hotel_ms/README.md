# Hotel Management System (HMS)

A full-stack starter project for a hotel management system with:

* **Frontend**: React 18 + TypeScript + Ant Design + Vite
* **Backend**: FastAPI + SQLAlchemy (async) + MySQL
* **AI Service**: Placeholder endpoint to integrate with your LangChain multi-agent service later
* **Dev/Prod**: Docker Compose orchestrates MySQL, backend, and frontend services

## Quick Start (local)

1. Ensure Docker & Docker Compose are installed.
2. In project root run:

```bash
docker compose up --build
```

3. Open `http://localhost:5173` for the UI.
4. FastAPI docs available at `http://localhost:8000/docs`.

## Manual (without Docker)

```bash
# 1️⃣ start MySQL (root / 12345678) and create database `hotel_ms`

# 2️⃣ Backend
cd hotel_ms/backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn hotel_ms.backend.app.main:app --reload

# 3️⃣ Frontend
cd ../frontend
npm install
npm run dev
```

## Where to Extend

| Area | File / Folder | What to do |
|------|---------------|------------|
| AI Chat | `backend/app/routers.py` → `ai_chat` | Replace placeholder with LangChain logic |
| DB Models | `backend/app/models.py` | Add more tables/fields |
| API Routes | create new router modules and include in `routers.py` |
| Frontend Pages | `frontend/src/pages` | Build rich UI with Ant Design |
| Data Visualisation | Use `recharts` or `echarts` inside React components |

## Environment Variables

Create `.env` under `backend/` if you need to override defaults, e.g.

```
MYSQL_URL=mysql+aiomysql://root:12345678@db:3306/hotel_ms?charset=utf8mb4
OPENAI_API_KEY=...
```

Then load with `python-dotenv`.

---

Happy hacking! Replace placeholder images in `public/` and extend as needed.
