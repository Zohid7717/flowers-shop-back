import { FC, useState, ChangeEvent, useEffect } from 'react'
import { SizeType } from '../../utils/types'

import './AddSize.scss'

const sizesArr: SizeType[] = [
  {
    size_use: false,
    size_name: 'Малый',
    size_price: null,
    discount_price: null,
    error: null
  },
  {
    size_use: false,
    size_name: 'Средний',
    size_price: null,
    discount_price: null,
    error: null
  },
  {
    size_use: false,
    size_name: 'Большой',
    size_price: null,
    discount_price: null,
    error: null
  }
]

type AddSizeType = {
  bouquetSize: SizeType[] | null
  setBouquetSize: React.Dispatch<React.SetStateAction<SizeType[] | null>>
  sizeValid: boolean
  setSizeValid: React.Dispatch<React.SetStateAction<boolean>>
}

const AddSize: FC<AddSizeType> = ({setBouquetSize, sizeValid, setSizeValid }) => {
  const [newSizes, setNewSizes] = useState(sizesArr)

  const handleInputChange = (
    index: number,
    field: string,
    value: boolean | string | number | null
  ) => {
    const updatedSize: SizeType[] = [...newSizes]
    updatedSize[index] = {
      ...updatedSize[index], [field]: value
    }
    if (!updatedSize[index]?.size_use) {
      updatedSize[index].size_price = null
      updatedSize[index].discount_price = null
      updatedSize[index].error = null
    } else {
      if (updatedSize[index].size_price === null || updatedSize[index].size_price ! <= 0 ) {
          updatedSize[index].error = 'Добавте цену'
      } else {
        updatedSize[index].error = null
      }
    }
    setNewSizes(updatedSize)
  }

  useEffect(() => {
    let newArr: boolean[] = []
    for (let i = 0; i < newSizes.length; i++){
      if (!newSizes[i].error && newSizes[i].size_use) {
        newArr.push(true)
      }
    }
    setSizeValid(!newArr.includes(true))
    if (!sizeValid) {
      setBouquetSize(newSizes)
    }
  }, [newSizes])

  return <section className='add-size'>
    <h4>Выберайте размер и цену</h4>
    <div className='add-size__wrap'>
      {
        newSizes.map((size, index) => (
          <div className="add-size__component" key={index}>
            <label>
              {size.size_name}
              <input
                type="radio"
                checked={size.size_use}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(index, 'size_use', e.target.checked)}
              />
            </label>
            <label className='add-size__label'>
              Цена:
              <input className='add-size__input'
                type="number"
                value={size.size_price || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(index, 'size_price', e.target.value)}
                onBlur={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(index, 'size_price', e.target.value)}
                disabled={!size.size_use}
              />
              {size.error ? <p style={{color: "red"}}>{size.error}</p> : ''}
            </label>
            <label className='add-size__label'>
              Цена со скидкой:
              <input className='add-size__input'
                type="number"
                value={size.discount_price || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(index, 'discount_price', e.target.value)}
                disabled={!size.size_use}
              />
            </label>
          </div>
        ))
      }
    </div>
  </section>
}

export default AddSize