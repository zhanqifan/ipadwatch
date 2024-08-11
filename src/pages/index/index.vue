<script setup lang="ts">
const src = ref('https://cdn.uviewui.com/uview/album/1.jpg')
</script>

<template>
  <view class="index"
    ><up-icon name="photo"></up-icon>
    <up-image :show-loading="true" :src="src" width="80px" height="80px" @click="click"></up-image>
  </view>
</template>

<style lang="scss">
//
</style>
