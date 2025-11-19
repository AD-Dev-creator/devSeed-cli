import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export function initNextProject(projectPath) {
  try {
    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath, { recursive: true });
    }

    execSync(
      `npx create-next-app@latest "${projectPath}" --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`,
      {
        stdio: "inherit",
        shell: true,
      }
    );

    execSync(`npm install axios lucide-react`, {
      cwd: projectPath,
      stdio: "inherit",
      shell: true,
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

    const componentsPath = path.join(projectPath, "src", "components");
    if (!fs.existsSync(componentsPath)) {
      fs.mkdirSync(componentsPath, { recursive: true });
    }

    const globalsCssPath = path.join(projectPath, "src", "app", "globals.css");
    if (fs.existsSync(globalsCssPath)) {
      fs.writeFileSync(
        globalsCssPath,
        `@tailwind base;
@tailwind components;
@tailwind utilities;`
      );
    } else {
      const fallbackPath = path.join(projectPath, "app", "globals.css");
      if (fs.existsSync(fallbackPath)) {
        fs.writeFileSync(
          fallbackPath,
          `@tailwind base;
@tailwind components;
@tailwind utilities;`
        );
      }
    }

    console.log("✅ Next.js project initialized successfully!");
    console.log(`📁 Project created at: ${projectPath}`);
    console.log(`📝 To get started:`);
    console.log(`   cd ${projectPath}`);
    console.log(`   Start the development server with: npm run dev`);
  } catch (error) {
    console.error("❌ Error initializing Next.js project:", error);
  }
}
