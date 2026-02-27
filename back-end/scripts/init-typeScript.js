import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { typeScriptTemplates } from "../templates/typeScript/templates-typeScript.js";
import { typeScriptConfig } from "../templates/typeScript/config-typeScript.js";

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
      "npm install @prisma/adapter-mariadb @prisma/adapter-pg @prisma/client bcrypt body-parser cors dotenv express jsonwebtoken mysql passport passport-jwt pg swagger-jsdoc swagger-ui-express tsc-watch --save",
      {
        cwd: projectPath,
        stdio: "inherit",
      }
    );

    // Install dev dependencies
    execSync(
      "npm install @types/bcrypt @types/cors @types/express @types/jest @types/jsonwebtoken @types/node @types/passport @types/passport-jwt @types/pg @types/supertest @types/swagger-jsdoc @types/swagger-ui-express jest nodemon prisma supertest ts-jest ts-node typescript --save-dev",
      {
        cwd: projectPath,
        stdio: "inherit",
      }
    );

    execSync("npx prisma init", {
      cwd: projectPath,
      stdio: "inherit",
    });

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

    typeScriptConfig.folders.forEach((folder) => {
      fs.mkdirSync(path.join(projectPath, folder), { recursive: true });
    });

    typeScriptConfig.files.forEach((file) => {
      const content = typeScriptTemplates[file];
      if (content) {
        fs.writeFileSync(path.join(projectPath, file), content);
      }
    });

    // Write tsconfig.json
    fs.writeFileSync(
      path.join(projectPath, "tsconfig.json"),
      JSON.stringify(typeScriptConfig.tsconfig, null, 2)
    );

    // Update package.json scripts
    const pkgPath = path.join(projectPath, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    pkg.scripts = { ...pkg.scripts, ...typeScriptConfig.packageJsonScripts };
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

    execSync("npx prisma generate", {
      cwd: projectPath,
      stdio: "inherit",
    });

    console.log("✅ TypeScript project initialized successfully!");
    console.log(`📁 Project created at: ${projectPath}`);
    console.log(`📝 To get started:`);
    console.log(`   cd ${projectPath}`);
    console.log(`   Start the development server: npm run dev`);
  } catch (error) {
    console.error("❌ Error initializing TypeScript project:", error);
  }
}
