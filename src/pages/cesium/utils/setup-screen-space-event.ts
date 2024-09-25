import * as Cesium from 'cesium'

export function setupScreenSpaceEvent(viewer: Cesium.Viewer) {
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)

  handler.setInputAction((movement: any) => {
    const earthPosition = viewer.scene.pickPosition(movement.position)
    const cartographic = Cesium.Cartographic.fromCartesian(earthPosition)
    const wgs = [
      (cartographic.longitude * 180) / Math.PI,
      (cartographic.latitude * 180) / Math.PI,
      cartographic.height,
    ]
    console.log('点击坐标', wgs)
    console.log('当前相机参数', getcameraPosInfo(viewer))

    // 1. 海量图标点击
    const pickEd = viewer.scene.pick(movement.position)
    console.log(pickEd)

    const entity = pickEd?.id
    console.log('Entity:', entity)
    if (entity) {
      const customAttribute = entity._customAttribute
      console.log(customAttribute, '自定义参数')

      if (
        entity instanceof Cesium.Entity &&
        (entity as any).popup &&
        (entity as any).popup.show !== undefined
      ) {
        ; (entity as any).popup.show = !(entity as any).popup.show
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}

// 获取相机位置，姿态等
export function getcameraPosInfo(viewer: Cesium.Viewer) {
  // 获取 相机姿态信息
  const head = viewer.scene.camera.heading
  const pitch = viewer.scene.camera.pitch
  const roll = viewer.scene.camera.roll
  const info = { head, pitch, roll }
  // 获取位置 wgs84的地心坐标系，x,y坐标值以弧度来表示
  const position = viewer.scene.camera.positionCartographic //经纬度单位为弧度，高程单位为米.
  //以下方式也可以获取相机位置只是返回的坐标系不一样
  // var position = viewer.scene.camera.position //cartesian3 空间直角坐标系
  // var ellipsoid = scene.globe.ellipsoid;
  // var position =ellipsoid.cartesianToCartographic(viewer.scene.camera.position)//
  // 弧度转经纬度
  const longitude = Cesium.Math.toDegrees(position.longitude).toFixed(6)
  const latitude = Cesium.Math.toDegrees(position.latitude).toFixed(6)
  const height = position.height
  console.log({ h: height, lat: latitude, lng: longitude, mat: info })
  return { h: height, lat: latitude, lng: longitude, mat: info }
}

export function removeScreenSpaceEvent(viewer: Cesium.Viewer) {
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
  handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)
}
