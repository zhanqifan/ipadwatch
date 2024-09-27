import { defineStore } from 'pinia'
import { ref } from 'vue'
// 定义 Store
export const exceriseStore = defineStore(
  'exceriseStore',
  () => {
    const isSport = ref(false)

    const changeSport = (val: boolean) => {
      isSport.value = val
    }
    return {
      changeSport,
      isSport,
    }
  },
  // TODO: 持久化
)
