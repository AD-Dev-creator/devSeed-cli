export const electronConfig = {
  folders: ["src/components", "src/pages"],

  files: [
    ".env",
    ".env.example",
    "README.md",
    "tailwind.config.js",
    "postcss.config.js",
    "src/index.css",
    "src/index.js",
    "src/App.css",
    "src/App.js",
    "public/main.js",
    "public/preload.js",
  ],

  packageJsonConfig: {
    main: "public/main.js",
    scripts: {
      electron: "electron .",
      "electron-dev": "cross-env ELECTRON_IS_DEV=true electron .",
      "electron-start":
        'concurrently "npm start" "wait-on http://localhost:3000 && npm run electron-dev"',
      "build-electron": "npm run build && electron-builder",
      dist: "npm run build && electron-builder --publish=never",
    },
    build: {
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
    },
  },
};
