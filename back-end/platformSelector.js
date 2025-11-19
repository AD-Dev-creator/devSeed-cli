import { initNodeProject } from "./scripts/init-node.js";
import { initTypeScriptProject } from "./scripts/init-typeScript.js";
import { initPythonProject } from "./scripts/init-python.js";

export async function backendSelector(answers, backendPath) {
  switch (answers.backend) {
    case "Node.js":
      initNodeProject(backendPath);
      break;
    case "TypeScript":
      initTypeScriptProject(backendPath);
      break;
    case "Python":
      initPythonProject(backendPath);
      break;
    default:
      console.log("Invalid Back-End technology selected.");
  }
}
