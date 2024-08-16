<script setup lang="ts">
import { getTeamList, getTrainType, getTrainingTeam, addExercise } from '@/api/start/start'
import type { Team, Train, StudentList } from '@/api/start/startType.d.ts'
import addTeam from './component/addTeam.vue'
import addProject from './component/addProject.vue'
import { useMemberStore } from '@/stores'
const user = useMemberStore()
const exerciseTypeId = ref<string | number>() //训练项目类型id
const exerciseTypeName = ref<string>('')
const radiolist1 = ref<Train[]>([])
const studentList = ref<StudentList[]>()
const addProjectRef = ref()
const addTeamRef = ref()
// 获取项目
const getTrain = async () => {
  const res = await getTrainType()
  console.log(res)
  radiolist1.value = res.data.map((item) => {
    return {
      exerciseTypeId: item.id,
      exerciseTypeName: item.exerciseName,
    }
  })
  exerciseTypeId.value = res.data[0].id
  exerciseTypeName.value = res.data[0].exerciseName
}
const trainingTeamId = ref<string | number>() //训练队id
const trainingTeamName = ref<string>()
const radiolist2 = ref<Team[]>([])
// 获取队伍
const getTeam = async () => {
  const res = await getTeamList()
  radiolist2.value = res.data.map((item) => {
    return {
      trainingTeamId: item.id,
      trainingTeamName: item.teamName,
    }
  })
  trainingTeamId.value = res.data[0].id //默认选中第一个
  trainingTeamName.value = res.data[0].teamName
  getTeamStudent()
}
// 按钮切换事件
const groupChange = (e: string, type: string, name: string) => {
  if (type === 'pro') {
    exerciseTypeId.value = e
    exerciseTypeName.value = name
  } else {
    trainingTeamId.value = e
    trainingTeamName.value = name
    getTeamStudent()
  }
}
// 获取学生列表
const getTeamStudent = async () => {
  const res = await getTrainingTeam(trainingTeamId.value!)
  studentList.value = res.data.studentList
}
// 开始训练
const nextStep = async () => {
  if (exerciseTypeId.value && trainingTeamId.value) {
    const res = await addExercise({
      trainingTeamId: trainingTeamId.value,
      trainingTeamName: trainingTeamName.value!,
      exerciseTypeName: exerciseTypeName.value,
      number: 0,
      teacherName: user.profile!.nickName,
    })
    uni.navigateTo({ url: `/pages/index/index?taskId=${res.data.id}` })
  }
}

const open = (type: 'pro' | 'team') => {
  if (type === 'pro') {
    addProjectRef.value.open()
  } else {
    addTeamRef.value.open()
  }
}

onMounted(() => {
  getTrain()
  getTeam()
})
</script>
<template>
  <tabBar :selected="1">
    <view class="sprot_box">
      <!-- 步骤条 -->
      <up-steps current="0" style="margin-bottom: 100rpx">
        <up-steps-item title="选择训练"> </up-steps-item>
        <up-steps-item title="开始训练"></up-steps-item>
        <up-steps-item title="训练报告"></up-steps-item>
      </up-steps>
      <!-- 选择项目 -->
      <view class="select_one">
        <view class="project">
          选择项目<text class="add" @click="open('pro')">新增训练项目</text>
        </view>
        <scroll-view scroll-x style="width: 85vw; height: 150rpx">
          <view class="project_group" v-if="radiolist1.length">
            <up-radio-group v-model="exerciseTypeId" placement="column">
              <up-radio
                v-for="(item, index) in radiolist1"
                :customStyle="{
                  marginRight: '60rpx',
                  minWidth: '250rpx',
                  border: index == exerciseTypeId ? '1rpx solid #387ff2' : '1rpx solid #e6e6e6',
                }"
                :key="index"
                :label="item.exerciseTypeName"
                :name="item.exerciseTypeId"
                @change="(e) => groupChange(e, 'pro', item.exerciseTypeName)"
              >
              </up-radio>
            </up-radio-group>
          </view>
          <view v-else> 暂无训练项目请先添加 </view>
        </scroll-view>
      </view>
      <!-- 选择队伍 -->
      <view class="select_tow">
        <view class="project">
          选择队伍 <text class="add" @click="open('team')">新增训练队</text></view
        >
        <scroll-view scroll-x style="width: 85vw">
          <view class="project_group" v-if="radiolist2.length">
            <up-radio-group v-model="trainingTeamId" scroll-left placement="column">
              <up-radio
                v-for="(item, index) in radiolist2"
                :customStyle="{
                  border: index == trainingTeamId ? '1rpx solid #387ff2' : '1rpx solid #e6e6e6',
                  width: '300rpx',
                  marginRight: '50rpx',
                }"
                @change="(e) => groupChange(e, 'team', item.trainingTeamName)"
                :key="index"
                :label="item.trainingTeamName"
                :name="item.trainingTeamId"
              >
              </up-radio>
            </up-radio-group>
          </view>
          <view v-else style="margin-bottom: 30rpx">暂无队伍请先添加</view>
        </scroll-view>
      </view>
      <!-- 训练人员 -->
      <view class="Cur_people">
        <view class="title">当前训练人员</view>
        <view class="total">
          <view>
            <up-icon name="account" color="black" size="28"></up-icon>
            <view style="display: flex; flex-direction: column">
              <text>训练计划人数:</text>
              <text>({{ studentList?.length ? studentList.length : 0 }}人) </text>
            </view>
          </view>
          <scroll-view scroll-y style="max-height: 120rpx">
            <view class="plan_people">
              <view style="color: #387ff2" v-for="item in studentList" :key="item.id"
                >{{ item.name }}&nbsp
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
      <up-button
        text="开始训练"
        type="primary"
        style="width: 500rpx; height: 150rpx; margin-top: 50rpx"
        @click="nextStep"
      />
      <addProject ref="addProjectRef" @success="() => getTrain()" />
      <addTeam ref="addTeamRef" @success="() => getTeam()" />
    </view>
  </tabBar>
</template>

<style lang="scss" scoped>
.project {
  position: relative;
  padding-left: 20px; // 给伪元素留出空间
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10rpx;
  .add {
    border: 1rpx solid #387ff2;
    border-radius: 10rpx;
    color: #f9f9f9;
    background-color: #387ff2;
    padding: 10rpx;
    float: right;
  }
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 16px;
    background-color: #387ff2;
    border-radius: 2px; // 可选：如果你想让矩形有圆角
  }
}
.project_group {
  display: flex;
  align-items: center;
  margin-bottom: 40rpx;
}
.sprot_box {
  margin-top: 10%;
  margin-left: 100rpx;
}
.Cur_people {
  background-color: #f9f9f9;
  padding: 60rpx;
  .title {
    margin-bottom: 30rpx;
  }
  .total {
    display: flex;
    align-items: start;
    > view:first-child {
      display: flex;
      align-items: center;
    }

    .plan_people {
      display: grid;
      width: 100%;
      margin-left: 50rpx;
      grid-template-columns: repeat(
        auto-fill,
        minmax(150rpx, 1fr)
      ); // Adjust 150rpx to your desired minimum width
      gap: 20rpx; // Adjust the gap between items if needed
    }
  }
}
::v-deep .u-radio-group--column {
  display: flex;
  flex-direction: row;
  .u-radio {
    padding: 20rpx;
    // border: 1rpx solid #387ff2;
    margin-right: 20rpx;
  }
}
</style>
