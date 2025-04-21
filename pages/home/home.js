import { initDiagram } from "../../modules/diagram.js";
import {
  initInspector,
  onChangeAlignmentProperty,
  onChangeDataProperty,
} from "../../modules/inspector.js";
import { initPalette } from "../../modules/palette.js";
import { nodeTemplate, nodeDataArray } from "../../core/constants.js";

export function onHomeContentLoaded() {
  let diagram = initDiagram("diagram", nodeTemplate);
  initPalette("palette", nodeTemplate, nodeDataArray);
  initInspector({
    diagram,
    textId: "inspectorText",
    colorId: "inspectorColor",
    inspectorId: "inspector",
    fillId: "inspectorFill",
    XId: "inspectorX",
    YId: "inspectorY",
    strokeWidthId: "inspectorStrokeWidth",
    heightId: "inspectorHeight",
    widthId: "inspectorWidth",
  });
  return diagram;
}
