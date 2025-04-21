import { initDiagram } from "../../modules/diagram.js";
import { initInspector } from "../../modules/inspector.js";
import { initPalette } from "../../modules/palette.js";
import { nodeTemplate, nodeDataArray } from "../../core/constants.js";

const diagram = initDiagram("diagram", nodeTemplate);
initPalette("palette", nodeTemplate, nodeDataArray);
initInspector("inspector", diagram);
