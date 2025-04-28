import { fontDefault } from "../constants/common.js";

export function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };

    reader.readAsDataURL(file);
  });
}

export function convertBlobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(new Error("Error reading blob"));
    };
    reader.readAsDataURL(blob);
  });
}

export function getDimensionImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.src = src;

    img.onload = function () {
      resolve({
        width: img.width,
        height: img.height,
        source: img.src,
      });
    };

    img.onerror = () => reject(new Error("Error loading image"));
  });
}

export function toLocation(data, node) {
  return new go.Point(data.x, data.y);
}

export function fromLocation(point, data, model) {
  data.x = point.x;
  data.y = point.y;
  return data;
}

export function toFont(data, node) {
  const {
    fontStyle = "normal",
    fontWeight = "normal",
    fontSize = 10,
    fontFamily = "sans-serif",
  } = data;
  return [fontStyle, fontWeight, `${fontSize}pt`, fontFamily].join(" ");
}

export function toWidth(data, node) {
  return Math.max(data.width - 60, 20);
}

export function toHeight(data, node) {
  return Math.max(data.height - 60, 20);
}
