import { FC } from 'react'
import Discount from '../Discount/Discount'
import ProfileInfo from '../ProfileInfo/ProfileInfo'

const UserInfo: FC = () => {
  return <div className='user-info-wrap'>
    <Discount />
    <ProfileInfo/>
  </div>
}

export default UserInfo