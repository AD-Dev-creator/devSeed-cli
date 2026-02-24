export const pythonTemplates = {
  //* Main file - corriger la syntaxe
  "main.py": `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import all_routes
from app.database import Base, engine

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

for router in all_routes:
    app.include_router(router)

@app.get("/api")
def read_root():
    return {"message": "API running on PORT 8000"}
`,

  //* Routes file
  "routes.py": `from fastapi import APIRouter

all_routes = []

# TODO: Add your routes here
`,

  //* Database configuration
  "app/database/__init__.py": `from .db import Base, engine, SessionLocal`,

  "app/database/db.py": `from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./app.db")

# For SQLite, add check_same_thread=False to avoid threading issues
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False} if "sqlite" in SQLALCHEMY_DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
`,

  //* Database models - optimisés pour SQLite
  "app/database/models.py": `from .db import Base
from sqlalchemy import Column, String, Boolean, ForeignKey, Enum, DateTime, Integer
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
import enum


class RoleEnum(enum.Enum):
    ADMIN = "ADMIN"
    USER = "USER"


class Account(Base):
    __tablename__ = "accounts"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    deleted_at = Column(DateTime, nullable=True)
    role = Column(Enum(RoleEnum), nullable=False)
    
    # Relationships
    sessions = relationship("Session", back_populates="account", cascade="all, delete-orphan")
    admin = relationship("Admin", back_populates="account", uselist=False, cascade="all, delete-orphan")
    user = relationship("User", back_populates="account", uselist=False, cascade="all, delete-orphan")


class Session(Base):
    __tablename__ = "sessions"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    token = Column(String(500), unique=True, nullable=False)
    account_id = Column(String(36), ForeignKey("accounts.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    expires_at = Column(DateTime, nullable=False)
    
    # Relationships
    account = relationship("Account", back_populates="sessions")


class Admin(Base):
    __tablename__ = "admins"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(30), unique=True, nullable=False)
    email = Column(String(50), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    account_id = Column(String(36), ForeignKey("accounts.id"), unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    # Relationships
    account = relationship("Account", back_populates="admin")


class User(Base):
    __tablename__ = "users"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(30), unique=True, nullable=False)
    name = Column(String(50), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    account_id = Column(String(36), ForeignKey("accounts.id"), unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    # Relationships
    account = relationship("Account", back_populates="user")
`,

  //* Requirements file - optimisé pour SQLite
  "requirements.txt": `fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
python-dotenv==1.0.0
bcrypt==4.1.1
python-jose[cryptography]==3.3.0
pytest==7.4.3
`,

  //* Environment variables
  ".env": `# Database Configuration (SQLite)
DATABASE_URL=sqlite:///./app.db

# API Configuration
API_PORT=8000
DEBUG=True

# Security (optional for future use)
SECRET_KEY=your-secret-key-here
`,

  //* Environment variables example
  ".env.example": `# Database Configuration (SQLite)
DATABASE_URL=sqlite:///./app.db

# API Configuration  
API_PORT=8000
DEBUG=True

# Security (optional for future use)
SECRET_KEY=your-secret-key-here
`,

  //* Gitignore file - ajout fichiers SQLite
  ".gitignore": `__pycache__/
venv/
*.pyc
.env

# SQLite database files
*.db
*.sqlite
*.sqlite3

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
`,

  //* README file - instructions SQLite
  "README.md": `# FastAPI Project with SQLite

## Setup Instructions

1. Create a virtual environment:
\`\`\`bash
# On macOS/Linux:
python3 -m venv venv
# On Windows:
python -m venv venv
\`\`\`

2. Activate the virtual environment:
\`\`\`bash
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\\Scripts\\activate
\`\`\`

3. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

4. Configure environment (optional):
\`\`\`bash
cp .env.example .env
# Edit .env if needed
\`\`\`

5. Start the FastAPI application:
\`\`\`bash
uvicorn main:app --reload --port 8000
\`\`\`

## Database

- SQLite database will be created automatically as \`app.db\`
- Tables are created automatically on first run
- No Docker required!

## API Documentation

Once running, visit:
- **Interactive API docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **API endpoint**: http://localhost:8000/api

## Development

Add new dependencies:
\`\`\`bash
pip install package_name
pip freeze > requirements.txt
\`\`\`
`,
};
