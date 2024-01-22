import { FC, useState } from 'react'
import editIcon from "../../../assets/icon/edit-icon.svg";
import InfoBox from './InfoBox/InfoBox';
import { useAppSelector } from '../../../service/redux/hooks/hooks';

import './ProfileInfo.scss'
import InfoEditForm from './InfoEditForm/InfoEditForm';

const ProfileInfo: FC = () => {
  const user = useAppSelector(state => state.auth.user)
  const [editUserInfo, setEditUserInfo] = useState(false)

  return <div className='profile-info'>
    <div className="profile-info__head">
      <p>Информация обо мне</p>
      {
        !editUserInfo ? 
      <button onClick={()=>setEditUserInfo(true)} className="profile-info__edit">
        <span>Редактировать</span>
        <img src={editIcon} alt="edit" />
      </button> : ''
      }
    </div>
    {editUserInfo ? user && <InfoEditForm user={user} setEditUserInfo={setEditUserInfo } /> : user &&  <InfoBox user={user} />}
  </div>
}

export default ProfileInfo