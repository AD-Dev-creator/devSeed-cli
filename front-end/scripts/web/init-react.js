import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { reactConfig } from "../../templates/web/config-react.js";
import { reactTemplate } from "../../templates/web/templates-react.js";

export function initReactProject(projectPath) {
  try {
    execSync(`npx create-react-app "${projectPath}"`, {
      stdio: "inherit",
    });

    execSync(`npm install axios react-router-dom lucide-react `, {
      cwd: projectPath,
      stdio: "inherit",
    });

    execSync(`npm install -D tailwindcss@3`, {
      cwd: projectPath,
      stdio: "inherit",
    });

    execSync(`npm install animate.css --save`, {
      cwd: projectPath,
      stdio: "inherit",
    });

    reactConfig.folders.forEach((folder) => {
      fs.mkdirSync(path.join(projectPath, folder), { recursive: true });
    });

    reactConfig.files.forEach((file) => {
      const content = reactTemplate[file];
      if (content) {
        fs.writeFileSync(path.join(projectPath, file), content);
      }
    });

    console.log("✅ React project initialized successfully!");
    console.log(`📁 Project created at: ${projectPath}`);
    console.log(`📝 To get started:`);
    console.log(`   cd ${projectPath}`);
    console.log(`   Start the development server with: npm start`);
  } catch (error) {
    console.error("❌ Error initializing React project:", error);
  }
}
