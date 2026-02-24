export const nodeJsConfig = {
  folders: [
    "src",
    "src/tests",
    "src/tests/controllers",
    "src/tests/models",
    "src/tests/middleware",
    "src/common",
    "src/common/middleware",
    "src/common/utils",
    "src/common/database",
    "src/modules",
  ],

  files: [
    ".gitignore",
    ".env",
    "README.md",
    ".env.example",
    "src/main.js",
    "src/routes.js",
    "src/common/database/db.js",
    "src/common/middleware/auth.js",
  ],

  packageJsonScripts: {
    start: "nodemon src/main.js",
    dev: "nodemon src/main.js",
  },

  packageJsonConfig: {
    type: "module",
  },
};
