<script setup lang="ts">
import { ref } from 'vue'
import { addExerciseType } from '@/api/start/start'
// 创建响应式数据
const show = ref(false)
const title = ref('新增训练项目')
const form = ref({
  exerciseName: '',
  number: 0,
})
const formRef = ref()
const emit = defineEmits<{
  success: [] // 定义 'success' 事件，不需要参数
}>()
const rules = ref({
  exerciseName: {
    required: true,
    message: '运动项目不为空',
    trigger: 'blur',
  },
})
const open = () => {
  show.value = true
}
const commit = () => {
  formRef.value
    .validate()
    .then(async (valid: Boolean) => {
      if (valid) {
        const res = await addExerciseType({ ...form.value, remarks: form.value.exerciseName })
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
      :showCancelButton="true"
      @cancel="show = false"
      :show="show"
      :title="title"
      @confirm="commit"
      width="800rpx"
    >
      <view class="slot-content">
        <up-form labelPosition="left" :model="form" :rules="rules" ref="formRef">
          <up-form-item
            label="运动项目"
            labelWidth="70"
            prop="exerciseName"
            borderBottom
            ref="item1"
          >
            <up-input v-model="form.exerciseName"></up-input>
          </up-form-item>
        </up-form>
      </view>
    </up-modal>
  </view>
</template>

<style lang="scss" scoped></style>
