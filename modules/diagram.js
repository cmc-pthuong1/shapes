import { ImageTemplate } from "../core/constants/nodeTemplate.js";

export class Diagram {
  constructor({ diagramDivId, jsonModel, nodeTemplate }) {
    this.diagramContainer = document.getElementById(diagramDivId);
    this.diagramDivId = diagramDivId;
    this.jsonModel = jsonModel;
    this.nodeTemplate = nodeTemplate;
    this.diagram = null;
    this.initDiagram();
  }
  initDiagram() {
    this.diagram = new go.Diagram(this.diagramDivId, {
      "undoManager.isEnabled": true,
      "animationManager.isEnabled": false,
      initialAutoScale: go.Diagram.None,
      initialContentAlignment: go.Spot.Center,
    });

    this.diagram.nodeTemplate = this.nodeTemplate;
    this.diagram.nodeTemplateMap.add("ImageNode", ImageTemplate);

    if (this.jsonModel) {
      this.diagram.model = go.Model.fromJson(this.jsonModel);
    } else {
      this.diagram.model = new go.GraphLinksModel();
    }
  }
}
