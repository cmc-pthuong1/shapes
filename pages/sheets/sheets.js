import { nodeTemplate } from "../../core/constants/nodeTemplate.js";
import { nodeDataArray } from "../../core/constants/shapes.js";
import { Palette } from "../../modules/palette.js";
import { Sheet } from "../../modules/sheets.js";

const palette = new Palette({
  paletteDivId: "palette",
  nodeTemplate: nodeTemplate,
  nodeDataArray: nodeDataArray,
});
const sheetManager = new Sheet({
  diagramContainerId: "diagram",
  sheetListContainerId: "sheetList",
  nodeTemplate: nodeTemplate,
});

window.exportAllJson = () => sheetManager.exportAllJson()