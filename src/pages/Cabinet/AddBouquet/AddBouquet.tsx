import { FC, useState, useRef } from 'react'
import { useForm } from "react-hook-form";
import { BouquetType, FlowerType, SizeType } from '../../../utils/types';
import FlowerInput from '../../../component/FlowerInput/FlowerInput';
import AddImage from '../../../component/AddImage/AddImage';

import '../../../component/regAdminForm/RegAdminForm.scss'
import './AddBouquet.scss'
import AddSize from '../../../component/AddSize/AddSize';
import { useAppDispatch } from '../../../service/redux/hooks/hooks';
import { setMessage } from '../../../service/redux/Slices/toast/slice';

import { useNavigate } from 'react-router-dom';
import { addImages, createId } from '../../../utils/func';
import axios from '../../../utils/axios';

const category = [
  { name: 'Монобукеты' },
  { name: 'Авторские' },
  { name: 'Цветы в каробке' },
  { name: 'Цветы в корзине' }
]

const AddBouquet: FC = () => {
  const submitButtonRef = useRef<HTMLButtonElement | null>(null)
  const [bouquetComposition, setBouquetComposition] = useState<FlowerType[] | null>([])
  const [bouquetSize, setBouquetSize] = useState<SizeType[] | null>([])
  const [sizeValid, setSizeValid] = useState<boolean>(false)
  const [pushFlowerValid, setPushFlowerValid] = useState<boolean>(true)
  const [addImageValid, setAddImageValid] = useState<boolean>(true)
  const [images, setImages] = useState<FileList | null>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<BouquetType>({
    mode: 'onChange'
  })


  const onSubmit = handleSubmit(async (data) => {
    if (sizeValid || pushFlowerValid || addImageValid) {
      console.log(sizeValid, pushFlowerValid, addImageValid)
      dispatch(setMessage('Введите необходимую информацию для создание букета'))
    } else {
      try {
        if (bouquetSize && bouquetComposition) {
          data._id = createId()
          data.size = bouquetSize
          data.composition = bouquetComposition
          data.bouquetImg = await addImages(images, 'img/uploadimgs')
          let dataToString = JSON.stringify(data)
          await axios.post('/bouquet/addbouquet', { dataToString })
          navigate(`../../bouquet/${data._id}`)
        }
      } catch (error: any) {
        dispatch(setMessage(error?.response.data.message))
      }
    }
    reset()
  })

  const handleCancel = async () => {
    setBouquetComposition(null)
    setBouquetSize(null)
    setImages(null)
    navigate('/user/info')
    reset()
  }
  
  return <div className='add-bouquet'>
    <div className="add-bouquet__wrap">
      <div className="add-bouquet__left">
        <form onSubmit={onSubmit} className='add-bouquet__form'>
          <label className='add-bouquet__form-input form__label'>
            Наименование букета
            <input
              className='add-form__input form__input'
              placeholder='Наименование продукта'
              {...register("name", {
                required: 'Поля обязательно к заполнению!'
              })}
            />
            {errors?.name && <p>{errors.name?.message || 'Error!'}</p>}
          </label>
          <label className='add-bouquet__form-input form__label'>
            Выберите категорию
            <select
              {...register("category")}
              className='form__input'
            >
              {category.map(item => (
                <option key={item.name} value={item.name}>{item.name}</option>
              ))}
            </select>
          </label>
          <button hidden type='submit' ref={submitButtonRef}>Создать букет</button>
        </form>
        <AddSize bouquetSize={bouquetSize} setBouquetSize={setBouquetSize} sizeValid={sizeValid} setSizeValid={setSizeValid} />
      </div>
      <div className="add-bouquet__right">
        <FlowerInput bouquetComposition={bouquetComposition} setBouquetComposition={setBouquetComposition} pushFlowerValid={pushFlowerValid} setPushFlowerValid={setPushFlowerValid} />
        <AddImage setAddImageValid={setAddImageValid} setImages={setImages} />
      </div>
    </div>
    <div className="add-bouquet__btns">
      <button className='UBtn' onClick={() => submitButtonRef.current?.click()} >Создать букет</button>
      <button className='UBtn' onClick={handleCancel} >Удалить букет</button>
    </div>
  </div>
}

export default AddBouquet

