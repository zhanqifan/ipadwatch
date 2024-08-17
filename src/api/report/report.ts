import { request } from '@/utils/https'
import type {
  ReportDetail,
  reportData,
  reportType,
  SportType,
  HeartMap,
  SportRingType,
  RealTimeHeartRate,
  SportRankType,
} from './reportType'
// 报告列表
export const getReport = (data: reportData): reportType => {
  return request({
    url: '/teacher/training/report/page',
    method: 'GET',
    data,
  })
}
// 全部明细
export const getDetail = (taskId: string) => {
  return request<ReportDetail>({
    url: `/teacher/training/report/fullDetails/${taskId}`,
    method: 'GET',
  })
}
// 运动负荷图
export const getpressure = (data: SportType) => {
  return request({
    url: '/teacher/team/sportLoad',
    method: 'POST',
    data,
  })
}
// 运动强度分部图
export const getSportIntensity = (data: SportType) => {
  return request<HeartMap[]>({
    url: '/teacher/team/sportIntensity',
    method: 'POST',
    data,
  })
}
// 运动心率对比图
export const HeartCompare = (data: SportType) => {
  return request<RealTimeHeartRate[]>({
    url: '/teacher/team/heartRateCompare',
    method: 'POST',
    data,
  })
}
// 运动达成图
export const HearComplate = (data: SportType) => {
  return request<SportRingType>({
    url: '/teacher/team/sportAchievement',
    method: 'POST',
    data,
  })
}
// 运动强度排行图
export const SportRank = (data: SportType) => {
  return request<SportRankType>({
    url: '/teacher/team/sportIntensityRank',
    method: 'POST',
    data,
  })
}
// 运动负荷项目及达标情况
export const sportLoad = (data: SportType) => {
  return request({
    url: '/teacher/team/sportLoad',
    method: 'POST',
    data,
  })
}
