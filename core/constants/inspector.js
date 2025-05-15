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
  fontStyle: "fontStyle",
  fontWeight: "fontWeight",
  fontSize: "fontSize",
  fontFamily: "fontFamily",
};

export const inspectorInputs = [
  {
    key: nodeDataKeys.text,
    default: "Text",
    type: "text",
    label: "Text",
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
  {
    key: nodeDataKeys.fontStyle,
    default: "normal",
    type: "select",
    options: [
      { value: "normal", label: "normal" },
      { value: "italic", label: "italic" },
    ],
    label: "Font style",
  },
  {
    key: nodeDataKeys.fontWeight,
    default: "normal",
    type: "select",
    options: [
      { value: "normal", label: "normal" },
      { value: "bold", label: "bold" },
      { value: "100", label: "100" },
      { value: "200", label: "200" },
      { value: "300", label: "300" },
      { value: "400", label: "400" },
      { value: "500", label: "500" },
      { value: "600", label: "600" },
      { value: "700", label: "700" },
      { value: "800", label: "800" },
      { value: "900", label: "900" },
    ],
    label: "Font Weight",
  },
  {
    key: nodeDataKeys.fontSize,
    default: 10,
    type: "number",
    label: "Font size",
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
];

export const inspectorImageInputs = [
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
];

export const scadaInspectorInputs = [
  {
    key: "name",
    default: "Name",
    type: "text",
    label: "Name",
  },
  {
    key: "x",
    default: 0,
    type: "number",
    label: "x",
  },
  {
    key: "y",
    default: 0,
    type: "number",
    label: "y",
  },
  {
    key: nodeDataKeys.height,
    default: 100,
    type: "number",
    label: "Height",
  },
  {
    key: nodeDataKeys.width,
    default: 100,
    type: "number",
    label: "Width",
  },
];
