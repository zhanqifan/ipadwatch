<script setup lang="ts">
import type { SportRankType } from '@/api/report/reportType'
const props = defineProps<{
  sportRanks: SportRankType
}>()

const isShow = ref(false)
const controlShow = (data: SportRankType) => {
  const keys = Object.keys(data)
  isShow.value = keys.every((item) => Array.isArray(data[item]) && data[item].length > 0)
}
onMounted(() => {
  controlShow(props.sportRanks)
})
watch(
  () => props.sportRanks,
  () => {
    controlShow(props.sportRanks)
  },
)
</script>
<template>
  <view class="main">
    <view class="rank" v-if="isShow">
      <view>
        <view class="title">最高心率正排行</view>
        <view class="row"><text>序号</text><text>姓名</text><text>心率</text></view>
        <view
          class="row1"
          v-for="(item, index) in props.sportRanks.trainingHeartRateListASC.slice(0, 2)"
          :key="item.studentName"
          ><text>{{ index + 1 }}</text
          ><text>{{ item.studentName }}</text
          ><text>{{ item.heartRate }}</text>
        </view>
      </view>
      <view>
        <view class="title">最高心率倒排行</view>
        <view class="row"><text>序号</text><text>姓名</text><text>心率</text></view>
        <view
          class="row1"
          v-for="(item, index) in props.sportRanks?.trainingHeartRateListDEAS?.slice(0, 2)"
          :key="item.studentName"
          ><text>{{ index + 1 }}</text
          ><text>{{ item.studentName }}</text
          ><text>{{ item.heartRate }}</text>
        </view>
      </view>
      <view>
        <view class="title">运动密度正排行</view>
        <view class="row"><text>序号</text><text>姓名</text><text>密度</text></view>
        <view
          class="row1"
          v-for="(item, index) in props.sportRanks?.trainingIntensityListASC?.slice(0, 2)"
          :key="index"
          ><text>{{ index + 1 }}</text
          ><text>{{ item.studentName }}</text
          ><text>{{ item.intensity }}</text>
        </view>
      </view>
      <view>
        <view class="title">运动密度倒排行</view>
        <view class="row"><text>序号</text><text>姓名</text><text>密度</text></view>
        <view
          class="row1"
          v-for="(item, index) in props.sportRanks?.trainingIntensityListDEAS?.slice(0, 2)"
          :key="index"
          ><text>{{ index + 1 }}</text
          ><text> {{ item.studentName }}</text
          ><text>{{ item.intensity }}</text>
        </view>
      </view>
    </view>
    <emptyBox v-else :size="{ width: 90, height: 90 }" />
  </view>
</template>

<style lang="scss" scoped>
.rank {
  display: flex;
  justify-content: space-around;
  .title {
    font-size: 10rpx;
    text-align: center;
  }
  .row {
    font-size: 8rpx;
    display: grid;
    text-align: center;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 8rpx;
  }
  .row1 {
    font-size: 10rpx;
    align-items: center;
    display: grid;
    text-align: center;
    margin-top: 8rpx;
    grid-template-columns: repeat(3, 1fr);
    text {
      font-size: 8rpx;
      white-space: nowrap;
    }
  }
}
</style>
