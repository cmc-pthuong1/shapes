import { Diagram } from "../../modules/diagram.js";

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

const tank = "F M0 0 L50 0 50 -100 0 -100z";
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

const tankTemplate = new go.Node("Spot", { itemTemplate: tankPort })
  .bind("itemArray", "ports")
  .add(
    new go.Shape({
      geometryString: tank,
      // portId: "",
      // fromLinkable: true,
      // toLinkable: true,
      fill: new go.Brush("Linear", {
        0: go.Brush.darken(colors.white),
        0.2: colors.white,
        0.33: go.Brush.lighten(colors.white),
        0.5: colors.white,
        1: go.Brush.darken(colors.white),
        start: go.Spot.Left,
        end: go.Spot.Right,
      }),
    })
  );

const nodeTemplateMap = {
  tank: tankTemplate,
};

const diagramControl = new Diagram({
  diagramDivId: "diagram",
  jsonModel: null,
  //   nodeTemplate: nodeTemplate,
  nodeTemplateMap: nodeTemplateMap,
});
const diagram = diagramControl.diagram;

const nodeDataArray = [
  {
    category: "tank",
    key: "Tank1",
    color: "gray",
    ports: [
      { p: "BR1", a: new go.Spot(1, 1, 0, -50), fs: go.Spot.Right },
      { p: "BR2", a: new go.Spot(1, 1, 0, -30), fs: go.Spot.Right },
      { p: "BR3", a: new go.Spot(1, 1, 0, -10), fs: go.Spot.Right },
    ],
  },
  {
    category: "tank",
    key: "Tank2",
    color: "gray",
    ports: [
    //   { p: "BL1", a: new go.Spot(0, 1, 0, -10) },
    //   { p: "BL2", a: new go.Spot(0, 1, 0, -30) },
      { p: "BL3", a: new go.Spot(0, 1, 0, -50) },
      { p: "BR1", a: new go.Spot(1, 1, 0, -50), ts: go.Spot.Right },
      { p: "BR2", a: new go.Spot(1, 1, 0, -30), ts: go.Spot.Right },
    ],
  },
];

const linkDataArray = [
  { from: "Tank1", to: "Tank2", fromPort: "BR1", toPort: "BL3" },
//   { from: "Tank1", to: "Tank2", fromPort: "BR3", toPort: "BL2" },
];

diagram.model = new go.GraphLinksModel({
  linkFromPortIdProperty: "fromPort", // required information:
  linkToPortIdProperty: "toPort", // identifies data property names
  nodeDataArray: nodeDataArray,
  linkDataArray: linkDataArray,
});
