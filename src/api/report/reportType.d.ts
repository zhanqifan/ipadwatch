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

// // echart统一传参
interface SportType {
  taskId?: string
  teamId?: string
  number?: number | null
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

// 训练队次数传参
export interface trainTimes {
  trainingTeamId: string
  startTime: string
  endTime: string
}
export interface SportParams {
  teamId?: string
  startTime?: string
  endTime?: string
  number?: string
  taskId?: string
}

export interface SportData {
  /**
   * 基础信息
   */
  basicInfoDTOS: BasicInfoDTOS
  /**
   * 课堂运动达成情况
   */
  sportAchievementVO: SportAchievementVO
  /**
   * 运动负荷项目及达标情况
   */
  sportLoadVO: SportLoadVO
  /**
   * 训练队心率正排行
   */
  trainingHeartRateListASC: TrainingHeartRateListASC[]
  /**
   * 训练队心率倒排行
   */
  trainingHeartRateListDEAS: TrainingHeartRateListDEA[]
  /**
   * 训练队运动强度正排行
   */
  trainingIntensityListASC: TrainingIntensityListASC[]
  /**
   * 训练队运动强度倒排行
   */
  trainingIntensityListDEAS: TrainingIntensityListDEA[]
  /**
   * 训练队心率分布
   */
  trainingRealTimeHeartRates: TrainingRealTimeHeartRate[]
  /**
   * 训练队强度分布
   */
  trainingReportGrades: TrainingReportGrade[]
  [property: string]: any
}

/**
 * 基础信息
 */
export interface BasicInfoDTOS {
  studentNameList: StudentNameList[]
  teacherName: string
  teamName: string
  [property: string]: any
}
/**
 * 基础信息-学生列表
 */
export interface StudentNameList {
  averageHeartRate?: null
  averageHeartRateRank?: null
  createBy?: string
  createDept?: number
  createTime?: string
  historyAverageHeartRate?: number
  historyMaxHeartRate?: number
  id?: string
  maxHeartRate?: null
  maxHeartRateRank?: null
  name?: string
  parentId?: null
  phonenumber?: string
  studentNumber?: string
  tenantId?: null
  updateBy?: string
  updateTime?: string
  uuid?: string
  [property: string]: any
}

/**
 * 课堂运动达成情况
 */
export interface SportAchievementVO {
  achievementRate: number
  averageHeartRate: number
  averageIntensity: number
  completionNum: number
  heartRateGreaterThan120Time: number
  maxHeartRateTime: number
  sportDensity: number
  totalNum: number
  [property: string]: any
}

/**
 * 运动负荷项目及达标情况
 */
export interface SportLoadVO {
  averageHeartRate: number
  averageIntensity: number
  averageMaxHeartRate: number
  effectiveTrainingDensity: number
  effectiveTrainingDensityQualifiedNum: number
  effectiveTrainingDensityQualifiedRate: number
  intensityQualifiedNum: number
  intensityQualifiedRate: number
  [property: string]: any
}
// 训练队排行响应
export interface SportRankType {
  trainingIntensityListASC: TrainingIntensityListASC[]
  trainingIntensityListDEAS: TrainingIntensityListDEA[]
  trainingHeartRateListASC: TrainingHeartRateListASC[]
  trainingHeartRateListDEAS: TrainingHeartRateListDEA[]
}

export interface TrainingHeartRateListASC {
  heartRate: number
  id: string
  reportId: string
  studentName: string
  [property: string]: any
}

export interface TrainingHeartRateListDEA {
  heartRate: number
  id: string
  reportId: string
  studentName: string
  [property: string]: any
}

export interface TrainingIntensityListASC {
  id: string
  intensity: number
  reportId: string
  studentName: string
  [property: string]: any
}

export interface TrainingIntensityListDEA {
  id: string
  intensity: number
  reportId: string
  studentName: string
  [property: string]: any
}

export interface TrainingRealTimeHeartRate {
  avgHeartRate: number
  id: string
  maxHeartRate: number
  minHeartRate: number
  reportId: string
  time: string
  [property: string]: any
}
// 运动强度分布图
export interface TrainingReportGrade {
  grade: string
  id?: string
  reportId?: string
  time: number
  [property: string]: any
}
