import { ChangeEvent, FC, useState, useEffect } from 'react'
import checkIcon from '../../../assets/icon/icon-checked.svg'
import './CustomCheckbox.scss'
import { useAppDispatch, useAppSelector } from '../../../service/redux/hooks/hooks';

interface CustomCheckboxProps {
  name: string;
  setStateElement: (value: string[]) => void;
  stateElement: string[];
  isDisabled: boolean
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({ name, setStateElement, stateElement, isDisabled }) => {
  const resetFilter = useAppSelector(state => state.resetFilter.id)
  const dispatch = useAppDispatch()
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckStateElement = (e: ChangeEvent<HTMLInputElement>) => {
    if (stateElement.includes(e.target.value)) {
      setStateElement(
        stateElement.filter(item => item !== e.target.value)
      )
    } else {
      setStateElement(
        stateElement.concat(e.target.value)
      )
    }
    setIsChecked(!isChecked);
  }
  
  useEffect(() => {
    if (resetFilter) {
      setStateElement([])
      setIsChecked(false)
    }
  },[resetFilter])

  return <div className='custom-checkbox'>
    <label className="custom-checkbox__label">
      <input type="checkbox" checked={isChecked} className="custom-checkbox__input" value={name} onChange={handleCheckStateElement } disabled={isDisabled} />
      <div className="custom-checkbox__new-checkbox">
        <div className={isChecked ? "custom-checkbox__checkbox-icon check-active-icon" : "custom-checkbox__checkbox-icon"}>
          <img src={checkIcon} alt="checkIcon" />
        </div>
        <p className={isChecked ? "custom-checkbox__title check-active-title" : "custom-checkbox__title"}>{name}</p>
      </div>
    </label>
  </div>
}

export default CustomCheckbox