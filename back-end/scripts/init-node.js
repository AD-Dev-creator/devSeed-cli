import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { nodeJsConfig } from "../templates/nodeJs/config-nodeJs.js";
import { nodeJSTemplate } from "../templates/nodeJs/templates-nodeJS.js";

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

    nodeJsConfig.folders.forEach((folder) => {
      fs.mkdirSync(path.join(projectPath, folder), { recursive: true });
    });

    nodeJsConfig.files.forEach((file) => {
      const content = nodeJSTemplate[file];
      if (content) {
        fs.writeFileSync(path.join(projectPath, file), content);
      }
    });

    // Add start script to package.json
    const pkgPath = path.join(projectPath, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    pkg.scripts = { ...pkg.scripts, ...nodeJsConfig.packageJsonScripts };
    Object.assign(pkg, nodeJsConfig.packageJsonConfig);
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

    console.log("✅ Structure and dependencies installed!");
    console.log(`📁 Project created at: ${projectPath}`);
    console.log(`📝 To get started:`);
    console.log(`   cd ${projectPath}`);
    console.log(`   Start the development server with: npm start`);
  } catch (error) {
    console.error("❌ Error initializing Node.js project:", error);
  }
}
