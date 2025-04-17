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
  palette.model.nodeDataArray = nodeDataArray;
}


function init1(){
   // palette = new go.Palette(paletteId, {
  //   allowZoom: false,
  //   // nodeTemplate: nodeTemplate,
  //   contentAlignment: go.Spot.Center,
  //   layout: new go.GridLayout({
  //     wrappingColumn: 4,
  //     cellSize: new go.Size(2, 2)
  //   })
  // });

  // // now add the initial contents of the Palette
  // // palette.model.nodeDataArray = nodeDataArray;

  // // Template cho node bình thường
  // palette.nodeTemplateMap.add(
  //   '', // default category
  //   nodeTemplate
  // );

  // // Template cho "link node"
  // palette.nodeTemplateMap.add(
  //   'LinkNode',
  //   new go.Node('Auto').add(
  //     new go.Shape('Arrow', { fill: 'gray', width: 40, height: 15 }),
  //     new go.TextBlock('Link', { margin: 4, stroke: 'white' })
  //   )
  // );
  // // Dữ liệu trong palette
  // palette.model = new go.GraphLinksModel([...nodeDataArray, ...links]);
}

function init2(){
  const myPalette = new go.Palette $(go.Palette, 'myPaletteDiv');
  // Template cho node bình thường
  myPalette.nodeTemplateMap.add(
    '', // default category
    $(
      go.Node,
      'Auto',
      $(
        go.Shape,
        'RoundedRectangle',
        { fill: 'white' },
        new go.Binding('fill', 'color')
      ),
      $(go.TextBlock, { margin: 8 }, new go.Binding('text', 'text'))
    )
  );
  // Template cho "link node"
  myPalette.nodeTemplateMap.add(
    'LinkNode',
    $(
      go.Node,
      'Auto',
      $(go.Shape, 'Arrow', { fill: 'gray', width: 40, height: 15 }),
      $(go.TextBlock, 'Link', { margin: 4, stroke: 'white' })
    )
  );
  // Dữ liệu trong palette
  myPalette.model = new go.GraphLinksModel([
    { key: 1, text: 'A', color: 'lightgreen' },
    { key: 2, text: 'B', color: 'orange' },
    { key: 'linkTemplate', category: 'LinkNode', type: 'link' } // node đại diện cho link
  ]);
}