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
