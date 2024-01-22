import { Dispatch, FC, SetStateAction, SyntheticEvent, useEffect, useState } from 'react'
import { UserResType } from '../../../../utils/types'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import '../ProfileInfo.scss'
import { useAppDispatch, useAppSelector } from '../../../../service/redux/hooks/hooks';
import { updateUser } from '../../../../service/redux/Slices/auth/slice';

interface UserType {
  user: UserResType;
  setEditUserInfo: Dispatch<SetStateAction<boolean>>;
}

const InfoEditForm: FC<UserType> = ({ user, setEditUserInfo }) => {
  const status = useAppSelector(state => state.auth.status)
  const [telState, setTelState]=useState(user.tel)
  console.log(status)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<UserResType>({
    mode: "onChange",
    defaultValues: {
      username: user.username,
      tel: user.tel,
      nickname: user.nickname,
      ccn: user.ccn,
    },
  })

  const handleCcnChange = (e: SyntheticEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    let valueInt: number = parseInt(value.replace(/\D/g, ""), 10);
    if (isNaN(valueInt)) {
      setValue("ccn", '');
    } else {
      setValue("ccn", valueInt);
    }
  };

  const onSubmit = handleSubmit((data) => {
    data.username ? data.username : data.username = user.username
    data.tel ? data.tel : data.tel = user.tel
    data.nickname ? data.nickname : data.nickname = user.nickname
    data.ccn ? data.ccn : null
    dispatch(updateUser(data))
    setEditUserInfo(false)
  })

  const onCancel = () => {
    reset()
    setEditUserInfo(false)
  }
  useEffect(() => {
    handlePhoneChange(telState)
  }, [telState])

  const handlePhoneChange = (arg: string) => {
    let value = arg
    value = value.replace(/\D/g, "")
    if (value.length > 4) {
      value = value.replace(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/, "+998 $2 $3 $4 $5")
    }
    setValue("tel", value)
  }

  return <form className='info-box' onSubmit={onSubmit}>
    <label className="info-box__wrap">
      <p className='info-box__title'>Имя и фамилия</p>
      <input
        className='info-box__input'
        type='text'
        {...register("username", {
          pattern: {
            value: /^[a-zA-Zа-яА-ЯёЁ]+\s[a-zA-Zа-яА-ЯёЁ]+$/,
            message: "Введите имя и фамилию через пробел."
          }
        })}
      />
      {errors?.username && <p>{typeof errors.username.message === "string" ? errors.username.message : "Error"}</p>}
    </label>
    <label className="info-box__wrap">
      <p className='info-box__title'>Моб. номер</p>
      <input
        className='info-box__input'
        {...register("tel", {
          pattern: {
            value: /^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/,
            message: "Введите номер телефона в формате 998 XX XXX XX XX"
          },
        })}
        onChange={(e)=>setTelState(e.currentTarget.value)}
      />
      {errors?.tel && errors.tel.message && <p>{errors.tel.message}</p>}
    </label>
    <label className="info-box__wrap">
      <p className='info-box__title'>Мой псевдоним</p>
      <input
        className='info-box__input'
        type='text'
        {...register("nickname", {
        })}
      />
    </label>
    <label className="info-box__wrap">
      <p className='info-box__title'>Данные о карте</p>
      <input
        className='info-box__input'
        {...register("ccn", {
          minLength: {
            value: 16,
            message: 'Минимальная количевство цифр должно быть 16.'
          },
          maxLength: {
            value: 16,
            message: 'Максимальное количевство цифр должно быть 16.'
          },
          pattern: {
            value: /^[0-9]+$/,
            message: "Используйте только цыфры"
          }
        })}
        onChange={handleCcnChange}
      />
      {errors?.ccn && errors.ccn.message && <p>{errors.ccn.message}</p>}
    </label>
    <div className="reg-form__btn">
      <button onClick={onCancel} className='UBtn reg-form__btn' type='reset'>
        Отмена
      </button>
      <button type='submit' className='UBtn reg-form__btn' >
        Регистрация
      </button>
    </div>
  </form>
}

export default InfoEditForm