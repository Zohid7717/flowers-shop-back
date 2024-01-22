import { FC, useState, useRef, ChangeEvent } from 'react'
import { useForm } from "react-hook-form";
import { PresentType } from '../../../utils/types'
import './AddPresent.scss'
import { addImage } from '../../../utils/func';

const AddPresent: FC = () => {
  const [selectPresentImg, setSelectPresentImg] = useState<File | null>(null)
  const inputFileRef = useRef<HTMLInputElement | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<PresentType>({
    mode: 'onChange'
  })
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (selectPresentImg) {
      
    }
    setSelectPresentImg(e.target.files && e.target.files[0])
    const imgUrl = await addImage(selectPresentImg, 'uploadPresent')
    if (imgUrl) {
      setValue('present_imgUrl', imgUrl)
    }
  }
  const onSubmit = handleSubmit(async (data) => {
  })
  return <div className='present'>
    <h4>Добавить подарок</h4>
    <form className='present__form' onSubmit={onSubmit}>
      <div className="present__form-main">
        <label>
          Название:
          <input
            className='form__input'
            placeholder='Введите название'
            {...register("present_name", {
              required: 'Поля обязательно к заполнению!'
            })}
          />
          {errors?.present_name && <p>{errors.present_name?.message || 'Error!'}</p>}
        </label>
        <label >
          Цена:
          <input
            className='form__input'
            placeholder='Введите цену'
            {...register("present_price", {
              required: 'Поля обязательно к заполнению!'
            })}
          />
          {errors?.present_price && <p>{errors.present_price?.message || 'Error!'}</p>}
        </label>
        <div>
          Добавить изображения
          <label className="present__add-img">
            {selectPresentImg ? <img src={URL.createObjectURL(selectPresentImg)} alt="Изображения" /> : ''}
            <input
              type="file"
              onChange={handleFileChange}
              ref={inputFileRef}
              hidden
            />

            <input type="text"
              {...register("present_imgUrl", {
                required: 'Выберайте изображения!'
              })}
              hidden
            />
            {errors?.present_imgUrl && <p>{errors.present_imgUrl?.message || "Error!"}</p>}
          </label>
        </div>
      </div>
      <button type='submit' className='UBtn'>Отправить</button>
    </form>
  </div>
}

export default AddPresent