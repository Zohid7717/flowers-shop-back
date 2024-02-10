import { FC, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from '../../../../service/redux/hooks/hooks';
import { getCourse, updateCourse } from '../../../../service/redux/Slices/course/slice';
import { setMessage } from '../../../../service/redux/Slices/toast/slice';
import { ReqCourseInfo } from '../../../../service/redux/Slices/course/types';
import './CourseCard.css'

const CourseCard: FC = () => {
  const courseList = useAppSelector(state => state.course.list)
  const courseLoading = useAppSelector(state => state.course.loading)
  const courseStatus = useAppSelector(state => state.course.status)

  const [courseState, setCourseState] = useState<ReqCourseInfo[]>([])
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
  })

  useEffect(() => {
    dispatch(getCourse())
  }, [])

  useEffect(() => {
    setCourseState(courseList)
  }, [courseList])
  
  const onSubmit = () => handleSubmit((data) => {
    try {
      dispatch(updateCourse(data.courses[0]))
      dispatch(setMessage(courseStatus))
    } catch (error) {
      dispatch(setMessage(error))
    }
  })

  const courseForm = Array.isArray(courseState) && courseState.length > 0 ?
    <form onSubmit={onSubmit()} className='course'>
      {courseState.map((course, index) => (
        <div key={index}>
          <label>
            <p>{course.name}</p>
            <input
              type="text"
              className='form__input'
              defaultValue={course.course}
              {...register(`courses.${index}.course` as const, {
                required: 'Поля обязательно к заполнению!'
              })}
            />
          </label>
          <input value={course.name} hidden {...register(`courses.${index}.name` as const)} />
        </div>
      ))}
      <button type='submit'>Изменить</button>
    </form> : <p>Данные не загружены. Попробуйте поозже.</p>

  return <div>
    {courseLoading ? <p>Loading...</p> : courseForm}
  </div>
}

export default CourseCard