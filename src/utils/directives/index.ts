import longpress from '@/utils/directives/longPress'

const directives = {
  longpress, // 注册指令时使用的小写名称
}

export default {
  install(app: any) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    })
  },
}
