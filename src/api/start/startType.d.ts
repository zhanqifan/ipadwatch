export type Team = {
  trainingTeamName: string
  trainingTeamId: string
}
export type Train = {
  exerciseTypeName: string
  exerciseTypeId: string
}

// 训练队列表 返回
export interface TeamList {
  createDept: string
  createBy: string
  createTime: string
  updateBy: string
  updateTime: string
  tenantId: string
  id: string
  teamName: string
}
// 训练队类型 返回
export interface TrainType {
  id: string
  exerciseName: string
  number: number
  remarks: string
}

// 新增训练 请求参数
export interface addTeam {
  trainingTeamId: string
  trainingTeamName: string
  exerciseTypeName: string
  number: number
  teacherName: string
}
// 训练队详情响应
export interface TeamDetail {
  createDept: number
  createBy: string
  createTime: string
  updateBy: string
  updateTime: string
  tenantId: null
  id: string
  teamName: string
  studentList: StudentList[]
}
// 训练队学生
export interface StudentList {
  createDept: number
  createBy: string
  createTime: string
  updateBy: string
  updateTime: string
  tenantId: null
  id: number
  name: string
  uuid: string
  studentNumber: string
  parentId: null
  phonenumber: string
}
// 新增训练类型
export interface exerciseType {
  exerciseName: string
  number: number
  remarks: string
}
