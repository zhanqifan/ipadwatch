<script setup lang="ts">
const props = defineProps({
  fn: {
    type: Function,
    default: () => {
      return () => {}
    },
  },
  title: {
    type: String,
    default: '提示',
  },
  content: {
    type: String,
    default: '内容',
  },
  modelWidth: {
    type: String,
    default: '300rpx',
  },
  contentTextAlign: {
    type: String,
    default: 'center',
  },
})
// 创建响应式数据
const show = ref(false)

// 方法
const open = () => {
  show.value = true
}

const confirm = async () => {
  await props.fn()
  show.value = false
}
const close = () => {
  show.value = false
}
defineExpose({
  open,
})
</script>
<template>
  <up-modal
    :show="show"
    @confirm="confirm"
    @cancel="close"
    :title="title"
    :content="content"
    :width="modelWidth"
    :showCancelButton="true"
    :contentTextAlign="contentTextAlign"
  ></up-modal>
</template>

<style lang="scss" scoped></style>
