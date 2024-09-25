/**
 * 将组件dom转换成真实dom
 * @param type true 返回挂载的 vue 实例 false/default 默认 dom innerHTML
 */
export function setupComponentToDom(
  component: Component,
  props: Record<string, any> = {},
  type: boolean = true,
) {
  // 不需要主动清空变量，GC回收
  const mountDom = document.createElement('div')
  const app = createApp(component, props)
  const realDom = app.mount(mountDom)
  return type ? mountDom : realDom.$el.outerHTML
}
