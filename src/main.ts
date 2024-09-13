import { createSSRApp } from 'vue'
import pinia from './stores'
import uviewPlus, { setConfig } from 'uview-plus'
import tabBar from '@/components/tabbar/tabbar.vue'
import toast from '@/components/Toast/toast.vue'
import emptyBox from '@/components/emptyBox/index.vue'
import directives from '@/utils/directives/index' // 引入自定义指令插件
import '@/styles/global.scss'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)

  app.component('tabBar', tabBar)
  app.component('emptyBox', emptyBox)
  app.component('toast', toast)
  // 使用 uview-plus
  app.use(uviewPlus)
  app.use(pinia)
  app.use(directives)
  return {
    app,
  }
}
