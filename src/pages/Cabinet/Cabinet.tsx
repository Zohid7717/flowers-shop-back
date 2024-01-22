import { FC, useState, useEffect } from 'react'
import UContainer from '../../component/ui/UContainer/UContainer'
import BreadCrumbs from '../../component/Breadcrumbs/BreadCrumbs'
import { useAppDispatch, useAppSelector } from '../../service/redux/hooks/hooks'
import editIcon from '../../assets/icon/edit-icon.svg'
import { logout } from "../../service/redux/Slices/auth/slice";

import './Cabinet.scss'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const doorHangers = [
  { title: 'info' },
  { title: 'setting' },
  { title: 'bouquet' },
  { title: 'gift' },
  { title: 'orders' },
]

const Cabinet: FC = () => {
  const Admin = useAppSelector(state => state.auth.user?.admin)
  const [activeDoor, setActiveDoor] = useState('info')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handlerLogout = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    navigate('/')
  }

  useEffect(() => {
  }, [Admin])
  return <div className='register'>
    <UContainer>
      <div className="register__wrap">
        <div className="mobile-crumb">
          <BreadCrumbs />
        </div>
        <div className="register__menu">
          <p className='register__title'>Личный кабинет</p>
          <div className="user-menu">
            <div className={
              activeDoor === 'info' || activeDoor === 'setting' ?
                "user-menu__settings activeDoor" :
                "user-menu__settings"
            }>
              <Link to='info' onClick={() => setActiveDoor('info')} >Профиль</Link>
              <button className="user-menu__set" onClick={() => setActiveDoor('setting')} >
                <img src={editIcon} alt="edit-icon" />
              </button>
            </div>
            {Admin ? <Link to='addbouquet' onClick={() => setActiveDoor('bouquet')} className={activeDoor === 'bouquet' ? 'activeDoor' : ''}>
              Добавить букет
            </Link> : ''}
            {Admin ?
                <Link to='addpresent' onClick={() => setActiveDoor('gift')} className={activeDoor === 'gift' ? 'activeDoor' : ''} >
                  Добавить подарок
                </Link> :
              <div className={activeDoor === 'orders' ? 'activeDoor' : ''}>
                <button onClick={() => setActiveDoor('orders')} >
                  Мои заказы
                </button>
              </div>
            }
            <div className='exit'>
              <button onClick={handlerLogout} >
                Выход
              </button>
            </div>
          </div>
        </div>
        <div className="register__main">
          <div className="desktop-crumb">
            <BreadCrumbs />
          </div>
          <Outlet />
        </div>
      </div>
    </UContainer>
  </div>
}

export default Cabinet