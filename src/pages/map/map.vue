<script setup lang="ts">
import ringChart from './components/ringChart.vue'
import lineChart from './components/lineChart'
import dayjs from 'dayjs'
import { getSportIntensity } from '@/api/report/report'
import { getTeamList } from '@/api/start/start'
const show = ref(false)
const teamType = ref(false)
const emit = defineEmits()
const initialValue = () => {
  return {
    teamId: '1823528763637948418', //训练队名称
    number: 4,
    dateTime: dayjs('2024-08-14').format('YYYY-MM-DD'),
  }
}
const params = ref(initialValue())
const teamColumns = ref<[string[]]>([[]])
const getTeam = async () => {
  const res = await getTeamList()
  teamColumns.value[0] = res.data.map((item) => {
    return item.teamName
  })
}

const confirm = ({ value }) => {
  params.value.trainingTeamName = value[0]
  teamType.value = false
}

// 过滤空字段
const filterOutEmptyFields = (obj: Object) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => value), // 过滤掉值为空的键值对
  )
}
const getSportMap = async () => {
  const { dateTime, ...newParams } = filterOutEmptyFields(params.value)

  const res = await getSportIntensity({
    ...newParams,
    startTime: dayjs(params.value.dateTime).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    endTime: dayjs(params.value.dateTime).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  })
}
const search = () => {
  getReportList()
}
// 重置
const reset = () => {
  params.value = initialValue()
}

onMounted(() => {
  getTeam()
  getSportMap()
})
</script>

<template>
  <tabBar :selected="0">
    <!-- 搜索 -->
    <view class="top">
      <view>
        <up-picker
          :show="teamType"
          :columns="teamColumns"
          @cancel="teamType = false"
          @confirm="confirm"
        />
        <up-button @click="teamType = true">{{
          params.trainingTeamName ? params.trainingTeamName : '选择训练队'
        }}</up-button>
      </view>
      <view style="display: flex; align-items: center">
        <text>次数:</text>
        <up-input placeholder="请输入次数" border="surround" v-model="params.number"
      /></view>
      <view style="display: flex">
        <up-datetime-picker hasInput :show="show" v-model="params.dateTime" mode="date"
      /></view>
      <view> <up-button type="primary" style="width: 150rpx" text="搜索" @click="search" /></view>
      <view><up-button type="success" style="width: 150rpx" text="重置" @click="reset" /></view>
    </view>
    <!-- 主体 -->
    <view class="main">
      <up-row gutter="10">
        <up-col span="3">
          <view class="Base_info">
            <view class="title">基础信息</view>
            <view class="Base_team"><text>训练1队</text><text>授课教师:林老师</text></view>
            <scroll-view scroll-y>
              <view class="students">
                <text class="name" v-for="(item, index) in 10">李天宇</text>
              </view>
            </scroll-view>
          </view>
        </up-col>
        <!-- 训练运动达成情况 -->
        <up-col span="9">
          <view class="Base_right">
            <view class="condition">训练运动达成情况</view>
            <up-row>
              <up-col span="4">
                <view>
                  <ringChart />
                </view>
              </up-col>
              <up-col span="7"></up-col>
            </up-row>
          </view>
        </up-col>
      </up-row>
      <!-- 中间 -->
      <up-row class="middle" gutter="10">
        <up-col span="6">
          <view class="map1">
            <view>训练队运动强度分布图 </view>
            <view></view>
          </view>
        </up-col>
        <!-- 训练运动达成情况 -->
        <up-col span="6">
          <view class="map1">
            <view>训练队心率对比图 </view>
          </view>
        </up-col>
      </up-row>
    </view>
  </tabBar>
</template>

<style lang="scss">
.top {
  display: flex;
  gap: 50rpx;
}
.main {
  margin-top: 70rpx;
  .Base_info {
    box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 20rpx;
    padding: 20rpx;
    .title {
      padding: 10rpx 50rpx;
    }
    .Base_team {
      display: flex;
      justify-content: space-between;
      font-size: 25rpx;
    }
    .students {
      font-size: 25rpx;
      margin-top: 10rpx;
      display: grid;
      gap: 10rpx;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      .name {
        background-color: #4fa2fd;
        color: #fff;
        text-align: center;
        border-radius: 10rpx;
        padding: 2rpx;
      }
    }
  }
  .Base_right {
    box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 20rpx;
    .condition {
      padding-left: 90rpx;
      padding-top: 20rpx;
    }
  }
  .middle {
    margin-top: 50rpx;
    .map1 {
      border-radius: 10rpx;

      box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
