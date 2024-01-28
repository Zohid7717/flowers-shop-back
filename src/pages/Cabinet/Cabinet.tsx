import { FC, useEffect, useState } from 'react'
import {UContainer} from '../../component/ui/UContainer/UContainer'
import BreadCrumbs from '../../component/Breadcrumbs/BreadCrumbs'
import { useAppDispatch, useAppSelector } from '../../service/redux/hooks/hooks'
import { logout } from "../../service/redux/Slices/auth/slice";
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

import './Cabinet.scss'

const adminDoorHangers = [
  { title: 'Профиль', path: 'info' },
  { title: 'Создать букет', path: 'addbouquet' },
  { title: 'Создать подарок', path: 'addpresent' },
  { title: 'Настройки', path: 'setting' },
  { title: 'Сменит пароль', path: 'changepass' },

]

const userDoorHangers = [
  { title: 'Профиль', path: 'info' },
  { title: 'Мои заказы', path: 'orders' },
  { title: 'Мои отзывы', path: 'myreviews' },
  { title: 'Сменит пароль', path: 'changepass' },
]

const Cabinet: FC = () => {
  const Admin = useAppSelector(state => state.auth.user?.admin)
  const location = useLocation()
  const [activeDoor, setActiveDoor] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handlerLogout = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    navigate('/')
  }

  useEffect(() => {
    const activePath = location.pathname.split('/').pop()
    if (activePath) {
      setActiveDoor(activePath)
    }
  }, [location])

  return <div className='register'>
    <UContainer>
      <div className="register__wrap">
        <div className="mobile-crumb">
          <BreadCrumbs />
        </div>
        <div className="register__menu">
          <p className='register__title'>Личный кабинет</p>
          <div className="user-menu">
            {
              Admin ?
                adminDoorHangers.map((door, index) => (
                  <Link key={index} to={door.path} className={activeDoor === door.path ? 'activeDoor' : ''}>
                    {door.title}
                  </Link>
                )) :
                userDoorHangers.map((door, index) => (
                  <Link key={index} to={door.path} className={activeDoor === door.path ? 'activeDoor' : ''}>
                    {door.title}
                  </Link>
                ))
            }
            <Link to='/' onClick={handlerLogout} >
              Выход
            </Link>
          </div>
        </div>
        <div className="register__main">
          <div className="desktop-crumb">
            <BreadCrumbs />
          </div>
          <div className='cabinet__workspace'>
            <Outlet />
          </div>
        </div>
      </div>
    </UContainer>
  </div>
}

export default Cabinet