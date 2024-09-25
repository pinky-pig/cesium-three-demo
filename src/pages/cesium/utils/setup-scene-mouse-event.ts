import * as Cesium from 'cesium'

export function setupSceneMouseEvent(viewer: Cesium.Viewer) {
  // 右键拖拽设置倾斜视图
  viewer.scene.screenSpaceCameraController.tiltEventTypes = [
    Cesium.CameraEventType.RIGHT_DRAG,
    Cesium.CameraEventType.PINCH,
    {
      eventType: Cesium.CameraEventType.RIGHT_DRAG,
      modifier: Cesium.KeyboardEventModifier.CTRL,
    },

    {
      eventType: Cesium.CameraEventType.MIDDLE_DRAG,
      modifier: Cesium.KeyboardEventModifier.CTRL,
    },
  ]

  // 将原来鼠标右键放大缩放修改为鼠标滚轮滚动
  viewer.scene.screenSpaceCameraController.zoomEventTypes = [
    Cesium.CameraEventType.WHEEL,
  ]
}
