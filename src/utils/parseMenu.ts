import type { UserMenu } from '@/api/login/types/login'
import type { RouteRecordRaw } from 'vue-router'
import IndexVue from '@/views/index.vue'

export function parseMenu(menus: UserMenu[]): any[] {
  // TYPE : 01 目录 02 菜单 03 按钮
  const notButtonMenus = menus.filter((item) => item.TYPE !== '03')
  // const routeRecordRaw: RouteRecordRaw = {
  //   name: path,
  //   path,
  //   component: pathKey !== '../views/index.vue' ? views[pathKey] : IndexVue,
  //   meta: meta as RouteMeta
  // }
  return notButtonMenus.map((item) => {
    if (item.TYPE === '02') {
      const menuRoute: RouteRecordRaw = {
        name: item.ID,
        path: item.URL,
        component: IndexVue,
        meta: {
          title: item.NAME
        }
      }
      return menuRoute
    }
    if (item.TYPE === '01' && item.nodes && item.nodes.length > 0) {
      return parseMenu(item.nodes)
    }
  })
}
