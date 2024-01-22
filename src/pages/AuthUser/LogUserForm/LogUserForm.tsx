import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector} from '../../../service/redux/hooks/hooks'
import { loginUser } from '../../../service/redux/Slices/auth/slice'
import { setFromPage } from '../../../service/redux/Slices/fromPage/slice'

interface LogAdminFormType{
  nickname: string;
  password: string;
}

const LogUserForm: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const isAuth = useAppSelector(state=>state.auth.isAuth)
  const fromPage = useAppSelector(state=>state.fromPage.value)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<LogAdminFormType>({
    mode: 'onChange'
  })
  dispatch(setFromPage(location.state?.from?.pathname || '/'))
  
  useEffect(() => {
    if (isAuth) {
      navigate(fromPage, {replace: true})
    }
  }, [isAuth])

  const onSubmit = handleSubmit((data) => {
    dispatch(loginUser(data))
    reset()
  })

  const onCancel = () => {
    reset()
    navigate(fromPage, {replace: true})
  }

  return <div className='reg-form'>
    <p className="reg-form__title">Форма для регистрации администратора</p>
    <form className="reg-form__form" onSubmit={onSubmit} autoComplete='off'>
      <div className="reg-form__inputs">
        <label className='reg-form__nickname'>
          Введите псевдоним
          <input
            placeholder='MyNickName'
            className='reg-form__input'
            {...register("nickname", {
              required: "Поля обязательно к заполнению",
            })}
          />
          <div className="reg-form__error">
            {errors?.nickname && <p>{errors.nickname?.message || "Error!"}</p>}
          </div>
        </label>
        <label className='reg-form__password'>
          Введите парол
          <input
            placeholder='Пароль из 8 символов'
            className='reg-form__input'
            {...register("password", {
              required: "Поля обязательно к заполнению.",
              minLength: {
                value: 8,
                message: 'Минимальная число сомволов 8.'
              }
            })}
          />
          <div className="reg-form__error">
            {errors?.password && <p>{errors.password?.message || "Error!"}</p>}
          </div>
        </label>
      </div>
      <div className="reg-form__btn">
        <button onClick={onCancel} className='UBtn reg-form__btn' type='reset'>
          Отмена
        </button>
        <button className={isValid ? 'UBtn-active reg-form__btn' : 'UBtn-disable reg-form__btn' } type='submit' disabled={!isValid}>
          Авторизация
        </button>
      </div>
    </form>
  </div>
}

export default LogUserForm