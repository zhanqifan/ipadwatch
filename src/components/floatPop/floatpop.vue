<script setup lang="ts">
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '弹窗',
  },
  width: {
    type: String,
    default: '300rpx', // 默认宽度
  },
  height: {
    type: String,
    default: '100rpx', // 默认高度
  },
  navBarHeight: {
    type: Number,
    default: 50, // 导航栏高度，单位rpx
  },
})

const showPop = ref(props.show)
const isFullScreen = ref(false)

//全屏模式切换
const toggleFullScreen = () => {
  isFullScreen.value = !isFullScreen.value
}

watch(
  () => props.show,
  (newVal) => {
    showPop.value = newVal
  },
)
defineExpose({
  toggleFullScreen,
})
</script>

<template>
  <view
    v-if="showPop"
    :class="{ 'full-screen': isFullScreen }"
    :style="{
      width: isFullScreen ? `calc(100vw - ${40}rpx)` : width,
      height: isFullScreen ? '100vh' : height,
      left: isFullScreen ? '40rpx' : '',
      top: isFullScreen ? '0rpx' : '',
    }"
    class="popup"
    v-draggable
  >
    <view class="popup-header">
      <text>{{ title }}</text>
      <button @click="toggleFullScreen">{{ isFullScreen ? '最小化' : '全屏' }}</button>
    </view>
    <view class="popup-content" :style="{ height: isFullScreen ? '100vh' : height }">
      <slot></slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.popup {
  left: 0;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.full-screen {
  width: 100vw;
  height: calc(100vh - 50rpx); // 导航栏高度，50rpx只是示例值
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10rpx;
  background-color: #f0f0f0;
}

.popup-content {
  padding: 20rpx;
  overflow: clip;
}
</style>
