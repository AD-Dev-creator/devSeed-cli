import { initNodeProject } from "./scripts/init-node.js";
import { initTypeScriptProject } from "./scripts/init-typeScript.js";
import { initPythonProject } from "./scripts/init-python.js";

export async function backendSelector(answers, backendPath) {
  switch (answers.backend) {
    case "Node.js + Express":
      initNodeProject(backendPath);
      break;
    case "TypeScript + Express":
      initTypeScriptProject(backendPath);
      break;
    case "Python + FastAPI":
      initPythonProject(backendPath);
      break;
    default:
      console.log("Invalid Back-End technology selected.");
  }
}
