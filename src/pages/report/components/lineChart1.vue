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
import type { RealTimeHeartRate } from '@/api/report/reportType'
const props = defineProps<{
  heartCompare: RealTimeHeartRate[]
}>()
const chartRef = ref(null)
const isShow = ref(true)
const option = ref({
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['最高心率', '最低心率'],
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.heartCompare.map((item) => item.time),
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '最高心率',
      data: props.heartCompare.map((item) => item.maxHeartRate),
      type: 'line',
    },
    {
      name: '最低心率',
      data: props.heartCompare.map((item) => item.minHeartRate),
      type: 'line',
    },
  ],
})
const getData = async () => {
  if (props.heartCompare.length === 0) {
    isShow.value = false
    return
  }
  if (!chartRef.value) return
  const myChart = await chartRef.value.init(echarts)
  myChart.setOption(option.value)
  isShow.value = true
  console.log(isShow.value)
}

watch(
  () => props.heartCompare,
  async () => {
    getData()
  },
  { deep: true },
)

onMounted(() => {
  // 组件能被调用必须是组件的节点已经被渲染到页面上
  console.log(props.heartCompare)
  getData()
})
</script>

<style lang="scss" scoped></style>
