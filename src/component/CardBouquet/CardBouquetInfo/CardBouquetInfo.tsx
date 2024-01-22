import { FC, useRef, useState } from 'react'
import { BouquetType } from '../../../utils/types'
import cartIcon from "../../../assets/icon/cart-icon.svg";

import './CardBouquetInfo.scss'

type CardBouquetInfoProps = {
  bouquet: BouquetType | null
}

const CardBouquetInfo: FC<CardBouquetInfoProps> = ({ bouquet }) => {
  const inputCheckSize = useRef<HTMLInputElement | null>(null)
  const [checkedSize, setCheckedSize] = useState<string | null>(null)
  const [countBouquet, setCountBouquet] = useState<number>(1)
  const handleCheckSize = (arg: string | null) => {
    setCheckedSize(arg)
  }
  const handleInc = () => {
    setCountBouquet(countBouquet + 1)
  }
  const handleDec = () => {
    setCountBouquet(countBouquet - 1)
  }
  console.log(checkedSize)
  return <div className='bouquet-info'>
    <h4>{bouquet?.name}</h4>
    <p>Размер:</p>
    <div className="bouquet-info__sizes">
      {bouquet?.size.map((size, index) => (
        size.size_use ?
          <label key={index} className={checkedSize === size.size_name ? "bouquet-info__size active-label" : "bouquet-info__size"}>
            <div className="bouquet-info__size-wrap">
              <div className="bouquet-info__size-text">
                <h5>{size.size_name}</h5>
                <div className="bouquet-info__size-price">
                  <p className={size.discount_price ? 'over-line-text' : ''}>{size.size_price} сум</p>
                  {size.discount_price ? <p>{size.discount_price} сум</p> : ''}
                </div>
              </div>
              <div className={checkedSize === size.size_name ? "bouquet-info__size-dot active-dot" : "bouquet-info__size-dot"}></div>
            </div>
            <input
              type="checkbox"
              name='check-size'
              ref={inputCheckSize}
              onChange={() => handleCheckSize(size.size_name)}
              hidden
            />
          </label> : ''
      ))}
    </div>
    <div className="bouquet-info__composition">
      <h6>Состав:</h6>
      <ul className="bouquet-info__composition-list">
        {bouquet?.composition.map((flower, index) => (
          <li key={index}>{flower.flower_name}</li>
        ))}
      </ul>
    </div>
    <div className="bouquet-info__btn">
      <div className="bouquet-info__count">
        <button className='dec-bouquet' onClick={handleDec} disabled={countBouquet < 2}></button>
        <p>{countBouquet}</p>
        <button className='inc-bouquet' onClick={handleInc}></button>
      </div>
      <div className="bouquet-info__cart">
        <div>
          <p className='bouquet-info__cart-text green'>Сумма:</p>
          <p className='bouquet-info__cart-price'>сум</p>
        </div>
        <button
          disabled={!checkedSize}
          onClick={()=>console.log('ok')}
          className={
          checkedSize ? 'bouquet-info__cart-btn UBtn'
              : 'bouquet-info__cart-btn UBtn-disable'
          }>
          <img src={cartIcon} alt="cart icon" />
          В карзину
        </button>
      </div>
    </div>
  </div>
}

export default CardBouquetInfo