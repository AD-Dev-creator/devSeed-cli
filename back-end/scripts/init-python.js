import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";

export function initPythonProject(projectPath) {
  try {
    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath, { recursive: true });
    }

    const pythonCmd = os.platform() === "win32" ? "python" : "python3";
    execSync("python3 -m venv venv", {
      cwd: projectPath,
      stdio: "inherit",
    });

    const pythonBin =
      process.platform === "win32"
        ? path.join("venv", "Scripts", "python.exe")
        : path.join("venv", "bin", "python3");
    execSync(`${pythonBin} -m pip install --upgrade pip`, {
      cwd: projectPath,
      stdio: "inherit",
    });

    const pipPath =
      process.platform === "win32"
        ? path.join(projectPath, "venv", "Scripts", "pip.exe")
        : path.join(projectPath, "venv", "bin", "pip");
    execSync(
      `${pipPath} install fastapi uvicorn sqlalchemy python-dotenv bcrypt PyJWT pytest`,
      { cwd: projectPath, stdio: "inherit" }
    );

    const folders = [
      "app",
      "app/tests",
      "app/database",
      "tests",
      "tests/helpers",
      "tests/controllers",
    ];

    const files = [
      ".gitignore",
      ".env",
      ".env.example",
      "README.md",
      "main.py",
      "routes.py",
      "app/__init__.py",
      "tests/__init__.py",
      "app/database/__init__.py",
      "app/database/db.py",
      "app/database/models.py",
    ];

    folders.forEach((folder) => {
      fs.mkdirSync(path.join(projectPath, folder), { recursive: true });
    });

    files.forEach((file) => {
      let content = "";
      if (file === ".gitignore") {
        content = `venv/
__pycache__/
*.pyc
.env
`;
      } else if (file === "main.py") {
        content = `from fastapi import FastAPI
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
    return {"message": "API turning on PORT 8000"}
`;
      } else if (file === "routes.py") {
        content = `
from fastapi import APIRouter

all_routes = []
`;
      } else if (file === "app/database/__init__.py") {
        content = `from .db import Base, engine
        `;
      } else if (file === "app/database/db.py") {
        content = `
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os
      
load_dotenv()
      
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")
      
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
      
Base = declarative_base()
      `;
      } else if (file === "app/database/models.py") {
        content = `
from .db import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Enum, DateTime, Table
from sqlalchemy.orm import relationship
from datetime import datetime
      `;
      } else if (file === ".env") {
        content = `DATABASE_URL=sqlite:///./your_database.db
`;
      } else if (file === ".env.example") {
        content = `DATABASE_URL=sqlite:///./your_database.db
`;
      } else if (file === ".gitignore") {
        content = `venv/
__pycache__/
*.pyc
.env
`;
      } else if (file === "README.md") {
        content = `# FastAPI Project

Activate virtual environment:
\`\`\`bash
source venv/bin/activate  
# On Windows use: venv\\Scripts\\activate
\`\`\`

Start your FastAPI : 
\`\`\`bash
uvicorn main:app --reload
\`\`\`
`;
      }
      fs.writeFileSync(path.join(projectPath, file), content);
    });

    // Only update package.json if it exists
    const pkgPath = path.join(projectPath, "package.json");
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
      pkg.scripts = pkg.scripts || {};
      pkg.scripts.start = "uvicorn main:app --reload";
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
    }

    console.log("✅ Python project initialized successfully.");
    console.log(`📁 Project created at: ${projectPath}`);
    console.log(`📝 To get started:`);
    console.log(`   cd ${projectPath}`);
    console.log(`   Activate virtual environment: source venv/bin/activate`);
    console.log(`   Start the FastAPI server: uvicorn main:app --reload`);
  } catch (error) {
    console.error("❌ Error initializing Python project:", error);
  }
}
