import { Color, Event, Material, Property, defined } from 'cesium'

const PolylineTrailLinkType = 'PolylineTrailLink'
//time用于控制时间，值越小，速度越快，colorImage控制纹理样式，
// vec4 sampledColor = texture2D(image, vec2(fract(3.0*st.s - time), st.t));
//3.0代表纹理个数，st.t纵向，st.s横向，-time代表逆时针，+time代表顺时针
const PolylineTrailLinkSource = /* glsl */ `
czm_material czm_getMaterial(czm_materialInput materialInput) 
{
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st;
  vec4 sampledColor = texture(image, vec2(fract(3.0 * st.s - time), st.t)); // 使用 texture 代替 texture2D
  material.alpha = sampledColor.a * color.a;
  material.diffuse = (sampledColor.rgb + color.rgb) / 2.0;
  return material;
}
`

class PolylineTrailLinkMaterialProperty {
  /**
   * 构造方法
   * @param {String} image 图片路径，确保为程序能访问到的正常 URL
   * @param {Cesium.Color} [color] 颜色，默认白色
   * @param {Number} [duration] 持续时间（毫秒），默认1000
   */
  constructor(image, color = Color.WHITE, duration = 1000) {
    this._definitionChanged = new Event()
    this._color = undefined
    this._colorSubscription = undefined
    this.color = color
    this.duration = duration
    this._time = Date.now()
    this.image = image

    Material._materialCache.addMaterial(PolylineTrailLinkType, {
      fabric: {
        type: PolylineTrailLinkType,
        uniforms: {
          color: color.withAlpha(0.5), // 设为半透明
          image,
          time: 0,
        },
        source: PolylineTrailLinkSource,
      },
      translucent: () => true,
    })
  }

  get isConstant() {
    return false
  }

  get definitionChanged() {
    return this._definitionChanged
  }

  getType(_) {
    return PolylineTrailLinkType
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
      (other instanceof PolylineTrailLinkMaterialProperty &&
        Property.equals(this._color, other._color))
    )
  }
}

export default PolylineTrailLinkMaterialProperty
