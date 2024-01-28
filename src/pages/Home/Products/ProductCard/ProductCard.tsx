import { FC } from 'react'
import { Link } from 'react-router-dom'
import './ProductCard.scss'
import { BouquetsType } from '../../../../service/redux/Slices/bouquets/types'

const ProductCard: FC<BouquetsType
> = ({ id, name, price, image }) => {
  return <div className='product-card'>
    <div className="product-card__img">
      <Link to={`bouquet/${id}`}>
        <img src={`http://localhost:3000/${image}`} alt={name} />
      </Link>
    </div>
    <div className="product-card__content">
      <p className="product-card__name">{name}</p>
      <p className="product-card__price">
        <span product-card__price-num>{(price).toLocaleString()} руб.</span>
      </p>
      <button className='UBtn-active product-card__btn'>В корзину</button>
    </div>
  </div>
}

export default ProductCard