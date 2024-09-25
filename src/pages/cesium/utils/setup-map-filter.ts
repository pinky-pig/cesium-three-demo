import type * as Cesium from 'cesium' //根据自己的实际路径修改
export function setupMapFilter(viewer: Cesium.Viewer, options: any = {}) {
  const baseLayer = viewer.imageryLayers.get(0)

  if (!baseLayer) return

  baseLayer.brightness = options.brightness ?? 0.6
  baseLayer.contrast = options.contrast ?? 1.8
  baseLayer.gamma = options.gamma ?? 0.3
  baseLayer.hue = options.hue ?? 1
  baseLayer.saturation = options.saturation || 0

  const baseFragShader = (viewer.scene.globe as any)._surfaceShaderSet
    .baseFragmentShaderSource.sources

  for (let i = 0; i < baseFragShader.length; i++) {
    const strS = 'color = czm_saturation(color, textureSaturation);\n#endif\n'

    let strT = 'color = czm_saturation(color, textureSaturation);\n#endif\n'

    if (!options.invertColor) {
      strT += `
                color.r = 1.0 - color.r;
                color.g = 1.0 - color.g;
                color.b = 1.0 - color.b;
            `
    }

    strT += `
            color.r = color.r * ${options.filterRGB_R ?? 100}.0/255.0;
            color.g = color.g * ${options.filterRGB_G ?? 138}.0/255.0;
            color.b = color.b * ${options.filterRGB_B ?? 230}.0/255.0;
        `

    baseFragShader[i] = baseFragShader[i].replace(strS, strT)
  }

  viewer.scene.requestRender()
}

export function resetMapFilter(viewer: Cesium.Viewer) {
  const baseLayer = viewer.imageryLayers.get(0)

  if (!baseLayer) return

  // 重置为默认值
  baseLayer.brightness = 1
  baseLayer.contrast = 1
  baseLayer.gamma = 1
  baseLayer.hue = 0
  baseLayer.saturation = 1
    ; (
      viewer.scene.globe as any
    )._surfaceShaderSet.baseFragmentShaderSource.sources = (
      viewer.scene.globe as any
    )._surfaceShaderSet.originalBaseFragmentShaderSource.sources.slice()
  viewer.scene.requestRender()
}
