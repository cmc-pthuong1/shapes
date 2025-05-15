import { ImageTemplate, linkTemplate } from "../core/constants/nodeTemplate.js";

export class SCADADiagram {
  constructor({
    diagramDivId,
    jsonModel,
    nodeTemplate,
    nodeTemplateMap,
    linkTemplate,
  }) {
    this.diagramContainer = document.getElementById(diagramDivId);
    this.diagramDivId = diagramDivId;
    this.jsonModel = jsonModel;
    this.nodeTemplate = nodeTemplate;
    this.nodeTemplateMap = nodeTemplateMap;
    this.linkTemplate = linkTemplate;
    this.diagram = null;
    this.socket = io("http://localhost:3000");
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
    this.diagram.linkTemplate = this.linkTemplate || linkTemplate;

    if (this.jsonModel) {
      this.diagram.model = go.Model.fromJson(this.jsonModel);
    } else {
      this.diagram.model = new go.GraphLinksModel({
        linkFromPortIdProperty: "fromPort", // required information:
        linkToPortIdProperty: "toPort", // identifies data property names
      });
    }
  }
  trackingLinked() {
    const _ = this;
    _.diagram.model.addChangedListener(function (evt) {
      if (evt.propertyName === "linkDataArray") {
        const deletedLink = evt?.oldValue;
        const link = evt.newValue;
        const toKey =
          evt.change === go.ChangedEvent.Remove ? deletedLink.to : link.to;

        const toNodeData = _.diagram.model.findNodeDataForKey(toKey);
        if (toNodeData.category == "monitor") {
          let isConnected = evt.change != go.ChangedEvent.Remove;

          toNodeData.properties = isConnected
            ? {
                ...toNodeData.properties,
                connected: true,
              }
            : defaultPropertiesMonitor;
          _.diagram.model.updateTargetBindings(toNodeData);
          if (isConnected) {
            //emit registerDevice
            _.socket.emit("registerDevice", {
              deviceId: toNodeData.key,
              status: "active",
            });
          } else {
            _.socket.emit("disconnectDevice", {
              deviceId: toNodeData.key,
            });
          }
        }
      }
    });
  }

  trackingReLink() {
    const _ = this;
    _.diagram.addDiagramListener("LinkRelinked", function (e) {
      const link = e.subject.part;
      if (link instanceof go.Link) {
        const newToNode = link.toNode;
        const isMonitor = newToNode.data?.category == "monitor";
        if (isMonitor) {
          const properties = { ...newToNode.data, connected: true };
          _.diagram.model.setDataProperty(
            newToNode.data,
            "properties",
            properties
          );
          // emit registerDevice
          _.socket.emit("registerDevice", {
            deviceId: newToNode.key,
            statusConnect: true,
          });
        }
      }
    });
    const myRelinkingTool = new go.RelinkingTool();

    myRelinkingTool.reconnectLink = function (
      existingLink,
      fromNode,
      fromPort,
      toNode,
      toPort,
      isFrom
    ) {
      const oldTo = existingLink.toNode;
      const isMonitor = oldTo.data?.category == "monitor";
      if (isMonitor) {
        console.log(oldTo.data);
        _.diagram.model.setDataProperty(
          oldTo.data,
          "properties",
          defaultPropertiesMonitor
        );
        //emit disconnectDevice
        _.socket.emit("disconnectDevice", {
          deviceId: oldTo.key,
        });
      }

      go.RelinkingTool.prototype.reconnectLink.call(
        _,
        existingLink,
        fromNode,
        fromPort,
        toNode,
        toPort,
        isFrom
      );
    };
    _.diagram.toolManager.relinkingTool = myRelinkingTool;
  }
  syncData() {
    const _ = this;
    _.socket.on("event", function (msg) {
      if (msg.event == "pushData") {
        const key = msg.deviceId;
        if (!key) return;
        const toNodeData = _.diagram.model.findNodeDataForKey(Number(key));
        if (!toNodeData) return;

        const properties = {
          ...toNodeData.properties,
          flowRate: msg.flowRate,
          pressure: msg.pressure,
        };
        _.diagram.model.set(toNodeData, "properties", properties);
      }
    });
  }
}
