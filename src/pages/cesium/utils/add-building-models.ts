import * as Cesium from 'cesium'

export async function addBuildingModels(viewer: Cesium.Viewer) {
  let tileset: any = {}
  tileset = await Cesium.Cesium3DTileset.fromUrl(
    // '//data.mars3d.cn/3dtiles/jzw-hefei/tileset.json', // 火星3D
    // 'http://49.74.127.22:8081/njBuilding/tileset.json', // 南京消防
    // '/models/njBuilding/tileset.json', // 项目中的
    'http://localhost:8082/njBuilding/tileset.json', // 项目中的
  )

  // 可选：设置统一的颜色来确保不受光照影响
  // tileset.style = new Cesium.Cesium3DTileStyle({
  //   color: "color('#75dfec')",
  // })

  tileset.style = new Cesium.Cesium3DTileStyle({
    color: {
      conditions: [['true', `color("#759dc7", 0.4)`]],
    },
  })

  viewer.scene.primitives.add(tileset)
  tileset.maximumScreenSpaceError = 1 // 设置最大屏幕空间误差值，根据需要调整

  // customShader2(viewer, tileset)
  return tileset
}

// eslint-disable-next-line unused-imports/no-unused-vars
function customShader2(viewer: Cesium.Viewer, tileset: Cesium.Cesium3DTileset) {
  const customShader = new Cesium.CustomShader({
    fragmentShaderText: `
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material)
      {
        material.diffuse = vec3(0.0, 0.0, 1.0);
        material.diffuse.g = -fsInput.attributes.positionEC.z / 1.0e4;
      } `,
    lightingModel: Cesium.LightingModel.UNLIT,
  })
  tileset.customShader = customShader
  // viewer.scene.globe.depthTestAgainstTerrain = true; //（开启）
}

// eslint-disable-next-line unused-imports/no-unused-vars
export function removeBuildingModels(viewer: Cesium.Viewer) { }
