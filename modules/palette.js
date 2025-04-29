import { ImageTemplate } from "../core/constants/nodeTemplate.js";

export class Palette {
  constructor({ paletteDivId, nodeTemplate, nodeDataArray, nodeTemplateMap }) {
    this.paletteContainer = document.getElementById(paletteDivId);
    this.paletteDivId = paletteDivId;
    this.nodeDataArray = nodeDataArray;
    this.nodeTemplate = nodeTemplate;
    this.nodeTemplateMap = nodeTemplateMap;
    this.palette = null;
    this.initPalette();
  }
  initPalette() {
    if (!this.paletteContainer) return;
    this.palette = new go.Palette(this.paletteDivId, {
      "animationManager.isEnabled": false,
      allowZoom: false,
      // nodeTemplate: this.nodeTemplate,
      contentAlignment: go.Spot.Left,
      layout: new go.GridLayout({
        wrappingColumn: 4,
        cellSize: new go.Size(2, 2),
      }),
    });

    if (this.nodeTemplate) {
      this.palette.nodeTemplate = this.nodeTemplate;
    }
    this.palette.nodeTemplateMap.add("ImageNode", ImageTemplate);
    if (this.nodeTemplateMap) {
      for (const key in this.nodeTemplateMap) {
        if (Object.hasOwn(this.nodeTemplateMap, key)) {
          this.palette.nodeTemplateMap.add(key, this.nodeTemplateMap[key]);
        }
      }
    }

    // this.palette.nodeTemplateMap.add("ImageNode", ImageTemplate)

    this.palette.model.nodeDataArray = this.nodeDataArray;
  }
}
