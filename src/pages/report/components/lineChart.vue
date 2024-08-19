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

const props = defineProps<{
  heartMap: HeartMap[]
}>()
const chartRef = ref(null)
const isShow = ref(true)
const data = computed(() => {
  return props.heartMap?.map((item) => item.time)
})
const yAxis = computed(() => {
  return Object.values(exchangeHeart).map((item) => `${item.name}`)
})
const gradientColors = [
  { start: '#3c9cff', end: '#66ccff' },
  { start: '#ffcc00', end: '#ff9900' },
  { start: '#ff9966', end: '#ff6600' },
  { start: '#66cc66', end: '#339933' },
  { start: '#ff6699', end: '#cc3366' },
]
const option = ref({
  grid: {
    top: '1%',
    left: '1%', // Increase left margin
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.1],
  },
  yAxis: {
    type: 'category',
    data: yAxis,
    axisLabel: {
      textStyle: {
        fontFamily: 'test', // 使用自定义字体
      },
    },
  },
  series: [
    {
      type: 'bar',
      data: data,
      itemStyle: {
        color: (params) => {
          // 获取渐变色
          const gradientColor = gradientColors[params.dataIndex % gradientColors.length]
          return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: gradientColor.start },
            { offset: 1, color: gradientColor.end },
          ])
        },
      },
      barGap: '20rpx',

      label: {
        show: true, // 显示标签
        position: 'right', // 标签显示在柱子顶部
        color: '#000', // 标签文字颜色
        fontSize: 12, // 标签字体大小
        formatter: (params) => {
          // 使用 dayjs 对数据进行格式化
          return params.value + '秒' // 修改为你需要的日期格式
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
  isShow.value = true
  await nextTick()
  if (!chartRef.value) return
  console.log(chartRef.value)
  const myChart = await chartRef.value.init(echarts)
  myChart.clear() // 清空图表
  myChart.setOption(option.value)
  console.log(option.value)
}
watch(
  () => props.heartMap,
  () => {
    getData()
  },
)
onMounted(async () => {
  // 组件能被调用必须是组件的节点已经被渲染到页面上
  getData()
})
</script>

<style lang="scss" scoped></style>
