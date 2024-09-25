/* eslint-disable unused-imports/no-unused-vars */
import axios from 'axios'
import * as Cesium from 'cesium'
import CircleWaveMaterialProperty from '../utils/wave-circle/CircleWaveMaterialProperty'
import { setupComponentToDom } from '../utils/setup-component-to-dom'

import MiniCesiumLabel from './map-label/MiniCesiumLabel.vue'
import RouteCesiumLabelZD from './map-label/RouteCesiumLabelZD.vue'
import RouteCesiumLabelBDZNew from './map-label/RouteCesiumLabelBDZNew.vue'
import RouteCesiumLabelFDCNew from './map-label/RouteCesiumLabelFDCNew.vue'

import CesiumLabel1 from './map-label/CesiumLabel1.vue'
import CesiumLabel2 from './map-label/CesiumLabel2.vue'

import RouteCesiumLabelBDZ from './map-label/RouteCesiumLabelBDZ.vue'
import RouteCesiumLabelDDZX from './map-label/RouteCesiumLabelDDZX.vue'
import RouteCesiumLabelYDGJ from './map-label/RouteCesiumLabelYDGJ.vue'
import RouteCesiumLabelJSGJ from './map-label/RouteCesiumLabelJSGJ.vue'
import RouteCesiumLabelRJ from './map-label/RouteCesiumLabelRJ.vue'
/**
 * 态势大屏的状态下的地球逻辑
 * 1. 球
 * 2. 撒点（图标）
 * 3. 添加国家边界
 * @param viewer
 */
export function handleInGlobeEarth(viewer: Cesium.Viewer) {
  clearAllAlreadyFeatures(viewer)

  viewer.camera.flyTo({
    complete: () => {
      // 加载变电站撒点
      loadPoints(
        viewer,
        '/mock/earth-points-bdz.json',
        'earth-points-bdz',
        RouteCesiumLabelBDZNew,
      )
      // 加载发电厂撒点
      loadPoints(
        viewer,
        '/mock/earth-points-fdc.json',
        'earth-points-fdc',
        RouteCesiumLabelFDCNew,
      )
    },
    destination: Cesium.Cartesian3.fromDegrees(
      118.86906502657087,
      32.01868807211194,
      169468,
    ),
    duration: 3,
    orientation: {
      heading: Cesium.Math.toRadians(2.8),
      pitch: Cesium.Math.toRadians(-84.8),
      roll: 0,
    },
  })

  function loadPoints(
    viewer: Cesium.Viewer,
    url: string,
    key: string,
    labelComponent: Component,
  ) {
    axios.get(url).then((res: any) => {
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
          const overlay = setupComponentToDom(labelComponent, item)
          overlay.style.position = 'absolute'
          overlay.style.top = '0'
          overlay.style.left = '0'
          overlay.style.color = 'white'
          overlay.style.zIndex = '-1'
          overlay.style.transform = 'translateX(-50%)'
          overlay.style.pointerEvents = 'none'
          overlay.id = `cesium-earth-points-card-logic-${key}-${item.index}`
          const overlayContainer = document.querySelector('#cesium-overlay')
          if (overlayContainer) {
            overlayContainer.append(overlay)
          }
          const pointData: any = item

          viewer.entities.add({
            billboard: {
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 贴附地面
              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              image: pointData.tbUrl,
              scale: 0.08,
              scaleByDistance: new Cesium.NearFarScalar(
                2000000,
                1.5,
                8000000,
                0.1,
              ),
              show: true,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            },
            customAttribute: {
              ...pointData,
              featuresType: `cesium-earth-points-card-logic-${key}`,
            },
            popup: {
              dom: overlay,
              offset: [0, 230],
              position: pointData.position,
              show: true,
            },
            position: Cesium.Cartesian3.fromDegrees(
              pointData.position[0],
              pointData.position[1],
            ),
          } as Cesium.Entity.ConstructorOptions) as Cesium.Entity & {
            customAttribute?: string
          }
        },
      )
    })
  }
}

/**
 * 地球撒点上图逻辑1-计算节点
 */
export function handleIndGlobeEarthNodeCard2Logic(
  viewer: Cesium.Viewer,
  url: string,
  key: string,
  labelComponent: Component = RouteCesiumLabelZD,
) {
  loadPoints(viewer)
  function loadPoints(viewer: Cesium.Viewer) {
    axios.get(url).then((res: any) => {
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
          const overlay = setupComponentToDom(labelComponent, item)
          overlay.style.position = 'absolute'
          overlay.style.top = '0'
          overlay.style.left = '0'
          overlay.style.color = 'white'
          overlay.style.zIndex = '-1'
          overlay.style.transform = 'translateX(-50%)'
          overlay.style.pointerEvents = 'none'
          overlay.id = `cesium-earth-points-card-logic-${key}-${item.index}`
          const overlayContainer = document.querySelector('#cesium-overlay')
          if (overlayContainer) {
            overlayContainer.append(overlay)
          }
          const pointData: any = item

          viewer.entities.add({
            billboard: {
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 贴附地面
              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              image: pointData.tbUrl,
              scale: 0.08,
              scaleByDistance: new Cesium.NearFarScalar(
                2000000,
                1.5,
                8000000,
                0.1,
              ),
              show: true,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            },
            customAttribute: {
              ...pointData,
              featuresType: `cesium-earth-points-card-logic-${key}`,
            },
            popup: {
              dom: overlay,
              offset: [0, 230],
              position: pointData.position,
              show: true,
            },
            position: Cesium.Cartesian3.fromDegrees(
              pointData.position[0],
              pointData.position[1],
            ),
          } as Cesium.Entity.ConstructorOptions) as Cesium.Entity & {
            customAttribute?: string
          }
        },
      )
    })
  }
}

/**
 * 地球撒点上图逻辑1-阵地
 */
export function handleIndGlobeEarthZDCard2Logic(
  viewer: Cesium.Viewer,
  url: string,
  key: string,
  labelComponent: Component = RouteCesiumLabelZD,
) {
  loadPoints(viewer)
  function loadPoints(viewer: Cesium.Viewer) {
    axios.get(url).then((res: any) => {
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
          const overlay = setupComponentToDom(labelComponent, item)
          overlay.style.position = 'absolute'
          overlay.style.top = '0'
          overlay.style.left = '0'
          overlay.style.color = 'white'
          overlay.style.zIndex = '-1'
          overlay.style.transform = 'translateX(-50%)'
          overlay.style.pointerEvents = 'none'
          overlay.id = `cesium-earth-points-card-logic-${key}-${item.index}`
          const overlayContainer = document.querySelector('#cesium-overlay')
          if (overlayContainer) {
            overlayContainer.append(overlay)
          }
          const pointData: any = item

          viewer.entities.add({
            billboard: {
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 贴附地面
              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              image: pointData.tbUrl,
              scale: 0.08,
              scaleByDistance: new Cesium.NearFarScalar(
                2000000,
                1.5,
                8000000,
                0.1,
              ),
              show: true,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            },
            customAttribute: {
              ...pointData,
              featuresType: `cesium-earth-points-card-logic-${key}`,
            },
            popup: {
              dom: overlay,
              offset: [0, 360],
              position: pointData.position,
              show: true,
            },
            position: Cesium.Cartesian3.fromDegrees(
              pointData.position[0],
              pointData.position[1],
            ),
          } as Cesium.Entity.ConstructorOptions) as Cesium.Entity & {
            customAttribute?: string
          }
        },
      )
    })
  }
}

/**
 * 清除地球上撒点上图逻辑
 */

export function clearCard2LogicPoints(viewer: Cesium.Viewer, key: string) {
  const allBillboards = viewer.entities.values.filter(
    (entity) => entity.billboard,
  )
  allBillboards.forEach((entity) => {
    if (
      (entity as any)?.customAttribute?.featuresType ===
      `cesium-earth-points-card-logic-${key}`
    ) {
      viewer.entities.remove(entity)
    }
  })

  document
    .querySelectorAll(`[id^="cesium-earth-points-card-logic-${key}"]`)
    ?.forEach((item) => {
      item.remove()
    })
}

/**
 * 目标优选的状态下的地球逻辑
 * 0. 定位过去
 * 1. 添加点
 * 2. 添加小标牌
 * 3. 添加连线
 * 4. 白膜显示
 * @param viewer
 */
export function handleInNearEarth(viewer: Cesium.Viewer) {
  viewer.camera.flyTo({
    complete: () => {
      loadPoints()
      loadLines()
      setTimeout(function () { }, 1000)
    },
    destination: Cesium.Cartesian3.fromDegrees(
      118.86906502657087,
      32.01868807211194,
      169468,
    ),
    duration: 3,
    orientation: {
      heading: Cesium.Math.toRadians(2.8),
      pitch: Cesium.Math.toRadians(-84.8),
      roll: 0,
    },
  })

  clearAllAlreadyFeatures(viewer)
  /**
   * 加载点
   */
  function loadPoints() {
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
          // 普通的点
          const props = { ...item }
          const overlay = setupComponentToDom(MiniCesiumLabel, props)
          overlay.style.position = 'absolute'
          overlay.style.top = '0'
          overlay.style.left = '0'
          overlay.style.color = 'white'
          overlay.id = `cesium-point-mini-popup-${item.index}`

          const overlayContainer = document.querySelector('#cesium-overlay')
          if (overlayContainer) {
            overlayContainer.append(overlay)
          }

          viewer.entities.add({
            billboard: {
              disableDepthTestDistance: 3,
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 贴附地面
              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              image: item.tbUrl,
              scale: 0.1,
              scaleByDistance: new Cesium.NearFarScalar(
                2000000,
                1.5,
                8000000,
                0.1,
              ),
              show: true,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              // width: 32,
              // height: 32,
            },
            customAttribute: {
              ...item,
              featuresType: 'mini-label',
            },
            popup: {
              dom: overlay,
              offset: [100, 100],
              position: item.position,
              show: true,
            },
            position: Cesium.Cartesian3.fromDegrees(
              item.position[0],
              item.position[1],
            ),
          } as Cesium.Entity.ConstructorOptions) as Cesium.Entity & {
            customAttribute?: string
          }
        },
      )
    })
  }

  /**
   * 加载线
   */
  function loadLines() {
    axios
      .all([
        axios.get('/mock/nj-lines.json'),
        axios.get('/mock/nj-points.json'),
      ])
      .then(
        axios.spread((njLinesData, njPointsData) => {
          const connections = njLinesData.data
          const locations = njPointsData.data

          const updatedConnections = connections.map(
            (connection: { start: any; end: any }) => {
              // 在第一组数据中查找 start 和 end 对应的 position
              const startLocation = locations.find(
                (location: { name: any }) => location.name === connection.start,
              )
              const endLocation = locations.find(
                (location: { name: any }) => location.name === connection.end,
              )

              return {
                ...connection,
                position: [
                  startLocation ? startLocation.position : [0, 0],
                  endLocation ? endLocation.position : [0, 0],
                ],
              }
            },
          )

          updatedConnections.forEach((connection: { position: any }) => {
            // 第一种：流线效果
            // const imgPath = '/images/Textures/DotTransparent.png'
            // let coords = connection.position.flat()

            // let source = `czm_material czm_getMaterial(czm_materialInput materialInput)
            //             {
            //                 czm_material material = czm_getDefaultMaterial(materialInput);
            //                 vec2 st = materialInput.st;
            //                 vec4 colorImage = texture(image, vec2(fract((st.s - speed * czm_frameNumber * 0.001)), st.t));
            //                 material.alpha = colorImage.a * color.a;
            //                 material.diffuse = color.rgb;
            //                 return material;
            //           }`;

            // let material = new Cesium.Material({
            //   fabric: {
            //     uniforms: {
            //       color: Cesium.Color.fromCssColorString('#7ffeff'),
            //       image: imgPath,
            //       speed: 10,
            //     },
            //     source: source,
            //   },
            //   translucent: function () {
            //     return true
            //   },
            // });

            // var appearance = new Cesium.PolylineMaterialAppearance();
            // appearance.material = material;

            // // 创建并添加 Primitive，并附加自定义属性
            // const primitive = new Cesium.Primitive({
            //   geometryInstances: new Cesium.GeometryInstance({
            //     geometry: new Cesium.PolylineGeometry({
            //       positions: Cesium.Cartesian3.fromDegreesArray(coords),
            //       width: 5.0,
            //     }),
            //   }),
            //   appearance: appearance,
            // });

            // // 设置自定义属性
            // (primitive as any).customAttribute = connection;

            // // 添加到场景中
            // viewer.scene.primitives.add(primitive);

            // 第二种：蓝白条纹效果
            const coords = connection.position.flat()
            const source = `
            uniform vec4 color;
            czm_material czm_getMaterial(czm_materialInput materialInput)
            {
                czm_material material = czm_getDefaultMaterial(materialInput);
                vec2 st = materialInput.st;
                
                // 动态的蓝白条纹效果
                float stripe = fract(st.s * 10.0 - speed * czm_frameNumber * 0.001);
                vec3 colorImage = mix(vec3(1.0), color.rgb, step(0.5, stripe)); // 蓝白相间
                material.diffuse = colorImage;
                material.alpha = 1.0;
                return material;
            }`
            const material = new Cesium.Material({
              fabric: {
                source,
                uniforms: {
                  color: Cesium.Color.fromCssColorString('#456EBF'),
                  speed: 10, // 控制移动速度
                },
              },
              translucent() {
                return true
              },
            })

            const appearance = new Cesium.PolylineMaterialAppearance()
            appearance.material = material
            const primitive = new Cesium.Primitive({
              appearance,
              geometryInstances: new Cesium.GeometryInstance({
                geometry: new Cesium.PolylineGeometry({
                  positions: Cesium.Cartesian3.fromDegreesArray(coords),
                  width: 2,
                }),
              }),
            })

              ; (primitive as any).customAttribute = connection
            viewer.scene.primitives.add(primitive)
          })
        }),
      )
      .catch((error) => {
        console.error('请求失败:', error)
      })
  }
}

/**
 * 选中一个地点
 * 0. 选中目标扩散
 * 1. 大标牌
 * 2. 高亮区域
 * @param viewer
 */
export function handleInSelectOnePosition(viewer: Cesium.Viewer, item: any) {
  removeAllFeaturesFromSelect()
  function removeAllFeaturesFromSelect() {
    removeAllWaveEntities()
    loadMiniPointAndPopup()
    resetRedLines()
    removeSingleBuildingModel()
    function removeAllWaveEntities() {
      const waveCircleEntities = viewer.entities.values.filter(
        (entity: any) => {
          return (
            entity.customAttribute &&
            entity.customAttribute.featuresType === 'wave-circle'
          )
        },
      )
      waveCircleEntities.forEach((entity) => {
        viewer.entities.remove(entity)
      })

      // 遍历所有的数据源
      for (let i = 0; i < viewer.dataSources.length; i++) {
        const dataSource = viewer.dataSources.get(i)

        // 遍历数据源中的所有实体
        for (let j = 0; j < dataSource.entities.values.length; j++) {
          const entity = dataSource.entities.values[j]

          // 检查自定义属性是否匹配
          if (
            (entity as any)?.customAttribute?.featuresType ===
            'jiangning-area-polygon'
          ) {
            dataSource.entities.remove(entity)
          }
        }
      }
    }

    function loadMiniPointAndPopup() {
      // 1. 将之前的点移除，将之前的popup移除
      // 2. 加载新的点
      // 3. 加载新的popup
      const allBillboards = viewer.entities.values.filter(
        (entity) => entity.billboard,
      )
      allBillboards.forEach((entity) => {
        if ((entity as any).customAttribute?.featuresType === 'big-label') {
          viewer.entities.remove(entity)
        }
      })
      document.querySelectorAll(`#cesium-point-big-popup`)?.forEach((item) => {
        item.remove()
      })

      const overlay = setupComponentToDom(
        item.type === '变电站' ? CesiumLabel1 : CesiumLabel2,
      )
      overlay.style.position = 'absolute'
      overlay.style.top = '0'
      overlay.style.left = '0'
      overlay.style.color = 'white'
      overlay.id = `cesium-point-big-popup`
      const overlayContainer = document.querySelector('#cesium-overlay')
      if (overlayContainer) {
        overlayContainer.append(overlay)
      }
      const pointData: any = item

      viewer.entities.add({
        billboard: {
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 贴附地面
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          image: pointData.tbUrl,
          scale: 0.1,
          scaleByDistance: new Cesium.NearFarScalar(2000000, 1.5, 8000000, 0.1),
          show: true,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        },
        customAttribute: {
          ...pointData,
          featuresType: 'big-label',
        },
        popup: {
          dom: overlay,
          offset: [164, 237.5],
          position: pointData.position,
          show: true,
        },
        position: Cesium.Cartesian3.fromDegrees(
          pointData.position[0],
          pointData.position[1],
        ),
      } as Cesium.Entity.ConstructorOptions) as Cesium.Entity & {
        customAttribute?: string
      }
    }

    // 这里生效了，但是下面还是设置的固定的几条线 red ，所以似乎没生效似的
    function resetRedLines() {
      const primitives = viewer.scene.primitives
      for (let i = 0; i < primitives.length; i++) {
        const primitive = primitives.get(i)
        if (
          primitive.customAttribute &&
          primitive.customAttribute.color === 'red'
        ) {
          const material = primitive.appearance.material
          if (material && material.uniforms) {
            material.uniforms.color = Cesium.Color.fromCssColorString('#7ffeff')
          }
        }
      }
    }

    function removeSingleBuildingModel() {
      const primitives = viewer.scene.primitives
      for (let i = 0; i < primitives.length; i++) {
        const primitive = primitives.get(i)
        if (
          primitive.customAttribute &&
          primitive.customAttribute.featuresType === 'single-building-model'
        ) {
          primitives.remove(primitive)
        }
      }
    }
  }

  const waveCircleOption = {
    color: '#FFCB33',
    count: 2,
    duration: 3000,
    gradient: 0,
  }
  loadWaveCircle()
  loadBigPointAndPopup()
  loadRedLines()
  loadPolygon()
  loadBuildingModel('http://localhost:8082/model/dalou-3dtiles2/tileset.json')
  // 添加一个模型
  async function loadBuildingModel(url: string) {
    let tileset: any = {}
    tileset = await Cesium.Cesium3DTileset.fromUrl(url)
    tileset.customAttribute = {
      featuresType: 'single-building-model',
    }
    viewer!.scene.primitives.add(tileset)
  }
  function loadWaveCircle() {
    const { color, count, duration, gradient } = waveCircleOption
    const positions = item.position

    viewer.entities.add({
      customAttribute: {
        featuresType: 'wave-circle',
      },
      ellipse: {
        height: 10,
        material: new CircleWaveMaterialProperty({
          color,
          count,
          duration,
          gradient,
        }),
        semiMajorAxis: 1500,
        semiMinorAxis: 1500,
      },
      position: Cesium.Cartesian3.fromDegrees(positions[0], positions[1], 1),
    } as Cesium.Entity.ConstructorOptions) as Cesium.Entity & {
      customAttribute?: string
    }
  }

  function loadBigPointAndPopup() {
    // 1. 将之前的点移除，将之前的popup移除
    // 2. 加载新的点
    // 3. 加载新的popup
    const allBillboards = viewer.entities.values.filter(
      (entity) => entity.billboard,
    )
    allBillboards.forEach((entity) => {
      if ((entity as any).customAttribute === item.name) {
        viewer.entities.remove(entity)
      }
    })
    document
      .querySelectorAll(`#cesium-point-mini-popup-${item.index}`)
      ?.forEach((item) => {
        item.remove()
      })

    const overlay = setupComponentToDom(
      item.type === '变电站' ? CesiumLabel1 : CesiumLabel2,
    )
    overlay.style.position = 'absolute'
    overlay.style.top = '0'
    overlay.style.left = '0'
    overlay.style.color = 'white'
    overlay.id = `cesium-point-big-popup`
    const overlayContainer = document.querySelector('#cesium-overlay')
    if (overlayContainer) {
      overlayContainer.append(overlay)
    }
    const pointData: any = item

    viewer.entities.add({
      billboard: {
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 贴附地面
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        image: pointData.tbUrl,
        scale: 0.1,
        scaleByDistance: new Cesium.NearFarScalar(2000000, 1.5, 8000000, 0.1),
        show: true,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      },
      customAttribute: {
        ...pointData,
        featuresType: 'big-label',
      },
      popup: {
        dom: overlay,
        offset: [164, 237.5],
        position: pointData.position,
        show: true,
      },
      position: Cesium.Cartesian3.fromDegrees(
        pointData.position[0],
        pointData.position[1],
      ),
    } as Cesium.Entity.ConstructorOptions) as Cesium.Entity & {
      customAttribute?: string
    }
  }

  function loadRedLines() {
    // 1. 将之前的线移除
    const primitives = viewer.scene.primitives
    for (let i = 0; i < primitives.length; i++) {
      const primitive = primitives.get(i)

      if (
        primitive.customAttribute &&
        primitive.customAttribute.color === 'red'
      ) {
        // 找到并移除该 Primitive
        // primitives.remove(primitive);
        const material = primitive.appearance.material
        if (material && material.uniforms) {
          // 将 color 修改为红色
          material.uniforms.color = Cesium.Color.fromCssColorString('#ea8960')
        }
      }
    }
  }
  async function loadPolygon() {
    const njGeoJsonData = '/json/江宁区.json'

    const njDataSource = await Cesium.GeoJsonDataSource.load(njGeoJsonData)

    viewer.dataSources.add(njDataSource)
    // 遍历中国全图 GeoJSON 数据的实体并设置样式
    const chinaEntities = njDataSource.entities.values
    for (const entity of chinaEntities) {
      if (entity.polygon) {
        entity.polygon.material = new Cesium.ColorMaterialProperty(
          Cesium.Color.fromCssColorString('#ff000040'),
        )
        entity.polygon.outline = new Cesium.ConstantProperty(true)
        entity.polygon.outlineWidth = new Cesium.ConstantProperty(10)
        entity.polygon.outlineColor = new Cesium.ConstantProperty(
          Cesium.Color.fromCssColorString('#ff8eff'),
        )

          // 添加自定义属性
          ; (entity as any).customAttribute = {
            featuresType: 'jiangning-area-polygon',
          }
      }
    }
    return njDataSource
  }
}

export function handleCancelSelectOnePosition(
  viewer: Cesium.Viewer,
  item: any,
) {
  removeAllFeaturesFromSelect()
  function removeAllFeaturesFromSelect() {
    removeAllWaveEntities()
    loadMiniPointAndPopup()
    resetRedLines()
    removeSingleBuildingModel()
    function removeAllWaveEntities() {
      const waveCircleEntities = viewer.entities.values.filter(
        (entity: any) => {
          return (
            entity.customAttribute &&
            entity.customAttribute.featuresType === 'wave-circle'
          )
        },
      )
      waveCircleEntities.forEach((entity) => {
        viewer.entities.remove(entity)
      })

      // 遍历所有的数据源
      for (let i = 0; i < viewer.dataSources.length; i++) {
        const dataSource = viewer.dataSources.get(i)

        // 遍历数据源中的所有实体
        for (let j = 0; j < dataSource.entities.values.length; j++) {
          const entity = dataSource.entities.values[j]

          // 检查自定义属性是否匹配
          if (
            (entity as any)?.customAttribute?.featuresType ===
            'jiangning-area-polygon'
          ) {
            dataSource.entities.remove(entity)
          }
        }
      }
    }

    function loadMiniPointAndPopup() {
      // 1. 将之前的点移除，将之前的popup移除
      // 2. 加载新的点
      // 3. 加载新的popup
      const allBillboards = viewer.entities.values.filter(
        (entity) => entity.billboard,
      )
      allBillboards.forEach((entity) => {
        if ((entity as any).customAttribute?.featuresType === 'big-label') {
          viewer.entities.remove(entity)
        }
      })
      document.querySelectorAll(`#cesium-point-big-popup`)?.forEach((item) => {
        item.remove()
      })
      const props = { ...item }
      const overlay = setupComponentToDom(MiniCesiumLabel, props)
      overlay.style.position = 'absolute'
      overlay.style.top = '0'
      overlay.style.left = '0'
      overlay.style.color = 'white'
      overlay.id = `cesium-point-big-popup`
      const overlayContainer = document.querySelector('#cesium-overlay')
      if (overlayContainer) {
        overlayContainer.append(overlay)
      }
      const pointData: any = item

      viewer.entities.add({
        billboard: {
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 贴附地面
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          image: pointData.tbUrl,
          scale: 0.1,
          scaleByDistance: new Cesium.NearFarScalar(2000000, 1.5, 8000000, 0.1),
          show: true,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        },
        customAttribute: {
          ...pointData,
          featuresType: 'big-label',
        },
        popup: {
          dom: overlay,
          offset: [120, 100],
          position: pointData.position,
          show: true,
        },
        position: Cesium.Cartesian3.fromDegrees(
          pointData.position[0],
          pointData.position[1],
        ),
      } as Cesium.Entity.ConstructorOptions) as Cesium.Entity & {
        customAttribute?: string
      }
    }

    // 这里生效了，但是下面还是设置的固定的几条线 red ，所以似乎没生效似的
    function resetRedLines() {
      const primitives = viewer.scene.primitives
      for (let i = 0; i < primitives.length; i++) {
        const primitive = primitives.get(i)
        if (
          primitive.customAttribute &&
          primitive.customAttribute.color === 'red'
        ) {
          const material = primitive.appearance.material
          if (material && material.uniforms) {
            material.uniforms.color = Cesium.Color.fromCssColorString('#456EBF')
          }
        }
      }
    }

    function removeSingleBuildingModel() {
      debugger
      const primitives = viewer.scene.primitives
      for (let i = 0; i < primitives.length; i++) {
        const primitive = primitives.get(i)
        if (
          primitive.customAttribute &&
          primitive.customAttribute.featuresType === 'single-building-model'
        ) {
          primitives.remove(primitive)
        }
      }
    }
  }
}

/**
 * 删除添加的点线面。添加新的点
 * @param viewer
 */
export function handleRoutePlaningLogic(viewer: Cesium.Viewer, item: any) {
  removeAllWaveEntities()
  removeAllPointAndPopup()
  removeAllLines()
  function removeAllWaveEntities() {
    const waveCircleEntities = viewer.entities.values.filter((entity: any) => {
      return (
        entity.customAttribute &&
        entity.customAttribute.featuresType === 'wave-circle'
      )
    })
    waveCircleEntities.forEach((entity) => {
      viewer.entities.remove(entity)
    })

    // 遍历所有的数据源
    for (let i = 0; i < viewer.dataSources.length; i++) {
      const dataSource = viewer.dataSources.get(i)

      // 遍历数据源中的所有实体
      for (let j = 0; j < dataSource.entities.values.length; j++) {
        const entity = dataSource.entities.values[j]

        // 检查自定义属性是否匹配
        if (
          (entity as any)?.customAttribute?.featuresType ===
          'jiangning-area-polygon'
        ) {
          dataSource.entities.remove(entity)
        }
      }
    }
  }

  function removeAllPointAndPopup() {
    const allBillboards = viewer.entities.values.filter(
      (entity) => entity.billboard,
    )
    allBillboards.forEach((entity) => {
      viewer.entities.remove(entity)
    })
    document.querySelectorAll(`#cesium-point-big-popup`)?.forEach((item) => {
      item.remove()
    })
    document
      .querySelectorAll(`[id^="cesium-point-mini-popup"]`)
      ?.forEach((item) => {
        item.remove()
      })
  }

  function removeAllLines() {
    const primitives = viewer.scene.primitives
    for (let i = primitives.length - 1; i >= 0; i--) {
      const primitive = primitives.get(i)

      if (primitive.customAttribute && primitive.customAttribute.color) {
        primitives.remove(primitive)
      }
    }
  }

  loadPoints()
  loadLines()
  loadWaveCircle()
  function loadPoints() {
    axios.get('/mock/route-points.json').then((res: any) => {
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
          const labelObj = {
            变电站: {
              component: RouteCesiumLabelBDZ,
              offset: [164, 437.5],
            },
            调度中心: {
              component: RouteCesiumLabelDDZX,
              offset: [164, 560],
            },
            僵尸攻击阵地: {
              component: RouteCesiumLabelJSGJ,
              offset: [164, 500],
            },
            肉鸡: {
              component: RouteCesiumLabelRJ,
              offset: [164, 500],
            },
            云端攻击阵地: {
              component: RouteCesiumLabelYDGJ,
              offset: [164, 500],
            },
          }

          const props = { ...item }
          const overlay = setupComponentToDom(
            (labelObj as any)[item.type]?.component || CesiumLabel1,
            props,
          )
          overlay.style.position = 'absolute'
          overlay.style.top = '0'
          overlay.style.left = '0'
          overlay.style.color = 'white'
          overlay.style.pointerEvents = 'none'
          overlay.id = `cesium-point-mini-popup-${item.index}`

          const overlayContainer = document.querySelector('#cesium-overlay')
          if (overlayContainer) {
            overlayContainer.append(overlay)
          }

          viewer.entities.add({
            billboard: {
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 贴附地面
              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              image: item.tbUrl,
              scale: 0.1,
              scaleByDistance: new Cesium.NearFarScalar(
                2000000,
                1.5,
                8000000,
                0.1,
              ),
              show: true,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              // width: 32,
              // height: 32,
            },
            customAttribute: {
              ...item,
              featuresType: 'mini-label',
            },
            popup: {
              dom: overlay,
              offset: (labelObj as any)[item.type]?.offset || [100, 300],
              position: item.position,
              show: true,
            },
            position: Cesium.Cartesian3.fromDegrees(
              item.position[0],
              item.position[1],
            ),
          } as Cesium.Entity.ConstructorOptions) as Cesium.Entity & {
            customAttribute?: string
          }
        },
      )
    })
  }

  /**
   * 加载线
   */
  function loadLines() {
    axios
      .all([
        axios.get('/mock/route-lines.json'),
        axios.get('/mock/route-points.json'),
      ])
      .then(
        axios.spread((njLinesData, njPointsData) => {
          const connections = njLinesData.data
          const locations = njPointsData.data

          const updatedConnections = connections.map(
            (connection: { start: any; end: any; through?: any }) => {
              // 在第一组数据中查找 start 和 end 对应的 position
              const startLocation = locations.find(
                (location: { name: any }) => location.name === connection.start,
              )
              const endLocation = locations.find(
                (location: { name: any }) => location.name === connection.end,
              )
              const throughLocation = locations.find(
                (location: { name: any }) =>
                  location.name === connection.through,
              )
              return {
                ...connection,
                position: [
                  startLocation ? startLocation.position : [0, 0],
                  throughLocation ? throughLocation.position : null,
                  endLocation ? endLocation.position : [0, 0],
                ],
              }
            },
          )

          updatedConnections.forEach((item: { position: any[] }) => {
            item.position = item.position.filter(
              (pos) => pos !== null && pos !== undefined,
            )
          })

          updatedConnections.forEach((connection: { position: any }) => {
            const imgPath = '/images/Textures/testt.png'
            const coords = connection.position.flat()

            // 修改 GLSL 代码实现蓝白相间的效果
            const source = `
            czm_material czm_getMaterial(czm_materialInput materialInput)
            {
                czm_material material = czm_getDefaultMaterial(materialInput);
                vec2 st = materialInput.st;
                
                // 动态的蓝白条纹效果
                float stripe = fract(st.s * 10.0 - speed * czm_frameNumber * 0.001);
                vec3 colorImage = mix(vec3(1.0), vec3(0.455, 0.153, 0.090), step(0.5, stripe)); // 蓝白相间
                material.diffuse = colorImage;
                material.alpha = 1.0;
                return material;
            }`

            const material = new Cesium.Material({
              fabric: {
                source,
                uniforms: {
                  speed: 10, // 控制移动速度
                },
              },
              translucent() {
                return true
              },
            })

            const appearance = new Cesium.PolylineMaterialAppearance()
            appearance.material = material

            // 创建并添加 Primitive，并附加自定义属性
            const primitive = new Cesium.Primitive({
              appearance,
              geometryInstances: new Cesium.GeometryInstance({
                geometry: new Cesium.PolylineGeometry({
                  positions: Cesium.Cartesian3.fromDegreesArray(coords),
                  width: 2,
                }),
              }),
            })

              // 设置自定义属性
              ; (primitive as any).customAttribute = connection

            // 添加到场景中
            viewer.scene.primitives.add(primitive)
          })
        }),
      )
      .catch((error) => {
        console.error('请求失败:', error)
      })
  }

  function loadWaveCircle() {
    const { color, count, duration, gradient } = {
      color: '#FF0000',
      count: 2,
      duration: 3000,
      gradient: 0,
    }

    axios
      .all([
        axios.get('/mock/route-wave-points.json'),
        axios.get('/mock/route-points.json'),
      ])
      .then(
        axios.spread((data1, data2) => {
          const arr = data1.data.map((item: any) => {
            return data2.data.find((it: { name: any }) => it.name === item)
          })

          arr?.forEach((item: any) => {
            const positions = item.position
            viewer.entities.add({
              customAttribute: {
                featuresType: 'wave-circle',
              },
              ellipse: {
                height: 10,
                material: new CircleWaveMaterialProperty({
                  color,
                  count,
                  duration,
                  gradient,
                }),
                semiMajorAxis: 1500,
                semiMinorAxis: 1500,
              },
              position: Cesium.Cartesian3.fromDegrees(
                positions[0],
                positions[1],
                1,
              ),
            } as Cesium.Entity.ConstructorOptions) as Cesium.Entity & {
              customAttribute?: string
            }
          })
        }),
      )
      .catch((error) => {
        console.log(error)
      })
  }
}

export function clearAllAlreadyFeatures(viewer: Cesium.Viewer) {
  removeAllWaveEntities()
  removeAllPointAndPopup()
  removeAllLines()
  function removeAllWaveEntities() {
    const waveCircleEntities = viewer.entities.values.filter((entity: any) => {
      return (
        entity.customAttribute &&
        entity.customAttribute.featuresType === 'wave-circle'
      )
    })
    waveCircleEntities.forEach((entity) => {
      viewer.entities.remove(entity)
    })

    // 遍历所有的数据源
    for (let i = 0; i < viewer.dataSources.length; i++) {
      const dataSource = viewer.dataSources.get(i)

      // 遍历数据源中的所有实体
      for (let j = 0; j < dataSource.entities.values.length; j++) {
        const entity = dataSource.entities.values[j]

        // 检查自定义属性是否匹配
        if (
          (entity as any)?.customAttribute?.featuresType ===
          'jiangning-area-polygon'
        ) {
          dataSource.entities.remove(entity)
        }
      }
    }
  }

  function removeAllPointAndPopup() {
    const allBillboards = viewer.entities.values.filter(
      (entity) => entity.billboard,
    )
    allBillboards.forEach((entity) => {
      viewer.entities.remove(entity)
    })
    document.querySelectorAll(`#cesium-point-big-popup`)?.forEach((item) => {
      item.remove()
    })
    document
      .querySelectorAll(`[id^="cesium-point-mini-popup"]`)
      ?.forEach((item) => {
        item.remove()
      })
    document
      .querySelectorAll(`[id^="cesium-earth-points"]`)
      ?.forEach((item) => {
        item.remove()
      })
  }

  function removeAllLines() {
    const primitives = viewer.scene.primitives
    for (let i = primitives.length - 1; i >= 0; i--) {
      const primitive = primitives.get(i)

      if (primitive.customAttribute && primitive.customAttribute.color) {
        primitives.remove(primitive)
      }
    }
  }
}
