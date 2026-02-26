import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { angularConfig } from "../../templates/web/config-angular.js";
import { angularTemplates } from "../../templates/web/templates-angular.js";

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

    angularConfig.folders.forEach((folder) => {
      fs.mkdirSync(path.join(projectPath, folder), { recursive: true });
    });

    angularConfig.files.forEach((file) => {
      const content = angularTemplates[file];
      if (content) {
        fs.writeFileSync(path.join(projectPath, file), content);
      }
    });

    console.log("✅ Angular project initialized successfully!");
    console.log(`📁 Project created at: ${projectPath}`);
    console.log(`📝 To get started:`);
    console.log(`   cd ${projectPath}`);
    console.log(`   Start the development server with: npm start`);
  } catch (error) {
    console.error("❌ Error initializing Angular project:", error);
  }
}
