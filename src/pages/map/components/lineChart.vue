<script setup lang="ts">
import { exchangeHeart } from '../utils/sort'
import type { HeartMap } from '@/api/report/reportType'
import { formatSecondsToHMS } from '../utils/timeHour'
import emptyBox from '@/components/emptyBox/index.vue'
const props = defineProps<{
  heartMap: HeartMap[]
}>()
const maxNum = ref()
const heartList = ref()
const color = [
  '#ef2591',
  '#7b3d00',
  '#185782',
  '#19be6b',
  '#2979ff',
  '#ff9900',
  '#fa3534',
  '#f0f000',
  '#4c0079',
]
// 取最大值 作为100%
const getMax = (arr: HeartMap[]) => {
  isShow.value = arr.some((item) => item.time! > 0)
  if (!isShow) return
  maxNum.value = arr.reduce((max, item) => (item.time! > max.time! ? item : max), arr[0])
  computeNum()
}
// 格式转换 百分比数值计算
const computeNum = () => {
  const { time } = maxNum.value
  heartList.value = props.heartMap.map((item) => ({
    percentage: (item.time! / time) * 100,
    time: formatSecondsToHMS(item.time!),
    grade: exchangeHeart[item.grade].name,
    num: exchangeHeart[item.grade].num,
  }))
}
const isShow = ref(true)

onMounted(() => {
  getMax(props.heartMap)
})
watch(
  () => props.heartMap,
  () => {
    getMax(props.heartMap)
    console.log(heartList.value)
  },
)
</script>
<template>
  <view>
    <view v-if="isShow">
      <view class="row" v-for="(item, index) in heartList" :key="item.grade">
        <view class="row_status">
          <view>{{ item.grade }}</view>
          <view class="num">{{ item.num }}</view>
        </view>
        <view class="row_time">
          <up-line-progress
            :percentage="item.percentage"
            :activeColor="color[index]"
            :showText="false"
          ></up-line-progress>
          <view class="time">{{ item.time }}</view>
        </view>
      </view>
    </view>
    <view v-else>
      <emptyBox mode="data" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.row {
  margin-top: 30rpx;
  margin-left: 20rpx;
  display: flex;
  align-items: center;
  .row_status {
    width: 150rpx;
    font-size: 25rpx;
    .num {
      font-size: 22rpx;
      color: #c4c1c1;
    }
  }
  .row_time {
    flex: 1;
    .time {
      padding-top: 10rpx;
      float: right;
      font-size: 20rpx;
      color: #c4c1c1;
    }
  }
}
</style>
