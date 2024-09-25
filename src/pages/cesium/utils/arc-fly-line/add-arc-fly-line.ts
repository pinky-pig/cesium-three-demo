import * as Cesium from 'cesium'
import { FlowingLineMaterialGLSL } from './fly-meterial-glsl'
import { setPathData } from './setPathData'

export function addArcFlyLine(
  viewer: Cesium.Viewer,
  positions: Cesium.Cartesian3[] = setPathData(
    [113.17, 23.8],
    [114, 22.5],
    100000,
  ),
) {
  // 1.添加流动的线
  const FlowingLineMaterial = new Cesium.Material({
    fabric: {
      source: FlowingLineMaterialGLSL,
      type: 'FlowingLineMaterial',
      uniforms: {
        color: new Cesium.Color(0, 1, 1, 1), // 荧光色
        coresize: 0.05, // 0.0 < 核心大小 < 1.0
        headsize: 0.05, // 0.0 < 头部大小 < 1.0
        speed: 1.5, // 速度 > 0.0
        tailsize: 0.9, // 0.0 < 尾部大小 < 1.0
        widthoffset: 0.1, // 0.0 < 宽度偏移 < 1.0
      },
    },
  })
  const primitive = new Cesium.Primitive({
    appearance: new Cesium.PolylineMaterialAppearance({
      material: FlowingLineMaterial,
    }),
    geometryInstances: new Cesium.GeometryInstance({
      geometry: new Cesium.PolylineGeometry({
        positions,
        vertexFormat: Cesium.VertexFormat.ALL,
        width: 20,
      }),
    }),
  })
  viewer.scene.primitives.add(primitive)

  // 2.添加弧线
  const fixedColor = Cesium.Color.fromCssColorString('rgba(0, 255, 0, 0.5)') // 绿色，半透明
  const colors = []
  const length = positions.length
  for (let i = 0; i < length; ++i) {
    colors.push(fixedColor)
  }
  viewer.scene.primitives.add(
    new Cesium.Primitive({
      appearance: new Cesium.PolylineColorAppearance(),
      geometryInstances: new Cesium.GeometryInstance({
        geometry: new Cesium.PolylineGeometry({
          colors,
          colorsPerVertex: true,
          positions,
          vertexFormat: Cesium.PolylineColorAppearance.VERTEX_FORMAT,
          width: 2,
        }),
      }),
    }),
  )
}
