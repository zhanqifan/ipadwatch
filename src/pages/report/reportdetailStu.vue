<script setup lang="ts">
import dayjs from 'dayjs'
import ringChart from './components/ringChart.vue'
import lineChart from './components/lineChart.vue'
import lineChart1 from './components/lineChart1.vue'
import type {
  TrainingRealTimeHeartRate,
  SportAchievementVO,
  StudentNameList,
  TrainingReportGrade,
  SportParams,
} from '@/api/report/reportType'
import { getTeamList } from '@/api/start/start'
import { sportDict, secondsToMinutes } from './utils/sportComplate'
import { customOrder, categorySort } from './utils/sort'
import { getStuReport, getInpNumber } from '@/api/report/report'
const initialValue = () => {
  return {
    teamId: '', //训练队名称
    number: null,
    dateTime: dayjs().format('YYYY-MM-DD'),
  }
}
const teamType = ref(false)
const formRef = ref()
const taskId = ref()
const studentId = ref()
const teamColumns = ref<[any[]]>([[]]) //选择器
const toastRef = ref() //提示框组件
const selectRef = ref() //下拉框实例
const params = ref(initialValue()) //搜索传参
const heartMap = ref() //运动强度分布图
const heartCompare = ref() //心率对比图
const teamName = ref() //训练队名
const sportComplate = ref<SportAchievementVO>() //运动达成情况
const studentList = ref<StudentNameList>() //学生列表
const isShow = ref(true)
const range = ref<any>([])

const confirm = ({ value }: { value: { id: string; label: string }[] }) => {
  params.value.teamId = value[0].id
  teamName.value = value[0].label
  teamType.value = false
}
const rules = {
  teamId: { rules: [{ required: true, errorMessage: '选择训练队', trigger: 'change' }] },
  number: { rules: [{ required: true, errorMessage: '请输入输入次数', trigger: 'change' }] },
  dateTime: { rules: [{ required: true, errorMessage: '请输入输入时间', trigger: 'change' }] },
}
const reset = () => {
  params.value = initialValue()
  teamName.value = ''
}
const search = () => {
  formRef.value.validate().then((valid: Boolean) => {
    if (valid) {
      getReportStu({
        ...params.value,
        studentId: studentId.value,
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
// 获取学生详情
const getReportStu = async (data: SportParams) => {
  const res = await getStuReport(data)
  if (checkResponse(res.data)) {
    isShow.value = false
    return
  }
  studentList.value = res.data.studentInfo
  sportComplate.value = res.data.sportAchievementVO
  getSportMap(res.data.heartRateDistributionVOList)
  getHeartCompare(res.data.realTimeHeartRate)
}
// 训练队心率对比图
const getHeartCompare = async (data: TrainingRealTimeHeartRate[]) => {
  heartCompare.value = data.map((item) => {
    item.time = dayjs(item.time).format('H:mm')
    return item
  })
}
const filterDate = computed(() => {
  const sportData = sportComplate.value
  if (!sportData) {
    return {} // 如果 sportComplate.value 是 undefined 或 null，返回空对象
  }
  return Object.keys(sportData)
    .filter((key) => Object.keys(sportDict).includes(key))
    .reduce((acc, key) => {
      acc[key] = sportData[key] as SportAchievementVO
      return acc
    }, {})
})
// 下拉框
const handleClick = async () => {
  if (params.value.dateTime && params.value.teamId) {
    const res = await getInpNumber({
      trainingTeamId: params.value.teamId,
      startTime: dayjs(params.value.dateTime).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      endTime: dayjs(params.value.dateTime).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
    })
    range.value = res.data.map((item: Number) => ({ value: item, text: item }))
  } else {
    selectRef.value.showSelector = false
    toastRef.value.showToast({
      message: '请先选择训练队和时间',
      type: 'error',
      position: 'top',
    })
  }
}
const checkResponse = (data: SportParams) => {
  const arr = Object.values(data)
  return arr.every((item) => item === null)
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
onLoad((options) => {
  taskId.value = options!.taskId
  studentId.value = options!.studentId
  getTeam()
  getReportStu({ studentId: options!.studentId, taskId: options!.taskId })
})
</script>
<template>
  <tabBar :selected="1">
    <!-- 搜索栏 -->
    <view v-if="isShow">
      <uni-forms label-align="left" :model="params" :rules="rules" ref="formRef">
        <view class="top">
          <uni-forms-item label="训练队:" labelWidth="60" name="teamId">
            <up-picker
              :show="teamType"
              :columns="teamColumns"
              @cancel="teamType = false"
              @confirm="confirm"
              keyName="label"
            />
            <up-button @click="teamType = true">{{ teamName ? teamName : '选择训练队' }}</up-button>
          </uni-forms-item>

          <uni-forms-item label="时间:" labelWidth="40" name="dateTime">
            <uni-datetime-picker
              type="date"
              class="datePicker"
              :clear-icon="false"
              v-model="params.dateTime"
            />
          </uni-forms-item>
          <uni-forms-item label="次数:" labelWidth="40" name="number">
            <uni-data-select
              ref="selectRef"
              v-model="params.number"
              :localdata="range"
              @click="handleClick"
              @change="(e) => (params.number = e)"
            ></uni-data-select>
          </uni-forms-item>
          <view>
            <uni-forms-item>
              <view class="btn">
                <up-button type="primary" class="btn_e" text="搜索" @click="search" />
                <up-button type="success" class="btn_e" text="重置" @click="reset" />
              </view>
            </uni-forms-item>
          </view>
        </view>
      </uni-forms>
      <view class="main">
        <up-row gutter="10">
          <up-col span="3">
            <view class="Base_info">
              <view class="title">基础信息</view>
              <view class="Base_team"
                ><text>{{ studentList?.name }}</text
                ><text>{{ studentList?.trainingName }}</text></view
              >

              <view class="students">
                <text class="name">最高心率：{{ studentList?.maxHeartRate }}</text>
                <text class="name rank"
                  >排名{{ studentList?.maxHeartRateRank }}/{{ studentList?.teamTotalNum }}</text
                >
                <text class="name">平均心率：{{ studentList?.averageHeartRate }}</text>
                <text class="name rank"
                  >排名{{ studentList?.averageHeartRateRank }}/{{ studentList?.teamTotalNum }}</text
                >
                <text class="name">历史最高心率：{{ studentList?.historyMaxHeartRate }}</text
                ><text></text>
                <text class="name">历史平均心率：{{ studentList?.historyAverageHeartRate }}</text>
              </view>
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
        <up-row class="middle" gutter="10">
          <up-col span="6">
            <view class="map1">
              <view style="margin-bottom: 20rpx">运动强度分布图 </view>
              <view><lineChart v-if="heartMap" :heartMap="heartMap" /></view>
            </view>
          </up-col>
          <up-col span="6">
            <view class="map1">
              <view style="margin-bottom: 20rpx">心率对比图 </view>
              <view><lineChart1 v-if="heartCompare" :heartCompare="heartCompare" /></view>
            </view>
          </up-col>
        </up-row>
      </view>
    </view>
    <emptyBox v-else :size="{ width: 350, height: 350 }" />
    <toast ref="toastRef" />
  </tabBar>
</template>

<style lang="scss" scoped>
.top {
  display: flex;
  gap: 50rpx;
  align-items: center;
  .datePicker {
    width: 300rpx;
  }
  .btn {
    display: flex;
    .btn_e {
      width: 150rpx;
      height: 70rpx;
      margin-right: 10rpx;
    }
  }
}
.main {
  margin-top: 0rpx;
  padding: 3rpx;
  .Base_info {
    box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 20rpx;
    padding: 20rpx 20rpx;
    min-height: 300rpx;
    .title {
      padding: 0rpx 0rpx;
      margin-bottom: 20rpx;
    }
    .Base_team {
      display: flex;
      justify-content: space-between;
      font-size: 25rpx;
    }
    .students {
      font-size: 23rpx;
      margin-top: 10rpx;
      display: grid;
      gap: 10rpx;
      grid-template-columns: repeat(2, 1fr); // 设定每行 3 列
      .name {
        white-space: nowrap;
        position: relative;
        background-color: transparent; // 确保 text 标签本身没有背景色
        color: black;
        text-align: start;
        &::before {
          content: '';
          display: inline-block;
          width: 14rpx; // 圆点的宽度
          height: 14rpx; // 圆点的高度
          background-color: #4fa2fd; // 圆点的颜色
          border-radius: 50%; // 使其成为圆形
          margin-right: 10rpx; // 圆点和文本之间的间隔
        }
      }
      .rank {
        text-align: center;
        &::before {
          background-color: orange;
        }
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
    margin-top: 50rpx;
    .map1 {
      border-radius: 20rpx;
      padding: 20rpx;
      border-radius: 10rpx;
      box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
