import { FC } from 'react'
import { useForm } from 'react-hook-form'
import './FooterForm.scss'

type FormData = {
  firstName: string
  phoneNum: number
  question: string
}

const FooterForm: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    mode: "onBlur"
  })
  const onSubmint = handleSubmit((data) => {
    console.log((data))
    reset()
  })
  return <div className='footer-form'>
    <p className="footer-form__title green">Возникли вопросы? Свяжитесь с нами</p>
    <form onSubmit={onSubmint} className='footer-form__form'>
      <label className='footer-form__label'>
        Ваше имя
        <input className='footer-form__input'
          {...register("firstName", {
            required: "Поле обязательно к заполнению",
            minLength: {
              value: 3,
              message: "Минимальная число символов 3."
            }
          })}
        />
        <div className='footer-form__error'>
          {errors?.firstName && <p >{errors?.firstName?.message || "Error!"}</p>}
        </div>
      </label>
      <label className='footer-form__label'>
        Моб. номер
        <input type='number' className='footer-form__input'
          {...register("phoneNum", {
          required: "Поле обязательно к заполнению",
          minLength: {
            value: 12,
            message: "Минимальная число символов 12."
          }
        })} />
        <div  className='footer-form__error'>
          {errors?.phoneNum && <p>{errors?.phoneNum?.message || "Error!"}</p>}
        </div>
      </label>
      <textarea className='footer-form__textarea'
        {...register("question", {
        required: "Поле обязательно к заполнению",
        minLength: {
          value: 5,
          message: "Минимальная число символов 5."
        }
      })} />
      <div className='footer-form__error'>
        {errors?.question && <p >{errors?.question?.message || "Error!"}</p>}
      </div>
      <button className='UBtn-active footer-form__btn' type="submit">
        Отправить
      </button>
    </form>
  </div>
}

export default FooterForm