import { FC, useEffect, useState } from 'react'
import './Discount.scss'
import { useAppDispatch, useAppSelector } from '../../../service/redux/hooks/hooks'
import { getDiscounts } from '../../../service/redux/Slices/discount/slice'

const Discount: FC = () => {
  const discountState = useAppSelector(state => state.discount.list)
  const [discountList, setDiscountList]=useState()
  const [max, setMax] = useState(0)
  const [med, setMed] = useState(0)
  const [min, setMin] = useState(0)
  const [orderSize, setOrderSize] = useState(500)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getDiscounts())
  },[dispatch])
  console.log(discountState)

  return <div className='discount'>
    <h2>Ваша скидка - 3%</h2>
    <div className="discount__main">
      <div className="discount__line-trunk">
        <div className="discount__line-order"></div>
      </div>
    </div>
    <div className="discount__total-orders">Сумма заказов — <span className='green'>15 000 руб.</span></div>
  </div>
}

export default Discount