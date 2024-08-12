import { createSSRApp } from 'vue'
import pinia from './stores'
import uviewPlus from 'uview-plus'
import tabBar from '@/components/tabbar/tabbar.vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.component('tabBar', tabBar)
  app.use(uviewPlus)
  app.use(pinia)
  return {
    app,
  }
}
