import { defineStore } from 'pinia'
import { ref } from 'vue'
// 定义 Store
export const reportStore = defineStore(
  'reportStore',
  () => {
    //当页面被意外关闭 来不及删除空报告时 重新打开app或者页面时候 检查数组是否存在 存在则删除
    const reportId = ref('')

    const setReport = (item: string) => {
      reportId.value = item //存储报告id或者清空
    }
    // 记得 return
    return {
      setReport,
      reportId,
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
