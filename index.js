import inquirer from "inquirer";
import path from "path";
import { backendSelector } from "./back-end/platformSelector.js";
import { platformSelector } from "./front-end/platformSelector.js";

async function name() {
  const { welcome } = await inquirer.prompt([
    {
      type: "list",
      name: "welcome",
      message: "Welcome to DevSeed CLI! Choose an option to get started:",
      choices: [
        { name: "Create New Project", value: "new" },
        { name: "Add to an existing project", value: "existing" },
        { name: "Exit", value: "exit" },
      ],
    },
  ]);

  if (welcome === "exit") {
    console.log("Exiting DevSeed CLI. Goodbye!");
    process.exit(0);
  }

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "location",
      message: "Add your path project :",
      default: process.cwd(),
    },

    {
      type: "input",
      name: "projectName",
      message: "Enter the project name:",
      default: "my-node-project",
      when: (answers) => welcome === "new",
    },

    {
      type: "list",
      name: "projectType",
      choices: ["Web", "Mobile", "Desktop"],
      message: "Select the type of project you want to create:",
    },

    {
      type: "list",
      name: "projectLayer",
      choices: ["Backend", "Frontend", "Fullstack"],
      message: "Select the project layer you want to create:",
    },

    {
      type: "list",
      name: "backend",
      choices: ["Node.js", "TypeScript", "Python"],
      message: "Select the Back-End technologies you want to use:",
      when: (answers) =>
        answers.projectLayer === "Backend" ||
        answers.projectLayer === "Fullstack",
    },

    {
      type: "list",
      name: "frontend",
      choices: (answers) => {
        switch (answers.projectType) {
          case "Web":
            return ["React", "Next", "Angular"];
          case "Mobile":
            return ["React Native"];
          case "Desktop":
            return ["Electron + React"];
          default:
            return [];
        }
      },
      message: "Select the Front-End technologies you want to use:",
      when: (answers) =>
        answers.projectLayer === "Frontend" ||
        answers.projectLayer === "Fullstack",
    },
  ]);

  answers.welcome = welcome;

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

name();
