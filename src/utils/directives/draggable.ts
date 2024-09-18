export default {
  beforeMount(el: any) {
    el.style.position = 'fixed'
    const { windowHeight, windowWidth } = uni.getSystemInfoSync()
    console.log(windowHeight, windowWidth)

    const handleDragStart = (startEvent: MouseEvent | TouchEvent) => {
      let startX: number, startY: number

      if (startEvent.type === 'mousedown') {
        const e = startEvent as MouseEvent
        startX = e.clientX
        startY = e.clientY
      } else if (startEvent.type === 'touchstart') {
        const e = startEvent as TouchEvent
        startX = e.touches[0].clientX
        startY = e.touches[0].clientY
      } else {
        return
      }
      // 获取元素的初始位置
      const rect = el.getBoundingClientRect()
      const startLeft = rect.left
      const startTop = rect.top

      const handleDragMove = (moveEvent: MouseEvent | TouchEvent) => {
        let currentX: number, currentY: number
        //  双端兼容
        if (moveEvent.type === 'mousemove') {
          const e = moveEvent as MouseEvent
          currentX = e.clientX
          currentY = e.clientY
        } else if (moveEvent.type === 'touchmove') {
          const e = moveEvent as TouchEvent
          currentX = e.touches[0].clientX
          currentY = e.touches[0].clientY
        } else {
          return
        }

        const deltaX = currentX - startX
        const deltaY = currentY - startY
        // 计算新位置
        const newLeft = startLeft + deltaX
        const newTop = startTop + deltaY
        // 获取元素的宽高
        const elWidth = el.offsetWidth
        const elHeight = el.offsetHeight
        const boundedLeft = Math.min(Math.max(0, newLeft), windowWidth - elWidth)
        const boundedTop = Math.min(Math.max(0, newTop), windowHeight - elHeight)

        el.style.left = `${boundedLeft}px`
        el.style.top = `${boundedTop}px`
      }

      const handleDragEnd = () => {
        document.removeEventListener('mousemove', handleDragMove)
        document.removeEventListener('mouseup', handleDragEnd)
        document.removeEventListener('touchmove', handleDragMove)
        document.removeEventListener('touchend', handleDragEnd)
      }

      document.addEventListener('mousemove', handleDragMove)
      document.addEventListener('mouseup', handleDragEnd)
      document.addEventListener('touchmove', handleDragMove)
      document.addEventListener('touchend', handleDragEnd)
    }

    // 将 handleDragStart 绑定到 el 上
    el.__handleDragStart__ = handleDragStart

    el.addEventListener('mousedown', handleDragStart)
    el.addEventListener('touchstart', handleDragStart)
  },

  unmounted(el: any) {
    // 从 el 上获取并移除事件监听器
    const handleDragStart = el.__handleDragStart__

    if (handleDragStart) {
      el.removeEventListener('mousedown', handleDragStart)
      el.removeEventListener('touchstart', handleDragStart)
    }
  },
}
