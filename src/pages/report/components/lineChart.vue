<template>
  <view>
    <view v-if="isShow" style="width: 100%; height: 30vh"
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
import type { TrainingReportGrade } from '@/api/report/reportType'

const props = defineProps<{
  heartMap: TrainingReportGrade[]
}>()
const chartRef = ref<any>(null)
const isShow = ref(true)
const data = computed(() => {
  return props.heartMap?.map((item) => item.time)
})
const yAxis = computed(() => {
  return Object.values(exchangeHeart).map((item) => `${item.name}`)
})
const gradientColors = [
  { start: '#DFEAFF', end: '#4B84FA' }, // 浅蓝到蓝
  { start: '#D8F3E3', end: '#4ABC7A' }, // 浅黄到黄
  { start: '#FFF6D6', end: '#FF9933' }, // 浅粉色到粉色
  { start: '#FFE4FA', end: '#EA78D7' }, // 浅绿到绿
  { start: 'rgba(255, 102, 102, 0.3)', end: '#EC675F' }, // 浅红到红
]
const option = ref({
  animationDuration: 3000,
  grid: {
    top: '1%',
    left: '1%', // Increase left margin
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'value',

    splitLine: {
      show: true, // 显示分割线
      lineStyle: {
        type: 'dashed', // 设置为虚线
        color: '#ccc', // 设置虚线的颜色
        width: 2, // 增加虚线的宽度，让点更大
        dashOffset: 4, // 控制虚线点的间隔
        lineDash: [4, 8], // 控制虚线点的大小和间距
      },
      interval: (index: number) => console.log(index), // 不在0位置显示分割线
    },
  },
  yAxis: {
    type: 'category',
    data: yAxis,
    inverse: true, //倒序
    axisTick: false,
  },
  series: [
    {
      type: 'bar',
      data: data,
      itemStyle: {
        color: (params: any) => {
          // 获取渐变色
          const gradientColor = gradientColors[params.dataIndex % gradientColors.length]
          return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: gradientColor.start },
            { offset: 1, color: gradientColor.end },
          ])
        },
      },
      barWidth: '20',
      label: {
        show: true, // 显示标签
        position: 'right', // 标签显示在柱子顶部
        color: '#000', // 标签文字颜色
        fontSize: 12, // 标签字体大小
        formatter: (params: any) => {
          // 使用 dayjs 对数据进行格式化
          if (!params.value) return ''
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
  const myChart = await chartRef.value.init(echarts)
  myChart.clear() // 清空图表
  myChart.setOption(option.value)
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
