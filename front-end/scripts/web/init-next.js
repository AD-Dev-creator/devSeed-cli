import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export function initNextProject(projectPath) {
  try {
    const projectName = path.basename(path.dirname(projectPath));
    const parentDir = path.dirname(path.dirname(projectPath));
    const projectDir = path.dirname(projectPath);

    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }

    execSync(`npx create-next-app@latest frontend --yes --typescript`, {
      cwd: projectDir,
      stdio: "inherit",
    });

    execSync(`npm install axios`, {
      cwd: projectPath,
      stdio: "inherit",
    });

    execSync(`npm install -D tailwindcss@3`, {
      cwd: projectPath,
      stdio: "inherit",
    });

    const folders = ["src/components"];
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
      path.join(projectPath, "src", "app", "globals.css"),
      `@tailwind base;
@tailwind components;
@tailwind utilities;`
    );

    console.log("✅ Next.js project initialized successfully!");
    console.log(`📁 Project created at: ${projectPath}`);
    console.log(`📝 To get started:`);
    console.log(`   cd ${projectPath}`);
    console.log(`   Start the development server with: npm run dev`);
  } catch (error) {
    console.error("❌ Error initializing Next.js project:", error);
  }
}
