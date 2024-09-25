import * as THREE from 'three'
import FakeGlowMaterial from './FakeGlowMaterial.js'
import type * as dat from 'lil-gui'
import type { Material, Scene, ShaderMaterial } from 'three'

/**
 * https://github.com/ektogamat/fake-glow-material-threejs/tree/main?tab=readme-ov-file
 * @param scene
 */
// | Name               | Type                                              | Default   | Description                                                                                                                          |
// | ------------------ | ------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
// | falloff            | Number                                            | 0.1       | Controls the falloff factor for the glow effect. Ranges from 0.0 to 1.0.                                                             |
// | glowInternalRadius | Number                                            | 6.0       | Controls the internal radius for the glow effect.                                                                                    |
// | glowColor          | String or Color                                   | "#00d5ff" | Specifies the color of the glow effect. Use hexadecimal format or a `THREE.Color` instance.                                          |
// | glowSharpness      | Number                                            | 0.5       | Controls the sharpness of the glow effect. Ranges from 0.0 to 1.0.                                                                   |
// | opacity            | Number                                            | 1.0       | Specifies the opacity of the hologram. Ranges from 0.0 to 1.0.                                                                       |
// | side               | THREE.FrontSide, THREE.BackSide, THREE.DoubleSide | FrontSide | Specifies the rendering side. Options are "THREE.FrontSide", "THREE.BackSide", or "THREE.DoubleSide". Defaults to "THREE.FrontSide". |
// | depthTest          | Boolean                                           | false     | Enables or disables depth testing. Defaults to false.                                                                                |
// Here is an example of how you can pass these props. If you pass any of those props, the default values will be overwritten.
// ```
// const fakeGlowMaterial = new FakeGlowMaterial({
//     falloff: 0.2,
//     glowInternalRadius: 6.0,
//     glowColor: new THREE.Color("#ff0000"),
//     glowSharpness: 0.7,
//     opacity: 2.3,
//     side: THREE.FrontSide,
//     depthTest: true,
// });
// ```
export function addFakeGlowEffect(scene: Scene) {
  const geometry = new THREE.SphereGeometry()
  const fakeGlowMaterial = new FakeGlowMaterial() as ShaderMaterial
  const Sphere = new THREE.Mesh(geometry, fakeGlowMaterial)
  scene.add(Sphere)

  return {
    fakeGlowMaterial,
    Sphere,
  }
}

export function addFakeGlowEffectGUI(
  gui: dat.GUI,
  fakeGlowMaterial: ShaderMaterial,
) {
  gui
    .add(fakeGlowMaterial.uniforms.falloff, 'value')
    .min(0)
    .max(1)
    .step(0.01)
    .name('Falloff')
  gui
    .add(fakeGlowMaterial.uniforms.glowInternalRadius, 'value')
    .min(-10)
    .max(10)
    .step(0.01)
    .name('Glow Internal Radius')
  gui
    .addColor(
      {
        GlowColor: fakeGlowMaterial.uniforms.glowColor.value.getStyle(),
      },
      'GlowColor',
    )
    .onChange((color: any) => {
      fakeGlowMaterial.uniforms.glowColor.value.setStyle(color)
      fakeGlowMaterial.needsUpdate = true
    })
    .name('Glow Color')
  gui
    .add(fakeGlowMaterial.uniforms.glowSharpness, 'value')
    .min(0)
    .max(1)
    .step(0.01)
    .name('Glow Sharpness')
  gui
    .add(fakeGlowMaterial.uniforms.opacity, 'value')
    .min(0)
    .max(1)
    .step(0.01)
    .name('Opacity')
}
