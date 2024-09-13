import { request } from '@/utils/https'
import type {
  TeamList,
  TrainType,
  TeamDetail,
  exerciseType,
  trainingType,
  pageQuery,
  studentListType,
  trainingRespon,
  trainingTask,
} from './startType'

// 查询训练类型
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
export const addExerciseType = (data: exerciseType) => {
  return request({
    url: '/teacher/exerciseType/add',
    method: 'POST',
    data,
  })
}
// 新增训练队
export const addTrainingTeam = (data: trainingType) => {
  return request({
    url: '/teacher/trainingTeam/add',
    method: 'POST',
    data,
  })
}
// 获取学生列表
export const getStudentList = (pageParams: pageQuery): studentListType => {
  return request({
    url: '/teacher/studentInfo/list',
    method: 'GET',
    data: pageParams,
  })
}
// 新增训练队
export const addExercise = (data: trainingTask) => {
  return request<trainingRespon>({
    url: '/teacher/trainingTask/add',
    method: 'POST',
    data,
  })
}
// 删除训练类型
export const deletExerciseType = (idList: string) => {
  return request({
    url: `/teacher/exerciseType/delete?idList=${idList}`,
    method: 'DELETE',
  })
}

// 删除队伍
export const delTrainingTeam = (id: string) => {
  return request({
    url: '/teacher/trainingTeam/delete/' + id,
    method: 'DELETE',
  })
}
