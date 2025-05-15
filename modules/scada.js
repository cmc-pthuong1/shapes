import { Diagram } from "./diagram.js";
import { ImageInserter } from "./imageInserter.js";
import { Inspector } from "./inspector.js";
import { SCADADiagram } from "./scadaDiagram.js";

export class SCADASheet {
  constructor({
    diagramContainerId,
    sheetListContainerId,
    nodeTemplate = null,
    nodeTemplateMap,
    linkTemplate,
  }) {
    this.diagramContainerId = diagramContainerId;
    this.sheetListContainer = document.getElementById(sheetListContainerId);
    this.nodeTemplate = nodeTemplate; // Hàm cấu hình nodeTemplate, linkTemplate nếu có
    this.nodeTemplateMap = nodeTemplateMap;
    this.linkTemplate = linkTemplate;
    this.sheetModels = {}; // { [name]: {model, position} }
    this.currentSheet = null;
    this.sheetCount = 0;
    this.diagram = null;
    this.diagramControl = null;
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
    const newDiagram = this.innitDiagram({
      model: this.sheetModels?.[sheetName] || {},
    });

    this.diagram = newDiagram;
    // this.diagram.commandHandler.groupSelection();

    // // Tạo lại inspector
    // this.inspector = new Inspector({
    //   diagram: this.diagram,
    //   inspectorDivId: "inspector",
    // });
    // // tạo insert image
    // const imageInserter = new ImageInserter({
    //   diagram: this.diagram,
    //   imageInserterDivId: "imageInserter",
    // });
    // // bật chức năng insert ảnh
    // imageInserter.initUI();
    // imageInserter.enableDocumentPasteImage();
    // imageInserter.enableImageDropEvent();

    this.highlightActiveSheet(sheetName);
  }

  innitDiagram({ model = null, position = null }) {
    const newDiagramControl = new SCADADiagram({
      diagramDivId: this.diagramContainerId,
      jsonModel: model,
      nodeTemplate: this.nodeTemplate,
      nodeTemplateMap: this.nodeTemplateMap,
      linkTemplate: this.linkTemplate,
    });
    this.diagramControl = newDiagramControl
    const newDiagram = newDiagramControl.diagram;
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
      [this.currentSheet]: {
        model: this.diagram.model.toJson(),
        position: go.Point.stringify(this.diagram.position),
      },
    };
    console.log("🚀 ~ SCADASheet ~ exportAllJson ~ data:", data);
    const dataSubmit = {};

    for (const sheet in data) {
      const dataDiagram = JSON.parse(data[sheet].model);
      const devices = dataDiagram?.nodeDataArray;
      const connections = dataDiagram?.linkDataArray;
      dataSubmit[sheet] = {
        devices,
        connections,
      };
    }

    const jsonData = JSON.stringify(dataSubmit);
    console.log("🚀 ~ SCADASheet ~ exportAllJson ~ jsonData:", jsonData);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  importJson(event) {
    const input = event.target;
    if (input.files.length > 0) {
      const file = input.files[0];

      // Kiểm tra xem file có phải là JSON không
      if (file.type !== "application/json") {
        console.error("Vui lòng chọn file JSON.");
        return;
      }

      const reader = new FileReader();

      // Khi hoàn thành việc đọc file
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result); // Chuyển đổi chuỗi JSON thành object
          console.log("Dữ liệu JSON:", jsonData);

          this.convertDataToSheet(jsonData);
        } catch (error) {
          console.error("Lỗi khi phân tích JSON:", error);
        }
      };

      // Đọc file dưới dạng văn bản
      reader.readAsText(file);
    } else {
      console.log("Không có file nào được chọn.");
    }
  }

  convertDataToSheet(jsonData) {
    const data = {};
    for (const sheet in jsonData) {
      data[sheet] = JSON.stringify({
        class: "GraphLinksModel",
        linkFromPortIdProperty: "fromPort",
        linkToPortIdProperty: "toPort",
        nodeDataArray: jsonData[sheet].devices,
        linkDataArray: jsonData[sheet].connections,
      });
    }
    this.sheetModels = data;

    this.currentSheet = null;

    this.switchSheet(Object.keys(jsonData)[0]);
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

// C:\DATA-PTHUONG1\DKR\shapes\pages\map-template
