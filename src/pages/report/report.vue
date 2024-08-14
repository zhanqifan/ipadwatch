<script setup lang="ts">
import dayjs from 'dayjs'
import type { reportResponse } from '@/api/report/reportType'
import { getTeamList, getTrainType } from '@/api/start/start'
import { getReport } from '@/api/report/report'
const show = ref(false)
const teamType = ref(false)
const trainType = ref(false)
const params = ref({
  pageSize: 10,
  pageNum: 1,
  trainingTeamName: '', //训练队名称
  exerciseTypeName: '', //训练类型
})
const dateTime = ref(dayjs().format('YYYY-MM-DD'))
const teamColumns = ref<[string[]]>([[]])
const trainColumns = ref<[string[]]>([[]])
const reportList = ref<reportResponse[]>()
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
const confirm = ({ value }, type: 'team' | 'train') => {
  if (type === 'team') {
    params.value.trainingTeamName = value[0]
    teamType.value = false
  } else {
    params.value.exerciseTypeName = value[0]
    trainType.value = false
  }
}
const getReportList = async () => {
  console.log(dateTime.value)
  const newParams = filterOutEmptyFields(params.value)
  console.log(newParams)
  const res = await getReport({
    ...newParams,
    'params[beginTime]': dayjs(dateTime.value).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    'params[endTime]': dayjs(dateTime.value).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  })
  reportList.value = res.rows
}
const filterOutEmptyFields = (obj: Object) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => value), // 过滤掉值为空的键值对
  )
}
const scrolltolower = () => {
  console.log('触底')
}
onMounted(() => {
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
            :show="teamType"
            :columns="teamColumns"
            @cancel="teamType = false"
            @confirm="(e) => confirm(e, 'team')"
          />
          <up-button @click="teamType = true">{{
            params.trainingTeamName ? params.trainingTeamName : '选择训练队'
          }}</up-button>
        </view>
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
        <view><up-datetime-picker hasInput :show="show" v-model="dateTime" mode="date" /></view>
        <view><up-button type="primary" style="width: 150rpx" text="搜索"></up-button></view>
        <view><up-button type="success" style="width: 150rpx" text="重置"></up-button></view>
      </view>
      <up-list @scrolltolower="scrolltolower">
        <up-list-item v-for="(item, index) in reportList" :key="item.id" style="margin-top: 40rpx">
          <up-cell
            :title="`队名：${item.taskName}  -- 人数：${item.personNum}人 --  运动类型：${
              item.exerciseTypeName
            } -- 时间：${dayjs(item.createTime).format('YYYY-MM-DD')} `"
          >
            <!-- <template #icon>
              <up-avatar
                shape="square"
                size="35"
                :src="item.url"
                customStyle="margin: -3px 5px -3px 0"
              ></up-avatar>
            </template> -->
          </up-cell>
        </up-list-item>
      </up-list>
    </view>
  </tabBar>
</template>

<style lang="scss" scoped>
.top {
  display: flex;
  gap: 50rpx;
}
</style>
