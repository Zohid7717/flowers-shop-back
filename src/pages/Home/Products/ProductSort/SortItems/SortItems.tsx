import { FC, useEffect, useState } from 'react'
import CustomCheckbox from '../../../../../component/ui/customCheckbox/CustomCheckbox'
import { BouquetType } from '../../../../../service/redux/Slices/products/slice'
import { useAppDispatch, useAppSelector } from '../../../../../service/redux/hooks/hooks'
import { setProductItems } from '../../../../../service/redux/Slices/productItems/slice'
import './SortItems.scss'

interface SortItemsProps{
  isDisabled: boolean
}

const SortItems: FC<SortItemsProps> = ({ isDisabled }) => {
  const resetFilter = useAppSelector(state=>state.resetFilter.value)
  const [productData, setProductData] = useState<BouquetType[]>([])
  const [productArr, setProductArr] = useState<string[]>([])
  const [items, setItems] = useState<string[]>([])
  const [showItems, setShowItems] = useState<number>(8)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [showQty, setShowQty] = useState<string[]>([])

  const dispatch = useAppDispatch()

  dispatch(setProductItems(items))

  const addShowItems = () => {
    if ((productArr.length - showItems) > 8) {
      setShowItems(showItems + 8)
      setDisabled(false)
    } else {
      setShowItems(showItems + (productArr.length - showItems))
      setDisabled(true)
    }
  }

  useEffect(() => {
    const productList = async function () {
      const response = await fetch("http://localhost:3001/bouquets")
      try {
        await response.json()
          .then(data => {
            setProductData(data)
          })
      } catch (error) {
        console.log(error)
      }
    }
    productList()
  }, [])
  useEffect(() => {
    let newArr: string[] = []
    productData.forEach(element => {
      element.composition.forEach(item => {
        if (!newArr.includes(item)) {
          newArr.push(item)
        }
      })
    })
    setProductArr(newArr)
  }, [productData])
  useEffect(() => {
    let newArr: string[] = []
    for (let i = 0; i < showItems; i++) {
      newArr.push(productArr[i])
    }
    setShowQty(newArr)
    if (resetFilter) {
      setItems([])
    }
  }, [showItems, productArr, resetFilter])
  return <div className='sort-items'>
    {
      showQty.map((item, i) => (
        <CustomCheckbox key={i} name={item} setStateElement={setItems} stateElement={items} isDisabled={ isDisabled} />
      ))
    }
    {
      disabled ? '' : <button className='sort-items__show-more green' disabled={disabled} onClick={addShowItems}>Показать еще</button>
    }

  </div>
}

export default SortItems