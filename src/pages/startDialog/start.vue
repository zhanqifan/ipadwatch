<script setup lang="ts">
import {
  getTeamList,
  getTrainType,
  getTrainingTeam,
  addExercise,
  deletExerciseType,
  delTrainingTeam,
} from '@/api/start/start'
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
const deleteType = ref(false)
const deleteTeam = ref(false)
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

// 点击空白区域时关闭抖动模式
const closeShake = () => {
  deleteType.value = false
  deleteTeam.value = false
  console.log('触发')
}

// 定义 deleteFn 函数类型
type DeleteFunction = (id: string) => Promise<any>

const deleteItem = (deleteFn: DeleteFunction, refresh: () => void, id: string, name: string) => {
  uni.showModal({
    title: `是否删除${name}训练类型`,
    content: '删除后将移出列表',
    success: async function (res) {
      if (res.confirm) {
        await deleteFn(id)
        refresh()
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
  })
}
onLoad(() => {
  getTrain()
  getTeam()
})
</script>
<template>
  <tabBar :selected="0" @click="closeShake">
    <view class="sprot_box">
      <!-- 步骤条 -->
      <up-steps current="0" class="step">
        <up-steps-item title="选择训练"> </up-steps-item>
        <up-steps-item title="开始训练"></up-steps-item>
        <up-steps-item title="训练报告"></up-steps-item>
      </up-steps>
      <!-- 选择项目 -->
      <view class="select_one">
        <view class="project">训练类型 </view>
        <view class="btn_group">
          <scroll-view scroll-x style="height: 70rpx">
            <view class="project_group">
              <up-radio-group
                v-model="exerciseTypeId"
                @longpress="() => (deleteType = true)"
                placement="column"
              >
                <view
                  @click.stop
                  class="project_item"
                  v-for="(item, index) in radiolist1"
                  :class="deleteType ? 'v-shake' : ''"
                  :key="item.exerciseTypeId"
                >
                  <up-radio
                    :disabled="deleteType"
                    :customStyle="{
                      marginRight: '20rpx',
                      minWidth: '90rpx',
                      borderRadius: '5rpx',
                      position: 'relative',
                      background: item.exerciseTypeId == exerciseTypeId ? '#387ff2' : '',
                      border:
                        item.exerciseTypeId == exerciseTypeId
                          ? '1rpx solid #387ff2'
                          : '1rpx solid #e6e6e6',
                    }"
                    :labelColor="item.exerciseTypeId == exerciseTypeId ? '#fff' : 'black'"
                    :label="item.exerciseTypeName"
                    :name="item.exerciseTypeId"
                    @change="(e) => groupChange(e, 'pro', item.exerciseTypeName)"
                  >
                  </up-radio>
                  <image
                    @click="
                      deleteItem(
                        deletExerciseType,
                        getTrain,
                        item.exerciseTypeId,
                        item.exerciseTypeName,
                      )
                    "
                    v-show="deleteType"
                    src="@/static/images/delete.png"
                    class="delIcon"
                    mode="scaleToFill"
                  />
                </view>
                <view class="add" v-show="!deleteType" @click="open('pro')"
                  ><up-icon name="plus-circle-fill" size="25" color="#2979ff"
                /></view>
              </up-radio-group>
            </view>
          </scroll-view>
        </view>
      </view>
      <!-- 选择队伍 -->
      <view class="select_tow">
        <view class="project"> 选择队伍 </view>
        <view class="btn_group">
          <scroll-view scroll-x style="width: 68vw">
            <view class="project_group" v-if="radiolist2.length">
              <up-radio-group v-model="trainingTeamId" scroll-left placement="column">
                <view
                  class="project_item"
                  v-for="(item, index) in radiolist2"
                  @longpress="() => (deleteTeam = true)"
                  @click.stop
                  :key="item.trainingTeamId"
                  :class="deleteTeam ? 'v-shake' : ''"
                >
                  <up-radio
                    :disabled="deleteTeam"
                    :customStyle="{
                      border:
                        item.trainingTeamId == trainingTeamId
                          ? '1rpx solid #387ff2'
                          : '1rpx solid #e6e6e6',

                      width: '110rpx',
                      background: item.trainingTeamId == trainingTeamId ? '#387ff2' : '',
                      marginRight: '20rpx',
                      borderRadius: '5rpx',
                    }"
                    :labelColor="item.trainingTeamId == trainingTeamId ? '#fff' : 'black'"
                    @change="(e) => groupChange(e, 'team', item.trainingTeamName)"
                    :label="item.trainingTeamName"
                    :name="item.trainingTeamId"
                  >
                  </up-radio>
                  <image
                    @click="
                      deleteItem(
                        delTrainingTeam,
                        getTeam,
                        item.trainingTeamId,
                        item.trainingTeamName,
                      )
                    "
                    v-show="deleteTeam"
                    src="@/static/images/delete.png"
                    class="delIcon"
                    mode="scaleToFill"
                  />
                </view>
                <view class="add" v-show="!deleteTeam" @click="open('team')"
                  ><up-icon name="plus-circle-fill" size="25" color="#2979ff"
                /></view>
              </up-radio-group>
            </view>
            <view v-else style="margin-bottom: 30rpx">暂无队伍请先添加</view>
          </scroll-view>
        </view>
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
          <scroll-view scroll-y style="height: 40rpx">
            <view class="plan_people">
              <view class="item_people" v-for="item in studentList" :key="item.id"
                >{{ item.name }}
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
  margin-bottom: 10rpx;
  .add {
    border: 1rpx solid #387ff2;
    border-radius: 5rpx;
    color: #f9f9f9;
    background-color: #387ff2;
    padding: 5rpx;
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
.btn_group {
  display: flex;
  align-items: center;
  width: 86vw;
  .add {
    border: 2rpx dashed;
    border-radius: 7rpx;
    color: #9fa0a1;
    width: 90rpx;
    height: 29rpx;
    display: flex;
    justify-content: center;
  }
}
.sprot_box {
  padding-top: 10rpx;
  margin-left: 20rpx;
}
.step {
  margin-bottom: 50rpx;
}
.start_btn {
  width: 180rpx;
  height: 60rpx;
  border-radius: 7rpx;
  margin-top: 25rpx;
  background-color: #387ff2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f9f9f9;
  position: absolute;
  left: 39%;
}
@media screen and (max-height: 710px) {
  .step {
    margin-bottom: 30rpx;
  }
  .start_btn {
    width: 180rpx;
    height: 60rpx;
    border-radius: 7rpx;
    margin-top: 15rpx;
    background-color: #387ff2;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f9f9f9;
    position: absolute;
    left: 39%;
  }
}

.Cur_people {
  background-color: #f9f9f9;
  padding: 20rpx 15rpx;
  font-size: 12rpx;
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
      grid-template-columns: repeat(auto-fill, minmax(45rpx, 1fr));
      width: 100%;
      align-items: center;
      gap: 12rpx; /* 可调整项目之间的间距 */

      .item_people {
        color: #387ff2;

        white-space: nowrap; /* 防止文字换行 */
        text-align: left; /* 文字居中 */
      }
    }
  }
}

::v-deep .u-radio-group--column {
  display: flex;
  flex-direction: row;
  align-items: center;
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
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. 声明进入和离开的状态 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. 确保离开的项目被移除出了布局流
      以便正确地计算移动时的动画效果。 */
.fade-leave-active {
  position: absolute;
}
.project_item {
  position: relative;
}
.delIcon {
  width: 12rpx;
  top: 0;
  right: 18rpx;
  position: absolute;
  font-size: 10rpx;
  height: 12rpx;
}
</style>
