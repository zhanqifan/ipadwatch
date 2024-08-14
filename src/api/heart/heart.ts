import { request } from '@/utils/https'
import type { MergedInterface, startData, updataData } from './heartType'

// 基础信息
export const taskBaseInfo = (taskId: string) => {
  return request<MergedInterface>({
    url: `/teacher/trainingTask/taskBaseInfo/${taskId}`,
    method: 'GET',
  })
}

// 实时监听心率
export const detectionData = (data: startData) => {
  return request({
    url: '/teacher/trainingTask/detectionData',
    method: 'POST',
    data,
  })
}
// 更新训练任务时长
export const updateTask = (data: updataData) => {
  return request({
    url: '/teacher/trainingTask/update',
    method: 'PUT',
    data,
  })
}
