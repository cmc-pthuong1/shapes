const nodeDataKeys = {
  text: 'text',
  color: 'color',
  stroke: 'stroke',
  figure: 'figure',
  fill: 'fill',
  strokeWidth: 'strokeWidth',
  width: 'width',
  height: 'height',
  locationX: 'locationX',
  locationY: 'locationY'
}

const numberKeys = [
  'strokeWidth',
  'width',
  'height'
]

const locationKeys = [
  'locationX',
  'locationY']

function initInspector({
  diagram,
  textId = 'inspectorText',
  colorId = 'inspectorColor',
  inspectorId = 'inspector',
  fillId = 'inspectorFill',
  XId = 'inspectorX',
  YId = 'inspectorY',
  strokeWidthId = 'inspectorStrokeWidth',
  heightId = 'inspectorHeight',
  widthId = 'inspectorWidth'
}) {
  diagram.addDiagramListener('ChangedSelection', function () {
    const selected = diagram.selection.first();
    const inspector = document.getElementById(inspectorId);
    if (selected instanceof go.Node) {
      console.log(selected.data);
      inspector.style.display = 'block';
      const location = selected.data.location.split(' ');
      const locationX = location[0];
      const locationY = location[1];
      setDataToValue(textId, selected.data.text, '');
      setDataToValue(colorId, selected.data.color, '#ffffff');
      setDataToValue(fillId, selected.data.fill, '#ffffff');
      setDataToValue(XId, locationX, '0');
      setDataToValue(YId, locationY, '0');
      setDataToValue(strokeWidthId, selected.data.strokeWidth, 2);
      setDataToValue(heightId, selected.data.height, 40);
      setDataToValue(widthId, selected.data.width, 40);
    } else {
      inspector.style.display = 'none';
    }
  });
}

function setDataToValue(id, newValue, defaultValue) {
  document.getElementById(id).value = newValue || defaultValue;
}

function onChangeDataProperty(
  event, name, diagram
) {
  const value = event.target.value

  if (numberKeys.includes(name)) {
    onChangeProperty(Number(value), name, diagram)
    return
  }
  if (locationKeys.includes(name)) {
    onChangeLocation(value, name, diagram)
    return
  }

  onChangeProperty(value, name, diagram)

}

function onChangeProperty(
  value, name, diagram
) {

  const node = diagram.selection.first();
  if (node instanceof go.Node) {
    diagram.model.startTransaction(`update ${name}`);
    diagram.model.setDataProperty(node.data, name, value);
    diagram.model.commitTransaction(`update ${name}`);
  }
}

function onChangeLocation(value, name, diagram) {
  const node = diagram.selection.first();
  if (node instanceof go.Node) {
    const locations = node.data.location.split(' ');
    if (name === 'locationX') {
      locations[0] = value;
    } else if (name === 'locationY') {
      locations[1] = value;
    }
    const newLocation = locations.join(' ');
    diagram.model.startTransaction('update location');
    diagram.model.setDataProperty(node.data, 'location', newLocation);
    diagram.model.commitTransaction('update location');
  }

}
