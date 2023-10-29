import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import Home from '@/views/index.vue'
// 查找依赖的路由组件 视图
const views = import.meta.glob('../views/**/index.vue')
// 查找依赖的路由组件 meta 配置项
const metas = import.meta.glob('../views/**/meta.ts', {
    eager: true,
    import: 'default',
})

const metaEntries = Object.entries(metas)
// 约定式路由
const routes = metaEntries.map(([path, meta]) => {
    // 构造 views 对象中的键值
    const viewPath = path.replace('/meta.ts', '/index.vue')
    // 构造路由需要的 path 格式
    path = path.replace('../views', '').replace('/meta.ts', '') || '/'
    const routerRecordRaw: RouteRecordRaw = {
        name: path,
        path,
        // 首页路由不用懒加载
        component: viewPath === '../views/index.vue' ? Home : views[viewPath],
    }
    return routerRecordRaw
})

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router