import { FC, useEffect, useState } from 'react'
import './CardBouquetImg.scss'

interface CardBouquetImgProps {
  bouquetImg: string[] | null | undefined
}

const CardBouquetImg: FC<CardBouquetImgProps> = ({ bouquetImg }) => {
  const [checkedImg, setCheckedImg] = useState<string | null>(null)
  const handleCheckedImg = (arg: string) => {
    setCheckedImg(arg)
  }
  useEffect(() => {
    setCheckedImg(bouquetImg ? bouquetImg[0] : null)
    },[bouquetImg])
    return <div className='bouquet-img'>
    <div className="bouquet-img__main-img">
      <img src={`http://localhost:3000/${checkedImg}`} alt="bouquet-image" />
    </div>
    <div className="bouquet-img__imgs">
      {bouquetImg?.map((image, index) => (
        <div key={index} className={checkedImg === image ? "bouquet-img__img img-active" : "bouquet-img__img"} onClick={() => handleCheckedImg(image)}>
          <img src={`http://localhost:3000/${image}`} alt="bouquet-image" />
        </div>
      ))}
    </div>
  </div>
}

export default CardBouquetImg