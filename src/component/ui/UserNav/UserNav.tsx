import { FC, useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../service/redux/hooks/hooks'
import { logout } from '../../../service/redux/Slices/auth/slice'
import './UserNav.scss'

type funcType = {
  handleViewerUM: () => void
}

const UserNav: FC<funcType> = ({ handleViewerUM }) => {
  const [auth, setAuth] = useState(false)
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handlerLogout = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    handleViewerUM()
    navigate('/')
  }
  useEffect(() => {
    setAuth(isAuth)
  }, [isAuth])
  return <div>
    {auth ?
      <div className='header-main__menu-user'>
        <NavLink to='/user' onClick={handleViewerUM}>КАБИНЕТ</NavLink>
        <button onClick={handlerLogout}>ВЫХОД</button>
      </div> :
      <div className='header-main__menu-user'>
        <NavLink to='/user/login' onClick={handleViewerUM}>АВТОРИЗАЦИЯ</NavLink>
        <NavLink to='/user/register' onClick={handleViewerUM}>РЕГИСТРАЦИЯ</NavLink>
      </div>
    }
  </div>
}

export default UserNav