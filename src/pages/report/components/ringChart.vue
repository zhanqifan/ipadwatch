<template>
  <view style="height: 240rpx; width: 300rpx"><l-echart ref="chartRef"></l-echart></view>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import type { SportRingType } from '@/api/report/reportType'
const props = defineProps<{
  sportComplate: SportRingType
}>()
const chartRef = ref(null)
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
      name: '访问来源',
      type: 'pie',
      radius: ['40%', '60%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '10',
          formatter: '{b}\n{c}', // 标签内容格式
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        {
          value: props.sportComplate.completionNum,
          name: '达成人数',
          itemStyle: {
            color: '#fc8923', // 设置圆环图的第一个扇区颜色
          },
        },
        {
          value: props.sportComplate.totalNum - props.sportComplate.completionNum,
          name: '未达成人数',
          itemStyle: {
            color: '#6c64fc', // 设置圆环图的第二个扇区颜色
          },
        },
      ],
    },
  ],
})

onMounted(async () => {
  // 组件能被调用必须是组件的节点已经被渲染到页面上
  setTimeout(async () => {
    if (!chartRef.value) return
    const myChart = await chartRef.value.init(echarts)
    myChart.setOption(option.value)
    // 添加点击事件处理
    myChart.on('click', (params: any) => {
      // 高亮显示
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: params.seriesIndex,
        dataIndex: params.dataIndex,
      })

      // 1秒后取消高亮
      setTimeout(() => {
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: params.seriesIndex,
          dataIndex: params.dataIndex,
        })
      }, 1000)
    })
  }, 1000)
})
</script>

<style lang="scss" scoped></style>
