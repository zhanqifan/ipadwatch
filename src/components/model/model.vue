<script setup lang="ts">
const props = defineProps({
  modelWidth: {
    type: String,
    default: '300rpx',
  },
  contentTextAlign: {
    type: String,
    default: 'center',
  },
  isFresh: {
    type: Boolean,
    default: false,
  },
  isSlot: {
    type: Boolean,
    default: false,
  },
})
// 创建响应式数据
const show = ref(false)
const title = ref()
const content = ref()
const currentFn = ref()
const freshFn = ref()
// 监听函数变化

// 方法
const open = (data: any) => {
  show.value = true
  title.value = data.title
  content.value = data.content
  currentFn.value = data.ExecuteFn
  freshFn.value = data.freshFn
}

const confirm = async () => {
  console.log(currentFn.value)
  await currentFn.value()
  if (props.isFresh) {
    freshFn.value()
  }
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
    ><view v-if="isSlot" class="slot-content"></view>
  </up-modal>
</template>

<style lang="scss" scoped>
::v-deep .u-modal__title {
  font-weight: 100;
  font-size: 15rpx;
}
</style>
