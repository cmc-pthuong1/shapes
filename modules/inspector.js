
export function initInspector({
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
  onModelChange({
    diagram,
    heightId,
    widthId
  });
}

function onModelChange({
  diagram,
  heightId = 'inspectorHeight',
  widthId = 'inspectorWidth'
}) {
  const bindingTwoWayMap = [
    {
      key: 'height',
      id: heightId,
      default: 40
    },
    {
      key: 'width',
      id: widthId,
      default: 40
    }
  ];

  diagram.addModelChangedListener((evt) => {
    // ignore unimportant Transaction events
    if (!evt.isTransactionFinished) return;
    const txn = evt.object; // a Transaction
    console.log('🚀 ~ txn:', txn);

    if (txn === null) return;

    // iterate over all of the actual ChangedEvents of the Transaction
    txn.changes.each((e) => {
      // ignore any kind of change other than adding/removing a node
      const property = bindingTwoWayMap.find(
        (item) => item.key == e.propertyName
      );
      if (property) {
        setDataToValue(property.id, e.newValue, property.default);
      }
    });
  });
}

function setDataToValue(id, newValue, defaultValue) {
  document.getElementById(id).value = newValue || defaultValue;
}

