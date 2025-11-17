import { initAngularProject } from "./scripts/web/init-angular.js";
import { initReactProject } from "./scripts/web/init-react.js";
import { initNextProject } from "./scripts/web/init-next.js";
import { initReactNativeProject } from "./scripts/mobile/init-react-native.js";
import { initIonicProject } from "./scripts/mobile/init-ionic.js";
import { initElectronProject } from "./scripts/desktop/init-electron.js";

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
        await initReactNativeProject(answers, locationPath);
        break;
      case "Ionic":
        await initIonicProject(answers, locationPath);
        break;
      default:
        break;
    }

    const { desktop } = answers;

    switch (desktop) {
      case "Electron":
        await initElectronProject(answers, locationPath);
        break;
      default:
        break;
    }
  } catch (error) {
    console.error("Error in platform selection:", error);
  }
}
