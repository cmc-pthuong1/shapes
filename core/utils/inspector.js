// const numberKeys = ["strokeWidth", "width", "height"];

// const locationKeys = ["locationX", "locationY"];

export function onChangeDataProperty(event, name, type, diagram) {
  const value = event.target.value;

  if (type === "number") {
    onChangeProperty(Number(value), name, diagram);
    return;
  }
  // if (locationKeys.includes(name)) {
  //   onChangeLocation(value, name, diagram);
  //   return;
  // }

  onChangeProperty(value, name, diagram);
}

function onChangeProperty(value, name, diagram) {

  const node = diagram.selection.first();
  if (node instanceof go.Node) {
    diagram.model.startTransaction(`update ${name}`);
    diagram.model.setDataProperty(node.data, name, value);
    diagram.model.commitTransaction(`update ${name}`);
  }
}

// function onChangeLocation(value, name, diagram) {
//   const node = diagram.selection.first();
//   if (node instanceof go.Node) {
//     const locations = node.data.location.split(" ");
//     if (name === "locationX") {
//       locations[0] = value;
//     } else if (name === "locationY") {
//       locations[1] = value;
//     }
//     const newLocation = locations.join(" ");
//     diagram.model.startTransaction("update location");
//     diagram.model.setDataProperty(node.data, "location", newLocation);
//     diagram.model.commitTransaction("update location");
//   }
// }

export function onChangeAlignmentProperty(event, name, diagram) {
  const value = event.target.value;
  let align = go.Spot.Center;
  if (value == "left") {
    align = go.Spot.Left;
  } else if (value == "right") {
    align = go.Spot.Right;
  }
  onChangeProperty(align, name, diagram);
}


export function convertAlignmentToValue(value) {  
  let align = "center";
  if (value == go.Spot.Left) {
    align = "left";
  } else if (value == go.Spot.Right) {
    align = "right";
  }
  return align;
}

export function onModelChange({
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