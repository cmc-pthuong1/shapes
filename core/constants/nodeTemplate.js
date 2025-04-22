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
  locationSpot: go.Spot.Left,
  resizable: true,
  resizeObjectName: "MAIN",
})
  .bind(locationBinding)
  .add(
    new go.Shape("Circle", {
      name: "MAIN",
      stroke: "gray",
      strokeWidth: 2,
      portId: "",
      fromLinkable: true,
      toLinkable: true,
      fromLinkableDuplicates: true,
      toLinkableDuplicates: true,
      fromLinkableSelfNode: true,
      toLinkableSelfNode: true,
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
