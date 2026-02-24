import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";
import { pythonTemplates } from "../templates/python/templates-python.js";
import { pythonConfig } from "../templates/python/config-python.js";

export function initPythonProject(projectPath) {
  try {
    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath, { recursive: true });
    }

    // Create virtual environment
    execSync("python3 -m venv venv", {
      cwd: projectPath,
      stdio: "inherit",
    });

    // Upgrade pip
    const pythonBin =
      process.platform === "win32"
        ? path.join("venv", "Scripts", "python.exe")
        : path.join("venv", "bin", "python3");

    execSync(`${pythonBin} -m pip install --upgrade pip`, {
      cwd: projectPath,
      stdio: "inherit",
    });

    // Create folders FIRST
    pythonConfig.folders.forEach((folder) => {
      fs.mkdirSync(path.join(projectPath, folder), { recursive: true });
    });

    // Write template files (including requirements.txt)
    pythonConfig.files.forEach((file) => {
      const content = pythonTemplates[file];
      if (content) {
        fs.writeFileSync(path.join(projectPath, file), content);
      }
    });

    // Install dependencies from requirements.txt
    const pipPath =
      process.platform === "win32"
        ? path.join(projectPath, "venv", "Scripts", "pip.exe")
        : path.join(projectPath, "venv", "bin", "pip");

    execSync(`${pipPath} install -r requirements.txt`, {
      cwd: projectPath,
      stdio: "inherit",
    });

    console.log("✅ Python project initialized successfully!");
    console.log(`📁 Project created at: ${projectPath}`);
    console.log(`📝 To get started:`);
    console.log(`   cd ${path.basename(projectPath)}`);
    console.log(`   source venv/bin/activate`);
    console.log(`   uvicorn main:app --reload --port 8000`);
    console.log(`📚 API Documentation: http://localhost:8000/docs`);
  } catch (error) {
    console.error("❌ Error initializing Python project:", error);
  }
}
