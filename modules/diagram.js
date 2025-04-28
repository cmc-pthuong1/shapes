import { ImageTemplate, linkTemplate } from "../core/constants/nodeTemplate.js";

export class Diagram {
  constructor({ diagramDivId, jsonModel, nodeTemplate, nodeTemplateMap }) {
    this.diagramContainer = document.getElementById(diagramDivId);
    this.diagramDivId = diagramDivId;
    this.jsonModel = jsonModel;
    this.nodeTemplate = nodeTemplate;
    this.nodeTemplateMap = nodeTemplateMap;
    this.diagram = null;
    this.initDiagram();
  }
  initDiagram() {
    this.diagram = new go.Diagram(this.diagramDivId, {
      "undoManager.isEnabled": true,
      "animationManager.isEnabled": false,
      initialAutoScale: go.Diagram.None,
      initialContentAlignment: go.Spot.TopLeft,
    });

    if (this.nodeTemplate) {
      this.diagram.nodeTemplate = this.nodeTemplate;
    }
    this.diagram.nodeTemplateMap.add("ImageNode", ImageTemplate);
    if (this.nodeTemplateMap) {
      for (const key in this.nodeTemplateMap) {
        if (Object.hasOwn(this.nodeTemplateMap, key)) {
          this.diagram.nodeTemplateMap.add(key, this.nodeTemplateMap[key]);
        }
      }
    }
    //change position of rotate tool from right to top of node
    this.diagram.toolManager.rotatingTool.handleAngle = 270;
    //RelinkingTool
    this.diagram.linkTemplate = linkTemplate;

    if (this.jsonModel) {
      this.diagram.model = go.Model.fromJson(this.jsonModel);
    } else {
      this.diagram.model = new go.GraphLinksModel();
    }
  }
}
