import {
  onChangeDataProperty,
  onChangeAlignmentProperty,
  onModelChange,
  convertAlignmentToValue,
} from "../core/utils/inspector.js";

export function initInspector(id, diagram, inspectorInputs, nodeDataKeys) {
  const container = document.getElementById(id);
  diagram.addDiagramListener("ChangedSelection", () => {
    container.innerHTML = "";
    const part = diagram.selection.first();
    if (part instanceof go.Node) {
      const data = part.data;
      console.log("data", data);

      for (let property of inspectorInputs) {
        const wrap = document.createElement("div");
        wrap.style.display = "flex";
        wrap.style.alignItems = "center";
        wrap.style.columnGap = "10px";
        const {
          key,
          default: defaultValue,
          type,
          options,
          label: labelText,
        } = property;
        const label = document.createElement("label");
        label.textContent = labelText;
        wrap.appendChild(label);

        if (type == "select") {
          const select = document.createElement("select");
          options.forEach((option) => {
            const opt = document.createElement("option");
            opt.value = option.value;
            opt.textContent = option.label;
            select.appendChild(opt);
          });
          select.name = key;
          select.id = key;
          select.value = convertAlignmentToValue(data[key]);
          select.onchange = (event) =>
            onChangeAlignmentProperty(event, key, diagram);
          wrap.appendChild(select);
        } else {
          const input = document.createElement("input");
          input.type = type;
          input.name = key;
          input.id = key;
          input.value = data[key] || defaultValue;
          input.onchange = (event) =>
            onChangeDataProperty(event, key, type, diagram);
          wrap.appendChild(input);
        }
        container.appendChild(wrap);
      }
    }
  });
  onModelChange({
    diagram,
    heightId: nodeDataKeys.height,
    widthId: nodeDataKeys.width,
  });
}
