const longpress = {
  mounted(el: any, { value: { fn, time } }: any) {
    // 没绑定函数直接返回
    if (typeof fn !== 'function') return

    // 定义定时器变量
    el._timer = null

    // 创建计时器（ n秒后执行函数 ） 给节点绑定函数
    el._start = (e: any) => {
      //e.type表示触发的事件类型如mousedown,touchstart等
      //pc端: e.button表示是哪个键按下0为鼠标左键，1为中键，2为右键
      //移动端: e.touches表示同时按下的键为个数
      if (
        (e.type === 'mousedown' && e.button && e.button !== 0) ||
        (e.type === 'touchstart' && e.touches && e.touches.length > 1)
      )
        return

      // 定时长按n秒后执行事件
      if (el._timer === null) {
        el._timer = setTimeout(() => {
          fn()
        }, time)
        // 取消浏览器默认事件，如右键弹窗
        el.addEventListener('contextmenu', function (e: any) {
          e.preventDefault()
        })
      }
    }

    // 如果时间内松手，则取消计时器
    el._cancel = (e: any) => {
      if (el._timer !== null) {
        clearTimeout(el._timer)
        el._timer = null
      }
    }

    // 添加计时监听
    el.addEventListener('mousedown', el._start)
    el.addEventListener('touchstart', el._start)
    // 添加取消监听
    el.addEventListener('click', el._cancel)
    el.addEventListener('mouseout', el._cancel)
    el.addEventListener('touchend', el._cancel)
    el.addEventListener('touchcancel', el._cancel)
  },

  unmounted(el: any) {
    // 移除计时监听
    el.removeEventListener('mousedown', el._start)
    el.removeEventListener('touchstart', el._start)
    // 移除取消监听
    el.removeEventListener('click', el._cancel)
    el.removeEventListener('mouseout', el._cancel)
    el.removeEventListener('touchend', el._cancel)
    el.removeEventListener('touchcancel', el._cancel)
  },
}

export default longpress
