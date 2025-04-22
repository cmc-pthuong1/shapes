export class Palette {
  constructor({ paletteDivId, nodeTemplate, nodeDataArray }) {
    this.paletteContainer = document.getElementById(paletteDivId);
    this.paletteDivId = paletteDivId;
    this.nodeDataArray = nodeDataArray;
    this.nodeTemplate = nodeTemplate;
    this.palette = null;
    this.initPalette();
  }
  initPalette() {
    if (!this.paletteContainer) return;
    this.palette = new go.Palette(this.paletteDivId, {
      allowZoom: false,
      nodeTemplate: this.nodeTemplate,
      contentAlignment: go.Spot.Center,
      layout: new go.GridLayout({
        wrappingColumn: 4,
        cellSize: new go.Size(2, 2),
      }),
    });
    console.log(this.palette);
    this.palette.model.nodeDataArray = this.nodeDataArray;
  }
}
