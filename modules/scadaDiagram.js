import { defaultPropertiesMonitor } from "../core/constants/common.js";
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
    console.log("initDiagram");
    this.trackingLinked();
    this.trackingReLink();
    this.syncData();
  }
  trackingLinked() {
    console.log("trackingLinked");
    const _ = this;
    _.diagram.model.addChangedListener(function (evt) {
      if (evt.propertyName === "linkDataArray") {
        const deletedLink = evt?.oldValue;
        const link = evt.newValue;
        const toKey =
          evt.change === go.ChangedEvent.Remove ? deletedLink.to : link.to;

        const toNodeData = _.diagram.model.findNodeDataForKey(toKey);
        if (toNodeData && toNodeData.category == "monitor") {
          const isConnected = evt.change != go.ChangedEvent.Remove;

          _.updateNodeConnection(toNodeData, isConnected);
        }
      }
    });
  }

  trackingReLink() {
    console.log("trackingReLink");
    const _ = this;
    //Link Relinked
    _.diagram.addDiagramListener("LinkRelinked", function (e) {
      const link = e.subject.part;
      if (link instanceof go.Link) {
        const newToNode = link.toNode;
        if (newToNode && newToNode.data?.category === "monitor") {
          _.updateNodeConnection(newToNode.data, true);
        }
      }
    });
    //Link Relinking
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
      if (oldTo && oldTo.data?.category === "monitor") {
        _.updateNodeConnection(oldTo.data, false);
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

  updateNodeConnection(nodeData, isConnected) {
    const _ = this;
    nodeData.properties = isConnected
      ? { ...nodeData.properties, connected: true }
      : defaultPropertiesMonitor;

    _.diagram.model.updateTargetBindings(nodeData);

    const action = isConnected ? "registerDevice" : "disconnectDevice";
    _.socket.emit(action, {
      deviceId: nodeData.key,
      status: isConnected ? "active" : undefined,
    });
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
  remapDiagram({ model = null, position = null }) {
    console.log("remapDiagram");
    // Hủy liên kết Diagram cũ trước khi tạo mới
    this.disconnectDiagram();
    if (this.diagram) {
      this.diagram.div = null; // Bắt buộc để GoJS hủy liên kết với div
      this.diagram.clear(); // Giải phóng tài nguyên
    }
    this.jsonModel = model;
    this.initDiagram();
    this.reconnectNodeToSocket();
    return this.diagram;
  }
  reconnectNodeToSocket() {
    console.log("reconnectNodeToSocket");
    const _ = this;
    _.diagram.model.nodeDataArray.forEach((node) => {
      if (node.category == "monitor") {
        _.socket.emit("registerDevice", {
          deviceId: node.key,
          status: "active",
        });
      }
    });
  }

  disconnectDiagram() {
    console.log("disconnectDiagram");
    this.socket.emit("disconnectDiagram");
  }
}
