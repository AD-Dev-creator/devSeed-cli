import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export function initReactNativeProject(projectPath) {
  try {
    execSync(`npx create-expo-app@latest "${projectPath}"`, {
      stdio: "inherit",
    });

    execSync(
      `npm install axios lucide-react-native @react-navigation/native @react-navigation/native-stack`,
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

    const folders = ["components/common", "services"];
    folders.forEach((folder) => {
      fs.mkdirSync(path.join(projectPath, folder), { recursive: true });
    });

    const files = [".env", ".env.example"];
    files.forEach((file) => {
      fs.writeFileSync(path.join(projectPath, file), "");
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
