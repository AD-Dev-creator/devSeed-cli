export const electronTemplates = {
  //* README File with Electron instructions
  "README.md": `## Electron Commands

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
};
`,

  "tailwind.config.js": `/** @type {import('tailwindcss').Config} */
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
}`,

  //* PostCSS config file
  "postcss.config.js": `module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };`,

  //* Index CSS file
  "src/index.css": `@tailwind base;
@tailwind components;
@tailwind utilities;`,

  //* Index JS file
  "src/index.js": `import React from "react";
    import ReactDOM from "react-dom/client";
    import "./index.css";
    import App from "./App";
    
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );`,

  //* App CSS file
  "src/App.css": `/* App styles */
    .App {
      text-align: center;
    }`,

  //* APP JS file
  "src/App.js": `import React from 'react';
    import './App.css';
    import 'animate.css';
    
    function App() {
      return (
        <div className="App">
          <h1 className="text-3xl font-bold underline">
            Welcome to Your Electron + React App!
          </h1>
          {/* Add your routes and components here */}
        </div>
      );
    }
    
    export default App;`,

  //* Electron Main Process File
  "public/main.js": `const { app, BrowserWindow } = require('electron/main');
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
    });`,

  //* Electron Preload Script
  "public/preload.js": `const { contextBridge, ipcRenderer } = require('electron');

       contextBridge.exposeInMainWorld('electronAPI', {
         // Add your API methods here
         platform: process.platform,
         versions: process.versions
       });`,
};
