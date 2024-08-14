import { ref, computed, onBeforeUnmount } from 'vue'

export function useTimer() {
  const timer = ref<number>(0) // 计时器的时间（以秒为单位）
  const intervalId = ref<number | null>(null)
  //  开始计时器
  const startTimer = () => {
    if (intervalId.value === null) {
      const startTime = Date.now() - timer.value * 1000
      intervalId.value = setInterval(() => {
        timer.value = Math.floor((Date.now() - startTime) / 1000)
      }, 1000) // 每 1 秒更新一次
    }
  }
  // 关闭计时器
  const stopTimer = () => {
    if (intervalId.value !== null) {
      clearInterval(intervalId.value)
      intervalId.value = null
    }
  }
  // 重置
  const resetTimer = () => {
    stopTimer()
    timer.value = 0
  }
  // 离开前关闭
  onBeforeUnmount(() => {
    if (intervalId.value !== null) {
      clearInterval(intervalId.value)
    }
  })

  // 格式化时间为 hh:mm:ss
  const formattedTime = computed(() => {
    const totalSeconds = timer.value
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const formattedHours = String(hours).padStart(2, '0')
    const formattedMinutes = String(minutes).padStart(2, '0')
    const formattedSeconds = String(seconds).padStart(2, '0')

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  })

  return {
    timer,
    formattedTime,
    startTimer,
    stopTimer,
    resetTimer,
  }
}
