import type * as Cesium from 'cesium'

// eslint-disable-next-line unused-imports/no-unused-vars
export function setupEarthGlowBackground(viewer: Cesium.Viewer) {
  // 在 Cesium 中，如果你想为矩形（或任何其他几何体）应用 GLSL 着色器效果，
  // 你需要使用 Primitive 而不是 Entity，
  // 因为 Entity 的 material 属性只支持基本的颜色、图片和内置的材质类型。
  // 通过 Primitive 你可以使用 Appearance 自定义 GLSL 着色器。
  // const rectangleEntity = viewer.entities.add({
  //   rectangle: {
  //     coordinates: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90),
  //     height: 2000000,
  //     // 确保材料加载图像，透明度设置为 true
  //     material: Cesium.Color.BLUE.withAlpha(0.5), // 设置蓝色，并且透明度为 0.5,
  //   },
  // })
  // return rectangleEntity
  // 设置矩形边界
  // const rectangle = Cesium.Rectangle.fromDegrees(-180, -90, 180, 90);
  // // 创建矩形的 GeometryInstance
  // const rectangleInstance = new Cesium.GeometryInstance({
  //   geometry: new Cesium.RectangleGeometry({
  //     rectangle: rectangle,
  //     extrudedHeight: 2000000,
  //     vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
  //   })
  // });
  // // 创建自定义着色器
  // const vertexShaderSource = `
  //   in vec3 position3DHigh;
  //   in vec3 position3DLow;
  //   in vec3 normal;
  //   in vec2 st;
  //   in float batchId;
  //   out vec2 v_st; // 传递到片段着色器的纹理坐标
  //   void main() {
  //     vec4 position = czm_modelViewProjectionRelativeToEye * czm_computePosition();
  //     v_st = st; // 传递给片段着色器
  //     gl_Position = position;
  //   }
  // `;
  // const fragmentShaderSource = `
  //   in vec2 v_st; // 从顶点着色器传递的纹理坐标
  //   out vec4 fragColor; // 片段着色器的输出颜色
  //   void main() {
  //     fragColor = vec4(0.0, 0.0, 1.0, 0.1); // 设置蓝色和透明度为 0.3
  //   }
  // `;
  // // 添加 Primitive
  // viewer.scene.primitives.add(new Cesium.Primitive({
  //   geometryInstances: rectangleInstance,
  //   appearance: new Cesium.Appearance({
  //     renderState: {
  //       depthTest: { enabled: true },
  //       blending: Cesium.BlendingState.ALPHA_BLEND // 启用透明度混合
  //     },
  //     vertexShaderSource: vertexShaderSource,
  //     fragmentShaderSource: fragmentShaderSource,
  //     translucent: false, // 确保启用透明度
  //   })
  // }));
}

export function removeEarthGlowBackground(viewer: Cesium.Viewer) { }
