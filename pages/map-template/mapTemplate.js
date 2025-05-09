import { colors } from "../../core/constants/common.js";
import { tank2, tank3, valve1 } from "../../core/constants/geometrics.js";
import {
  monitorTemplate,
  tankTemplate,
  valveTemplate,
} from "../../core/constants/scadaNodeTemplate.js";
import { toHeight, toWidth } from "../../core/utils/common.js";
import { Diagram } from "../../modules/diagram.js";
import { Palette } from "../../modules/palette.js";
import { SCADASheet } from "../../modules/scada.js";
import { Sheet } from "../../modules/sheets.js";

// Bảng thiết bị: (Thiết bị, Cảm Biến)
// Bảng dữ liệu đo lường
// Bảng sự kiện
// Bảng cấu hình

const portColor = {
  BR1: colors.green,
  BR2: colors.red,
  monitor: colors.white,
};

const nodeTemplateMap = {
  tank: tankTemplate,
  monitor: monitorTemplate,
  valve: valveTemplate,
};

const paletteData = [
  {
    category: "tank",
    key: "Tank1",
    label: "Tank 1",
    color: "gray",
    ports: [
      { p: "BR1", a: new go.Spot(1, 0.5), fs: go.Spot.Right },
      { p: "BR2", a: new go.Spot(1, 0.7), fs: go.Spot.Right },
      { p: "BR3", a: new go.Spot(1, 0.9), fs: go.Spot.Right },
    ],
  },
  {
    category: "tank",
    tankType: tank2,
    key: "Tank2",
    label: "Tank 2",
    color: "gray",
    ports: [
      { p: "BL1", a: new go.Spot(0, 0.5), ts: go.Spot.Left },
      //   { p: "BL2", a: new go.Spot(0, 1, 0, -30) },
      // { p: "BL3", a: new go.Spot(0, 0.5) },
      { p: "BR1", a: new go.Spot(1, 0.7), ts: go.Spot.Right },
      { p: "BR2", a: new go.Spot(1, 0.9), ts: go.Spot.Right },
    ],
  },
  {
    category: "tank",
    tankType: tank3,
    key: "Tank3",
    label: "Tank 3",
    color: "gray",
    ports: [
      { p: "BL1", a: new go.Spot(0, 0.5), ts: go.Spot.Left },
      //   { p: "BL2", a: new go.Spot(0, 1, 0, -30) },
      // { p: "BL3", a: new go.Spot(0, 0.5) },
      { p: "BR1", a: new go.Spot(1, 0.7), ts: go.Spot.Right },
      { p: "BR2", a: new go.Spot(1, 0.9), ts: go.Spot.Right },
    ],
  },
  {
    category: "monitor",
    label: "monitor",
    connected: false,
    parameters: [
      {
        label: "T",
        value: "0",
        unit: "°C",
      },
      {
        label: "P",
        value: "1",
        unit: "atm",
      },
      {
        label: "Q",
        value: "1",
        unit: "m³/s",
      },
    ],
  },
  {
    category: "valve",
    valveType: valve1,
    fill: colors.white,
    stroke: colors.gray,
    ports: { p: "BL1", a: new go.Spot(0, 0.5), ts: go.Spot.Left },
  },
];

const palette = new Palette({
  paletteDivId: "palette",
  // nodeTemplate: nodeTemplate,
  nodeTemplateMap: nodeTemplateMap,
  nodeDataArray: paletteData,
});

const linkTemplate = new go.Link({
  relinkableFrom: true,
  relinkableTo: true,
  routing: go.Routing.AvoidsNodes,
  corner: 10, // rounded corners
  layerName: "Background",
  toShortLength: 8,
  fromEndSegmentLength: 30,
  toEndSegmentLength: 30,
})
  .bind("fromEndSegmentLength")
  .bind("toEndSegmentLength")
  .add(
    new go.Shape({ strokeWidth: 8, stroke: colors.black, isPanelMain: true }),
    new go.Shape({
      strokeWidth: 3.5,
      stroke: colors.green,
      isPanelMain: true,
    }).bind("stroke", "", (data, node) => {
      if (data.toPort == "monitor") return portColor[data.toPort];
      return portColor[data.fromPort] || colors.blue;
    }),
    new go.Shape({
      fill: colors.green,
      toArrow: "Triangle",
      scale: 1.4,
      stroke: colors.black,
    }).bind("stroke", "", (data, node) => {
      if (data.toPort == "monitor") return portColor[data.toPort];
      return portColor[data.fromPort] || colors.blue;
    })

    // new go.Shape({ strokeWidth: 4 }).bind(
    //   "stroke",
    //   "fromPort",
    //   (fromPort) => portColor[fromPort] || "black"
    // ),
    // new go.Shape({ toArrow: "Standard" })
    //   .bind("stroke", "fromPort", (fromPort) => portColor[fromPort] || "black")
    //   .bind("fill", "fromPort", (fromPort) => portColor[fromPort] || "black")
  );

const sheetManager = new SCADASheet({
  diagramContainerId: "diagram",
  sheetListContainerId: "sheetList",
  nodeTemplateMap: nodeTemplateMap,
  linkTemplate: linkTemplate,
});

window.exportAllJson = () => sheetManager.exportAllJson();

const diagram = sheetManager.diagram;

const linkDataArray = [
  { from: "Tank1", to: "Tank2", fromPort: "BR1", toPort: "BL3" },
  //   { from: "Tank1", to: "Tank2", fromPort: "BR3", toPort: "BL2" },
];

diagram.model = new go.GraphLinksModel({
  linkFromPortIdProperty: "fromPort", // required information:
  linkToPortIdProperty: "toPort", // identifies data property names
  linkDataArray: linkDataArray,
});

diagram.addDiagramListener("LinkRelinked", function (e) {
  const link = e.subject.part;
  if (link instanceof go.Link) {
    const newToNode = link.toNode;
    const isMonitor = newToNode.data?.category == "monitor";
    if (isMonitor) {
      diagram.model.startTransaction(`update connected`);
      diagram.model.setDataProperty(newToNode.data, "connected", true);
      diagram.model.commitTransaction(`update connected`);
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
    diagram.model.startTransaction(`update connected`);
    diagram.model.setDataProperty(oldTo.data, "connected", false);
    diagram.model.commitTransaction(`update connected`);
  }

  go.RelinkingTool.prototype.reconnectLink.call(
    this,
    existingLink,
    fromNode,
    fromPort,
    toNode,
    toPort,
    isFrom
  );
};
diagram.toolManager.relinkingTool = myRelinkingTool;

diagram.model.addChangedListener(function (evt) {
  if (evt.propertyName === "linkDataArray") {
    const deletedLink = evt?.oldValue;
    const link = evt.newValue;
    const toKey =
      evt.change === go.ChangedEvent.Remove ? deletedLink.to : link.to;

    const toNodeData = diagram.model.findNodeDataForKey(toKey);
    let isConnected = evt.change != go.ChangedEvent.Remove;
    toNodeData.connected = isConnected;
    diagram.model.updateTargetBindings(toNodeData);
  }
});

function findNodesByCategory(category) {
  const nodes = [];

  diagram.nodes.each((node) => {
    if (node.data?.category === category) {
      nodes.push(node);
    }
  });

  return nodes;
}

const socket = io("http://localhost:3000");

socket.on("message", function (msg) {
  console.log(msg);
  diagram.commit(() => {
    const monitors = findNodesByCategory("monitor");
    for (const n of monitors) {
      const d = n.data;
      if (d.connected) {
        diagram.model.set(d, "parameters", [
          {
            label: "T",
            value: msg.t,
            unit: "°C",
          },
          {
            label: "P",
            value: msg.p,
            unit: "atm",
          },
          {
            label: "Q",
            value: msg.q,
            unit: "m³/s",
          },
        ]);
      } else {
        diagram.model.set(d, "parameters", [
          {
            label: "T",
            value: "0",
            unit: "°C",
          },
          {
            label: "P",
            value: "1",
            unit: "atm",
          },
          {
            label: "Q",
            value: "1",
            unit: "m³/s",
          },
        ]);
      }
    }
  }, null);
});
