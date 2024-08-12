<script setup lang="ts">
import tabbar from '@/components/tabbar/tabbar.vue'
import { getStyleByType } from './utils/heart'
const src = ref('https://cdn.uviewui.com/uview/album/1.jpg')
</script>

<template>
  <tabbar>
    <view class="index">
      <!-- 顶部 -->
      <view class="flexBox top">
        <!-- 头像 -->
        <view class="flexBox">
          <up-avatar :src="src" shape="circle" />
          <text style="padding-left: 10rpx">李天宇老师</text>
        </view>
        <!-- 班级 -->
        <view class="flexBox"
          ><image src="@/static/images/people.png" style="width: 50rpx; height: 50rpx" />训练班级:
          一年级三班</view
        >
        <!-- 手环 -->
        <view class="flexBox"
          ><image
            src="@/static/images/watch.png"
            style="width: 50rpx; height: 50rpx"
            mode="scaleToFill"
          />
          <text>手环连接42/54</text>
        </view>
        <!-- 开始时间 -->
        <view class="flexBox"
          ><image
            src="@/static/images/clock.png"
            style="width: 50rpx; height: 50rpx"
            mode="scaleToFill"
          />
          <text>开始时间: 10:15</text></view
        >
        <up-button type="primary" class="custom-style" text="开始时间"></up-button>
      </view>
      <view class="main">
        <view class="card_group">
          <view
            v-for="item in 11"
            :key="item"
            class="card_item"
            :style="{ background: getStyleByType('heartRateBackground', 72) }"
          >
            <view
              class="status"
              :style="{ color: 72 > 150 ? '#4abc7a' : getStyleByType('heartRateColor', 70) }"
              >{{ getStyleByType('statusColor', 72) }}</view
            >
            <view class="top">
              <view>李莉莉</view>
              <view class="battery-container">
                <view class="shell" :style="{ width: 90 + '%' }">
                  <view
                    class="block"
                    :style="{ background: getStyleByType('batteryColor', 90) }"
                  ></view>
                </view>
                <view style="color: #959aa0">90%</view>
              </view>
            </view>
            <view class="heart">
              <text class="heart_rate" :style="{ color: getStyleByType('heartRateColor', 72) }"
                >72
              </text>
              <text style="color: #959aa0; font-size: 25rpx">bpm</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </tabbar>
</template>

<style lang="scss" scoped>
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.custom-style {
  height: 105rpx;
  border: none;
  margin: 0;
  width: 308rpx;
  background: #58cca5;
  border-radius: 26rpx;
}
.flexBox {
  display: flex;
  align-items: center;
}
.main {
  // background-color: #f7f8fa;
  border-radius: 20rpx;
  .card_group {
    margin-top: 40rpx;
    padding: 50rpx 90rpx;
    display: flex;
    flex-wrap: wrap; // 允许换行
    gap: 90rpx; // 控制卡片之间的间距
    .card_item {
      flex: 1 1 20%; // 允许卡片占用 20% 的宽度，且可以缩小
      // width: 23%; // 每行两个卡片，减去间距的一半
      max-width: 350rpx;
      margin-bottom: 20rpx; // 控制行之间的间距
      background-color: #f7f8fa;
      border-radius: 16rpx;
      padding: 20rpx;
      height: 164rpx;
      position: relative;
      box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);

      .status {
        top: 5rpx;
        left: 5rpx;
        font-size: 12px;
        color: #4abc7a;
        position: absolute;
        width: 50rpx;
      }
      .top {
        display: flex;
        align-items: center;
        margin-top: 10rpx;
        justify-content: space-between;
        padding: 0rpx 20rpx;
        .battery-container {
          width: 68rpx;
          height: 34rpx;
          border: 4rpx solid #3bc968;
          border-radius: 4rpx;
          position: relative;
          transform: scale(0.7);
          transform-origin: left top;
          &:after {
            content: '';
            display: block;
            height: 12rpx;
            width: 4rpx;
            position: absolute;
            background: #3bc968;
            right: -8rpx;
            top: 0;
            bottom: 0;
            margin: auto 0;
          }

          .shell {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 2rpx;
            background: #f8fafc;
            .block {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .heart {
        padding: 10rpx 20rpx;
        .heart_rate {
          font-size: 45rpx;
        }
      }
    }
  }
}
</style>
