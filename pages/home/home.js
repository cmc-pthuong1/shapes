import { nodeTemplate } from "../../core/constants/nodeTemplate.js";
import { nodeDataArray } from "../../core/constants/shapes.js";
import { Diagram } from "../../modules/diagram.js";
import { Inspector } from "../../modules/inspector.js";
import { Palette } from "../../modules/palette.js";

const palette = new Palette({
  paletteDivId: "palette",
  nodeTemplate: nodeTemplate,
  nodeDataArray: nodeDataArray,
});
const diagram = new Diagram({
  diagramDivId: "diagram",
  jsonModel: null,
  nodeTemplate: nodeTemplate,
});
const inspector = new Inspector({
  diagram: diagram.diagram,
  inspectorDivId: "inspector",
});
