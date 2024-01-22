import { FC, useEffect, useState } from 'react'
import './SortCategory.scss'
import { useAppDispatch } from '../../../../../service/redux/hooks/hooks'
import { setCategory } from '../../../../../service/redux/Slices/category/slice'
import CustomRadio from '../../../../../component/ui/customRadio/CustomRadio'
import './SortCategory.scss'

const categories = [
  'Монобукеты',
  'Авторские',
  'Цветы в каробке',
  'Цветы в корзине',
  'Фруктовые'
]

const SortCategory: FC = () => {
  const [getCategory, setGetCategory]=useState('')
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setCategory(getCategory))
  }, [getCategory])

  return <div className='sort-category'>
    {
      categories.map((item, i) => (
        <CustomRadio key={i} stateElement={getCategory} name={item} nameRadio='sort-category' setStateElement={setGetCategory}/>
      ))
    }
  
  </div>
}

export default SortCategory