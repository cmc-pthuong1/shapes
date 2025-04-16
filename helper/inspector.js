function initInspector({
  diagram,
  textId = 'inspectorText',
  colorId = 'inspectorColor',
  inspectorId = 'inspector'
}) {
  diagram.addDiagramListener('ChangedSelection', function () {
    const selected = diagram.selection.first();
    const inspector = document.getElementById(inspectorId);
    console.log(selected.data);
    if (selected instanceof go.Node) {
      inspector.style.display = 'block';
      document.getElementById(textId).value = selected.data.text || '';
      document.getElementById(colorId).value = selected.data.color || '#ffffff';
    } else {
      inspector.style.display = 'none';
    }
  });
  document.getElementById(textId).addEventListener('input', function () {
    const node = diagram.selection.first();
    if (node instanceof go.Node) {
      diagram.model.startTransaction('update text');
      diagram.model.setDataProperty(node.data, 'text', this.value);
      diagram.model.commitTransaction('update text');
    }
  });
  document.getElementById(colorId).addEventListener('input', function () {
    const node = diagram.selection.first();
    if (node instanceof go.Node) {
      diagram.model.startTransaction('update color');
      diagram.model.setDataProperty(node.data, 'color', this.value);
      diagram.model.commitTransaction('update color');
    }
  });
}
