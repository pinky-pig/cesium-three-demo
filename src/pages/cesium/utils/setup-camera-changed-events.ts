import { updateImageryVisibility } from './setup-earth-display'
import { updateChinaAreaVisibility } from './setup-china-area'
import type * as Cesium from 'cesium'
export function setupCameraChangedEvents(viewer: Cesium.Viewer) {
  viewer.scene.camera.changed.addEventListener(() => {
    updateImageryVisibility(viewer)
    updateChinaAreaVisibility(viewer)
  })
}
