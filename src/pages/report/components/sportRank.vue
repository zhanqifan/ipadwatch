<script setup lang="ts">
import type { SportRankType, MaxHeartRateRankAsc } from '@/api/report/reportType'
const props = defineProps<{
  sportRanks: SportRankType
}>()
type DataObject = {
  [key: string]: MaxHeartRateRankAsc[]
}
const isShow = ref(false)
const controlShow = (data: DataObject) => {
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
        <view class="row"><text></text><text>姓名</text><text>心率</text></view>
        <view
          class="row1"
          v-for="(item, index) in props.sportRanks.maxHeartRateRankAsc.slice(0, 2)"
          :key="item.name"
          ><text>{{ index + 1 }}</text
          ><text>{{ item.name }}</text
          ><text>{{ item.maxHeartRate }}</text>
        </view>
      </view>
      <view>
        <view class="title">最高心率倒排行</view>
        <view class="row"><text>序号</text><text>姓名</text><text>心率</text></view>
        <view
          class="row1"
          v-for="(item, index) in props.sportRanks?.maxHeartRateRankDesc?.slice(0, 2)"
          :key="item.name"
          ><text>{{ index + 1 }}</text
          ><text>{{ item.name }}</text
          ><text>{{ item.maxHeartRate }}</text>
        </view>
      </view>
      <view>
        <view class="title">运动密度正排行</view>
        <view class="row"><text>序号</text><text>姓名</text><text>密度</text></view>
        <view
          class="row1"
          v-for="(item, index) in props.sportRanks?.intensityRankAsc?.slice(0, 2)"
          :key="index"
          ><text>{{ index + 1 }}</text
          ><text>{{ item.name }}</text
          ><text>{{ item.density }}</text>
        </view>
      </view>
      <view>
        <view class="title">运动密度倒排行</view>
        <view class="row"><text>序号</text><text>姓名</text><text>密度</text></view>
        <view
          class="row1"
          v-for="(item, index) in props.sportRanks?.intensityRankDesc?.slice(0, 2)"
          :key="index"
          ><text>{{ index + 1 }}</text
          ><text> {{ item.name }}</text
          ><text>{{ item.density }}</text>
        </view>
      </view>
    </view>
    <emptyBox v-else :size="{ width: 90, height: 90 }" />
  </view>
</template>

<style lang="scss" scoped>
.main {
  height: 20vh;
  height: 15vh;
}
.rank {
  display: flex;
  justify-content: space-around;
  .title {
    font-size: 25rpx;
    text-align: center;
  }
  .row {
    font-size: 23rpx;
    display: grid;
    text-align: center;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 20rpx;
  }
  .row1 {
    font-size: 23rpx;
    align-items: center;
    display: grid;
    text-align: center;
    margin-top: 20rpx;
    grid-template-columns: repeat(3, 1fr);
    text {
      white-space: nowrap;
    }
  }
}
</style>
