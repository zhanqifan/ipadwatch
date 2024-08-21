import { request } from '@/utils/https'
import type {
  ReportDetail,
  reportData,
  reportType,
  SportType,
  SportParams,

  // HeartMap,
  // SportRingType,
  // RealTimeHeartRate,
  SportRankType,
  SportData,
  trainTimes,
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
export const getDetail = (data: SportType) => {
  return request<ReportDetail>({
    url: `/teacher/training/report/fullDetails/${data.taskId}`,
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
    // url: '/teacher/team/sportIntensity',
    url: 'https://apifoxmock.com/m2/3773810-3405678-default/205795946',
    method: 'POST',
    data,
  })
}
// 运动心率对比图
export const HeartCompare = (data: SportType) => {
  return request<RealTimeHeartRate[]>({
    // url: '/teacher/team/heartRateCompare',
    url: 'https://apifoxmock.com/m2/3773810-3405678-default/206743189',
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
// 报告次数
export const getNumber = (data: trainTimes) => {
  return request({
    url: '/teacher/training/report/trainingTimes',
    method: 'POST',
    data,
  })
}
// 报表数据
export const getDateReport = (data: SportParams) => {
  return request<SportData>({
    url: 'https://apifoxmock.com/m2/3773810-3405678-default/207147190',
    method: 'POST',
    data,
  })
}
