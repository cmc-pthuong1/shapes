function initPalette(paletteId, nodeTemplate) {
  palette = new go.Palette(paletteId, {
    allowZoom: false,
    nodeTemplate: nodeTemplate,
    contentAlignment: go.Spot.Center,
    layout: new go.GridLayout({
      wrappingColumn: 4,
      cellSize: new go.Size(2, 2)
    })
    // ModelChanged: (e) => {
    //   // just for demonstration purposes,
    //   if (e.isTransactionFinished) {
    //     // show the model data in the page's TextArea
    //     document.getElementById('mySavedPaletteModel').textContent =
    //       e.model.toJson();
    //   }
    // }
  });

  // now add the initial contents of the Palette
  palette.model.nodeDataArray = [
    { text: 'Text', color: '#38bdf8', figure: 'Circle' },
    { text: 'Text', color: '#a78bfa', figure: 'Square' },
    { text: 'Text', color: '#fde047', figure: 'Ellipse' },
    { text: 'Text', color: '#78716c', figure: 'Rectangle' },
    // { text: 'Text', color: 'green', figure: 'RoundedRectangle' },
    // { text: 'Text', color: 'purple', figure: 'Triangle' }
  ];
}
