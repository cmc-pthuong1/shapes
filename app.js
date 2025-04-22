import { initDiagram } from "../../modules/diagram.js";
import { initInspector } from "../../modules/inspector.js";
import { initPalette } from "../../modules/palette.js";
import { inspectorInputs, nodeDataKeys } from "./core/constants/inspector.js";
import { nodeTemplate } from "./core/constants/nodeTemplate.js";
import { nodeDataArray } from "./core/constants/shapes.js";

const diagram = initDiagram("diagram", nodeTemplate);
initPalette("palette", nodeTemplate, nodeDataArray);
initInspector("inspector", diagram, inspectorInputs, nodeDataKeys);
