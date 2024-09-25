import * as Cesium from 'cesium'

export function setupScenePreRender(viewer: Cesium.Viewer) {
  // 在 preRender 中批量更新位置
  viewer.scene.preRender.addEventListener(function () {
    updateOverlays(viewer)
  })
}

function updateOverlays(viewer: Cesium.Viewer) {
  const allBillboards = viewer.entities.values.filter(
    (entity) => entity.billboard,
  )

  allBillboards.forEach((entity: any) => {
    // const customAttribute = entity?.customAttribute;
    const popup = entity?.popup
    if (popup?.dom && popup?.show === false) {
      popup.dom.style.zIndex = `-1`
      popup.dom.style.left = `0px`
      popup.dom.style.top = `0px`
    } else if (popup?.dom && popup?.show === true) {
      const position = Cesium.Cartesian3.fromDegrees(
        popup?.position[0],
        popup?.position[1],
      )
      const canvasPosition = viewer.scene.cartesianToCanvasCoordinates(position)
      if (
        Cesium.defined(canvasPosition) &&
        popup.dom?.style?.top &&
        popup.dom?.style?.left
      ) {
        if (popup.dom.style.zIndex === '-1') {
          popup.dom.style.zIndex = `2`
        }
        popup.dom.style.left = `${canvasPosition.x - popup?.offset[0] || 0}px`
        popup.dom.style.top = `${canvasPosition.y - popup?.offset[1] || 0}px`
      }
    }
  })
}

// eslint-disable-next-line unused-imports/no-unused-vars
export function removeScenePreRender(viewer: Cesium.Viewer) { }
