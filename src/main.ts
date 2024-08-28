import { createSSRApp } from 'vue'
import pinia from './stores'
import uviewPlus, { setConfig } from 'uview-plus'
import tabBar from '@/components/tabbar/tabbar.vue'
import toast from '@/components/Toast/toast.vue'
import emptyBox from '@/components/emptyBox/index.vue'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  app.component('tabBar', tabBar)
  app.component('emptyBox', emptyBox)
  app.component('toast', toast)
  app.use(uviewPlus)
  app.use(pinia)
  setConfig({
    // 修改$u.config对象的属性
    config: {
      // 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
      unit: 'rpx',
    },
    // 修改$u.props对象的属性
  })
  return {
    app,
  }
}
