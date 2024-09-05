import { defineStore } from 'pinia'
import { ref } from 'vue'
// 定义 Store
export const reportStore = defineStore(
  'reportStore',
  () => {
    const next = ref(true)

    const setNext = (isNext: boolean) => {
      next.value = isNext
    }
    // 记得 return
    return {
      setNext,
    }
  },
  // TODO: 持久化
  {
    persist: {
      // 调整为兼容多端的API
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        },
      },
    },
  },
)
