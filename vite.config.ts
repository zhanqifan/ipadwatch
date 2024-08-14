import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import dotenv from 'dotenv'
import AutoImport from 'unplugin-auto-import/vite' //npm install -D unplugin-auto-import
const env = dotenv.config() // 手动加载 .env 文件中的环境变量
// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? env.parsed?.VITE_APP_CONTEXT_PATH : '/',

  build: {
    // 开发阶段启用源码映射：https://uniapp.dcloud.net.cn/tutorial/migration-to-vue3.html#需主动开启-sourcemap
    sourcemap: process.env.NODE_ENV === 'development',
  },
  plugins: [
    uni(),
    AutoImport({
      imports: [
        // 预设
        'pinia',
        'vue',
        'uni-app',
      ],
      dts: 'src/types/auto-imports.d.ts', // 自动生成 TypeScript 类型声明文件
    }),
  ],
})
