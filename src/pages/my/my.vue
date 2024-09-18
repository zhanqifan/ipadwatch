<script setup lang="ts">
import { useMemberStore } from '@/stores'

const user = useMemberStore()
const exit = () => {
  user.clearProfile()
}
</script>

<template>
  <tabBar :selected="2">
    <view class="container">
      <view class="card">
        <up-card title="智慧体育系统">
          <template #body>
            <view class="my">
              <view class="teacher">教师信息：{{ user.profile?.nickName }}</view>
              <view>账号: {{ user.profile?.userName }}</view>
            </view>
          </template>
          <template #foot>
            <button @click="exit" size="mini" plain type="warn">退出登录</button>
          </template>
        </up-card>
      </view>
    </view>
  </tabBar>
</template>

<style lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.floatpop {
  position: fixed;
}
.card {
  width: 30vw;
  .teacher {
    margin-bottom: 10rpx;
  }
  .my {
    font-size: 14rpx;
  }
}
</style>
