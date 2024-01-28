export interface ReqCourseInfo {
  name: string
  currentRate: number
}

export interface ResCourseInfo {
  success: boolean
  message: string
  course: ReqCourseInfo[]
}

export interface CourseSliceType{
  loading: boolean
  success: boolean
  status: string
  list: ReqCourseInfo[]
}