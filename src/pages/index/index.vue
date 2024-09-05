<script setup lang="ts">
import { getStyleByType } from './utils/heart'
import { taskBaseInfo, detectionData, updateTask } from '@/api/heart/heart'
import type { startData } from '@/api/heart/heartType'
import type { MergedInterface } from '@/api/heart/heartType'
import { useTimer } from './utils/Timer'
import { useMemberStore } from '@/stores'
const src = ref('https://cdn.uviewui.com/uview/album/1.jpg')
const BaseInfo = ref<MergedInterface>() //基础学生卡片信息
const btnShow = ref(true) //按钮开关状态
const intervalId = ref<number | null>(null) //定时器id
const user = useMemberStore()
const clock = useTimer()
const watchOnline = ref({
  //手表在线信息
  braceletsOnlineNum: 0,
  braceletsTotalNum: 0,
})
// 开始记录传参
const startParams = ref<startData>({
  taskId: '',
  studentIds: [],
  isRecord: false,
  number: 0,
})
// 获取学生列表
const getHeartList = async (taskId: string) => {
  const res = await taskBaseInfo(taskId)
  res.data.studentInfoList.forEach((item) => {
    item.status = 1 //增加字段用于离线判定
  })
  BaseInfo.value = res.data
  console.log(res.data.studentInfoList)
}

// 开始定时器
const startInterval = async () => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value) // 避免多次启动定时器
  }
  intervalId.value = setInterval(immediateWatch, 1000) // 每1秒轮询一次
}

const immediateWatch = async () => {
  const res = await detectionData({
    ...startParams.value,
    studentIds: BaseInfo.value?.students as number[],
  })
  // 处理掉线
  if (BaseInfo.value?.studentInfoList) {
    BaseInfo.value.studentInfoList = BaseInfo.value?.studentInfoList.map((item) => {
      const existItem = res.data.taskHealthMetricsVoList.find(
        (newItem) => newItem.studentName === item.studentName,
      )
      if (existItem) {
        return { ...existItem, status: 1 }
      } else {
        return { ...item, status: 0 }
      }
    })
    // 在线状态实时替换
    watchOnline.value = {
      braceletsOnlineNum: res.data.braceletsOnlineNum,
      braceletsTotalNum: res.data.braceletsTotalNum,
    }
  }
}
// 开始/结束
const control = async (type: 'start' | 'end') => {
  if (type === 'start') {
    btnShow.value = false
    startParams.value.isRecord = true //开始记录
    clock.startTimer() //开启计时器
  } else {
    btnShow.value = true
    startParams.value.isRecord = false //开始记录
    clearInterval(intervalId.value!) //关闭记录
    clock.stopTimer() //关闭计时器
    await updateTask({ id: startParams.value.taskId, trainingTime: clock.timer.value })
    uni.redirectTo({
      url: `/pages/report/reportdetail?taskId=${startParams.value.taskId}`,
    })
  }
}
onLoad((options) => {
  startParams.value.taskId = options!.taskId
  getHeartList(options!.taskId)
  immediateWatch() //立即执行一次
  startInterval()
})
// 离开前确保销毁定时器
onBeforeUnmount(() => {
  clearInterval(intervalId.value as number)
  intervalId.value = null
})
</script>

<template>
  <tabBar :selected="0">
    <view class="index">
      <!-- 顶部 -->
      <view class="flexBox tops">
        <!-- 头像 -->
        <view class="flexBox">
          <up-avatar :src="src" shape="circle" />
          <text style="padding-left: 10rpx">{{ user.profile?.nickName }}</text>
        </view>
        <!-- 班级 -->
        <view class="flexBox"
          ><image src="@/static/images/people.png" style="width: 23rpx; height: 23rpx" />训练队伍:
          {{ BaseInfo?.trainingTeamName }}</view
        >
        <!-- 手环 -->
        <view class="flexBox"
          ><image
            src="@/static/images/watch.png"
            style="width: 23rpx; height: 23rpx"
            mode="scaleToFill"
          />
          <text
            >手环连接{{ watchOnline.braceletsOnlineNum }}/{{ watchOnline.braceletsTotalNum }}</text
          >
        </view>
        <!-- 开始时间 -->
        <view class="flexBox"
          ><image
            src="@/static/images/clock.png"
            style="width: 23rpx; height: 23rpx"
            mode="scaleToFill"
          />
          <text>计时时间: {{ clock.formattedTime }}</text></view
        >
        <up-button
          type="primary"
          class="custom-style"
          text="开始运动"
          @click="control('start')"
          v-if="btnShow"
        ></up-button>
        <up-button
          v-else
          type="error"
          class="custom-style"
          style="background: #f56c6c"
          text="结束运动"
          @click="control('end')"
        ></up-button>
      </view>
      <view class="main">
        <scroll-view scroll-y style="height: 74vh">
          <view class="card_group">
            <view
              v-for="item in BaseInfo?.studentInfoList"
              :key="item.id"
              class="card_item"
              :style="{ background: item?.status ? '#fff' : '#EBECEF' }"
            >
              <!-- 在线卡片#fff -->
              <view v-show="item?.status === 1">
                <view class="top">
                  <view class="stu_name" >
                    <image src="@/static/images/stu.png" class="User_img" />{{ item.studentName }}
                    <!-- 速度状态 -->
                    <text class="status">{{ getStyleByType('statusColor', item.heartRate) }} </text>
                  </view>
                  <!-- 电量 -->
                  <view class="battery-container">
                    <view class="shell" :style="{ width: item.battery + '%' }">
                      <view
                        class="block"
                        :style="{ background: getStyleByType('batteryColor', item.battery) }"
                      ></view>
                    </view>
                    <view style="color: #959aa0">{{ item.battery ?? 0 }}%</view>
                  </view>
                </view>
                <view class="heart_main">
                  <!-- 左侧heartrate +bmp -->
                  <view>
                    <view style="margin-left: 13rpx; margin-top: 10rpx"
                      ><image
                        src="@/static/images/love.png"
                        style="width: 15rpx; height: 15rpx"
                        mode="scaleToFill"
                      />
                      <text style="font-size: 10rpx"> Heart rate</text></view
                    >
                    <view class="heart">
                      <text
                        class="heart_rate"
                        :style="{ color: getStyleByType('heartRateColor', item.heartRate) }"
                        >{{ item.heartRate ?? 0 }}
                      </text>
                      <text style="color: #959aa0; font-size: 12rpx">bpm</text>
                    </view>
                  </view>
                  <!-- 右侧心率图 -->
                  <view>
                    <image
                      src="@/static/images/heartJump.png"
                      style="width: 45rpx; height: 44rpx"
                      mode="scaleToFill"
                    />
                  </view>
                </view>
              </view>
              <!-- 离线卡片 -->
              <view v-show="item?.status === 0">
                <view class="top">
                  <view class="stu_name" >
                    <image src="@/static/images/stu.png" class="User_img" />{{ item.studentName }}
                    <!-- 速度状态 -->
                    <text class="offLine">离线</text>
                  </view>
                  <!-- 电量 -->
                  <image
                    src="@/static/images/leave.png"
                    style="width: 15rpx; height: 15rpx"
                    mode="scaleToFill"
                  />
                </view>
                <view class="heart_main">
                  <!-- 左侧heartrate +bmp -->
                  <view>
                    <view style="margin-left: 15rpx; margin-top: 10rpx"
                      ><image
                        src="@/static/images/love.png"
                        style="width: 15rpx; height: 15rpx"
                        mode="scaleToFill"
                      />
                      <text style="font-size: 10rpx"> Heart rate</text></view
                    >
                    <view class="heart">
                      <text class="heart_rate">- </text>
                      <text style="color: #959aa0; font-size: 12rpx">bpm</text>
                    </view>
                  </view>
                  <!-- 右侧心率图 -->
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </tabBar>
</template>

<style lang="scss" scoped>
.tops {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12rpx;
}
.custom-style {
  height: 40rpx;
  border: none;
  margin: 0;
  width: 150rpx;
  background: #58cca5;
  border-radius: 8rpx;
}
.flexBox {
  display: flex;
  align-items: center;
}

.main {
  background-color: #f5f9fa;
  border-radius: 10rpx;
  padding: 2%;
  margin-top: 10rpx;
  min-height: 70vh;

  .card_group {
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 5rpx 10rpx; // 控制卡片之间的间距

    .card_item {
      background-color: #fff;
      border-radius: 8rpx;
      box-shadow: 0 0 2rpx rgba(0, 0, 0, 0.1);
      .offLine {
        font-size: 11rpx;
        margin-left: 5rpx;
      }
      .status {
        font-size: 12px;
        color: #4abc7a;
        margin-left: 5rpx;
      }
      .top {
        display: flex;
        align-items: center;
        margin-top: 10rpx;
        justify-content: space-between;
        padding: 0rpx 13rpx;
		.stu_name{
			display: flex; align-items: center; font-size: 10rpx
		}
        .User_img {
          width: 20rpx;
          border-radius: 20rpx;
          height: 20rpx;
        }
        .battery-container {
          width: 30rpx;
          height: 15rpx;
          border: 2rpx solid #3bc968;
          border-radius: 4rpx;
          position: relative;
          transform: scale(0.7);
          transform-origin: left top;
          &:after {
            content: '';
            display: block;
            height: 8rpx;
            width: 4rpx;
            position: absolute;
            background: #3bc968;
            right: -5rpx;
            top: 0;
            bottom: 0;
            margin: auto 0;
          }

          .shell {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 2rpx;
            background: #f8fafc;
            .block {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .heart_main {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .heart {
        padding: 3rpx 16rpx;
        .heart_rate {
          font-size: 30rpx;
        }
      }
    }
  }
}

@media screen and (min-aspect-ratio: 143/100) {
	.main {
	  background-color: #f5f9fa;
	  border-radius: 10rpx;
	  padding: 2%;
	  margin-top: 10rpx;
	  min-height: 80vh;
	
	  .card_group {
	    display: grid;
	    justify-content: center;
	    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		grid-auto-rows: minmax(110rpx, auto); // 保证卡片的高度统一

	    gap: 5rpx 10rpx; // 控制卡片之间的间距
	
	    .card_item {
	      background-color: #fff;
	      border-radius: 8rpx;
	      box-shadow: 0 0 2rpx rgba(0, 0, 0, 0.1);
	      .offLine {
	        font-size: 11rpx;
	        margin-left: 5rpx;
	      }
	      .status {
	        font-size: 12px;
	        color: #4abc7a;
	        margin-left: 5rpx;
	      }
	      .top {
	        display: flex;
	        align-items: center;
	        margin-top: 10rpx;
	        justify-content: space-between;
	        padding: 0rpx 13rpx;
			.stu_name{
				display: flex; align-items: center; font-size: 10rpx
			}
	        .User_img {
	          width: 20rpx;
	          border-radius: 20rpx;
	          height: 20rpx;
	        }
	        .battery-container {
	          width: 30rpx;
	          height: 15rpx;
	          border: 2rpx solid #3bc968;
	          border-radius: 4rpx;
	          position: relative;
	          transform: scale(0.7);
	          transform-origin: left top;
	          &:after {
	            content: '';
	            display: block;
	            height: 8rpx;
	            width: 4rpx;
	            position: absolute;
	            background: #3bc968;
	            right: -5rpx;
	            top: 0;
	            bottom: 0;
	            margin: auto 0;
	          }
	
	          .shell {
	            width: 100%;
	            height: 100%;
	            box-sizing: border-box;
	            padding: 2rpx;
	            background: #f8fafc;
	            .block {
	              width: 100%;
	              height: 100%;
	            }
	          }
	        }
	      }
	      .heart_main {
	        display: flex;
	        align-items: center;
	        justify-content: space-between;
	      }
	      .heart {
	        padding: 3rpx 16rpx;
	        .heart_rate {
	          font-size: 30rpx;
	        }
	      }
	    }
	  }
	}
}


</style>
