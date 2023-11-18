import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 配置模块自动导入 【分三步， 1. 安装； 2. 配置； 3. 解决类型；】
import viteAutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        viteAutoImport({
            imports: ['vue', 'vue-router', 'pinia'],
            // 自动导入自己的模块
            dirs: ['./src/api' ],
            // 解决 ts 类型报错
            dts: './src/auto-imports.d.ts'
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
