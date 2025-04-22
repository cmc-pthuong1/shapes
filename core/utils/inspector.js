
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
  document.getElementById(id).value = newValue || defaultValue;
}