const longpress = {
  mounted(el: any, { value: { fn, time = 2000 } }: any) {
    // 如果未绑定函数，直接返回
    if (typeof fn !== 'function') return

    // 定义定时器变量和初始状态
    el._timer = null
    el._startX = 0
    el._startY = 0
    el._moved = false
    el._isLongPress = false // 标识是否是长按
    // 触摸开始事件
    el._start = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 1) return // 忽略多指触控
      // 移动设备，记录初始触摸点坐标
      const touch = e.touches
      if (touch) {
        el._startX = touch[0].pageX
        el._startY = touch[0].pageY
      }

      el._moved = false
      el._isLongPress = false // 每次触摸开始时重置长按标识

      // 定时长按
      el._timer = setTimeout(() => {
        el._isLongPress = true // 触发长按
        fn() // 执行传入的函数
      }, time)

      // 阻止长按弹出菜单
      el.addEventListener('contextmenu', function (e) {
        e.preventDefault()
      })
    }

    // 触摸移动事件，检测是否移动
    el._move = (e: TouchEvent) => {
      const moveX = e.touches[0].pageX
      const moveY = e.touches[0].pageY
      const diffX = Math.abs(moveX - el._startX)
      const diffY = Math.abs(moveY - el._startY)

      // 如果移动距离超过10像素，认为是滑动，取消长按
      if (diffX > 10 || diffY > 10) {
        el._moved = true
        clearTimeout(el._timer)
        el._timer = null
      }
    }

    // 触摸结束事件
    el._end = (e: TouchEvent) => {
      // 如果已经移动过，认为是滑动而不是单击
      if (el._moved) return

      // 如果长按触发了，取消计时器并不做单击操作
      if (el._isLongPress) {
        clearTimeout(el._timer)
        el._timer = null
        return
      }

      // 如果没有触发长按，认为是单击操作
      if (el._timer !== null) {
        clearTimeout(el._timer)
        el._timer = null
      }
    }

    // 取消操作事件
    el._cancel = () => {
      if (el._timer !== null) {
        clearTimeout(el._timer)
        el._timer = null
      }
    }

    // 绑定事件
    el.addEventListener('touchstart', el._start)
    el.addEventListener('touchmove', el._move)
    el.addEventListener('touchend', el._end)
    el.addEventListener('touchcancel', el._cancel)
  },

  unmounted(el: any) {
    // 解绑事件
    el.removeEventListener('touchstart', el._start)
    el.removeEventListener('touchmove', el._move)
    el.removeEventListener('touchend', el._end)
    el.removeEventListener('touchcancel', el._cancel)
  },
}

export default longpress
