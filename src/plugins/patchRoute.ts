import { type App, type FunctionPlugin } from 'vue'
import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import router from '@/router'

export default {
  install: (app: App<Element>, options) => {
    const staticRoutes: RouteRecordRaw[] = [
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/index.vue'),
        meta: {}
      }
    ]
    // router.addRoute('/ff', )
    console.log(router.getRoutes())
    app.use(router)
  }
} as FunctionPlugin
