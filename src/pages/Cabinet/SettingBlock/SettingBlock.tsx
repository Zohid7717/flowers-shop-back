import { FC, useEffect, useState } from 'react'
import './SettingBlock.scss'
import { useAppDispatch, useAppSelector } from '../../../service/redux/hooks/hooks'
import { discountType, getDiscounts, updateDiscount } from '../../../service/redux/Slices/discount/slice'
import { getCourse } from '../../../service/redux/Slices/course/slice'
import { useForm } from "react-hook-form";
import { setMessage } from '../../../service/redux/Slices/toast/slice'

type DiscountField = keyof discountType;


const SettingBlock: FC = () => {
  const discountList = useAppSelector(state => state.discount.list)
  const discountLoading = useAppSelector(state => state.discount.loading)
  const [discountListState, setDiscountListState] = useState(discountList)

  const courseList = useAppSelector(state => state.course.list)
  const courseLoading = useAppSelector(state => state.course.loading)
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    setValue
    // formState: { errors, isValid }
  } = useForm({
    mode: 'onChange'
  })

  useEffect(() => {
    dispatch(getDiscounts())
    dispatch(getCourse())
  }, [dispatch])

  useEffect(() => {
    setDiscountListState([...discountList])
  }, [discountList])
  console.log(discountList)
  console.log(discountListState)


  const onSubmit = (index: number)=> handleSubmit((data) => {
    try {
      dispatch(updateDiscount(data.discounts[index]))
    } catch (error) {
      
    }
    console.log(data.discounts[index])
  })

  const handleInputChange = (index: number, field: string, value: number | boolean | string) => {
    const updatedDiscountList: discountType[] = [...discountListState]
    updatedDiscountList[index] = { ...updatedDiscountList[index], [field]: value }
    console.log(updatedDiscountList)
  }

  return <div className='setting'>
    <div className="setting__discount">
      <p>Настройка скидок:</p>
      {discountListState.map((discount, index) => (
        <form onSubmit={onSubmit(index)}>
          <div key={index} className='setting__discount-card'>
            <div>
              <p>{discount.title}</p>
              <input
                type="checkbox"
                defaultChecked={typeof (discount.status) === 'boolean' ? discount.status : false}
                {...register(`discounts.${index}.status` as const)}
                onChange={(e) => handleInputChange(index, 'status', e.target.checked)}
              />
            </div>
            <label>
              Сумма скидки:
              <input
                type="text"
                defaultValue={discount.total.toString()}
                {...register(`discounts.${index}.total` as const)}
                onChange={(e) => handleInputChange(index, 'total', e.target.value)}
              />
            </label>
            <label>
              Процент скидки:
              <input
                type="text"
                defaultValue={discount.percent.toString()}
                {...register(`discounts.${index}.percent` as const)}
                onChange={(e) => handleInputChange(index, 'percent', e.target.value)}
              />
            </label>
            <input type="text" value={discount._id} hidden {...register(`discounts.${index}._id` as const)} />
          </div>
          <button type='submit'>Изменить</button>
        </form>
      ))}
    </div>
    <div className="setting__course">cou</div>
  </div>
}

export default SettingBlock