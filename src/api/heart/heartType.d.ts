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
// 开始任务响应体
export interface detectionResponse {
  braceletsTotalNum: number
  braceletsOnlineNum: number
  taskHealthMetricsVoList: TaskHealthMetricsVoList[]
}

export interface TaskHealthMetricsVoList {
  id: null
  studentId: string
  studentName: string
  braceletId: string
  taskId: null
  timestamp: number
  totalSteps: null
  totalDistance: null
  matchingSpeed: null
  totalCalories: null
  heartRate: number
  bloodPressure: null
  bloodOxygen: null
  number: null
  battery: number
}
