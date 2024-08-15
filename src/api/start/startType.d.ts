export interface common {
  createDept: number
  createBy: string
  createTime: string
  updateBy: string
  updateTime: string
  tenantId: null
}

export type Team = {
  trainingTeamName: string
  trainingTeamId: string
}
export type Train = {
  exerciseTypeName: string
  exerciseTypeId: string
}
export interface pageQuery {
  pageNum: number
  pageSize: number
}
// 训练队列表 返回
export interface TeamList extends common {
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
export interface TeamDetail extends common {
  id: string
  teamName: string
  studentList: StudentList[]
}
// 训练队学生
export interface StudentList extends common {
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
// 新增训练队伍
export interface trainingType {
  teamName: string
  studentIds: number[]
}
export interface studentListType {
  total: number
  rows: Row[]
  code: number
  msg: string
}

export interface Row extends common {
  parentId: string
  id: number
  name: string
  uuid: string
}

// 新增训练请求参数
export interface trainingTask {
  trainingTeamId: string | number
  trainingTeamName: string
  exerciseTypeName: string
  number: number
  teacherName: string
}

// 返回响应
export interface trainingRespon {
  id: string
  taskName: string
  trainingTeamId: string
  trainingTeamName: string
  exerciseTypeName: string
  number: number
  teacherName: string
  trainingTime: null
  students: number[]
  studentInfoList: StudentInfoList[]
  personNum: null
  braceletsTotalNum: number
  braceletsOnlineNum: number
}
export interface StudentInfoList {
  status?: number
  id: string
  studentId: number
  studentName: string
  braceletId: null
  taskId: null
  timestamp: null
  totalSteps: null
  totalDistance: null
  matchingSpeed: null
  totalCalories: null
  heartRate: string
  bloodPressure: null
  bloodOxygen: null
  number: null
  battery: string
}
