import axios from 'axios';
import * as Cesium from 'cesium'

const defaultLineColor = '#575b5f'
const activeLineColor = '#ef949e'

export function hawkeyeLogic(viewer: Cesium.Viewer) {

  // 加载所有的点和线条
  loadAllLinesAndPoints()

  /**
   * 加载线
   */
  function loadAllLinesAndPoints() {
    axios.get('/mock/route-lines-hawkeye.json').then((res: any) => {
      const points = res.data.points
      const lines = res.data.lines

      points.forEach((item: any) => {
        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(item.position[0], item.position[1]),
          billboard: {
            image: item.tbUrl,
            scaleByDistance: new Cesium.NearFarScalar(2000000, 1.5, 8000000, 0.1),
            scale: 0.1,
            show: true,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          },
        } as Cesium.Entity.ConstructorOptions) as Cesium.Entity & { customProperty?: string };
      })

      lines.forEach((line: {index: number, children: any[]}) => {
        line.children.forEach((position:any) => {
          let coords = position.flat();

          // 修改 GLSL 代码实现蓝白相间的效果
          let source = `
            uniform vec4 color;
            czm_material czm_getMaterial(czm_materialInput materialInput)
            {
                czm_material material = czm_getDefaultMaterial(materialInput);
                vec2 st = materialInput.st;
                
                // 动态的蓝白条纹效果
                material.diffuse = color.rgb;
                material.alpha = 1.0;
                return material;
            }`;
          let material = new Cesium.Material({
            fabric: {
              uniforms: {
                color: Cesium.Color.fromCssColorString(defaultLineColor),
                speed: 10, // 控制移动速度
              },
              source: source,
            },
            translucent: function () {
              return true;
            },
          });

          var appearance = new Cesium.PolylineMaterialAppearance();
          appearance.material = material;

          // 创建并添加 Primitive，并附加自定义属性
          const primitive = new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
              geometry: new Cesium.PolylineGeometry({
                positions: Cesium.Cartesian3.fromDegreesArray(coords),
                width: 2.0,
              }),
            }),
            appearance: appearance,
          });

          // 设置自定义属性
          (primitive as any).customAttribute = {
            ...line,
            featuresType: 'hawkeye-all-line',
          };

          // 添加到场景中
          viewer.scene.primitives.add(primitive);
        });
      })

      setTimeout(() => {
        setHawkeyeLineActive(viewer)
        viewer.zoomTo(viewer.entities);
      });
    })
  }
}

export function setHawkeyeLineActive(viewer: Cesium.Viewer, lineIndex: number = 1) {
  const primitives = viewer.scene.primitives;
  for (let i = 0; i < primitives.length; i++) {
    const primitive = primitives.get(i);
    // 将原来的恢复颜色
    if (primitive.customAttribute && primitive.customAttribute.index !== lineIndex) {
      const material = primitive.appearance.material;
      if (material && material.uniforms) {
        material.uniforms.color = Cesium.Color.fromCssColorString(defaultLineColor);
      }
    }

    // 设置当前激活的线
    if (primitive.customAttribute && primitive.customAttribute.index === lineIndex) {
      const material = primitive.appearance.material;
      if (material && material.uniforms) {
        material.uniforms.color = Cesium.Color.fromCssColorString(activeLineColor);
      }
    }
  }
}





// import axios from 'axios';
// import * as Cesium from 'cesium'

// export function hawkeyeLogic(viewer: Cesium.Viewer) {


//   loadPoints()
//   loadLines()
//   function loadPoints() {
//     axios.get('/mock/route-points.json').then((res: any) => {
//       res.data.forEach((item: {
//         "index": number,
//         "type": string,
//         "name": string,
//         "position": [number, number],
//         "address": string,
//         "remarks": string,
//         "tbUrl": string
//       }) => {

//         viewer.entities.add({
//           position: Cesium.Cartesian3.fromDegrees(item.position[0], item.position[1]),
//           billboard: {
//             image: item.tbUrl,
//             scaleByDistance: new Cesium.NearFarScalar(2000000, 1.5, 8000000, 0.1),
//             scale: 0.1,
//             show: true,
//             horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
//             verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
//           },
        
//         } as Cesium.Entity.ConstructorOptions) as Cesium.Entity & { customProperty?: string };
//       })
//     })

//     viewer.zoomTo(viewer.entities);
//   }

//   /**
//    * 加载线
//    */
//   function loadLines() {
//     axios.all([
//       axios.get('/mock/route-lines.json'),
//       axios.get('/mock/route-points.json')
//     ])
//       .then(axios.spread((njLinesData, njPointsData) => {
//         const connections = njLinesData.data
//         const locations = njPointsData.data

//         const updatedConnections = connections.map((connection: { start: any; end: any; through?: any; }) => {
//           // 在第一组数据中查找 start 和 end 对应的 position
//           const startLocation = locations.find((location: { name: any; }) => location.name === connection.start);
//           const endLocation = locations.find((location: { name: any; }) => location.name === connection.end);
//           const throughLocation = locations.find((location: { name: any; }) => location.name === connection.through);
//           return {
//             ...connection,
//             position: [
//               startLocation ? startLocation.position : [0, 0],
//               throughLocation ? throughLocation.position : null,
//               endLocation ? endLocation.position : [0, 0]
//             ]
//           };
//         });

//         updatedConnections.forEach((item: { position: any[]; }) => {
//           item.position = item.position.filter(pos => pos !== null && pos !== undefined);
//         });


//         updatedConnections.forEach((connection: { position: any; }) => {
//           let coords = connection.position.flat();

//           // 修改 GLSL 代码实现蓝白相间的效果
//           let source = `
//             czm_material czm_getMaterial(czm_materialInput materialInput)
//             {
//                 czm_material material = czm_getDefaultMaterial(materialInput);
//                 vec2 st = materialInput.st;
                
//                 // 动态的蓝白条纹效果
//                 float stripe = fract(st.s * 10.0 - speed * czm_frameNumber * 0.001);
//                 vec3 colorImage = mix(vec3(1.0), vec3(0.455, 0.153, 0.090), step(0.5, stripe)); // 蓝白相间
//                 material.diffuse = colorImage;
//                 material.alpha = 1.0;
//                 return material;
//             }`;

//           let material = new Cesium.Material({
//             fabric: {
//               uniforms: {
//                 speed: 10, // 控制移动速度
//               },
//               source: source,
//             },
//             translucent: function () {
//               return true;
//             },
//           });

//           var appearance = new Cesium.PolylineMaterialAppearance();
//           appearance.material = material;

//           // 创建并添加 Primitive，并附加自定义属性
//           const primitive = new Cesium.Primitive({
//             geometryInstances: new Cesium.GeometryInstance({
//               geometry: new Cesium.PolylineGeometry({
//                 positions: Cesium.Cartesian3.fromDegreesArray(coords),
//                 width: 2.0,
//               }),
//             }),
//             appearance: appearance,
//           });

//           // 设置自定义属性
//           (primitive as any).customAttribute = connection;

//           // 添加到场景中
//           viewer.scene.primitives.add(primitive);
//         });



//       }))
//       .catch(error => {
//         console.error('请求失败:', error);
//       });
//   }
// }
