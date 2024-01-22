import { FC, useEffect } from 'react'
import './CustonRadio.scss'
import { useAppSelector } from '../../../service/redux/hooks/hooks';

type CustomRadioType = {
  name: string;
  nameRadio: string;
  stateElement: string;
  setStateElement: (value: string) => void;
}

const CustomRadio: FC<CustomRadioType> = ({ name, nameRadio, stateElement, setStateElement }) => {
  const resetFilter = useAppSelector(state => state.resetFilter.id)
  const handleGetSortParams = (e: string) => {
    setStateElement(e)
  }
  useEffect(() => {
    if (resetFilter) {
      setStateElement('')
    }
  }, [resetFilter])
  return <div className='custom-radio'>
    <label className='custom-radio__label'>
      <input type='radio' name={nameRadio} checked={stateElement===name} className='custom-radio__input' value={name} onChange={(e) => handleGetSortParams(e.target.value)} />
      <div className="custom-radio__new-radio">
        <div className="custom-radio__radio-icon">
          <span className={stateElement === name ? "custom-radio__radio-icon-dot" : ''}></span>
        </div>
        <p className={stateElement === name ? "custom-radio__text-active" : "custom-radio__text"}>{name}</p>
      </div>
    </label>
  </div>
}

export default CustomRadio