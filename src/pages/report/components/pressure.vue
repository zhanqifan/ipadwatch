<script setup lang="ts">
import type { SportLoadType } from '@/api/report/reportType'
const props = defineProps<{
  SportLoads: SportLoadType
}>()
const isShow = ref(false)
watch(
  () => props.SportLoads,
  () => {
    isShow.value = Object.values(props.SportLoads).some(
      (value) => value !== null && value !== undefined && value !== '',
    )
  },
)
onMounted(() => {
  isShow.value = Object.values(props.SportLoads).some(
    (value) => value !== null && value !== undefined && value !== '',
  )
})
</script>
<template>
  <view class="main">
    <view v-if="isShow">
      <view class="title">
        <view></view>
        <view>实际值</view>
        <view>参考值</view>
        <view>合格人数</view>
        <view>合格率</view>
      </view>
      <view class="title">
        <view class="left-align"
          ><image src="@/static/images/heart_buil.png" class="imageSize" />平均运动强度</view
        >
        <view class="row"
          ><view class="text">{{ SportLoads.averageIntensity * 100 ?? 0 }}%</view>
          <up-line-progress
            :percentage="SportLoads.averageIntensity * 100 ?? 0"
            active-color="#ac5bff"
            :showText="false"
          ></up-line-progress>
        </view>
        <view>30%-85%</view>
        <view>{{ SportLoads.intensityQualifiedNum ?? 0 }}</view>
        <view>{{ SportLoads.intensityQualifiedRate * 100 ?? 0 }}%</view>
      </view>
      <view class="title">
        <view class="left-align"
          ><image src="@/static/images/hear_add.png" class="imageSize" />有效运动密度</view
        >
        <view class="row"
          ><view class="text">{{ SportLoads.effectiveTrainingDensity * 100 ?? 0 }}%</view>
          <up-line-progress
            :percentage="SportLoads.effectiveTrainingDensity * 100 ?? 0"
            active-color="#48daf3"
            :showText="false"
          ></up-line-progress>
        </view>
        <view>30%-95%</view>
        <view>{{ SportLoads.effectiveTrainingDensityQualifiedNum ?? 0 }}</view>
        <view>{{ SportLoads.effectiveTrainingDensityQualifiedRate ?? 0 }}%</view>
      </view>
      <view class="title">
        <view class="left-align"
          ><image src="@/static/images/hear_avg.png" class="imageSize" /><text>平均心率</text></view
        >
        <view class="row"
          ><view class="text">{{ SportLoads.averageHeartRate ?? 0 }}</view>
          <up-line-progress
            :percentage="(SportLoads.averageHeartRate / 170) * 100 ?? 0"
            active-color="#569dfe"
            :showText="false"
          ></up-line-progress>
        </view>
        <view style="white-space: nowrap">130-170次/分</view>
        <view>/</view>
        <view>/</view>
      </view>
      <view class="title">
        <view class="left-align"
          ><image src="@/static/images/heart_max.png" class="imageSize" />平均最大心率</view
        >
        <view class="row"
          ><view class="text">{{ SportLoads.averageMaxHeartRate ?? 0 }}</view>
          <up-line-progress
            :percentage="(SportLoads.averageMaxHeartRate / 200) * 100 ?? 0"
            active-color="#f361ce"
            :showText="false"
          ></up-line-progress>
        </view>
        <view>≤200次/分</view>
        <view>/</view>
        <view>/</view>
      </view>
    </view>
    <emptyBox v-else :size="{ width: 90, height: 90 }" />
  </view>
</template>

<style lang="scss" scoped>
.main {
  font-size: 9rpx;
}
.imageSize {
  width: 10rpx;
  height: 10rpx;
}
.title {
  display: grid;
  text-align: center;
  align-items: center;
  grid-template-columns: 70rpx 2fr 1fr 1fr 1fr;
  margin-top: 8rpx;
}
.left-align {
  justify-self: start;
  white-space: nowrap;
}
.row {
  display: flex;
  align-items: center;
  .text {
    min-width: 30rpx;
    text-align: center;
  }
}
</style>
