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
    type: "text",
    label: "Text",
  },
  {
    key: nodeDataKeys.color,
    default: "#38bdf8",
    type: "color",
    label: "Color",
  },
  {
    key: nodeDataKeys.fill,
    default: "#ffffff",
    type: "color",
    label: "Fill",
  },
  {
    key: nodeDataKeys.locationX,
    default: 0,
    type: "number",
    label: "x",
  },
  {
    key: nodeDataKeys.locationY,
    default: 0,
    type: "number",
    label: "y",
  },
  {
    key: nodeDataKeys.strokeWidth,
    default: 2,
    type: "number",
    label: "Stroke Width",
  },
  {
    key: nodeDataKeys.height,
    default: 40,
    type: "number",
    label: "Height",
  },
  {
    key: nodeDataKeys.width,
    default: 40,
    type: "number",
    label: "Width",
  },
  {
    key: nodeDataKeys.textAlign,
    default: "center",
    type: "select",
    options: [
      { value: "left", label: "Left" },
      { value: "right", label: "Right" },
      { value: "center", label: "Center" },
    ],
    label: "Text Align",
  },
];
