import {
  inspectorImageInputs as defaultInspectorImageInputs,
  nodeDataKeys,
  inspectorInputs as defaultInspectorInputs,
} from "../core/constants/inspector.js";
import {
  convertAlignmentToValue,
  setDataToValue,
} from "../core/utils/inspector.js";

export class Inspector {
  constructor({
    inspectorDivId,
    diagram,
    inspectorInputs = defaultInspectorInputs,
    inspectorImageInputs = defaultInspectorImageInputs,
  }) {
    this.inspectorDivId = inspectorDivId;
    this.diagram = diagram;
    this.inspectorContainer = document.getElementById(inspectorDivId);
    this.inspectorInputs = inspectorInputs;
    this.inspectorImageInputs = inspectorImageInputs;
    this.changedSelection();
    this.onModelChange();
  }
  changedSelection() {
    this.diagram.addDiagramListener("ChangedSelection", () => {
      this.inspectorContainer.innerHTML = "";
      const part = this.diagram.selection.first();
      if (part instanceof go.Node) {
        const data = part.data;
        if (data.category == "ImageNode") {
          this.initUI(data, this.inspectorImageInputs);
        } else {
          this.initUI(data, this.inspectorInputs);
        }
      }
    });
  }
  initUI(data, inspectorInputs) {
    this.inspectorContainer.innerHTML = "";
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
        const select = this.createSelectElement({
          options: options,
          key: key,
          value: data[key],
          defaultValue: defaultValue,
        });
        wrap.appendChild(select);
      } else {
        const input = this.createInputElement({
          defaultValue: defaultValue,
          value: data[key],
          key: key,
          type: type,
        });
        wrap.appendChild(input);
      }
      this.inspectorContainer.appendChild(wrap);
    }
  }
  onModelChange() {
    const bindingTwoWayMap = [
      {
        key: nodeDataKeys.height,
        id: nodeDataKeys.height,
        default: 40,
      },
      {
        key: nodeDataKeys.width,
        id: nodeDataKeys.width,
        default: 40,
      },
      {
        key: "location",
        default: 0,
      },
    ];

    this.diagram.addModelChangedListener((evt) => {
      // ignore unimportant Transaction events
      const txn = evt.object; // a Transaction
      if (!evt.isTransactionFinished || txn === null) return;

      // iterate over all of the actual ChangedEvents of the Transaction
      txn.changes.each((e) => {
        // ignore any kind of change other than adding/removing a node
        const property = bindingTwoWayMap.find(
          (item) => item.key == e.propertyName
        );
        if (!property) return;
        if (property.key == "location") {
          const { x, y } = e.newValue;
          setDataToValue(nodeDataKeys.locationX, x, property.default);
          setDataToValue(nodeDataKeys.locationY, y, property.default);
        } else {
          setDataToValue(property.id, e.newValue, property.default);
        }
      });
    });
  }

  onChangeAlignmentProperty(event, name) {
    const value = event.target.value;
    let align = go.Spot.Center;
    if (value == "left") {
      align = go.Spot.Left;
    } else if (value == "right") {
      align = go.Spot.Right;
    }
    this.onChangeProperty(align, name);
  }

  onChangeDataProperty(event, name, type) {
    const value = event.target.value;

    if (type === "number") {
      this.onChangeProperty(Number(value), name);
      return;
    }
    this.onChangeProperty(value, name);
  }

  onChangeProperty(value, name) {
    const node = this.diagram.selection.first();
    if (node instanceof go.Node) {
      this.diagram.model.startTransaction(`update ${name}`);
      this.diagram.model.setDataProperty(node.data, name, value);
      this.diagram.model.commitTransaction(`update ${name}`);
    }
  }

  createInputElement({
    type = "text",
    key = "",
    value = "",
    defaultValue = "",
  }) {
    const input = document.createElement("input");
    input.type = type;
    input.name = key;
    input.id = key;
    input.value = value || defaultValue;
    input.onchange = (event) => this.onChangeDataProperty(event, key, type);
    return input;
  }

  createSelectElement({
    options,
    key = "",
    value = null,
    defaultValue = null,
  }) {
    const select = document.createElement("select");
    options.forEach((option) => {
      const opt = document.createElement("option");
      opt.value = option.value;
      opt.textContent = option.label;
      select.appendChild(opt);
    });
    select.name = key;
    select.id = key;
    if (key == nodeDataKeys.textAlign) {
      select.value = convertAlignmentToValue(value);
      select.onchange = (event) => this.onChangeAlignmentProperty(event, key);
    } else {
      select.value = value || defaultValue;
      select.onchange = (event) => this.onChangeDataProperty(event, key);
    }
    return select;
  }
}
