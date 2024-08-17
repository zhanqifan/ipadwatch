import type { common } from '../start/startType'
export interface reportType {
  total: number
  rows: reportResponse[]
  code: number
  msg: string
}
// 报告列表传参
export interface reportData {
  /**
   * 训练类型
   */
  exerciseTypeName?: string
  /**
   * 页数
   */
  pageNum?: number
  /**
   * 页面大小
   */
  pageSize?: number
  /**
   * 开始时间  格式【2024-05-15 00:00:00】
   */
  'params[beginTime]'?: string
  /**
   * 结束时间 格式【2024-05-15 00:00:00】
   */
  'params[endTime]'?: string
  /**
   * 授课教师名称
   */
  teacherName?: string
  /**
   * 训练队名称
   */
  trainingTeamName?: string
}
// 报告列表响应
export interface reportResponse extends common {
  id: string
  taskName: string
  trainingPeopleNumber: number
  trainingTeamId: string
  trainingTeamName: string
  exerciseTypeName: string
  number: number
  teacherName: string
  trainingTime: null
  personNum: number
  students: null
}

// 报告详情
export interface ReportDetail {
  trainingName: string
  trainingType: string
  teacherName: string
  trainingDate: number
  personNum: number
  fullDetailsReportVoList: FullDetailsReportVoList[]
}

export interface FullDetailsReportVoList {
  studentName: string
  averageHeartRate: number
  averagePace: number
  averageBloodOxygen: number
  maxHeartRate: number
  maxPace: number
  maxBloodOxygen: number
  minHeartRate: number
}

// echart统一传参
interface SportType {
  taskId?: string
  teamId?: string
  number?: number
  dateTime?: string
  startTime?: string
  endTime?: string
}
// 强度分部图
export interface HeartMap {
  grade: 'LOW' | 'MIDDLE' | 'HIGH' | 'HIGHER' | 'HIGHEST' | 'HIGHEST_HIGHER'
  time?: number
}
// 心率对比图
export interface RealTimeHeartRate {
  time: string
  maxHeartRate: number
  minHeartRate: number
}

// 运动达成图响应
export interface SportRingType {
  sportDensity: number
  averageHeartRate: number
  averageIntensity: number
  heartRateGreaterThan120Time: number
  maxHeartRateTime: number
  achievementRate: null
  completionNum: number
  totalNum: number
  achievementRate: number
}
// 运动排行响应
export interface SportRankType {
  maxHeartRateRankAsc: MaxHeartRateRankAsc[]
  maxHeartRateRankDesc: MaxHeartRateRankAsc[]
  intensityRankAsc: MaxHeartRateRankAsc[]
  intensityRankDesc: MaxHeartRateRankAsc[]
}

export interface MaxHeartRateRankAsc {
  name: string
  density: number
  intensity: number
  maxHeartRate: number
}

// 运动负荷响应
export interface SportLoadType {
  averageIntensity: number
  intensityQualifiedNum: number
  intensityQualifiedRate: number
  effectiveTrainingDensity: number
  effectiveTrainingDensityQualifiedNum: number
  effectiveTrainingDensityQualifiedRate: number
  averageHeartRate: number
  averageMaxHeartRate: number
}
