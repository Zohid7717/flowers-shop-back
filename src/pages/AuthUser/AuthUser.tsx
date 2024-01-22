import { FC } from 'react'
import UContainer from '../../component/ui/UContainer/UContainer'
import BreadCrumbs from '../../component/Breadcrumbs/BreadCrumbs'
import LogUserForm from './LogUserForm/LogUserForm'
import { Link } from 'react-router-dom'
import './AuthUser.scss'

const AuthUser: FC = () => {
  return <div className='register'>
    <UContainer>
      <div className="register__wrap">
        <div className="mobile-crumb">
          <BreadCrumbs />
        </div>
        <div className="register__menu">
          <p className='register__title'>Авторизация Пользователя</p>
          <div className='button' >
            <Link to='/user/register' >
              У меня нет аккаунта
            </Link>
          </div>
        </div>
        <div className="register__main">
          <div className="desktop-crumb">
            <BreadCrumbs />
          </div>
          <LogUserForm />
        </div>
      </div>
    </UContainer>
  </div>
}

export default AuthUser