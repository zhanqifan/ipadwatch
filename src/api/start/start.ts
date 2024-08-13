import { request } from '@/utils/https'
import type { TeamList, TrainType, TeamDetail, exerciseType } from './startType'

// 查询训练项目
export const getTrainType = () => {
  return request<TrainType[]>({
    method: 'GET',
    url: '/teacher/exerciseType/list',
  })
}
// 查询训练队列表
export const getTeamList = () => {
  return request<TeamList[]>({
    method: 'GET',
    url: '/teacher/trainingTeam/list',
  })
}
// 查询训练队详情
export const getTrainingTeam = (id: string | number) => {
  return request<TeamDetail>({
    url: '/teacher/trainingTeam/' + id,
    method: 'GET',
  })
}
// 新增训练类型
export const getexerciseType = (data: exerciseType) => {
  return request({
    url: '/teacher/exerciseType/add',
    method: 'POST',
    data,
  })
}
