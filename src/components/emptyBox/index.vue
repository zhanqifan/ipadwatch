<script setup lang="ts">
defineProps({
  mode: {
    type: String,
    default: 'car',
  },
  text: {
    type: String,
    default: '暂无内容',
  },
  size: {
    type: Object,
    default: () => {
      return {
        width: 160,
        height: 160,
      }
    },
  },
  show: {
    type: Boolean,
    default: true,
  },
  marginTop: {
    type: Number,
    default: 30,
  },
  icon: {
    type: String,
    default: '/static/images/data.png',
  },
})
</script>
<template>
  <view>
    <up-empty
      :mode="mode"
      :text="text"
      :height="size.height"
      :width="size.width"
      :show="show"
      :marginTop="marginTop"
      :icon="icon"
    >
    </up-empty>
  </view>
</template>

<style lang="scss" scoped></style>
