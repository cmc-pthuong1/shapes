function initInspector({
  diagram,
  textId = 'inspectorText',
  colorId = 'inspectorColor',
  inspectorId = 'inspector',
  fillId = 'inspectorFill',
  XId = 'inspectorX',
  YId = 'inspectorY',
  strokeWidthId = 'inspectorStrokeWidth'
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
    } else {
      inspector.style.display = 'none';
    }
  });
  onChangeDataProperty(textId, 'text', diagram);
  onChangeDataProperty(colorId, 'color', diagram);
  onChangeDataProperty(fillId, 'fill', diagram);
  onChangeDataProperty(strokeWidthId, 'strokeWidth', diagram);
  onChangeLocation(XId, YId, diagram);
}

function setDataToValue(id, newValue, defaultValue) {
  document.getElementById(id).value = newValue || defaultValue;
}

function onChangeDataProperty(id, name, diagram) {
  document.getElementById(id).addEventListener('change', function () {
    const node = diagram.selection.first();
    if (node instanceof go.Node) {
      diagram.model.startTransaction(`update ${name}`);
      diagram.model.setDataProperty(node.data, name, this.value);
      diagram.model.commitTransaction(`update ${name}`);
    }
  });
}

function onChangeLocation(XId, YId, diagram) {
  document.getElementById(XId).addEventListener('change', function () {
    const node = diagram.selection.first();
    const location = node.data.location.split(' ');
    const locationX = this.value;
    const locationY = location[1];
    const newLocation = [locationX, locationY].join(' ');
    if (node instanceof go.Node) {
      diagram.model.startTransaction('update location');
      diagram.model.setDataProperty(node.data, 'location', newLocation);
      diagram.model.commitTransaction('update location');
    }
  });
  document.getElementById(YId).addEventListener('change', function () {
    const node = diagram.selection.first();
    const location = node.data.location.split(' ');
    const locationX = location[0];
    const locationY = this.value;
    const newLocation = [locationX, locationY].join(' ');
    if (node instanceof go.Node) {
      diagram.model.startTransaction('update location');
      diagram.model.setDataProperty(node.data, 'location', newLocation);
      diagram.model.commitTransaction('update location');
    }
  });
}
