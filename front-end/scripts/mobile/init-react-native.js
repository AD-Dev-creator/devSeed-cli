import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { reactNativeConfig } from "../../templates/mobile/config-react-native.js";
import { reactNativeTemplates } from "../../templates/mobile/templates-react-native.js";

export function initReactNativeProject(projectPath) {
  try {
    execSync(`npx create-expo-app@latest "${projectPath}"`, {
      stdio: "inherit",
    });

    execSync(
      `npm install axios lucide-react-native @react-navigation/native @react-navigation/native-stack react-native-reanimated`,
      {
        cwd: projectPath,
        stdio: "inherit",
      }
    );

    execSync(
      `npx expo install react-native-screens react-native-safe-area-context`,
      {
        cwd: projectPath,
        stdio: "inherit",
      }
    );

    reactNativeConfig.folders.forEach((folder) => {
      const folderPath = path.join(projectPath, folder);
      fs.mkdirSync(folderPath, { recursive: true });
    });

    reactNativeConfig.files.forEach((file) => {
      const content = reactNativeTemplates[file];
      if (content) {
        fs.writeFileSync(path.join(projectPath, file), content);
      }
    });

    console.log("✅ React Native project initialized successfully!");
    console.log(`📁 Project created at: ${projectPath}`);
    console.log(`📝 To get started:`);
    console.log(`   cd ${projectPath}`);
    console.log(`   Start the development server with: npx expo start`);
  } catch (error) {
    console.error("Error initializing React Native project:", error);
  }
}
