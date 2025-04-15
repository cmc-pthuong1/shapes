function initDiagram(diagramId, nodeTemplate) {
  diagram = new go.Diagram(diagramId, {
    'undoManager.isEnabled': true
  });

  diagram.nodeTemplate = nodeTemplate
}
