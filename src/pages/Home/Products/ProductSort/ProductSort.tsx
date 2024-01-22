import { FC, useEffect, useState } from 'react'
import SortInput from './SortInput/SortInput'
import SortPrice from './SortPrice/SortPrice'
import SortCategory from './SortCategory/SortCategory'
import SortItems from './SortItems/SortItems'
import { useAppDispatch} from '../../../../service/redux/hooks/hooks'
import { setInput } from '../../../../service/redux/Slices/inputValue/slice'
import { resetCategory } from '../../../../service/redux/Slices/category/slice'
import { resetProductPrice } from '../../../../service/redux/Slices/productPrice/slice'
import { setResetFilterFalse, setResetFilterTrue } from '../../../../service/redux/Slices/resetFilter/slice'
import { resetProductItems } from '../../../../service/redux/Slices/productItems/slice'
import './ProductSort.scss'
import {getAllBouquets } from '../../../../service/redux/Slices/products/slice'

const ProductSort: FC = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [sortInputValue, setSortInputValue] = useState<string>('')
  const dispatch = useAppDispatch()
  const dis = () => {
    dispatch(setResetFilterFalse())
  }
  const resetFilter = () => {
    dispatch(setResetFilterTrue())
    dispatch(resetProductItems())
    dispatch(resetCategory())
    dispatch(resetProductPrice())
    setSortInputValue('')
  }
  useEffect(() => {
    if (sortInputValue.length > 3) {
      setIsDisabled(true)
      dispatch(setInput(sortInputValue))
      dispatch(getAllBouquets())
    } else {
      setIsDisabled(false)
      dispatch(setInput(''))
    }
  }, [sortInputValue])
  return <div className='product-sort'>
    <div className="product-sort__input">
      <SortInput getValue={setSortInputValue} value={sortInputValue} />
    </div>
    <div className="product-sort__price">
      <p className="product-sort__price-title">Стоимость:</p>
      <SortPrice />
    </div>
    <div className="product-sort__category">
      <p className="product-sort__category-title">Категории:</p>
      <SortCategory />
    </div>
    <div className="product-sort__items">
      <p className="product-sort__items-title">Букеты с...</p>
      <SortItems isDisabled={isDisabled} />
    </div>
    <div className="product-sort__btn">
      <button className='UBtn-active product-sort__btn-clear' onClick={() => resetFilter()}>Очистить</button>
      <button className='UBtn-active product-sort__btn-submit' onClick={() => dis()}>Поиск</button>
    </div>
  </div>
}

export default ProductSort