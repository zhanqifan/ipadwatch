<script setup lang="ts">
import { ref } from 'vue'
import { addTrainingTeam, getStudentList } from '@/api/start/start'
import type { Row } from '@/api/start/startType'
// 创建响应式数据
const show = ref(false)
const title = ref('新增训练项目')
const form = ref({
  teamName: '',
  studentIds: [],
})
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
const options2 = ref([
  {
    label: '去冰',
    value: 1,
  },
  {
    label: '加冰',
    value: 2,
  },
])
const pageParams = reactive({
  pageNum: 1,
  pageSize: 15,
})
const studentList = ref<Row[]>([])
const open = () => {
  show.value = true
  getStudent()
}
const getStudent = async () => {
  const res = await getStudentList(pageParams)
  studentList.value = res.rows
}
const commit = () => {
  formRef.value
    .validate()
    .then(async (valid: Boolean) => {
      if (valid) {
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
      width="1200rpx"
      :showCancelButton="true"
      @cancel="show = false"
    >
      <view class="slot-content" style="height: 200px">
        <up-form labelPosition="left" :model="form" :rules="rules" ref="formRef">
          <up-form-item label="队伍名称" labelWidth="70" prop="teamName" borderBottom ref="item1">
            <up-input v-model="form.teamName"></up-input>
          </up-form-item>
          <up-form-item label="训练人员" labelWidth="70" class="peo">
            <scroll-view scroll-y style="height: 230rpx">
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
            </scroll-view>
          </up-form-item>
        </up-form>
      </view>
    </up-modal>
  </view>
</template>

<style lang="scss" scoped>
::v-deep .u-dropdown__content__popup[data-v-d45d1d94] {
  background-color: #fff;
  margin-top: 20rpx;
}
::v-deep .u-dropdown__content__mask[data-v-d45d1d94] {
  background: none;
}
.dropdown {
  border: 1px solid #dadbde;
  border-radius: 5px;
}
::v-deep .u-dropdown__menu__item[data-v-d45d1d94] {
  justify-content: end;
  margin-right: 10rpx;
}
.peo {
  ::v-deep .u-form-item__body[data-v-b4fd400b] {
    align-items: start;
  }
  ::v-deep .u-checkbox[data-v-abd63d8e] {
    margin-top: 0;
  }
}
</style>
