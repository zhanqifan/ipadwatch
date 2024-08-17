<script setup lang="ts">
import { useMemberStore } from '@/stores'
const user = useMemberStore()
const exit = () => {
  user.clearProfile()
}
</script>

<template>
  <tabBar :selected="2">
    <view class="my">
      <view>教师信息：{{ user.profile?.nickName }}</view>
      <view>账号:{{ user.profile?.userName }}</view>
      <view></view>
      <button @click="exit" size="mini" plain type="warn">退出登录</button>
    </view>
  </tabBar>
</template>

<style lang="scss"></style>
