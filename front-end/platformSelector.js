import { initReactProject } from "./scripts/web/init-react.js";
import { initNextProject } from "./scripts/web/init-next.js";
import { initAngularProject } from "./scripts/web/init-angular.js";
import { initReactNativeProject } from "./scripts/mobile/init-react-native.js";
import { initElectronProject } from "./scripts/desktop/init-electron.js";

export async function platformSelector(answers, locationPath) {
  try {
    const { frontend } = answers;

    switch (frontend) {
      case "React":
        initReactProject(locationPath);
        break;
      case "Next":
        initNextProject(locationPath);
        break;
      case "Angular":
        initAngularProject(locationPath);
        break;
      case "React Native":
        initReactNativeProject(locationPath);
        break;
      case "Electron + React":
        initElectronProject(locationPath);
        break;
      default:
        console.log("No valid front-end technology selected.");
        break;
    }
  } catch (error) {
    console.error("Error in platform selection:", error);
  }
}
