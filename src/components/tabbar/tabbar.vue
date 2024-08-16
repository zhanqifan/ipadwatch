<script setup lang="ts">
const props = defineProps({
  selected: {
    type: Number,
    default: 0,
  },
})
type itemType = {
  icon: string
  url: string
}
const sidebarItems = ref<
  {
    icon: string
    url: string
  }[]
>([
  { icon: 'account-fill', url: '/pages/map/map' },
  { icon: 'heart', url: '/pages/startDialog/start' },
  { icon: 'calendar-fill', url: '/pages/report/report' },
  { icon: 'account-fill', url: '/pages/my/my' },
])
let { selected } = toRefs(props)
const itemClick = (item: itemType) => {
  // 处理侧边栏菜单项点击事件
  uni.switchTab({
    url: item.url,
  })
}
</script>
<template>
  <view class="sidebar-container">
    <view class="sidebar">
      <view class="sidebar-header"><image src="@/static/images/stu.png" mode="scaleToFill" /></view>
      <view class="sidebar-menu">
        <view
          class="sidebar-item"
          v-for="(item, index) in sidebarItems"
          :key="item.icon"
          @click="itemClick(item)"
        >
          <u-icon
            :name="item.icon"
            :color="selected === index ? '#86dfc1' : '#bfcbd9'"
            size="27"
          ></u-icon>
        </view>
      </view>
    </view>
    <view class="main-content">
      <slot />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.sidebar-container {
  display: flex;
  height: 720px;
}
.sidebar {
  border-radius: 20rpx;
  margin: 15rpx 0;
  background-color: #304056;
}

.sidebar-header {
  text-align: center;
  padding: 5rpx;
  image {
    width: 80rpx;
    height: 80rpx;
  }
}

.sidebar-menu {
  margin-top: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sidebar-item {
  padding: 30rpx 0rpx;
  cursor: pointer;
  transition: background-color 0.3s;
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>
