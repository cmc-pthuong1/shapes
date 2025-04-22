import { Diagram } from "./diagram.js";
import { Inspector } from "./inspector.js";

export class Sheet {
  constructor({
    diagramContainerId,
    sheetListContainerId,
    nodeTemplate = null,
    inspectorInputs = [],
    nodeDataKeys = [],
  }) {
    this.diagramContainerId = diagramContainerId;
    this.sheetListContainer = document.getElementById(sheetListContainerId);
    this.nodeTemplate = nodeTemplate; // Hàm cấu hình nodeTemplate, linkTemplate nếu có
    this.sheetModels = {};
    this.currentSheet = null;
    this.sheetCount = 0;
    this.diagram = null;
    this.sheetList = null;
    this.inspectorInputs = inspectorInputs;
    this.nodeDataKeys = nodeDataKeys;
    this.inspector = null;
    this.initUI();
    this.addNewSheet(); // Khởi tạo sheet đầu tiên
  }
  initUI() {
    const sheetList = document.createElement("div");
    sheetList.id = "sheetList";
    sheetList.style.display = "flex";
    sheetList.style.overflowX = "auto";
    this.sheetList = sheetList;
    const addBtn = document.createElement("button");
    addBtn.textContent = "+ Thêm Sheet";
    addBtn.onclick = () => this.addNewSheet();
    this.sheetListContainer.appendChild(sheetList);
    this.sheetListContainer.appendChild(addBtn);
  }

  addNewSheet() {
    this.sheetCount++;
    const sheetName = `Sheet ${this.sheetCount}`;
    const btn = document.createElement("button");
    btn.textContent = sheetName;
    btn.id = `btn-${sheetName}`;
    btn.onclick = () => this.switchSheet(sheetName);
    this.sheetList.appendChild(btn);
    this.switchSheet(sheetName);
  }

  switchSheet(sheetName) {
    // Lưu sơ đồ hiện tại
    if (this.diagram && this.currentSheet) {
      this.sheetModels[this.currentSheet] = this.diagram.model.toJson();
    }

    // Hủy liên kết Diagram cũ trước khi tạo mới
    if (this.diagram) {
      this.diagram.div = null; // Bắt buộc để GoJS hủy liên kết với div
      this.diagram.clear(); // Giải phóng tài nguyên
      this.diagram = null;
    }

    // Cập nhật sheet hiện tại
    this.currentSheet = sheetName;

    // Làm sạch div hiển thị
    const diagramDiv = document.getElementById(this.diagramContainerId);
    diagramDiv.innerHTML = ""; // Làm sạch nội dung

    // Tạo Diagram với jsonModel
    const diagramControl = new Diagram({
      diagramDivId: this.diagramContainerId,
      jsonModel: this.sheetModels[sheetName],
      nodeTemplate: this.nodeTemplate,
    });

    this.diagram = diagramControl.diagram;

    // Tạo lại inspector
    this.inspector = new Inspector({
      diagram: this.diagram,
      inspectorDivId: "inspector",
      inspectorInputs: this.inspectorInputs,
      nodeDataKeys: this.nodeDataKeys,
    });

    this.highlightActiveSheet(sheetName);
  }

  highlightActiveSheet(name) {
    this.sheetList.querySelectorAll("button").forEach((btn) => {
      btn.style.backgroundColor = btn.textContent === name ? "#b3d4fc" : "";
    });
  }
  getCurrentDiagram() {
    return this.diagram;
  }
  getCurrentSheetName() {
    return this.currentSheet;
  }
  getAllSheetModels() {
    return this.sheetModels;
  }
}
