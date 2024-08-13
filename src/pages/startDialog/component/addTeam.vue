<script setup lang="ts">
import { ref } from 'vue'

// 创建响应式数据
const show = ref(false)
const title = ref('标题')
const content = ref(`空山新雨后<br> 天气晚来秋`)
const open = () => {
  show.value = true
}
const commit = () => {
  show.value = false
}
defineExpose({
  open,
})
</script>
<template>
  <view>
    <up-modal :show="show" :title="title" @confirm="commit">
      <view class="slot-content">
        <rich-text :nodes="content"></rich-text>
      </view>
    </up-modal>
  </view>
</template>

<style lang="scss" scoped></style>
