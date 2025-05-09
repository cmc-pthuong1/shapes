import { toHeight, toWidth } from "../utils/common.js";
import { colors } from "./common.js";
import { tank1, valve1 } from "./geometrics.js";

export const tankPort = new go.Panel({
  fromLinkable: true,
  toLinkable: true,
  toMaxLinks: 1,
})
  .bind("alignment", "a")
  .bind("portId", "p")
  .bind("fromSpot", "fs")
  .bind("toSpot", "ts")
  .add(new go.Shape("Diamond", { width: 10, height: 10, fill: colors.white }));

export const tankTemplate = new go.Node("Spot", {
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

export const monitorTemplate = new go.Node("Auto", {
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

export const valveTemplate = new go.Node("Spot", {
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
