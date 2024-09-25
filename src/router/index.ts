import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouterGuard } from './guard'
import type { App } from 'vue'

const { VITE_BASE_URL } = import.meta.env

export const router = createRouter({
  history: createWebHistory(VITE_BASE_URL),
  routes: setupLayouts([
    {
      component: () => import('../pages/cesium/index.vue'),
      path: '/',
    },
    {
      component: () => import('../pages/three/index.vue'),
      path: '/three',
    },
  ]),
})

export async function setupRouter(app: App) {
  app.use(router)
  createRouterGuard(router)
  await router.isReady()
}
