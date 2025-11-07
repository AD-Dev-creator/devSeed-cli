import { initAngularProject } from "./scripts/init-angular.js";
import { initReactProject } from "./scripts/init-react.js";
import { initNextProject } from "./scripts/init-next.js";

export async function platformSelector(answers, locationPath) {
  try {
    const { web } = answers;

    switch (web) {
      case "React":
        await initReactProject(answers, locationPath);
        break;
      case "Next.js":
        await initNextProject(answers, locationPath);
        break;
      case "Angular":
        await initAngularProject(answers, locationPath);
        break;
      default:
        break;
    }

    const { mobile } = answers;

    switch (mobile) {
      case "React Native":
        console.log(
          "React Native project initialization is not yet implemented."
        );
        break;
      case "Ionic":
        console.log("Ionic project initialization is not yet implemented.");
        break;
      default:
        break;
    }

    const { desktop } = answers;

    switch (desktop) {
      case "Electron":
        console.log("Electron project initialization is not yet implemented.");
        break;
      default:
        break;
    }
  } catch (error) {
    console.error("Error in platform selection:", error);
  }
}
