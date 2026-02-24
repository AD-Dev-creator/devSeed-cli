import { input, select, confirm } from "@inquirer/prompts";
import path from "path";
import { backendSelector } from "./back-end/platformSelector.js";
import { platformSelector } from "./front-end/platformSelector.js";

async function main() {
  const welcome = await select({
    message: "Welcome to DevSeed CLI! Choose an option to get started:",
    choices: [
      {
        name: "Create New Project",
        value: "new",
      },
      {
        name: "Add to an existing project",
        value: "existing",
      },
      {
        name: "Exit",
        value: "exit",
      },
    ],
  });

  if (welcome === "exit") {
    console.log("Exiting DevSeed CLI. Goodbye!");
    process.exit(0);
  }

  const location = await input({
    message: "Add your path project:",
    default: process.cwd(),
  });

  let projectName;
  if (welcome === "new") {
    projectName = await input({
      message: "Enter the project name:",
      default: "my-node-project",
    });
  }

  const projectType = await select({
    message: "Select the type of project you want to create:",
    choices: [
      { name: "Web", value: "Web" },
      { name: "Mobile", value: "Mobile" },
      { name: "Desktop", value: "Desktop" },
    ],
  });

  const projectLayer = await select({
    message: "Select the project layer you want to create:",
    choices: [
      { name: "Backend", value: "Backend" },
      { name: "Frontend", value: "Frontend" },
      { name: "Fullstack", value: "Fullstack" },
    ],
  });

  let backend;
  if (projectLayer === "Backend" || projectLayer === "Fullstack") {
    backend = await select({
      message: "Select the Back-End technologies you want to use:",
      choices: [
        {
          name: "Node.js",
          value: "Node.js",
          description:
            "JavaScript runtime • Express framework • Fast development",
        },
        {
          name: "TypeScript",
          value: "TypeScript",
          description: "Type-safe JavaScript • Prisma ORM • Production-ready",
        },
        {
          name: "Python",
          value: "Python",
          description:
            "FastAPI framework • Auto documentation • SQLite included",
        },
      ],
    });
  }

  let frontend;
  if (projectLayer === "Frontend" || projectLayer === "Fullstack") {
    let frontendChoices;
    switch (projectType) {
      case "Web":
        frontendChoices = [
          {
            name: "React",
            value: "React",
            description:
              "Use React for building dynamic user interfaces with a component-based architecture, and Tailwind CSS for styling with utility-first CSS classes.",
          },
          {
            name: "Next.js",
            value: "Next",
            description:
              "Use Next.js with TypeScript for server-side rendering and static site generation, ideal for SEO and performance, and Tailwind CSS for styling with utility-first CSS classes.",
          },
          {
            name: "Angular",
            value: "Angular",
            description:
              "Use Angular for building robust and scalable web applications with a comprehensive framework and component-based architecture.",
          },
        ];
        break;
      case "Mobile":
        frontendChoices = [
          {
            name: "React Native",
            value: "React Native",
            description:
              "Use React Native for building applications that run on both iOS and Android with a single codebase and native performance.",
          },
        ];
        break;
      case "Desktop":
        frontendChoices = [
          {
            name: "Electron",
            value: "Electron",
            description:
              "Use Electron with React for building cross-platform desktop applications with web technologies, and Tailwind CSS for styling with utility-first CSS classes.",
          },
        ];
        break;
      default:
        frontendChoices = [];
    }

    frontend = await select({
      message: "Select the Front-End technologies you want to use:",
      choices: frontendChoices,
    });
  }

  const answers = {
    welcome,
    location,
    projectName,
    projectType,
    projectLayer,
    backend,
    frontend,
  };

  const projectPath =
    answers.welcome === "new"
      ? path.join(answers.location, answers.projectName)
      : answers.location;

  if (answers.welcome === "new" && !answers.projectName) {
    console.log("Project name cannot be empty.");
    return;
  }

  if (answers.projectLayer === "Backend") {
    const backendPath = path.join(projectPath, "backend");
    await backendSelector(answers, backendPath);
  } else if (answers.projectLayer === "Frontend") {
    const frontendPath = path.join(projectPath, "frontend");
    await platformSelector(answers, frontendPath);
  } else if (answers.projectLayer === "Fullstack") {
    const backendPath = path.join(projectPath, "backend");
    const frontendPath = path.join(projectPath, "frontend");
    await backendSelector(answers, backendPath);
    await platformSelector(answers, frontendPath);
  }
}

main().catch(console.error);
