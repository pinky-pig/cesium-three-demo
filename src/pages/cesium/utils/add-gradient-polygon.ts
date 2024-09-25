/* eslint-disable unused-imports/no-unused-vars */
import * as Cesium from 'cesium'

const PolyGradientMaterial = `uniform vec4 color;
uniform float diffusePower;
uniform float alphaPower;
uniform float globalAlpha;
uniform vec2 center;
czm_material czm_getMaterial(czm_materialInput materialInput) {
  czm_material material = czm_getDefaultMaterial(materialInput);
  float time = czm_frameNumber/600.;
  float per = fract(time);
  vec2 st = materialInput.st;
  float alpha = distance(st, center);
  material.alpha = color.a * alpha * alphaPower * globalAlpha;
  material.diffuse = color.rgb * diffusePower;
  return material;
}`

const arrColor = [
  '#ff00ff',
  'rgb(18,76,154)',
  'rgb(15,176,255)',
  '#40C4E4',
  '#42B2BE',
  'rgb(51,176,204)',
  '#8CB7E5',
  'rgb(0,244,188)',
  '#139FF0',
]

const getColor = (index: number) => {
  return arrColor[++index % arrColor.length]
}

export function initGradientPolygon(viewer: Cesium.Viewer) {
  const areaPath = '/json/建邺区.json'

  Cesium.GeoJsonDataSource.load(areaPath).then((dataSource) => {
    const entities = dataSource.entities.values
    viewer.zoomTo(dataSource)

    // 遍历所有实体
    entities.forEach((entity, index) => {
      if (entity.polygon && entity.polygon.hierarchy) {
        const positions = (entity.polygon.hierarchy as any)._value.positions
        addPolygon(positions, getColor(index), entity.name)
      }
    })
  })

  function addPolygon(
    positions: Cesium.Cartesian3[] | undefined,
    color: string,
    name: string | undefined,
  ) {
    const polygonOptions = {
      extrudedHeight: 10,
      polygonHierarchy: new Cesium.PolygonHierarchy(positions),
    }

    const geometry = new Cesium.PolygonGeometry(polygonOptions)

    const geometryInstance = new Cesium.GeometryInstance({
      geometry,
      id: 'chinaocean',
    })

    const material = new Cesium.Material({
      fabric: {
        source: PolyGradientMaterial,
        uniforms: {
          alphaPower: 1.2,
          center: new Cesium.Cartesian2(0.5, 0.5),
          color: Cesium.Color.fromCssColorString(color),
          diffusePower: 1.8,
          globalAlpha: 0x1,
        },
      },
      translucent: true,
    })

    const primitive = new Cesium.Primitive({
      appearance: new Cesium.EllipsoidSurfaceAppearance({
        material,
      }),
      asynchronous: false,
      geometryInstances: [geometryInstance],
      releaseGeometryInstances: false,
    })

    viewer.scene.primitives.add(primitive)
  }

  return
}

export function removeGradientPolygon(viewer: Cesium.Viewer) { }
