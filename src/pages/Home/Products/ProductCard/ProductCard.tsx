import { FC } from 'react'
import { Link } from 'react-router-dom'
import './ProductCard.scss'

type ProductCardType = {
  id: any,
  name: string,
  size: {
    size_name: string,
    price: number
  }[],
  image: string
}

const ProductCard: FC<ProductCardType> = ({ id, name, size, image }) => {
  return <div className='product-card'>
    <div className="product-card__img">
      <Link to={`FullCardPage/${id}`}>
        <img src={image} alt={name} />
      </Link>
    </div>
    <div className="product-card__content">
      <p className="product-card__name">{name}</p>
      <p className="product-card__price">
        <span product-card__price-num>{(size[0].price).toLocaleString()} руб.</span>
      </p>
      <button className='UBtn-active product-card__btn'>В корзину</button>
    </div>
  </div>
}

export default ProductCard