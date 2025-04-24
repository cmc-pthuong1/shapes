import { Diagram } from "./diagram.js";
import { ImageInserter } from "./imageInserter.js";
import { Inspector } from "./inspector.js";

export class Sheet {
  constructor({
    diagramContainerId,
    sheetListContainerId,
    nodeTemplate = null,
  }) {
    this.diagramContainerId = diagramContainerId;
    this.sheetListContainer = document.getElementById(sheetListContainerId);
    this.nodeTemplate = nodeTemplate; // Hàm cấu hình nodeTemplate, linkTemplate nếu có
    this.sheetModels = {};
    this.currentSheet = null;
    this.sheetCount = 0;
    this.diagram = null;
    this.sheetList = null;
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
      this.sheetModels[this.currentSheet] = {
        model: this.diagram.model.toJson(),
        position: go.Point.stringify(this.diagram.position),
      };
    }

    // Hủy liên kết Diagram cũ trước khi tạo mới
    if (this.diagram) {
      this.diagram.div = null; // Bắt buộc để GoJS hủy liên kết với div
      this.diagram.clear(); // Giải phóng tài nguyên
      this.diagram = null;
    }

    // Cập nhật sheet hiện tại
    this.currentSheet = sheetName;

    // Tạo Diagram mới
    const newDiagram = this.innitDiagram(this.sheetModels?.[sheetName] || {});

    this.diagram = newDiagram;
    // this.diagram.commandHandler.groupSelection();

    // Tạo lại inspector
    this.inspector = new Inspector({
      diagram: this.diagram,
      inspectorDivId: "inspector",
    });
    // tạo insert image
    const imageInserter = new ImageInserter({
      diagram: this.diagram,
      imageInserterDivId: "imageInserter",
    });
    // bật chức năng insert ảnh
    imageInserter.initUI();
    imageInserter.enableDocumentPasteImage();
    imageInserter.enableImageDropEvent();

    this.highlightActiveSheet(sheetName);
  }

  innitDiagram({ model = null, position = null }) {
    const newDiagramControl = new Diagram({
      diagramDivId: this.diagramContainerId,
      jsonModel: model,
      nodeTemplate: this.nodeTemplate,
    });
    const newDiagram = newDiagramControl.diagram
    if (position) {
      newDiagram.addDiagramListener("InitialLayoutCompleted", () => {
        newDiagram.position = go.Point.parse(position);
      });
    }
    return newDiagram;
  }

  highlightActiveSheet(name) {
    this.sheetList.querySelectorAll("button").forEach((btn) => {
      btn.style.backgroundColor = btn.textContent === name ? "#b3d4fc" : "";
    });
  }

  exportAllJson() {
    const data = {
      ...this.sheetModels,
      [this.currentSheet]: this.diagram.model.toJson(),
    };
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
