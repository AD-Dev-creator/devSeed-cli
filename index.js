import inquirer from "inquirer";
import path from "path";
import { initNodeProject } from "./back-end/scripts/init-node.js";
import { initPythonProject } from "./back-end/scripts/init-python.js";
import { initTypeScriptProject } from "./back-end/scripts/init-typeScript.js";
import { initAngularProject } from "./front-end/scripts/init-angular.js";
import { initReactProject } from "./front-end/scripts/init-react.js";
import { initNextProject } from "./front-end/scripts/init-next.js";

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
      choices: ["Backend", "Frontend", "Fullstack"],
      message: "Select the type of project you want to create:",
    },

    {
      type: "list",
      name: "backend",
      choices: ["Node.js", "TypeScript", "Python"],
      message: "Select the Back-End technologies you want to use:",
      when: (answers) =>
        answers.projectType === "Backend" ||
        answers.projectType === "Fullstack",
    },

    {
      type: "list",
      name: "frontend",
      choices: ["React", "Next", "Angular"],
      message: "Select the Front-End technologies you want to use:",
      when: (answers) =>
        answers.projectType === "Frontend" ||
        answers.projectType === "Fullstack",
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

  if (answers.projectType === "Backend") {
    const backendPath = path.join(projectPath, "backend");

    if (answers.backend === "Node.js") {
      initNodeProject(backendPath);
    } else if (answers.backend === "TypeScript") {
      initTypeScriptProject(backendPath);
    } else if (answers.backend === "Python") {
      initPythonProject(backendPath);
    } else {
      console.log("Invalid Back-End technology selected.");
    }
  } else if (answers.projectType === "Frontend") {
    const frontendPath = path.join(projectPath, "frontend");

    if (answers.frontend === "React") {
      initReactProject(frontendPath);
    } else if (answers.frontend === "Next") {
      initNextProject(frontendPath);
    } else if (answers.frontend === "Angular") {
      initAngularProject(frontendPath);
    } else {
      console.log("Invalid Front-End technology selected.");
    }
  } else if (answers.projectType === "Fullstack") {
    const backendPath = path.join(projectPath, "backend");
    const frontendPath = path.join(projectPath, "frontend");

    if (answers.backend === "Node.js") {
      initNodeProject(backendPath);
    } else if (answers.backend === "TypeScript") {
      initTypeScriptProject(backendPath);
    } else if (answers.backend === "Python") {
      initPythonProject(backendPath);
    } else {
      console.log("Invalid Back-End technology selected.");
      return;
    }

    if (answers.frontend === "React") {
      initReactProject(frontendPath);
    } else if (answers.frontend === "Next") {
      initNextProject(frontendPath);
    } else if (answers.frontend === "Angular") {
      initAngularProject(frontendPath);
    } else {
      console.log("Invalid Front-End technology selected.");
      return;
    }
  }
}

name();
