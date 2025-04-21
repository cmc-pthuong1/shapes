export function initDiagram(diagramId, nodeTemplate) {
  let diagram = new go.Diagram(diagramId, {
    'undoManager.isEnabled': true
  });

  diagram.nodeTemplate = nodeTemplate;
  return diagram
}
