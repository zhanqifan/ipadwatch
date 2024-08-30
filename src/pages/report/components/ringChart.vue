<template>
  <view style="height: 80rpx; width: 100rpx"><l-echart ref="chartRef"></l-echart></view>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import type { SportAchievementVO } from '@/api/report/reportType'
const props = defineProps<{
  sportComplate: SportAchievementVO
}>()
const chartRef = ref<any>(null)
const completionNum = computed(() => {
  return props.sportComplate.completionNum ?? 0
})
const UncompletionNum = computed(() => {
  return props.sportComplate.totalNum - props.sportComplate.completionNum
})
const option = ref({
  legend: {
    top: '0%', // 设置图例距离顶部的距离
    left: '0%', // 设置图例距离右侧的距离
    itemWidth: 10, // 设置图例图标的宽度
    itemHeight: 10, // 设置图例图标的高度
    textStyle: {
      fontSize: 10, // 设置图例文字的大小
    },
  },

  title: {
    text: '训练负荷达成率',
    textStyle: {
      fontSize: 10, // 设置标题文字大小
      fontWeight: 'bolder', // 可选：设置标题文字加粗
      color: '#333', // 可选：设置标题文字颜色
      fontFamily: 'test',
    },

    bottom: 8, // 将标题定位到底部，距离底部 20px
    left: 'center', // 标题水平居中
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '60%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        fontSize: 16,
        lineHeight: 20,
        position: 'center',
        formatter: (params: any) => {
          // 设置默认显示第一个数据,函数接收一个参数，拿到所有配置项，遍历所有配置项，判断,下标为0的，第一个配置项信息，return 出去设置为默认值。
          if (params.dataIndex === 0) {
            return `${params.percent + '%' + '\n'}(${params.value + '人'})`
          } else {
            return ''
          }
        },
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '10',
          formatter: (params: any) => {
            //切换非默认选项配置数据展示
            if (params.dataIndex != 0) {
              return `${params.percent + '%' + '\n'}(${params.value + '人'})`
            } else {
              return
            }
          },

          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        {
          value: completionNum,
          name: '达成人数',
          itemStyle: {
            color: '#fc8923', // 设置圆环图的第一个扇区颜色
          },
        },
        {
          value: UncompletionNum,
          name: '未达成人数',
          itemStyle: {
            color: '#4fa2fd', // 设置圆环图的第二个扇区颜色
          },
        },
      ],
    },
  ],
})
watch(
  () => props.sportComplate,
  async () => {
    if (!chartRef.value) return
    const myChart = await chartRef.value.init(echarts)
    myChart.setOption(option.value)
  },
)

onMounted(async () => {
  // 组件能被调用必须是组件的节点已经被渲染到页面上
  if (!chartRef.value) return
  const myChart = await chartRef.value.init(echarts)
  myChart.setOption(option.value)
})
</script>

<style lang="scss" scoped></style>
