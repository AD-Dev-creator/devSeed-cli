export const angularTemplates = {
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

  "src/styles.css": `@tailwind base;
@tailwind components;
@tailwind utilities;`,
};
