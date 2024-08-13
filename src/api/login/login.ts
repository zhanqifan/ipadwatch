import { request } from '@/utils/https'
import type { LoginData, LoginResult, UserInfo } from './loginType'
const clientId = import.meta.env.VITE_APP_CLIENT_ID
// 登录
export function login(data: LoginData) {
  const params = {
    ...data,
    clientId: data.clientId || clientId,
    grantType: data.grantType || 'password',
  }
  return request<LoginResult>({
    url: '/auth/login',
    header: {
      isToken: false,
      isEncrypt: false,
    },
    method: 'POST',
    data: params,
  })
}
// 获取个人信息
export const getUserInfo = () => {
  return request<UserInfo>({
    url: '/system/user/getInfo',
    method: 'GET',
  })
}
