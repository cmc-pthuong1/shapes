const numberKeys = ["strokeWidth", "width", "height"];

const locationKeys = ["locationX", "locationY"];

function onChangeDataProperty(event, name, diagram) {
  const value = event.target.value;

  if (numberKeys.includes(name)) {
    onChangeProperty(Number(value), name, diagram);
    return;
  }
  if (locationKeys.includes(name)) {
    onChangeLocation(value, name, diagram);
    return;
  }

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

function onChangeLocation(value, name, diagram) {
  const node = diagram.selection.first();
  if (node instanceof go.Node) {
    const locations = node.data.location.split(" ");
    if (name === "locationX") {
      locations[0] = value;
    } else if (name === "locationY") {
      locations[1] = value;
    }
    const newLocation = locations.join(" ");
    diagram.model.startTransaction("update location");
    diagram.model.setDataProperty(node.data, "location", newLocation);
    diagram.model.commitTransaction("update location");
  }
}

function onChangeAlignmentProperty(event, name, diagram) {
  const value = event.target.value;
  let align = go.Spot.Center;
  if (value == "left") {
    align = go.Spot.Left;
  } else if (value == "right") {
    align = go.Spot.Right;
  }
  onChangeProperty(align, name, diagram);
}
