<script setup lang="ts">
import { ref } from 'vue'
import { addTrainingTeam, getStudentList } from '@/api/start/start'
import type { Row } from '@/api/start/startType'
// 创建响应式数据
const show = ref(false)
const title = ref('新增训练项目')
const initialValue = () => {
  return {
    teamName: '',
    studentIds: [],
  }
}
const form = ref(initialValue())
const status = ref('loading')
const loadingText = ref('加载中')
const nomoreText = ref('实在没有了~')
const formRef = ref()
const emit = defineEmits<{
  success: [] // 定义 'success' 事件，不需要参数
}>()
const rules = ref({
  teamName: {
    required: true,
    message: '运动项目不为空',
    trigger: 'blur',
  },
})
const pageParams = reactive({
  pageNum: 1,
  pageSize: 24,
})
const maxpageNum = ref() //总共分几页
const studentList = ref<Row[]>([])
const open = () => {
  show.value = true
  form.value = initialValue()
  getStudent()
}
const getStudent = async () => {
  const res = await getStudentList(pageParams)
  studentList.value = res.rows
  // 只有一页 情况直接判定没有更多
  if (res.total < pageParams.pageSize) {
    status.value = 'nomore'
    return
  }
  maxpageNum.value = Math.ceil(res.total / pageParams.pageSize)
}
const commit = () => {
  formRef.value
    .validate()
    .then(async (valid: Boolean) => {
      if (valid) {
        const e = form.value.teamName.endsWith('队')
        e ? '' : (form.value.teamName = form.value.teamName + '队')
        const res = await addTrainingTeam(form.value)
        if (res.code === 200) {
          emit('success')
          show.value = false
        }
      }
    })
    .catch(() => {
      console.log('33')
    })
}
// 触底获取更多学生
const upToLower = async () => {
  if (pageParams.pageNum < maxpageNum.value) {
    pageParams.pageNum = pageParams.pageNum + 1
    const res = await getStudentList(pageParams)
    studentList.value = [...studentList.value, ...res.rows]
  } else {
    status.value = 'nomore'
    console.log(status.value)
  }
}
const formatTeamName = () => {
  const e = form.value.teamName.endsWith('队')
  if (!e) {
    form.value.teamName = form.value.teamName + '队'
  }
}

// 关闭初始化
const close = () => {
  show.value = false
  // 重置分页参数
  pageParams.pageNum = 1
  maxpageNum.value = undefined
  // 清空学生列表
}
defineExpose({
  open,
})
</script>
<template>
  <view>
    <up-modal
      :show="show"
      :title="title"
      @confirm="commit"
      width="1300rpx"
      :showCancelButton="true"
      @cancel="close"
    >
      <view class="slot-content" style="height: 500rpx; min-width: 600rpx">
        <up-form labelPosition="left" :model="form" :rules="rules" ref="formRef">
          <up-form-item label="队伍名称" labelWidth="70" prop="teamName" borderBottom ref="item1">
            <up-input v-model="form.teamName" placeholder="请输入队伍名称"></up-input>
          </up-form-item>
          <up-form-item label="训练人员" labelWidth="70" class="peo">
            <scroll-view
              scroll-y
              style="height: 350rpx"
              v-if="studentList.length"
              @scrolltolower="upToLower"
            >
              <up-checkbox-group v-model="form.studentIds" placement="column">
                <up-checkbox
                  :customStyle="{ marginBottom: '8px' }"
                  v-for="(item, index) in studentList"
                  :key="index"
                  :label="item.name"
                  :name="item.id"
                >
                </up-checkbox>
              </up-checkbox-group>
              <up-loadmore :status="status" :loading-text="loadingText" :nomore-text="nomoreText" />
            </scroll-view>
            <view v-else>暂无训练人员,请先去添加</view>
          </up-form-item>
        </up-form>
      </view>
    </up-modal>
  </view>
</template>

<style lang="scss" scoped>
::v-deep .u-dropdown__content__popup {
  background-color: #fff;
  margin-top: 20rpx;
}
::v-deep .u-dropdown__content__mask {
  background: none;
}
.dropdown {
  border: 1px solid #dadbde;
  border-radius: 5px;
}
::v-deep .u-dropdown__menu__item {
  justify-content: end;
  margin-right: 10rpx;
}
.peo {
  ::v-deep .u-form-item__body {
    align-items: start;
  }
  ::v-deep .u-checkbox {
    margin-top: 0;
  }
}
::v-deep .u-checkbox-group--column {
  gap: 10rpx 40rpx;
  display: grid;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  grid-template-columns: repeat(4, 1fr);
}
</style>
