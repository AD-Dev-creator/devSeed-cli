import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export function initNodeProject(projectPath) {
  try {
    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath, { recursive: true });
    }

    execSync("npm init -y", {
      cwd: projectPath,
      stdio: "inherit",
    });

    execSync(
      "npm install express nodemon body-parser mysql bcrypt jsonwebtoken dotenv cors",
      { cwd: projectPath, stdio: "inherit" }
    );

    const folders = [
      "src",
      "src/tests",
      "src/tests/controllers",
      "src/tests/models",
      "src/tests/middleware",
      "src/common",
      "src/common/middleware",
      "src/common/utils",
      "src/common/database",
      "src/modules",
    ];

    const files = [
      ".gitignore",
      ".env",
      ".env.example",
      "src/main.js",
      "src/routes.js",
      "src/common/database/db.js",
      "src/common/middleware/auth.js",
    ];

    folders.forEach((folder) => {
      fs.mkdirSync(path.join(projectPath, folder), { recursive: true });
    });

    files.forEach((file) => {
      fs.writeFileSync(path.join(projectPath, file), "");
    });

    // Add start script to package.json
    const pkgPath = path.join(projectPath, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    pkg.scripts = pkg.scripts || {};
    pkg.scripts.start = "nodemon src/server.js";
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

    console.log("✅ Structure and dependencies installed!");
  } catch (error) {
    console.error("❌ Error initializing Node.js project:", error);
  }
}
