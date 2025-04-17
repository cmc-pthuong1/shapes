function initDiagram(diagramId, nodeTemplate) {
  diagram = new go.Diagram(diagramId, {
    'undoManager.isEnabled': true
  });

  diagram.nodeTemplate = nodeTemplate;
  diagram.linkTemplate = new go.Link().add(
    new go.Shape(),
    new go.Shape({ toArrow: 'Standard' })
  );
  return diagram;
}
