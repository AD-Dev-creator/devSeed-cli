import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { nextConfig } from "../../templates/web/config-next.js";
import { nextTemplate } from "../../templates/web/templates-next.js";

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

    nextConfig.folders.forEach((folder) => {
      fs.mkdirSync(path.join(projectPath, folder), { recursive: true });
    });

    nextConfig.files.forEach((file) => {
      const content = nextTemplate[file];
      if (content) {
        fs.writeFileSync(path.join(projectPath, file), content);
      }
    });

    console.log("✅ Next.js project initialized successfully!");
    console.log(`📁 Project created at: ${projectPath}`);
    console.log(`📝 To get started:`);
    console.log(`   cd ${projectPath}`);
    console.log(`   Start the development server with: npm run dev`);
  } catch (error) {
    console.error("❌ Error initializing Next.js project:", error);
  }
}
