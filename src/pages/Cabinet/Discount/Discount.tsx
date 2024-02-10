import { FC, useEffect, useState } from 'react'
import './Discount.scss'
import { useAppDispatch, useAppSelector } from '../../../service/redux/hooks/hooks'
import { discountType, getDiscounts } from '../../../service/redux/Slices/discount/slice'
import axios from '../../../utils/axios'
import { setMessage } from '../../../service/redux/Slices/toast/slice'

const Discount: FC = () => {
  const [discountState, setDiscountState] = useState<discountType[]>([])
  const [discountList, setDiscountList] = useState<number[]>([])
  const [orderSize, setOrderSize] = useState(0)
  const dispatch = useAppDispatch()
  // const [fakeLineWidth]

  const cartTotal = 15000

  const orderPosition = async () => {
    try {
      const { data } = await axios.get('/discount/getAll')
      if (typeof data !== undefined) {
        const newArr = data.filter((element: discountType) => element.status)
        setDiscountState(newArr)
      }
    } catch (error) {
      dispatch(setMessage('Данные по дисконту не получены!'))
    }
  }

  const elementPosition = (arg1: number, arg2: number) => {
    const position = arg2 * 100 / arg1
    return position
  }

  useEffect(() => {
    orderPosition()
  }, [dispatch])

  useEffect(() => {
    if (discountState && discountState.length > 0) {
      setOrderSize(elementPosition(discountState[discountState.length - 1].total, cartTotal))
    }
    if (discountState && discountState.length > 0) {
      const newArr: number[] = []
      for (let i = 0; i < discountState.length; i++) {
        newArr.push(elementPosition(discountState[discountState.length - 1].total, discountState[i].total))
      }
      setDiscountList(newArr)
    }
  }, [discountState])

  const fakeWidth = () => {
    if (cartTotal < 1) {
      return 0
    } else {
      return 24
    }
  }
  
  const orderWidth = {
    width: `${orderSize}%`
  }

  return <div className='discount'>
    <h2>Ваша скидка - 3%</h2>
    <div className="discount__main">
      <div className="discount__line-trunk">
        <div className="discount__line-order" >
          <div className="discount__line-fake" style={{ width: `${fakeWidth()}%` }} ></div>
          <div className="discount__wrap">
            <div className="discount__line-real-wrap">
              <div className="discount__line-real" style={orderWidth}></div>
            </div>
            <div className="discount__items">
              {discountState?.map((item, index) => (
                <div style={{ left: `${discountList[index]}%` }} className={item.total <= cartTotal ? 'discount__item active-discount' : 'discount__item'} key={index}>
                  <div className="discount__item-line">
                    <p className='discount__item-price'>от {item.total} сум</p>
                    <p className='discount__item-percent'>{item.percent}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="discount__total-orders">Сумма заказов — <span className='green'>{cartTotal} руб.</span></div>
  </div>
}

export default Discount