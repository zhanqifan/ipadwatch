<script setup lang="ts">
import type { SportLoadType } from '@/api/report/reportType'
const props = defineProps<{
  SportLoads: SportLoadType
}>()
const isShow = ref(false)
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
          ><text>{{ SportLoads.averageIntensity * 100 ?? 0 }}%&nbsp</text
          ><up-line-progress
            :percentage="SportLoads.intensityQualifiedRate * 100 ?? 0"
            active-color="#942cfc"
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
          ><text>{{ SportLoads.effectiveTrainingDensity ?? 0 }}%&nbsp</text
          ><up-line-progress
            :percentage="SportLoads.effectiveTrainingDensityQualifiedRate * 100 ?? 0"
            active-color="#942cfc"
            :showText="false"
          ></up-line-progress>
        </view>
        <view>30%-95%</view>
        <view>{{ SportLoads.effectiveTrainingDensityQualifiedNum ?? 0 }}</view>
        <view>{{ SportLoads.effectiveTrainingDensityQualifiedRate * 100 ?? 0 }}%</view>
      </view>
      <view class="title">
        <view class="left-align"
          ><image src="@/static/images/hear_avg.png" class="imageSize" />平均心率</view
        >
        <view class="row"
          ><text>{{ SportLoads.averageHeartRate ?? 0 }}%&nbsp</text
          ><up-line-progress
            :percentage="(SportLoads.averageHeartRate / 170) * 100 ?? 0"
            active-color="#942cfc"
            :showText="false"
          ></up-line-progress>
        </view>
        <view>130-170次/分</view>
        <view>/</view>
        <view>/</view>
      </view>
      <view class="title">
        <view class="left-align"
          ><image src="@/static/images/heart_max.png" class="imageSize" />平均最大心率</view
        >
        <view class="row"
          ><text>{{ SportLoads.averageMaxHeartRate ?? 0 }}%&nbsp</text
          ><up-line-progress
            :percentage="(SportLoads.averageMaxHeartRate / 200) * 100 ?? 0"
            active-color="#942cfc"
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
  font-size: 24rpx;
  min-height: 240rpx;
}
.imageSize {
  width: 30rpx;
  height: 30rpx;
}
.title {
  display: grid;
  text-align: center;
  align-items: center;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
}
.left-align {
  justify-self: start;
}
.row {
  display: flex;
  padding-left: 20rpx;
  align-items: center;
  margin-top: 13rpx;
}
</style>
