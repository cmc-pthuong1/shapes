import {
  fromLocation,
  toFont,
  toHeight,
  toLocation,
  toWidth,
} from "../utils/common.js";

export const nodeTemplate = new go.Node("Auto", {
  locationSpot: go.Spot.Center,
  resizable: true,
  resizeObjectName: "MAIN",
  selectionAdorned: false,
})
  .bindTwoWay(
    "location",
    "",
    toLocation, // binding
    fromLocation //make two way
  )
  .add(
    new go.Shape("Circle", {
      name: "MAIN",
      stroke: "gray",
      strokeWidth: 2,
      portId: "",
      fromLinkable: true,
      toLinkable: true,
      // fromLinkableDuplicates: true,
      // toLinkableDuplicates: true,
      // fromLinkableSelfNode: true,
      // toLinkableSelfNode: true,
    })
      .bind("strokeWidth")
      .bind("stroke")
      .bind("fill")
      .bind("figure")
      .bindTwoWay("width")
      .bindTwoWay("height"),
    new go.Shape("Circle", {
      fill: "transparent",
      stroke: "transparent",
      alignmentFocus: go.Spot.Center,
      name: "SUB",
      cursor: "move",
    })
      .bind("figure")
      .bind("width", "", toWidth)
      .bind("height", "", toHeight),
    new go.TextBlock({
      editable: true,
      // font: fontDefault, //font-style font-variant font-weight font-size font-family
      // alignment: go.Spot.Left
    })
      .bind("text")
      .bind("stroke", "color")
      .bind("alignment", "textAlign")
      .bind("font", "", toFont)
  );

export const ImageTemplate = new go.Node("Auto", {
  locationSpot: go.Spot.Center,
  resizable: true,
  resizeObjectName: "P",
  rotatable: true,
  selectionAdorned: false, // không hiện khung xanh bao quanh node khi chọn node
  rotateObjectName: "P",
})
  .bindTwoWay(
    "location",
    "",
    toLocation, // binding
    fromLocation //make two way
  )
  .add(
    new go.Picture({
      name: "P",
      // maxSize: new go.Size(200, 200),
      stretch: go.GraphObject.Uniform,
      background: "transparent",
      portId: "",
      fromLinkable: true,
      toLinkable: true,
    })
      .bind("source")
      .bindTwoWay("width")
      .bindTwoWay("height"),

    new go.Shape("Rectangle", {
      fill: "transparent",
      stroke: "transparent",
      alignmentFocus: go.Spot.Center,
      name: "SUB",
      cursor: "move",
    })
      .bind("figure")
      .bind("width", "", toWidth)
      .bind("height", "", toHeight)
  );

export const linkTemplate = new go.Link({
  relinkableFrom: true,
  relinkableTo: true,
}).add(new go.Shape(), new go.Shape({ toArrow: "Standard" }));
