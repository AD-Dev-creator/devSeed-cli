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
      "README.md",
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
      let content = "";
      if (file === "src/main.js") {
        content = `import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { router } from "./routes.js";

dotenv.config();

export const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});
`;
      } else if (file === "src/routes.js") {
        content = `import { Router } from "express";

export const router = Router();
`;
      } else if (file === ".gitignore") {
        content = `node_modules
.env
`;
      } else if (file === ".env") {
        content = `PORT=3000
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
BCRYPT_SALT_ROUNDS=10
`;
      } else if (file === ".env.example") {
        content = `PORT=your_port
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
BCRYPT_SALT_ROUNDS=your_bcrypt_salt_rounds
`;
      }
      fs.writeFileSync(path.join(projectPath, file), content);
    });

    // Add start script to package.json
    const pkgPath = path.join(projectPath, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    pkg.scripts = pkg.scripts || {};
    pkg.scripts.start = "nodemon src/main.js";
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

    console.log("✅ Structure and dependencies installed!");
  } catch (error) {
    console.error("❌ Error initializing Node.js project:", error);
  }
}
