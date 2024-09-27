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
import type { TrainingRealTimeHeartRate } from '@/api/report/reportType'
const props = defineProps<{
  heartCompare: TrainingRealTimeHeartRate[]
}>()
const chartRef = ref<any>(null)
const isShow = ref(true)
const xAxis = computed(() => {
  return newData.value.map((item) => item.time)
})
const max = computed(() => {
  return newData.value.map((item) => item.maxHeartRate)
})
const min = computed(() => {
  return newData.value.map((item) => item.minHeartRate)
})
const newData = ref<TrainingRealTimeHeartRate[]>([])
const formatData = () => {
  const { heartCompare } = props
  newData.value = heartCompare.sort((a, b) => {
    let timeA = a.time.split(':').map(Number)
    let timeB = b.time.split(':').map(Number)
    return timeA[0] - timeB[0] || timeA[1] - timeB[1]
  })
}

const option = ref({
  animationDuration: 3000,
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: '1%', // Increase left margin
    bottom: '3%',
    right: '3%',
    containLabel: true,
  },
  legend: {
    data: ['最高心率', '最低心率'],
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: xAxis,
    axisLabel: {
      fontSize: 12, // 标签字体大小
    },
  },

  yAxis: {
    name: '次/分',
    type: 'value',
    splitNumber: 5,
    axisLabel: {
      fontSize: 12, // 标签字体大小
    },
  },
  series: [
    {
      name: '最高心率',
      data: max,
      type: 'line',
      showSymbol: false,
    },
    {
      name: '最低心率',
      data: min,
      showSymbol: false,
      type: 'line',
    },
  ],
})
const getData = async () => {
  if (props.heartCompare.length === 0) {
    isShow.value = false
    return
  }
  isShow.value = true
  // 使用 nextTick 确保视图更新完成
  await nextTick()
  if (!chartRef.value) return
  const myChart = await chartRef.value.init(echarts)
  myChart.setOption(option.value)
  isShow.value = true
}
watch(
  () => props.heartCompare,
  () => {
    formatData()
    getData()
  },
)

onMounted(() => {
  // 组件能被调用必须是组件的节点已经被渲染到页面上
  getData()
  console.log(formatData())
})
</script>

<style lang="scss" scoped></style>
