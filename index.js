import inquirer from "inquirer";
import path from "path";
import { initNodeProject } from "./back-end/scripts/init-node.js";
import { initPythonProject } from "./back-end/scripts/init-python.js";
import { initTypeScriptProject } from "./back-end/scripts/init-typeScript.js";
import { initAngularProject } from "./front-end/scripts/init-angular.js";
import { initReactProject } from "./front-end/scripts/init-react.js";
import { initNextProject } from "./front-end/scripts/init-next.js";

async function name() {
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

  const projectPath = path.join(answers.location, answers.projectName);

  if (!answers.projectName) {
    console.log("Project name cannot be empty.");
    return;
  }

  if (answers.projectType === "Backend") {
    if (answers.backend === "Node.js") {
      initNodeProject(projectPath);
    } else if (answers.backend === "TypeScript") {
      initTypeScriptProject(projectPath);
    } else if (answers.backend === "Python") {
      initPythonProject(projectPath);
    } else {
      console.log("Invalid Back-End technology selected.");
    }
  } else if (answers.projectType === "Frontend") {
    if (answers.frontend === "React") {
      initReactProject(projectPath);
    } else if (answers.frontend === "Next") {
      initNextProject(projectPath);
    } else if (answers.frontend === "Angular") {
      initAngularProject(projectPath);
    } else {
      console.log("Invalid Front-End technology selected.");
    }
  }
}

name();
