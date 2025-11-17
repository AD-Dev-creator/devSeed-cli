import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export function initTypeScriptProject(projectPath) {
  try {
    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath, { recursive: true });
    }

    execSync("npm init -y", {
      cwd: projectPath,
      stdio: "inherit",
    });

    // Install dependencies
    execSync(
      "npm install express body-parser mysql bcrypt jsonwebtoken dotenv cors tsc-watch swagger-ui-express --save",
      {
        cwd: projectPath,
        stdio: "inherit",
      }
    );

    // Install dev dependencies
    execSync(
      "npm install typescript @types/express @types/node @types/swagger-ui-express @types/cors jest ts-jest @types/jest --save-dev",
      {
        cwd: projectPath,
        stdio: "inherit",
      }
    );

    // Initialize TypeScript config
    execSync("npx tsc --init", {
      cwd: projectPath,
      stdio: "inherit",
    });

    // Initialize Jest config
    execSync("npx ts-jest config:init", {
      cwd: projectPath,
      stdio: "inherit",
    });

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
      "src/index.ts",
      "src/routes.ts",
      "src/common/database/db.ts",
      "src/common/middleware/auth.ts",
    ];

    folders.forEach((folder) => {
      fs.mkdirSync(path.join(projectPath, folder), { recursive: true });
    });

    files.forEach((file) => {
      let content = "";
      if (file === "src/index.ts") {
        content = `import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { router } from "./routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const PORT = process.env.API_PORT || 3003;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`;
      } else if (file === "src/routes.ts") {
        content = `import { Router } from "express";
export const router = Router();
`;
      } else if (file === ".gitignore") {
        content = `node_modules
dist
.env
`;
      } else if (file === ".env") {
        content = `API_PORT=3003
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
BCRYPT_SALT_ROUNDS=10
`;
      } else if (file === ".env.example") {
        content = `API_PORT=3003
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
BCRYPT_SALT_ROUNDS=your_bcrypt_salt_rounds
`;
      } else if (file === "README.md") {
        content = `# TypeScript Node.js Project
          Run Server:
  \`\`\`bash
npm run dev
\`\`\`
`;
      }
      fs.writeFileSync(path.join(projectPath, file), content);
    });

    // Write tsconfig.json
    const tsconfig = {
      compilerOptions: {
        target: "es2018",
        lib: ["es2018"],
        module: "commonjs",
        outDir: "./dist",
        rootDir: "./src",
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        skipDefaultLibCheck: true,
        forceConsistentCasingInFileNames: true,
        resolveJsonModule: true,
        moduleResolution: "node",
      },
      include: ["src/**/*"],
      exclude: ["node_modules", "dist"],
    };
    fs.writeFileSync(
      path.join(projectPath, "tsconfig.json"),
      JSON.stringify(tsconfig, null, 2)
    );

    // Update package.json scripts
    const pkgPath = path.join(projectPath, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    pkg.scripts = pkg.scripts || {};
    pkg.scripts.build = "tsc";
    pkg.scripts.dev = 'tsc-watch --onSuccess "node dist/index.js"';
    pkg.scripts.start = "node dist/index.js";
    pkg.scripts.test = "jest";
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

    console.log("✅ TypeScript project initialized successfully!");
    console.log(`📁 Project created at: ${projectPath}`);
    console.log(`📝 To get started:`);
    console.log(`   cd ${projectPath}`);
    console.log(`   Start the development server: npm run dev`);
  } catch (error) {
    console.error("❌ Error initializing TypeScript project:", error);
  }
}
