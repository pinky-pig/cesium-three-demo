import * as Cesium from 'cesium'

/**
 * 添加 billboard
 * 如果想需要点击 billboard 展开标牌，那么需要创建标牌
 * 1. 直接使用 label
 * 2. 可以通过再创建一个 billboard 作为标牌，内容是 canvas 转为图片
 * 3. 可以通过创建一个 html 标签，通过 viewer.scene.preRender.addEventListener 将空间坐标转为屏幕坐标，然后通过 css 定位
 * @param viewer 
 */
export async function addTileset(viewer: Cesium.Viewer, url: string) {
  let tileset: any = {}
  tileset = await Cesium.Cesium3DTileset.fromUrl(
    // 'http://localhost:8082/model/bdz-3dtiles/tileset.json', // 项目中的
    // 'http://localhost:8082/model/dalou-3dtiles/tileset.json', // 项目中的
    // 'http://localhost:8082/model/dalou-3dtiles2/tileset.json', // 项目中的
    url,
  )
  viewer!.scene.primitives.add(tileset)

  return tileset
}

// eslint-disable-next-line unused-imports/no-unused-vars
export function removeTileset(viewer: Cesium.Viewer) { }
