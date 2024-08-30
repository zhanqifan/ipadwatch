<script setup lang="ts">
import ringChart from './components/ringChart.vue'
import lineChart from './components/lineChart.vue'
import lineChart1 from './components/lineChart1.vue'
import pressure from './components/pressure.vue'
import sportRank from './components/sportRank.vue'
import { customOrder, categorySort } from './utils/sort'
import dayjs from 'dayjs'
import type {
  TrainingReportGrade,
  TrainingRealTimeHeartRate,
  SportParams,
  BasicInfoDTOS,
  SportAchievementVO,
} from '@/api/report/reportType'
import { getTeamList } from '@/api/start/start'
import { getDateReport, getInpNumber } from '@/api/report/report'
import { sportDict, secondsToMinutes } from './utils/sportComplate'
const teamType = ref(false)
const initialValue = () => {
  return {
    teamId: '', //训练队名称
    number: null,
    dateTime: dayjs().format('YYYY-MM-DD'),
  }
}
const isShow = ref(true)
const taskId = ref() //报告id
const toastRef = ref() //提示框组件
const selectRef = ref() //下拉框实例
const teamName = ref() //训练队名
const formRef = ref() //表单实例
const params = ref(initialValue()) //搜索传参
const sportComplate = ref<SportAchievementVO>() //运动达成情况
const heartMap = ref() //运动强度分布图
const heartCompare = ref() //心率对比图
const sportRanks = ref() //运动排行
const SportLoads = ref() //负荷图
const teamColumns = ref<[any[]]>([[]]) //选择器
const studentList = ref<BasicInfoDTOS>() //学生列表
const range = ref<any>([])
const rules = {
  teamId: { rules: [{ required: true, errorMessage: '选择训练队', trigger: 'change' }] },
  number: { rules: [{ required: true, errorMessage: '请输入输入次数', trigger: 'change' }] },
  dateTime: { rules: [{ required: true, errorMessage: '请输入输入时间', trigger: 'change' }] },
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
  heartCompare.value = data.reverse().map((item) => {
    item.time = dayjs(item.time).format('H:mm')
    return item
  })
}
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

// 修改返回去向
onBackPress((e) => {
  console.log(e)
  uni.switchTab({
    url: '/pages/report/report',
  })
  return true
})
// 报表数据
const PromiseList = async (data: SportParams) => {
  const res = await getDateReport(data)
  if (checkResponse(res.data)) {
    isShow.value = false
    return
  }
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
// 判断是否空数据
const checkResponse = (data: SportParams) => {
  const arr = Object.values(data)
  return arr.every((item) => item === null)
}
// 过滤运动达成情况
const filterDate = computed(() => {
  const sportData = sportComplate.value
  if (!sportData) {
    return {} // 如果 sportComplate.value 是 undefined 或 null，返回空对象
  }
  return Object.keys(sportData)
    .filter((key) => Object.keys(sportDict).includes(key))
    .reduce((acc, key) => {
      acc[key] = sportData[key]
      return acc
    }, {} as SportAchievementVO)
})
// 跳转学生详情
const toStudent = (item: BasicInfoDTOS) => {
  uni.navigateTo({
    url: `/pages/report/reportdetailStu?studentId=${item.id}&taskId=${taskId.value}`,
  })
}
onLoad((options) => {
  taskId.value = options!.taskId
  getTeam(), PromiseList({ taskId: options!.taskId })
})
</script>

<template>
  <tabBar :selected="1">
    <view v-if="isShow">
      <!-- 搜索 -->
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

      <!-- 主体 -->
      <view class="main">
        <view class="main_top">
          <view class="Base_info">
            <view class="Base_team">
              <view class="title">学生名单</view>
              <view>{{ studentList?.teamName }}</view>
            </view>
            <scroll-view scroll-y style="height: 50rpx">
              <view class="students">
                <text
                  class="name"
                  v-for="(item, index) in studentList?.studentNameList"
                  @click="toStudent(item)"
                  :key="index"
                  >{{ item.name }}</text
                >
              </view>
            </scroll-view>
          </view>
          <!-- 训练运动达成情况 -->

          <view class="Base_right">
            <view class="condition">训练运动达成情况</view>
            <view class="condition_main">
              <view class="charts">
                <ringChart v-if="sportComplate" :sportComplate="sportComplate" />
              </view>
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
            </view>
          </view>
        </view>
        <!-- 中间 -->
        <view class="middle">
          <view class="map1">
            <view style="margin-bottom: 20rpx">训练队运动强度分布图 </view>
            <view><lineChart v-if="heartMap" :heartMap="heartMap" /></view>
          </view>
          <view class="map1">
            <view style="margin-bottom: 20rpx">训练队心率对比图 </view>
            <view><lineChart1 v-if="heartCompare" :heartCompare="heartCompare" /></view>
          </view>
        </view>
        <!-- 底部 -->
        <view class="bottom">
          <view class="map1">
            <view style="margin-bottom: 6rpx">训练队运动强度分布图 </view>
            <view><sportRank v-if="sportRanks" :sportRanks="sportRanks" /></view>
          </view>

          <view class="map1">
            <view style="margin-bottom: 0rpx">训练队运动负荷项目及达标情况 </view>
            <view><pressure v-if="SportLoads" :SportLoads="SportLoads" /></view>
          </view>
        </view>
      </view>

      <!-- 消息提示 -->
      <toast ref="toastRef" />
    </view>
    <emptyBox v-else :size="{ width: 350, height: 350 }" />
  </tabBar>
</template>

<style lang="scss">
.top {
  display: flex;
  gap: 10rpx;
  align-items: center;
  margin-bottom: -7rpx;
  .datePicker {
    width: 100rpx;
  }
  .btn {
    display: flex;
    .btn_e {
      width: 70rpx;
      height: 22rpx;
      margin-right: 10rpx;
    }
  }
}

.main {
  padding: 3rpx;
  .main_top {
    display: flex;
    gap: 0 13rpx;
  }
  .Base_info {
    box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 10rpx;
    padding: 10rpx 10rpx;
    width: 23vw;
    .title {
      padding: 0rpx 0rpx;
    }
    .Base_team {
      display: flex;
      justify-content: space-between;
      font-size: 10rpx;
    }
    .students {
      font-size: 8rpx;
      margin-top: 8rpx;
      display: grid;
      gap: 10rpx;
      grid-template-columns: repeat(4, 1fr); // 设定每行 3 列
      .name {
        background-color: #4fa2fd;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        border-radius: 3rpx;
        padding: 2rpx;
      }
    }
  }
  .Base_right {
    box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 10rpx;
    width: 67vw;

    .condition {
      padding-left: 20rpx;
      padding-top: 5rpx;
    }
    .condition_main {
      display: flex;
      align-items: center; /* 垂直居中对齐 */
      justify-content: space-between;
      .charts {
        margin-left: 18rpx;
      }
      .container {
        display: grid;
        grid-template-columns: repeat(3, 1fr); // 设定每行 3 列
        .item {
          display: flex;
          align-items: center;
          padding: 6rpx; // 内边距
          border-radius: 4px; // 圆角（可选）
        }
        .dot {
          width: 6rpx; // 圆点的大小
          height: 6rpx;
          background-color: #333; // 圆点的颜色
          border-radius: 50%; // 使其为圆形
          margin-right: 5rpx; // 圆点和文本之间的间隔
        }

        .text {
          white-space: nowrap; // 禁止换行
          font-size: 14px; // Adjust text size as needed
        }
      }
    }
  }

  .middle {
    margin-top: 5rpx;
    display: flex;
    gap: 0 10rpx;
    .map1 {
      flex: 1;
      border-radius: 10rpx;
      padding: 10rpx;
      border-radius: 10rpx;
      box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(0, 0, 0, 0.1);
    }
  }
  .bottom {
    margin-top: 5rpx;

    display: flex;
    gap: 8rpx;
    .map1 {
      flex: 1;
      border-radius: 20rpx;
      padding: 10rpx;
      border-radius: 10rpx;
      box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
