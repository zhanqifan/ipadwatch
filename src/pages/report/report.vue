<script setup lang="ts">
import dayjs from 'dayjs'
import type { reportResponse } from '@/api/report/reportType'
import { getTeamList, getTrainType } from '@/api/start/start'
import { getReport } from '@/api/report/report'
import emptyBox from '@/components/emptyBox/index.vue'
const show = ref(false)
const teamType = ref(false)
const trainType = ref(false)
const initialValue = () => {
  return {
    pageSize: 10,
    pageNum: 1,
    trainingTeamName: '', //训练队名称
    exerciseTypeName: '', //训练类型
    dateTime: dayjs().format('YYYY-MM-DD'),
  }
}
const params = ref(initialValue())
const teamColumns = ref<[string[]]>([[]])
const trainColumns = ref<[string[]]>([[]])
const reportList = ref<reportResponse[]>() //报告列表
const total = ref()
const getTeam = async () => {
  const res = await getTeamList()
  teamColumns.value[0] = res.data.map((item) => {
    return item.teamName
  })
}
const getTrain = async () => {
  const res = await getTrainType()
  trainColumns.value[0] = res.data.map((item) => item.exerciseName)
}
const confirm = ({ value }: { value: Array<any> }, type: 'team' | 'train') => {
  if (type === 'team') {
    params.value.trainingTeamName = value[0]
    teamType.value = false
  } else {
    params.value.exerciseTypeName = value[0]
    trainType.value = false
  }
}
const getReportList = async () => {
  const newParams = filterOutEmptyFields(params.value)
  const res = await getReport({
    ...newParams,
    'params[beginTime]': dayjs(params.value.dateTime).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    'params[endTime]': dayjs(params.value.dateTime).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  })
  reportList.value = res.rows
  total.value = res.total
}
// 过滤空字段
const filterOutEmptyFields = (obj: Object) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => value), // 过滤掉值为空的键值对
  )
}
const search = () => {
  params.value.pageNum = 1
  getReportList()
}
const reset = () => {
  params.value = initialValue()
  getReportList()
}
type ee = {
  type: 'next' | 'pre'
  current: number
}
const handlePage = (e: ee) => {
  if (e.type === 'next') {
    params.value.pageNum = e.current
    getReportList()
  } else {
    params.value.pageNum = e.current
    getReportList()
  }
}
const toDetail = (item: reportResponse) => {
  uni.navigateTo({
    url: `/pages/report/reportdetail?taskId=${item.id}`,
  })
}

onShow(() => {
  getTeam()
  getTrain()
  getReportList()
})
</script>
<template>
  <tabBar :selected="1">
    <view>
      <view class="top">
        <view>
          <up-picker
            :show="trainType"
            :columns="trainColumns"
            @cancel="trainType = false"
            @confirm="(e) => confirm(e, 'train')"
          />
          <up-button @click="trainType = true">{{
            params.exerciseTypeName ? params.exerciseTypeName : '选择训练类型'
          }}</up-button>
        </view>
        <view>
          <up-picker
            :show="teamType"
            :columns="teamColumns"
            @cancel="teamType = false"
            @confirm="(e) => confirm(e, 'team')"
          />
          <up-button @click="teamType = true">{{
            params.trainingTeamName ? params.trainingTeamName : '选择训练队'
          }}</up-button>
        </view>

        <view
          ><up-datetime-picker
            hasInput
            :show="show"
            v-model="params.dateTime"
            @confirm="search"
            mode="date"
        /></view>
        <view
          ><up-button type="primary" style="width: 150rpx" text="搜索" @click="search"></up-button
        ></view>
        <view
          ><up-button type="success" style="width: 150rpx" text="重置" @click="reset"></up-button
        ></view>
      </view>
      <view v-if="reportList?.length">
        <view class="list">
          <view class="card_box">
            <view class="card" v-for="(item, index) in reportList" :key="index">
              <view class="card_content">
                <view class="title">{{ item.taskName }}</view>
                <view class="type">运动类型:{{ item.exerciseTypeName }}</view>
                <view class="type">{{ item.createTime }}</view>
              </view>
              <view class="detail" @click="toDetail(item)">查看详情</view>
            </view>
          </view>
        </view>
        <uni-pagination
          class="pagination"
          :total="total"
          title="标题文字"
          prev-text="前一页"
          next-text="后一页"
          @change="handlePage"
        />
      </view>
      <emptyBox v-else :size="{ width: 300, height: 300 }" />
    </view>
  </tabBar>
</template>

<style lang="scss" scoped>
.top {
  display: flex;
  gap: 30rpx;
}
.list {
  min-height: 440rpx;
}
@media screen and (max-height: 710px) {
  .list {
    min-height: 360rpx;
  }
}

.card_box {
  display: grid;
  padding: 10rpx;
  grid-template-columns: repeat(2, 1fr);
  gap: 10rpx;
  .card {
    border-radius: 10rpx;
    background-color: #f7f8fa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10rpx;
    .card_content {
      .title {
        font-size: 13rpx;
      }
      .type {
        color: #5c5c5cc4;
        font-size: 10rpx;
      }
      view {
        margin-bottom: 5rpx;
      }
    }
    .detail {
      background-color: #4b84fa;
      padding: 8rpx;
      font-size: 11rpx;
      border-radius: 4rpx;
      color: #fff;
    }
  }
}
.pagination {
  bottom: 0%;
  left: -30rpx;
}
::v-deep.u-cell__title-text {
  color: #fdf0f0;
}
::v-deep .uni-pagination__num-tag {
  min-width: 30px;
}
</style>
