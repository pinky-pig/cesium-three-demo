import * as Cesium from 'cesium'

let earthBaseMapImagery: Cesium.ImageryLayer | null
export function setupEarthBaseMap(viewer: Cesium.Viewer) {
  if (earthBaseMapImagery) {
    viewer.imageryLayers.remove(earthBaseMapImagery)
  }

  // 在线
  // const imageryProvider = new Cesium.WebMapTileServiceImageryProvider({
  //   url: 'http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=0a70a4972c96471a42fb421835029e73',
  //   layer: 'tdtVecBasicLayer',
  //   style: 'default',
  //   format: 'image/jpeg',
  //   tileMatrixSetID: 'GoogleMapsCompatible',
  // })

  // const imageryProvider = new Cesium.UrlTemplateImageryProvider({
  //   // url: 'http://wprd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
  //   // 影像
  //   // url: 'https://data.mars3d.cn/tile/img/%7Bz%7D/%7Bx%7D/%7By%7D.jpg',
  //   // 矢量
  //   url: 'http://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&L={z}&Z={z}&Y={y}&X={x}',
  // })

  // http://localhost:8082/nj-map/demo.html // 本地预览地址
  // const west = 118.42896763
  // const south = 31.200068
  // const east = 119.210667
  // const north = 32.68435991
  // const imageryProvider = new Cesium.UrlTemplateImageryProvider({
  //   // rectangle: Cesium.Rectangle.fromDegrees(west, south, east, north),  // 瓦片覆盖的经纬度范围
  //   maximumLevel: 18,
  //   url: 'http://localhost:8082/nj-map/{z}/{x}/{y}.png',
  // })

  // earthBaseMapImagery = viewer.imageryLayers.addImageryProvider(imageryProvider)
  const imageryProvider = new Cesium.MapboxStyleImageryProvider({
    accessToken:
      'pk.eyJ1IjoicGlua3ktcGlnIiwiYSI6ImNsZnJvZ2Q1cDAwZ3ozcG56bXFwbjAzZjAifQ.eEOFvRbKqZHQ3OxeqPBsXw',
    scaleFactor: true,
    styleId: 'cm10ew6ts00k301r778i8eum2',
    url: 'https://api.mapbox.com/styles/v1/',
    username: 'pinky-pig',
  })

  earthBaseMapImagery = viewer.imageryLayers.addImageryProvider(imageryProvider)

  return earthBaseMapImagery
}

export function removeEarthBaseMap(viewer: Cesium.Viewer) {
  if (earthBaseMapImagery) {
    viewer.imageryLayers.remove(earthBaseMapImagery)
  }
}
