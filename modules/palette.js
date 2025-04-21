export function initPalette(paletteId, nodeTemplate, nodeDataArray) {
  let palette = new go.Palette(paletteId, {
    allowZoom: false,
    nodeTemplate: nodeTemplate,
    contentAlignment: go.Spot.Center,
    layout: new go.GridLayout({
      wrappingColumn: 4,
      cellSize: new go.Size(2, 2)
    })

  });

  palette.model.nodeDataArray = nodeDataArray;
  return palette
}
