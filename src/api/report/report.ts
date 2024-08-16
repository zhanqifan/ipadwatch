import { request } from '@/utils/https'
import type { ReportDetail, reportData, reportType, SportType, HeartMap } from './reportType'
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
// 运动强度分部图
export const getSportIntensity = (data: SportType) => {
  return request<HeartMap[]>({
    url: '/teacher/team/sportIntensity',
    method: 'GET',
    data,
  })
}
