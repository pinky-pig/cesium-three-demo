import * as Cesium from 'cesium'
import CircleWaveMaterialProperty from './CircleWaveMaterialProperty.js'

export function addWaveCircle(
  viewer: Cesium.Viewer,
  options = {
    color: '#FFCB33',
    count: 2,
    duration: 3000,
    gradient: 0,
    positions: [116.397428, 39.90923],
  },
) {
  const { color, count, duration, gradient, positions } = options

  viewer.entities.add({
    ellipse: {
      height: 10,
      material: new CircleWaveMaterialProperty({
        color,
        count,
        duration,
        gradient,
      }),
      semiMajorAxis: 150,
      semiMinorAxis: 150,
    },
    position: Cesium.Cartesian3.fromDegrees(positions[0], positions[1], 1),
  })

  viewer!.scene.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      positions[0],
      positions[1],
      1300,
    ),
  })
}
