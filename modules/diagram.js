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
      initialContentAlignment: go.Spot.Left,
    });

    this.diagram.nodeTemplate = this.nodeTemplate;
    this.diagram.nodeTemplateMap.add("ImageNode", ImageTemplate);
    //change position of rotate tool from right to top of node
    this.diagram.toolManager.rotatingTool.handleAngle = 270;
    //RelinkingTool
    this.diagram.linkTemplate = new go.Link({
      // reshapable: true,
      relinkableFrom: true,
      relinkableTo: true,
    }).add(new go.Shape(), new go.Shape({ toArrow: "Standard" }));

    if (this.jsonModel) {
      this.diagram.model = go.Model.fromJson(this.jsonModel);
    } else {
      this.diagram.model = new go.GraphLinksModel();
    }
  }
}
