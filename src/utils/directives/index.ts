import longpress from './longPress'
import draggable from './draggable'
import type { App } from 'vue' // 引入 Vue 的 App 类型（如果是 TS）
// 注册指令时使用的小写名称
const directives: any = {
  longpress, //长按
  draggable, //拖拽
}

export default {
  install(app: App) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    })
  },
}
