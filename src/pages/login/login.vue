<script lang="ts" setup>
import { login } from '@/api/login/login'
import { useMemberStore } from '@/stores'
const user = useMemberStore()
const formLogin = ref({
  username: '',
  password: '',
})
const form = ref()
const rules = ref({
  username: [{ required: true, message: '用户名不为空', trigger: ['blur'] }],
  password: [
    { required: true, message: '密码不为空', trigger: ['blur'] },
    {
      min: 5,
      max: 10,
      message: '用户密码长度必须在5到20个字符之间',
      trigger: ['blur'],
    },
  ],
})
const loading = ref(false)
const toLogin = async () => {
  form.value.validate().then(async (valid: boolean) => {
    if (valid) {
      loading.value = true
      try {
        const res = await login(formLogin.value)
        if (res.code === 200) {
          user.setProfile({
            access_token: res.data.access_token,
            client_id: res.data.client_id,
          })
          loading.value = false
        } else {
          uni.showToast({
            title: res.msg,
            duration: 2000,
          })
          loading.value = false
        }
      } catch (error) {
        loading.value = false
      }
    }
  })
}
</script>
<template>
  <view class="container">
    <view class="login">
      <view class="hero">
        <text class="hero-title">智慧体育系统</text>
        <text class="hero-subtext">欢迎进入<br /></text>
      </view>
      <view class="main">
        <up-form labelPosition="left" :model="formLogin" :rules="rules" ref="form" labelWidth="0">
          <up-form-item prop="username" borderBottom>
            <up-input
              v-model="formLogin.username"
              placeholder="请输入账号"
              border="surround"
              class="input_border"
            />
          </up-form-item>
          <up-form-item prop="password" borderBottom>
            <up-input
              v-model="formLogin.password"
              placeholder="请输入密码"
              border="surround"
              class="input_border"
            />
          </up-form-item>
        </up-form>
      </view>
      <button class="login_btn" @click="toLogin" :disabled="loading" :loading="loading">
        登录
      </button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  padding: 0 16px;
}

.login {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
}

.hero {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  text-align: center;
}

.hero-title {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 16px;
}

.hero-subtext {
  color: #666;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.input-wrapper {
  margin-bottom: 20px;
  position: relative;
}

input {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.password .icon-eye {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
}

.forgot-password {
  font-size: 14px;
  color: #387ff2;
  text-align: right;
  margin-top: 8px;
}

.submit-button {
  width: 100%;
  padding: 16px;
  font-size: 18px;
  color: white;
  background-color: blue;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.separator {
  text-align: center;
  margin: 40px 0;
  position: relative;
}

.separator::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #ccc;
}

.separator text {
  background-color: #fcfcff;
  padding: 0 10px;
  position: relative;
  z-index: 1;
}

.login-options {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.icon-login {
  font-size: 24px;
  color: #666;
  background-color: white;
  padding: 12px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.icon-login:hover {
  color: white;
  background-color: #4460f1;
}
</style>
