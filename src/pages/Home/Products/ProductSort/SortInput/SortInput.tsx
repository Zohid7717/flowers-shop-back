import { FC } from 'react'
import './SortInput.scss'

interface SortInputProps {
  getValue: (value: string) => void,
  value: string
}

const SortInput: FC<SortInputProps> = ({ getValue, value }) => {
  
  return <div className='sort-input'>
    <input
      type="text"
      placeholder='Поиск по названию...'
      className='sort-input__search'
      onChange={(event) => getValue(event.target.value)}
      value={value}
    />
  </div>
}

export default SortInput