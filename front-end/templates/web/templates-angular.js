export const angularTemplates = {
  //* Tailwind CSS File
  "tailwind.config.js": `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {},
      fontFamily: {},
    },
  },
  plugins: [],
}
`,

  //* Style CSS File
  "src/styles.css": `@import 'animate.css';
@tailwind base;
@tailwind components;
@tailwind utilities;`,
};
