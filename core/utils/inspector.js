export function convertAlignmentToValue(value) {
  let align = "center";
  if (value == go.Spot.Left) {
    align = "left";
  } else if (value == go.Spot.Right) {
    align = "right";
  }
  return align;
}

export function setDataToValue(id, newValue, defaultValue) {
  const input = document.getElementById(id);
  if (!input) return;
  input.value = newValue || defaultValue;
}
