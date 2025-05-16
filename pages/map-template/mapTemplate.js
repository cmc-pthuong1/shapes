import {
  colors,
  defaultPropertiesMonitor,
} from "../../core/constants/common.js";
import {
  tank1,
  tank2,
  tank3,
  valve1,
  pump,
} from "../../core/constants/geometrics.js";
import { scadaInspectorInputs } from "../../core/constants/inspector.js";
import {
  monitorTemplate,
  tankTemplate,
  valveTemplate,
  pumpTemplate,
  sensorTemplate,
} from "../../core/constants/scadaNodeTemplate.js";
import { Palette } from "../../modules/palette.js";
import { SCADASheet } from "../../modules/scada.js";

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
  pump: pumpTemplate,
  sensor: sensorTemplate,
};

const paletteData = [
  {
    category: "tank",
    type: "tank1",
    name: "MPAT",
    color: "gray",
    status: "active",
    geometryString: tank1,
    width: 100,
    height: 130,
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
    width: 100,
    height: 130,
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
    width: 110,
    height: 130,
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
    width: 120,
    height: 70,
    properties: {
      ...defaultPropertiesMonitor,
    },
  },
  {
    category: "valve",
    name: "LCV101",
    geometryString: valve1,
    width: 60,
    height: 40,
    ports: { p: "BL1", a: new go.Spot(0, 0.5), ts: go.Spot.Left },
    properties: {
      flowRate: "0",
      pressure: "1",
      isOpen: 0,
    },
  },
  // PUMPS
  {
    category: "pump",
    name: "P102",
    geometryString: pump,
    color: colors.pink,
    pos: "720 605.3",
    angle: 180,
    ports: { p: "BL1", a: new go.Spot(0, 0.5), ts: go.Spot.Left },
  },
  // SENSORS:
  {
    name: "S1",
    category: "sensor",
    value: "12.0",
    pos: "385 68",
    unit: "°C",
    ports: { p: "BL2", a: new go.Spot(0, 0.5), ts: go.Spot.Left },
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
  sheetListContainerId: "sheetListContainer",
  nodeTemplateMap: nodeTemplateMap,
  linkTemplate: linkTemplate,
});

window.exportAllJson = () => sheetManager.exportAllJson();
window.importJson = (e) => sheetManager.importJson(e);