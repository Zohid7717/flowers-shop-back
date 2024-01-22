import { FC, useState, useRef } from 'react'
import sortHeadBtn from '../../../../assets/icon/sortHead-btn.svg'

import './SortHead.scss'
import { sortHeadObjType } from '../Products'

type SortHeadType = {
  sortHeadObj: sortHeadObjType[],
  sortHeadValue: string,
  setSortHeadValue: (value: string) => void,
  handleToggleFilter:()=>void
}

const SortHead: FC<SortHeadType> = ({ sortHeadObj, sortHeadValue, setSortHeadValue, handleToggleFilter }) => {
  const [width, setWidth] = useState<number>(0)
  window.addEventListener('resize', () => {
    setWidth(document.body.clientWidth)
  })
  const sortHeadList = useRef<HTMLUListElement | null>(null)

  const handleToggleClass = () => {
    if (sortHeadList.current) {
      sortHeadList.current.classList.toggle('active')
    }
  }

  const handleSortHead = (item:string) => {
    setSortHeadValue(item)
    if (sortHeadList.current) {
      sortHeadList.current.classList.remove('active')
    }
  }
  
  return <div className='sortHead'>
    {width < 1070 ?
      <button className="sortHead__title-btn" onClick={handleToggleClass}> {sortHeadValue==='' ? 'Сортировать по:' : sortHeadValue}</button> :
      <p className="sortHead__title">Сортировать по:</p>}
    <ul className="sortHead__items" ref={sortHeadList}>
      {sortHeadObj.map((item, i) => (
        <li
          key={i}
          className={
            sortHeadValue === item.title ?
              "sortHead__item active" :
              "sortHead__item"}
          value={item.title}
          onClick={() =>handleSortHead(item.title) }
        >
          {item.title}
          <span></span>
        </li>
      ))}
    </ul>
    <button className='sortHead__btn' onClick={handleToggleFilter}>
      <img src={sortHeadBtn} alt="sortHeadBtn" />
    </button>
  </div>
}

export default SortHead