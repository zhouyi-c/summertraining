# 1. 选择基础镜像，这里用官方的 Python 3.11 镜像
FROM python:3.11-slim

# 2. 设置工作目录（所有命令都在这个目录下执行）
WORKDIR /app

# 3. 复制 requirements.txt（依赖列表）到容器中
COPY requirements.txt .

# 4. 安装依赖
RUN pip install --no-cache-dir -r requirements.txt

# 5. 复制所有后端代码到容器中
COPY . /code

# 6. 暴露端口（如 FastAPI 默认8000端口）
EXPOSE 8000

# 7. 启动命令（这里假设用uvicorn启动FastAPI应用）
CMD ["uvicorn", "hotel_ms.backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]