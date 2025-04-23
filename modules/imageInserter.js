import {
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
    input.onchange = (e) => this.onInsertImage(e);
    this.input = input;
    this.imageInserterContainer.appendChild(input);
  }

  async onInsertImage(e) {
    const file = e.target.files[0];
    const source = await convertImageToBase64(file);
    const imageInfo = await getDimensionImage(source);
    const newNodeData = {
      category: "ImageNode",
      source: source,
      name: "image",
      x: 0,
      y: 0,
      width: imageInfo?.width || 100,
      height: imageInfo?.height || 100,
    };
    //thêm node
    this.diagram.model.addNodeData(newNodeData);
    this.diagram.model.updateTargetBindings(newNodeData);
    //clear input
    this.input.value = "";
    //chọn node
    const newNode = this.diagram.findNodeForData(newNodeData);
    if (newNode) {
      this.diagram.select(newNode);
    }
  }
}
