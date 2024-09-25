import axios from 'axios'
import * as Cesium from 'cesium'

/**
 * 添加 billboard
 * 如果想需要点击 billboard 展开标牌，那么需要创建标牌
 * 1. 直接使用 label
 * 2. 可以通过再创建一个 billboard 作为标牌，内容是 canvas 转为图片
 * 3. 可以通过创建一个 html 标签，通过 viewer.scene.preRender.addEventListener 将空间坐标转为屏幕坐标，然后通过 css 定位
 * @param viewer
 */
export function addBillboard(viewer: Cesium.Viewer) {
  const billboardCollection = viewer.scene.primitives.add(
    new Cesium.BillboardCollection(),
  )
  viewer.scene.globe.depthTestAgainstTerrain = false // 禁用深度测试以确保 billboard 不被遮挡

  axios.get('/mock/nj-points.json').then((res: any) => {
    res.data.forEach(
      (item: {
        index: number
        type: string
        name: string
        position: [number, number]
        address: string
        remarks: string
        tbUrl: string
      }) => {
        const cor = item.position
        billboardCollection.add({
          //根据距离缩放
          scaleByDistance: new Cesium.NearFarScalar(2000000, 1, 8000000, 0.5),
          // 位置
          position: Cesium.Cartesian3.fromDegrees(cor[0], cor[1]),
          // 图标地址
          image: item.tbUrl,
          // 可调整缩放比例
          // scale: 0.1,
          show: true,
          // 禁用深度测试以确保 billboard 不被遮挡
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        })
      },
    )
  })

  // 随着地图缩放切换图标
  // function updateBillboardImage() {
  //   const cameraHeight = viewer.camera.positionCartographic.height;
  //   if (earthPoints.length > 0) {
  //     if (cameraHeight < 6302953) {
  //       earthPoints.forEach(entity => {
  //         if (entity.billboard) {
  //           entity.billboard.image = new Cesium.ConstantProperty(
  //             entity.customAttribute?.tbUrl1
  //           );
  //         }
  //       })
  //     } else {
  //       earthPoints.forEach(entity => {
  //         if (entity.billboard) {
  //           entity.billboard.image = new Cesium.ConstantProperty(
  //             entity.customAttribute?.tbUrl2
  //           );
  //         }
  //       })
  //     }

  //   }
  // }

  // viewer.scene.preRender.addEventListener(updateBillboardImage);
}

// eslint-disable-next-line unused-imports/no-unused-vars
export function removeBillboard(viewer: Cesium.Viewer) { }
