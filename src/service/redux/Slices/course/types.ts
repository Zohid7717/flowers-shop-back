export interface ReqCourseInfo {
  name: string
  course: number
}

export interface ResCourseInfo {
  success: boolean
  message: string
  courses: ReqCourseInfo[]
}

export interface CourseSliceType{
  loading: boolean
  success: boolean
  status: string
  list: ReqCourseInfo[]
}