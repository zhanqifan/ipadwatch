export interface LoginData {
  tenantId?: string
  username?: string
  password?: string
  rememberMe?: boolean
  socialCode?: string
  socialState?: string
  source?: string
  code?: string
  uuid?: string
  clientId?: string
  grantType?: string
}
export interface LoginResult {
  access_token: string
  client_id: string
}

// 个人信息响应体
export interface UserInfo {
  user: User
  permissions: any[]
  roles: any[]
}
interface User {
  userId: string
  tenantId: string
  deptId: string
  userName: string
  nickName: string
  userType: string
  email: string
  phonenumber: string
  sex: string
  avatar: null
  status: string
  loginIp: string
  loginDate: string
  remark: null
  createTime: string
  dept: Dept
  roles: any[]
  roleIds: null
  postIds: null
  roleId: null
}

interface Dept {
  deptId: string
  parentId: null
  parentName: null
  ancestors: null
  deptName: null
  orderNum: null
  leader: null
  leaderName: null
  phone: null
  email: null
  status: null
  createTime: null
}
