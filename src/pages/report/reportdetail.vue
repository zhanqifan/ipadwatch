<script setup lang="ts">
import { getDetail } from '@/api/report/report'
import type { ReportDetail } from '@/api/report/reportType'
import duration from 'dayjs/plugin/duration'
import dayjs from 'dayjs'
dayjs.extend(duration)
const loading = ref(false)
const tableData = ref<ReportDetail>()
const getReportList = async (taskId: string) => {
  loading.value = true
  const res = await getDetail(taskId)
  tableData.value = res.data
  loading.value = false
}
onLoad((options) => {
  getReportList(options!.taskId)
})
</script>
<template>
  <view>
    <view class="title">
      <text>训练队伍名称:{{ tableData?.trainingName }} </text
      ><text>训练类型:{{ tableData?.trainingType }}</text>
      <text
        >训练时长:{{ dayjs.duration(tableData?.trainingDate, 'seconds').format('HH:mm:ss') }}</text
      ></view
    >
    <uni-table
      ref="table"
      :loading="loading"
      border
      stripe
      type="selection"
      emptyText="暂无更多数据"
    >
      <uni-tr>
        <uni-th align="center">姓名</uni-th>
        <uni-th align="center">最低心率</uni-th>
        <uni-th align="center">最高心率</uni-th>
      </uni-tr>
      <uni-tr v-for="(item, index) in tableData?.fullDetailsReportVoList" :key="index">
        <uni-td align="center">{{ item.studentName }}</uni-td>
        <uni-td align="center">{{ item.minHeartRate }} </uni-td>
        <uni-td align="center">{{ item.maxHeartRate }}</uni-td>
      </uni-tr>
    </uni-table>
  </view>
</template>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: center;
  gap: 50rpx;
  margin: 50rpx 0;
}
</style>
