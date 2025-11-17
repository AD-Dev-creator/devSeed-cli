import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export function initReactProject(projectPath) {
  try {
    execSync(`npx create-react-app "${projectPath}"`, {
      stdio: "inherit",
    });

    execSync(`npm install axios react-router-dom`, {
      cwd: projectPath,
      stdio: "inherit",
    });

    execSync(`npm install -D tailwindcss@3`, {
      cwd: projectPath,
      stdio: "inherit",
    });

    execSync(`npx tailwindcss init`, {
      cwd: projectPath,
      stdio: "inherit",
    });

    const folders = ["src/components", "src/pages"];
    folders.forEach((folder) => {
      fs.mkdirSync(path.join(projectPath, folder), { recursive: true });
    });

    const files = [".env", ".env.example"];
    files.forEach((file) => {
      fs.writeFileSync(path.join(projectPath, file), "");
    });

    fs.writeFileSync(
      path.join(projectPath, "tailwind.config.js"),
      `/** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
      theme: {
        extend: {
          colors: {},
          fontFamily: {},
        },
      },
      plugins: [],
    }
    `
    );

    fs.writeFileSync(
      path.join(projectPath, "src", "index.css"),
      `@tailwind base;
@tailwind components;
@tailwind utilities;`
    );

    console.log("✅ React project initialized successfully!");
    console.log(`📁 Project created at: ${projectPath}`);
    console.log(`📝 To get started:`);
    console.log(`   cd ${projectPath}`);
    console.log(`   Start the development server with: npm start`);
  } catch (error) {
    console.error("❌ Error initializing React project:", error);
  }
}
