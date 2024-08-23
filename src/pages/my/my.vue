<script setup lang="ts">
import { useMemberStore } from '@/stores'
const user = useMemberStore()
const exit = () => {
  user.clearProfile()
}
</script>

<template>
  <tabBar :selected="2">
    <view class="card">
      <up-card title="智慧体育系统">
        <template #body>
          <view class="my">
            <view>教师信息：{{ user.profile?.nickName }}</view>
            <view>账号:{{ user.profile?.userName }}</view>
          </view>
        </template>
        <template #foot>
          <button @click="exit" size="mini" plain type="warn">退出登录</button>
        </template>
      </up-card>
    </view>
  </tabBar>
</template>

<style lang="scss">
.card {
  width: 30vw;
}
</style>
