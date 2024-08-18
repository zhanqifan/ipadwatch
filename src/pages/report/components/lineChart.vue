<template>
  <view>
    <view v-if="isShow" style="width: 100%; height: 100%"
      ><l-echart ref="chartRef"></l-echart
    ></view>
    <view v-else>
      <emptyBox mode="data" :size="{ width: 250, height: 250 }" />
    </view>
  </view>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { exchangeHeart } from '../utils/sort'
import type { HeartMap } from '@/api/report/reportType'
import { formatSecondsToHMS } from '../utils/timeHour'

const props = defineProps<{
  heartMap: HeartMap[]
}>()
const chartRef = ref(null)
const isShow = ref(true)
const option = ref({
  grid: {
    top: '1%',
    left: '1%', // Increase left margin
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01],
  },
  yAxis: {
    type: 'category',
    data: Object.values(exchangeHeart).map((item) => `${item.num}`),
    axisLabel: {
      textStyle: {
        fontFamily: 'test', // 使用自定义字体
      },
    },
  },
  series: [
    {
      name: '2011年',
      type: 'bar',
      data: props.heartMap?.map((item) => item.time),
      itemStyle: {
        color: '#3c9cff', // 统一设置柱子的颜色
      },
      barGap: '20rpx',

      label: {
        show: true, // 显示标签
        position: 'right', // 标签显示在柱子顶部
        color: '#000', // 标签文字颜色
        fontSize: 12, // 标签字体大小
        formatter: (params) => {
          // 使用 dayjs 对数据进行格式化
          return formatSecondsToHMS(params.value) // 修改为你需要的日期格式
        },
      },
    },
  ],
})
const getData = async () => {
  const e = props.heartMap.every((item) => item.time === 0) //都是空数据0
  if (e) {
    isShow.value = false
    return
  }
  if (!chartRef.value) return
  const myChart = await chartRef.value.init(echarts)
  myChart.setOption(option.value)
}
watch(props.heartMap, () => {})
onMounted(async () => {
  // 组件能被调用必须是组件的节点已经被渲染到页面上
  getData()
})
</script>

<style lang="scss" scoped></style>
