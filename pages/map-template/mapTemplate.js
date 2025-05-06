import { toHeight, toWidth } from "../../core/utils/common.js";
import { Diagram } from "../../modules/diagram.js";
import { Palette } from "../../modules/palette.js";
import { Sheet } from "../../modules/sheets.js";

// Bảng thiết bị: (Thiết bị, Cảm Biến)
// Bảng dữ liệu đo lường
// Bảng sự kiện
// Bảng cấu hình

const colors = {
  black: "#151c26",
  white: "#ffffff",
  gray: "#2c323b",
  green: "#7ba961",
  blue: "#00a9b0",
  pink: "#e483a2",
  yellow: "#f9c66a",
  orange: "#e48042",
  red: "#ed2d44",
  transparent: "transparent",
};

const tank1 = "F M0 0 H50 V-100 H0z";
// const tank2 = "F M0 0 Q25 -25 50 0 V87.5 H0z";
const tank2 = "F M 0 100 L 0 25 A 25 25 0 0 1 50 25 L 50 100 z";
const tank3 = "F M0 100 L0 25 L25 0 50 25 V100z ";

//valve
const valve1 = "F M0 0 L50 25 50 0 0 25z M25 12.5 L25 -12 M12.5 -12 H36";

const tankPort = new go.Panel({
  fromLinkable: true,
  toLinkable: true,
  toMaxLinks: 1,
})
  .bind("alignment", "a")
  .bind("portId", "p")
  .bind("fromSpot", "fs")
  .bind("toSpot", "ts")
  .add(new go.Shape("Diamond", { width: 10, height: 10, fill: colors.white }));

const tankTemplate = new go.Node("Spot", {
  itemTemplate: tankPort,
  resizable: true,
  resizeObjectName: "Main",
})
  .bind("itemArray", "ports")
  .add(
    new go.Panel("Spot", {
      strokeWidth: 2,
      clip: true,
    }).add(
      new go.Shape({
        name: "Main",

        geometryString: tank1,
        stroke: colors.black,
        fill: new go.Brush("Linear", {
          0: go.Brush.darken(colors.white),
          0.2: colors.white,
          0.33: go.Brush.lighten(colors.white),
          0.5: colors.white,
          1: go.Brush.darken(colors.white),
          start: go.Spot.Left,
          end: go.Spot.Right,
        }),
      }).bind("geometryString", "tankType"),

      new go.TextBlock({ stroke: colors.black, wrap: go.Wrap.Fit })
        .bind("text", "label")
        .bind("width", "", toWidth)
        .bind("height", "", toHeight)
    )
  );

const monitorTemplate = new go.Node("Auto", {
  resizable: true,
  minSize: new go.Size(100, 40),
}).add(
  new go.Shape({
    fill: "transparent",
    strokeWidth: 2,
    stroke: colors.white,
    toLinkable: true,
    portId: "monitor",
  }),
  new go.Panel("Vertical", {
    margin: 10,
    stretch: go.Stretch.Fill,
    stroke: colors.black,
    strokeWidth: 2,
    cursor: "move",
  }).add(
    new go.TextBlock().bind("text", "label"),
    new go.Panel("Horizontal").add(
      new go.Shape("Circle", { width: 8, height: 8 }).bind(
        "fill",
        "",
        (data, node) => {
          return data.connected ? colors.green : colors.red;
        }
      )
    ),
    new go.Panel("Table", {
      // defaultRowSeparatorStroke: colors.black,
      // defaultColumnSeparatorStroke: colors.black,
      stretch: go.Stretch.Fill,
      itemTemplate: new go.Panel("TableRow").add(
        new go.TextBlock({
          row: 0,
          column: 0,
          margin: 2,
          textAlign: "left",
          stretch: go.Stretch.Fill,
        }).bind("text", "label"),
        new go.TextBlock({
          row: 0,
          column: 1,
          margin: 2,
          textAlign: "left",
          overflow: go.TextOverflow.Ellipsis,
          stretch: go.Stretch.Fill,
        }).bind("text", "value"),
        new go.TextBlock({
          row: 0,
          column: 2,
          margin: 2,
          textAlign: "right",
          overflow: go.TextOverflow.Ellipsis,
          stretch: go.Stretch.Fill,
        }).bind("text", "unit")
      ),
    }).bind("itemArray", "parameters")
  )
);

const valveTemplate = new go.Node("Spot", {
  resizable: true,
  rotatable: true,
  resizeObjectName: "Main",
}).add(
  new go.Shape({
    name: "Main",
    geometryString: valve1,
    stroke: colors.red,
    fill: colors.gray,
    cursor: "move",
  })
    .bind("fill")
    .bind("stroke")
    .bind("geometryString", "valveType"),

  new go.Shape("Circle", {
    portId: "monitor",
    fromLinkable: true,
    with: 5,
    height: 5,
    alignment: new go.Spot(0.5, 0.65),
    fill: colors.transparent,
    stroke: colors.transparent,
  }),
  new go.Shape("Circle", {
    portId: "valve-input",
    toLinkable: true,
    with: 5,
    height: 5,
    alignment: new go.Spot(0, 0.65, 3, 0),
    fill: colors.transparent,
    stroke: colors.transparent,
  }),
  new go.Shape("Circle", {
    portId: "valve-output",
    fromLinkable: true,
    with: 5,
    height: 5,
    alignment: new go.Spot(1, 0.65, -3, 0),
    fill: colors.transparent,
    stroke: colors.transparent,
  })
);

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

console.log(paletteData);

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

const sheetManager = new Sheet({
  diagramContainerId: "diagram",
  sheetListContainerId: "sheetList",
  nodeTemplateMap: nodeTemplateMap,
  linkTemplate: linkTemplate,
});

window.exportAllJson = () => sheetManager.exportAllJson();

const diagram = sheetManager.diagram;

// diagram.linkTemplate = new go.Link({
//   relinkableFrom: true,
//   relinkableTo: true,
//   routing: go.Routing.AvoidsNodes,
//   corner: 10, // rounded corners
//   layerName: "Background",
//   toShortLength: 8,
//   fromEndSegmentLength: 4,
//   toEndSegmentLength: 30,
// })
//   .bind("fromEndSegmentLength")
//   .bind("toEndSegmentLength")
//   .add(
//     new go.Shape({ strokeWidth: 8, stroke: colors.black, isPanelMain: true }),
//     new go.Shape({
//       strokeWidth: 3.5,
//       stroke: colors.green,
//       isPanelMain: true,
//     }).bind(
//       "stroke",
//       "fromPort",
//       (fromPort) => portColor[fromPort] || colors.blue
//     ),
//     new go.Shape({
//       fill: colors.green,
//       toArrow: "Triangle",
//       scale: 1.4,
//       stroke: colors.black,
//     })
//       // .bind("stroke", "fromPort", (fromPort) => portColor[fromPort] || colors.black)
//       .bind(
//         "fill",
//         "fromPort",
//         (fromPort) => portColor[fromPort] || colors.blue
//       )

//     // new go.Shape({ strokeWidth: 4 }).bind(
//     //   "stroke",
//     //   "fromPort",
//     //   (fromPort) => portColor[fromPort] || "black"
//     // ),
//     // new go.Shape({ toArrow: "Standard" })
//     //   .bind("stroke", "fromPort", (fromPort) => portColor[fromPort] || "black")
//     //   .bind("fill", "fromPort", (fromPort) => portColor[fromPort] || "black")
//   );

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
