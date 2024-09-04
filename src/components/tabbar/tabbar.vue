<script setup lang="ts">
const props = defineProps({
  selected: {
    type: Number,
    default: 0,
  },
  backUrl: {
    url: String,
    default: '',
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
  { icon: 'heart', url: '/pages/startDialog/start' },
  { icon: 'calendar-fill', url: '/pages/report/report' },
  { icon: 'account-fill', url: '/pages/my/my' },
])
const app = uni.getSystemInfoSync()
const pageHeight = ref('100vh') // 初始化页面高度
onMounted(() => {
  const safeAreaTop = app.safeAreaInsets?.top || 0
  const vh = uni.getWindowInfo().windowHeight //获取屏幕用宽度
  const calculatedHeight = vh
  pageHeight.value = `${calculatedHeight}px` // 动态计算高度并设置
})
let { selected } = toRefs(props)
const itemClick = (item: itemType) => {
  // 处理侧边栏菜单项点击事件
  uni.switchTab({
    url: item.url,
  })
}
const back = () => {
  if (props.backUrl) {
    uni.navigateTo({
      url: props.backUrl,
    })
  } else {
    uni.navigateBack({ delta: 1 })
  }
}
onLaunch(() => {
  uni.hideTabBar()
  console.log('App Launch')
})
onShow(() => {
  uni.hideTabBar()
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<template>
  <view
    class="sidebar-container"
    :style="{ paddingTop: app.safeAreaInsets?.top + 'rpx', height: '100vh' }"
  >
    <view class="sidebar">
      <view class="sidebar-header"
        ><image src="@/static/images/stu.png" mode="scaleToFill" @click="back"
      /></view>
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
      <scroll-view scroll-y>
        <slot />
      </scroll-view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.page {
  height: 100%;
}
.sidebar-container {
  display: flex;
}
.sidebar {
  border-radius: 10rpx;
  background-color: #304056;
  height: 100%; // 改为使用父容器高度
}

.sidebar-header {
  text-align: center;
  padding: 5rpx 3rpx;
  image {
    width: 32rpx;
    height: 32rpx;
  }
}

.sidebar-menu {
  margin-top: 10rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sidebar-item {
  padding: 13rpx 0rpx;
  cursor: pointer;
  transition: background-color 0.3s;
}

.main-content {
  flex: 1;
  padding: 14rpx;
  font-size: 15rpx;
  max-height: max-content;
}
</style>
