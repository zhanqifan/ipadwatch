<script setup lang="ts">
import dayjs from 'dayjs'
const initialValue = () => {
  return {
    teamId: '', //训练队名称
    number: null,
    dateTime: dayjs().format('YYYY-MM-DD'),
  }
}
const teamType = ref(false)
const formRef = ref()
const teamColumns = ref()
const rules = ref()
const params = ref(initialValue()) //搜索传参
const teamName = ref() //训练队名
const confirm = ({ value }: { value: { id: string; label: string }[] }) => {
  params.value.teamId = value[0].id
  teamName.value = value[0].label
  teamType.value = false
}

const reset = () => {
  params.value = initialValue()
  teamName.value = ''
}

const search = () => {}
</script>
<template>
  <tabBar :selected="1">
    <!-- 搜索栏 -->
    <up-form labelPosition="left" :model="params" :rules="rules" ref="formRef">
      <view class="top">
        <up-form-item label="训练队:" labelWidth="60" prop="teamId">
          <up-picker
            :show="teamType"
            :columns="teamColumns"
            @cancel="teamType = false"
            @confirm="confirm"
            keyName="label"
          />
          <up-button @click="teamType = true">{{ teamName ? teamName : '选择训练队' }}</up-button>
        </up-form-item>

        <up-form-item label="时间:" labelWidth="40" prop="dateTime">
          <uni-datetime-picker
            type="date"
            :clear-icon="false"
            style="width: 300rpx"
            v-model="params.dateTime"
          />
        </up-form-item>
        <up-form-item label="次数:" labelWidth="40" prop="number">
          <up-input placeholder="请输入次数" border="surround" v-model="params.number" />
        </up-form-item>
        <view>
          <up-form-item>
            <up-button
              type="primary"
              style="width: 150rpx; margin-right: 10rpx"
              text="搜索"
              @click="search"
            />
            <up-button type="success" style="width: 150rpx" text="重置" @click="reset" />
          </up-form-item>
        </view>
      </view>
    </up-form>
    <view class="main">
      <up-row gutter="10">
        <up-col span="3">
          <view class="Base_info">
            <view class="title">基础信息</view>
            <view class="Base_team"><text>高启强</text><text>7月10日第一次训练</text></view>
            <scroll-view scroll-y style="height: 132rpx">
              <view class="students">
                <text class="name" v-for="(item, index) in 10" :key="index">1</text>
              </view>
            </scroll-view>
          </view>
        </up-col>
        <!-- 训练运动达成情况 -->
        <up-col span="9">
          <view class="Base_right">
            <view class="condition">训练运动达成情况</view>
            <up-row>
              <up-col span="3">
                <view style="padding-left: 30rpx">
                  <ringChart v-if="sportComplate" :sportComplate="sportComplate" />
                </view>
              </up-col>
              <up-col span="8">
                <view class="container">
                  <view v-for="(item, index) of filterDate" :key="index">
                    <view v-if="sportDict[index as keyof typeof sportDict]?.label" class="item">
                      <view
                        class="dot"
                        :style="{ background: sportDict[index as keyof typeof sportDict]?.color }"
                      ></view>
                      <view class="text">{{
                        sportDict[index as keyof typeof sportDict]?.label +
                        ':' +
                        secondsToMinutes(item!, index) +
                        sportDict[index as keyof typeof sportDict]?.unit
                      }}</view>
                    </view>
                  </view>
                </view>
              </up-col>
            </up-row>
          </view>
        </up-col>
      </up-row>
    </view>
  </tabBar>
</template>

<style lang="scss" scoped>
.top {
  display: flex;
  gap: 50rpx;
}
.main {
  margin-top: 0rpx;
  padding: 3rpx;
  .Base_info {
    box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 20rpx;
    padding: 30rpx 20rpx;
    min-height: 300rpx;
    .title {
      padding: 0rpx 0rpx;
      margin-bottom: 40rpx;
    }
    .Base_team {
      display: flex;
      justify-content: space-between;
      font-size: 25rpx;
    }
    .students {
      font-size: 25rpx;
      margin-top: 10rpx;
      display: grid;
      gap: 10rpx;
      grid-template-columns: repeat(4, 1fr); // 设定每行 3 列
      .name {
        background-color: #4fa2fd;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        border-radius: 10rpx;
        padding: 2rpx;
      }
    }
  }
  .Base_right {
    box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 20rpx;
    .container {
      display: grid;
      grid-template-columns: repeat(3, 1fr); // 设定每行 3 列
      .item {
        display: flex;
        align-items: center;
        padding: 10px; // 内边距
        border-radius: 4px; // 圆角（可选）
      }

      .dot {
        width: 10px; // 圆点的大小
        height: 10px;
        background-color: #333; // 圆点的颜色
        border-radius: 50%; // 使其为圆形
        margin-right: 8px; // 圆点和文本之间的间隔
      }

      .text {
        white-space: nowrap; // 禁止换行
        font-size: 14px; // Adjust text size as needed
      }
    }

    .condition {
      padding-left: 30rpx;
      padding-top: 20rpx;
    }
  }
}
</style>
