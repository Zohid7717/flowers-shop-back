import { FC } from 'react'
import { UserResType } from '../../../../utils/types'
import '../ProfileInfo.scss'

interface UserType {
  user: UserResType;
}

const InfoBox: FC<UserType> = ({ user }) => {
  return <div className='info-box'>
    <div className="info-box__wrap">
      <p className='info-box__title'>Имя и фамилия</p>
      <p className='info-box__input'>{user.username}</p>
    </div>
    <div className="info-box__wrap">
      <p className='info-box__title'>Моб. номер</p>
      <p className='info-box__input'>{user.tel}</p>
    </div>
    <div className="info-box__wrap">
      <p className='info-box__title'>Мой псевдоним</p>
      <p className='info-box__input'>{user.nickname}</p>
    </div>
    <div className="info-box__wrap">
      <p className='info-box__title'>Данные о карте</p>
      <p className='info-box__input'>{user.ccn}</p>
    </div>
  </div>
}

export default InfoBox