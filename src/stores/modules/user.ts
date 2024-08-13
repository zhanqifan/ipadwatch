import { getUserInfo } from '@/api/login/login'
import { defineStore } from 'pinia'
import { ref } from 'vue'
// 定义 Store
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref<{
      access_token: string
      client_id: string
      nickName: string
      roles: string
      userId: string
      userName: string
    }>()

    // 保存会员信息，登录时使用
    const setProfile = (val: any) => {
      profile.value = val
      getUser().then(() => {
        // 确保 roles 已正确设置
        if (profile.value?.roles) {
          uni.switchTab({
            url: '/pages/startDialog/start',
          })
        }
      })
    }
    // 获取个人信息
    const getUser = async () => {
      const { data } = await getUserInfo()
      const roles = data.roles[0] ? data.roles[0] : 'common'
      const userData = {
        roles,
        userId: data.user.userId,
        userName: data.user.userName,
        nickName: data.user.nickName,
      }
      profile.value = { ...profile.value!, ...userData }
    }

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined
      uni.reLaunch({
        url: '/pages/login/login',
      })
    }

    // 记得 return
    return {
      profile,
      setProfile,
      clearProfile,
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
