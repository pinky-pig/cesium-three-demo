/* eslint-disable unused-imports/no-unused-vars */
import { Color, Event, Material, Property, defined } from 'cesium'
//定义材质对象及变量

const DynamicWallType = 'DynamicWall'

const DynamicWallSource = /* glsl */ `czm_material czm_getMaterial(czm_materialInput materialInput)
{
    float time = czm_frameNumber / 100.0; // 控制动画速度
    czm_material material = czm_getDefaultMaterial(materialInput);
    vec2 st = materialInput.st;

    // 将纹理在垂直方向上重复三次
    vec2 stRepeated = vec2(st.s, fract(st.t * 2.0 - time)); // 纹理重复三次，并随时间滚动

    // 获取纹理颜色
    vec4 colorImage = texture(image, stRepeated); // 使用 texture 代替 texture2D

    // 控制动画的颜色和透明度
    material.alpha = colorImage.a * color.a;
    material.diffuse = (colorImage.rgb + color.rgb) / 1.0;

    // 添加泛光效果
    vec4 fragColor;
    fragColor.rgb = (colorImage.rgb + color.rgb) / 3.0; // 泛光颜色
    fragColor = czm_gammaCorrect(fragColor); // 应用伽马校正
    material.diffuse = colorImage.rgb; // 主要颜色
    material.alpha = colorImage.a; // 透明度
    material.emission = fragColor.rgb; // 泛光

    return material;
}`

class DynamicWallMaterialProperty {
  constructor(image, color = Color.WHITE, duration = 1000) {
    this._definitionChanged = new Event()
    this._color = undefined
    this._colorSubscription = undefined
    this._time = Date.now()
    this.image = image
    this.color = color
    this.duration = duration

    //添加自定义材质
    Material._materialCache.addMaterial(DynamicWallType, {
      fabric: {
        //纹理类型
        type: DynamicWallType,
        //传递给着色器的外部属性
        uniforms: {
          color: color.withAlpha(0.5), // 设为半透明
          image,
          time: -20,
        },
        //纹理资源
        source: DynamicWallSource,
      },
      //是否透明
      translucent(material) {
        return true
      },
    })
  }

  get isConstant() {
    return false
  }

  get definitionChanged() {
    return this._definitionChanged
  }

  getType(_) {
    return DynamicWallType
  }

  getValue(time, result) {
    if (!defined(result)) {
      result = {}
    }
    result.color = Property.getValueOrClonedDefault(
      this._color,
      time,
      Color.WHITE,
      result.color,
    )
    result.image = this.image
    result.time = ((Date.now() - this._time) % this.duration) / this.duration

    return result
  }

  equals(other) {
    return (
      this === other ||
      (other instanceof DynamicWallMaterialProperty &&
        Property.equals(this._color, other._color))
    )
  }
}
export default DynamicWallMaterialProperty
