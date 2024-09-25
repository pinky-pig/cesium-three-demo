/* eslint-disable @typescript-eslint/no-loss-of-precision */

/**
 * 1. 将 vue 组件转 html 字符串
 * @param component 组件
 * @returns html 字符串
 */
export function vNodeTransformDom(component: Component, props: any = {}) {
  // 不需要主动清空变量，GC回收
  const mountDom = document.createElement('div')
  const app = createApp(component, props)
  const realDom = app.mount(mountDom)
  return realDom.$el.outerHTML
}

/** 判断是否在国内，不在国内则不做偏移 */
function out_of_china(lng: any, lat: any) {
  return (
    lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271 || false
  )
}
const PI = 3.1415926535897932384626
const a = 6378245
const ee = 0.00669342162296594323
function transformlat(lng: any, lat: any) {
  let ret =
    -100 +
    2 * lng +
    3 * lat +
    0.2 * lat * lat +
    0.1 * lng * lat +
    0.2 * Math.sqrt(Math.abs(lng))
  ret += ((20 * Math.sin(6 * lng * PI) + 20 * Math.sin(2 * lng * PI)) * 2) / 3
  ret += ((20 * Math.sin(lat * PI) + 40 * Math.sin((lat / 3) * PI)) * 2) / 3
  ret +=
    ((160 * Math.sin((lat / 12) * PI) + 320 * Math.sin((lat * PI) / 30)) * 2) /
    3
  return ret
}
function transformlng(lng: any, lat: any) {
  let ret =
    300 +
    lng +
    2 * lat +
    0.1 * lng * lng +
    0.1 * lng * lat +
    0.1 * Math.sqrt(Math.abs(lng))
  ret += ((20 * Math.sin(6 * lng * PI) + 20 * Math.sin(2 * lng * PI)) * 2) / 3
  ret += ((20 * Math.sin(lng * PI) + 40 * Math.sin((lng / 3) * PI)) * 2) / 3
  ret +=
    ((150 * Math.sin((lng / 12) * PI) + 300 * Math.sin((lng / 30) * PI)) * 2) /
    3
  return ret
}
/** WGS84转GCj02 */
export function wgs84togcj02(lng: any, lat: any) {
  try {
    if (out_of_china(lng, lat)) return [lng, lat]

    let dlat = transformlat(lng - 105, lat - 35)
    let dlng = transformlng(lng - 105, lat - 35)
    const radlat = (lat / 180) * PI
    let magic = Math.sin(radlat)
    magic = 1 - ee * magic * magic
    const sqrtmagic = Math.sqrt(magic)
    dlat = (dlat * 180) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI)
    dlng = (dlng * 180) / ((a / sqrtmagic) * Math.cos(radlat) * PI)
    const mglat = lat + dlat
    const mglng = lng + dlng

    if (Number.isNaN(mglng) || Number.isNaN(mglat)) {
      console.error('传入的坐标有问题：', lng, lat)
      return [0, 0]
    } else {
      return [mglng, mglat]
    }
  } catch {
    console.error('传入的坐标有问题：', lng, lat)
    return [0, 0]
  }
}

export function gcj02towgs84(lng: any, lat: any) {
  if (out_of_china(lng, lat)) return [lng, lat]

  let dlat = transformlat(lng - 105, lat - 35)
  let dlng = transformlng(lng - 105, lat - 35)
  const radlat = (lat / 180) * PI
  let magic = Math.sin(radlat)
  magic = 1 - ee * magic * magic
  const sqrtmagic = Math.sqrt(magic)
  dlat = (dlat * 180) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI)
  dlng = (dlng * 180) / ((a / sqrtmagic) * Math.cos(radlat) * PI)
  const mglat = lat + dlat
  const mglng = lng + dlng
  return [lng * 2 - mglng, lat * 2 - mglat]
}
