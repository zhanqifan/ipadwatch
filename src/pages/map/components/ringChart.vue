<template>
  <view>
    <view v-if="isShow" class="charts-box">
      <qiun-data-charts
        type="ring"
        :opts="opts"
        :ontouch="true"
        :canvas2d="true"
        :chartData="chartData"
      />
    </view>
    <view v-else>
      <emptyBox mode="data" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ref, watch } from 'vue'
import emptyBox from '@/components/emptyBox/index.vue'
// const props = defineProps<{ realHeart: RealTimeHeartRate[] }>()
const isShow = ref(true)
const opts = ref({
  rotate: false,
  rotateLock: false,
  color: [
    '#1890FF',
    '#91CB74',
    '#FAC858',
    '#EE6666',
    '#73C0DE',
    '#3CA272',
    '#FC8452',
    '#9A60B4',
    '#ea7ccc',
  ],
  padding: [0, 0, 0, 0],
  dataLabel: true,
  enableScroll: false,
  legend: {
    show: false,
  },
  title: {
    name: '达成率',
    fontSize: 10,
    color: '#666666',
  },
  subtitle: {
    name: '70%',
    fontSize: 10,
    color: '#7cb5ec',
  },
  extra: {
    ring: {
      ringWidth: 5,
      activeOpacity: 0.5,
      activeRadius: 10,
      offsetAngle: 0,
      labelWidth: 15,
      border: true,
      borderWidth: 3,
      borderColor: '#FFFFFF',
      linearType: 'custom',
    },
  },
})
const chartData = ref()
const getServerData = () => {
  //模拟从服务器获取数据时的延时
  setTimeout(() => {
    let res = {
      series: [
        {
          data: [
            { name: '一班', value: 50, labelShow: false },
            { name: '二班', value: 30, labelShow: false },
          ],
        },
      ],
    }
    chartData.value = res
  }, 500)
}
onMounted(() => {
  getServerData()
})
// watch(
//   () => props.realHeart,
//   () => {
//     getServerData()
//   },
// )
</script>

<style lang="scss" scoped>
.charts-box {
  width: 100%;
  height: 200rpx;
}
</style>
