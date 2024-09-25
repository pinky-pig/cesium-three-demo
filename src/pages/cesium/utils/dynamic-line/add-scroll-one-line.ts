import * as Cesium from 'cesium'

export function initScrollingOneLine(
  viewer: Cesium.Viewer,
  positions = [
    [116.276651, 39.947576],
    [116.279363, 39.868125],
    [116.491395, 39.846479],
    [116.389446, 39.896838],
    [116.385108, 39.96919],
  ],
) {
  const imgPath = '/images/Textures/DotTransparent.png'
  const coords = positions.flat()

  const source = `czm_material czm_getMaterial(czm_materialInput materialInput)
  {
      czm_material material = czm_getDefaultMaterial(materialInput);
      vec2 st = materialInput.st;
      vec4 colorImage = texture(image, vec2(fract((st.s - speed * czm_frameNumber * 0.001)), st.t));
      material.alpha = colorImage.a * color.a;
      material.diffuse = color.rgb;
      return material;
}`

  const material = new Cesium.Material({
    fabric: {
      source,
      uniforms: {
        color: Cesium.Color.fromCssColorString('#7ffeff'),
        image: imgPath,
        speed: 10,
      },
    },
    translucent() {
      return true
    },
  })

  const appearance = new Cesium.PolylineMaterialAppearance()
  appearance.material = material

  viewer.scene.primitives.add(
    new Cesium.Primitive({
      appearance,
      geometryInstances: new Cesium.GeometryInstance({
        geometry: new Cesium.PolylineGeometry({
          positions: Cesium.Cartesian3.fromDegreesArray(coords),
          width: 5,
        }),
      }),
    }),
  )

  viewer!.scene.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      positions[0][0],
      positions[0][1],
      1300,
    ),
  })
}
