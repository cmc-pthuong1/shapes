import {
  convertAlignmentToValue,
  setDataToValue,
} from "../core/utils/inspector.js";

export class Inspector {
  constructor({
    inspectorDivId,
    diagram,
    inspectorInputs = [],
    nodeDataKeys = [],
  }) {
    this.inspectorDivId = inspectorDivId;
    this.diagram = diagram;
    this.inspectorInputs = inspectorInputs;
    this.nodeDataKeys = nodeDataKeys;
    this.inspectorContainer = document.getElementById(inspectorDivId);
    this.changedSelection();
    this.onModelChange();
  }
  changedSelection() {
    this.diagram.addDiagramListener("ChangedSelection", () => {
      this.inspectorContainer.innerHTML = "";
      const part = this.diagram.selection.first();
      if (part instanceof go.Node) {
        const data = part.data;
        console.log("data", data);

        this.initUI(data);
      }
    });
  }
  initUI(data) {
    for (let property of this.inspectorInputs) {
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
        select.onchange = (event) => this.onChangeAlignmentProperty(event, key);
        wrap.appendChild(select);
      } else {
        const input = document.createElement("input");
        input.type = type;
        input.name = key;
        input.id = key;
        input.value = data[key] || defaultValue;
        input.onchange = (event) => this.onChangeDataProperty(event, key, type);
        wrap.appendChild(input);
      }
      this.inspectorContainer.appendChild(wrap);
    }
  }
  onModelChange() {
    const bindingTwoWayMap = [
      {
        key: this.nodeDataKeys?.height,
        id: this.nodeDataKeys?.height,
        default: 40,
      },
      {
        key: this.nodeDataKeys?.width,
        id: this.nodeDataKeys?.width,
        default: 40,
      },
    ];

    this.diagram.addModelChangedListener((evt) => {
      // ignore unimportant Transaction events
      if (!evt.isTransactionFinished) return;
      const txn = evt.object; // a Transaction

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
}
