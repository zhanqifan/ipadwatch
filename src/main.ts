import { createSSRApp } from 'vue'
import pinia from './stores'
import uviewPlus from 'uview-plus'
import globalComponents from './components/global-components'
import directives from '@/utils/directives/index' // 引入自定义指令插件
import '@/styles/global.scss'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  // 使用 uview-plus
  app.use(globalComponents)
  app.use(uviewPlus)
  app.use(pinia)
  app.use(directives)
  return {
    app,
  }
}
