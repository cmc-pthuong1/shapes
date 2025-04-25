import {
  convertBlobToBase64,
  convertImageToBase64,
  getDimensionImage,
} from "../core/utils/common.js";

export class ImageInserter {
  constructor({ diagram, imageInserterDivId }) {
    this.diagram = diagram;
    this.imageInserterContainer = document.getElementById(imageInserterDivId);
    this.input = null;
  }
  initUI() {
    this.imageInserterContainer.innerHTML = "";
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => this.onChangeInput(e);
    this.input = input;
    this.imageInserterContainer.appendChild(input);
  }

  enableImageDropEvent() {
    this.diagram.div.ondragover = (e) => e.preventDefault();
    this.diagram.div.ondrop = async (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (!files?.length) return;
      for (const file of files) {
        if (!file.type.startsWith("image/")) continue;
        const source = await convertImageToBase64(file);
        const imageInfo = await getDimensionImage(source);
        const position = this.diagram.lastInput.documentPoint || {
          px: 0,
          py: 0,
        };
        this.insertImage({ ...imageInfo, x: position.px, y: position.py });
      }
    };
  }

  async onChangeInput(e) {
    const file = e.target.files[0];
    const source = await convertImageToBase64(file);
    const imageInfo = await getDimensionImage(source);
    this.insertImage(imageInfo);
  }

  insertImage({ source, width, height, x = 0, y = 0 }) {
    console.log(x, y);
    const newNodeData = {
      category: "ImageNode",
      source: source,
      name: "image",
      x,
      y,
      width: width || 100,
      height: height || 100,
    };
    //thêm node
    this.diagram.model.addNodeData(newNodeData);
    // this.diagram.model.updateTargetBindings(newNodeData);
    //clear input
    if (this.input) {
      this.input.value = "";
    }
    //chọn node
    const newNode = this.diagram.findNodeForData(newNodeData);
    if (newNode) {
      this.diagram.select(newNode);
    }
  }

  enableDocumentPasteImage() {
    // const _ = this;
    document.addEventListener("paste", async (event) => {
      const items = (event.clipboardData || window.clipboardData).items;
      if (!items) return;
      console.log("paste");
      for (let item of items) {
        if (item.type.startsWith("image/")) {
          const blob = item.getAsFile();
          const base64 = await convertBlobToBase64(blob);
          const imageInfo = await getDimensionImage(base64);
          this.insertImage(imageInfo);
          break; // Dán một ảnh mỗi lần
        }
      }
    });
  }
}
