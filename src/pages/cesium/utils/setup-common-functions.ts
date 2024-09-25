import * as Cesium from 'cesium'

/**
 * 1. 设置场景背景透明
 * @param viewer cesium viewer
 */
export function setupSceneTransparent(viewer: Cesium.Viewer) {
  viewer.scene.backgroundColor = new Cesium.Color(0, 0, 0, 0)
}

/**
 * 颜色归一化
 * @param r
 * @param g
 * @param b
 * @returns
 * const rgbColor = { r: 116, g: 39, b: 23 };
 * const normalizedColor = rgbToNormalized(rgbColor.r, rgbColor.g, rgbColor.b);
 * console.log(normalizedColor); // { r: 0.455, g: 0.153, b: 0.090 }
 */
// function rgbToNormalized(r, g, b) {
//   return {
//     r: r / 255,
//     g: g / 255,
//     b: b / 255
//   };
// }
// const rgbColor = { r: 124, g: 46, b: 46 }
// const normalizedColor = rgbToNormalized(rgbColor.r, rgbColor.g, rgbColor.b);
// console.log(normalizedColor);
export function rgbToNormalized(r: number, g: number, b: number) {
  return {
    b: b / 255,
    g: g / 255,
    r: r / 255,
  }
}
