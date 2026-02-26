export const reactTemplate = {
  //* README file
  "README.md": `# React Project
Starter template for a React application with Tailwind CSS and React Router.

## Available Scripts
In the project directory, you can run:
### \`npm start\``,

  //* Tailwind config file
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
};`,

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

  //* APP JS file (corrigé)
  "src/App.js": `import React from 'react';
import './App.css';
import 'animate.css';

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Hello, React with Tailwind CSS!
      </h1>
      {/* Add your routes and components here */}
    </div>
  );
}

export default App;`,
};
