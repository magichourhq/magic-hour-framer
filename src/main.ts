import { framer } from "@framer/plugin";
import { framerHost } from "./host";
import { DesignVideo } from "@magichourhq/editor-kit";
await framer.showUI({ width: 380, height: 760 });
DesignVideo.mountPanel(framerHost(framer), true);
