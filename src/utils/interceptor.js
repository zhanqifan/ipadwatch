// let config = {
//   //拦截名单
//   whiteList: ['/pages/index/index'],
// }
// import { reportStore } from '@/stores'
// const report = reportStore()
// //export default function routingIntercept() {
// export default function routingIntercept() {
//   // 1、H5路由拦截,用于拦截用户地址栏输入地址
//   let locationUrl = window.location.href.split('/#')[1]
//   // if (config.whiteList.includes(locationUrl) && report.next) {

//   // }

//   ///2、uniapp跳转页面路由拦截器

//   let list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab', 'navigateBack']
//   list.forEach((item) => {
//     //用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
//     uni.addInterceptor(item, {
//       invoke(e) {
//         // 调用前拦截
//         const token = uni.getStorageSync('token'), //获取用户的token
//           url = e.url.split('?')[0] //获取要跳转的页面路径（url去掉"?"和"?"后的参数）

//         let notNeed = config.whiteList.includes(url)
//         // 如果在whiteList里面就不需要登录
//         if (notNeed) {
//           return e
//         } else {
//           if (token == '' || token == 'false' || token == null) {
//             uni.navigateTo({ url: '/pages/login/login' }) //跳转到错误页
//             return false
//           } else {
//             return e
//           }
//         }
//       },
//       fail(err) {
//         // 失败回调拦截
//         console.log(err)
//       },
//     })
//   })
// }
