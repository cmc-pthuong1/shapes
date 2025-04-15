const nodeTemplate = new go.Node('Auto', { locationSpot: go.Spot.Center })
  .bindTwoWay('location', 'location', go.Point.parse, go.Point.stringify)
  .add(
    new go.Shape('Circle', {
      fill: 'white',
      stroke: 'gray',
      strokeWidth: 2,
      portId: '',
      fromLinkable: true,
      toLinkable: true,
      fromLinkableDuplicates: true,
      toLinkableDuplicates: true,
      fromLinkableSelfNode: true,
      toLinkableSelfNode: true
    })
      .bind('stroke', 'color')
      .bind('figure'),
    new go.TextBlock({
      margin: new go.Margin(5, 5, 3, 5),
      font: '10pt sans-serif',
      minSize: new go.Size(16, 16),
      maxSize: new go.Size(120, NaN),
      textAlign: 'center',
      editable: true
    }).bindTwoWay('text')
  );
