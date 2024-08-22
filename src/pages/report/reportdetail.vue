<script setup lang="ts">
import ringChart from './components/ringChart.vue'
import lineChart from './components/lineChart.vue'
import lineChart1 from './components/lineChart1.vue'
import pressure from './components/pressure.vue'
import { customOrder, categorySort } from './utils/sort'
import dayjs from 'dayjs'
import type {
  SportType,
  SportRingType,
  ReportDetail,
  TrainingReportGrade,
  TrainingRealTimeHeartRate,
} from '@/api/report/reportType'
import { getTeamList } from '@/api/start/start'

import type { SportParams, BasicInfoDTOS, SportAchievementVO } from '@/api/report/reportType'
import { getDateReport } from '@/api/report/report'
import { sportDict, secondsToMinutes } from './utils/sportComplate'
import sportRank from './components/sportRank.vue'
import { useMemberStore } from '@/stores/modules/user'
const user = useMemberStore()
const teamType = ref(false)
const initialValue = () => {
  return {
    teamId: '', //训练队名称
    number: null,
    dateTime: dayjs().format('YYYY-MM-DD'),
  }
}
const taskId = ref()
const teamName = ref() //训练队名
const formRef = ref()
const params = ref(initialValue()) //搜索传参
const sportComplate = ref<SportAchievementVO>() //运动达成情况
const heartMap = ref() //运动强度分布图
const heartCompare = ref() //心率对比图
const sportRanks = ref() //运动排行
const SportLoads = ref() //负荷图
const teamColumns = ref<[any[]]>([[]]) //选择器
const studentList = ref<BasicInfoDTOS>()

const rules = {
  teamId: [{ required: true, message: '选择训练队', trigger: ['change'] }],
  number: [{ required: true, message: '请输入输入次数', trigger: ['blur'] }],
  dateTime: [{ required: true, message: '请输入输入时间', trigger: ['change'] }],
}
const getTeam = async () => {
  const res = await getTeamList()
  teamColumns.value[0] = res.data.map((item) => {
    return {
      label: item.teamName,
      id: item.id,
    }
  })
}
const confirm = ({ value }: { value: { id: string; label: string }[] }) => {
  params.value.teamId = value[0].id
  teamName.value = value[0].label
  teamType.value = false
}
// 重置
const reset = () => {
  params.value = initialValue()
  teamName.value = ''
  PromiseList({ taskId: taskId.value })
}
const search = () => {
  formRef.value.validate().then((valid: Boolean) => {
    if (valid) {
      PromiseList({
        ...params.value,
        startTime: dayjs(params.value.dateTime).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        endTime: dayjs(params.value.dateTime).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      })
    }
  })
}

// // 运动强度分布图
const getSportMap = async (data: TrainingReportGrade[]) => {
  customOrder.forEach((grade) => {
    const found = data.some((item) => item.grade === grade)
    if (!found) {
      data.push({
        grade,
        time: 0,
      })
    }
  })
  heartMap.value = categorySort(data, 'grade', customOrder)
}
// // 训练队心率对比图
const getHeartCompare = async (data: TrainingRealTimeHeartRate[]) => {
  heartCompare.value = data.map((item) => {
    item.time = dayjs(item.time).format('H:mm')
    return item
  })
}
// const getNumber = async () => {
//   if(params.value.dateTime&&params.value.teamId){
//   const res = await getInpNumber()
//   }
// }
// 修改返回去向
onBackPress((e) => {
  uni.switchTab({
    url: '/pages/report/report',
  })
  return true
})
// 请求队列
const PromiseList = async (data: SportParams) => {
  const res = await getDateReport(data)
  studentList.value = res.data.basicInfoDTOS
  sportComplate.value = res.data.sportAchievementVO
  sportRanks.value = {
    trainingIntensityListASC: res.data.trainingIntensityListASC,
    trainingIntensityListDEAS: res.data.trainingIntensityListDEAS,
    trainingHeartRateListASC: res.data.trainingHeartRateListASC,
    trainingHeartRateListDEAS: res.data.trainingHeartRateListDEAS,
  }
  SportLoads.value = res.data.sportLoadVO
  getSportMap(res.data.trainingReportGrades)
  getHeartCompare(res.data.trainingRealTimeHeartRates)
}
const filterDate = computed(() => {
  const sportData = sportComplate.value
  if (!sportData) {
    return {} // 如果 sportComplate.value 是 undefined 或 null，返回空对象
  }
  return Object.keys(sportComplate!.value)
    .filter((key) => Object.keys(sportDict).includes(key))
    .reduce((acc, key) => {
      acc[key] = sportComplate!.value[key]
      return acc
    }, {})
})

const toStudent = () => {
  uni.navigateTo({
    url: '/pages/report/reportdetailStu',
  })
}
onLoad((options) => {
  taskId.value = options!.taskId
  getTeam(), PromiseList({ taskId: options!.taskId })
})
</script>

<template>
  <tabBar :selected="1">
    <!-- 搜索 -->
    <up-form labelPosition="left" :model="params" :rules="rules" ref="formRef">
      <view class="top">
        <up-form-item label="训练队:" labelWidth="60" prop="teamId">
          <up-picker
            :show="teamType"
            :columns="teamColumns"
            @cancel="teamType = false"
            @confirm="confirm"
            keyName="label"
          />
          <up-button @click="teamType = true">{{ teamName ? teamName : '选择训练队' }}</up-button>
        </up-form-item>

        <up-form-item label="时间:" labelWidth="40" prop="dateTime">
          <uni-datetime-picker
            type="date"
            :clear-icon="false"
            style="width: 300rpx"
            v-model="params.dateTime"
          />
        </up-form-item>
        <up-form-item label="次数:" labelWidth="40" prop="number">
          <up-input placeholder="请输入次数" border="surround" v-model="params.number" />
        </up-form-item>
        <view>
          <up-form-item>
            <up-button
              type="primary"
              style="width: 150rpx; margin-right: 10rpx"
              text="搜索"
              @click="search"
            />
            <up-button type="success" style="width: 150rpx" text="重置" @click="reset" />
          </up-form-item>
        </view>
      </view>
    </up-form>

    <!-- 主体 -->
    <view class="main">
      <up-row gutter="10">
        <up-col span="3">
          <view class="Base_info">
            <view class="title">基础信息</view>
            <view class="Base_team"
              ><text>{{ studentList?.teamName }}</text
              ><text>授课教师:{{ studentList?.teacherName }}</text></view
            >
            <scroll-view scroll-y style="height: 132rpx">
              <view class="students">
                <text
                  class="name"
                  @click="toStudent"
                  v-for="(item, index) in studentList?.studentNameList"
                  :key="index"
                  >{{ item.name }}</text
                >
              </view>
            </scroll-view>
          </view>
        </up-col>
        <!-- 训练运动达成情况 -->
        <up-col span="9">
          <view class="Base_right">
            <view class="condition">训练运动达成情况</view>
            <up-row>
              <up-col span="3">
                <view style="padding-left: 30rpx">
                  <ringChart v-if="sportComplate" :sportComplate="sportComplate" />
                </view>
              </up-col>
              <up-col span="8">
                <view class="container">
                  <view v-for="(item, index) of filterDate" :key="index">
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
  margin-top: 0rpx;
  padding: 3rpx;
  .Base_info {
    box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 20rpx;
    padding: 30rpx 20rpx;
    min-height: 300rpx;
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
        white-space: nowrap;
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
      .item {
        display: flex;
        align-items: center;
        padding: 10px; // 内边距
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
