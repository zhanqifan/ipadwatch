import longpress from '@/utils/directives/longPress'
import type { App } from 'vue' // 引入 Vue 的 App 类型（如果是 TS）

const directives: any = {
  longpress, // 注册指令时使用的小写名称
}

export default {
  install(app: App) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    })
  },
}
