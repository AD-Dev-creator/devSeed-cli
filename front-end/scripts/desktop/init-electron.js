import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { electronConfig } from "../../templates/desktop/config-electron.js";
import { electronTemplates } from "../../templates/desktop/templates-electron.js";

export function initElectronProject(projectPath) {
  try {
    execSync(`npx create-react-app "${projectPath}"`, {
      stdio: "inherit",
    });

    execSync(
      `npm install axios react-router-dom lucide-react animate.css electron-is-dev`,
      {
        cwd: projectPath,
        stdio: "inherit",
      }
    );

    execSync(
      `npm install -D electron electron-builder concurrently wait-on cross-env tailwindcss@3 autoprefixer postcss`,
      { cwd: projectPath, stdio: "inherit" }
    );

    electronConfig.folders.forEach((folder) => {
      const folderPath = path.join(projectPath, folder);
      fs.mkdirSync(folderPath, { recursive: true });
    });

    electronConfig.files.forEach((file) => {
      const content = electronTemplates[file];
      if (content) {
        fs.writeFileSync(path.join(projectPath, file), content);
      }
    });

    // Update package.json with Electron-specific configurations
    const packageJsonPath = path.join(projectPath, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    packageJson.main = electronConfig.packageJsonConfig.main;
    packageJson.scripts = {
      ...packageJson.scripts,
      ...electronConfig.packageJsonConfig.scripts,
    };
    packageJson.build = electronConfig.packageJsonConfig.build;

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    console.log("✅ Electron + React project initialized successfully!");
    console.log(`📁 Project created at: ${projectPath}`);
    console.log(`📝 To get started:`);
    console.log(`   cd ${projectPath}`);
    console.log(
      `   npm run electron-start  # Start React + Electron automatically`
    );
    console.log(`   OR manually:`);
    console.log(`   npm start               # Start React dev server first`);
    console.log(
      `   npm run electron-dev    # Then start Electron in another terminal`
    );
    console.log(`   npm run build-electron  # Build for production`);
  } catch (error) {
    console.error("Error initializing Electron project:", error);
  }
}
