<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

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

<style lang="scss">
@import 'uview-plus/index.scss';

// 字体图标
@import '@/styles/fonts.scss';
@font-face {
  font-family: 'test';
  src: url('http://38.55.232.204:8087/images/Alimama.woff');
}
view,
navigator,
input,
scroll-view {
  font-family: test;
  box-sizing: border-box;
}

button::after {
  border: none;
}

swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

// 两行省略
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
