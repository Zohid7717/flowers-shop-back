import { FC, SyntheticEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../service/redux/hooks/hooks'
import { registerUser } from '../../../service/redux/Slices/auth/slice'
import { FormType } from '../../../utils/types'


interface RegAdminFormType extends FormType {
  ccn: number;
}

const RegUserForm: FC = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.auth.isAuth)
  console.log(status)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid }
  } = useForm<RegAdminFormType>({
    mode: 'onChange'
  })

  const onSubmit = handleSubmit((data) => {
    dispatch(registerUser(data))
    reset()
  })

  const onCancel = () => {
    reset()
    navigate('/')
  }

  const handlePhoneChange = (e: SyntheticEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value
    value = value.replace(/\D/g, "")
    if (value.length > 4) {
      value = value.replace(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/, "+998 $2 $3 $4 $5")
    }
    setValue("tel", value)
  }
  return <div className='reg-form'>
    <p className="reg-form__title">Форма для регистрации пользователя</p>
    <form className="reg-form__form" onSubmit={onSubmit} >
      <div className="reg-form__inputs">
        <label className='reg-form__username'>
          Введите имя и фамилию
          <input
            className='reg-form__input'
            placeholder='Имя Фамилия'
            {...register("username", {
              required: "Поля обязательно к заполнению",
              pattern: {
                value: /^[a-zA-Zа-яА-ЯёЁ]+\s[a-zA-Zа-яА-ЯёЁ]+$/,
                message: "Введите имя и фамилию через пробел"
              }
            })}
          />
          <div className="reg-form__error">
            {errors?.username && <p>{errors.username?.message || "Error!"}</p>}
          </div>
        </label>
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
        <label className='reg-form__adminpass'>
          Если хотите добавить карту
          <input
            placeholder='Номер карты'
            className='reg-form__input'
            {...register("ccn", {
              minLength: {
                value: 16,
                message: 'Длина номера карты должен иметь 16 чисел'
              },
              maxLength: {
                value: 16,
                message: 'Длина номера карты должен иметь 16 чисел'
              }
            })}
          />
          <div className="reg-form__error">
            {errors?.ccn && <p>{errors.ccn?.message || "Error!"}</p>}
          </div>
        </label>
        <label className='reg-form__tel'>
          Введите номер телефона
          <input
            placeholder='998 ХХ ХХХ ХХ ХХ'
            className='reg-form__input'
            {...register("tel", {
              required: "Поля обязательно к заполнению.",
              pattern: {
                value: /^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/,
                message: "Введите номер телефона в формате 998 ХХ ХХХ ХХ ХХ"
              },
            })}
            onChange={handlePhoneChange}
          />
          <div className="reg-form__error">
            {errors?.tel && <p>{errors.tel?.message || "Error!"}</p>}
          </div>
        </label>
      </div>
      <div className="reg-form__btn">
        <button onClick={onCancel} className='UBtn reg-form__btn' type='reset'>
          Отмена
        </button>
        <button  type='submit' className={isValid ? 'UBtn-active reg-form__btn' : 'UBtn-disable reg-form__btn'} disabled={!isValid}>
          Регистрация
        </button>
      </div>
    </form>
  </div>
}

export default RegUserForm