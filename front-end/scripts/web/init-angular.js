import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export function initAngularProject(projectPath) {
  try {
    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath, { recursive: true });
    }

    execSync(
      "npx @angular/cli new frontend --directory . --routing --style=css --skip-install",
      {
        cwd: projectPath,
        stdio: "inherit",
      }
    );

    execSync(`npm install axios`, {
      cwd: projectPath,
      stdio: "inherit",
    });

    execSync(`npm install -D tailwindcss@3`, {
      cwd: projectPath,
      stdio: "inherit",
    });

    const folders = ["src/app/components", "src/app/pages"];
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
        "./src/**/*.{html,ts}",
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
      path.join(projectPath, "src", "styles.css"),
      `@tailwind base;
@tailwind components;
@tailwind utilities;`
    );

    console.log("✅ Angular project initialized successfully!");
    console.log(`📁 Project created at: ${projectPath}`);
    console.log(`📝 To get started:`);
    console.log(`   cd ${projectPath}`);
    console.log(`   Start the development server with: npm start`);
  } catch (error) {
    console.error("❌ Error initializing Angular project:", error);
  }
}
