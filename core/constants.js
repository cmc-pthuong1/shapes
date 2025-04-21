const locationBinding = new go.Binding("location", "", data => new go.Point(data.x, data.y));
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

export const nodeDataArray = [
  {
    text: "Text",
    color: "#38bdf8",
    stroke: "#38bdf8",
    figure: "Circle",
    fill: "#ffffff",
    strokeWidth: 2,
    width: 40,
    height: 40,
    textAlign: go.Spot.Center,
  },
  {
    text: "Text",
    color: "#a78bfa",
    stroke: "#a78bfa",
    figure: "Square",
    fill: "#ffffff",
    strokeWidth: 2,
    width: 40,
    height: 40,
    textAlign: go.Spot.Center,
  },
  {
    text: "Text",
    color: "#fde047",
    stroke: "#fde047",
    figure: "Ellipse",
    fill: "#ffffff",
    strokeWidth: 2,
    width: 50,
    height: 30,
    textAlign: go.Spot.Center,
  },
  {
    text: "Text",
    color: "#78716c",
    stroke: "#78716c",
    figure: "Rectangle",
    fill: "#ffffff",
    strokeWidth: 2,
    width: 40,
    height: 30,
    textAlign: go.Spot.Center,
  },
  {
    text: "Text",
    color: "#22c55e",
    stroke: "#22c55e",
    figure: "RoundedRectangle",
    fill: "#ffffff",
    strokeWidth: 2,
    width: 40,
    height: 30,
    textAlign: go.Spot.Center,
  },
];

export const nodeDataKeys = {
  text: "text",
  color: "color",
  stroke: "stroke",
  figure: "figure",
  fill: "fill",
  strokeWidth: "strokeWidth",
  width: "width",
  height: "height",
  locationX: "x",
  locationY: "y",
  textAlign: "textAlign",
};

export const inspectorInputs = [
  {
    key: nodeDataKeys.text,
    default: "Text",
    type: 'text',
    label: 'Text',
  },
  {
    key: nodeDataKeys.color,
    default: "#38bdf8",
    type: 'color',
    label: 'Color',
  },
  {
    key: nodeDataKeys.fill,
    default: "#ffffff",
    type: 'color',
    label: 'Fill',
  },
  {
    key: nodeDataKeys.locationX,
    default: 0,
    type: 'number',
    label: 'x',
  },
  {
    key: nodeDataKeys.locationY,
    default: 0,
    type: 'number',
    label: 'y',
  },
  {
    key: nodeDataKeys.strokeWidth,
    default: 2,
    type: 'number',
    label: 'Stroke Width',
  },
  {
    key: nodeDataKeys.height,
    default: 40,
    type: 'number',
    label: 'Height',
  },
  {
    key: nodeDataKeys.width,
    default: 40,
    type: 'number',
    label: 'Width',
  },
  {
    key: nodeDataKeys.textAlign,
    default: 'center',
    type: 'select',
    options: [
      { value: 'left', label: "Left" },
      { value: 'right', label: "Right" },
      { value: 'center', label: "Center" },
    ],
    label: 'Text Align',
  },
]