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
};

const tank1 = "F M0 0 H50 V-100 H0z";
// const tank2 = "F M0 0 Q25 -25 50 0 V87.5 H0z";
const tank2 = "F M 0 100 L 0 25 A 25 25 0 0 1 50 25 L 50 100 z";
const tank3 = "F M0 100 L0 25 L25 0 50 25 V100z ";

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
  clip: true,
})
  .bind("itemArray", "ports")
  .add(
    new go.Panel("Spot", {
      strokeWidth: 2,
      clip: true,
      stroke: colors.black,
    }).add(
      new go.Shape({
        name: "Main",

        geometryString: tank1,
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

const portColor = {
  BR1: colors.green,
  BR2: colors.red,
};

const nodeTemplateMap = {
  tank: tankTemplate,
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
    }).bind(
      "stroke",
      "fromPort",
      (fromPort) => portColor[fromPort] || colors.blue
    ),
    new go.Shape({
      fill: colors.green,
      toArrow: "Triangle",
      scale: 1.4,
      stroke: colors.black,
    })
      // .bind("stroke", "fromPort", (fromPort) => portColor[fromPort] || colors.black)
      .bind(
        "fill",
        "fromPort",
        (fromPort) => portColor[fromPort] || colors.blue
      )

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
