// global-components.ts
import type { App, Component } from 'vue' // 引入 Vue 的 App 类型（如果是 TS）

// 导入组件
import tabBar from '@/components/tabbar/tabbar.vue'
import toast from '@/components/Toast/toast.vue'
import emptyBox from '@/components/emptyBox/index.vue'
import model from '@/components/model/model.vue'

const components: Component = {
  tabBar,
  toast,
  emptyBox,
  model,
}
// 创建 install 方法用于全局注册
export default {
  install(app: App) {
    Object.keys(components).forEach((key) => {
      app.component(key, components[key])
    })
  },
}
