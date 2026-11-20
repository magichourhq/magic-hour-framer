import { framer } from "@framer/plugin";
import { framerHost } from "./host";
import { mountPanel } from "@magichourhq/editor-kit/panel";
await framer.showUI({ width: 380, height: 760 });
mountPanel(framerHost(framer), true);
