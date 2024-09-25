import * as Cesium from 'cesium'

// 贝赛尔曲线算法
// 参数：
// anchorpoints: [{ x: 116.30, y: 39.60 }, { x: 37.50, y: 40.25 }, { x: 39.51, y: 36.25 }]
const CreateBezierPoints = (anchorpoints: any[], pointsAmount: number) => {
  const points = []
  for (let i = 0; i < pointsAmount; i++) {
    const point = MultiPointBezier(anchorpoints, i / pointsAmount)
    points.push([point.x, point.y])
  }
  return points
}

// 生成贝塞尔曲线
const getBSR = (pointStart: number[], pointEnd: number[], point3: number[]) => {
  const ps = [
    { x: pointStart[0], y: pointStart[1] },
    { x: pointEnd[0], y: pointEnd[1] },
    { x: point3[0], y: point3[1] },
  ]
  // 100 每条线由100个点组成
  const guijipoints = CreateBezierPoints(ps, 100)
  return guijipoints
}

const MultiPointBezier = (points: any[], t: number) => {
  const len = points.length
  let x = 0,
    y = 0
  const erxiangshi = function (start: number, end: number) {
    let cs = 1,
      bcs = 1
    while (end > 0) {
      cs *= start
      bcs *= end
      start--
      end--
    }
    return cs / bcs
  }
  for (let i = 0; i < len; i++) {
    const point = points[i]
    x += point.x * (1 - t) ** (len - 1 - i) * t ** i * erxiangshi(len - 1, i)
    y += point.y * (1 - t) ** (len - 1 - i) * t ** i * erxiangshi(len - 1, i)
  }
  return { x, y }
}

const getBSRPoints = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  h: number,
) => {
  const pointStart = [y1, 0]
  const pointEnd = [(y2 + y1) / 2, h]
  const point3 = [y2, 0]
  const arr = getBSR(pointStart, pointEnd, point3)
  const arr3d = []
  for (const element of arr) {
    const x = ((x2 - x1) * (element[0] - y1)) / (y2 - y1) + x1
    arr3d.push([x, element[0], element[1]])
  }
  return arr3d
}

// 将数据转换为cesium polyline positions格式
const getBSRxyz = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  h: number,
) => {
  const arr3d = getBSRPoints(x1, y1, x2, y2, h)
  const arrAll = []
  for (const ite of arr3d) {
    arrAll.push(ite[0], ite[1], ite[2])
  }
  return Cesium.Cartesian3.fromDegreesArrayHeights(arrAll)
}

export const setPathData = (
  pointStart: number[],
  pointEnd: number[],
  h: number,
) => {
  pointStart = pointStart
  pointEnd = pointEnd
  h = h

  const pathData = getBSRxyz(
    pointStart[0],
    pointStart[1],
    pointEnd[0],
    pointEnd[1],
    h,
  )
  return pathData
}
