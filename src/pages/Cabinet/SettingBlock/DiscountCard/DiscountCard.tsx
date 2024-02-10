import { FC } from 'react'
import { discountType, updateDiscount } from '../../../../service/redux/Slices/discount/slice'
import { useAppDispatch, useAppSelector } from '../../../../service/redux/hooks/hooks'
import { useForm } from "react-hook-form"
import { setMessage } from '../../../../service/redux/Slices/toast/slice'
import './DiscountCard.scss'

type CardPropsType = {
  discount: discountType
  index: number
  discountListState: discountType[]
  setDiscountListState: React.Dispatch<React.SetStateAction<discountType[]>>
}

const DiscountCard: FC<CardPropsType> = ({ discount, index, discountListState, setDiscountListState }) => {
  const discountMessage = useAppSelector(state => state.discount.status)
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
  })

  const onSubmit = (index: number) => handleSubmit((data) => {
    try {
      dispatch(updateDiscount(data.discounts[index]))
      dispatch(setMessage(discountMessage))
    } catch (error) {
      dispatch(setMessage(error))
    }
  })

  const handleInputChange = (index: number, field: string, value: number | boolean | string) => {
    const updatedDiscountList: discountType[] = [...discountListState]
    updatedDiscountList[index] = { ...updatedDiscountList[index], [field]: value }
    setDiscountListState(updatedDiscountList)
  }

  return <form onSubmit={onSubmit(index)} className='setting__discount-form'>
    <div key={index} className='setting__discount-card'>
      <div>
        <label>
          {discount.title}
          <input
            type="checkbox"
            defaultChecked={typeof (discount.status) === 'boolean' ? discount.status : false}
            {...register(`discounts.${index}.status` as const)}
            onChange={(e) => handleInputChange(index, 'status', e.target.checked)}
          />
        </label>
      </div>
      <label>
        Сумма скидки:
        <input
          type="text"
          placeholder='Поля обязательно к заполнению'
          defaultValue={discount.total?.toString()}
          {...register(`discounts.${index}.total` as const, {
            required: 'Поля обязательно к заполнению!'
          })}
          onChange={(e) => handleInputChange(index, 'total', e.target.value)}
        />

      </label>
      <label>
        Процент скидки:
        <input
          type="text"
          placeholder='Поля обязательно к заполнению'
          defaultValue={discount.percent.toString()}
          {...register(`discounts.${index}.percent` as const, {
            required: 'Поля обязательно к заполнению!'
          })}
          onChange={(e) => handleInputChange(index, 'percent', e.target.value)}
        />
      </label>
      <input type="text" value={discount._id} hidden {...register(`discounts.${index}._id` as const)} />
    </div>
    <button type='submit'>Изменить</button>
  </form>
}

export default DiscountCard