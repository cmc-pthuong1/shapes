import { colors, defaultPropertiesMonitor } from "../../core/constants/common.js";
import {
  tank1,
  tank2,
  tank3,
  valve1,
} from "../../core/constants/geometrics.js";
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
    type: "tank1",
    name: "MPAT",
    color: "gray",
    status: "active",
    geometryString: tank1,
    ports: [
      {
        p: "BR1",
        a: new go.Spot(1, 0.1),
        fs: go.Spot.Right,
        ts: go.Spot.Right,
      },
      {
        p: "BR2",
        a: new go.Spot(1, 0.35),
        fs: go.Spot.Right,
        ts: go.Spot.Right,
      },
      {
        p: "BR3",
        a: new go.Spot(1, 0.6),
        fs: go.Spot.Right,
        ts: go.Spot.Right,
      },
    ],
    properties: {},
  },
  {
    category: "tank",
    type: "tank2",
    name: "MPHE",
    geometryString: tank2,
    ports: [
      { p: "BL1", a: new go.Spot(0, 0.5), fs: go.Spot.Left, ts: go.Spot.Left },
      {
        p: "BL2",
        a: new go.Spot(0, 1, 0, -30),
        fs: go.Spot.Left,
        ts: go.Spot.Left,
      },
      // { p: "BL3", a: new go.Spot(0, 0.5) },
      {
        p: "BR1",
        a: new go.Spot(1, 0.7),
        fs: go.Spot.Right,
        ts: go.Spot.Right,
      },
      {
        p: "BR2",
        a: new go.Spot(1, 0.9),
        fs: go.Spot.Right,
        ts: go.Spot.Right,
      },
    ],
  },
  {
    category: "tank",
    type: "tank3",
    name: "MHTW",
    geometryString: tank3,
    ports: [
      { p: "BL3", a: new go.Spot(0, 0.45), ts: go.Spot.Left, fs: go.Spot.Left },
      { p: "BL2", a: new go.Spot(0, 0.6), ts: go.Spot.Left, fs: go.Spot.Left },
      { p: "BL1", a: new go.Spot(0, 0.75), ts: go.Spot.Left, fs: go.Spot.Left },

      {
        p: "BR1",
        a: new go.Spot(1, 0.7),
        fs: go.Spot.Right,
        ts: go.Spot.Right,
      },
      {
        p: "BR2",
        a: new go.Spot(1, 0.9),
        fs: go.Spot.Right,
        ts: go.Spot.Right,
      },
    ],
  },
  {
    category: "monitor",
    name: "monitor TVC102",
    properties: {
      ...defaultPropertiesMonitor,
    },
  },
  {
    category: "valve",
    name: "LCV101",
    geometryString: valve1,
    ports: { p: "BL1", a: new go.Spot(0, 0.5), ts: go.Spot.Left },
    properties: {
      flowRate: "0",
      pressure: "1",
      isOpen: 0,
    },
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
    }),
    new go.Shape({
      fill: colors.green,
      toArrow: "Triangle",
      scale: 1.4,
      stroke: colors.black,
    })
  );

const sheetManager = new SCADASheet({
  diagramContainerId: "diagram",
  sheetListContainerId: "sheetList",
  nodeTemplateMap: nodeTemplateMap,
  linkTemplate: linkTemplate,
});

window.exportAllJson = () => sheetManager.exportAllJson();
window.importJson = (e) => sheetManager.importJson(e);

const diagram = sheetManager.diagram;

diagram.model = new go.GraphLinksModel({
  linkFromPortIdProperty: "fromPort", // required information:
  linkToPortIdProperty: "toPort", // identifies data property names
});
sheetManager.diagramControl.trackingLinked();
sheetManager.diagramControl.trackingReLink()
sheetManager.diagramControl.syncData()