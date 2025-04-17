const nodeTemplate = new go.Node('Auto', { locationSpot: go.Spot.Left })
  .bind('location', 'location', go.Point.parse, go.Point.stringify)
  .add(
    new go.Shape('Circle', {
      // fill: 'white',
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
      .bind('strokeWidth')
      .bind('stroke')
      .bind('fill')
      .bind('figure')
      .bind('width')
      .bind('height'),
    new go.TextBlock({
      font: '10pt sans-serif',
      textAlign: 'center'
      //   editable: true
    })
      .bind('text')
      .bind('stroke', 'color')
  );

const nodeDataArray = [
  {
    text: 'Text',
    color: '#38bdf8',
    stroke: '#38bdf8',
    figure: 'Circle',
    fill: '#ffffff',
    strokeWidth: 2,
    width: 40,
    height: 40
  },
  {
    text: 'Text',
    color: '#a78bfa',
    stroke: '#a78bfa',
    figure: 'Square',
    fill: '#ffffff',
    strokeWidth: 2,
    width: 40,
    height: 40
  },
  {
    text: 'Text',
    color: '#fde047',
    stroke: '#fde047',
    figure: 'Ellipse',
    fill: '#ffffff',
    strokeWidth: 2,
    width: 50,
    height: 30
  },
  {
    text: 'Text',
    color: '#78716c',
    stroke: '#78716c',
    figure: 'Rectangle',
    fill: '#ffffff',
    strokeWidth: 2,
    width: 40,
    height: 30
  },
  {
    text: 'Text',
    color: '#22c55e',
    stroke: '#22c55e',
    figure: 'RoundedRectangle',
    fill: '#ffffff',
    strokeWidth: 2,
    width: 40,
    height: 30
  }
  // { text: 'Text', color: 'purple', figure: 'Triangle' }
];
