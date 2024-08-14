import type { common, trainingRespon } from '../start/startType'

// 查询任务基础数据响应
export interface MergedInterface extends common, trainingRespon {}

export interface startData {
  taskId: string
  studentIds: number[]
  number: number
  isRecord: boolean
}
// 更新训练任务时长传参
export interface updataData {
  id: string
  trainingTime: number
}
