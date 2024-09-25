import * as Cesium from 'cesium'

export function initGradientWall(
  viewer: Cesium.Viewer,
  positions: [number, number][],
) {
  const imgPath = '/images/Textures/wall.png'
  // viewer!.scene.camera.flyTo({
  //   destination: Cesium.Cartesian3.fromDegrees(116.398322, 39.929032, 1000),
  // })

  const coord = positions.flat()
  const dataSource = map_common_addDataSource('wall')

  dataSource.entities.add({
    wall: {
      material: new Cesium.ImageMaterialProperty({
        image: imgPath,
        repeat: new Cesium.Cartesian2(1, 1),
        transparent: true, //设置透明
      }),
      maximumHeights: Array.from({ length: positions.length }).fill(1000),
      minimunHeights: Array.from({ length: positions.length }).fill(0),
      positions: Cesium.Cartesian3.fromDegreesArray(coord),
    },
  })

  function map_common_addDataSource(dataSourceName: string | undefined) {
    let dataSource = (viewer.dataSources as any)._dataSources.find(
      (t: { name: string | undefined }) => {
        return t && t.name === dataSourceName
      },
    )
    if (!dataSource) {
      dataSource = new Cesium.CustomDataSource(dataSourceName)
      viewer.dataSources.add(dataSource)
    }
    return dataSource
  }

  return dataSource
}
