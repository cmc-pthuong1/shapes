import {
  fromLocation,
  toHeight,
  toLocation,
  toWidth,
} from "../utils/common.js";
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
  .bindTwoWay(
    "location",
    "",
    toLocation, // binding
    fromLocation //make two way
  )
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
      })
        .bind("geometryString", "geometryString")
        .bindTwoWay("width")
        .bindTwoWay("height"),

      new go.TextBlock({ stroke: colors.black, wrap: go.Wrap.Fit })
        .bind("text", "name")
        .bind("width", "", toWidth)
        .bind("height", "", toHeight)
    )
  );

export const monitorTemplate = new go.Node("Auto", {
  resizable: true,
  minSize: new go.Size(100, 40),
})
  .bindTwoWay(
    "location",
    "",
    toLocation, // binding
    fromLocation //make two way
  )
  .bindTwoWay("width")
  .bindTwoWay("height")
  .add(
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
      new go.TextBlock().bind("text", "name"),
      new go.Panel("Horizontal").add(
        new go.Shape("Circle", { width: 8, height: 8 }).bind(
          "fill",
          "",
          (data, node) => {
            return data.properties.connected ? colors.green : colors.red;
          }
        )
      ),
      new go.Panel("Table", {
        stretch: go.Stretch.Fill,
      }).add(
        //row1
        new go.TextBlock("Q", {
          row: 0,
          column: 0,
          margin: 2,
        }),
        new go.TextBlock({
          row: 0,
          column: 1,
          margin: 2,
        }).bind("text", "", (data) => data.properties.flowRate),

        new go.TextBlock("m³/s", {
          row: 0,
          column: 2,
          margin: 2,
        }),
        //row 2
        new go.TextBlock("P", {
          row: 1,
          column: 0,
          margin: 2,
        }),
        new go.TextBlock({
          row: 1,
          column: 1,
          margin: 2,
        }).bind("text", "", (data) => data.properties.pressure),

        new go.TextBlock("atm", {
          row: 1,
          column: 2,
          margin: 2,
        })
      )
    )
  );

export const valveTemplate = new go.Node("Vertical", {
  resizable: true,
  rotatable: true,
  resizeObjectName: "Main",
  rotateObjectName: "Main",
})
  .bindTwoWay(
    "location",
    "",
    toLocation, // binding
    fromLocation //make two way
  )
  .bind("width")
  .bind("height", "", (data) => data.height + 13)
  .add(
    new go.Panel("Spot").add(
      new go.Shape({
        name: "Main",
        geometryString: valve1,
        stroke: colors.gray,
        fill: colors.white,
        cursor: "move",
      })
        .bind("fill", "", (data) =>
          data.properties.isOpen ? colors.white : colors.white
        )
        .bind("geometryString", "geometryString")
        .bindTwoWay("width")
        .bindTwoWay("height"),

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
    ),

    new go.TextBlock().bind("text", "name")
  );
