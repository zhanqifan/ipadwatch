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
  exerciseTypeId.value = res.data[0]?.id
  exerciseTypeName.value = res.data[0]?.exerciseName
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
  await nextTick()
  trainingTeamId.value = res.data[0]?.id //默认选中第一个
  trainingTeamName.value = res.data[0]?.teamName
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
  if (trainingTeamId.value) {
    const res = await getTrainingTeam(trainingTeamId.value!)
    studentList.value = res.data.studentList
  }
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
  <tabBar :selected="0">
    <view class="sprot_box">
      <!-- 步骤条 -->
      <up-steps current="0" style="margin-bottom: 50rpx">
        <up-steps-item title="选择训练"> </up-steps-item>
        <up-steps-item title="开始训练"></up-steps-item>
        <up-steps-item title="训练报告"></up-steps-item>
      </up-steps>
      <!-- 选择项目 -->
      <view class="select_one">
        <view class="project">
          选择项目<text class="add" @click="open('pro')">新增训练项目</text>
        </view>
        <scroll-view scroll-x style="width: 68vw; height: 70rpx">
          <view class="project_group" v-if="radiolist1.length">
            <up-radio-group v-model="exerciseTypeId" placement="column">
              <up-radio
                v-for="(item, index) in radiolist1"
                :customStyle="{
                  marginRight: '20rpx',
                  minWidth: '90rpx',
                  borderRadius: '5rpx',
                  background: item.exerciseTypeId == exerciseTypeId ? '#387ff2' : '',
                  border:
                    item.exerciseTypeId == exerciseTypeId
                      ? '1rpx solid #387ff2'
                      : '1rpx solid #e6e6e6',
                }"
                :labelColor="item.exerciseTypeId == exerciseTypeId ? '#fff' : 'black'"
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
          选择队伍
          <text class="add" @click="open('team')">新增训练队</text>
        </view>
        <scroll-view scroll-x style="width: 68vw">
          <view class="project_group" v-if="radiolist2.length">
            <up-radio-group v-model="trainingTeamId" scroll-left placement="column">
              <up-radio
                v-for="(item, index) in radiolist2"
                :customStyle="{
                  border:
                    item.trainingTeamId == trainingTeamId
                      ? '5rpx solid #387ff2'
                      : '1rpx solid #e6e6e6',
                  width: '110rpx',
                  background: item.trainingTeamId == trainingTeamId ? '#387ff2' : '',
                  marginRight: '20rpx',
                  borderRadius: '5rpx',
                }"
                :labelColor="item.trainingTeamId == trainingTeamId ? '#fff' : 'black'"
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
        <view class="title"
          >训练人数:&nbsp{{ studentList?.length ? studentList.length : 0 }}人</view
        >
        <view class="total">
          <view>
            <view style="display: flex; flex-direction: column">
              <text>训练名单:&nbsp</text>
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
      <view class="start_btn" @click="nextStep">开始训练</view>
      <addProject ref="addProjectRef" @success="() => getTrain()" />
      <addTeam ref="addTeamRef" @success="() => getTeam()" />
    </view>
  </tabBar>
</template>

<style lang="scss" scoped>
.project {
  position: relative;
  padding-left: 15rpx; // 给伪元素留出空间
  font-size: 12rpx;
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
    width: 8rpx;
    height: 13rpx;
    background-color: #387ff2;
    border-radius: 2rpx; // 可选：如果你想让矩形有圆角
  }
}
.project_group {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}
.sprot_box {
  padding-top: 10rpx;
  margin-left: 20rpx;
}
.Cur_people {
  background-color: #f9f9f9;
  padding: 20rpx;
  .title {
    margin-bottom: 10rpx;
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
      grid-template-columns: repeat(
        auto-fill,
        minmax(100rpx, 1fr)
      ); // Adjust 150rpx to your desired minimum width
      gap: 14rpx; // Adjust the gap between items if needed
    }
  }
}
.start_btn {
  width: 200rpx;
  height: 70rpx;
  border-radius: 7rpx;
  margin-top: 25rpx;
  background-color: #387ff2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f9f9f9;
  position: absolute;
  left: 35%;
}
::v-deep .u-radio-group--column {
  display: flex;
  flex-direction: row;
  .u-radio {
    padding: 8rpx;
    // border: 1rpx solid #387ff2;
  }
}
::v-deep .u-radio__icon-wrap--circle {
  display: none;
}
::v-deep .u-radio__text {
  text-align: center;
  width: 100%;
}
</style>
