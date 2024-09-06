<script setup lang="ts">
const uToastRef = ref<any>(null)
type paramsType = {
  type: String
  icon?: Boolean | string //是否带图标 或者写图标绝对路径
  message: String //展示内容
  iconUrl?: String //图标地址
  position?: 'top' | 'bottom' //展示位置
  duration?: String | number //展示时间
}
function showToast(params: paramsType) {
  uToastRef.value.show({
    duration: 1000,
    ...params,
  })
}
defineExpose({
  showToast,
})
</script>
<template>
  <view>
    <up-toast ref="uToastRef"></up-toast>
  </view>
</template>

<style lang="scss" scoped></style>
