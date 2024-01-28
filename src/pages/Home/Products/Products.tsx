import { FC, useState, useRef } from 'react'
import SortHead from './SortHead/SortHead'
import { useAppDispatch} from '../../../service/redux/hooks/hooks'
import {UContainer} from '../../../component/ui/UContainer/UContainer'

import ProductSort from './ProductSort/ProductSort'
import { showMore } from '../../../service/redux/Slices/displayLimit/slice'

import './Products.scss'
import CardBlock from './CardBlock/CardBlock'

export type sortHeadObjType = {
  title: string,
}

const Products: FC = () => {
  const dispatch = useAppDispatch()
  const [sortHeadValue, setSortHeadValue] = useState('')
  const refFilter=useRef<HTMLDivElement | null>(null)

  const sortHeadObj: sortHeadObjType[] = [
    { title: 'Новизне' },
    { title: 'Цена по возростанию' },
    { title: 'Цена по убыванию' },
    { title: 'Популярности' }
  ]
  const handleToggleFilter = () => {
    if (refFilter.current) {
      refFilter.current.classList.toggle('active')
    }
  }

  const handleShowMore = () => {
    dispatch(showMore())
  }
  
  return <div className='products'>
    <UContainer>
      <div className="products__wrap">
        <div className="products__main">
          <div className="products__main-head">
            <SortHead sortHeadObj={sortHeadObj} sortHeadValue={sortHeadValue} setSortHeadValue={setSortHeadValue} handleToggleFilter={ handleToggleFilter} />
          </div>
          <CardBlock sortHeadValue={sortHeadValue} />
          <button className='products__show-more green' onClick={() => handleShowMore()}>
            Показать еще
          </button>
        </div>
        <div className="products__sort" ref={refFilter} >
          <ProductSort />
        </div>
      </div>
    </UContainer>
  </div>
}

export default Products