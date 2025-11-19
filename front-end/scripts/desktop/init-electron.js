import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export function initElectronProject(projectPath) {
  try {
    execSync(`npx create-react-app "${projectPath}"`, {
      stdio: "inherit",
    });

    execSync(`npm install axios react-router-dom lucide-react`, {
      cwd: projectPath,
      stdio: "inherit",
    });

    execSync(`npm install -D tailwindcss@3`, {
      cwd: projectPath,
      stdio: "inherit",
    });

    execSync("npm install electron --save-dev", {
      cwd: projectPath,
      stdio: "inherit",
    });

    execSync("npm install electron-is-dev --save", {
      cwd: projectPath,
      stdio: "inherit",
    });

    execSync("npm install concurrently wait-on --save-dev", {
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

    const readmePath = path.join(projectPath, "README.md");
    let readmeContent = "";

    if (fs.existsSync(readmePath)) {
      readmeContent = fs.readFileSync(readmePath, "utf8");
    }

    // Add Electron instructions to README
    const electronInstructions = `

## Electron Commands

\`\`\`bash
npm run electron-start  # Start React + Electron automatically
\`\`\`

OR manually:

\`\`\`bash
npm start               # Start React dev server first
npm run electron-dev    # Then start Electron in another terminal
npm run build-electron  # Build for production
\`\`\`

## Available Electron Scripts

- \`npm run electron\` - Run Electron
- \`npm run electron-dev\` - Run Electron in development mode
- \`npm run electron-start\` - Start React and Electron concurrently
- \`npm run build-electron\` - Build for production
- \`npm run dist\` - Create distributable packages
`;

    fs.writeFileSync(readmePath, readmeContent + electronInstructions);

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
}`
    );

    fs.writeFileSync(
      path.join(projectPath, "src", "index.css"),
      `@tailwind base;
@tailwind components;
@tailwind utilities;`
    );

    // Create Electron main process
    const mainElectron = `const { app, BrowserWindow } = require('electron/main');
    const isDev = require('electron-is-dev');
    const path = require('path');
    
    const createWindow = () => {
      const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
          enableRemoteModule: false,
          preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, 'assets/icon.png'), // Optional
        titleBarStyle: 'default',
        show: false
      });
    
      // Load app
      const startUrl = isDev 
        ? 'http://localhost:3000' 
        : \`file://\${path.join(__dirname, '../build/index.html')}\`;
        
      win.loadURL(startUrl);
    
      win.once('ready-to-show', () => {
        win.show();
        
        if (isDev) {
          win.webContents.openDevTools();
        }
      });
    
      win.on('closed', () => {
        // Dereference the window object
      });
    
      return win;
    };
    
    app.whenReady().then(() => {
      createWindow();
    
      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createWindow();
        }
      });
    });
    
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });`;

    fs.writeFileSync(path.join(projectPath, "public", "main.js"), mainElectron);

    // Create preload script
    const preloadScript = `const { contextBridge, ipcRenderer } = require('electron');

       contextBridge.exposeInMainWorld('electronAPI', {
         // Add your API methods here
         platform: process.platform,
         versions: process.versions
       });`;

    fs.writeFileSync(
      path.join(projectPath, "public", "preload.js"),
      preloadScript
    );

    // Update package.json with Electron scripts
    const packageJsonPath = path.join(projectPath, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    packageJson.main = "public/main.js";
    packageJson.scripts = {
      ...packageJson.scripts,
      electron: "electron .",
      "electron-dev": "ELECTRON_IS_DEV=true electron .",
      "electron-start":
        'concurrently "npm start" "wait-on http://localhost:3000 && npm run electron-dev"',
      "build-electron": "npm run build && electron-builder",
      dist: "npm run build && electron-builder --publish=never",
    };

    packageJson.build = {
      appId: "com.yourcompany.yourapp",
      productName: "Your App Name",
      directories: {
        output: "dist",
      },
      files: [
        "build/**/*",
        "public/main.js",
        "public/preload.js",
        "node_modules/**/*",
      ],
      mac: {
        category: "public.app-category.productivity",
      },
      win: {
        target: "nsis",
      },
      linux: {
        target: "AppImage",
      },
    };

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
