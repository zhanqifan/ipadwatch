import { request } from '@/utils/https'
import type {
  reportData,
  reportType,
  SportParams,
  studentData,
  SportData,
  trainTimes,
  trainTimesResponse,
} from './reportType'
// 报告列表
export const getReport = (data: reportData): reportType => {
  return request({
    url: '/teacher/training/report/page',
    method: 'GET',
    data,
  })
}

// 报告次数
export const getInpNumber = (data: trainTimes) => {
  return request<trainTimesResponse>({
    url: '/teacher/training/report/trainingTimes',
    method: 'POST',
    data,
  })
}
// 报表数据
export const getDateReport = (data: SportParams) => {
  return request<SportData>({
    url: '/teacher/team/report',
    // url: 'https://apifoxmock.com/m2/3773810-3405678-default/207147190',
    method: 'POST',
    data,
  })
}
// 报表个人数据
export const getStuReport = (data: SportParams) => {
  return request<studentData>({
    url: '/teacher/student/report',
    // url: 'https://apifoxmock.com/m2/3773810-3405678-default/207287543',
    method: 'POST',
    data,
  })
}

// 查询训练队次数和学生列表
// export const getTrainTime = (data:) => {
//   return request({
//     url: '/teacher/training/report/trainingTimes',
//     method: 'GET',
//   })
// }
