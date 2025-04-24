const locationBinding = new go.Binding(
  "location",
  "",
  (data) => new go.Point(data.x, data.y)
);
locationBinding.makeTwoWay((point, data) => {
  data.x = point.x;
  data.y = point.y;
  return data;
});
export const nodeTemplate = new go.Node("Auto", {
  locationSpot: go.Spot.Center,
  resizable: true,
  resizeObjectName: "MAIN",
  selectionAdorned: false,
})
  .bindTwoWay(locationBinding)
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
    new go.TextBlock({
      font: "10pt sans-serif",
      // alignment: go.Spot.Left
    })
      .bind("text")
      .bind("stroke", "color")
      .bind("alignment", "textAlign")
  );

const locationImageBinding = new go.Binding(
  "location",
  "",
  (data) => new go.Point(data.x, data.y)
);
locationImageBinding.makeTwoWay((point, data) => {
  data.x = point.x;
  data.y = point.y;
  return data;
});
export const ImageTemplate = new go.Node("Auto", {
  locationSpot: go.Spot.Center,
  resizable: true,
  resizeObjectName: "P",
  rotatable: true,
  selectionAdorned: false, // không hiện khung xanh bao quanh node khi chọn node
  rotateObjectName: "P",
})
  .bindTwoWay(locationImageBinding)
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
      .bindTwoWay("height")
  );

export const linkTemplate = new go.Link({
  relinkableFrom: true,
  relinkableTo: true,
}).add(new go.Shape(), new go.Shape({ toArrow: "Standard" }));
