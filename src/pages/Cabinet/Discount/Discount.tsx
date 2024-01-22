import { FC, useEffect, useState } from 'react'
import './Discount.scss'
import { useAppDispatch, useAppSelector } from '../../../service/redux/hooks/hooks'
import { getDiscounts } from '../../../service/redux/Slices/discount/slice'

const Discount: FC = () => {
  const discountList = useAppSelector(state => state.discount.list)
  const [max, setMax] = useState(0)
  const [med, setMed] = useState(0)
  const [min, setMin] = useState(0)
  const [orderSize, setOrderSize] = useState(0)

  const order = 55000

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getDiscounts())
  }, [dispatch])

  useEffect(() => {
    if (discountList.length >= 3 && discountList[2].total > 0) {
      setMax(discountList[2].total/discountList[2].total*100)
      setMed(discountList[1].total*100/discountList[2].total)
      setMin(discountList[0].total * 100 / discountList[2].total)
      if (order >= discountList[2].total) {
        setOrderSize(discountList[2].total/discountList[2].total*100)
      } else {
        setOrderSize((order * 100 / discountList[2].total))
      }
    }
    
  },[discountList])
  return <div className='discount'>
    <h2>Ваша скидка - 3%</h2>
    <div className="discount__bar">
      <div className="discount__fake-body" style={{backgroundColor: '#6AAE55'}}>
        <p>Сумма<br></br> заказов:</p>
      </div>
      <div className="discount__bar-body">
        <div className="discount__moving-point" style={{minWidth: `${orderSize}%`}}></div>
        <div className={orderSize >= min ? "discount__border-min border active-border" : "discount__border-min border" } style={{left: `${min}%`}}>
          <p className="discount__border-text">от 1 0000 руб.</p>
          <p className="discount__border-percent">3%</p>
        </div>
        <div className={orderSize >= med ? "discount__border-med border active-border" : "discount__border-med border" } style={{left: `${med}%`}}>
          <p className="discount__border-text">от 50000 руб.</p>
          <p className="discount__border-percent">5%</p>
        </div>
        <div className={orderSize >= max ? "discount__border-max border active-border" : "discount__border-max border" } style={{left: `${max}%`}}>
          <p className="discount__border-text" >от 90000 руб.</p>
          <p className="discount__border-percent">7%</p>
        </div>
      </div>
    </div>
    <div className="total-orders">Сумма заказов - <span className='green'>15 000 руб.</span></div>
  </div>
}

export default Discount