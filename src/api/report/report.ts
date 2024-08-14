import { request } from '@/utils/https'
import type { reportData, reportType } from './reportType'
export const getReport = (data: reportData): reportType => {
  return request({
    url: '/teacher/training/report/page',
    method: 'GET',
    data,
  })
}
