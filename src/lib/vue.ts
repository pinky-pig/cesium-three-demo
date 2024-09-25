export function adjustZoom(dom?: HTMLElement | null) {
  const designWidth = 1920 // 设计的宽度
  const designHeight = 1080 // 设计的高度

  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  // 计算宽高缩放比例
  const scaleX = windowWidth / designWidth
  const scaleY = windowHeight / designHeight

  // 选择最小的缩放比例，保证页面适配窗口大小
  const scale = Math.min(scaleX, scaleY)

  if (dom) {
    dom.style.zoom = `${scale}`
  } else {
    document.body.style.zoom = `${scale}`
  }

  console.log('缩放比例：', scale)
}
