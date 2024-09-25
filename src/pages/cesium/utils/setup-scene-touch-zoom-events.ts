/* eslint-disable unused-imports/no-unused-vars */
import type * as Cesium from 'cesium'

/**
 * 双指缩放地图
 * @param viewer
 */
export function setupScreenTouchZoomEvent(viewer: Cesium.Viewer) {
  const canvas = viewer.canvas
  canvas.addEventListener('mousewheel', function (e: any) {
    if (e.ctrlKey) {
      if (e.wheelDelta < 0) {
        zoomInByMove(false)
      } else {
        zoomInByMove(true)
      }
    }
  })

  function zoomInByMove(flag: boolean) {
    const position = viewer.camera.positionCartographic
    if (flag) {
      viewer.camera.moveForward(position.height * 0.04)
    } else {
      viewer.camera.moveBackward(position.height * 0.04)
    }
  }
}

export function removeScreenTouchZoomEvent(viewer: Cesium.Viewer) { }
