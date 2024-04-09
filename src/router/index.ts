import { createRouter, createWebHistory, type RouteMeta, type RouteRecordRaw } from 'vue-router'
import IndexVue from '../views/index.vue'

const views = import.meta.glob('../views/**/index.vue')
const metas = import.meta.glob('../views/**/meta.ts', {
  eager: true,
  import: 'default'
})
const metasEntries = Object.entries(metas)

const routes = metasEntries.map(([path, meta]) => {
  const pathKey = path.replace('/meta.ts', '/index.vue')
  path = path.replace('../views', '').replace('/meta.ts', '') || '/'
  const routeRecordRaw: RouteRecordRaw = {
    name: path,
    path,
    component: pathKey !== '../views/index.vue' ? views[pathKey] : IndexVue,
    meta: meta as RouteMeta
  }
  return routeRecordRaw
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
