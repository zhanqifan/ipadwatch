<script setup lang="ts">
import ringChart from './components/ringChart.vue'
import lineChart from './components/lineChart.vue'
import lineChart1 from './components/lineChart1.vue'
import pressure from './components/pressure.vue'
import { customOrder, categorySort } from './utils/sort'
import dayjs from 'dayjs'
import type { SportType, SportRingType } from '@/api/report/reportType'
import { getTeamList } from '@/api/start/start'
import {
  HearComplate,
  getSportIntensity,
  HeartCompare,
  SportRank,
  sportLoad,
} from '@/api/report/report'
import { sportDict, secondsToMinutes } from './utils/sportComplate'
import sportRank from './components/sportRank.vue'

const show = ref(false)
const teamType = ref(false)
const initialValue = () => {
  return {
    teamId: '1823528763637948418', //训练队名称
    number: 4,
    dateTime: dayjs('2024-08-14').format('YYYY-MM-DD'),
  }
}
const params = ref(initialValue())
const sportComplate = ref<SportRingType>() //运动达成情况
const heartMap = ref() //运动强度分布图
const heartCompare = ref() //心率对比图
const sportRanks = ref() //运动排行
const SportLoads = ref()
const teamColumns = ref<[string[]]>([[]])
const getTeam = async () => {
  const res = await getTeamList()
  teamColumns.value[0] = res.data.map((item) => {
    return item.teamName
  })
}

// const confirm = ({ value }) => {
//   params.value.trainingTeamName = value[0]
//   teamType.value = false
// }

// // 过滤空字段
// const filterOutEmptyFields = (obj: Object) => {
//   return Object.fromEntries(
//     Object.entries(obj).filter(([key, value]) => value), // 过滤掉值为空的键值对
//   )
// }

// 重置
const reset = () => {
  params.value = initialValue()
}
const search = () => {}
// 运动强度分布图
const getSportMap = async (data: SportType) => {
  const res = await getSportIntensity(data)
  customOrder.forEach((grade) => {
    const found = res.data.some((item) => item.grade === grade)
    if (!found) {
      res.data.push({
        grade,
        time: 0,
      })
    }
  })
  heartMap.value = categorySort(res.data, 'grade', customOrder)
}
// 获取运动强度达成情况
const getHearComplate = async (data: SportType) => {
  const res = await HearComplate(data)
  sportComplate.value = res.data
}

// 训练队心率对比图
const getHeartCompare = async (data: SportType) => {
  const res = await HeartCompare(data)
  heartCompare.value = res.data.map((item) => {
    item.time = dayjs(item.time).format('HH时')
    return item
  })
}
const getSportRank = async (data: SportType) => {
  const res = await SportRank(data)
  sportRanks.value = res.data
  console.log(res.data)
}
const getSportLoad = async (data: SportType) => {
  const res = await sportLoad(data)
  SportLoads.value = res.data
}
onLoad((options) => {
  getSportMap({ taskId: options?.taskId })
  getHearComplate({ taskId: options?.taskId })
  getHeartCompare({ taskId: options?.taskId })
  getSportRank({ taskId: options?.taskId })
  getSportLoad({ taskId: options?.taskId })
})
</script>

<template>
  <tabBar :selected="1">
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
                <text class="name" v-for="(item, index) in 10" :key="index">李天宇</text>
              </view>
            </scroll-view>
          </view>
        </up-col>
        <!-- 训练运动达成情况 -->
        <up-col span="9">
          <view class="Base_right">
            <view class="condition">训练运动达成情况</view>
            <up-row>
              <up-col span="3" :offset="1">
                <view>
                  <ringChart v-if="sportComplate" :sportComplate="sportComplate" />
                </view>
              </up-col>
              <up-col span="8">
                <view class="container">
                  <view v-for="(item, index) of sportComplate" :key="index">
                    <view v-if="sportDict[index as keyof typeof sportDict]?.label" class="item">
                      <view
                        class="dot"
                        :style="{ background: sportDict[index as keyof typeof sportDict]?.color }"
                      ></view>
                      <view class="text">{{
                        sportDict[index as keyof typeof sportDict]?.label +
                        ':' +
                        secondsToMinutes(item!, index) +
                        sportDict[index as keyof typeof sportDict]?.unit
                      }}</view>
                    </view>
                  </view>
                </view>
              </up-col>
            </up-row>
          </view>
        </up-col>
      </up-row>
      <!-- 中间 -->
      <up-row class="middle" gutter="10">
        <up-col span="6">
          <view class="map1">
            <view style="margin-bottom: 20rpx">训练队运动强度分布图 </view>
            <view><lineChart v-if="heartMap" :heartMap="heartMap" /></view>
          </view>
        </up-col>
        <up-col span="6">
          <view class="map1">
            <view style="margin-bottom: 20rpx">训练队心率对比图 </view>
            <view><lineChart1 v-if="heartCompare" :heartCompare="heartCompare" /></view>
          </view>
        </up-col>
      </up-row>
      <!-- 底部 -->
      <up-row class="bottom" gutter="10">
        <up-col span="6"
          ><view class="map1">
            <view style="margin-bottom: 20rpx">训练队运动强度分布图 </view>
            <view><sportRank v-if="sportRanks" :sportRanks="sportRanks" /></view>
          </view>
        </up-col>
        <up-col span="6"
          ><view class="map1">
            <view style="margin-bottom: 20rpx">训练队运动负荷项目及达标情况 </view>
            <view><pressure v-if="SportLoads" :SportLoads="SportLoads" /></view>
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
  margin-top: 20rpx;
  .Base_info {
    box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 20rpx;
    padding: 30rpx 20rpx;
    .title {
      padding: 0rpx 0rpx;
      margin-bottom: 40rpx;
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
      grid-template-columns: repeat(4, 1fr); // 设定每行 3 列
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
    .container {
      display: grid;
      grid-template-columns: repeat(3, 1fr); // 设定每行 3 列
      margin: 10px; // 容器的外边距
      .item {
        display: flex;
        align-items: center;
        padding: 7px; // 内边距
        border-radius: 4px; // 圆角（可选）
      }

      .dot {
        width: 10px; // 圆点的大小
        height: 10px;
        background-color: #333; // 圆点的颜色
        border-radius: 50%; // 使其为圆形
        margin-right: 8px; // 圆点和文本之间的间隔
      }

      .text {
        white-space: nowrap; // 禁止换行
        font-size: 14px; // Adjust text size as needed
      }
    }

    .condition {
      padding-left: 30rpx;
      padding-top: 20rpx;
    }
  }
  .middle {
    margin-top: 20rpx;
    .map1 {
      border-radius: 20rpx;
      padding: 20rpx;
      border-radius: 10rpx;
      box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.1);
    }
  }
  .bottom {
    margin-top: 10rpx;
    .map1 {
      border-radius: 20rpx;
      padding: 20rpx;
      border-radius: 10rpx;
      box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
