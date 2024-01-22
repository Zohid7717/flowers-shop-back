import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../../service/redux/hooks/hooks'
import { addFlower, getFlowers, removeFlower } from '../../service/redux/Slices/flowers/slice'
import { useAppSelector } from '../../service/redux/hooks/hooks'
import { FlowerType } from '../../utils/types'

import './FlowerInput.scss'

type PropsType = {
  bouquetComposition: FlowerType[] | null
  setBouquetComposition: React.Dispatch<React.SetStateAction<FlowerType[] | null>>
  pushFlowerValid: boolean
  setPushFlowerValid: React.Dispatch<React.SetStateAction<boolean>>
}

const FlowerInput: FC<PropsType> = ({ bouquetComposition, setBouquetComposition, setPushFlowerValid }) => {
  const flowers = useAppSelector(state => state.flowers.list)
  const [pushFlower, setPushFlower] = useState('')
  const [addBtnValid, setAddBtnValid]=useState<boolean>(true)
  const dispatch = useAppDispatch()
  const handleAddFlower = () => {
    dispatch(addFlower({ flower_name: pushFlower }))
    setPushFlower('')
    setPushFlowerValid(false)
  }
  const handleDeleteFlower = (id: string) => {
    dispatch(removeFlower({ flower_id: id }))
  }

  const handleCheckboxChange = (flower: FlowerType) => {
    if (bouquetComposition) {
      const flowerIndex = bouquetComposition.findIndex((f) => f._id === flower._id)
      if (flowerIndex !== -1) {
        const updateSelectedFlowers = [...bouquetComposition]
        updateSelectedFlowers.splice(flowerIndex, 1)
        setBouquetComposition(updateSelectedFlowers)
      } else {
        setBouquetComposition([...bouquetComposition, flower])
      }
    }
  }

  useEffect(() => {
    dispatch(getFlowers())
    let newArr: string[] = []
    flowers.map(item => (
      newArr.push(item.flower_name.toLowerCase())
    ))

    const btnValid = () => {
      if (pushFlower.length > 0 && !newArr.includes(pushFlower.toLowerCase())) {
        return false
      } else {
        return true
      }
    }

    const valid = () => {
      if (bouquetComposition) {
        if (bouquetComposition.length > 0) {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    }
    setPushFlowerValid(valid())
    setAddBtnValid(btnValid())
  }, [pushFlower, bouquetComposition])
  return <div className='flower-section'>
    <div className='flower-section__checkboxes'>
      Выбирайте цветы
      {
        flowers && flowers.map(item => (
          <div key={item._id} className="flower-section__set">
            <label >
              <input
                type="checkbox"
                value={item.flower_name}
                checked={bouquetComposition?.some((f) => f._id === item._id)}
                onChange={() => handleCheckboxChange(item)}
              />
              {item.flower_name}
            </label>
            <button onClick={() => handleDeleteFlower(item._id)}>Удалить</button>
          </div>
        ))
      }
    </div>
    <div className="flower-input__add">
      <label className='form__label'>
        Добавить цветок
        <input
          className='form__input'
          type="text"
          placeholder='Название цветка'
          value={pushFlower}
          onChange={(e) => setPushFlower(e.target.value)}
        />
      </label>
      <button onClick={handleAddFlower} disabled={addBtnValid}>Добавить</button>
    </div>
  </div>
}

export default FlowerInput