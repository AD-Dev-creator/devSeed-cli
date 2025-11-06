import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export function initReactProject(projectPath) {
  try {
    const projectName = path
      .basename(projectPath)
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, "");
    const safeProjectPath = path.join(path.dirname(projectPath), projectName);

    if (!fs.existsSync(safeProjectPath)) {
      fs.mkdirSync(projectPath, { recursive: true });
    }

    execSync(`npx create-react-app ${safeProjectPath}`, {
      stdio: "inherit",
    });

    execSync(`npm install axios react-router-dom`, {
      cwd: safeProjectPath,
      stdio: "inherit",
    });

    const folder = ["src/components", "src/pages"];

    const files = [".env", ".env.example"];

    folder.forEach((folder) => {
      fs.mkdirSync(path.join(safeProjectPath, folder), { recursive: true });
    });

    files.forEach((file) => {
      fs.writeFileSync(path.join(safeProjectPath, file), "");
    });

    console.log("✅ React project initialized successfully!");
  } catch (error) {
    console.error("❌ Error initializing React project:", error);
  }
}
