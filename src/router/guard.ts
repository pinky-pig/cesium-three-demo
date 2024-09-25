import type { Router } from 'vue-router/auto'

export function createRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    if (to.path === '/' || to.path === '/login') {
      next()
      return
    }

    next()
    // if (appStorage.value.token) {
    //   next()
    // } else {
    //   next({ path: '/' })
    // }
  })
}
