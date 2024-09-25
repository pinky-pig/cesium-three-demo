import * as Cesium from 'cesium'
import { Color, defined, Event, Material, Property } from "cesium";
 
const CircleWaveMaterialType = "CircleWaveMaterial";

const CircleWaveSource = /* glsl */ `
czm_material czm_getMaterial(czm_materialInput materialInput) {
  czm_material material = czm_getDefaultMaterial(materialInput);
  material.diffuse = 1.5 * color.rgb;
  vec2 st = materialInput.st;
  vec3 str = materialInput.str;
  float dis = distance(st, vec2(0.5, 0.5));
  float per = fract(time);
  if (abs(str.z) > 0.001) {
      discard;
  }
  if (dis > 0.5) {
      discard;
  } else {
      float perDis = 0.5 / count;
      float disNum;
      float bl = 0.0;
      for (int i = 0; i <= 999; i++) {
          if (float(i) <= count) {
              disNum = perDis * float(i) - dis + per / count;
              if (disNum > 0.0) {
                  if (disNum < perDis) {
                      bl = 1.0 - disNum / perDis;
                  } else if (disNum - perDis < perDis) {
                      bl = 1.0 - abs(1.0 - disNum / perDis);
                  }
                  material.alpha = pow(bl, gradient);
              }
          }
      }
  }
  return material;
}
`

export class CircleWaveMaterialProperty {
    constructor(options) {
        options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT);
        this._definitionChanged = new Cesium.Event();

        this.color = options.color;
        this.duration = Cesium.defaultValue(options.duration, 1e3);
        this.count = Cesium.defaultValue(options.count, 2);
        if (this.count <= 0) this.count = 1;
        this.gradient = Cesium.defaultValue(options.gradient, 0.1);
        if (this.gradient < 0) this.gradient = 0;
        else if (this.gradient > 1) this.gradient = 1;
        this._time = performance.now();

        Material._materialCache.addMaterial(CircleWaveMaterialType, {
          fabric: {
            //纹理类型
            type: CircleWaveMaterialType,
            //传递给着色器的外部属性
            uniforms: {
              color: new Cesium.Color(181, 241, 254, 1),
              time: 1,
              count: 1,
              gradient: 0.1
            },
            //纹理资源
            source: CircleWaveSource,
          },
          //是否透明
          translucent: function (material) {
            return true;
          },
        });
    }
 
    get isConstant() {
      return false;
    }
   
    get definitionChanged() {
      return this._definitionChanged;
    }

    getType(_) {
      return CircleWaveMaterialType;
    }
    getValue(time, result) {
      if (!Cesium.defined(result)) {
        result = {};
      }
   
      result.color = Cesium.Color.fromCssColorString(this.color) || Cesium.Color.WHITE;
      result.time = (performance.now() - this._time) / this.duration;
      result.count = this.count;
      result.gradient = 1 + 10 * (1 - this.gradient);
      return result;
    }

    equals(other) {
      const reData =
        this === other ||
        (other instanceof CircleWaveMaterialProperty
            && Cesium.Property.equals(this.color, other.color)
            && Cesium.Property.equals(this.duration, other.duration)
            && Cesium.Property.equals(this.count, other.count)
            && Cesium.Property.equals(this.gradient, other.gradient));
      return reData;
    }
}
export default CircleWaveMaterialProperty;
 